<script setup lang="ts">
import { TabGroup } from '@headlessui/vue'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface TabsProps {
  modelValue?: number
  vertical?: boolean
  class?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: 0,
  vertical: false,
  class: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const containerClass = computed(() => cn('w-full', props.class))

const handleChange = (index: number) => {
  emit('update:modelValue', index)
}
</script>

<template>
  <TabGroup as="div" :selected-index="modelValue" :vertical="vertical" :class="containerClass" @change="handleChange">
    <slot />
  </TabGroup>
</template>
