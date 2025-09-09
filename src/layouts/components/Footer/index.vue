<script setup lang="ts">
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <footer class="layout-footer">
    {{ VITE_APP_TITLE }} &nbsp;&nbsp;&nbsp;-- 2103658389@qq.com
  </footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: var(--layout-footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--layout-footer-text-color);
  background-color: var(--layout-footer-bg-color);
}
</style>
