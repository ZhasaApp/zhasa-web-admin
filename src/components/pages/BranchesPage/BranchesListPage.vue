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
        @onRoleSelected="onRoleSelected"
        @onBranchDelete="onBranchDelete"
        @onUserEdit="onUserEdit"
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
  <DeleteModal
      :deleteItems="deleteItems"
      :modalActive="deleteModalActive"
      :toggleModal="closeDeleteModal"
      @deleteFromDropDown="deleteAction"
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

export default defineComponent({
  name: 'BranchesListPage',
  components: {
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
    const searchValue = ref('');
    const sortState = ref<any>(null);
    const allSelected = ref(false);
    const selectedBranches = ref<Array<number>>([]);
    const deleteItems = ref<Array<number>>([]);
    const {branches, isLoading, fetching, totalCount, size} = useAllBranches();
    const branchesTableData = computed(() => {
      if (!branches.value || isLoading.value) {
        return [];
      }
      return branches.value.map((branch: Branch) => {
        return {
          id: branch.id,
          title: branch.title,
          description: branch.description
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

        })
      };
      console.log("CREATE BRANCH",dataBody,requestOptions )
      // fetch(`${BASE_URL}/user`, requestOptions)
      //     .then(async response => {
      //       const isJson = response.headers.get('content-type')?.includes('application/json');
      //       const data = isJson && await response.json();
      //
      //       if (!response.ok) {
      //         const error = (data && data.error) || response;
      //         setTimeout(() => {
      //           errorMessage.value = data.error;
      //           setTimeout(() => {
      //             errorMessage.value = "";
      //           }, 3000);
      //         }, 200);
      //         return Promise.reject(error);
      //       }
      //       createdUserId.value = data;
      //       createUserModalToggler()
      //       initPage()
      //
      //       setTimeout(() => {
      //         showAlert.value = "Новый пользователь успешно создан";
      //         setTimeout(() => {
      //           showAlert.value = "";
      //         }, 2000);
      //       }, 200);
      //     })
      //     .catch(error => {
      //       errorMessage.value = error.error;
      //       console.error("There was an error!", error);
      //     });
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
      // fetch(`${BASE_URL}/users`, requestOptions)
      //     .then(async response => {
      //       const isJson = response.headers.get('content-type')?.includes('application/json');
      //       const data = isJson && await response.json();
      //
      //       if (!response.ok) {
      //         const error = (data && data.message) || response.status;
      //         return Promise.reject(error);
      //       }
      //       closeDeleteModal()
      //       initPage()
      //     })
      //     .catch(error => {
      //       errorMessage.value = error.error;
      //       console.error("There was an error!", error);
      //     });
    }
    const editSingleRoleAction = (role: string, selectedUserId: number) => {}
    const deleteBranchClicked = () => {
      deleteItems.value = [...selectedBranches.value]
      deleteModalActive.value = true
      console.log("DELETE2", deleteItems)

    };
    const onBranchDelete = (branch: any) => {
      console.log("DELETE1")
      deleteItems.value = [branch.id]
      deleteModalActive.value = true
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

    const onRoleSelected = (role: string, branch: any) => {
      editSingleRoleAction(role, branch.id)
    }

    watch(selectedBranches, (newVal) => {
      if (newVal.length === branchesTableData.value.length && branchesTableData.value.length != 0) {
        allSelected.value = true;
      } else {
        allSelected.value = false;
      }
    });
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
      onRoleSelected,
      deleteItems,
      deleteAction
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