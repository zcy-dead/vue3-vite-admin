<script lang="ts" setup>
import type { RouteLocationNormalizedGeneric, RouterLink } from "vue-router"
import type { TagView } from "@/types/tagView"
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import ButtonAnimation from "@/components/ButtonAnimation/index.vue"
import { useRouteListener } from "@/composables/useRouteListener"
import Guding from "@/icons/Guding.vue"
import Lrarrow from "@/icons/Lrarrow.vue"
import { useTagsViewStore } from "@/pinia/stores/tagsview"

const route = useRoute()

const router = useRouter()

const tagsViewStore = useTagsViewStore()

const { listenerRouteChange } = useRouteListener()

/** 标签页组件元素的引用数组 */
const tagRefs = ref([])

/** 右键菜单的状态 */
const visible = ref(false)

/** 右键菜单的 top 位置 */
const top = ref(0)

/** 右键菜单的 left 位置 */
const left = ref(0)

/** 当前正在右键操作的标签页 */
const selectedTag = ref<TagView>({})

/** 判断标签页是否激活 */
function isActive(tag: TagView) {
  return tag.path === route.path
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
  router.replace({ path: `/redirect${view.path}`, query: view.query })
}

/** 处理刷新按钮点击事件 */
function handleRefresh() {
  // 找到当前激活的标签页
  const activeTag = tagsViewStore.visitedViews.find(tag => isActive(tag))
  if (activeTag) {
    refreshSelectedTag(activeTag)
  }
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
  tagsViewStore.affixedViews.forEach((tag) => {
    tagsViewStore.addVisitedView(tag)
    tagsViewStore.addCachedView(tag)
  })
}

/** 关闭所有标签页 */
function closeAllTags(view: TagView) {
  tagsViewStore.delAllVisitedViews()
  tagsViewStore.delAllCachedViews()
  tagsViewStore.affixedViews.forEach((tag) => {
    tagsViewStore.addVisitedView(tag)
    tagsViewStore.addCachedView(tag)
  })
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
      router.push({ path: `/redirect${view.path}`, query: view.query })
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

/** 切换标签页的固定状态 */
function toggleAffix(tag: TagView) {
  const isAffixed = tagsViewStore.affixedViews.some(v => v.path === tag.path)
  if (isAffixed) {
    // 如果已经固定，则取消固定
    tagsViewStore.delAffixedViews(tag)
  } else {
    // 如果未固定，则添加固定
    tagsViewStore.addAffixedViews(tag)
  }
}

watch(visible, (value) => {
  value ? document.body.addEventListener("click", closeMenu) : document.body.removeEventListener("click", closeMenu)
})

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
        @click.middle="!tagsViewStore.isAffixedViews(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span class="router-name">{{ tag.meta?.title }}</span>
        <el-icon v-if="!tagsViewStore.isAffixedViews(tag) " :size="12" @click.prevent.stop="closeSelectedTag(tag)" class="close-icon">
          <Close />
        </el-icon>
      </router-link>
    </div>
    <div>
      <ul v-show="visible" class="contextmenu-wrapper" :style="{ left: `${left}px`, top: `${top}px` }">
        <li @click="refreshSelectedTag(selectedTag)">
          <el-icon>
            <Refresh />
          </el-icon>
          刷新
        </li>
        <li @click="toggleAffix(selectedTag)">
          <el-icon>
            <Guding />
          </el-icon>
          {{ !tagsViewStore.isAffixedViews(selectedTag) ? '固定' : '取消固定' }}
        </li>
        <hr>
        <li v-if="!tagsViewStore.isAffixedViews(selectedTag) " @click="closeSelectedTag(selectedTag)">
          <el-icon>
            <Close />
          </el-icon>
          关闭
        </li>
        <li @click="closeOthersTags">
          <el-icon>
            <Lrarrow />
          </el-icon>
          关闭其它
        </li>
        <li @click="closeAllTags(selectedTag)">
          <el-icon>
            <CircleClose />
          </el-icon>
          关闭所有
        </li>
      </ul>
    </div>
    <div class="icon-wrapper">
      <ButtonAnimation animation="rotate">
        <el-icon @click="handleRefresh" :size="20">
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
  width: calc(100% - 40px);
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

.icon-wrapper {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: var(--layout-tagsview-tag-border);
}

.contextmenu-wrapper {
  width: 140px;
  z-index: 3000;
  position: fixed;
  padding: 5px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--layout-tagsview-contextmenu-text-color);
  background-color: var(--layout-tagsview-contextmenu-bg-color);
  border: var(--layout-tagsview-contextmenu-border);
  list-style-type: none;
  hr {
    margin: 10px 0;
    border: var(--layout-tagsview-contextmenu-border);
  }
  li {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    cursor: pointer;
    user-select: none;
    margin: 0px;
    .el-icon {
      font-size: 16px;
      margin-right: 8px;
    }
    &:hover {
      border-radius: 4px;
      background-color: var(--layout-tagsview-contextmenu-hover-bg-color);
    }
  }
}

.tagsview-wrapper {
  // 整个滚动条
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  // 滚动条上的滚动滑块
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #90939955;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #90939977;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: #90939999;
  }
  // 当同时有垂直滚动条和水平滚动条时交汇的部分
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>
