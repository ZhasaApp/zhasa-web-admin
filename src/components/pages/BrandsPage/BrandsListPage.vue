<template>
  <div class="content-body">
    <BrandsHeaderBar
        @modalToggler="createBrandModalToggler"
        :handleSearch="handleSearch"
        :allSelected="allSelected"
        :selectedBrands="selectedBrandIds"
        @deleteBrandClicked="deleteBrandClicked"
        @toggleAll="toggleAll"
    />
    <TableData
        v-if="!isLoading"
        :tableData="brandsTableData"
        :columns="tableColumns"
        @sortSelected="handleSortSelected"
        @handlePageChange="fetching"
        :totalCount="totalCount"
        :size="size"
        :searchValue="searchValue"
        :selectedUsers="selectedBrandIds"
        @toggleSelection="toggleSelection"
        @onUserDelete="onBrandDelete"
        @onUserEdit="onBrandEdit"
    />
    <span v-else>Загрузка ...</span>
  </div>
  <CreateBrandModal
      :toggleModal="createBrandModalToggler"
      :modalActive="modalActive"
      @createBrand="onCreateBrand"
      :errorMessage="errorMessage"
  />
  <EditBrandModal
      :editModalActive="editModalActive"
      :editToggleModal="editToggleModal"
      @editBrand="onEditBrand"
      :errorMessage="errorMessage"
      :curBrand="selectedEditBrand"
  />
  <DeleteModal
      :deleteItems="deleteItems"
      :modalActive="deleteModalActive"
      :toggleModal="closeDeleteModal"
      @deleteFromDropDown="deleteAction"
      type="brand"
  />
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import BrandsHeaderBar from "./BrandsHeaderBar.vue";
import TableData from "../../common/TableData.vue";
import useAllBrands, {Brand} from "../../../hooks/useAllBrands.ts";
import CreateBrandModal from "./CreateBrandModal.vue";
import {TOKEN} from "../../constants.ts";
import {BASE_URL} from "../../../utils/EnvConstants.ts";
import DeleteModal from "../Modals/DeleteModal.vue";
import EditUserModal from "../AllUsersList/EditUserModal.vue";
import EditBrandModal from "./EditBrandModal.vue";

export default defineComponent({
  name: 'BrandsListPage',
  components: {
    EditBrandModal,
    EditUserModal,
    DeleteModal,
    CreateBrandModal,
    TableData,
    BrandsHeaderBar
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
    const modalActive = ref(false)
    const deleteModalActive = ref(false)
    const errorMessage = ref<string>('')
    const showAlert = ref<string>('')
    const searchValue = ref('');
    const sortState = ref<any>(null);
    const allSelected = ref(false);
    const selectedBrandIds = ref<Array<number>>([]);
    const deleteItems = ref<Array<number>>([]);
    const {brands, isLoading, fetching, totalCount, size} = useAllBrands();

    const editModalActive = ref(false)
    const selectedEditBrand = ref<any>(null)

    const brandsTableData = computed(() => {
      if (!brands.value || isLoading.value) {
        return [];
      }
      return brands.value.map((brand: Brand) => {
        return {
          id: brand.id,
          title: brand.title,
        };
      });
    });
    const initPage = () => {
      fetching(1, searchValue.value, sortState.value)
      selectedBrandIds.value = [];
    };
    const handleSearch = (value: any) => {
      searchValue.value = value;
    };
    watch(searchValue, (searchValue) => {
      fetching(1, searchValue, sortState.value)
      selectedBrandIds.value = [];
    });
    const createBrandModalToggler = () => {
      modalActive.value = !modalActive.value;
    }
    const onCreateBrand = (dataBody: any) => {
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
      console.log("CREATE BRAND",dataBody,requestOptions )
      fetch(`${BASE_URL}/brand`, requestOptions)
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
            createBrandModalToggler()
            initPage()

            setTimeout(() => {
              showAlert.value = "Новый бренд успешно создан";
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
          brand_ids: ids
        })
      };
      console.log("requestOptions", requestOptions)
      fetch(`${BASE_URL}/brand`, requestOptions)
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

    const deleteBrandClicked = () => {
      deleteItems.value = [...selectedBrandIds.value]
      deleteModalActive.value = true
      console.log("DELETE2", deleteItems)
    };

    const onBrandDelete = (brand: any) => {
      console.log("onBrandDelete", brand)
      deleteItems.value = [brand.id]
      deleteModalActive.value = true
    }

    const onBrandEdit = (brand: any) => {
      console.log("onBrandEdit", brand)
      selectedEditBrand.value = brand
      editToggleModal()
    }

    const closeDeleteModal = () => {
      deleteModalActive.value = false
    }

    function toggleAll() {
      if (allSelected.value) {
        selectedBrandIds.value = [];
      } else {
        selectedBrandIds.value = brandsTableData.value.map((brand) => (brand.id))
      }
    }

    const handleSortSelected = (sortState: any) => {
      sortState.value=sortState
      fetching(1, searchValue.value, sortState.value)
    }
    const toggleSelection = (rowIndex: number) => {
      let brandId = brandsTableData.value[rowIndex].id
      if (selectedBrandIds.value.includes(brandId)) {
        selectedBrandIds.value = selectedBrandIds.value.filter(i => i !== brandId);
      } else {
        selectedBrandIds.value = [...selectedBrandIds.value, brandId]
      }
    }

    watch(selectedBrandIds, (newVal) => {
      if (newVal.length === brandsTableData.value.length && brandsTableData.value.length != 0) {
        allSelected.value = true;
      } else {
        allSelected.value = false;
      }
    });

    const editToggleModal = () => {
      editModalActive.value = !editModalActive.value;
    }

    const onEditBrand = (dataBody: any) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand_id: dataBody.id,
          title: dataBody.title
        })
      };
      fetch(`${BASE_URL}/brand`, requestOptions)
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
              showAlert.value = "Бренд успешно отредактирован!";
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
      brandsTableData,
      isLoading,
      fetching,
      totalCount,
      size,
      tableColumns: [
        {key: 'id', label: 'ID', width: '56px', withSort: false},
        {key: 'title', label: 'Название', width: '684px', withSort: true}
      ],
      createBrandModalToggler,
      modalActive,
      searchValue,
      onCreateBrand,
      brands,
      errorMessage,
      handleSearch,
      allSelected,
      selectedBrandIds,
      deleteBrandClicked,
      deleteModalActive,
      onBrandDelete,
      closeDeleteModal,
      toggleAll,
      handleSortSelected,
      toggleSelection,
      onBrandEdit,
      deleteItems,
      deleteAction,
      showAlert,
      editModalActive,
      editToggleModal,
      onEditBrand,
      selectedEditBrand
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