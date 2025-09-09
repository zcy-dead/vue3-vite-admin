const SYSTEM_NAME = "SUIBIDAO"

/**
 *缓存数据时用到的 Key
 */
export class CookieKey {
  /**
   * 用户登录 Token 的缓存键
   * 用于存储用户的登录 Token，通常在用户登录后保存到 Cookie 中。
   */
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
}
