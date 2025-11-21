<script setup lang="ts">
import { TabList as HeadlessTabList } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TabListProps {
  class?: string
}

const props = withDefaults(defineProps<TabListProps>(), {
  class: '',
})

const listClass = computed(() => cn('flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800', props.class))
</script>

<template>
  <HeadlessTabList :class="listClass">
    <slot />
  </HeadlessTabList>
</template>
