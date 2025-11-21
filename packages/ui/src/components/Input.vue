<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '../utils/classes'

interface InputProps {
  modelValue?: string | number
  type?:
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'week'
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  class?: string
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const defaultId = useId()
const inputId = computed(() => props.id || defaultId)

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']

const wrapperClasses = cn(
  'relative block w-full',
  'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm',
  'dark:before:hidden',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
  'has-data-[disabled]:opacity-50 has-data-[disabled]:before:bg-zinc-950/5 has-data-[disabled]:before:shadow-none'
)

const inputClasses = computed(() =>
  cn(
    dateTypes.includes(props.type) && [
      '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
      '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
      '[&::-webkit-datetime-edit]:inline-flex',
      '[&::-webkit-datetime-edit]:p-0',
      '[&::-webkit-datetime-edit-year-field]:p-0',
      '[&::-webkit-datetime-edit-month-field]:p-0',
      '[&::-webkit-datetime-edit-day-field]:p-0',
      '[&::-webkit-datetime-edit-hour-field]:p-0',
      '[&::-webkit-datetime-edit-minute-field]:p-0',
      '[&::-webkit-datetime-edit-second-field]:p-0',
      '[&::-webkit-datetime-edit-millisecond-field]:p-0',
      '[&::-webkit-datetime-edit-meridiem-field]:p-0',
    ],
    'relative block w-full appearance-none rounded-lg px-[calc(var(--spacing)*3.5-1px)] py-[calc(var(--spacing)*2.5-1px)] sm:px-[calc(var(--spacing)*3-1px)] sm:py-[calc(var(--spacing)*1.5-1px)]',
    'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
    'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
    'bg-transparent dark:bg-white/5',
    'focus:outline-hidden',
    props.invalid &&
      'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 dark:data-[invalid]:border-red-600 dark:data-[invalid]:data-[hover]:border-red-600',
    'data-[disabled]:border-zinc-950/20 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/2.5 dark:data-[hover]:data-[disabled]:border-white/15',
    'dark:[color-scheme:dark]',
    props.class
  )
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <span :class="wrapperClasses" data-slot="control">
    <input
      :id="inputId"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="invalid"
      :data-invalid="invalid ? '' : undefined"
      :class="inputClasses"
      @input="handleInput"
    />
  </span>
</template>
