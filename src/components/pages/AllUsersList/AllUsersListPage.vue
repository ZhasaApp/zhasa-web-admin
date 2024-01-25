<template>
  <div class="content-body">
    <HeaderBar
        @modalToggler="modalToggler"
        :handleSearch="handleSearch"
        :isCreate="true"
        :brands="brands"
        :branches="branches"
        :allSelected="allSelected"
        :selectedUsers="selectedUsers"
        @updateRolesFilter="updateSelectedRoles"
        @updateBrandsFilter="updateSelectedBrands"
        @updateBranchesFilter="updateSelectedBranches"
        @editRoleClicked="editRoleClicked"
        @toggleAll="toggleAll"
    />
    <TableData
        v-if="!isLoading"
        :tableData="usersTableData"
        :columns="tableColumns"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
        @updateRolesFilter="updateSelectedRoles"
        @updateBrandsFilter="updateSelectedBrands"
        @updateBranchesFilter="updateSelectedBranches"
        @toggleSelection="toggleSelection"
        :filterRoles="selectedRoles"
        :filterBrands="selectedBrands"
        :filterBranches="selectedBranches"
        :selectedUsers="selectedUsers"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreatUserModal
      :modalActive="modalActive"
      :toggleModal="modalToggler"
      @createUser="onCreateUser"
      :brands="brands"
      :branches="branches"
      :errorMessage="errorMessage"
  />
  <ChangeRole
      :modalActive="editRoleModalActive"
      :toggleModal="editRoleModalToggler"
      @editRoleFromDropDown="editRoleAction"
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
import ChangeRole from "../Modals/ChangeRole.vue";
import ActionsBlock from "../../common/ActionsBlock.vue";

export default defineComponent({
  name: 'AllUsersListPage',
  components: {ActionsBlock, ChangeRole, AddManagerRoleModal, CreatUserModal, TableData, HeaderBar},
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
    const selectedBrands = ref([]);
    const selectedBranches = ref([]);

    const selectedUsers = ref([]);
    const allSelected = ref(false);
    const editRoleModalActive = ref(false)

    watch(selectedUsers, (newVal) => {
      if (newVal.length === usersTableData.value.length) {
        allSelected.value = true;
      } else {
        allSelected.value = false;
      }
    });

    function toggleAll() {
      if (allSelected.value) {
        selectedUsers.value = [];
      } else {
        selectedUsers.value = usersTableData.value.map((user) => (user.id))
      }
    }

    const toggleSelection = (rowIndex: number) => {
      let userId = usersTableData.value[rowIndex].id
      if (selectedUsers.value.includes(userId)) {
        selectedUsers.value = selectedUsers.value.filter(i => i !== userId);
      } else {
        selectedUsers.value = [...selectedUsers.value, userId]
      }
    };

    const updateSelectedRoles = (roles: any) => {
      selectedRoles.value = roles;
    };
    const updateSelectedBrands = (brands: any) => {
      selectedBrands.value = brands;
    };
    const updateSelectedBranches = (branches: any) => {
      selectedBranches.value = branches;
    };
    const editRoleModalToggler = () => {
      editRoleModalActive.value = !editRoleModalActive.value
    };
    const editRoleClicked = () => {
      editRoleModalToggler()
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

    const initPage = () => {
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands.value, selectedBranches.value)
      selectedUsers.value = [];
    };
    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue, [], [], [])
    });

    watch(selectedRoles, (selectedRoles) => {
      fetching(1, searchValue.value, selectedRoles, selectedBrands.value, selectedBranches.value)
    });

    watch(selectedBrands, (selectedBrands) => {
      console.log("INSIDE WATCH, selectedBrands=", selectedBrands)
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands, selectedBranches.value)
    });

    watch(selectedBranches, (selectedBranches) => {
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands.value, selectedBranches)
    });

    const editRoleAction = (data: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_ids: selectedUsers.value,
          new_role: data.role,
        })
      };
      fetch('http://185.182.219.90/admin/change-users-role', requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              console.log("HERE IT IS", error)
              return Promise.reject(error);
            }
            editRoleModalToggler()
            console.log("SUCCESS")
            initPage()
          })
          .catch(error => {
            console.error("There was an error!", error);
          });
    }
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
      selectedBrands,
      selectedBranches,
      selectedUsers,
      toggleAll,
      allSelected,
      toggleSelection,
      updateSelectedRoles,
      updateSelectedBrands,
      updateSelectedBranches,
      editRoleModalToggler,
      editRoleClicked,
      editRoleAction,
      editRoleModalActive,
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