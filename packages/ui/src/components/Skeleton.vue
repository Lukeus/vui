<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

type SkeletonVariant = 'text' | 'card' | 'avatar' | 'button' | 'circle' | 'rectangle'

/**
 * Skeleton component for loading states
 * @property {SkeletonVariant} variant - Visual variant (text, card, avatar, button, circle, rectangle)
 * @property {number} lines - Number of text lines to show (only for text variant)
 * @property {string} width - Custom width (CSS value)
 * @property {string} height - Custom height (CSS value)
 * @property {boolean} animate - Whether to show pulse animation
 * @property {string} class - Additional CSS classes
 */
interface SkeletonProps {
  variant?: SkeletonVariant
  lines?: number
  width?: string
  height?: string
  animate?: boolean
  class?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  lines: 1,
  animate: true,
})

const baseClasses = computed(() => cn('bg-zinc-200 dark:bg-zinc-800', props.animate && 'animate-pulse', props.class))

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded',
  card: 'h-48 rounded-lg',
  avatar: 'size-12 rounded-full',
  button: 'h-10 rounded-md',
  circle: 'rounded-full',
  rectangle: 'rounded-md',
}

const classes = computed(() => cn(baseClasses.value, variantClasses[props.variant]))

const style = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
  ...(props.height ? { height: props.height } : {}),
}))
</script>

<template>
  <div v-if="variant === 'text' && lines > 1" class="space-y-2" role="status" aria-busy="true" aria-label="Loading">
    <div v-for="(_, index) in lines" :key="index" :class="cn(classes, index === lines - 1 && 'w-4/5')" :style="style" />
  </div>
  <div v-else :class="classes" :style="style" role="status" aria-busy="true" aria-label="Loading" />
</template>
