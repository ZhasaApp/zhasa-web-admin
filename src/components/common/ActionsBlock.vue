<template>
  <div class='outer_actions_block'>
    <div class="actions_first_block">
      <v-checkbox color="#1CB5C2" style="padding-left: 0" v-model="allSelected" @change="toggleAll"/>
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
      >
        <template v-slot:selection="{ index }">
          <span v-if="index === 0" class="innerSpan">Роли</span>
        </template>
      </v-select>
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
          placeholder="Бренды"
          variant="outlined"
          color="#1CB5C2"
          bg-color="#00000000"
          placeholder-color="red"
      >
        <template v-slot:selection="{ index }">
          <span v-if="index === 0" class="innerSpan">Бренд</span>
        </template>
      </v-select>
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
      >
        <template v-slot:selection="{ index }">
          <span v-if="index === 0" class="innerSpan">Филиалы</span>
        </template>
      </v-select>
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
    allSelected: Boolean
  },
  setup(props, {emit}) {
    const selectedRoles = ref([]);
    const selectedBrands = ref([]);
    const selectedBranches = ref([]);
    const allSelected = ref(props.allSelected);

    watch(selectedRoles, (newValue) => {
      emit('updateRolesFilter', newValue);
    });
    watch(selectedBrands, (newValue) => {
      emit('updateBrandsFilter', newValue);
    });
    watch(selectedBranches, (newValue) => {
      emit('updateBranches', newValue);
    });

    watch(() => props.allSelected, (newValue) => {
      allSelected.value = newValue
    });

    const toggleAll = () => {
      emit('toggleAll');
    };

    return {
      selectedRoles,
      selectedBrands,
      selectedActions: [],
      selectedBranches,
      allSelected,
      toggleAll,
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

.v-text-field input::placeholder, .innerSpan {
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

.v-list-item {
  padding: 0;
}

.v-input__details {
  display: none;
}

</style>
