// 为 path-browserify 提供类型声明
declare module "path-browserify" {
  import * as path from "node:path"

  export = path
}
