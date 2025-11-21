<script setup lang="ts">
import { Tab as HeadlessTab } from '@headlessui/vue'
import { cn } from '../utils/classes'

interface TabProps {
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<TabProps>(), {
  disabled: false,
  class: '',
})
</script>

<template>
  <HeadlessTab v-slot="{ selected }" :disabled="disabled" as="template">
    <button
      :class="
        cn(
          'w-full rounded-lg px-3 py-2.5 text-sm leading-5 font-medium',
          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
          selected
            ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-white'
            : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
          props.disabled && 'cursor-not-allowed opacity-50',
          props.class
        )
      "
    >
      <slot />
    </button>
  </HeadlessTab>
</template>
