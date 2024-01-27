<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
      <tr>
        <th :style="{width: '52px'}"></th>
        <th v-for="(column, index) in columns" :key="index" :style="{width: column.width}">
          {{ column.label }}
        </th>
        <th :style="{width: '52px'}"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <td>
          <v-checkbox
              color="#1CB5C2"
              v-model="selectedUsers"
              :value="row.id"
              style="padding-left: 8px"
              @change="toggleSelection(rowIndex)">
          </v-checkbox>
        </td>
        <td v-for="(column, columnIndex) in columns" :key="columnIndex">
          <v-select
              class="table-vselect"
              v-if="column.key === 'role'"
              :items="roleOptions"
              item-title="text"
              item-value="value"
              :placeholder="getRoleText(row.role)"
              variant="outlined"
              style="width: 105px;"
              @click="onRowSelected(rowIndex)"
          >
            <template v-slot:item="{ item }" style="">
              <v-list-item
                  style="padding: 0 12px"
                  @click="handleRole(item.value, rowIndex)">
                <v-list-item-icon>
                  <v-icon v-if="row.role === item.value">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-icon v-if="row.role !== item.value" style="opacity: 0">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                    style="padding-left: 8px; font-size: 14px; margin: 0; font-weight: 400">
                  {{item.title}}
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
          <span v-else>{{ row[column.key] }}</span>
        </td>
        <td>
          <v-menu class="table-vmenu">
            <template v-slot:activator="{ props }">
              <v-btn
                  icon
                  v-bind="props"
                  variant="plain"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="handleEdit(rowIndex)">
                <v-list-item-content style="color: black; font-size: 14px; padding: 0">Редактировать</v-list-item-content>
              </v-list-item>
              <v-list-item @click="handleDelete(rowIndex)" color="red">
                <v-list-item-content style="color: red; font-size: 14px; padding: 0">Удалить</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="table-footer">
      <a-pagination
          v-model:current="currentPage"
          :total="totalCount"
          :default-page-size="size"
          :showSizeChanger="false"
          @change="$emit('handlePageChange', currentPage, searchValue, filterRoles, filterBrands, filterBranches)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue';

interface TableColumn {
  key: string;
  label: string;
  width: string;
}

interface TableRow {
  [key: string]: any;
}

export default defineComponent({
  name: 'TableData',
  props: {
    tableData: {
      type: Array as PropType<TableRow[]>,
      required: true,
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true,
    },
    totalCount: {
      type: Number
    },
    size: {
      type: Number
    },
    searchValue: {
      type: String
    },
    filterRoles: {
      type: Array
    },
    filterBrands: Array,
    filterBranches: Array,
    selectedUsers: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const currentPage = ref(1);
    const selectedIndex = ref<number>(-1);
    const roleOptions = [
      {text: "Админ", value: "owner"},
      {text: "Директор", value: "branch_director"},
      {text: "Менеджер", value: "sales_manager"}
    ]
    watch(() => props.searchValue, () => {
      currentPage.value = 1;
    });
    watch(() => props.filterRoles, () => {
      currentPage.value = 1
    })
    watch(() => props.filterBrands, () => {
      currentPage.value = 1;
    });
    watch(() => props.filterBranches, () => {
      currentPage.value = 1
    })

    const onRowSelected = (rowIndex: number) => {
      selectedIndex.value = rowIndex
    };

    const handleEdit = (index: number) => {
      emit('onUserEdit', props.tableData[index]);
    };

    const handleDelete = (index: number) => {
      emit('onUserDelete', props.tableData[index]);
    };

    const toggleSelection = (rowIndex: number) => {
      emit('toggleSelection', rowIndex);
    };

    const getRoleText = (roleValue: string) => {
      const role = roleOptions.find((option: any) => option.value === roleValue);
      return (role ? role.text : 'Select Role').toUpperCase();
    };

    const handleRole = (role: string, index: number) => {
      emit('onRoleSelected', role, props.tableData[index]);
    }

    return {
      currentPage,
      roleOptions,
      handleEdit,
      handleDelete,
      toggleSelection,
      getRoleText,
      onRowSelected,
      handleRole
    }
  }
});
</script>

<style>
.table-container {
  background: none;
  max-height: calc(100vh);
  overflow-x: scroll;
  overflow-y: scroll;
}

td .v-text-field input::placeholder, td .v-select__selection-text {
  color: #000;
  opacity: 1.0;
  font-weight: 600;
  font-size: 10px;
}


td .v-list-item-title {
  color: black !important;
  font-size: 10px;
}

td .v-field {
  height: 24px;
}

td .v-field__input {
  padding: 0 0 0 12px;
  margin: 0;
  height: 16px !important;
}

td .v-select__selection {
  margin-top: -16px;
}

td .v-field__field {
  height: 16px;
}

td .v-field__append-inner {
  width: 16px;
  height: 16px;
  margin-top: 4px;
  margin-right: 4px;
}


.three-dots-btn {
  border: none;
}

.custom-table {
  background-color: #FFFFFF;
  box-shadow: 0 2px 9px 2px rgba(134, 134, 134, 0.10);
  border-radius: 12px;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;

  th {
    color: #706B8C;
    padding-top: 14px;
    padding-bottom: 14px;
    box-sizing: content-box;

  }

  td {
    color: #333;
  }
}

thead {
  padding: 10px;
  background-color: #EDEDED;
}

.custom-table th, .custom-table td {
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box;
}

.table-footer {
  display: flex;
  left: 50%;
  justify-content: right;
  margin: 20px auto;
}

.table-vmenu .v-list-item--density-default.v-list-item--one-line{
  min-height: 0;
  height: 40px;
  padding: 12px;
}

.table-vmenu .v-list{
  padding: 0;
}

.table-vselect .v-list-item--density-default.v-list-item--one-line {
  min-height: 0;
  height: 40px;
  padding: 12px;
}

.table-vselect .v-list{
  padding: 0;
}


.v-overlay-container .v-list-item--density-default.v-list-item--one-line {
  min-height: 0;
  height: 40px;
}

</style>

