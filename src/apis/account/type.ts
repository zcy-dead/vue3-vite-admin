// accountFormRules表单数据的结构化表示
export interface LoginRequestData {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  // code: string
}

// export type CaptchaResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{
  id: number
  username: string
  password: string
  name: string
  phone: string
  email: string
  roles: string[]
  token: string
}>
