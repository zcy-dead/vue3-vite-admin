import type { SettingConfig } from "@/types/setting"
import { defineStore } from "pinia"
import { computed, reactive, watch } from "vue"
import { DEFAULT_CONFIG } from "@/types/setting"
import { getSettingConfig, setSettingConfig } from "@/utils/localStorage"

export const useSettingStore = defineStore("setting", () => {
  // 统一状态管理
  const state = reactive<SettingConfig>({ ...DEFAULT_CONFIG, ...getSettingConfig() })

  // 计算属性封装配置项
  const showSetting = computed({
    get: () => state.showSetting,
    set: val => (state.showSetting = val)
  })

  const layoutColor = computed({
    get: () => state.layoutColor,
    set: val => (state.layoutColor = val)
  })

  const showTagsView = computed({
    get: () => state.showTagsView,
    set: val => (state.showTagsView = val)
  })

  const showLogo = computed({
    get: () => state.showLogo,
    set: val => (state.showLogo = val)
  })

  const showFooter = computed({
    get: () => state.showFooter,
    set: val => (state.showFooter = val)
  })

  const showThemeSwitch = computed({
    get: () => state.showThemeSwitch,
    set: val => (state.showThemeSwitch = val)
  })

  const showScreenfull = computed({
    get: () => state.showScreenfull,
    set: val => (state.showScreenfull = val)
  })

  const cacheTagsView = computed({
    get: () => state.cacheTagsView,
    set: val => (state.cacheTagsView = val)
  })

  const toggleFullScreen = computed({
    get: () => state.toggleFullScreen,
    set: val => (state.toggleFullScreen = val)
  })

  // 保存配置到localStorage
  const saveSettings = () => {
    setSettingConfig(state)
  }

  // 自动监听配置变化
  watch(
    () => ({ ...state }),
    () => saveSettings(),
    { deep: true }
  )

  return {
    showSetting,
    layoutColor,
    showTagsView,
    showLogo,
    showFooter,
    showThemeSwitch,
    showScreenfull,
    cacheTagsView,
    toggleFullScreen
  }
})
