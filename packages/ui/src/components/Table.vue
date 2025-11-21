<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

/**
 * Table component for displaying tabular data
 * @property {string} caption - Accessible caption for the table
 * @property {string} class - Additional CSS classes
 */
interface TableProps {
  caption?: string
  class?: string
}

const props = defineProps<TableProps>()

const classes = computed(() =>
  cn('min-w-full divide-y divide-zinc-200 text-left text-sm dark:divide-zinc-800', props.class)
)
</script>

<template>
  <table role="table" :class="classes">
    <caption v-if="caption" class="sr-only">
      {{
        caption
      }}
    </caption>
    <slot />
  </table>
</template>
