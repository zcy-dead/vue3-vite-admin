<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { usePermissionStore } from "@/pinia/stores/permission"
import { useSidebarStore } from "@/pinia/stores/sidebar"
import Menus from "./Menus.vue"

const route = useRoute()

const sidebarStore = useSidebarStore()

const permissionStore = usePermissionStore()

/** 是否水平折叠收起菜单 */
const isCollapse = computed(() => !sidebarStore.isOpen)

/** 页面加载时默认激活菜单的 index（activeMenu） */
const activeMenu = computed(() => route.meta?.activeMenu as string || route.path)

/** 不需要隐藏的所有路由 */
const noHiddenRoutes = computed(() => permissionStore.allRoutes.filter(item => !item.meta?.hidden))
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <Menus
        v-for="noHiddenRoute in noHiddenRoutes"
        :key="noHiddenRoute.path"
        :item="noHiddenRoute"
        :base-path="noHiddenRoute.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--active-text-color);
  }
}

.el-scrollbar {
  height: var(--layout-sidebar-height);

  /* 修改滚动条轨道的样式 */
  :deep(.el-scrollbar__bar) {
    right: 0;
    width: 4px;
    background-color: transparent;
    border-radius: 4px;
  }

  /* 修改滚动条手柄的样式 */
  :deep(.el-scrollbar__thumb) {
    width: 4px;
    background-color: var(--active-bg-color);
    border-radius: 4px;

    &:hover {
      background-color: var(--active-bg-color);
    }
  }

  /* 修改滚动内容区域的样式 */
  :deep(.el-scrollbar__wrap) {
    white-space: nowrap;
  }
}

.el-menu {
  width: 100%;
  user-select: none;
  border: none;
  --el-menu-bg-color: var(--layout-sidebar-menu-bg-color);
  --el-menu-text-color: var(--layout-sidebar-menu-text-color);
  --el-menu-active-color: var(--layout-sidebar-menu-active-text-color, var(--layout-sidebar-menu-text-color));

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title),
  :deep(.el-sub-menu .el-menu-item) {
    height: var(--layout-sidebar-menu-item-height);
    line-height: var(--layout-sidebar-menu-item-height);

    &:hover {
      background-color: var(--layout-sidebar-menu-hover-bg-color);
    }

    &.is-active {
      background-color: var(--layout-sidebar-menu-active-bg-color);
    }
  }

  :deep(.el-menu-item.is-active) {
    @extend %tip-line;
  }

  .el-menu--collapse {
    :deep(.el-sub-menu.is-active) {
      .el-sub-menu__title {
        @extend %tip-line;
      }
    }
  }
}
</style>
