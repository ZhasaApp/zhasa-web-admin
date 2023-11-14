<template>
  <div class="content-body">
    <HeaderBar @click="modalToggler" :isCreate="true"/>
    <TableData v-if="!isLoading" :tableData="usersTableData" :columns="tableColumns"/>
  </div>
  <CreatUserModal :modalActive="modalActive" :toggleModal="modalToggler" @createUser="onCreateUser" :errorMessage="errorMessage"/>
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

export default defineComponent({
  name: 'AllUsersListPage',
  components: {CreatUserModal, TableData, HeaderBar},
  data() {
    return {
      modalActive: false,
      createdUserId: '',
      errorMessage: '',
      showAlert: false,
    }
  },
  setup() {
    const {users, isLoading} = useAllUsersWithRoles();
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
      {key: 'telephoneNumber', label: 'Номер телефона'},
    ]
    return {
      tableColumns,
      usersTableData,
      isLoading,
      users
    }
  },
  methods: {
    modalToggler () {
      this.modalActive = !this.modalActive;
    },
    onCreateUser(dataBody: any) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({phone: dataBody.telephoneNumber.replace(/\s/g, ''), first_name: dataBody.firstName,last_name: dataBody.lastName, })
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
.success-alert{
  position: absolute;
  max-width: 590px;
  width: 80%;
  border-radius: 12px;
  padding: 20px;
  bottom: 15%;
}
</style>