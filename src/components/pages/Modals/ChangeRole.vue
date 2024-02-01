<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onEditButtonClick">
        <v-select
            :items="roleOptions"
            v-model="selectedRole"
            item-title="text"
            item-value="value"
            placeholder="Выберите роль"
            variant="outlined"
            style="width: 100%; margin-bottom: 24px;"
        >
        </v-select>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="buttons_block">
          <CustomButton
              @click="toggleModal"
              type="button"
              :additional-styles="{color: '#333', border: '1px solid #999', opacity: '0.5', background: '#FFF'}"
          >
            Закрыть
          </CustomButton>
          <CustomButton
              type="submit"
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
import CustomButton from "../../common/CustomButton.vue";
import CustomModal from "../../common/CustomModal.vue";
import {ROLE_OPTIONS} from "../../../utils/Constants.ts";

export default defineComponent({
  components: {CustomButton, CustomModal},
  props: {
    modalTitle: {
      type: String,
      default: 'Поменять роль',
    },
    modalActive: {
      type: Boolean,
      default: false
    },
    toggleModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    errorMessage: String
  },
  setup(props, {emit}) {
    const selectedRole = ref(null);

    const onEditButtonClick = () => {
      emit('editRoleFromDropDown', {
        role: selectedRole.value
      })
    }
    watch(() => props.modalActive, () => {
      selectedRole.value = null;
    });

    return {
      selectedRole,
      onEditButtonClick,
      roleOptions: ROLE_OPTIONS,
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