<script setup lang="ts">
import { DialogTitle as HeadlessDialogTitle } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface DialogTitleProps {
  class?: string
}

const props = defineProps<DialogTitleProps>()

const classes = computed(() => cn('text-lg/6 font-semibold text-zinc-950 sm:text-base/6 dark:text-white', props.class))
</script>

<template>
  <HeadlessDialogTitle :class="classes">
    <slot />
  </HeadlessDialogTitle>
</template>
