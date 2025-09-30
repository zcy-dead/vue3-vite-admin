import { ElNotification } from "element-plus"
import { h } from "vue"

/** 开始通知 */
function initStarNotification() {
  setTimeout(() => {
    ElNotification({
      title: "欢迎来到 vue-vite-admin！",
      type: "success",
      message: h(
        "div",
        null,
        [
          h("div", null, "所有源码均免费开源，如果对你有帮助，欢迎点个 Star 支持一下！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/zcy-dead/v3-vite-admin" }, "点击传送")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 0)
}

/** 用户身份通知 */
function initAdminNotification() {
  setTimeout(() => {
    ElNotification({
      title: "用户身份",
      type: "primary",
      message: h(
        "div",
        null,
        [
          h("div", null, "-管理员用户"),
          h("div", null, "用户名：admin ; 密码：123"),
          h("div", null, "-审核员用户"),
          h("div", null, "用户名：reviewer ; 密码：123")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 500)
}

export function useNotification() {
  return { initStarNotification, initAdminNotification }
}
