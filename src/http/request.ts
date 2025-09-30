import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { ElMessage } from "element-plus"
import { get, merge } from "lodash-es"
import { useUserStore } from "@/pinia/stores/user"
import { getToken } from "@/utils/cookie"

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  const userStore = useUserStore()
  userStore.logout()
  location.reload()
}

/** 创建一个 Axios 实例，并为其添加请求拦截器和响应拦截器 */
function createInstance() {
  // 创建axios实例
  const instance = axios.create()

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      const apiData = response.data
      // 1. 处理二进制数据，二进制数据则直接返回
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData

      // 2. 检查业务状态码
      const code = apiData.code
      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      }
      // 3. 根据业务状态码处理
      switch (code) {
        case 200:
          return apiData
        case 401:
          return logout()
        default:
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      // 1. 从错误对象中获取 HTTP 状态码和错误信息
      const status = get(error, "response.status")
      const message = get(error, "response.data.message")
      // 2. 根据 HTTP 状态码处理
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          error.message = message || "未授权"
          logout()
          break
        case 403:
          error.message = message || "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return instance
}

/** 创建一个请求函数，用于发送 HTTP 请求 */
function createRequest(instance: AxiosInstance) {
  return <T>(config: AxiosRequestConfig): Promise<T> => {
    // 获取 Token
    const token = getToken()

    // 默认配置
    const defaultConfig: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Authorization": token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      data: {},
      timeout: 5000,
      withCredentials: false
    }

    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return instance(mergeConfig)
  }
}

/** 请求函数 request */
const instance = createInstance()
export const request = createRequest(instance)
