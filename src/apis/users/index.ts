import type { LoginResponseData } from "../account/type"
// import type * as User from "./type"
// import { request } from "@/utils/http/axios"
import { users } from "@/apis/users/userdata"

/** 获取当前登录用户详情 */
// export function getCurrentUserApi() {
//   return request<User.CurrentUserResponseData>({
//     url: "auth/getuser",
//     method: "get"
//   })
// }

export function getCurrentUserApi(token: string): Promise<LoginResponseData> {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.data.token === token)
    if (user) {
      resolve(user)
    } else {
      reject(new Error("用户未登录或用户信息不存在"))
    }
  })
}
