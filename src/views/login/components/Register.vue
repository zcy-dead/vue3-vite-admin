<script setup lang="ts">
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"

// #region 处理注册表单，自定义验证
interface RegisterFormData {
  username: string
  password: string
  confirmPassword: string
  agreed: boolean
}
const registerFormData = reactive<RegisterFormData>({
  username: "",
  password: "",
  confirmPassword: "",
  agreed: false
})

const errors = reactive ({
  username: "" as string,
  password: "" as string,
  confirmPassword: "" as string,
  agreed: "" as string
})

/** 验证用户名 */
function validateUsername() {
  if (!registerFormData.username) {
    errors.username = "用户名不能为空"
  } else if (registerFormData.username.length < 3) {
    errors.username = "用户名至少需要3个字符"
  } else {
    errors.username = ""
  }
}

/** 验证密码 */
function validatePassword() {
  if (!registerFormData.password) {
    errors.password = "密码不能为空"
  } else if (registerFormData.password.length < 3) {
    errors.password = "密码至少需要3个字符"
  } else {
    errors.password = ""
  }
}

/** 验证确认密码 */
function validateConfirmPassword() {
  if (!registerFormData.confirmPassword) {
    errors.confirmPassword = "确认密码不能为空"
  } else if (registerFormData.confirmPassword !== registerFormData.password) {
    errors.confirmPassword = "确认密码与密码不一致"
  } else {
    errors.confirmPassword = ""
  }
}

/** 验证是否同意 */
function validateAgreed() {
  if (!registerFormData.agreed) {
    errors.agreed = "您必须同意服务条款和隐私政策"
  } else {
    errors.agreed = ""
  }
}

const isSubmitting = ref(false)

/** 注册表单提交 */
function handleRegisterSubmit() {
  validateUsername()
  validatePassword()
  validateConfirmPassword()
  validateAgreed()

  if (!errors.username && !errors.password && !errors.confirmPassword && !errors.agreed) {
    isSubmitting.value = true
    // 模拟提交完成后重置表单
    setTimeout(() => {
      ElMessage({
        message: `用户名: ${registerFormData.username}\n密码: ${registerFormData.password}`,
        type: "success",
        duration: 3000,
        showClose: true
      })
      registerFormData.username = ""
      registerFormData.password = ""
      registerFormData.confirmPassword = ""
      registerFormData.agreed = false
      isSubmitting.value = false
    }, 2000)
  } else {
    ElMessage.error("注册表单校验不通过")
  }
}
// #endregion

// #region 处理输入框聚焦和失焦事件
const isFocus = ref(false)

function handleFocus() {
  isFocus.value = true
}

function handleBlur(field: "username" | "password" | "confirmPassword") {
  isFocus.value = false
  switch (field) {
    case "username":
      validateUsername()
      break
    case "password":
      validatePassword()
      break
    case "confirmPassword":
      validateConfirmPassword()
      break
  }
}
// #endregion
</script>

<template>
  <div class="register-container">
    <form class="form-content" @submit.prevent="handleRegisterSubmit">
      <h2>注册</h2>
      <input
        type="text"
        placeholder="用户名"
        v-model.trim="registerFormData.username"
        @focus="handleFocus"
        @blur="handleBlur('username')"
        :class="{ error: errors.username, focus: isFocus }"
      >
      <div class="error-container">
        <div v-if="errors.username" class="error-message">
          {{ errors.username }}
        </div>
      </div>
      <input
        type="password"
        placeholder="密码"
        v-model.trim="registerFormData.password"
        :class="{ error: errors.password }"
        @focus="handleFocus"
        @blur="handleBlur('password')"
      >
      <div class="error-container">
        <div v-if="errors.password" class="error-message">
          {{ errors.password }}
        </div>
      </div>
      <input
        type="password"
        placeholder="确认密码"
        v-model="registerFormData.confirmPassword"
        :class="{ error: errors.confirmPassword }"
        @focus="handleFocus"
        @blur="handleBlur('confirmPassword')"
      >
      <div class="error-container">
        <div v-if="errors.confirmPassword" class="error-message">
          {{ errors.confirmPassword }}
        </div>
      </div>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="registerFormData.agreed">
          我已阅读并同意
          <router-link to="/privacyPolicy" class="link1" target="_blank">隐私政策</router-link>
          和
          <router-link to="/termsOfService" class="link2" target="_blank">服务条款</router-link>
        </label>
      </div>
      <div class="error-container">
        <div v-if="errors.agreed" class="error-message">
          {{ errors.agreed }}
        </div>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? '提交中' : '注册' }}
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  height: 100%;
  width: 100%;

  .form-content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      margin-bottom: 20px;
    }

    input {
      width: 70%;
      background-color: #eee;
      color: #000;
      border: none;
      padding: 10px 15px;
      font-size: 13px;
      border-radius: 8px;
      outline: none;
    }

    input.focus {
      border: 1px solid #409eff;
    }

    input.error {
      border: 1px solid #f56c6c;
    }

    .error-container {
      width: 70%;
      margin-bottom: 10px;
      min-height: 20px;
      .error-message {
        color: #f56c6c;
        font-size: 12px;
        text-align: left;
      }
    }

    .checkbox-group {
      // margin: 10px 0 5px;
      display: flex;
      align-items: center;
      width: 70%;

      label {
        display: flex;
        align-items: center;
        font-size: 14px;

        input {
          height: 15px;
          width: 15px;
          margin: 0 5px 0 0;
        }

        .link1,
        .link2 {
          font-size: 14px;
          font-weight: 500;
          &:link {
            color: #3b8dde;
          }
          &:visited {
            color: #512da8;
          }
          &:hover {
            color: #512da8;
          }
          &:active {
            color: #512da8;
          }
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
      padding: 10px;
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
