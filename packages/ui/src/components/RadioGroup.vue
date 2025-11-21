<script setup lang="ts">
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/vue'

interface RadioGroupProps {
  modelValue?: string | number
  disabled?: boolean
}

defineProps<RadioGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <HeadlessRadioGroup
    :model-value="modelValue"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </HeadlessRadioGroup>
</template>
