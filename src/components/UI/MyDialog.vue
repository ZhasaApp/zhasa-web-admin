<template>
  <div class="dialog" v-if="isShow" @click.stop="hideDialog">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog(){
      this.$emit ('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>