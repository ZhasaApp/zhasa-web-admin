<template>
  <div class="header-body">
    <div class="input-wrapper">
      <img src="../../assets/icon-search.svg" class="search-icon" alt="Search">
      <input type="text" placeholder="Поиск" v-model="inputValue" @input="handleInput(inputValue)"/>
    </div>
    <CustomButton @click="$emit('modalToggler')">{{isCreate ? "Создать" : "Добавить"}}</CustomButton>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { debounce } from 'lodash';
import CustomButton from "./CustomButton.vue";

export default defineComponent({
  name: 'HeaderBar',
  components: {CustomButton},
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    handleSearch: {
      type: Function,
      required: true,
    },
  },
  data(){
  },
  setup(props){
    const inputValue = ref('');

    const debouncedSearch = debounce((value: string) => {
      props.handleSearch(value);
    }, 700);

    const handleInput = (value: string) => {
      inputValue.value = value;
      debouncedSearch(value);
    };

    return {
      inputValue,
      handleInput,
    };
  }
});
</script>

<style scoped lang="scss">
.header-body {
  width: 1070px;
  display: flex;
  gap: 16px;
}

.input-wrapper {
  width: 876px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #FFFFFF;
  box-shadow: 0px 2px 9px 2px rgba(134, 134, 134, 0.10);
  padding: 8px 9px;
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