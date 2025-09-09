const SYSTEM_NAME = "vue3-vite-admin"

/**
 *缓存数据时用到的 Key
 */
export class LocalStorageKey {
  /**
   * 当前激活主题名称的缓存键
   * 用于存储当前激活的主题名称，例如 'light' 或 'dark'。
   */
  static readonly ACTIVE_THEME_TYPE = `${SYSTEM_NAME}-active-theme-type-key`

  /**
   * 侧边栏状态的缓存键
   * 用于存储侧边栏的展开或折叠状态。
   */
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`

  /**
   * 访问过的视图的缓存键
   *
   * 用于存储用户访问过的视图列表，通常用于实现页面的缓存功能。
   */
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`

  /**
   * 缓存的视图的缓存键
   *
   * 用于存储需要缓存的视图列表，通常用于实现页面的缓存功能。
   */
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`

  /**
   * 配置布局的缓存键
   *
   * 用于存储系统的布局配置信息，例如侧边栏的展开状态、主题颜色等。
   */
  static readonly SETTING_CONFIG = `${SYSTEM_NAME}-setting-config-key`
}
