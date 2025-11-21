<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

type ColorVariant = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray'

type SizeVariant = 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value?: number
  indeterminate?: boolean
  color?: ColorVariant
  size?: SizeVariant
  label?: string
  showValue?: boolean
  class?: string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  indeterminate: false,
  color: 'blue',
  size: 'md',
  showValue: false,
  class: '',
})

const containerClass = computed(() => cn('w-full', props.class))

const trackClass = computed(() =>
  cn('overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700', {
    'h-1': props.size === 'sm',
    'h-2': props.size === 'md',
    'h-3': props.size === 'lg',
  })
)

const barClass = computed(() =>
  cn(
    'h-full transition-all duration-500 ease-out',
    {
      'bg-blue-600 dark:bg-blue-500': props.color === 'blue',
      'bg-red-600 dark:bg-red-500': props.color === 'red',
      'bg-green-600 dark:bg-green-500': props.color === 'green',
      'bg-yellow-600 dark:bg-yellow-500': props.color === 'yellow',
      'bg-purple-600 dark:bg-purple-500': props.color === 'purple',
      'bg-pink-600 dark:bg-pink-500': props.color === 'pink',
      'bg-indigo-600 dark:bg-indigo-500': props.color === 'indigo',
      'bg-gray-600 dark:bg-gray-500': props.color === 'gray',
    },
    props.indeterminate && 'animate-pulse'
  )
)

const progressValue = computed(() => {
  if (props.indeterminate) return 100
  return Math.max(0, Math.min(100, props.value))
})

const progressWidth = computed(() => `${progressValue.value}%`)
</script>

<template>
  <div :class="containerClass">
    <div v-if="label || showValue" class="mb-1 flex justify-between text-sm">
      <span v-if="label" class="font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span v-if="showValue && !indeterminate" class="text-gray-500 dark:text-gray-400"> {{ progressValue }}% </span>
    </div>

    <div
      :class="trackClass"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : progressValue"
      :aria-valuemin="indeterminate ? undefined : 0"
      :aria-valuemax="indeterminate ? undefined : 100"
      :aria-label="label"
    >
      <div :class="barClass" :style="{ width: progressWidth }" />
    </div>
  </div>
</template>
