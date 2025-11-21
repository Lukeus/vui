<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import { cn } from '../utils/classes'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'
type AlertSize = 'sm' | 'md' | 'lg'

/**
 * Alert component for displaying important messages and notifications
 * @property {AlertVariant} variant - Visual style variant (info, success, warning, error)
 * @property {AlertSize} size - Size variant (sm, md, lg)
 * @property {boolean} dismissible - Whether the alert can be dismissed
 * @property {string} class - Additional CSS classes
 */
interface AlertProps {
  variant?: AlertVariant
  size?: AlertSize
  dismissible?: boolean
  class?: string
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  size: 'md',
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const isVisible = ref(true)

const handleDismiss = () => {
  isVisible.value = false
  emit('dismiss')
}

const variants: Record<AlertVariant, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/10 dark:border-blue-900/20 dark:text-blue-400',
  success:
    'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/10 dark:border-green-900/20 dark:text-green-400',
  warning:
    'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/10 dark:border-yellow-900/20 dark:text-yellow-400',
  error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-400',
}

const sizes: Record<AlertSize, string> = {
  sm: 'p-3 text-xs',
  md: 'p-4 text-sm',
  lg: 'p-5 text-base',
}

const classes = computed(() => cn('rounded-lg border', sizes[props.size], variants[props.variant], props.class))
</script>

<template>
  <div v-if="isVisible" role="alert" :class="classes">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1">
        <slot />
      </div>
      <button
        v-if="dismissible"
        type="button"
        class="inline-flex shrink-0 items-center justify-center rounded-md p-1 hover:bg-black/5 focus:ring-2 focus:ring-current focus:ring-offset-2 focus:outline-hidden dark:hover:bg-white/10"
        aria-label="Dismiss"
        @click="handleDismiss"
      >
        <XMarkIcon class="size-4" />
      </button>
    </div>
  </div>
</template>
