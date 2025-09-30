import { fileURLToPath, URL } from "node:url"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig, loadEnv } from "vite"

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

// Configuring Vite: https://cn.vite.dev/config
export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
  return {
    // 开发或打包构建时用到的公共基础路径
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    // 开发环境服务器配置
    server: {
      // 端口号
      port: 3060,
      // 是否监听所有地址
      host: true,
      // 端口被占用时，是否直接退出
      strictPort: false,
      // 是否自动打开浏览器
      open: true,
      // 是否允许跨域
      cors: true,
      // 预热常用文件，提高初始页面加载速度
      warmup: {
        clientFiles: [
          "./src/layouts/**/*.*",
          "./src/pinia/**/*.*",
          "./src/router/**/*.*"
        ]
      },
      // 热模块替换
      hmr: {
        // 是否在开发服务器中显示错误覆盖层。
        overlay: true
      },
      // 文件监听行为
      watch: {
        // 是否使用轮询机制来检测文件变化
        usePolling: true
      }
    },
    // 混淆器
    esbuild:
      mode === "development"
        ? undefined
        : {
            pure: ["console.log"],
            drop: ["debugger"],
            legalComments: "none"
          },
    // 构建配置
    build: {
      // 指定输出目录
      outDir: "dist",
      // 指定静态资源目录
      assetsDir: "assets",
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          /**
           * @name 分块策略
           * @description 1. 注意这些包名必须存在，否则打包会报错
           * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"]
          },
          // 代码块文件命名格式
          chunkFileNames: "assets/[name]-[hash].js",
          // 入口文件命名格式
          entryFileNames: "assets/[name]-[hash].js",
          // 静态资源文件命名格式
          assetFileNames: "assets/[name]-[hash].[ext]",
          // 解决文件名中的非法字符
          sanitizeFileName: (name) => {
            const match = DRIVE_LETTER_REGEX.exec(name)
            const driveLetter = match ? match[0] : ""
            return (
              driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
            )
          }
        }
      }
    },
    // 插件配置
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
