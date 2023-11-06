<template>
  <div class="authorizationContainer">
    <img src="@/assets/logo-zhasa.svg" alt="Logo">
    <form @submit="handleSubmit">
      <div class="formContent">
        <h2>Авторизация</h2>
        <div class="inputsContainer">
          <input type="text" v-model="username" placeholder="+7 _ _ _  _ _  _ _">
          <div class="passwordInput">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Пароль"
            >
            <span class="toggle-password" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'">w</i>
          </span>
          </div>
        </div>
        <CustomButton>Войти</CustomButton>
      </div>
    </form>
    <div class="error-message" v-if="error">{{ "error" }}</div>
    <p class="footerText">2023</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import CustomButton from "../common/CustomButton.vue";

export default defineComponent({
  components: {CustomButton},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const password = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      password,
      showPassword,
      togglePasswordVisibility,
    };
  },
});
</script>
<style>
body {
  background-color: white;
}

.authorizationContainer {
  width: 590px;
  height: 490px;
  margin: 226px auto;
  text-align: center;
}

form {
  background: #FFFFFF;
  border-radius: 12px;

  margin-top: 60px;
  box-shadow: 0 0 35px 18px rgba(134, 134, 134, 0.10);
}

.formContent {
  display: flex;
  flex-direction: column;
  padding: 40px;
}

h2 {
  margin-bottom: 40px;
  text-align: left;
  color: #161616;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

input {
  border: 1px solid #999999;
  border-radius: 12px;
  padding: 14px 16px;
  color: #676767;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
}

.footerText {
  color: #676767;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 252px;
}
.passwordInput {
  margin-top: 24px;
  margin-bottom: 60px;
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
}
.inputsContainer {
  margin-right: 40px;
}

</style>