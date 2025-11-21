<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface SidebarProps {
  class?: string
}

const props = defineProps<SidebarProps>()

const classes = computed(() =>
  cn(
    'flex h-full w-64 flex-col border-r border-zinc-200 bg-zinc-50 px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950 overflow-y-auto',
    props.class
  )
)
</script>

<template>
  <aside :class="classes">
    <slot />
  </aside>
</template>
