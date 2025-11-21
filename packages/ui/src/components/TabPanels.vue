<script setup lang="ts">
import { TabPanels as HeadlessTabPanels } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TabPanelsProps {
  class?: string
}

const props = withDefaults(defineProps<TabPanelsProps>(), {
  class: '',
})

const panelsClass = computed(() => cn('mt-2', props.class))
</script>

<template>
  <HeadlessTabPanels :class="panelsClass">
    <slot />
  </HeadlessTabPanels>
</template>
