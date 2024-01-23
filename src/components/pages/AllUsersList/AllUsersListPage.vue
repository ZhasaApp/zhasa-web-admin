<template>
  <div class="content-body">
    <HeaderBar
        @modalToggler="modalToggler"
        :handleSearch="handleSearch"
        :isCreate="true"
        :brands="brands"
        :branches="branches"
        @updateRoles="updateSelectedRoles"
    />
    <TableData
        v-if="!isLoading"
        :tableData="usersTableData"
        :columns="tableColumns"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
        @updateRoles="updateSelectedRoles"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreatUserModal
      :modalActive="modalActive"
      :toggleModal="modalToggler"
      @createUser="onCreateUser"
      :errorMessage="errorMessage"
  />
  <a-alert
      v-if="showAlert"
      message="Новый пользователь успешно создан"
      type="success"
      show-icon
      class="success-alert"
  />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import CreatUserModal from "./CreatUserModal.vue";
import {TOKEN} from "../../constants.ts";
import TableData from "../../common/TableData.vue";
import HeaderBar from "../../common/HeaderBar.vue";
import useAllUsersWithRoles from "../../../hooks/useAllUsersWithRoles.ts";
import {ref, watch} from 'vue'
import AddManagerRoleModal from "../AllRoles/AddManagerRoleModal.vue";

export default defineComponent({
  name: 'AllUsersListPage',
  components: {AddManagerRoleModal, CreatUserModal, TableData, HeaderBar},
  data() {
    return {
      branches: [],
      brands: [],
      modalActive: false,
      createdUserId: '',
      errorMessage: '',
      showAlert: false,
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
    const selectedRoles = ref([]);
    const updateSelectedRoles = (roles: any) => {
      selectedRoles.value = roles;
    };
    const {users, isLoading, fetching, totalCount, size} = useAllUsersWithRoles();
    const usersTableData = computed(() => {
      if (!users.value || isLoading.value) {
        return [];
      }
      return users.value.map((user: any) => {
        return {
          id: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          phone: `${user.phone.slice(0, 2)} ${user.phone.slice(2, 5)} ${user.phone.slice(5, 8)}
          ${user.phone.slice(8, 10)} ${user.phone.slice(10)}`,
          branch: `${user.branch_title ?? '-'}`,
          brand: `${user.brands.join(', ')}`,
          role: user.role
        };
      });
    });

    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      console.log('ddd', [])
      fetching(1, searchValue, [])
    });

    watch(selectedRoles, (selectedRoles) => {
      console.log('123456', [])
      fetching(1, searchValue.value, selectedRoles)
    });

    return {
      usersTableData,
      isLoading,
      users,
      totalCount,
      size,
      fetching,
      handleSearch,
      searchValue,
      selectedRoles,
      updateSelectedRoles,
      roleOptions: [
        {text: "Админ", value: "owner"},
        {text: "Директор", value: "branch_director"},
        {text: "Менеджер", value: "sales_manager"}
      ],
      tableColumns: [
        {key: 'id', label: 'ID', width: '56px'},
        {key: 'fullName', label: 'ФИО', width: '216px'},
        {key: 'phone', label: 'Номер телефона', width: '168px'},
        {key: 'branch', label: 'Филиал', width: '188px'},
        {key: 'brand', label: 'Бренд', width: '140px'},
        {key: 'role', label: 'Роль', width: '198px'}
      ]
    }
  },
  methods: {
    modalToggler() {
      this.modalActive = !this.modalActive;
    },
    onCreateUser(dataBody: any) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: dataBody.telephoneNumber.replace(/\s/g, ''),
          first_name: dataBody.firstName,
          last_name: dataBody.lastName,
        })
      };
      fetch('http://185.182.219.90/admin/user', requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              console.log("HERE IT IS", error)
              this.errorMessage = error.message;
              return Promise.reject(error);
            }
            this.createdUserId = data;
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
    }
  }
});
</script>

<style lang="scss" scoped>
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