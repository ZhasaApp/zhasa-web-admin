<template>
  <div class='outer_actions_block'>
    <div class="actions_first_block">
      <v-checkbox color="#1CB5C2" style="padding-left: 0" v-model="allSelected" @change="toggleAll"/>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              color="primary"
              v-bind="props"
              :variant="selectedUsers.length > 0 ? 'tonal' : 'none'"
              :disabled="selectedUsers.length === 0"
              style="width: 270px; text-align: left"
          >
            {{ selectedUsers.length > 0 ? 'Выбрано пользователей ' + selectedUsers.length + '  ' : 'Выбрать все' }}
            <v-icon v-if="selectedUsers.length > 0">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleEditRole">
            <v-list-item-content>Поменять роль</v-list-item-content>
          </v-list-item>
          <v-list-item @click="handleEditBranch">
            <v-list-item-content>Поменять филиал</v-list-item-content>
          </v-list-item>
          <v-list-item @click="handleEditBrand">
            <v-list-item-content>Поменять бренд</v-list-item-content>
          </v-list-item>
          <v-list-item @click="handleDeleteUsers" >
            <v-list-item-content><span class="deleteText">Удалить</span></v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
              text: branch.title.toString(),
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
    allSelected: Boolean,
    selectedUsers: Array
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
      console.log("branches",props.branches)
      emit('updateBrandsFilter', newValue);

    });
    watch(selectedBranches, (newValue) => {
      emit('updateBranchesFilter', newValue);
    });

    watch(() => props.allSelected, (newValue) => {
      allSelected.value = newValue
    });

    const toggleAll = () => {
      emit('toggleAll');
    };

    const handleEditRole = () => {
      emit('editRoleClicked');
    };
    const handleEditBranch = () => {
      emit('editBranchClicked');
    };
    const handleEditBrand = () => {
      emit('editBrandClicked');
    };
    const handleDeleteUsers = () => {
      emit('deleteUserClicked');
    };

    return {
      selectedRoles,
      selectedBrands,
      selectedBranches,
      allSelected,
      toggleAll,
      handleEditRole,
      handleEditBranch,
      handleEditBrand,
      handleDeleteUsers,
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
  align-items: center;
}

.actions_first_block .v-btn--disabled {
  text-align: start !important;
  color: #4D4D4D !important;
  opacity: 1.0 !important;
}

.actions_first_block .v-btn__content  {
  justify-content: left !important;
  text-transform: initial !important;
  font-weight: bold;
}

.actions_first_block .v-btn  {
  display: block !important;
}

.actions_first_block .v-btn--variant-tonal  {
  background-color: #fff !important;
  color: #4D4D4D !important;
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
  padding: 0;
}

.actions_inner_cards {
  display: flex;
  gap: 8px;
}
.deleteText{
  color: red;
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

.outer_actions_block .v-input--density-default {
  --v-input-control-height: 0px;
  --v-input-padding-top: 0px;
}

.outer_actions_block .v-field--appended {
  padding-inline-end: 8px;
}

.outer_actions_block .v-field__input {
  padding: 8px;
}


</style>
