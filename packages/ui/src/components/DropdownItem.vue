<script setup lang="ts">
import { MenuItem as HeadlessMenuItem } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'
import Link from './Link.vue'

interface DropdownItemProps {
  href?: string
  disabled?: boolean
  class?: string
}

const props = defineProps<DropdownItemProps>()

const classes = computed(() =>
  cn(
    'group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5',
    'text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white',
    'data-[focus]:bg-blue-500 data-[focus]:text-white',
    'data-[disabled]:opacity-50',
    props.class
  )
)

const component = computed(() => (props.href ? Link : 'button'))
</script>

<template>
  <HeadlessMenuItem v-slot="{ active, disabled: isDisabled }" :disabled="disabled">
    <component
      :is="component"
      :href="href"
      :disabled="isDisabled"
      :data-focus="active ? '' : undefined"
      :data-disabled="isDisabled ? '' : undefined"
      :class="classes"
    >
      <slot />
    </component>
  </HeadlessMenuItem>
</template>
