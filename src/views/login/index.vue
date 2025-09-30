<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useNotification } from "@/composables/useNotification"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"

// #region  通知
const notification = useNotification()

notification.initStarNotification()
notification.initAdminNotification()
// #endregion

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
</script>

<template>
  <div class="app-container">
    <div class="form-container" :class="{ active: isActive }">
      <!-- 登录表单 -->
      <Login class="form sign-in" />
      <!-- 注册表单 -->
      <Register class="form sign-up" />
      <!-- 切换功能 -->
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
.app-container {
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgb(216, 216, 216), rgb(177, 177, 255));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.form-container {
  position: relative;
  height: 480px;
  width: 780px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);

  .form {
    position: absolute;
    left: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in {
    z-index: 2;
    opacity: 1;
  }

  .sign-up {
    z-index: 1;
    opacity: 0;
  }

  .toggle-container {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #5c6bc0;
    border-radius: 150px 30px 30px 100px;
    overflow: hidden;
    z-index: 1000;
    transition: all 0.6s ease-in-out;

    .toggle {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #5c6bc0, #512da8);
      transform: translateX(0);
      transition: all 0.6s ease-in-out;

      .toggle-panel {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 30px;
        color: #fff;
        text-align: center;

        p {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.3px;
          margin: 20px 0;
        }

        button {
          background-color: transparent;
          color: #fff;
          font-size: 12px;
          padding: 10px 45px;
          border: 1px solid #fff;
          border-radius: 8px;
          font-weight: 600px;
          letter-spacing: 0.5px;
          margin-top: 10px;
          cursor: pointer;
          outline: none;
        }
      }

      .toggle-left {
        transform: translateX(-100%);
      }

      .toggle-right {
        transform: translateX(0);
      }
    }
  }
}

.form-container.active {
  .sign-in {
    transform: translateX(100%);
    opacity: 0;
    z-index: 1;
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 2;
  }

  .toggle-container {
    transform: translateX(-100%);
    border-radius: 30px 150px 100px 30px;
  }

  .toggle {
    transform: translateX(100%);
  }
}
</style>
