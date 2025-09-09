import type { Ref } from "vue"
import type { SettingConfig } from "@/types/setting"
import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { settingConfig } from "@/types/setting"
import { setSettingConfig } from "@/utils/localStorage"

type SettingStore = {
  [Key in keyof SettingConfig]: Ref<SettingConfig[Key]>
}

type SettingStoreKey = keyof SettingStore

export const useSettingStore = defineStore("setting", () => {
  // 状态对象
  const state = {} as SettingStore

  // 获取要缓存的数据：将 state 对象转化为 settings 对象
  const getCacheData = () => {
    const settings = {} as SettingConfig
    for (const [key, value] of Object.entries(state)) {
      // @ts-expect-error ignore
      settings[key as SettingStoreKey] = value.value
    }
    return settings
  }

  // 遍历 LayoutsConfig 对象的键值对
  for (const [key, value] of Object.entries(settingConfig)) {
    // 使用类型断言来指定 key 的类型，将 value 包装在 ref 函数中，创建一个响应式变量
    const refValue = ref(value)
    // @ts-expect-error ignore
    state[key as SettingsStoreKey] = refValue
    // 监听每个响应式变量
    watch(refValue, () => {
      // 缓存
      const settings = getCacheData()
      setSettingConfig(settings)
    })
  }

  const initSetting = () => {
    const settings = getCacheData()
    setSettingConfig(settings)
  }

  return { ...state, initSetting }
})
