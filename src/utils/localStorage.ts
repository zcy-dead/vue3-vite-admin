import type { SettingConfig } from "@/types/setting"
import type { SidebarStatus } from "@/types/sidebar"
import type { TagView } from "@/types/tagView"
import type { ThemeType } from "@/types/theme"
import { LocalStorageKey } from "@/constants/localStorage"

// #region 当前应用的主题类型的获取、设置
export function getActiveThemeType(): ThemeType | null {
  return localStorage.getItem(LocalStorageKey.ACTIVE_THEME_TYPE) as ThemeType | null
}

export function setActiveThemeType(themetype: ThemeType): void {
  localStorage.setItem(LocalStorageKey.ACTIVE_THEME_TYPE, themetype)
}
// #endregion

// #region 侧边栏状态的获取、设置
export function getSidebarStatus(): SidebarStatus | null {
  return localStorage.getItem(LocalStorageKey.SIDEBAR_STATUS) as SidebarStatus | null
}

export function setSidebarStatus(sidebarStatus: SidebarStatus): void {
  localStorage.setItem(LocalStorageKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region 访问过的视图的获取、设置
export function getVisitedViews(): TagView[] {
  const jsonString = localStorage.getItem(LocalStorageKey.VISITED_VIEWS)
  return JSON.parse(jsonString ?? "[]")
}

export function setVisitedViews(views: TagView[]): void {
  views.forEach((view) => {
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(LocalStorageKey.VISITED_VIEWS, JSON.stringify(views))
}
// #endregion

// #region 缓存的视图的获取、设置
export function getCachedViews(): string[] {
  const jsonString = localStorage.getItem(LocalStorageKey.CACHED_VIEWS)
  return JSON.parse(jsonString ?? "[]")
}

export function setCachedViews(views: string[]): void {
  localStorage.setItem(LocalStorageKey.CACHED_VIEWS, JSON.stringify(views))
}
// #endregion

// #region 固定的视图的获取、设置
export function getAffixedViews(): TagView[] {
  const jsonString = localStorage.getItem(LocalStorageKey.AFFIXED_VIEWS)
  return JSON.parse(jsonString ?? "[]")
}

export function setAffixedViews(views: TagView[]): void {
  localStorage.setItem(LocalStorageKey.AFFIXED_VIEWS, JSON.stringify(views))
}
// #endregion

// #region 系统布局配置的获取、设置、移除
export function getSettingConfig(): SettingConfig | null {
  const jsonString = localStorage.getItem(LocalStorageKey.SETTING_CONFIG)
  return jsonString ? (JSON.parse(jsonString) as SettingConfig) : null
}

export function setSettingConfig(setting: SettingConfig): void {
  localStorage.setItem(LocalStorageKey.SETTING_CONFIG, JSON.stringify(setting))
}

export function removeSettingConfig(): void {
  localStorage.removeItem(LocalStorageKey.SETTING_CONFIG)
}
// #endregion
