<script setup lang="ts">
import { MenuItems as HeadlessMenuItems, TransitionChild } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface DropdownMenuProps {
  anchor?: 'top' | 'bottom' | 'left' | 'right'
  class?: string
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  anchor: 'bottom',
})

const classes = computed(() =>
  cn(
    'absolute right-0 z-10 mt-2 w-48 origin-top-right',
    'rounded-xl p-1 shadow-lg',
    'bg-white ring-1 ring-zinc-950/10',
    'dark:bg-zinc-800 dark:ring-white/10',
    'transition duration-100 data-[leave]:duration-100 data-[leave]:ease-in data-[closed]:data-[leave]:opacity-0',
    'overflow-y-auto focus:outline-hidden',
    'flex flex-col',
    props.class
  )
)
</script>

<template>
  <TransitionChild
    as="template"
    enter="transition ease-out duration-100"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition ease-in duration-100"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <HeadlessMenuItems :class="classes">
      <slot />
    </HeadlessMenuItems>
  </TransitionChild>
</template>
