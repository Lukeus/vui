<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, onMounted, ref, type Component } from 'vue'
import { cn } from '../utils/classes'

type ToastVariant = 'info' | 'success' | 'warning' | 'error'

/**
 * Toast notification component
 * @property {string} id - Unique identifier for the toast
 * @property {string} message - Toast message content
 * @property {ToastVariant} variant - Visual style variant
 * @property {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @property {boolean} dismissible - Whether toast can be manually dismissed
 */
export interface ToastProps {
  id: string
  message: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
  duration: 5000,
  dismissible: true,
})

const emit = defineEmits<{
  dismiss: [id: string]
}>()

const isVisible = ref(false)

const variants: Record<ToastVariant, { bg: string; icon: Component }> = {
  info: {
    bg: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/10 dark:border-blue-900/20 dark:text-blue-400',
    icon: InformationCircleIcon,
  },
  success: {
    bg: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/10 dark:border-green-900/20 dark:text-green-400',
    icon: CheckCircleIcon,
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/10 dark:border-yellow-900/20 dark:text-yellow-400',
    icon: ExclamationCircleIcon,
  },
  error: {
    bg: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-400',
    icon: XCircleIcon,
  },
}

const classes = computed(() =>
  cn(
    'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
    'transform transition-all duration-300',
    isVisible.value ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
    variants[props.variant].bg
  )
)

const IconComponent = computed(() => variants[props.variant].icon)

const handleDismiss = () => {
  isVisible.value = false
  setTimeout(() => {
    emit('dismiss', props.id)
  }, 300) // Wait for animation
}

onMounted(() => {
  // Trigger entrance animation
  setTimeout(() => {
    isVisible.value = true
  }, 10)

  // Auto-dismiss
  if (props.duration > 0) {
    setTimeout(() => {
      handleDismiss()
    }, props.duration)
  }
})
</script>

<template>
  <div :class="classes" role="alert" aria-live="assertive">
    <div class="flex items-start gap-3 p-4">
      <component :is="IconComponent" class="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div class="flex-1 text-sm font-medium">
        {{ message }}
      </div>
      <button
        v-if="dismissible"
        type="button"
        class="inline-flex shrink-0 rounded-md hover:bg-black/5 focus:ring-2 focus:ring-current focus:outline-hidden dark:hover:bg-white/10"
        @click="handleDismiss"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5" />
      </button>
    </div>
  </div>
</template>
