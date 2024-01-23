<template>
  <div class='outer_actions_block'>
    <div class="actions_first_block">
      <v-checkbox color="#1CB5C2" style="padding-left: 0" />
      <v-select
          v-model="selectedActions"
          :items="roleOptions"
          item-title="text"
          item-value="value"
          multiple
          chip
          small-chips
          style="width: 258px"
          placeholder="Выбрано пользователей: 123"
          variant="outlined"
          color="#1CB5C2"
          bg-color="#00000000"
          placeholder-color="red"
      />
    </div>
    <div class="actions_inner_cards">
      <v-select
          v-model="selectedRoles"
          :items="roleOptions"
          item-title="text"
          item-value="value"
          multiple
          chip
          small-chips
          style="width: 144px"
          placeholder="Роли"
          variant="outlined"
          color="#1CB5C2"
          bg-color="#00000000"
          placeholder-color="red"
          class="demo"
      />
      <v-select
          v-model="selectedBrands"
          :items="brands?.map((branch: any) => ({
              text: branch.title.toString(),
              value: branch.id.toString() ,
              }))"
          item-title="text"
          item-value="value"
          multiple
          chip
          small-chips
          style="width: 144px"
          placeholder="Бренд"
          variant="outlined"
          color="#1CB5C2"
          bg-color="#00000000"
          placeholder-color="red"
      />
      <v-select
          v-model="selectedBranches"
          :items="branches?.map((branch: any) => ({
              text: branch.description.toString(),
              value: branch.id.toString() ,
              }))"
          item-title="text"
          item-value="value"
          multiple
          chip
          small-chips
          style="width: 144px"
          placeholder="Филиал"
          variant="outlined"
          color="#1CB5C2"
          bg-color="#00000000"
          placeholder-color="red"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'ActionsBlock',
  props: {
    branches: Array,
    brands: Array,
  },
  setup(_, {emit}) {
    const selectedRoles = ref([]);
    watch(selectedRoles, (newValue) => {
      emit('updateRoles', newValue);
    });
    return {
      selectedRoles,
      selectedBrands: [],
      selectedActions: [],
      selectedBranches: [],
      roleOptions: [
        {text: "Админ", value: "owner"},
        {text: "Директор", value: "branch_director"},
        {text: "Менеджер", value: "sales_manager"}
      ]
    };
  },
});
</script>


<style>
.actions_first_block {
  display: flex;
}

.outer_actions_block {
  display: flex;
  justify-content: space-between;
}

.v-text-field input {
  font-size: 14px;
}

.v-text-field input::placeholder {
  color: #000;
  opacity: 1.0;
  font-weight: bold;
  font-size: 14px;
}

.actions_inner_cards {
  display: flex;
  gap: 8px;
}

.v-list-item-title {
  color: black !important;
  font-size: 14px;
}

.v-list-item__overlay {
  background-color: transparent !important;
}

.v-list-item__underlay {
  background-color: transparent !important;
}

.v-field__input {
  min-height: 40px;
  padding-top: 10px;
}

.v-text-field.v-text-field--solo .v-input__control {
  min-height: 90px;
}

.v-list-item {
  padding: 0;
}

.v-input__details {
  display: none;
}

</style>
