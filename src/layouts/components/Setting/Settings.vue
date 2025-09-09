<script setup lang="ts">
import { Refresh } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"
import { useSettingStore } from "@/pinia/stores/setting"
import { removeSettingConfig } from "@/utils/localStorage"
import SelectMainColor from "./SelectLayoutColor.vue"

const settingStore = useSettingStore()

// 使用 storeToRefs 将提取的属性保持其响应性
const {
  showTagsView,
  showLogo,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  cacheTagsView,
  toggleFullScreen
} = storeToRefs(settingStore)

/** 定义 switch 设置项 */
const switchSettings = {
  "显示标签栏": showTagsView,
  "显示 Logo": showLogo,
  "显示页脚": showFooter,
  "显示消息通知": showNotify,
  "显示切换主题按钮": showThemeSwitch,
  "显示全屏按钮": showScreenfull,
  "是否缓存标签栏": cacheTagsView,
  "切换全屏效果": toggleFullScreen
}

/** 重置项目配置 */
function resetLayoutsConfig() {
  removeSettingConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4 class="title">
      布局配置
    </h4>
    <SelectMainColor />
    <el-divider />
    <h4 class="title">
      功能配置
    </h4>
    <div
      v-for="(settingValue, settingName, index) in switchSettings"
      :key="index"
      class="setting-item"
    >
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      重 置
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.setting-container {
  padding: 20px;
  .title {
    color: var(--layout-setting-text-color);
  }
  .setting-item {
    font-size: 14px;
    color: var(--layout-setting-text-color);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
