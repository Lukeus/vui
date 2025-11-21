<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

type CardVariant = 'outlined' | 'elevated' | 'filled'

/**
 * Card component for grouping related content
 * @property {CardVariant} variant - Visual style variant (outlined, elevated, filled)
 * @property {boolean} interactive - Whether card is interactive (adds hover effects)
 * @property {string} class - Additional CSS classes
 */
interface CardProps {
  variant?: CardVariant
  interactive?: boolean
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'elevated',
  interactive: false,
})

const variants: Record<CardVariant, string> = {
  outlined: 'border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900',
  elevated: 'border border-zinc-200 bg-white shadow-raised dark:border-zinc-800 dark:bg-zinc-900',
  filled: 'bg-zinc-50 border-transparent dark:bg-zinc-800/50',
}

const classes = computed(() =>
  cn(
    'rounded-lg p-6 transition-all duration-200 ease-out',
    variants[props.variant],
    props.interactive && 'cursor-pointer hover:-translate-y-1 hover:shadow-floating',
    props.class
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
