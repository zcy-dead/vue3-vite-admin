<script lang="ts" setup>
import ButtonAnimation from "@/components/ButtonAnimation/index.vue"
import { useThemeStore } from "@/pinia/stores/theme"
import { ThemeType } from "@/types/theme"

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <el-dropdown trigger="click" popper-class="custom-dropdown-popper">
      <div>
        <el-tooltip content="主题模式" effect="dark">
          <ButtonAnimation animation="beat">
            <el-icon :size="20">
              <component :is="themeStore.activeThemeType === ThemeType.Light ? 'Sunny' : 'Moon'" />
            </el-icon>
          </ButtonAnimation>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(theme, index) in themeStore.themeList"
            :key="index"
            :disabled="themeStore.activeThemeType === theme.type"
            @click="() => themeStore.setThemeType(theme.type)"
          >
            <el-icon>
              <component :is="theme.icon" />
            </el-icon>
            <span>{{ theme.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
