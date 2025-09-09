<script lang="ts" setup>
import type { RouteLocationNormalizedGeneric, RouteRecordRaw, RouterLink } from "vue-router"
import type { TagView } from "@/types/tagView"
import { Close } from "@element-plus/icons-vue"
import path from "path-browserify"
import { ref, useTemplateRef, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import ButtonAnimation from "@/components/ButtonAnimation/index.vue"
import { useRouteListener } from "@/composables/useRouteListener"
import { usePermissionStore } from "@/pinia/stores/permission"
import { useTagsViewStore } from "@/pinia/stores/tagsview"

const router = useRouter()

const route = useRoute()

const tagsViewStore = useTagsViewStore()

const permissionStore = usePermissionStore()

const { listenerRouteChange } = useRouteListener()

/** 标签页组件元素的引用数组 */
const tagRefs = useTemplateRef<InstanceType<typeof RouterLink>[]>("tagRefs")

/** 右键菜单的状态 */
const visible = ref(false)

/** 右键菜单的 top 位置 */
const top = ref(0)

/** 右键菜单的 left 位置 */
const left = ref(0)

/** 当前正在右键操作的标签页 */
const selectedTag = ref<TagView>({})

/** 固定的标签页 */
let affixTags: TagView[] = []

/** 判断标签页是否激活 */
function isActive(tag: TagView) {
  return tag.path === route.path
}

/** 判断标签页是否固定 */
function isAffix(tag: TagView) {
  return tag.meta?.affix
}

/** 筛选出固定标签页 */
function filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
  const tags: TagView[] = []
  routes.forEach((route) => {
    if (isAffix(route)) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      tags.push(...childTags)
    }
  })
  return tags
}

/** 初始化标签页 */
function initTags() {
  affixTags = filterAffixTags(permissionStore.allRoutes)
  for (const tag of affixTags) {
    tag.name && tagsViewStore.addVisitedView(tag)
  }
}

/** 添加标签页 */
function addTags(route: RouteLocationNormalizedGeneric) {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
}

/** 刷新选中的标签页 */
function refreshSelectedTag(view: TagView) {
  tagsViewStore.delCachedView(view)
  router.replace({ path: `${view.path}`, query: view.query })
}

/** 关闭选中的标签页 */
function closeSelectedTag(view: TagView) {
  tagsViewStore.delVisitedView(view)
  tagsViewStore.delCachedView(view)
  isActive(view) && toLastView(tagsViewStore.visitedViews, view)
}

/** 关闭其他标签页 */
function closeOthersTags() {
  const fullPath = selectedTag.value.fullPath
  if (fullPath !== route.path && fullPath !== undefined) {
    router.push(fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
  tagsViewStore.delOthersCachedViews(selectedTag.value)
}

/** 关闭所有标签页 */
function closeAllTags(view: TagView) {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  if (affixTags.some(tag => tag.path === route.path)) return
  toLastView(tagsViewStore.visitedViews, view)
}

/** 跳转到最后一个标签页 */
function toLastView(visitedViews: TagView[], view: TagView) {
  const latestView = visitedViews.slice(-1)[0]
  const fullPath = latestView?.fullPath
  if (fullPath !== undefined) {
    router.push(fullPath)
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === "Dashboard") {
      // 重新加载主页
      router.push({ path: `${view.path}`, query: view.query })
    } else {
      router.push("/")
    }
  }
}

/** 打开右键菜单面板 */
function openMenu(tag: TagView, e: MouseEvent) {
  const menuMinWidth = 100
  // 当前页面宽度
  const offsetWidth = document.body.offsetWidth
  // 面板的最大左边距
  const maxLeft = offsetWidth - menuMinWidth
  // 面板距离鼠标指针的距离
  const left15 = e.clientX + 10
  left.value = left15 > maxLeft ? maxLeft : left15
  top.value = e.clientY
  // 显示面板
  visible.value = true
  // 更新当前正在右键操作的标签页
  selectedTag.value = tag
}

/** 关闭右键菜单面板 */
function closeMenu() {
  visible.value = false
}

watch(visible, (value) => {
  value ? document.body.addEventListener("click", closeMenu) : document.body.removeEventListener("click", closeMenu)
})

initTags()

// 监听路由变化
listenerRouteChange((route) => {
  addTags(route)
}, true)
</script>

<template>
  <div class="tagsview-container">
    <div class="tagsview-wrapper">
      <router-link
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        ref="tagRefs"
        :class="{ active: isActive(tag) }"
        class="tagsview-item"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span class="router-name">{{ tag.meta?.title }}</span>
        <el-icon v-if="!isAffix(tag)" :size="12" @click.prevent.stop="closeSelectedTag(tag)" class="close-icon">
          <Close />
        </el-icon>
      </router-link>
    </div>
    <ul v-show="visible" class="contextmenu-wrapper" :style="{ left: `${left}px`, top: `${top}px` }">
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其它
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭所有
      </li>
    </ul>
    <div class="icon-wrapper">
      <ButtonAnimation animation="rotate">
        <el-icon>
          <Refresh />
        </el-icon>
      </ButtonAnimation>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: var(--active-text-color);
  }
}

.tagsview-container {
  height: var(--layout-tagsview-height);
  width: 100%;
  overflow: hidden;
  display: flex;
}

.tagsview-wrapper {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  .tagsview-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    height: var(--layout-tagsview-height);
    line-height: var(--layout-tagsview-height);
    padding: 0 20px;
    color: var(--layout-tagsview-tag-text-color);
    border-right: var(--layout-tagsview-tag-border);
    background-color: var(--layout-tagsview-tag-bg-color);
    .router-name {
      font-size: 12px;
      transition: transform 0.3s ease;
      transform: translateX(0);
    }
    .close-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      cursor: pointer;
      transition:
        opacity 0.3s ease,
        color 0.3s ease,
        background-color 0.3s ease;
      &:hover {
        display: flex;
        color: #ff4d4f;
        border-radius: 50%;
      }
    }
    &:hover {
      background-color: var(--layout-tagsview-tag-hover-bg-color);
      .router-name {
        transform: translateX(-10px);
      }
      .close-icon {
        opacity: 1;
      }
    }
    &.active {
      @extend %tip-line;
      background-color: var(--layout-tagsview-tag-active-bg-color);
      color: var(--layout-tagsview-tag-active-text-color, var(--layout-tagsview-tag-text-color));
    }
  }
}

.contextmenu-wrapper {
  margin: 0;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  color: var(--layout-tagsview-contextmenu-text-color);
  background-color: var(--layout-tagsview-contextmenu-bg-color);
  box-shadow: var(--layout-tagsview-contextmenu-box-shadow);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      color: var(--layout-tagsview-contextmenu-hover-text-color);
      background-color: var(--layout-tagsview-contextmenu-hover-bg-color);
    }
  }
}

.icon-wrapper {
  height: var(--layout-tagsview-height);
  width: var(--layout-tagsview-height);
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: var(--layout-tagsview-tag-border);
}
</style>
