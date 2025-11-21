<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  invalid?: boolean
  class?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  rows: 3,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const wrapperClasses = cn(
  'relative block w-full',
  'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow-sm',
  'dark:before:hidden',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
  'has-data-[disabled]:opacity-50 has-data-[disabled]:before:bg-zinc-950/5 has-data-[disabled]:before:shadow-none'
)

const textareaClasses = computed(() =>
  cn(
    'relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
    'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
    'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
    'bg-transparent dark:bg-white/5',
    'focus:outline-hidden',
    'resize-y',
    props.invalid &&
      'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 dark:data-[invalid]:border-red-600 dark:data-[invalid]:data-[hover]:border-red-600',
    'data-[disabled]:border-zinc-950/20 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/2.5 dark:data-[hover]:data-[disabled]:border-white/15',
    'dark:[color-scheme:dark]',
    props.class
  )
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <span :class="wrapperClasses" data-slot="control">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :data-invalid="invalid ? '' : undefined"
      :class="textareaClasses"
      @input="handleInput"
    />
  </span>
</template>
