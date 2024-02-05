<template>
  <CustomModal @close.prevent="editToggleModal" :modalActive="editModalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onSaveButtonClick(curBranch?.id ?? 0)">
        <input placeholder="Название филиала" type="text" v-model="title" @input="validate" class="inputFirstName"/>
        <input placeholder="Описание" type="text" v-model="description" @input="validate" class="inputLastName"/>
        <template v-if="(defaultOption?.selectedBrandsIds?.size ?? 0) > 0">
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
import {ROLE_OPTIONS} from "../../../utils/Constants.ts";

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
    brands: Array,
    curBranch: Object,
    defaultOption: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const title = ref<string>('');
    const description = ref<string>('');
    const selectedBrandsIds = ref<Array<number>>([])
    const isAllDataEntered = ref(false)
    const roleOptions = ROLE_OPTIONS

    const brands = ref<Array<any>>(props?.brands ?? [])

    watch(() => props.curBranch, (br: any) => {
      brands.value = props?.brands ?? []

      title.value = br.title
      description.value = br.description

      selectedBrandsIds.value = []
      validate()
    });

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const onBrandSelected = (value: number[]) => {
      selectedBrandsIds.value = value
      validate()
    }

    const validate = () => {
      console.log("selectedBrandsIds",selectedBrandsIds.value)
      if (title.value.length > 0 && description.value.length > 0) {
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
      }
    }
  },
  methods: {
    onSaveButtonClick(id: number) {
      console.log("title=", this.title)
      console.log("description=", this.description)
      console.log("brand_ids=", this.selectedBrandsIds)
      this.$emit('editBranch', {
        title: this.title,
        description: this.description,
        brand_ids: this.selectedBrandsIds,
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