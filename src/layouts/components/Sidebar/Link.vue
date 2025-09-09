<script lang="ts" setup>
import { isExternal } from "@/utils/validate"

interface Props {
  to: string
}

const { to } = defineProps<Props>()
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>
