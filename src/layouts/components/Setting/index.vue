<script setup>
import { ref } from "vue"
import Settings from "@/layouts/components/Setting/Settings.vue"

const show = ref(false)

function toggleDrawer() {
  show.value = !show.value
}
</script>

<template>
  <div class="rightpanel-container">
    <div class="arrow">
      <el-icon v-if="!show" :size="32">
        <ArrowLeft />
      </el-icon>
    </div>
    <div class="setting" @click="toggleDrawer">
      <el-icon :size="24" class="icon">
        <Setting />
      </el-icon>
    </div>
  </div>

  <el-drawer v-model="show" size="300px" :with-header="false" class="custom-drawer-bg">
    <Settings />
  </el-drawer>
</template>

<style lang="scss" scoped>
.rightpanel-container {
  position: fixed;
  top: 45%;
  right: -50px;
  z-index: 2000;
  display: flex;
  align-items: center;
  transition: right 0.3s ease;
  .arrow {
    cursor: pointer;
    color: var(--layout-rightpanel-bg-color);
  }
  .setting {
    width: 50px;
    height: 50px;
    background-color: var(--layout-rightpanel-bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 0 0 6px;
    .icon {
      cursor: pointer;
      color: var(--layout-setting-text-color);
    }
  }
  &:hover {
    right: 0px;
  }
}
</style>

<style>
.el-drawer.custom-drawer-bg .el-drawer__body {
  background-color: var(--layout-setting-bg-color);
  overflow: auto;
}
</style>
