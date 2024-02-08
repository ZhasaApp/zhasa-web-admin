<template>
  <div class="content-body">
    <SaleTypesHeaderBar
        @modalToggler="createSaleTypeModalToggler"
        :handleSearch="handleSearch"
        :allSelected="allSelected"
        :selectedSaleTypes="selectedSaleTypeIds"
        @deleteSaleTypeClicked="deleteSaleTypeClicked"
        @toggleAll="toggleAll"
    />
    <TableData
        v-if="!isLoading"
        :tableData="saleTypesTableData"
        :columns="tableColumns"
        @sortSelected="handleSortSelected"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
        :selectedUsers="selectedSaleTypeIds"
        @toggleSelection="toggleSelection"
        @onUserDelete="onSaleTypeDelete"
        @onUserEdit="onSaleTypeEdit"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreateSaleTypeModal
      :toggleModal="createSaleTypeModalToggler"
      :modalActive="modalActive"
      @createSaleType="onCreateSaleType"
      :errorMessage="errorMessage"
  />
  <EditSaleTypeModal
      :editModalActive="editModalActive"
      :editToggleModal="editToggleModal"
      @editSaleType="onEditSaleType"
      :errorMessage="errorMessage"
      :curSaleType="selectedEditSaleType"
  />
  <DeleteModal
      :deleteItems="deleteItems"
      :modalActive="deleteModalActive"
      :toggleModal="closeDeleteModal"
      @deleteFromDropDown="deleteAction"
      type="saleType"
  />
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import SaleTypesHeaderBar from "./SaleTypesHeaderBar.vue";
import TableData from "../../common/TableData.vue";
import useAllSaleTypes, {SaleType} from "../../../hooks/useAllSaleTypes.ts";
import CreateSaleTypeModal from "./CreateSaleTypeModal.vue";
import {TOKEN} from "../../constants.ts";
import {BASE_URL} from "../../../utils/EnvConstants.ts";
import DeleteModal from "../Modals/DeleteModal.vue";
import EditSaleTypeModal from "./EditSaleTypeModal.vue";

export default defineComponent({
  name: 'SaleTypeListPage',
  components: {
    TableData,
    DeleteModal,
    SaleTypesHeaderBar,
    CreateSaleTypeModal,
    EditSaleTypeModal
  },
  mounted() {
    const headers = {
      'Authorization': TOKEN,
    };
    fetch(`${BASE_URL}/sale-types`, {headers})
        .then(response => response.json())
        .then(data => this.saleTypes = data?.result)
        .catch(error => console.log(error));
  },
  setup() {
    const modalActive = ref(false)
    const deleteModalActive = ref(false)
    const errorMessage = ref<string>('')
    const showAlert = ref<string>('')
    const searchValue = ref('');
    const sortState = ref<any>(null);
    const allSelected = ref(false);
    const selectedSaleTypeIds = ref<Array<number>>([]);
    const deleteItems = ref<Array<number>>([]);
    const {saleTypes, isLoading, fetching, totalCount, size} = useAllSaleTypes();

    const editModalActive = ref(false)
    const selectedEditSaleType = ref<any>(null)

    const saleTypesTableData = computed(() => {
      if (!saleTypes.value || isLoading.value) {
        return [];
      }
      return saleTypes.value.map((saleType: SaleType) => {
        return {
          id: saleType.id,
          title: saleType.title,
        };
      });
    });
    const initPage = () => {
      fetching(1, searchValue.value, sortState.value)
      selectedSaleTypeIds.value = [];
    };
    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue, sortState.value)
      selectedSaleTypeIds.value = [];
    });
    const createSaleTypeModalToggler = () => {
      modalActive.value = !modalActive.value;
    }
    const onCreateSaleType = (dataBody: any) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: dataBody.title
        })
      };
      console.log("CREATE SALE TYPE",dataBody,requestOptions )
      fetch(`${BASE_URL}/sale-type`, requestOptions)
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
            createSaleTypeModalToggler()
            initPage()

            setTimeout(() => {
              showAlert.value = "Новый Тип Продаж успешно создан";
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
          sale_type_ids: ids
        })
      };
      console.log("requestOptions", requestOptions)
      fetch(`${BASE_URL}/sale-type`, requestOptions)
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

    const deleteSaleTypeClicked = () => {
      deleteItems.value = [...selectedSaleTypeIds.value]
      deleteModalActive.value = true
      console.log("DELETE2", deleteItems)
    };

    const onSaleTypeDelete = (saleType: any) => {
      console.log("onDelete", saleType)
      deleteItems.value = [saleType.id]
      deleteModalActive.value = true
    }

    const onSaleTypeEdit = (saleType: any) => {
      console.log("onEdit", saleType)
      selectedEditSaleType.value = saleType
      editToggleModal()
    }

    const closeDeleteModal = () => {
      deleteModalActive.value = false
    }

    function toggleAll() {
      if (allSelected.value) {
        selectedSaleTypeIds.value = [];
      } else {
        selectedSaleTypeIds.value = saleTypesTableData.value.map((saleType) => (saleType.id))
      }
    }

    const handleSortSelected = (sortState: any) => {
      sortState.value=sortState
      fetching(1, searchValue.value, sortState.value)
    }
    const toggleSelection = (rowIndex: number) => {
      let saleTypeId = saleTypesTableData.value[rowIndex].id
      if (selectedSaleTypeIds.value.includes(saleTypeId)) {
        selectedSaleTypeIds.value = selectedSaleTypeIds.value.filter(i => i !== saleTypeId);
      } else {
        selectedSaleTypeIds.value = [...selectedSaleTypeIds.value, saleTypeId]
      }
    }

    watch(selectedSaleTypeIds, (newVal) => {
      if (newVal.length === saleTypesTableData.value.length && saleTypesTableData.value.length != 0) {
        allSelected.value = true;
      } else {
        allSelected.value = false;
      }
    });

    const editToggleModal = () => {
      editModalActive.value = !editModalActive.value;
    }

    const onEditSaleType = (dataBody: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sale_type_id: dataBody.id,
          title: dataBody.title
        })
      };
      fetch(`${BASE_URL}/sale-type`, requestOptions)
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
              showAlert.value = "Тип продаж успешно отредактирован!";
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
      saleTypesTableData,
      isLoading,
      fetching,
      totalCount,
      size,
      tableColumns: [
        {key: 'id', label: 'ID', width: '56px', withSort: false},
        {key: 'title', label: 'Название', width: '684px', withSort: true}
      ],
      createSaleTypeModalToggler,
      modalActive,
      searchValue,
      onCreateSaleType,
      saleTypes,
      errorMessage,
      handleSearch,
      allSelected,
      selectedSaleTypeIds,
      deleteSaleTypeClicked,
      deleteModalActive,
      onSaleTypeDelete,
      closeDeleteModal,
      toggleAll,
      handleSortSelected,
      toggleSelection,
      onSaleTypeEdit,
      deleteItems,
      deleteAction,
      showAlert,
      editModalActive,
      editToggleModal,
      onEditSaleType,
      selectedEditSaleType
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