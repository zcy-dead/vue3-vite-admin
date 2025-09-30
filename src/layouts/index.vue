<script setup lang="ts">
import { computed, watchEffect } from "vue"
import AppMain from "@/layouts/components/AppMain/index.vue"
import Logo from "@/layouts/components/Logo/index.vue"
import NavigationBar from "@/layouts/components/NavigationBar/index.vue"
import Settings from "@/layouts/components/Setting/index.vue"
import Sidebar from "@/layouts/components/Sidebar/index.vue"
import TagsView from "@/layouts/components/TagsView/index.vue"
import { useSettingStore } from "@/pinia/stores/setting"
import { useSidebarStore } from "@/pinia/stores/sidebar"
import { getCssVar, setCssVar } from "@/utils/cssVar"

const settingStore = useSettingStore()

const sidebarStore = useSidebarStore()

const hideSidebarClass = computed(() => {
  return {
    hideSidebar: !sidebarStore.isOpen
  }
})

// #region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVarName = "--layout-tagsview-height"

const tagsviewHeight = getCssVar(cssVarName)

watchEffect(() => {
  settingStore.showTagsView ? setCssVar(cssVarName, tagsviewHeight) : setCssVar(cssVarName, "0px")
})
// #endregion
</script>

<template>
  <div class="layout">
    <!-- 标题 + 导航栏 + 标签视图 -->
    <div class="layout-header">
      <Logo v-if="settingStore.showLogo" class="logo" />
      <div class="layout-header-right">
        <NavigationBar class="navigationbar" />
        <TagsView v-show="settingStore.showTagsView" class="tagsview" />
      </div>
    </div>
    <!-- 左侧菜单 + 主内容区 -->
    <div class="layout-main" :class="hideSidebarClass">
      <Sidebar class="sidebar" />
      <AppMain class="appmain" />
    </div>
    <!-- 右侧设置面板 -->
    <Settings v-if="settingStore.showSetting" />
  </div>
</template>

<style lang="scss" scoped>
$transition-time: 0.35s;

.layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-header {
  width: 100%;
  height: var(--layout-header-height);
  position: fixed;
  top: 0;
  z-index: 1002;
  display: flex;

  .logo {
    width: var(--layout-logo-width);
    height: 100%;
    background-color: var(--layout-logo-bg-color);
    flex: none;
    border-right: var(--layout-logo-border);
    border-bottom: var(--layout-logo-border);
  }

  .layout-header-right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .navigationbar {
      width: 100%;
      height: var(--layout-navigationbar-height);
      background-color: var(--layout-navigationbar-bg-color);
      border-bottom: var(--layout-navigationbar-border);
    }

    .tagsview {
      width: 100%;
      height: var(--layout-tagsview-height);
      background-color: var(--layout-tagsview-bg-color);
      border-bottom: var(--layout-tagsview-border);
    }
  }
}

.layout-main {
  width: 100%;
  height: 100%;
  margin-top: var(--layout-header-height);
  display: flex;

  .sidebar {
    width: var(--layout-sidebar-width);
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 1001;
    transition: width $transition-time;
    background-color: var(--layout-sidebar-menu-bg-color);
    border-right: var(--border-primary);
  }

  .appmain {
    width: 100%;
    height: 100%;
    background-color: var(--layout-appmain-bg-color);
    padding-left: var(--layout-sidebar-width);
    transition: padding-left $transition-time;
  }

  &.hideSidebar {
    .sidebar {
      width: var(--layout-sidebar-hide-width);
    }

    .appmain {
      padding-left: var(--layout-sidebar-hide-width);
    }
  }
}
</style>
