<script setup lang="ts">
import type { ErrorPageProps } from "@/types/errorPageProps"
import { ref } from "vue"
import ErrorPage from "./index.vue"

const errorData = ref<ErrorPageProps>({
  code: 500,
  content: "服务器内部错误"
})
</script>

<template>
  <ErrorPage :code="errorData.code" :content="errorData.content" />
</template>
