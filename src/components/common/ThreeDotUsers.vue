<template>
  <div class="three-dots-users">
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            class="custom-btn"
            icon
            v-bind="props"
            variant="plain"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <div class="flex">
            <v-checkbox label="Показать удаленные" color="#1CB5C2" v-model="show_deleted" @change="toggleShowDeleted"/>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'ThreeDotUsers',
  setup(_, {emit}) {

    const menu = ref(false)
    const show_deleted = ref(false)

    const toggleShowDeleted = () => {
      emit('toggleShowDeleted', show_deleted.value);
    };

    return {
      menu,
      show_deleted,
      toggleShowDeleted
    };
  }
});
</script>

<style scoped>
  .three-dots-users {
    margin-top: 12px;
  }
  .v-btn--icon {
    width: 24px;
  }
  .v-ripple__container {
    display:none !important;
  }
  .custom-btn:deep(.v-btn__overlay) {
    display: none;
  }
  .custom-btn:deep(.v-btn__underlay) {
    display: none;
  }
  .custom-btn:deep(.v-ripple__container) {
    display: none;
  }
</style>