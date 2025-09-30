<script setup>
import { useSettingStore } from "@/pinia/stores/setting"
import { useTagsViewStore } from "@/pinia/stores/tagsview"
import Footer from "../Footer/index.vue"

const settingStore = useSettingStore()
const tagsViewStore = useTagsViewStore()
</script>

<template>
  <section class="layout-appmain-container">
    <!-- 滚动条 -->
    <div class="app-scrollbar">
      <!-- 当前路由的组件内容 -->
      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="el-zoom-in-center" mode="out-in">
            <keep-alive :include="tagsViewStore.cachedViews" :max="10">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </div>

      <!-- 页脚 -->
      <div class="footer">
        <Footer v-if="settingStore.showFooter" />
      </div>
    </div>
    <!-- 返回顶部 -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
.layout-appmain-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--layout-appmain-bg-color);
}

.app-scrollbar {
  height: var(--layout-sidebar-height);
  overflow: auto;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 30px 30px 30px 30px;
    color: var(--layout-appmain-text-color);
  }
}

// 美化原生滚动条
.app-scrollbar {
  // 整个滚动条
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  // 滚动条上的滚动滑块
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #90939955;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #90939977;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: #90939999;
  }
  // 当同时有垂直滚动条和水平滚动条时交汇的部分
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>
