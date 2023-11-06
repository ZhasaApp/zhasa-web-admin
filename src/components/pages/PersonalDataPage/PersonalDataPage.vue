<template>
  <div class="content-body">
    <a href="/roles">
      <img src="../../../assets/icon-back-arrow.svg" alt="bak button"/>
      <span>Вернуться к списку</span>
    </a>
    <div class="personal-data-body">
      <h3>Личные данные</h3>
      <div class="personal-data-body-first">
        <div class="input-wrapper">
          <label for="fullName">ФИО</label>
          <input id="fullName" placeholder="" type="text" v-model="fullName"/>
        </div>
        <div class="input-wrapper">
          <label for="telephoneNumber">Номер телефона</label>
          <input id="telephoneNumber" placeholder="" type="text" v-model="telephoneNumber"/>
        </div>
      </div>
      <img class="divider-line" src="../../../assets/divider-line.svg" alt="divider-line"/>
      <h3>Другое</h3>
      <div class="personal-data-body-first personal-data-body-second">
        <div class="input-wrapper">
          <label for="fullName">Филиал</label>
          <input id="fullName" placeholder="" type="text" v-model="fullName"/>
        </div>
        <div class="input-wrapper">
          <label for="telephoneNumber">Бренды</label>
          <input id="telephoneNumber" placeholder="" type="text" v-model="telephoneNumber"/>
        </div>
      </div>
      <div class="footer-section">
        <img class="divider-line" src="../../../assets/divider-line.svg" alt="divider-line"/>
        <div class="footer-btns">
          <CustomButton
              :additional-styles="{padding : '16px 0', border: '2px solid #999', background: 'none', color: '#999'}"
          >
            Удалить пользователя
          </CustomButton>
          <CustomButton
              :additional-styles="{padding : '16px 0'}"
          >
            Сохранить изменения
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import CustomButton from "../../common/CustomButton.vue";
import {TOKEN} from "../../../constants/constants.ts";

export default defineComponent({
  name: 'PersonalDataPage',
  components: {CustomButton},
  data() {
    return {
      fullName: 'Баймаханов Арман Дауренулы',
      telephoneNumber: '+770743878234',
      brands: []
    }
  },
  mounted() {
    const headers = {
      'Authorization': TOKEN
    };
    fetch('http://185.182.219.90/admin/branches', {headers: headers, mode: 'no-cors'})
        .then(response => response.json())
        .then(data => this.brands = data)
        .catch(error => console.log(error));

    console.log(this.brands)
    console.log(headers)
  },
  setup() {
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    return {modalActive, toggleModal};
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.content-body {
  padding-top: 24px;
  position: relative;
}

a {
  color: #999;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  display: flex;
  gap: 8px;
  padding-top: 24px;

  span {
    padding-top: 1px;
  }
}

.personal-data-body {
  height: calc(100% - 112px);
  margin-top: 40px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 2px 9px 2px rgba(134, 134, 134, 0.10);

  h3 {
    padding: 24px 0 0 24px;
  }
}

.personal-data-body-first {
  display: flex;
  gap: 24px;
  padding: 24px 24px 0 24px;
  margin-bottom: 40px;
}

input {
  color: #676767;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 12px 0 12px 16px;
  border-radius: 12px;
  border: 1px solid #999;
  width: 100%;
  margin-top: 8px;
}

label {
  color: #676767;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

}

.input-wrapper {
  width: 500px;
}

.personal-data-body-second {
  margin-bottom: 250px;
}

.footer-btns {
  display: flex;
  width: 600px;
  gap: 24px;
  margin-left: 445px;
  margin-top: 24px;
}

.footer-section{
  position:absolute;
  bottom:0;
  left: 0;
  padding-bottom: 48px;
}

.divider-line{
  margin-left: 24px;
}
</style>