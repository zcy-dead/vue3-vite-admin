import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"

import { installPlugins } from "./plugins"
import router from "./router"

// css
import "@/css/global.css"
import "@/css/element-plus.css"
import "@/css/theme-light.css"
import "@/css/theme-dark.css"
import "@/css/variables.css"
import "nprogress/nprogress.css"
import "element-plus/dist/index.css"
// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

// 安装插件（全局组件、自定义指令等）
installPlugins(app)

// 安装中文版ElementPlus
app.use(ElementPlus, {
  locale: zhCn
})

// 安装 router 和 pinia
app.use(router).use(pinia)

app.mount("#app")
