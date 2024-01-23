<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <img src="../../assets/small-logo-zhasa.svg" alt="Logo">
    </div>
    <div class="menu">
      <router-link class="menu-button" to="/zhasa-web-admin">
        <img src="../../assets/sidebar_active_icon.svg" alt="active icon"/>
        <img  src="../../assets/icon-users.svg" class ="users-tab-icon"  alt="users icon">
        <span class="menu-item-text">Пользователи</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const isFullWidth = ref(true);
    const handleResize = () => {
      isFullWidth.value = !isFullWidth.value;
      console.log(isFullWidth)
    };

    return {
      isFullWidth,
      handleResize,
    };
  },
});
</script>


<style lang="scss" scoped>
.sidebar {
  min-width: 306px;
  height: calc(100vh - 24px - 24px);
  margin: 24px 16px 24px 24px;
  box-shadow: 0 2px 9px 2px rgba(134, 134, 134, 0.10);
  background-color: #FFFFFF;
  border-radius: 12px;
  overflow: visible;
}

.sidebar-header {
  text-align: center;
  border-radius: 12px;

  img {
    margin: 27px auto;
  }
}

.users-tab-icon{
  background: url("../../assets/icon_users_active.svg");
}
.menu {
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu-item-text {
  color: #868686;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  background: #F3F3F5;
  &.router-link-active {
    background: #F3F3F5;
    .menu-item-text {
      color: #1C1C1E;
      font-weight: 700;
    }
    .users-tab-icon{
      content: url("../../assets/icon_users_1.svg");
    }
  }
}
.sub-links{
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 68px;
}

</style>