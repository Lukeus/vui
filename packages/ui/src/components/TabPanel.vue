<script setup lang="ts">
import { TabPanel as HeadlessTabPanel } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TabPanelProps {
  class?: string
}

const props = withDefaults(defineProps<TabPanelProps>(), {
  class: '',
})

const panelClass = computed(() =>
  cn(
    'rounded-xl bg-white p-3 dark:bg-gray-800',
    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
    props.class
  )
)
</script>

<template>
  <HeadlessTabPanel :class="panelClass">
    <slot />
  </HeadlessTabPanel>
</template>
