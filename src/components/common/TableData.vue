<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
      <tr>
        <th :style="{width: '52px'}"></th>
        <th v-for="(column, index) in columns" :key="index" :style="{width: column.width}">
          {{ column.label }}<sort-icon v-show="column.withSort" @update:sort="handleSort" :columnName="column.key" :mainSortState="currentSortState" />
        </th>
        <th :style="{width: '52px'}"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" :style="'background: ' + (row.deleted ? '#ffe7e7' : '')">
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
              style="width: 200px;"
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
              <template v-if="row.deleted">
                <v-list-item @click="handleRestore(rowIndex)">
                  <v-list-item-content style="color: dodgerblue; font-size: 14px; padding: 0">Восстановить</v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item @click="handleEdit(rowIndex)">
                  <v-list-item-content style="color: black; font-size: 14px; padding: 0">Редактировать</v-list-item-content>
                </v-list-item>
                <v-list-item @click="handleDelete(rowIndex)">
                  <v-list-item-content style="color: red; font-size: 14px; padding: 0">Удалить</v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="bottom-bar">
      <div class="table-footer">
        <span>Всего: <b>{{totalCount ?? "Не указана"}}</b></span>
        <a-pagination
            v-model:current="currentPage"
            :total="totalCount"
            :default-page-size="size"
            :showSizeChanger="false"
            @change="$emit('handlePageChange', currentPage, searchValue, filterRoles, filterBrands, filterBranches, currentSortState, showDeletedUsers)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue';
import SortIcon from "./SortIcon.vue";
import {ROLE_OPTIONS} from "../../utils/Constants.ts";

interface TableColumn {
  key: string;
  label: string;
  width: string;
  withSort: boolean;
}

interface TableRow {
  [key: string]: any;
}

export default defineComponent({
  name: 'TableData',
  components: {
    SortIcon
  },
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
    },
    showDeletedUsers: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const currentPage = ref(1);
    const currentSortState = ref<any>(null)
    const selectedIndex = ref<number>(-1);
    const roleOptions = ROLE_OPTIONS
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
    watch(() => props.showDeletedUsers, () => {
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

    const handleRestore = (index: number) => {
      emit('onUserRestore', props.tableData[index]);
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
    const handleSort = (sortState: any) => {
      currentSortState.value = sortState
      emit('sortSelected', sortState)
    }

    return {
      currentPage,
      roleOptions,
      handleEdit,
      handleDelete,
      toggleSelection,
      getRoleText,
      onRowSelected,
      handleRole,
      handleSort,
      currentSortState,
      handleRestore
    }
  }
});
</script>

<style>
.table-container {
  background: none;
  max-height: calc(100vh);
}

td .v-text-field input::placeholder, td .v-select__selection-text {
  color: #000;
  opacity: 1.0;
  font-weight: 600;
  font-size: 10px;
}

td .v-text-field input {
  padding: 0;
}

td .v-text-field {
  padding: 0;
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
  overflow: hidden;

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

.bottom-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 20px auto;
  align-items: center;
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

.ant-pagination-item-active {
  border-color: #1CB5C2 !important;
  color: #1CB5C2 !important;
}

.ant-pagination-item-active a {
  color: #1CB5C2 !important;
}

.ant-select-selector {
  height: 48px !important;
  border-radius: 12px !important;
  border: 1px solid #999 !important;
}

.ant-select-selection-placeholder,
.ant-select-selection-item,
.ant-select-selection-search {
  padding: 8px 0 !important;
}

.ant-select-selection-search-input {
  margin: 0 !important;
}

.selector-with_multiple-select {
  width: 100%;

  .ant-select-selection-item {
    padding: 0 !important;
  }
}

</style>

