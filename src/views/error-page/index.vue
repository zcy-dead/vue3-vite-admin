<script setup lang="ts">
import type { ErrorPageProps } from "@/types/errorPageProps"
import NumberAnimation from "@/components/NumberAnimation/index.vue"
import router from "@/router"

const props = defineProps<ErrorPageProps>()

function BackHome() {
  router.replace("/login")
}
</script>

<template>
  <div class="container">
    <div class="error-page-container">
      <span class="code">
        <NumberAnimation :end-val="props.code" :duration="800" easing="easeOut" :decimal-places="0" separator="" />
      </span>
      <hr>
      <span class="content">{{ props.content }}</span>
      <button @click="BackHome">
        回到首页
      </button>
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

.error-page-container {
  height: 80%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .code {
    font-size: 100px;
    line-height: 100px;
    font-weight: bold;
    font-style: italic;
    letter-spacing: 1x;
    margin: 50px;
  }

  hr {
    width: 70%;
    border: 1px solid black;
    margin: 20px;
  }

  .content {
    font-size: 48px;
    line-height: 50px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: 1x;
    margin: 50px;
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
    cursor: pointer;
    outline: none;
    margin: 100px;
  }
}
</style>
