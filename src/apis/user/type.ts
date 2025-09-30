/** 登录表单数据 */
export interface LoginFormData {
  username: string
  password: string
}

/** 登录接口返回的数据 */
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

export type CurrentUserResponseData = ApiResponseData<{
  id: number
  username: string
  name: string
  phone: string
  email: string
  roles: string[]
}>
