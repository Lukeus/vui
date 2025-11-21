<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface SelectProps {
  modelValue?: string | number
  disabled?: boolean
  invalid?: boolean
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const wrapperClasses = cn(
  'relative block w-full',
  'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow-sm',
  'dark:before:hidden',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
  'has-data-[disabled]:opacity-50 has-data-[disabled]:before:bg-zinc-950/5 has-data-[disabled]:before:shadow-none'
)

const selectClasses = computed(() =>
  cn(
    'relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]',
    'text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white',
    'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
    'bg-transparent dark:bg-white/5',
    'focus:outline-hidden',
    '[&_optgroup]:font-semibold',
    props.invalid &&
      'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 dark:data-[invalid]:border-red-600',
    'data-[disabled]:border-zinc-950/20 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/2.5',
    'dark:[color-scheme:dark]',
    props.class
  )
)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <span :class="wrapperClasses" data-slot="control">
    <select
      :value="modelValue"
      :disabled="disabled"
      :data-invalid="invalid ? '' : undefined"
      :class="selectClasses"
      @change="handleChange"
    >
      <slot />
    </select>
  </span>
</template>
