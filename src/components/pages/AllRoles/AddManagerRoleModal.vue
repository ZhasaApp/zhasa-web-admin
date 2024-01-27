<template>
  <CustomModal @close.prevent="toggleModal" :modalActive="modalActive" :modal-title="modalTitle">
    <div class="modal-content">
      <form @submit.prevent="onCreateButtonClick">
        <a-select
            v-model="selectedUserId"
            :options="users?.map((user: any) => ({
                label: `${user.FirstName} ${user.LastName}`,
                value: user.Id ,
                }))"
            show-search
            placeholder="Напишите или выберите пользователя"
            style="width: 100%"
            :filter-option="filterOption"
            @change="handleUserChange"
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
        <CustomButton
            type="submit"
            :additional-styles="{marginBottom : '24px', opacity: `${ isAllDataEntered ? '1' : '0.5'}`,}"
            :disabled="!isAllDataEntered"
        >
          Добавить
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
import CustomButton from "../../common/CustomButton.vue";
import CustomModal from "../../common/CustomModal.vue";
import useAllUsersWithoutRole from "../../../hooks/useAllUsersWithoutRole.ts";

export default defineComponent({
  components: {CustomButton, CustomModal},
  props: {
    modalTitle: {
      type: String,
      default: 'Добавить менеджера',
    },
    modalActive: {
      type: Boolean,
      default: false
    },
    toggleModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    branches: Array,
    brands: Array,
    selectedUserFullName: String
  },
  data() {
    return {
      selectedUserId: '',
      selectedBranchId: '',
      selectedBrandsIds: [],
      isAllDataEntered: false,
    }
  },
  setup() {
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const {users, isLoading} = useAllUsersWithoutRole()
    return {handleChange, filterOption, users, isLoading}

  },
  methods: {
    handleUserChange(value: any) {
      this.selectedUserId = value;
      if (this.selectedBranchId.length > 0 && this.selectedBrandsIds.length > 0) {
        this.isAllDataEntered = true
      } else this.isAllDataEntered = false
    },
    handleBranchChange(value: any) {
      this.selectedBranchId = value;
      if (this.selectedBranchId.length > 0 && this.selectedBrandsIds.length > 0) {
        this.isAllDataEntered = true
      } else this.isAllDataEntered = false
    },
    handleBrandsChange(value: any) {
      this.selectedBrandsIds = value
      if (this.selectedBranchId.length > 0 && this.selectedBrandsIds.length > 0) {
        this.isAllDataEntered = true
      } else this.isAllDataEntered = false
    },
    onCreateButtonClick() {
      this.$emit('addManager', {
        selectedUserId: this.selectedUserId,
        selectedBranchId: this.selectedBranchId,
        selectedBrandsIds: this.selectedBrandsIds
      })
    }
  }
})
</script>
<style lang="scss">
.ant-select-selector {
  height: 48px !important;
  border-radius: 12px !important;
  border: 1px solid #999 !important;
}

.ant-select-selection-placeholder,
.ant-select-selection-item,
.ant-select-selection-search {
  padding: 8px 0 !important;
}

.ant-select-selection-search-input {
  margin: 0 !important;
}

.selector-with_multiple-select {
  width: 100%;

  .ant-select-selection-item {
    padding: 0 !important;
  }
}
</style>