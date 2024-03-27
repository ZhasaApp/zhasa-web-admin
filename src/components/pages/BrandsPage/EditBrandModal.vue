<template>
  <CustomModal @close.prevent="editToggleModal" :modalActive="editModalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onSaveButtonClick(curBrand?.id ?? 0)">
        <input placeholder="Название бренда" type="text" v-model="title" @input="validate" class="inputFirstName"/>
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
      default: 'Редактировать филиал',
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
    curBrand: Object
  },
  setup(props) {
    const title = ref<string>('');
    const isAllDataEntered = ref(false)

    watch(() => props.curBrand, (br: any) => {
      title.value = br.title
      validate()
    });

    const validate = () => {
      if (title.value.length > 0) {
        isAllDataEntered.value = true
      } else isAllDataEntered.value = false
    }
    return {
      title,
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
      }
    }
  },
  methods: {
    onSaveButtonClick(id: number) {
      console.log("title=", this.title)
      this.$emit('editBrand', {
        title: this.title,
        id: id
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