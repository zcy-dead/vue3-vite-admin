<script lang="ts" setup>
import { ElMessage } from "element-plus"
import screenfull from "screenfull"
import { computed, onWatcherCleanup, ref, watchEffect } from "vue"
import ButtonAnimation from "@/components/ButtonAnimation/index.vue"
import Fullscreen from "@/icons/Fullscreen.vue"
import LargeContent from "@/icons/LargeContent.vue"
import SmallContent from "@/icons/SmallContent.vue"
import Smallscreen from "@/icons/Smallscreen.vue"

interface ScreenFull {
  /** 全屏的元素，默认是 html */
  element?: string
  /** 打开全屏提示语 */
  openTips?: string
  /** 关闭全屏提示语 */
  exitTips?: string
  /** 是否只针对内容区 */
  isfull?: boolean
}

const {
  element = "html",
  openTips = "全屏",
  exitTips = "退出全屏"
} = defineProps<ScreenFull>()

const CONTENT_LARGE = "content-large"

const CONTENT_FULL = "content-full"

const classList = document.body.classList

// #region 全屏
const isEnabled = screenfull.isEnabled

const isFullscreen = ref<boolean>(false)

const fullscreenTips = computed(() => (isFullscreen.value ? exitTips : openTips))

const fullscreenIconName = computed(() => (isFullscreen.value ? Smallscreen : Fullscreen))

function handleFullscreenClick() {
  const dom = document.querySelector(element) || undefined
  isEnabled ? screenfull.toggle(dom) : ElMessage.warning("您的浏览器无法工作")
}

function handleFullscreenChange() {
  isFullscreen.value = screenfull.isFullscreen
  isFullscreen.value || classList.remove(CONTENT_LARGE, CONTENT_FULL)
}

watchEffect(() => {
  if (isEnabled) {
    // 挂载组件时自动执行
    screenfull.on("change", handleFullscreenChange)
    // 卸载组件时自动执行
    onWatcherCleanup(() => {
      screenfull.off("change", handleFullscreenChange)
    })
  }
})
// #endregion

// #region 工作区
const isContentLarge = ref<boolean>(false)

const contentLargeTips = computed(() => (isContentLarge.value ? "工作区复原" : "工作区放大"))

const contentLargeIconName = computed(() =>
  isContentLarge.value ? SmallContent : LargeContent
)

function handleContentLargeClick() {
  isContentLarge.value = !isContentLarge.value
  // 内容区放大时，将不需要的组件隐藏
  classList.toggle(CONTENT_LARGE, isContentLarge.value)
}

function handleContentFullClick() {
  // 取消内容区放大
  isContentLarge.value && handleContentLargeClick()
  // 内容区全屏时，将不需要的组件隐藏
  classList.add(CONTENT_FULL)
  // 开启全屏
  handleFullscreenClick()
}
// #endregion
</script>

<template>
  <div>
    <!-- 全屏 -->
    <el-tooltip v-if="isfull" effect="dark" placement="bottom" :content="fullscreenTips">
      <ButtonAnimation animation="beat" @click="handleFullscreenClick">
        <el-icon :size="18">
          <component :is="fullscreenIconName" />
        </el-icon>
      </ButtonAnimation>
    </el-tooltip>
    <!-- 放大 -->
    <el-dropdown
      v-else
      popper-class="custom-dropdown-popper"
      trigger="click"
      :disabled="isFullscreen"
    >
      <div>
        <el-tooltip content="放大" effect="dark" placement="bottom">
          <ButtonAnimation animation="beat">
            <el-icon :size="18">
              <component :is="contentLargeIconName" />
            </el-icon>
          </ButtonAnimation>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 工作区放大/工作区复原 -->
          <el-dropdown-item @click="handleContentLargeClick">
            {{ contentLargeTips }}
          </el-dropdown-item>
          <!-- 工作区全屏 -->
          <el-dropdown-item @click="handleContentFullClick">
            工作区全屏
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
