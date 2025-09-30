<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router"
import path from "path-browserify"
import { computed } from "vue"
import { isExternal } from "@/utils/validate.ts"
import Link from "./Link.vue"

interface Props {
  item: RouteRecordRaw
  basePath?: string
}

const { item, basePath = "" } = defineProps<Props>()

/** 需要显示的根菜单（alwaysShow） */
const alwaysShowRootMenu = computed(() => item.meta?.alwaysShow)

/** 需要显示的子菜单（hidden） */
const showingChildren = computed(() => item.children?.filter(child => !child.meta?.hidden) ?? [])

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => showingChildren.value.length)

const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...item, path: "" }
  }
})

function resolvePath(routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(basePath):
      return basePath
    default:
      return path.resolve(basePath, routePath)
  }
}
</script>

<template>
  <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
    <Link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <el-icon>
          <component v-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
        </el-icon>
        <template v-if="theOnlyOneChild.meta.title" #title>
          <span>{{ theOnlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </Link>
  </template>
  <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
    <template #title>
      <el-icon>
        <component v-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
      </el-icon>
      <span v-if="item.meta?.title" class="title">{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children">
      <Menus v-for="child in showingChildren" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
    </template>
  </el-sub-menu>
</template>

<style lang="scss" scoped>
.el-icon {
  width: 1em !important;
  margin-right: 12px !important;
  font-size: 18px;
}
</style>
