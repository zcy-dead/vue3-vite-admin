import { defineStore } from "pinia"
import { ref, watchEffect } from "vue"
import { themeList, ThemeType } from "@/types/theme"
import { getActiveThemeType, setActiveThemeType } from "@/utils/localStorage"

export const useThemeStore = defineStore("theme", () => {
  /** 获取当前应用的主题类型。如果没有设置，则默认为浅色主题 */
  const activeThemeType = ref<ThemeType>(getActiveThemeType() || ThemeType.Light)

  /** 设置应用的主题类型 */
  function setThemeType(value: ThemeType) {
    activeThemeType.value = value
  }

  /** 在 html 根元素上挂载 class，值为 value */
  function addHTMLClass(value: ThemeType) {
    document.documentElement.classList.add(value)
  }

  /** 移除 html 根元素上除了value的其他ThemeType class */
  function removeHTMLClass(value: ThemeType) {
    const removeThemeList = themeList.map(item => item.type).filter(item => item !== value)
    document.documentElement.classList.remove(...removeThemeList)
  }

  /** 应用主题 */
  function applyTheme(value: ThemeType) {
    removeHTMLClass(value)
    addHTMLClass(value)
    setActiveThemeType(value)
  }

  /** 初始化主题 */
  function initTheme() {
    // 设置响应式监听
    watchEffect(() => {
      applyTheme(activeThemeType.value)
    })
  }

  return { themeList, activeThemeType, setThemeType, initTheme }
})
