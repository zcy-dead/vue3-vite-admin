/// <reference types="vite/client" />

// 声明 import.meta.env 的类型
interface ImportMetaEnv {
  // 定义环境变量的类型
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_ROUTER_HISTORY: "hash" | "html5"
  readonly VITE_PUBLIC_PATH: string

}

// 声明 import.meta 的类型
interface ImportMeta {
  readonly env: ImportMetaEnv
}
