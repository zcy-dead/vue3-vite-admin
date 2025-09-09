import type { SettingConfig } from "@/types/setting"
import type { SidebarStatus } from "@/types/sidebar"
import type { TagView } from "@/types/tagView"
import type { ThemeType } from "@/types/theme"
import { LocalStorageKey } from "@/constants/localStorage"
// #region 当前应用的主题类型
/**
 * 设置当前应用的主题类型。
 * 将指定的主题类型存储到 localStorage 中。
 * @param {ThemeType} themetype - 要设置的主题类型。
 */
export function setActiveThemeType(themetype: ThemeType): void {
  localStorage.setItem(LocalStorageKey.ACTIVE_THEME_TYPE, themetype)
}

/**
 * 获取当前应用的主题类型。
 * 从 localStorage 中读取当前应用的主题类型。如果未设置，则返回 null。
 * @returns {ThemeType | null} 返回当前应用的主题类型，如果未设置则返回 null。
 */
export function getActiveThemeType(): ThemeType | null {
  return localStorage.getItem(LocalStorageKey.ACTIVE_THEME_TYPE) as ThemeType | null
}
// #endregion

// #region 侧边栏状态
/**
 * 设置侧边栏的状态。
 * 将指定的侧边栏状态存储到 localStorage 中。
 * @param {SidebarStatus}  sidebarStatus - 要设置的侧边栏状态，可以是 'opened' 或 'closed'。
 */
export function setSidebarStatus(sidebarStatus: SidebarStatus): void {
  localStorage.setItem(LocalStorageKey.SIDEBAR_STATUS, sidebarStatus)
}
/**
 * 获取侧边栏的状态。
 * 从 localStorage 中读取侧边栏的当前状态。返回值可以是 'opened' 或 'closed'。
 * @returns {SidebarStatus} 返回侧边栏的当前状态，如果未设置则返回 null。
 */
export function getSidebarStatus(): SidebarStatus | null {
  return localStorage.getItem(LocalStorageKey.SIDEBAR_STATUS) as SidebarStatus | null
}

// #endregion

// #region 标签视图
/**
 * (1)获取已访问的视图。
 * 从 localStorage 中读取已访问的视图列表。如果未设置，则返回一个空数组。
 * @returns {TagView[]} 返回已访问的视图列表。
 */
export function getVisitedViews(): TagView[] {
  const jsonString = localStorage.getItem(LocalStorageKey.VISITED_VIEWS)
  return JSON.parse(jsonString ?? "[]") as TagView[]
}

/**
 * (2)设置已访问的视图。
 * 将指定的已访问视图列表存储到 localStorage 中。
 * 在存储之前，会移除视图对象中的一些不需要持久化的属性（如 `matched` 和 `redirectedFrom`）。
 * @param {TagView[]} views - 要设置的已访问视图列表。
 */
export function setVisitedViews(views: TagView[]): void {
  views.forEach((view) => {
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(LocalStorageKey.VISITED_VIEWS, JSON.stringify(views))
}

/**
 * (3)获取缓存的视图。
 * 从 localStorage 中读取缓存的视图列表。如果未设置，则返回一个空数组。
 * @returns {string[]} 返回缓存的视图列表，其中每个元素是视图的名称。
 */
export function getCachedViews(): string[] {
  const jsonString = localStorage.getItem(LocalStorageKey.CACHED_VIEWS)
  return JSON.parse(jsonString ?? "[]") as string[]
}

/**
 * (4)设置缓存的视图。
 * 将指定的缓存视图列表存储到 localStorage 中。
 * @param {string[]} views - 要设置的缓存视图列表，其中每个元素是视图的名称。
 */
export function setCachedViews(views: string[]): void {
  localStorage.setItem(LocalStorageKey.CACHED_VIEWS, JSON.stringify(views))
}
// #endregion

// #region 系统布局配置
/**
 * 设置系统布局配置。
 * 将指定的系统布局配置存储到 localStorage 中。
 * @param {SettingConfig} setting - 要设置的系统布局配置。
 */
export function setSettingConfig(setting: SettingConfig): void {
  // 将系统布局配置转换为 JSON 字符串并存储到 localStorage 中
  localStorage.setItem(LocalStorageKey.SETTING_CONFIG, JSON.stringify(setting))
}

/**
 * 获取系统布局配置。
 * 从 localStorage 中读取系统布局配置。如果未设置，则返回 null。
 * @returns {SettingConfig | null} 返回系统布局配置，如果未设置则返回 null。
 */
export function getSettingConfig(): SettingConfig | null {
  // 从 localStorage 中获取存储的系统布局配置的 JSON 字符串
  const jsonString = localStorage.getItem(LocalStorageKey.SETTING_CONFIG)
  // 如果 jsonString 存在，则解析为 SettingConfig 类型的对象；否则返回 null
  return jsonString ? (JSON.parse(jsonString) as SettingConfig) : null
}

/**
 * 移除布局配置。
 * 从 localStorage 中移除布局配置。
 */
export function removeSettingConfig(): void {
  // 移除 localStorage 中的布局配置
  localStorage.removeItem(LocalStorageKey.SETTING_CONFIG)
}
// #endregion
