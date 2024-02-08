<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onDeleteButtonClick">
        <div class="buttons_block">
          <CustomButton
              type="submit"
              :additional-styles="{color: '#EDEDED', background: '#FF0000'}"
          >
            Удалить
          </CustomButton>
          <CustomButton
              @click="toggleModal"
              type="button"
              :additional-styles="{color: '#333', border: '1px solid #999', opacity: '0.5', background: '#FFF'}"
          >
            Закрыть
          </CustomButton>
        </div>
      </form>
    </div>
  </CustomModal>
</template>
<script lang="ts">

import {defineComponent, PropType, ref, watch} from "vue";
import CustomButton from "../../common/CustomButton.vue";
import CustomModal from "../../common/CustomModal.vue";

export default defineComponent({
  components: {CustomButton, CustomModal},
  props: {
    modalActive: {
      type: Boolean,
      default: false
    },
    toggleModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    errorMessage: String,
    deleteItems: Array,
    type: String
  },
  setup(props, {emit}) {

    const modalTitle = ref("")

    watch(() => props.deleteItems, (newVal: any) => {
      let one = "выбранного пользователя"
      let many = "выбранных пользователей"
      if (props.type == "branch") {
        one = "выбранный филиал"
        many = "выбранные филиалы"
      }
      if (props.type == "brand") {
        one = "выбранный бренд"
        many = "выбранные бренды"
      }
      modalTitle.value = newVal.length === 1 ? "Вы действительно хотите удалить " + one + "?" : "Вы действительно хотите удалить " + many + "?"
    })

    const onDeleteButtonClick = () => {
      emit('deleteFromDropDown', props.deleteItems)
    }
    return {
      onDeleteButtonClick,
      modalTitle
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

.buttons_block {
  display: flex;
  gap: 24px;
}
</style>