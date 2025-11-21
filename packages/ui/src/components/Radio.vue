<script setup lang="ts">
import { RadioGroupOption as HeadlessRadio } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface RadioProps {
  value: string | number
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'group relative isolate flex size-[1.125rem] shrink-0 items-center justify-center rounded-full sm:size-4',
    'border border-zinc-950/15 data-[checked]:border-transparent data-[hover]:border-zinc-950/30 data-[checked]:bg-[--radio-checked-border] dark:border-white/20 dark:data-[checked]:border-white/5 dark:data-[hover]:border-white/30',
    'before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:shadow-sm data-[checked]:before:bg-[--radio-checked-bg] dark:before:hidden dark:data-[checked]:bg-[--radio-checked-bg]',
    'after:absolute after:inset-0 after:-z-10 after:rounded-full after:shadow-[inset_0_1px_theme(colors.white/15%)] data-[checked]:after:block dark:after:-inset-px dark:after:hidden dark:after:rounded-full dark:data-[checked]:after:block',
    'dark:data-[checked]:border-white/5 dark:data-[checked]:after:shadow-[inset_0_1px_theme(colors.white/15%)]',
    'focus:outline-hidden data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    'data-[disabled]:opacity-50',
    'forced-colors:appearance-auto forced-colors:![--radio-checked-bg:Highlight]',
    '[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950)]/90',
    'dark:[--radio-checked-bg:theme(colors.zinc.600)]',
    props.class
  )
)
</script>

<template>
  <HeadlessRadio :value="value" :disabled="disabled" :class="classes">
    <span class="size-1 rounded-full bg-white opacity-0 group-data-[checked]:opacity-100 dark:bg-zinc-950" />
  </HeadlessRadio>
</template>
