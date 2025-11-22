<script setup lang="ts">
import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { cn } from '../utils/classes'

type DrawerPosition = 'left' | 'right'
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Drawer component for slide-out panels
 * @property {boolean} open - Controls drawer visibility
 * @property {DrawerPosition} position - Slide from left or right
 * @property {DrawerSize} size - Width of the drawer
 * @property {boolean} showClose - Show close button in header
 * @property {string} class - Additional CSS classes
 */
interface DrawerProps {
  open: boolean
  position?: DrawerPosition
  size?: DrawerSize
  showClose?: boolean
  class?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  position: 'right',
  size: 'md',
  showClose: true,
})

const emit = defineEmits<{
  close: []
}>()

const sizes: Record<DrawerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
}

const panelClasses = computed(() =>
  cn(
    'relative flex h-full w-screen flex-col bg-white shadow-xl dark:bg-zinc-900',
    sizes[props.size],
    props.class
  )
)

const slideTransition = computed(() => {
  if (props.position === 'left') {
    return {
      enter: 'transform transition ease-in-out duration-300',
      enterFrom: '-translate-x-full',
      enterTo: 'translate-x-0',
      leave: 'transform transition ease-in-out duration-300',
      leaveFrom: 'translate-x-0',
      leaveTo: '-translate-x-full',
    }
  }
  return {
    enter: 'transform transition ease-in-out duration-300',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-300',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
  }
})
</script>

<template>
  <TransitionRoot :show="open" as="template">
    <HeadlessDialog @close="emit('close')">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50" />
      </TransitionChild>

      <!-- Drawer Panel -->
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            :class="[
              'pointer-events-none fixed inset-y-0 flex max-w-full',
              position === 'left' ? 'left-0 pr-10' : 'right-0 pl-10',
            ]"
          >
            <TransitionChild
              as="template"
              v-bind="slideTransition"
            >
              <HeadlessDialogPanel :class="panelClasses" class="pointer-events-auto">
                <!-- Close button (optional) -->
                <div v-if="$slots.header || showClose" class="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-white/10">
                  <div class="flex-1">
                    <slot name="header" />
                  </div>
                  <button
                    v-if="showClose"
                    type="button"
                    class="rounded-md text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:outline-hidden dark:hover:text-zinc-300"
                    @click="emit('close')"
                  >
                    <span class="sr-only">Close drawer</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto px-6 py-6">
                  <slot />
                </div>

                <!-- Footer (optional) -->
                <div v-if="$slots.footer" class="border-t border-zinc-200 px-6 py-4 dark:border-white/10">
                  <slot name="footer" />
                </div>
              </HeadlessDialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
</template>
