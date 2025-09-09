// 声明一个 TypeScript 模块，用于处理所有 .vue 后缀的文件
declare module "*.vue" {
  // 从 vue 包中导入 ComponentOptions 类型，该类型用于定义 Vue 组件选项
  import type { ComponentOptions } from "vue"

  // 声明一个符合 Vue 组件选项规范的对象
  // 这里使用 ComponentOptions 类型来确保类型安全
  const componentOptions: ComponentOptions

  // 将组件选项对象作为默认导出
  // 这使得在 .vue 文件中可以使用 export default 导出组件配置
  export default componentOptions
}
