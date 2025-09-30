<script setup lang="ts">
import { Refresh } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"
import { useSettingStore } from "@/pinia/stores/setting"
import { removeSettingConfig } from "@/utils/localStorage"
import SelectMainColor from "./components/SelectLayoutColor.vue"

const settingStore = useSettingStore()

// 使用 storeToRefs 将提取的属性保持其响应性
const {
  showTagsView,
  showLogo,
  showFooter,
  showThemeSwitch,
  showScreenfull,
  cacheTagsView,
  toggleFullScreen
} = storeToRefs(settingStore)

/** 定义 switch 设置项 */
const showSettings = {
  "显示标签栏": showTagsView,
  "显示 Logo": showLogo,
  "显示页脚": showFooter,
  "显示切换主题按钮": showThemeSwitch,
  "显示全屏按钮": showScreenfull
}

/** 重置项目配置 */
function resetLayoutsConfig() {
  removeSettingConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <!-- 布局配置 -->
    <div>
      <h4 class="title">
        布局配置
      </h4>
      <SelectMainColor />
    </div>

    <el-divider />

    <!-- 显示功能配置 -->
    <div>
      <h4 class="title">
        显示功能配置
      </h4>
      <div
        v-for="(settingValue, settingName) in showSettings"
        :key="settingName"
        class="showSetting-item"
      >
        <span>{{ settingName }}</span>
        <el-switch v-model="settingValue.value" />
      </div>
    </div>

    <el-divider />

    <!-- 功能切换配置 -->
    <div>
      <h4 class="title">
        功能切换配置
      </h4>
      <div class="switchSetting-item">
        <span>切换全屏/放大</span>
        <el-radio-group v-model="toggleFullScreen" size="small" fill="#409eff">
          <el-radio-button :label="true">
            全屏
          </el-radio-button>
          <el-radio-button :label="false">
            放大
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="switchSetting-item">
        <span>切换缓存标签栏</span>
        <el-radio-group v-model="cacheTagsView" size="small" fill="#409eff">
          <el-radio-button :label="true">
            开启
          </el-radio-button>
          <el-radio-button :label="false">
            关闭
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <el-divider />
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
    margin-bottom: 20px;
  }
  .showSetting-item {
    font-size: 14px;
    color: var(--layout-setting-text-color);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .switchSetting-item {
    font-size: 14px;
    color: var(--layout-setting-text-color);
    padding: 10px 0;
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
