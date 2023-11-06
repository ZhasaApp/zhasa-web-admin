<template>
  <button
      type="button"
      class="customButton"
      :style="{ ...additionalStyles }"
      :disabled = "disabled"
      @click="callback">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    additionalStyles: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    callback: () => void {}
  },
});
</script>
<style>
  .customButton{
    background: linear-gradient(100.41deg, #1DD6B4 0%, #188ED0 99.92%);
    border: none;
    color: #EDEDED;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    border-radius: 12px;
    font-style: normal;
    width: 100%;
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>