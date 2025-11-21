<script setup lang="ts">
import { Switch as HeadlessSwitch } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface ToggleProps {
  modelValue?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const classes = computed(() =>
  cn(
    'group relative isolate inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'data-[checked]:bg-blue-600 bg-zinc-200 dark:bg-zinc-700 dark:data-[checked]:bg-blue-500',
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
    props.class
  )
)
</script>

<template>
  <HeadlessSwitch
    :checked="modelValue"
    :disabled="disabled"
    :class="classes"
    @update:checked="emit('update:modelValue', $event)"
  >
    <span
      class="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition group-data-[checked]:translate-x-5"
    />
  </HeadlessSwitch>
</template>
