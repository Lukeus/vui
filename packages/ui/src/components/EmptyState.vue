<script setup lang="ts">
import { computed, type Component } from 'vue'
import { cn } from '../utils/classes'

interface EmptyStateProps {
  icon?: Component
  title: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  class: '',
})

const containerClass = computed(() => cn('text-center py-12', props.class))
</script>

<template>
  <div :class="containerClass">
    <slot name="icon">
      <component v-if="icon" :is="icon" class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" aria-hidden="true" />
    </slot>

    <h3 class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
      {{ title }}
    </h3>

    <p v-if="description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ description }}
    </p>

    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>
  </div>
</template>
