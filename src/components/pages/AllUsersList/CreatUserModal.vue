<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onCreateButtonClick">
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
        <a-select
            placeholder="Выберите роль"
            style="width: 100%;"
            :options="roleOptions.map(role => ({ label: role.title, value: role.value }))"
            @change="onRoleSelected($event)"
        ></a-select>
        <a-select
            v-model="selectedBranchId"
            v-show="selectedRole == 'branch_director' || selectedRole == 'sales_manager'"
            show-search
            placeholder="Выберите филиал"
            style="width: 100%; margin: 24px auto"
            :options="branches?.map((branch: any) => ({
              label: branch.description.toString(),
              value: branch.id.toString() ,
              }))"
            :filter-option="filterOption"
            @change="onBranchSelected($event)"
        ></a-select>
        <a-select
            v-model="selectedBrandsIds"
            mode="multiple"
            v-show="selectedRole == 'branch_director' || selectedRole == 'sales_manager'"
            show-search
            placeholder="Выберите бренд"
            class="selector-with_multiple-select"
            :options="brands?.map((branch: any) => ({
              label: branch.title.toString(),
              value: branch.id.toString() ,
              }))"
            :filter-option="filterOption"
            @change="onBrandSelected($event)"
            showArrow
        ></a-select>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="button-box">
          <CustomButton
              @click="toggleModal"
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
            Создать
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
      default: 'Создать нового пользователя',
    },
    modalActive: {
      type: Boolean,
      default: false
    },
    toggleModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    errorMessage: String,
    brands: Array,
    branches: Array
  },
  setup(props) {
    const firstName = ref<string>('');
    const lastName = ref<string>('');
    const telephoneNumber = ref<string>('');
    const selectedRole = ref<string>('');
    const selectedBranchId = ref<number>();
    const selectedBrandsIds = ref<Array<number>>([])
    const isAllDataEntered = ref(false)

    watch(() => props.modalActive, () => {
      selectedRole.value = '';
    });
    watch(selectedRole, () => {

    });
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const onRoleSelected = (value: string) => {
      selectedRole.value = value
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
      isAllDataEntered
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
      roleOptions: [
        {title: "Админ", value: "owner"},
        {title: "Директор", value: "branch_director"},
        {title: "Менеджер", value: "sales_manager"}
      ]
    }
  },
  methods: {
    onCreateButtonClick() {
      console.log("firstName=", this.firstName)
      console.log("lastName=", this.lastName)
      console.log("telephoneNumber=", this.telephoneNumber)
      console.log("role=", this.selectedRole)
      console.log("brand_ids=", this.selectedBrandsIds)
      console.log("branch_id=", this.selectedBranchId)
      this.$emit('createUser', {
        firstName: this.firstName,
        lastName: this.lastName,
        telephoneNumber: this.telephoneNumber,
        role: this.selectedRole,
        brand_ids: this.selectedBrandsIds,
        branch_id: this.selectedBranchId
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