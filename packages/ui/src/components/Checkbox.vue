<script setup lang="ts">
import { Switch as HeadlessSwitch } from '@headlessui/vue'
import { CheckIcon } from '@vue-ui/icons'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface CheckboxProps {
  modelValue?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const classes = computed(() =>
  cn(
    'group relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4',
    'border border-zinc-950/15 data-[checked]:border-transparent data-[hover]:border-zinc-950/30 data-[checked]:bg-[--checkbox-checked-border] dark:border-white/20 dark:data-[checked]:border-white/5 dark:data-[hover]:border-white/30',
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm data-[checked]:before:bg-[--checkbox-checked-bg] dark:before:hidden dark:data-[checked]:bg-[--checkbox-checked-bg]',
    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)] data-[checked]:after:block dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:data-[checked]:after:block',
    'dark:data-[checked]:border-white/5 dark:data-[checked]:after:shadow-[inset_0_1px_theme(colors.white/15%)]',
    'focus:outline-hidden data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    'data-[disabled]:opacity-50',
    'forced-colors:appearance-auto forced-colors:![--checkbox-check:Highlight] forced-colors:data-[checked]:![--checkbox-checked-bg:Highlight]',
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950)]/90',
    'dark:[--checkbox-check:theme(colors.zinc.950)] dark:[--checkbox-checked-bg:theme(colors.zinc.600)]',
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
    <CheckIcon class="size-4 stroke-[--checkbox-check] opacity-0 group-data-[checked]:opacity-100 sm:size-3.5" />
  </HeadlessSwitch>
</template>
