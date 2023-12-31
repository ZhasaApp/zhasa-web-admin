<template>
  <div class="content-body">
    <HeaderBar
        @modalToggler="modalToggler"
        :handleSearch="handleSearch"
    />
    <TableData
        v-if="!isLoading"
        :tableData="usersTableData"
        :columns="tableColumns"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
    />
    <span v-else>Загрузка ...</span>
    <AddManagerRoleModal
        :modalActive="modalActive"
        :toggleModal="modalToggler"
        @addManager="onAddRole"
        :branches="branches"
        :brands="brands"/>
  </div>
  <a-alert
      v-if="showAlert"
      message="Роль менеджера добавлена"
      type="success"
      show-icon
      class="success-alert"
  />
</template>

<script lang="ts">

import {computed, defineComponent, ref, watch} from 'vue';
import AddManagerRoleModal from "./AddManagerRoleModal.vue";
import TableData from "../../common/TableData.vue";
import HeaderBar from "../../common/HeaderBar.vue";
import {TOKEN} from "../../constants.ts";
import useAllUsersWithRoles from "../../../hooks/useAllUsersWithRoles.ts";
export default defineComponent({
  name: 'RolesPage',
  components: {AddManagerRoleModal, TableData, HeaderBar},
  data() {
    return {
      branches: [],
      brands: [],
      modalActive: false,
      errorMessage: '',
      showAlert: false
    }
  },
  mounted() {
    const headers = {
      'Authorization': TOKEN,
    };
    fetch('http://185.182.219.90/admin/branches', {headers})
        .then(response => response.json())
        .then(data => this.branches = data?.result)
        .catch(error => console.log(error));

    fetch('http://185.182.219.90/admin/brands', {headers})
        .then(response => response.json())
        .then(data => this.brands = data?.result)
        .catch(error => console.log(error));
  },
  setup() {
    const searchValue = ref('');
    const {users, isLoading, fetching, totalCount, size} =  useAllUsersWithRoles();
    const usersTableData = computed(() => {
      if (!users.value || isLoading.value) {
        return [];
      }
      return users.value.map((user: any) => {
        return {
          id: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          branchTitle: user.branch_title,
          brands: user.brands
        };
      });
    });
    const tableColumns = [
      {key: 'id', label: 'ID'},
      {key: 'fullName', label: 'ФИО'},
      {key: 'branchTitle', label: 'Филиал'},
      {key: 'brands', label: 'Бренд'},
    ]
    const handleSearch = (value:any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue)
    });
    return {
      usersTableData,
      tableColumns,
      isLoading,
      totalCount,
      size,
      fetching,
      handleSearch,
      searchValue
    }
  },
  methods: {
    modalToggler() {
      this.modalActive = !this.modalActive;
    },
    onAddRole(data: any) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
              user_id: parseInt(data.selectedUserId),
              branch_id: parseInt(data.selectedBranchId),
              brands: Array.from<string>(data.selectedBrandsIds).map((item: string) => parseInt(item))
            })
      }
      fetch('http://185.182.219.90/admin/manager', requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              this.errorMessage = error.message;
              return Promise.reject(error);
            }
            console.log(data)
            this.modalToggler()
            setTimeout(() => {
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }, 200);
          })
          .catch(error => {
            console.error("There was an error!", error);
          });
    },
  }
});
</script>

<style scoped lang="scss">
.content-body {
  padding-top: 24px;
}

.success-alert {
  position: absolute;
  max-width: 590px;
  width: 80%;
  border-radius: 12px;
  padding: 20px;
  bottom: 15%;
}
</style>