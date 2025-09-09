export type CurrentUserResponseData = ApiResponseData<{
  id: number
  username: string
  name: string
  phone: string
  email: string
  roles: string[]
}>
