<template>
  <div class="table-data">
    <div class="table-container">
      <table class="custom-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>Номер телефона</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
<!--        <tr v-for="item in tableData" :key="item.id">-->
<!--          <td>{{ item.id }}</td>-->
<!--          <td>{{ item.fullName }}</td>-->
<!--          <td>{{ item.telephoneNumber }}</td>-->
<!--          <td>-->
<!--              <img src="@/assets/icon-edit-pen.svg" alt="Edit Pen" @click="openEditModal(item.id)">-->
<!--          </td>-->
<!--        </tr>-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TableData',
  data() {
    return {
      tableData: [
        { id: 1, fullName: 'John Doe', telephoneNumber: '1234567890' },
        { id: 2, fullName: 'Jane Smith Jane SmithJane thJane Smith', telephoneNumber: '9876543210' },
        // Add more data as needed
      ]
    };
  },
  methods: {
    openEditModal(id: number) {
      // Logic to open the edit modal based on the ID
      // You can use a store, emit an event, or other approaches
      console.log('Open edit modal for ID:', id);
    }
  }
});
</script>

<style scoped lang="scss">
.table-data {
  margin-top: 16px;
  margin-bottom: 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 9px 2px rgba(134, 134, 134, 0.10);
}
.table-container {
  border-radius: 12px;
  overflow-x: auto;
}

.custom-table {
  background-color: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}

.custom-table th, .custom-table td {
  background-color: #FFFFFF;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
}
</style>