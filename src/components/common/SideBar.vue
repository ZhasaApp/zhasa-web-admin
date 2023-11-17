<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <img src="../../assets/small-logo-zhasa.svg" alt="Logo">
    </div>
    <div class="menu">
      <router-link class="menu-button" to="/zhasa-web-admin">
        <img  src="../../assets/icon-users.svg" class ="users-tab-icon"  alt="users icon">
        <span class="menu-item-text">Пользователи</span>
      </router-link>

      <router-link class="menu-button" to="/zhasa-web-admin/roles">
        <img src="../../assets/icon-roles.svg" class="roles-tab-icon" alt="roles icon">
        <span class="menu-item-text">Роль менеджера</span>
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
  box-shadow: 0px 2px 9px 2px rgba(134, 134, 134, 0.10);
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
  padding: 16px 8px 0 8px;
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
  gap: 16px;
  text-decoration: none;
  padding: 22px 16px;
  &.router-link-active {
    border-radius: 12px;
    background: var(--primary-gradient, linear-gradient(100deg, #1DD6B4 0%, #188ED0 99.92%));
    .menu-item-text {
      color: #FFF;
      font-weight: 700;
    }
    .users-tab-icon{
      content: url("../../assets/icon_users_active.svg");
    }
    .roles-tab-icon{
      content: url("../../assets/icon_roles_active.svg");
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