<script setup lang="ts">
import { useSidebarStore } from "@/pinia/stores/sidebar"

const sidebarStore = useSidebarStore()
</script>

<template>
  <div @click="sidebarStore.toggleSidebar()">
    <el-icon :size="20" class="icon">
      <Fold v-if="sidebarStore.isOpen" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  color: var(--layout-navigationbar-text-color);
}
</style>
