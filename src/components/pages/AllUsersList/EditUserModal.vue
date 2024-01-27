<template>
  <CustomModal @close.prevent="editToggleModal" :modalActive="editModalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onSaveButtonClick(user?.id ?? 0)">
        <input placeholder="Имя" type="text" v-model="firstName" @input="validate" class="inputFirstName"/>
        <input placeholder="Фамилия" type="text" v-model="lastName" @input="validate" class="inputLastName"/>
        <input
            placeholder="+7 ___ ___ __ __"
            v-maska
            data-maska="+7 ### ### ## ##"
            v-model="telephoneNumber"
            @input="validate"
            class="inputTelephone"
        />
        <template v-if="(defaultOption?.role?.length ?? 0) > 0">
          <a-select
              v-model="selectedRole"
              :defaultValue="defaultOption.role"
              placeholder="Выберите роль"
              style="width: 100%;"
              :options="roleOptions.map(role => ({ label: role.title, value: role.value }))"
              @change="onRoleSelected($event)"
          ></a-select>
        </template>
        <template v-if="(defaultOption?.role?.length ?? 0) && defaultOption.role != 'owner'">
          <a-select
              v-model="selectedBranchId"
              :defaultValue="defaultOption.branchId"
              show-search
              placeholder="Выберите филиал"
              style="width: 100%; margin: 24px auto"
              :options="branches?.map((branch: any) => ({
              label: branch.title.toString(),
              value: branch.id,
              }))"
              :filter-option="filterOption"
              @change="onBranchSelected($event)"
          ></a-select>
          <a-select
              v-model="selectedBrandsIds"
              mode="multiple"
              :defaultValue="defaultOption.brandIds"
              show-search
              placeholder="Выберите бренд"
              class="selector-with_multiple-select"
              :options="brands?.map((branch: any) => ({
              label: branch.title.toString(),
              value: branch.id,
              }))"
              :filter-option="filterOption"
              @change="onBrandSelected($event)"
              showArrow
          ></a-select>
        </template>
        <a-alert type="error" style="margin-top: 16px" :message="errorMessage" show-icon
                 v-if="(errorMessage?.length ??0)>0"/>
        <div class="button-box">
          <CustomButton
              @click="editToggleModal"
              type="button"
              :additional-styles="{color: '#333', border: '1px solid #999', opacity: '0.5', background: '#FFF'}"
          >
            Закрыть
          </CustomButton>
          <CustomButton
              type="submit"
              :additional-styles="{opacity: `${ isAllDataEntered ? '1' : '0.5'}`,}"
              :disabled="!isAllDataEntered"
          >
            Сохранить
          </CustomButton>
        </div>
      </form>
    </div>
  </CustomModal>
</template>
<script lang="ts">

import {defineComponent, PropType, ref, watch} from "vue";
import {vMaska} from "maska"
import CustomButton from "../../common/CustomButton.vue";
import CustomModal from "../../common/CustomModal.vue";

export default defineComponent({
  components: {CustomButton, CustomModal},
  props: {
    modalTitle: {
      type: String,
      default: 'Редактировать пользователя',
    },
    editModalActive: {
      type: Boolean,
      default: false
    },
    editToggleModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    errorMessage: String,
    brands: Array,
    branches: Array,
    user: Object,
    defaultOption: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const firstName = ref("");
    const lastName = ref("");
    const telephoneNumber = ref("");
    const selectedRole = ref('');
    const selectedBranchId = ref<any>(null);
    const selectedBrandsIds = ref<Array<number>>([])
    const isAllDataEntered = ref(false)
    const roleOptions = [
      {title: "Админ", value: "owner"},
      {title: "Директор", value: "branch_director"},
      {title: "Менеджер", value: "sales_manager"}
    ]

    const brands = ref<Array<any>>(props?.brands ?? [])
    const branches = ref<Array<any>>(props?.branches ?? [])

    watch(() => props.user, (user: any) => {
      brands.value = props?.brands ?? []
      branches.value = props?.branches ?? []

      firstName.value = user.first_name
      lastName.value = user.last_name
      telephoneNumber.value = user.phone
      selectedRole.value = user.role
      const branchID = branches.value.find((it: any) => it.title == user.branch_title)?.id
      selectedBranchId.value = branchID
      const brandIds = []
      for (let i = 0; i < user.brands.length; i++) {
        for (let j = 0; j < brands.value.length;  j++) {
          if (user.brands[i] == brands.value[j].title) {
            brandIds.push(brands.value[j].id)
            break;
          }
        }
      }
      selectedBrandsIds.value = brandIds
      validate()
    });

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const onRoleSelected = (value: string) => {
      selectedRole.value = value
      props.defaultOption.role = value
      validate()
    }

    const onBranchSelected = (value: number) => {
      selectedBranchId.value = value
      validate()
    }

    const onBrandSelected = (value: number[]) => {
      selectedBrandsIds.value = value
      validate()
    }

    const validate = () => {
      console.log("firstName",firstName.value)
      console.log("lastName",lastName.value)
      console.log("telephoneNumber",telephoneNumber.value)
      console.log("selectedRole",selectedRole.value)
      console.log("selectedBranchId",selectedBranchId.value)
      console.log("selectedBrandsIds",selectedBrandsIds.value)
      if (firstName.value.length > 0 && lastName.value.length > 0 && telephoneNumber.value.length == 16 &&
          selectedRole.value.length > 0 && (selectedRole.value == "owner" ? true : selectedBranchId.value && selectedBrandsIds.value.length > 0)) {
        isAllDataEntered.value = true
      } else isAllDataEntered.value = false
    }
    return {
      firstName,
      lastName,
      telephoneNumber,
      selectedRole,
      selectedBranchId,
      selectedBrandsIds,
      filterOption,
      onRoleSelected,
      onBranchSelected,
      onBrandSelected,
      validate,
      isAllDataEntered,
      roleOptions
    }

  },
  directives: {maska: vMaska},
  data() {
    return {
      maskedValue: "",
      bindedObject: {
        masked: "",
        unmasked: "",
        completed: false
      },
      newUser: this.$props.user
    }
  },
  methods: {
    onSaveButtonClick(userId: number) {
      console.log("firstName=", this.firstName)
      console.log("lastName=", this.lastName)
      console.log("telephoneNumber=", this.telephoneNumber)
      console.log("role=", this.selectedRole)
      console.log("brand_ids=", this.selectedBrandsIds)
      console.log("branch_id=", this.selectedBranchId)
      this.$emit('editUser', {
        firstName: this.firstName,
        lastName: this.lastName,
        telephoneNumber: this.telephoneNumber,
        role: this.selectedRole,
        brand_ids: this.selectedBrandsIds,
        branch_id: this.selectedBranchId,
        id: userId
      })
    }
  }
})
</script>
<style scoped>
.inputFirstName, .inputLastName, .inputTelephone, .v-input__control, .v-field, .v-field--active, .v-field--appended {
  color: #4D4D4D;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 14px 0 14px 16px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #999;
  margin-bottom: 24px;
}

input::placeholder {
  color: #4D4D4D;
}

.button-box {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}


</style>