import type * as Auth from "./type"
// import { request } from "@/utils/http/axios"
import { users } from "@/apis/users/userdata"
/** 获取登录验证码 */
// export function getCaptchaApi() {
//   return request<Auth.CaptchaResponseData>({
//     url: "auth/captcha",
//     method: "get"
//   })
// }

/** 登录并返回数据 */
// export function loginApi(data: Auth.LoginRequestData) {
//   return request<Auth.LoginResponseData>({
//     url: "auth/login",
//     method: "post",
//     data
//   })
// }

export function loginApi(accountForm: { username: string, password: string }): Promise<Auth.LoginResponseData> {
  return new Promise((resolve, reject) => {
    const user = users.find(
      u => u.data.username === accountForm.username && u.data.password === accountForm.password
    )
    if (user) {
      resolve(user) // 直接返回匹配的用户数据
    } else {
      reject(new Error("用户名或密码错误"))
    }
  })
}
