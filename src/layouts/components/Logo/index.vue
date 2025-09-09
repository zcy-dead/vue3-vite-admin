<script lang="ts" setup>
import { useThemeStore } from "@/pinia/stores/theme"

const themeStore = useThemeStore()
</script>

sidebar
<template>
  <div class="layout-logo-container">
    <router-link to="/">
      <img src="@/imgs/logo_black.png" alt="Logo" class="logo-img" v-show="themeStore.activeThemeType === 'light'">
      <img src="@/imgs/logo_white.png" alt="Logo" class="logo-img" v-show="themeStore.activeThemeType === 'dark'">
    </router-link>
    <span class="logo-text">后台管理系统</span>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .logo-img {
    width: 45px;
    height: 40px;
    object-fit: cover;
    transition:
      width 0.3s ease,
      height 0.3s ease;
  }

  .logo-text {
    margin-left: 8px;
    font-size: 18px;
    font-weight: bold;
    color: var(--layout-logo-text-color);
  }
}
</style>
