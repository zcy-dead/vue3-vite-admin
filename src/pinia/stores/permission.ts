import type { RouteRecordRaw } from "vue-router"
import { defineStore } from "pinia"
import { ref } from "vue"
import { constantRoutes, dynamicRoutes } from "@/router"
import { filterPermissionRoutes } from "@/utils/permission"

export const usePermissionStore = defineStore("permission", () => {
  /** 可访问的动态路由 */
  const addRoutes = ref<RouteRecordRaw[]>([])

  /** 可访问的所有路由 = 所有常驻路由 + 可访问的动态路由  */
  const allRoutes = ref<RouteRecordRaw[]>([])

  /** 设置可访问的动态路由：根据用户角色  */
  const setPermissionRoutes = (roles: string[]) => {
    addRoutes.value = filterPermissionRoutes(roles, dynamicRoutes)
    allRoutes.value = constantRoutes.concat(addRoutes.value)
  }

  /** 设置可访问的动态路由：不考虑角色限制  */
  const setAllRoutes = () => {
    addRoutes.value = dynamicRoutes
    allRoutes.value = constantRoutes.concat(addRoutes.value)
  }

  return { allRoutes, addRoutes, setPermissionRoutes, setAllRoutes }
})
