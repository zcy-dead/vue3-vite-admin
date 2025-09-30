<script setup lang="ts">
import type { FormInstance } from "element-plus"
import type { LoginFormData } from "@/apis/user/type"
import { Lock, User } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { loginApi } from "@/apis/user"
import { useUserStore } from "@/pinia/stores/user"
import router from "@/router"

const userStore = useUserStore()

const loginFormData = reactive<LoginFormData>({
  username: "",
  password: ""
})

const loginForm = ref<FormInstance | null>(null)

/** 表单验证规则 */
const loginFormRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符之间", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "密码长度在 3 到 18 个字符之间", trigger: "blur" }
  ]
})

/** 登录表单提交 */
function handleLoginSubmit() {
  loginForm.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("登录表单校验不通过")
      return
    }
    loginApi(loginFormData)
      .then(({ data }) => {
        userStore.setToken(data.token)
        router.push("/")
      })
      .catch(() => {
        loginFormData.password = ""
        ElMessage.error("用户名或密码不正确")
      })
  })
}
</script>

<template>
  <div class="login-container">
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
          type="text"
          placeholder="用户名"
          v-model.trim="loginFormData.username"
          autocomplete="username"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model.trim="loginFormData.password"
          autocomplete="current-password"
          :prefix-icon="Lock"
          show-password
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
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;

  .form-content {
    height: 100%;
    width: 100%;
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

      img {
        height: 32px;
      }
    }

    .el-form {
      width: 100%;
    }

    .el-form-item {
      width: 100%;

      :deep(.el-form-item__content) {
        margin: 5px 0;
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

    .checkbox-group {
      margin: 10px 0;
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
        font-weight: 500;
        &:link {
          color: #3b8dde;
        }
        &:hover {
          color: #512da8;
        }
      }
    }

    button {
      width: 70%;
      letter-spacing: 20px;
      text-indent: 20px;
      background-color: #512da8;
      color: #fff;
      font-size: 12px;
      padding: 10px 45px;
      border: 1px solid transparent;
      border-radius: 8px;
      font-weight: 600px;
      margin-top: 10px;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
