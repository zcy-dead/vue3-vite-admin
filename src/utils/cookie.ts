import Cookies from "js-cookie"
import { CookieKey } from "@/constants/cookie"

// #region Token的获取、设置、移除
export function getToken(): string | undefined {
  return Cookies.get(CookieKey.TOKEN)
}

export function setToken(token: string): void {
  Cookies.set(CookieKey.TOKEN, token)
}

export function removeToken(): void {
  Cookies.remove(CookieKey.TOKEN)
}
// #endregion
