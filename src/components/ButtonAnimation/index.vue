<script lang="ts" setup>
import { ref } from "vue"

type Animation = "beat" | "rotate" | "shake"

/**
 * @type duration:动画持续时间,默认为 600 毫秒
 * @type animation:动画类型,默认为 beat
 */
interface ButtonProps {
  duration?: number
  animation?: Animation | boolean
}

const { duration = 600, animation = "beat" } = defineProps<ButtonProps>()

/** 用于控制动画是否正在播放 */
const isAnimating = ref(false)

/** 如果动画正在播放，则不执行任何操作；否则，设置 isAnimating 为 true，并在 duration 指定的时间后将其设置为 false。 */
function onButtonClicked() {
  if (isAnimating.value) return

  isAnimating.value = true

  setTimeout(() => {
    isAnimating.value = false
  }, duration)
}
</script>

<template>
  <div
    class="custom-button"
    @click="onButtonClicked"
  >
    <div
      :class="{
        'animate-beat': isAnimating && animation === 'beat',
        'animate-rotate': isAnimating && animation === 'rotate',
        'animate-shake': isAnimating && animation === 'shake',
      }"
      :style="{
        '--duration': `${duration}ms`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.custom-button {
  border: none;
  color: var(--text-color-primary);
  background-color: var(--bg-color-primary);
  padding: 10px 10px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.custom-button:hover {
  background-color: var(--hover-bg-color);
}

.animate-beat {
  animation: beat var(--duration) ease-in-out;
}

@keyframes beat {
  0%,
  50%,
  100% {
    scale: 1;
  }
  25% {
    scale: 1.1;
  }
  75% {
    scale: 1.2;
  }
}

.animate-rotate {
  animation: rotate var(--duration) ease-in-out;
}

@keyframes rotate {
  0% {
    rotate: 0;
  }
  100% {
    rotate: 360deg;
  }
}

.animate-shake {
  animation: shake var(--duration) ease-in-out;
}

@keyframes shake {
  10%,
  90% {
    translate: -1px;
  }
  20%,
  80% {
    translate: 2px;
  }
  30%,
  50%,
  70% {
    translate: -3px;
  }
  40%,
  60% {
    translate: 3px;
  }
}
</style>
