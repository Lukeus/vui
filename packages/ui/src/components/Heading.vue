<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  class?: string
}

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 1,
})

const component = computed(() => `h${props.level}`)

const classes = computed(() =>
  cn(
    'font-semibold text-zinc-950 dark:text-white',
    props.level === 1 && 'text-2xl/8 sm:text-xl/8',
    props.level === 2 && 'text-xl/7 sm:text-lg/7',
    props.level === 3 && 'text-lg/7 sm:text-base/7',
    props.level === 4 && 'text-base/7 sm:text-sm/6',
    props.level === 5 && 'text-sm/6',
    props.level === 6 && 'text-xs/6',
    props.class
  )
)
</script>

<template>
  <component :is="component" :class="classes">
    <slot />
  </component>
</template>
