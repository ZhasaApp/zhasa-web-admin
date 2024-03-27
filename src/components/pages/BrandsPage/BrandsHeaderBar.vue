<template>
  <div class="header_container">
    <div class="header-body">
      <div class="input-wrapper">
        <img src="../../../assets/icon-search.svg" class="search-icon" alt="Search">
        <input type="text" placeholder="Поиск" v-model="inputValue" @input="handleInput(inputValue)"/>
      </div>
      <CustomButton @click="$emit('modalToggler')">Создать</CustomButton>
    </div>
    <BrandsActionsBlock
        :allSelected="allSelected"
        @deleteBrandClicked="handleDelete"
        @toggleAll="toggleAll"
        :selectedBrands="selectedBrands"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import { debounce } from 'lodash';
import CustomButton from "../../common/CustomButton.vue";
import BrandsActionsBlock from "./BrandsActionBlock.vue";

export default defineComponent({
  name: 'BrandsHeaderBar',
  components: {BrandsActionsBlock, CustomButton},
  props: {
    handleSearch: {
      type: Function,
      required: true,
    },
    brands: Array,
    allSelected: Boolean,
    selectedBrands: Array
  },
  data(){
  },
  setup(props, {emit}){
    const inputValue = ref('');
    const allSelected = ref(props.allSelected);

    const debouncedSearch = debounce((value: string) => {
      props.handleSearch(value);
    }, 700);

    const handleInput = (value: string) => {
      inputValue.value = value;
      debouncedSearch(value);
    };

    watch(() => props.allSelected, (newValue) => {
      allSelected.value = newValue
    });


    const handleDelete = () =>{
      emit('deleteBrandClicked')
    }
    const toggleAll = () => {
      emit('toggleAll');
    };

    return {
      inputValue,
      allSelected,
      handleInput,
      toggleAll,
      handleDelete
    };
  }
});
</script>

<style scoped lang="scss">
.header_container{
  background-color: #FFFFFF;
  padding: 24px 16px 24px 8px;
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
  padding-left: 8px;
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