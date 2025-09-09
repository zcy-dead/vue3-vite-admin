import type { App } from "vue"
import { installElementPlusIcons } from "./element-plus-icons"

export function installPlugins(app: App) {
  installElementPlusIcons(app)
}
