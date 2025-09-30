<script lang="ts" setup>
import { ref } from "vue"

import { useActiveColor } from "@/composables/useActiveColor"

const { activeColor } = useActiveColor()

const predefineColors = ref([
  "#FF0000",
  "#FFA500",
  "#FFFF00",
  "#008000",
  "#00FFFF",
  "#0000FF",
  "#800080"
])
</script>

<template>
  <div class="color-container">
    <span class="title">布局颜色：</span>
    <el-color-picker v-model="activeColor" show-alpha :predefine="predefineColors" />
  </div>
</template>

<style lang="scss" scoped>
.color-container {
  .title {
    color: var(--layout-setting-text-color);
  }
}
</style>
