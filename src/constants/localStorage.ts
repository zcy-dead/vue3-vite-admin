const SYSTEM_NAME = "vue3-vite-admin"

export class LocalStorageKey {
  /**
   * 当前激活主题名称
   * 用于存储当前激活的主题名称。
   */
  static readonly ACTIVE_THEME_TYPE = `${SYSTEM_NAME}-active-theme-type-key`

  /**
   * 侧边栏状态
   * 用于存储侧边栏的展开或折叠状态。
   */
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`

  /**
   * 访问过的视图
   * 用于记录用户访问过的页面（路由）的历史记录，这些记录可以用于展示在标签页导航中，方便用户快速切换。
   */
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`

  /**
   * 缓存的视图
   * 用于存储需要缓存的视图列表，通常用于实现页面的缓存功能。
   */
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`

  /**
   * 固定的视图
   * 用于存储需要固定的视图列表，通常用于实现页面的固定功能。
   */
  static readonly AFFIXED_VIEWS = `${SYSTEM_NAME}-affixed-views-key`

  /**
   * 系统布局配置
   * 用于存储系统的布局配置信息，例如侧边栏的展开状态、主题颜色等。
   */
  static readonly SETTING_CONFIG = `${SYSTEM_NAME}-setting-config-key`
}
