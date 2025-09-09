<script lang="ts" setup>
import { UserFilled } from "@element-plus/icons-vue"
import ScreenFull from "@/components/ScreenFull/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Breadcrumb from "@/layouts/components/Breadcrumb/index.vue"
import Hamburger from "@/layouts/components/Hamburger/index.vue"
import { useSettingStore } from "@/pinia/stores/setting"
import { useUserStore } from "@/pinia/stores/user"

import router from "@/router/index"

const userStore = useUserStore()

const settingStore = useSettingStore()

function logout() {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <!-- space-between -->
  <div class="navigationbar-container">
    <!-- 左边       汉堡菜单 -->
    <Hamburger class="hamburger" />
    <!-- flex：1    面包屑导航 -->
    <Breadcrumb class="breadcrumb" />
    <!-- 右边       右边容器 -->
    <div class="container-right">
      <!-- 全屏 -->
      <ScreenFull
        v-if="settingStore.showScreenfull"
        :content="settingStore.toggleFullScreen"
        class="container-right-item"
      />
      <!-- 主题切换 -->
      <ThemeSwitch
        v-if="settingStore.showThemeSwitch"
        class="container-right-item"
      />
      <!-- 用户信息 折叠 -->
      <el-dropdown popper-class="custom-dropdown-popper">
        <div class="container-right-user">
          <el-avatar :size="30">
            <el-icon class="usericon">
              <UserFilled />
            </el-icon>
          </el-avatar>
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigationbar-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--layout-navigationbar-bg-color);
}

.hamburger {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex: 1;
}

.container-right {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;

  .container-right-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
  }

  .last-item {
    margin-right: 20px;
  }

  &-user {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 10px;
    outline: none;

    .el-avatar {
      margin-right: 10px;

      .usericon {
        color: gray !important;
      }
    }

    span {
      font-size: 16px;
      color: var(--layout-navigationbar-text-color);
    }
  }
}
</style>
