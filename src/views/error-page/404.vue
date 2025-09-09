<script setup lang="ts">
import type { ErrorPageProps } from "@/types/errorPageProps"
import { ref } from "vue"
import ErrorPage from "./index.vue"

const errorData = ref<ErrorPageProps>({
  code: 404,
  content: "Page Not Found"
})
</script>

<template>
  <ErrorPage :code="errorData.code" :content="errorData.content" />
</template>
