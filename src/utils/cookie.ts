import Cookies from "js-cookie"
// 定义缓存键常量，用于存储和访问 Token
import { CookieKey } from "@/constants/cookie"

/**
 * 获取当前存储的 Token。
 *
 * @returns {string | undefined} 返回存储在 Cookie 中的 Token 值，如果不存在则返回 undefined。
 */
export function getToken() {
  return Cookies.get(CookieKey.TOKEN)
}

/**
 * 设置 Token 到 Cookie 中。
 *
 * @param {string} token - 要存储的 Token 值。
 */
export function setToken(token: string) {
  Cookies.set(CookieKey.TOKEN, token)
}

/**
 * 从 Cookie 中移除 Token。
 */
export function removeToken() {
  Cookies.remove(CookieKey.TOKEN)
}
