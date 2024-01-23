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
              @change="toggleSelection(rowIndex)">
          </v-checkbox>
        </td>
        <td v-for="(column, columnIndex) in columns" :key="columnIndex">
          <v-select
              v-if="column.key === 'role'"
              :items="roleOptions"
              item-title="text"
              item-value="value"
              placeholder="Бренд"
              variant="outlined"
              style="width: 105px"
          >
          </v-select>
          <span v-else>{{ row[column.key] }}</span>
        </td>
        <td>
          <v-menu>
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
                <v-list-item-content>Редактировать</v-list-item-content>
              </v-list-item>
              <v-list-item @click="handleDelete(rowIndex)" color="red">
                <v-list-item-content>Удалить</v-list-item-content>
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
          @change="$emit('handlePageChange', currentPage, searchValue, filterRoles)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue';
import {ro} from "vuetify/locale";

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
    selectedUsers: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const currentPage = ref(1);
    watch(() => props.searchValue, () => {
      currentPage.value = 1;
    });
    watch(() => props.filterRoles, () => {
      currentPage.value = 1
    })

    const menu = ref<Array<boolean>>([]);

    const toggleMenu = (rowIndex: number, event: MouseEvent) => {
      console.log("RowIndex=", rowIndex)
      menu.value[rowIndex] = !menu.value[rowIndex];
      console.log("menu.value[rowIndex]=", menu.value[rowIndex])
      event.preventDefault();
    };

    const handleEdit = (rowIndex: number) => {
      menu.value[rowIndex] = false;
      // Handle edit action for the specific row
    };

    const handleDelete = (rowIndex: number) => {
      menu.value[rowIndex] = false;
      // Handle delete action for the specific row
    };

    const toggleSelection = (rowIndex: number) => {
      console.log("TOGGLE")
      emit('toggleSelection', rowIndex);
    };

    return {
      currentPage,
      roleOptions: [
        {text: "Админ", value: "owner"},
        {text: "Директор", value: "branch_director"},
        {text: "Менеджер", value: "sales_manager"}
      ],
      column: {key: 'role'},
      items: [
        {title: 'Редактировать'},
        {title: 'Click Me'},
      ],
      menu,
      toggleMenu,
      handleEdit,
      handleDelete,
      toggleSelection
    }
  },
  methods: {
    editItem() {
      // Add your edit logic here
      console.log('Edit clicked');
    },
    deleteItem() {
      // Add your delete logic here
      console.log('Delete clicked');
    },
  }
});
</script>

<style>
.table-container {
  background: none;
  max-height: calc(100vh - 160px);
  overflow-x: scroll;
  overflow-y: scroll;
}

td .v-text-field input::placeholder, td .v-select__selection-text {
  color: #000;
  opacity: 1.0;
  font-weight: bold;
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
</style>