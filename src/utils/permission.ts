import type { RouteRecordRaw } from "vue-router"

/**
 * 检查用户是否有权限访问某个路由。
 *
 * - 如果路由没有定义 `roles`，则默认允许访问。
 * - 如果定义了 `roles`，则检查用户的角色数组中是否包含路由要求的任意角色。
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles as string[] | undefined
  return routeRoles ? roles.some(role => routeRoles.includes(role)) : true
}

/**
 * 功能：根据用户角色过滤动态路由。
 *
 * 该函数遍历每个路由，使用 `hasPermission` 函数检查用户是否有权限访问该路由。
 * 如果用户有权限：
 * - 如果路由有子路由（children），则递归地对子路由进行过滤。
 * - 将有权限的路由加入结果数组。
 */
export function filterPermissionRoutes(roles: string[], routes: RouteRecordRaw[]) {
  const filteredRoutes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterPermissionRoutes(roles, tempRoute.children)
      }
      filteredRoutes.push(tempRoute)
    }
  })
  return filteredRoutes
}
