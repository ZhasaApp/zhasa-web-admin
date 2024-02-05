<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onCreateButtonClick" :key="modalActive.toString()">
        <input placeholder="Название филиала" type="text" v-model="title" @input="validate" class="inputFirstName"/>
        <input placeholder="Описание" type="text" v-model="description" @input="validate" class="inputLastName"/>
        <a-select
            v-model="selectedBrandsIds"
            mode="multiple"
            show-search
            placeholder="Выберите бренд"
            style="width: 100%"
            class="selector-with_multiple-select"
            :options="brands?.map((branch: any) => ({
              label: branch.title.toString(),
              value: branch.id.toString() ,
              }))"
            :filter-option="filterOption"
            @change="onBrandSelected($event)"
            showArrow
        ></a-select>
        <a-alert type="error" style="margin-top: 16px" :message="errorMessage" show-icon
                 v-if="(errorMessage?.length ??0)>0"/>
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
import CustomButton from "../../common/CustomButton.vue";
import CustomModal from "../../common/CustomModal.vue";

export default defineComponent({
  components: {CustomButton, CustomModal},
  props: {
    modalTitle: {
      type: String,
      default: 'Создать филиал',
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
    const title = ref<string>('');
    const description = ref<string>('');
    const selectedBrandsIds = ref<Array<number>>([])
    const isAllDataEntered = ref(false)

    watch(() => props.modalActive, () => {
      title.value ='';
      description.value ='';
      selectedBrandsIds.value = [];
      isAllDataEntered.value = false;
    });
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };


    const onBrandSelected = (value: number[]) => {
      selectedBrandsIds.value = value
      validate()
    }

    const validate = () => {
      if (title.value.length > 0 && description.value.length > 0 &&
          selectedBrandsIds.value.length > 0) {
        isAllDataEntered.value = true
      } else isAllDataEntered.value = false
    }
    return {
      title,
      description,
      selectedBrandsIds,
      filterOption,
      onBrandSelected,
      validate,
      isAllDataEntered
    }
  },
  methods: {
    onCreateButtonClick() {
      this.$emit('createBranch', {
        title: this.title,
        description: this.description,
        brand_ids: this.selectedBrandsIds,
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