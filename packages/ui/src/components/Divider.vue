<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface DividerProps {
  class?: string
}

const props = defineProps<DividerProps>()

const classes = computed(() => cn('my-6 h-px border-0 bg-zinc-200 dark:bg-zinc-800', props.class))
</script>

<template>
  <hr :class="classes" />
</template>
