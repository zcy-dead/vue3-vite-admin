import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "vue-router"
import Admin from "@/icons/Admin.vue"
import GitHub from "@/icons/GitHub.vue"
import Reviewer from "@/icons/Reviewer.vue"
import Table from "@/icons/Table.vue"
import { routerConfig } from "./config"
import { registerGuard } from "./guard"

const Layouts = () => import("@/layouts/index.vue")

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/privacyPolicy",
    component: () => import("@/views/login/components/privacyPolicy.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/termsOfService",
    component: () => import("@/views/login/components/termsOfService.vue"),
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
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/route",
    component: Layouts,
    redirect: "/route/withIcon",
    name: "Route",
    meta: {
      title: "路由演示",
      elIcon: "Paperclip",
      alwaysShow: true
    },
    children: [
      {
        path: "withIcon",
        component: () => import("@/views/route/withIcon.vue"),
        name: "withIcon",
        meta: {
          title: "有图标路由",
          elIcon: "Coin"
        }
      },
      {
        path: "noIcon",
        component: () => import("@/views/route/noIcon.vue"),
        name: "noIcon",
        meta: {
          title: "无图标路由"
        }
      },
      {
        path: "user",
        component: () => import("@/views/route/UserProfile.vue"),
        name: "UserProfile",
        meta: {
          title: "动态路由"
        }
      },
      {
        path: "user/:id",
        component: () => import("@/views/route/UserProfile.vue"),
        name: "UserProfileDetail",
        meta: {
          title: "动态路由",
          hidden: true
        }
      },
      {
        path: "three",
        name: "three",
        redirect: "triple",
        meta: {
          title: "三级路由",
          alwaysShow: true
        },
        children: [
          {
            path: "triple",
            component: () => import("@/views/route/tripleRoute.vue"),
            name: "triple",
            meta: {
              title: "三级路由",
              elIcon: "CollectionTag"
            }
          }
        ]
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
        path: "admin-level",
        component: () => import("@/views/permission/admin.vue"),
        name: "PermissionPageLevel",
        meta: {
          title: "admin页面",
          elIcon: Admin,
          roles: ["admin"]
        }
      },
      {
        path: "reviewer-level",
        component: () => import("@/views/permission/reviewer.vue"),
        name: "PermissionButtonLevel",
        meta: {
          title: "reviewer页面",
          elIcon: Reviewer,
          roles: ["reviewer"]
        }
      }
    ]
  },
  {
    path: "/element-plus",
    component: Layouts,
    redirect: "/element-plus/el-table",
    name: "el-table",
    meta: {
      title: "element-plus",
      elIcon: "ElementPlus",
      alwaysShow: true
    },
    children: [
      {
        path: "el-table",
        component: () => import("@/views/element-plus/el-table.vue"),
        name: "userTable",
        meta: {
          title: "el-table",
          elIcon: Table
        }
      }
    ]
  },
  {
    path: "/about",
    name: "关于项目",
    component: Layouts,
    redirect: "/about/project",
    children: [
      {
        path: "project",
        name: "project",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于项目",
          elIcon: "Warning"
        }
      }
    ]
  },
  {
    path: "/test",
    name: "测试",
    component: Layouts,
    redirect: "/test/ou",
    children: [
      {
        path: "ou",
        name: "Ou",
        component: () => import("@/views/test/index.vue"),
        meta: {
          title: "测试",
          elIcon: "Warning",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/link-github",
    children: [
      {
        path: "https://github.com/zcy-dead/vue3-vite-admin",
        component: () => {},
        name: "Link",
        meta: {
          title: "GitHub源码",
          elIcon: GitHub
        }
      }
    ]
  }
]

const router = createRouter({
  history: routerConfig.history,
  routes: constantRoutes
})

registerGuard(router)

export default router

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
