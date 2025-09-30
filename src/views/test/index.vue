<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import { useTagsViewStore } from "@/pinia/stores/tagsview"

defineOptions({
  name: "Ou"
})

const tagsViewStore = useTagsViewStore()
// 定义一个响应式变量
const inputValue = ref<string>("") // 初始值为空字符串

onMounted(() => {
  console.log("挂载")
  console.log(tagsViewStore.cachedViews)
})

onUnmounted(() => {
  console.log("卸载")
})
</script>

<template>
  <div>
    <input v-model="inputValue" placeholder="请输入内容">
    <p>输入的内容是：{{ inputValue }}</p>
  </div>
</template>
