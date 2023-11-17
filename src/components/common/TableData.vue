<template>
    <div class="table-container">
      <table class="custom-table">
        <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" :style="{minWidth: index==0 ? '86px' : '306px'}">
            {{ column.label }}
          </th>
          <th :style="{width: '86px'}"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(column, columnIndex) in columns" :key="columnIndex">
            {{ row[column.key] }}
          </td>
          <td>
            <img src="../../assets/icon-edit-pen.svg" alt="Edit Pen">
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
            @change="$emit('handlePageChange', currentPage, searchValue)"
        />
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue';
interface TableColumn {
  key: string;
  label: string;
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
    totalCount : {
      type: Number
    },
    size: {
      type: Number
    },
    searchValue: {
      type: String
    }
  },
  setup(props){
    const currentPage = ref(1);
    watch(() => props.searchValue, () => {
      currentPage.value = 1;
    });
    return{
      currentPage,
    }
  },
  methods: {
  }
});
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 16px;
  background: none;
  max-height:calc(100vh - 160px);
  overflow-x: scroll;
  overflow-y: scroll;
}

.custom-table {
  background-color: #FFFFFF;
  box-shadow: 0px 2px 9px 2px rgba(134, 134, 134, 0.10);
  border-radius: 12px;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;

  th {
    color: #999;
    padding: 24px 24px 16px 24px;
    box-sizing: content-box;
  }

  td {
    color: #333;
    padding-left: 24px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
}

thead {
  padding: 10px;
}

.custom-table th, .custom-table td {
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  box-sizing: border-box;
}
.table-footer{
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-bottom: 20px
}
</style>