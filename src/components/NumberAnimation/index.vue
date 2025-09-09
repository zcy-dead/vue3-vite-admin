<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"

/**
 * @type startVal: 动画开始的值，默认为 0
 * @type endVal: 动画结束的值，必须提供
 * @type duration: 动画持续时间，单位为毫秒，默认为 2000
 * @type autoPlay: 是否自动播放动画，默认为 true
 * @type decimalPlaces: 数字的小数位数，默认为 0
 * @type separator: 数字的千位分隔符，默认为逗号（","）
 * @type easing: 动画的缓动函数，可以是预定义的类型（"linear", "easeIn", "easeOut", "easeInOut"）或自定义的 EasingFunction，默认为 "easeOut"
 */
interface NumberAnimationProps {
  startVal?: number
  endVal: number
  duration?: number
  autoPlay?: boolean
  decimalPlaces?: number
  separator?: string
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut" | EasingFunction
}

const props = withDefaults(defineProps<NumberAnimationProps>(), {
  startVal: 0,
  duration: 2000,
  autoPlay: true,
  decimalPlaces: 0,
  separator: ",",
  easing: "easeOut"
})

/** 定义事件发射器，用于触发自定义事件 */
const emit = defineEmits(["update:startVal"])

/** 创建缓动函数对象类型 */
type EasingFunction = (t: number) => number

const easingFunctions: Record<string, EasingFunction> = {
  linear: t => t,
  easeIn: t => t * t,
  easeOut: t => t * (2 - t),
  easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

const currentNumber = ref(props.startVal)
const localStartVal = ref(props.startVal)
const progress = ref(0)
let animationFrameId: number | null = null
let startTime: number = 0

/** 格式化当前数字：在整数部分添加千位分隔符，小数位数为指定位数 */
const formattedNumber = computed(() => {
  // 将当前数字格式化为指定的小数位数
  const num = currentNumber.value.toFixed(props.decimalPlaces)
  // 将数字拆分为整数部分和小数部分
  const parts = num.split(".")
  // 在整数部分添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
  // 重新组合整数部分和小数部分
  return parts.join(".")
})

/** 动画函数，使用 requestAnimationFrame 实现动画效果 */
function animate(time: number) {
  // 如果是第一次调用，记录开始时间
  if (!startTime) startTime = time
  // 计算经过的时间
  const elapsedTime = time - startTime
  // 计算动画的进度，最大为 1
  progress.value = Math.min(elapsedTime / props.duration, 1)

  // 根据缓动函数计算缓动后的进度
  const easedProgress = typeof props.easing === "string"
    ? easingFunctions[props.easing](progress.value)
    : props.easing(progress.value)

  // 根据缓动后的进度计算当前数字
  currentNumber.value = localStartVal.value + (props.endVal - localStartVal.value) * easedProgress

  // 如果动画还没有完成，继续请求下一帧
  if (progress.value < 1) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

/** 开始动画的函数 */
function startAnimation() {
  // 如果已经有动画在进行，取消之前的动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  // 重置开始时间和进度
  startTime = 0
  progress.value = 0
  // 请求第一帧动画
  animationFrameId = requestAnimationFrame(animate)
}

/** 在组件挂载后，如果 autoPlay 为 true，则自动开始动画 */
onMounted(() => {
  if (props.autoPlay) startAnimation()
})

/** 在组件卸载前，取消任何正在进行的动画 */
onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

/** 监听 endVal 的变化，当 endVal 发生变化时，更新动画 */
watch(() => props.endVal, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    localStartVal.value = oldVal
    emit("update:startVal", oldVal)
    startAnimation()
  }
})
</script>

<template>
  <span>{{ formattedNumber }}</span>
</template>
