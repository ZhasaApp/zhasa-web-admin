<template>
  <v-icon @click="toggleSort">
    {{ icon }}
  </v-icon>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent ({
  name: 'SortIcon',
  props: {
    columnName: {
      type: String,
      required: true
    },
    mainSortState: Object
  },
  data() {
    return {
      currentSortState: 'none' // 'none', 'asc', 'desc'
    };
  },
  computed: {
    icon() {
      if (this.mainSortState?.columnName === this.columnName) {
        switch (this.currentSortState) {
          case 'none':
            return 'mdi-unfold-more-horizontal';
          case 'asc':
            return 'mdi-chevron-up';
          case 'desc':
            return 'mdi-chevron-down';
        }
      } else {
        return 'mdi-unfold-more-horizontal';
      }
    }
  },
  methods: {
    toggleSort() {
      this.currentSortState = this.currentSortState === 'asc' ? 'desc' : (this.currentSortState === 'desc' ? 'none' : 'asc');
      this.$emit('update:sort', { sortState: this.currentSortState, columnName: this.columnName });
    }
  }
});
</script>
