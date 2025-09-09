<script setup lang="ts">
import { useActiveColor } from "@/composables/useActiveColor"
import { useThemeStore } from "@/pinia/stores/theme"

const themeStore = useThemeStore()
const activeColor = useActiveColor()

themeStore.initTheme()
activeColor.initTheme()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
