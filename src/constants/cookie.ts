const SYSTEM_NAME = "vue3-vite-admin"

export class CookieKey {
  /**
   * 用户登录 Token 的缓存键
   * 用于存储用户的登录 Token，通常在用户登录后保存到 Cookie 中。
   */
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
}
