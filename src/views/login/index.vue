<script setup lang="ts">
import type { FormInstance } from "element-plus"
import type { LoginFormData } from "@/types/loginFormData "
import { Lock, User } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref } from "vue"
import { loginApi } from "@/apis/account"
import { useUserStore } from "@/pinia/stores/user"
import router from "@/router"

const userStore = useUserStore()

// #region  宣传语随机切换
const sentences = [
  "只会说花言巧语是改变不了世界的!",
  "用错误的方法得到的结果没有任何价值!",
  "在这个世界上 有由善意而生的恶意 也有又恶意而生的善意!",
  "我们的目标,就是成为正义的伙伴!",
  "不管夜晚多么黑暗,黎明总是会到来!",
  "鲁鲁修 你知道雪花为什么是白色的吗？ 因为已经忘记了自己本来是什么颜色啊"
]

const randomSentence = ref<string>("")

function getRandomSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length)
  return sentences[randomIndex]
}

onMounted(() => {
  randomSentence.value = getRandomSentence()
})
// #endregion

// #region 切换登录/注册状态
const isActive = ref(false)

function toggleLogin() {
  isActive.value = false
  randomSentence.value = getRandomSentence()
}
function toggleRegister() {
  isActive.value = true
}

// #endregion

// #region 处理登录表单
const loginFormData = reactive<LoginFormData>({
  username: "",
  password: ""
})

/** 登录表单元素的引用 */
const loginForm = ref<FormInstance | null>(null)

// 定义表单验证规则
const loginFormRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
    // { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
    // { min: 6, max: 18, message: '密码长度在 6 到 18 个字符之间', trigger: 'blur' }
  ]
})

function handleLoginSubmit() {
  loginForm.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loginApi(loginFormData)
      .then(({ data }) => {
        userStore.setToken(data.token)
        router.push("/")
      })
      .catch(() => {
        loginFormData.password = ""
      })
  })
}
// #endregion
</script>

<template>
  <div class="container">
    <div class="login-container " :class="{ active: isActive }">
      <div class="form-container sign-in">
        <el-form class="form-content" ref="loginForm" :model="loginFormData" :rules="loginFormRules">
          <h2>登录</h2>
          <div class="social-icons">
            <router-link to="/" target="_blank">
              <img src="@/imgs/qq.svg" alt="QQ">
            </router-link>
            <router-link to="/" target="_blank">
              <img src="@/imgs/weixin.svg" alt="WeiXin">
            </router-link>
          </div>
          <el-form-item prop="username">
            <el-input
              type="text" placeholder="用户名" v-model.trim="loginFormData.username" autocomplete="username"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password" placeholder="密码" v-model.trim="loginFormData.password"
              autocomplete="current-password" :prefix-icon="Lock" show-password
            />
          </el-form-item>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" class="checkbox-input">记住我
            </label>
            <router-link to="/123">
              忘记密码
            </router-link>
          </div>
          <button type="submit" @click.prevent="handleLoginSubmit" @keyup.enter="handleLoginSubmit">
            登录
          </button>
        </el-form>
      </div>
      <div class="form-container sign-up">
        <form class="form-content">
          <h2>注册</h2>
          <div class="social-icons" />
          <input type="text" placeholder="用户名" autocomplete="username">
          <input type="password" placeholder="密码" autocomplete="new-password">
          <input type="password" placeholder="确认密码" autocomplete="new-password">
          <div class="checkbox-group">
            <label>
              <input type="checkbox" required>
              我已阅读并同意
              <a href="#" target="_blank">服务条款</a>
              和
              <a href="#" target="_blank">隐私政策</a>
            </label>
          </div>
          <button>注册</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h2>你好，朋友</h2>
            <p>欢迎注册，成为我们中的一员。</p>
            <button @click="toggleLogin">
              前往登录
            </button>
          </div>
          <div class="toggle-panel toggle-right">
            <h2>欢迎回来</h2>
            <p>{{ randomSentence }}</p>
            <button @click="toggleRegister">
              前往注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgb(216, 216, 216), rgb(177, 177, 255));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

// 样式
.login-container {
  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }

  a {
    font-size: 13px;
    text-decoration: none;
  }

  img {
    height: 32px;
  }

  input {
    width: 70%;
    background-color: #eee;
    color: #000;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    outline: none;
    margin: 10px;
  }

  button {
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600px;
    letter-spacing: 0.5px;
    margin-top: 10px;
    cursor: pointer;
    outline: none;
  }

  .el-form {
    width: 100%;
  }

  .el-form-item {
    width: 100%;

    :deep(.el-form-item__content) {
      margin: 6px 0;
      justify-content: center;
      width: 100%;
    }

    :deep(.el-form-item__error) {
      padding-left: 15%;
    }
  }

  .el-input {
    width: 70%;

    :deep(.el-input__wrapper) {
      background-color: #eee;
      font-size: 14px;
      border-radius: 8px;
    }

    :deep(.el-input__inner) {
      margin: 5px 0;
      color: #000;
      height: 30px;
      line-height: 30px;
      letter-spacing: 0.1px;
    }

    :deep(.el-input__inner::placeholder) {
      color: #909399;
      font-size: 14px;
    }
  }
}

// 布局
.login-container {
  height: 480px;
  width: 768px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;

    .form-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .social-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;

        a {
          width: 40px;
          height: 40px;
          border-radius: 20%;
          border: 1px solid transparent;
          margin: 0 3px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }

      .checkbox-group {
        margin: 10px 0 5px;
        display: flex;
        align-items: center;
        width: 70%;

        label {
          display: flex;
          align-items: center;
          justify-content: start;
          font-size: 14px;

          input {
            height: 15px;
            width: 15px;
            margin: 0 5px 0 0;
          }
        }

        a {
          margin-left: auto;
          font-size: 14px;
        }
      }

      button {
        width: 70%;
        letter-spacing: 20px;
        text-indent: 20px;
      }
    }
  }

  .sign-in {
    left: 0;
    width: 50%;
    z-index: 2;
    opacity: 1;
  }

  .sign-up {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
  }

  .toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    background-color: #5c6bc0;
    border-radius: 150px 0 0 100px;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    z-index: 1000;

    .toggle {
      height: 100%;
      background: linear-gradient(to right, #5c6bc0, #512da8);
      color: #fff;
      position: relative;
      transform: translateX(0);
      transition: all 0.6s ease-in-out;

      .toggle-panel {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 30px;
        text-align: center;
        top: 0;
        transition: all 0.6s ease-in-out;

        button {
          background-color: transparent;
          border-color: #fff;
        }
      }

      .toggle-left {
        transform: translateX(-100%);
      }

      .toggle-right {
        right: 0;
        transform: translateX(0);
      }
    }
  }
}

// 激活效果
.login-container.active {
  .sign-in {
    transform: translateX(100%);
    opacity: 0;
    z-index: 1;
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
  }

  .toggle-container {
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
  }

  .toggle {
    transform: translateX(100%);
  }

  .toggle-left {
    transform: translateX(0);
  }

  .toggle-right {
    transform: translateX(100%);
  }
}

// 定义了一个 CSS 动画
@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
