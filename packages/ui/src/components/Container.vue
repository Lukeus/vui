<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

/**
 * Container component for consistent content width layouts
 * @property {boolean} fluid - Remove max-width constraint for full-width layouts (default: false)
 * @property {string} maxWidth - Maximum width class (default: 'max-w-7xl')
 * @property {boolean} padded - Add horizontal padding (default: true)
 * @property {string} class - Additional CSS classes
 */
interface ContainerProps {
  fluid?: boolean
  maxWidth?: string
  padded?: boolean
  class?: string
}

const props = withDefaults(defineProps<ContainerProps>(), {
  fluid: false,
  maxWidth: 'max-w-7xl',
  padded: true,
})

const classes = computed(() =>
  cn('mx-auto w-full', !props.fluid && props.maxWidth, props.padded && 'px-4 sm:px-6 lg:px-8', props.class)
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
