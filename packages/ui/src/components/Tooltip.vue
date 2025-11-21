<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

/**
 * Tooltip component for displaying contextual information
 * @property {string} content - Tooltip content text
 * @property {TooltipPlacement} placement - Tooltip position relative to trigger
 * @property {number} delay - Delay in ms before showing tooltip
 * @property {boolean} disabled - Whether tooltip is disabled
 * @property {string} class - Additional CSS classes for tooltip content
 */
interface TooltipProps {
  content?: string
  placement?: TooltipPlacement
  delay?: number
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  delay: 200,
  disabled: false,
})

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
}

const panelClasses = computed(() =>
  cn(
    'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-zinc-900 rounded-md shadow-lg dark:bg-zinc-700',
    'whitespace-nowrap',
    placementClasses[props.placement],
    props.class
  )
)

const arrowClass = computed(() =>
  cn('absolute size-0 border-4 border-zinc-900 dark:border-zinc-700', arrowClasses[props.placement])
)
</script>

<template>
  <Popover v-if="!disabled" v-slot="{ open }" class="relative inline-block">
    <PopoverButton
      as="div"
      class="inline-block cursor-default focus:outline-hidden"
      @mouseenter="() => {}"
      @mouseleave="() => {}"
    >
      <slot />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <PopoverPanel v-if="open" :class="panelClasses" role="tooltip">
        <div :class="arrowClass" />
        <slot name="content">
          {{ content }}
        </slot>
      </PopoverPanel>
    </transition>
  </Popover>
  <div v-else class="inline-block">
    <slot />
  </div>
</template>
