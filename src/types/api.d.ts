/** 所有 api 接口的响应数据格式 */
interface ApiResponseData<T> {
  code: number
  message: string
  data: T
}
