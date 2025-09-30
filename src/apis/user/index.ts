// import type * as User from "./type"
// import { request } from "@/utils/http/axios"

/** 登录接口 */
// export function loginApi(data: User.LoginFormData) {
//   return request<User.LoginResponseData>({
//     url: "auth/login",
//     method: "post",
//     data
//   })
// }

/** 获取当前登录用户详情信息接口 */
// export function getCurrentUserApi() {
//   return request<User.CurrentUserResponseData>({
//     url: "auth/getuser",
//     method: "get"
//   })
// }

/** 模拟获取当前登录用户详情，连接后端请删除以下内容，用上面内容 */
import type * as User from "./type"
import { users } from "@/apis/data/userdata"

/** 模拟登录接口 */
export function loginApi(loginFormData: User.LoginFormData): Promise<User.LoginResponseData> {
  return new Promise((resolve, reject) => {
    const user = users.find(
      u => u.data.username === loginFormData.username && u.data.password === loginFormData.password
    )
    if (user) {
      resolve(user)
    } else {
      reject(new Error("用户名或密码错误"))
    }
  })
}

/** 模拟获取当前登录用户详情信息接口 */
export function getCurrentUserApi(token: string): Promise<User.LoginResponseData> {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.data.token === token)
    if (user) {
      resolve(user)
    } else {
      reject(new Error("用户未登录或用户信息不存在"))
    }
  })
}
