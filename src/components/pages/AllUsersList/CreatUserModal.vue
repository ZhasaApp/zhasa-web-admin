<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onCreateButtonClick">
        <input placeholder="Имя" type="text" v-model="firstName" @input="checkForData" class="inputFirstName"/>
        <input placeholder="Фамилия" type="text" v-model="lastName" @input="checkForData" class="inputLastName"/>
        <input
            placeholder="+7 ___ ___ __ __"
            v-maska
            data-maska="+7 ### ### ## ##"
            v-model="telephoneNumber"
            @input="checkForData"
            class="inputTelephone"
        />
        <a-select
            v-model="selectedBranchId"
            show-search
            placeholder="Выберите роль"
            style="width: 100%;"
            :options="roleOptions"
            :filter-option="filterOption"
            @change="handleBranchChange"
        ></a-select>
        <a-select
            v-model="selectedBranchId"
            show-search
            placeholder="Выберите филиал"
            style="width: 100%; margin: 24px auto"
            :options="branches?.map((branch: any) => ({
              label: branch.description.toString(),
              value: branch.id.toString() ,
              }))"
            :filter-option="filterOption"
            @change="handleBranchChange"
        ></a-select>
        <a-select
            v-model="selectedBrandsIds"
            mode="multiple"
            show-search
            placeholder="Выберите бренд"
            class="selector-with_multiple-select"
            :options="brands?.map((branch: any) => ({
              label: branch.title.toString(),
              value: branch.id.toString() ,
              }))"
            :filter-option="filterOption"
            @change="handleBrandsChange"
            showArrow="true"
        ></a-select>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <CustomButton
            type="submit"
            :additional-styles="{marginBottom : '24px', opacity: `${ isAllDataEntered ? '1' : '0.5'}`,}"
            :disabled="!isAllDataEntered"
        >
          Создать
        </CustomButton>
        <CustomButton
            @click="toggleModal"
            type="button"
            :additional-styles="{color: '#333', border: '1px solid #999', opacity: '0.5', background: '#FFF'}"
        >
          Закрыть
        </CustomButton>
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
    errorMessage : String,
    brands: Array,
    branches: Array
  },
  setup(props){
    const selectedRole = ref(null);
    const selectedBranchId = ref('');
    const selectedBrandsIds = ref([])
    watch(() => props.modalActive, () => {
      selectedRole.value = null;
    });
    return {
      selectedRole,
      selectedBranchId,
      selectedBrandsIds,
    }

  },
  directives: {maska: vMaska},
  data() {
    return {
      firstName: '',
      lastName: '',
      telephoneNumber: '',
      maskedValue: "",
      isAllDataEntered: false,
      bindedObject: {
        masked: "",
        unmasked: "",
        completed: false
      },
      roleOptions: [
        {text: "Админ", value: "owner"},
        {text: "Директор", value: "branch_director"},
        {text: "Менеджер", value: "sales_manager"}
      ]
    }
  },
  methods: {
    onCreateButtonClick() {
      this.$emit('createUser', {
        firstName: this.firstName,
        lastName: this.lastName,
        telephoneNumber: this.telephoneNumber
      })
    },
    checkForData() {
      if(this.firstName.length>0 && this.lastName.length>0 && this.telephoneNumber.length>0){
        this.isAllDataEntered = true
      }else this.isAllDataEntered = false
    }
  }
})
</script>
<style scoped>
.inputFirstName, .inputLastName, .inputTelephone,.v-input__control, .v-field , .v-field--active, .v-field--appended{
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
input::placeholder{
  color: #4D4D4D;
}
</style>