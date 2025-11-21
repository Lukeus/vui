<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TextProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  as: 'p',
})

const classes = computed(() => cn('text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400', props.class))
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
