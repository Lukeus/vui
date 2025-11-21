<script setup lang="ts">
import { MenuButton as HeadlessMenuButton } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface DropdownButtonProps {
  class?: string
}

const props = defineProps<DropdownButtonProps>()

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-x-1.5 text-sm/6 font-semibold',
    'focus:outline-hidden data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    props.class
  )
)
</script>

<template>
  <HeadlessMenuButton :class="classes">
    <slot />
  </HeadlessMenuButton>
</template>
