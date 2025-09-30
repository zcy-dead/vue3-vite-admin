/** 项目配置类型 */
export interface SettingConfig {
  /** 是否显示设置按钮和面板 */
  showSetting: boolean
  /** 设置主要颜色 */
  layoutColor: string | null
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否显示页脚 */
  showFooter: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
  /** 切换全屏效果 */
  toggleFullScreen: boolean
}

/** 默认配置 */
export const DEFAULT_CONFIG: SettingConfig = {
  showSetting: true,
  layoutColor: "rgb(14, 131, 241)",
  showTagsView: true,
  showFooter: true,
  showLogo: true,
  showThemeSwitch: true,
  showScreenfull: true,
  cacheTagsView: true,
  toggleFullScreen: true
}
