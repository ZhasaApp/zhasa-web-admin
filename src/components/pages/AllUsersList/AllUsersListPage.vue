<template>
  <div class="content-body">
    <HeaderBar
        @modalToggler="createUserModalToggler"
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
        @editBrandClicked="editBrandClicked"
        @editBranchClicked="editBranchClicked"
        @deleteUserClicked="deleteUserClicked"
        @toggleAll="toggleAll"
    />
    <TableData
        v-if="!isLoading"
        :tableData="usersTableData"
        :columns="tableColumns"
        @sortSelected="handleSortSelected"
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
        @onRoleSelected="onRoleSelected"
        @onUserDelete="onUserDelete"
        @onUserEdit="onUserEdit"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreatUserModal
      :modalActive="modalActive"
      :toggleModal="createUserModalToggler"
      @createUser="onCreateUser"
      :brands="brands"
      :branches="branches"
      :errorMessage="errorMessage"
  />
  <EditUserModal
      :editModalActive="editModalActive"
      :editToggleModal="editToggleModal"
      @editUser="onEditUser"
      :brands="brands"
      :branches="branches"
      :errorMessage="errorMessage"
      :user="selectedEditUser"
      :defaultOption="selectedEditUserDefaultOption"
  />
  <ChangeRole
      :modalActive="editRoleModalActive"
      :toggleModal="editRoleModalToggler"
      @editRoleFromDropDown="editRoleAction"
  />
  <ChangeBrandModal
      :modalActive="editBrandModalActive"
      :toggleModal="editBrandModalToggler"
      :brands="brands"
      @editBrandFromDropDown="editBrandAction"
  />
  <ChangeBranchModal
      :modalActive="editBranchModalActive"
      :toggleModal="editBranchModalToggler"
      :branches="branches"
      @editBranchFromDropDown="editBranchAction"
  />
  <DeleteModal
      :deleteItems="deleteItems"
      :modalActive="deleteModalActive"
      :toggleModal="closeDeleteModal"
      @deleteFromDropDown="deleteAction"
  />
  <a-alert
      v-if="showAlert.length > 0"
      :message="showAlert"
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
import ChangeBrandModal from "../Modals/ChangeBrandModal.vue";
import ChangeBranchModal from "../Modals/ChangeBranchModal.vue";
import DeleteModal from "../Modals/DeleteModal.vue";
import EditUserModal from "./EditUserModal.vue";
import {BASE_URL} from "../../../utils/EnvConstants.ts";
import {ROLE_OPTIONS} from "../../../utils/Constants.ts";

export default defineComponent({
  name: 'AllUsersListPage',
  components: {
    EditUserModal,
    DeleteModal,
    ChangeBranchModal,
    ChangeBrandModal, ActionsBlock, ChangeRole, AddManagerRoleModal, CreatUserModal, TableData, HeaderBar
  },
  mounted() {
    const headers = {
      'Authorization': TOKEN,
    };
    fetch(`${BASE_URL}/branches`, {headers})
        .then(response => response.json())
        .then(data => this.branches = data?.result)
        .catch(error => console.log(error));

    fetch(`${BASE_URL}/brands`, {headers})
        .then(response => response.json())
        .then(data => this.brands = data?.result)
        .catch(error => console.log(error));
  },
  setup() {
    const pureUserList = ref<Array<any>>([])
    const branches = ref<Array<any>>([])
    const brands = ref<Array<any>>([])

    const searchValue = ref('');
    const selectedRoles = ref([]);
    const selectedBrands = ref([]);
    const selectedBranches = ref([]);
    const sortState = ref<any>(null);
    const deleteItems = ref<Array<number>>([]);

    const selectedUsers = ref<Array<number>>([]);
    const allSelected = ref(false);
    const editRoleModalActive = ref(false)
    const editBrandModalActive = ref(false)
    const editBranchModalActive = ref(false)
    const deleteModalActive = ref(false)
    const editModalActive = ref(false)
    const selectedEditUser = ref<any>(null)
    const selectedEditUserDefaultOption = ref<any>(null)

    watch(selectedUsers, (newVal) => {
      if (newVal.length === usersTableData.value.length && usersTableData.value.length != 0) {
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

    const onRoleSelected = (role: string, user: any) => {
      editSingleRoleAction(role, user.id)
    }

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
    const editBrandModalToggler = () => {
      editBrandModalActive.value = !editBrandModalActive.value
    };
    const editBranchModalToggler = () => {
      editBranchModalActive.value = !editBranchModalActive.value
    };

    const editRoleClicked = () => {
      editRoleModalToggler()
    };
    const editBrandClicked = () => {
      editBrandModalToggler()
    };
    const editBranchClicked = () => {
      editBranchModalToggler()
    };


    const {users, isLoading, fetching, totalCount, size} = useAllUsersWithRoles();
    const usersTableData = computed(() => {
      if (!users.value || isLoading.value) {
        return [];
      }
      pureUserList.value = users.value
      return users.value.map((user: any) => {
        return {
          id: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          phone: `${user.phone.slice(0, 2)} ${user.phone.slice(2, 5)} ${user.phone.slice(5, 8)}
          ${user.phone.slice(8, 10)} ${user.phone.slice(10)}`,
          branch: `${user.role == "owner" ? '-' : user.branch_title ?? '-'}`,
          brand: `${user.role == "owner" ? '-' : user.brands.join(', ')}`,
          role: user.role
        };
      });
    });

    const initPage = () => {
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands.value, selectedBranches.value, sortState.value)
      selectedUsers.value = [];
    };
    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue, [], [], [], sortState.value)
      selectedUsers.value = [];
    });

    watch(selectedRoles, (selectedRoles) => {
      fetching(1, searchValue.value, selectedRoles, selectedBrands.value, selectedBranches.value, sortState.value)
      selectedUsers.value = [];
    });

    watch(selectedBrands, (selectedBrands) => {
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands, selectedBranches.value, sortState.value)
      selectedUsers.value = [];
    });

    watch(selectedBranches, (selectedBranches) => {
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands.value, selectedBranches, sortState.value)
      selectedUsers.value = [];
    });

    const handleSortSelected = (sortState: any) => {
      sortState.value=sortState
      fetching(1, searchValue.value, selectedRoles.value, selectedBrands.value, selectedBranches.value, sortState.value)
      console.log("sortState",sortState)
    }

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
      fetch(`${BASE_URL}/change-users-role`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            editRoleModalToggler()
            initPage()
          })
          .catch(error => {
            setTimeout(() => {
              errorMessage.value = data.error;
              setTimeout(() => {
                errorMessage.value = "";
              }, 3000);
            }, 200);
            console.error("There was an error!", error);
          });
    }

    const deleteUserClicked = () => {
      deleteItems.value = [...selectedUsers.value]
      deleteModalActive.value = true
    };

    const onUserDelete = (user: any) => {
      deleteItems.value = [user.id]
      deleteModalActive.value = true
    }

    const closeDeleteModal = () => {
      deleteModalActive.value = false
    }

    const onUserEdit = (user: any) => {
      const pureUser = pureUserList.value.find(item => item.id == user.id)
      console.log(pureUser)
      selectedEditUser.value = pureUser
      console.log("pureUser.brands=", pureUser.brands)
      const branchID = branches.value.find((it: any) => it.title == pureUser.branch_title)?.id
      const brandIds = []
      for (let i = 0; i < pureUser.brands.length; i++) {
        for (let j = 0; j < brands.value.length; j++) {
          if (pureUser.brands[i] == brands.value[j].title) {
            brandIds.push(brands.value[j].id)
            break;
          }
        }
      }
      console.log("brandIds=",brandIds)
      console.log("branchID=",branchID)
      selectedEditUserDefaultOption.value = {
        role: user.role,
        brandIds: brandIds,
        branchId: branchID
      }
      editToggleModal()
    }

    const editSingleRoleAction = (role: string, selectedUserId: number) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_ids: [selectedUserId],
          new_role: role,
        })
      };
      fetch(`${BASE_URL}/change-users-role`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            initPage()
          })
          .catch(error => {
            errorMessage.value = error.error;
            console.error("There was an error!", error);
          });
    }

    const editBrandAction = (data: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_ids: selectedUsers.value,
          new_brands_ids: data.brand.map((id: string) => Number(id)),
        })
      };
      console.log("requestOptions", requestOptions)
      fetch(`${BASE_URL}/change-users-brands`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            editBrandModalToggler()
            initPage()
          })
          .catch(error => {
            setTimeout(() => {
              errorMessage.value = data.error;
              setTimeout(() => {
                errorMessage.value = "";
              }, 3000);
            }, 200);
            console.error("There was an error!", error);
          });
    }

    const editBranchAction = (data: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_ids: selectedUsers.value,
          new_branch_id: Number(data.branch),
        })
      };
      fetch(`${BASE_URL}/change-users-branch`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            editBranchModalToggler()
            initPage()
          })
          .catch(error => {
            setTimeout(() => {
              errorMessage.value = data.error;
              setTimeout(() => {
                errorMessage.value = "";
              }, 3000);
            }, 200);
            console.error("There was an error!", error);
          });
    }

    const deleteAction = (ids: Array<number>) => {
      console.log("ids", ids)
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_ids: ids
        })
      };
      fetch(`${BASE_URL}/users`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            closeDeleteModal()
            initPage()
          })
          .catch(error => {
            errorMessage.value = error.error;
            console.error("There was an error!", error);
          });
    }

    const modalActive = ref(false)
    const createdUserId = ref('')
    const errorMessage = ref<string>('')
    const showAlert = ref<string>('')

    const onCreateUser = (dataBody: any) => {
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
          role: dataBody.role,
          brand_ids: dataBody.brand_ids.map((value: string) => Number(value)),
          branch_id: Number(dataBody.branch_id)
        })
      };
      fetch(`${BASE_URL}/user`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.error) || response;
              setTimeout(() => {
                errorMessage.value = data.error;
                setTimeout(() => {
                  errorMessage.value = "";
                }, 3000);
              }, 200);
              return Promise.reject(error);
            }
            createdUserId.value = data;
            createUserModalToggler()
            initPage()

            setTimeout(() => {
              showAlert.value = "Новый пользователь успешно создан";
              setTimeout(() => {
                showAlert.value = "";
              }, 2000);
            }, 200);
          })
          .catch(error => {
            errorMessage.value = error.error;
            console.error("There was an error!", error);
          });
    }

    const onEditUser = (dataBody: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: dataBody.id,
          phone: dataBody.telephoneNumber.replace(/\s/g, ''),
          first_name: dataBody.firstName,
          last_name: dataBody.lastName,
          role: dataBody.role,
          brand_ids: dataBody.brand_ids.map((value: string) => Number(value)),
          branch_id: Number(dataBody.branch_id)
        })
      };
      fetch(`${BASE_URL}/update-user`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              console.log("HERE IT IS", error)
              setTimeout(() => {
                errorMessage.value = data.error;
                setTimeout(() => {
                  errorMessage.value = "";
                }, 3000);
              }, 200);
              return Promise.reject(error);
            }
            createdUserId.value = data;
            editToggleModal()
            initPage()

            setTimeout(() => {
              showAlert.value = "Пользователь успешно отредактирован!";
              setTimeout(() => {
                showAlert.value = "";
              }, 2000);
            }, 200);
          })
          .catch(error => {
            errorMessage.value = error.error;
            console.error("There was an error!", error);
          });
    }

    const createUserModalToggler = () => {
      modalActive.value = !modalActive.value;
    }

    const editToggleModal = () => {
      editModalActive.value = !editModalActive.value;
      if (editModalActive.value == false) {
        selectedEditUserDefaultOption.value = null
      }
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
      editBrandModalToggler,
      editBranchModalToggler,
      editRoleClicked,
      editBrandClicked,
      editBranchClicked,
      editRoleAction,
      editBrandAction,
      editBranchAction,
      deleteAction,
      editRoleModalActive,
      editBrandModalActive,
      editBranchModalActive,
      deleteModalActive,
      deleteUserClicked,
      editModalActive,
      editToggleModal,
      onEditUser,
      branches,
      brands,
      handleSortSelected,
      roleOptions: ROLE_OPTIONS,
      tableColumns: [
        {key: 'id', label: 'ID', width: '56px', withSort: false},
        {key: 'fullName', label: 'ФИО', width: '216px', withSort: true},
        {key: 'phone', label: 'Номер телефона', width: '168px', withSort: false},
        {key: 'branch', label: 'Филиал', width: '188px', withSort: true},
        {key: 'brand', label: 'Бренд', width: '140px', withSort: false},
        {key: 'role', label: 'Роль', width: '198px', withSort: false}
      ],
      onRoleSelected,
      onUserDelete,
      onUserEdit,
      deleteItems,
      closeDeleteModal,
      onCreateUser,
      modalActive,
      createdUserId,
      errorMessage,
      showAlert,
      createUserModalToggler,
      selectedEditUser,
      selectedEditUserDefaultOption
    }
  },
  watch: {}
});
</script>

<style lang="scss" scoped>
.content-body {
  padding-top: 24px;
  position: relative;
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