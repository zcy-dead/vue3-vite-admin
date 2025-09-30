/**
 * 获取指定元素上的 CSS 变量的值。
 * 默认情况下，操作的是全局的 :root 元素（即 document.documentElement）
 */
export function getCssVar(varName: string, element: HTMLElement = document.documentElement) {
  if (!varName?.startsWith("--")) {
    console.error("CSS 变量名必须以 '--' 开头")
    return ""
  }
  return getComputedStyle(element).getPropertyValue(varName)
}

/**
 * 设置指定元素上的 CSS 变量的值。
 * 默认情况下，操作的是全局的 :root 元素（即 document.documentElement）
 */
export function setCssVar(varName: string, value: string, element: HTMLElement = document.documentElement) {
  if (!varName?.startsWith("--")) {
    console.error("CSS 变量名必须以 '--' 开头")
    return
  }
  element.style.setProperty(varName, value)
}
