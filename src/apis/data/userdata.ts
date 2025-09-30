/** 模拟用户数据，连接后端后删除该文件 */
import type { LoginResponseData } from "../user/type"

export const users: LoginResponseData[] = [
  {
    code: 200,
    message: "请求成功",
    data: {
      id: 2,
      username: "admin",
      password: "123",
      name: "管理员用户",
      phone: "123456789",
      email: "admin@example.com",
      roles: [
        "user",
        "admin"
      ],
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyLVt1c2VyLCBhZG1pbl0iLCJleHAiOjE3NTQ5MDQyNTR9.TgP3UcLPBTI4S1gAhfSE7jL-TVXsWahq2aN7j8_2M7o"
    }
  },
  {
    code: 200,
    message: "请求成功",
    data: {
      id: 3,
      username: "reviewer",
      password: "123",
      name: "审核员用户",
      phone: "123456789",
      email: "reviewer@example.com",
      roles: [
        "user",
        "reviewer"
      ],
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzLVt1c2VyLCByZXZpZXdlcl0iLCJleHAiOjE3NTQ5MDQyODR9.KLGUiNzhTJYD8tHTax_0UwCUnW2VD35zv8ho4vNqqtw"
    }
  }
]
