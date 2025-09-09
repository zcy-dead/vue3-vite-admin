import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "vue-router"
import { routerConfig } from "./config"
import { registerGuard } from "./guard"

const Layouts = () => import("@/layouts/index.vue")

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/",
    name: "Layouts",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "首页",
          elIcon: "House",
          affix: true
        }
      }
    ]
  },
  {
    path: "/data",
    component: Layouts,
    redirect: "/data/user",
    name: "Data",
    meta: {
      title: "数据管理",
      elIcon: "MostlyCloudy",
      alwaysShow: true
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/data-show/userTable.vue"),
        name: "userTable",
        meta: {
          title: "用户信息",
          elIcon: "User"
        }
      }
    ]
  }
]

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page-level",
    name: "Permission",
    meta: {
      title: "权限演示",
      elIcon: "Lock",
      roles: ["admin", "reviewer"],
      alwaysShow: true
    },
    children: [
      {
        path: "page-level",
        component: () => import("@/views/permission/page-level.vue"),
        name: "PermissionPageLevel",
        meta: {
          title: "admin",
          keepAlive: true,
          roles: ["admin"]
        }
      },
      {
        path: "button-level",
        component: () => import("@/views/permission/button-level.vue"),
        name: "PermissionButtonLevel",
        meta: {
          title: "reviewer",
          keepAlive: true,
          roles: ["reviewer"]
        }
      }
    ]
  },
  {
    path: "/test",
    name: "Test",
    component: Layouts,
    redirect: "/test/page-level",
    children: [
      {
        path: "any",
        name: "any",
        component: () => import("@/views/test/index.vue"),
        meta: {
          title: "测试",
          elIcon: "Lock",
          roles: ["admin", "reviewer"],
          alwaysShow: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: routerConfig.history,
  routes: constantRoutes
})

export function resetRouter() {
  try {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && (meta.roles as string[]).length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    location.reload()
  }
}

registerGuard(router)

export default router
