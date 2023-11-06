<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onCreateButtonClick">
        <input placeholder="Имя" type="text" v-model="firstName" @input="checkForData"/>
        <input placeholder="Фамилия" type="text" v-model="lastName" @input="checkForData"/>
        <input
            placeholder="+7 ___ ___ __ __"
            v-maska
            data-maska="+7 ### ### ## ##"
            v-model="telephoneNumber"
            @input="checkForData"
        />
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

import {defineComponent, PropType} from "vue";
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
    errorMessage : String
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
      }
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
input {
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
</style>