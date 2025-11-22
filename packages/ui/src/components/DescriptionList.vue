<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

type DescriptionListLayout = 'vertical' | 'horizontal' | 'grid'

/**
 * DescriptionList component for displaying key-value pairs
 * @property {DescriptionListLayout} layout - Layout style (vertical, horizontal, grid)
 * @property {boolean} divider - Show divider between items
 * @property {string} class - Additional CSS classes
 */
interface DescriptionListProps {
  layout?: DescriptionListLayout
  divider?: boolean
  class?: string
}

const props = withDefaults(defineProps<DescriptionListProps>(), {
  layout: 'vertical',
  divider: false,
})

const listClasses = computed(() => {
  const layouts = {
    vertical: 'space-y-4',
    horizontal: 'sm:grid sm:grid-cols-3 sm:gap-4',
    grid: 'grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2',
  }

  return cn(
    layouts[props.layout],
    props.divider && 'divide-y divide-zinc-200 dark:divide-zinc-800',
    props.class
  )
})

const itemClasses = computed(() => {
  if (props.layout === 'horizontal') {
    return props.divider ? 'py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3' : ''
  }
  return props.divider ? 'py-4' : ''
})
</script>

<template>
  <dl :class="listClasses">
    <slot name="default" :item-classes="itemClasses" />
  </dl>
</template>
