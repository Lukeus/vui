<script setup lang="ts">
import { ref } from 'vue'
import Toast, { type ToastProps } from './Toast.vue'

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

/**
 * ToastContainer component for managing multiple toast notifications
 * @property {ToastPosition} position - Position of toast container on screen
 */
interface ToastContainerProps {
  position?: ToastPosition
}

const { position = 'top-right' } = defineProps<ToastContainerProps>()

const toasts = ref<ToastProps[]>([])

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
}

const addToast = (toast: Omit<ToastProps, 'id'>) => {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  toasts.value.push({ ...toast, id })
  return id
}

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

const clearAll = () => {
  toasts.value = []
}

// Expose methods for parent usage
defineExpose({
  addToast,
  removeToast,
  clearAll,
})
</script>

<template>
  <div
    aria-live="polite"
    aria-atomic="true"
    :class="['pointer-events-none fixed z-50 flex flex-col gap-2 p-4 sm:p-6', positionClasses[position]]"
  >
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
      @dismiss="removeToast"
    />
  </div>
</template>
