import type { Handler } from "mitt"
import type { RouteLocationNormalizedGeneric } from "vue-router"
import mitt from "mitt"
import { onBeforeUnmount } from "vue"

/** 创建事件总线实例 */
const emitter = mitt()

/** 定义一个唯一的事件键 */
const eventName = Symbol("ROUTE_CHANGE")

/** 定义回调函数的类型，接收一个路由位置对象作为参数 */
type Callback = (route: RouteLocationNormalizedGeneric) => void

/** 用于缓存最新的路由信息 */
let latestRoute: RouteLocationNormalizedGeneric

/** 设置路由变化并触发事件。 */
export function setRouteChange(to: RouteLocationNormalizedGeneric) {
  emitter.emit(eventName, to)
  latestRoute = to
}

/** 用于订阅路由变化的 Composable 函数 */
export function useRouteListener() {
  const callbackList: Callback[] = []

  const listenerRouteChange = (callback: Callback, immediate = false) => {
    callbackList.push(callback)
    emitter.on(eventName, callback as Handler)

    immediate && latestRoute && callback(latestRoute)
  }

  const removeRouteListener = (callback: Callback) => {
    emitter.off(eventName, callback as Handler)
  }

  onBeforeUnmount(() => {
    callbackList.forEach(removeRouteListener)
  })

  return { listenerRouteChange, removeRouteListener }
}
