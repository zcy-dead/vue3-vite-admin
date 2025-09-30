import type { Router } from "vue-router"
import { ElMessage } from "element-plus"
import NProgress from "nprogress"
import { setRouteChange } from "@/composables/useRouteListener"
import { usePermissionStore } from "@/pinia/stores/permission"
import { useUserStore } from "@/pinia/stores/user"
import { isWhiteList } from "@/router/whiteList"
import { getToken } from "@/utils/cookie"
import { routerConfig } from "./config"

NProgress.configure({
  showSpinner: false
})

const LOGIN_PATH = "/login"
const HOME_PATH = "/"

export function registerGuard(router: Router) {
  router.beforeEach(async (to, _from) => {
    NProgress.start()
    const userStore = useUserStore()
    const hasToken = getToken()

    // 1. 处理未登录情况
    if (!hasToken) {
      if (isWhiteList(to)) return true
      return LOGIN_PATH
    }

    // 2. 已登录时访问登录页 → 重定向到首页
    if (to.path === LOGIN_PATH) {
      return HOME_PATH
    }

    // 3. 已获取角色信息 → 直接放行
    if (userStore.roles.length !== 0) {
      return true
    }

    // 4. 需要获取角色信息
    try {
      await userStore.getInfo()
      const roles = userStore.roles
      const permissionStore = usePermissionStore()
      // 生成可访问的 Routes
      routerConfig.dynamic ? permissionStore.setPermissionRoutes(roles) : permissionStore.setAllRoutes()

      // 将 "有访问权限的动态路由" 添加到 Router 中
      permissionStore.addRoutes.forEach(route => router.addRoute(route))

      // 设置 replace: true, 因此导航将不会留下历史记录
      return { ...to, replace: true }
    } catch (error) {
      // 错误处理：重置 token 并重定向到登录页
      userStore.resetToken()
      ElMessage.error((error as Error).message || "路由守卫发生错误")

      return LOGIN_PATH
    }
  })

  // 全局后置钩子
  router.afterEach((to) => {
    setRouteChange(to)
    NProgress.done()
  })
}
