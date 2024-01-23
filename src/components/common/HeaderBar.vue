<template>
  <div class="header_container">
    <div class="header-body">
      <div class="input-wrapper">
        <img src="../../assets/icon-search.svg" class="search-icon" alt="Search">
        <input type="text" placeholder="Поиск" v-model="inputValue" @input="handleInput(inputValue)"/>
      </div>
      <CustomButton @click="$emit('modalToggler')">{{isCreate ? "Создать" : "Добавить"}}</CustomButton>
    </div>
    <ActionsBlock
        :brands="brands"
        :branches="branches"
        @updateRoles="handleUpdateRoles"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { debounce } from 'lodash';
import CustomButton from "./CustomButton.vue";
import ActionsBlock from "./ActionsBlock.vue";


export default defineComponent({
  name: 'HeaderBar',
  components: {ActionsBlock, CustomButton},
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    handleSearch: {
      type: Function,
      required: true,
    },
    branches: Array,
    brands: Array,
  },
  data(){
  },
  setup(props, {emit}){
    const inputValue = ref('');

    const debouncedSearch = debounce((value: string) => {
      props.handleSearch(value);
    }, 700);

    const handleInput = (value: string) => {
      inputValue.value = value;
      debouncedSearch(value);
    };

    const handleUpdateRoles = (roles: any) => {
      emit('updateRoles', roles);
    };

    return {
      inputValue,
      handleInput,
      handleUpdateRoles
    };
  }
});
</script>

<style scoped lang="scss">
.header_container{
  background-color: #FFFFFF;
  padding: 24px 16px;
  border-radius: 12px 12px 0 0;
}
.header-body {
  width: 1070px;
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.input-wrapper {
  width: 876px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  gap: 16px;

  input {
    border-radius: 8px;
    background-color: #F6F6F6;
    border: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 60px;
    font-weight: bold;
  }
}

.input-wrapper .search-icon {
  background-color: #F6F6F6;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
}

</style>