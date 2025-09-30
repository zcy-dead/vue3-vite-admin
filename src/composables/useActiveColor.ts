import { computed, watchEffect } from "vue"
import { useSettingStore } from "@/pinia/stores/setting"
import { setCssVar } from "@/utils/cssVar"

export function useActiveColor() {
  const settingStore = useSettingStore()
  const activeColor = computed({
    get: () => settingStore.layoutColor,
    set: (value: string) => {
      settingStore.layoutColor = value
    }
  })

  function initTheme() {
    const cssVarName = "--active-text-color"
    watchEffect(() => {
      setCssVar(cssVarName, activeColor.value as string)
    })
  }

  return { activeColor, initTheme }
}
