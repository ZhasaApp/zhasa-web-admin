<template>
  <div class="content-body">
    <BranchesHeaderBar
        @modalToggler="createBranchModalToggler"
        :handleSearch="handleSearch"
        :brands="brands"
        :allSelected="allSelected"
        :selectedBranches="selectedBranches"
        @deleteBranchClicked="deleteBranchClicked"
        @toggleAll="toggleAll"
    />
    <TableData
        v-if="!isLoading"
        :tableData="branchesTableData"
        :columns="tableColumns"
        @sortSelected="handleSortSelected"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
        @toggleSelection="toggleSelection"
        :filterBranches="selectedBranches"
        :selectedUsers="selectedBranches"
        @onUserDelete="onBranchDelete"
        @onUserEdit="onBranchEdit"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreateBranchesModal
      :toggleModal="createBranchModalToggler"
      :modalActive="modalActive"
      @createBranch="onCreateBranch"
      :brands="brands"
      :errorMessage="errorMessage"
  />
  <EditBranchModal
      :editModalActive="editModalActive"
      :editToggleModal="editToggleModal"
      @editBranch="onEditBranch"
      :brands="brands"
      :errorMessage="errorMessage"
      :curBranch="selectedEditBranch"
      :defaultOption="selectedEditBranchDefaultOption"
  />
  <DeleteModal
      :deleteItems="deleteItems"
      :modalActive="deleteModalActive"
      :toggleModal="closeDeleteModal"
      @deleteFromDropDown="deleteAction"
      type="branch"
  />
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import BranchesHeaderBar from "./BranchesHeaderBar.vue";
import TableData from "../../common/TableData.vue";
import useAllBranches, {Branch} from "../../../hooks/useAllBranches.ts";
import CreateBranchesModal from "./CreateBranchesModal.vue";
import {TOKEN} from "../../constants.ts";
import {BASE_URL} from "../../../utils/EnvConstants.ts";
import DeleteModal from "../Modals/DeleteModal.vue";
import EditUserModal from "../AllUsersList/EditUserModal.vue";
import EditBranchModal from "./EditBranchModal.vue";

export default defineComponent({
  name: 'BranchesListPage',
  components: {
    EditBranchModal,
    EditUserModal,
    DeleteModal,
    CreateBranchesModal,
    TableData,
    BranchesHeaderBar
  },
  mounted() {
    const headers = {
      'Authorization': TOKEN,
    };
    fetch(`${BASE_URL}/brands`, {headers})
        .then(response => response.json())
        .then(data => this.brands = data?.result)
        .catch(error => console.log(error));
  },
  setup() {
    const brands = ref<Array<any>>([])
    const modalActive = ref(false)
    const deleteModalActive = ref(false)
    const errorMessage = ref<string>('')
    const showAlert = ref<string>('')
    const searchValue = ref('');
    const sortState = ref<any>(null);
    const allSelected = ref(false);
    const selectedBranches = ref<Array<number>>([]);
    const deleteItems = ref<Array<number>>([]);
    const {branches, isLoading, fetching, totalCount, size} = useAllBranches();

    const editModalActive = ref(false)
    const selectedEditBranch = ref<any>(null)
    const selectedEditBranchDefaultOption = ref<any>(null)

    const branchesTableData = computed(() => {
      if (!branches.value || isLoading.value) {
        return [];
      }
      return branches.value.map((branch: Branch) => {
        return {
          id: branch.id,
          title: branch.title,
          description: branch.description,
          brand: `${branch.brands?.join(', ') ?? "-"}`,
        };
      });
    });
    const initPage = () => {
      fetching(1, searchValue.value, sortState.value)
      selectedBranches.value = [];
    };
    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue, sortState.value)
      selectedBranches.value = [];
    });
    const createBranchModalToggler = () => {
      modalActive.value = !modalActive.value;
    }
    const onCreateBranch = (dataBody: any) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: dataBody.title,
          description: dataBody.description,
          brand_ids: dataBody.brand_ids.map((value: string) => Number(value))
        })
      };
      console.log("CREATE BRANCH",dataBody,requestOptions )
      fetch(`${BASE_URL}/branch`, requestOptions)
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
            createBranchModalToggler()
            initPage()

            setTimeout(() => {
              showAlert.value = "Новый филиал успешно создан";
              setTimeout(() => {
                showAlert.value = "";
              }, 2000);
            }, 200);
          })
          .catch(error => {
            setTimeout(() => {
              errorMessage.value = error.error;
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
          branch_ids: ids
        })
      };
      console.log("requestOptions", requestOptions)
      fetch(`${BASE_URL}/branch`, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
              const error = (data && data.message) || response.status;
              setTimeout(() => {
                errorMessage.value = data.error;
                setTimeout(() => {
                  errorMessage.value = "";
                }, 3000);
              }, 200);
              return Promise.reject(error);
            }
            closeDeleteModal()
            initPage()
          })
          .catch(error => {
            setTimeout(() => {
              errorMessage.value = error.error;
              setTimeout(() => {
                errorMessage.value = "";
              }, 3000);
            }, 200);
            console.error("There was an error!", error);
          });
    }

    const deleteBranchClicked = () => {
      deleteItems.value = [...selectedBranches.value]
      deleteModalActive.value = true
      console.log("DELETE2", deleteItems)
    };

    const onBranchDelete = (branch: any) => {
      console.log("onBranchDelete", branch)
      deleteItems.value = [branch.id]
      deleteModalActive.value = true
    }

    const onBranchEdit = (branch: any) => {
      console.log("onBranchEdit", branch)
      selectedEditBranch.value = branch
      selectedEditBranchDefaultOption.value = {
        brandIds: []
      }
      editToggleModal()
    }

    const closeDeleteModal = () => {
      deleteModalActive.value = false
    }

    function toggleAll() {
      if (allSelected.value) {
        selectedBranches.value = [];
      } else {
        selectedBranches.value = branchesTableData.value.map((branch) => (branch.id))
      }
    }

    const handleSortSelected = (sortState: any) => {
      sortState.value=sortState
      fetching(1, searchValue.value, sortState.value)
    }
    const toggleSelection = (rowIndex: number) => {
      let branchId = branchesTableData.value[rowIndex].id
      if (selectedBranches.value.includes(branchId)) {
        selectedBranches.value = selectedBranches.value.filter(i => i !== branchId);
      } else {
        selectedBranches.value = [...selectedBranches.value, branchId]
      }
    }

    watch(selectedBranches, (newVal) => {
      if (newVal.length === branchesTableData.value.length && branchesTableData.value.length != 0) {
        allSelected.value = true;
      } else {
        allSelected.value = false;
      }
    });

    const editToggleModal = () => {
      editModalActive.value = !editModalActive.value;
      if (editModalActive.value == false) {
        selectedEditBranchDefaultOption.value = null
      }
    }

    const onEditBranch = (dataBody: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          branch_id: dataBody.id,
          title: dataBody.title,
          description: dataBody.description,
          brand_ids: dataBody.brand_ids.map((value: string) => Number(value))
        })
      };
      fetch(`${BASE_URL}/branch`, requestOptions)
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
            editToggleModal()
            initPage()

            setTimeout(() => {
              showAlert.value = "Филиал успешно отредактирован!";
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

    return {
      branchesTableData,
      isLoading,
      fetching,
      totalCount,
      size,
      tableColumns: [
        {key: 'id', label: 'ID', width: '56px', withSort: false},
        {key: 'title', label: 'Название', width: '216px', withSort: true},
        {key: 'description', label: 'Описание', width: '168px', withSort: false},
        {key: 'brand', label: 'Бренд', width: '140px', withSort: false},
      ],
      createBranchModalToggler,
      modalActive,
      searchValue,
      onCreateBranch,
      brands,
      errorMessage,
      handleSearch,
      allSelected,
      selectedBranches,
      deleteBranchClicked,
      deleteModalActive,
      onBranchDelete,
      closeDeleteModal,
      toggleAll,
      handleSortSelected,
      toggleSelection,
      onBranchEdit,
      deleteItems,
      deleteAction,
      showAlert,
      editModalActive,
      editToggleModal,
      onEditBranch,
      selectedEditBranch,
      selectedEditBranchDefaultOption
    }
  }
});
</script>

<style scoped>
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