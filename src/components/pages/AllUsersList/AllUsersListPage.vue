<template>
  <div class="content-body">
    <HeaderBar :modalToggler="toggleModal" :isCreate="true"/>
    <TableData/>
  </div>
  <CreatUserModal :modalActive="modalActive" :toggleModal="toggleModal" @createUser="onCreateUser" :errorMessage="this.errorMessage"/>
  <a-alert
      v-if="showAlert"
      message="Новый пользователь успешно создан"
      type="success"
      show-icon
      class="success-alert"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import CreatUserModal from "./CreatUserModal.vue";
import {TOKEN} from "../../../constants/constants.ts";
import TableData from "../../common/TableData.vue";
import HeaderBar from "../../common/HeaderBar.vue";

export default defineComponent({
  name: 'AllUsersListPage',
  components: {CreatUserModal, TableData, HeaderBar},
  data() {
    return {
      modalActive: false,
      createdUserId: '',
      errorMessage: '',
      showAlert: false
    }
  },
  methods: {
    toggleModal () {
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
            localStorage.setItem('createdUserId', JSON.stringify(data?.id));
            localStorage.setItem('createdUserName', dataBody.firstName);
            localStorage.setItem('createdUserLastName', dataBody.lastName);
            this.toggleModal()
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