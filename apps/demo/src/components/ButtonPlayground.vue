<script setup lang="ts">
import type { ButtonColor } from '@vue-ui/ui'
import { Button } from '@vue-ui/ui'
import { watch } from 'vue'
import { usePlayground } from '../composables/usePlayground'
import type { PropConfig } from '../utils/code-generator'
import ComponentPlayground from './ComponentPlayground.vue'

const colors = [
  'dark/zinc',
  'indigo',
  'blue',
  'green',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'zinc',
  'light',
  'dark',
  'white',
  'dark/white',
]

const propConfigs: PropConfig[] = [
  { name: 'color', value: 'dark/zinc', type: 'select', defaultValue: 'dark/zinc' },
  { name: 'outline', value: false, type: 'boolean', defaultValue: false },
  { name: 'plain', value: false, type: 'boolean', defaultValue: false },
  { name: 'disabled', value: false, type: 'boolean', defaultValue: false },
  { name: 'loading', value: false, type: 'boolean', defaultValue: false },
]

const playground = usePlayground({
  componentName: 'Button',
  props: propConfigs,
  content: 'Click me',
})

// Watch for outline/plain changes to ensure they're mutually exclusive
watch(
  () => playground.propValues.outline,
  (newValue) => {
    if (newValue && playground.propValues.plain) {
      playground.setPropValue('plain', false)
    }
  }
)

watch(
  () => playground.propValues.plain,
  (newValue) => {
    if (newValue && playground.propValues.outline) {
      playground.setPropValue('outline', false)
    }
  }
)
</script>

<template>
  <ComponentPlayground title="Button Playground" :code="playground.generatedCode.value" @reset="playground.reset">
    <template #controls>
      <!-- Color Select -->
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">Color</label>
        <select
          v-model="playground.propValues.color"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
        >
          <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
        </select>
      </div>

      <!-- Outline Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-zinc-900 dark:text-white">Outline</label>
        <input
          v-model="playground.propValues.outline"
          type="checkbox"
          class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
        />
      </div>

      <!-- Plain Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-zinc-900 dark:text-white">Plain</label>
        <input
          v-model="playground.propValues.plain"
          type="checkbox"
          class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
        />
      </div>

      <!-- Disabled Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-zinc-900 dark:text-white">Disabled</label>
        <input
          v-model="playground.propValues.disabled"
          type="checkbox"
          class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
        />
      </div>

      <!-- Loading Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-zinc-900 dark:text-white">Loading</label>
        <input
          v-model="playground.propValues.loading"
          type="checkbox"
          class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
        />
      </div>

      <!-- Content Input -->
      <div>
        <label for="button-text" class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
          >Button Text</label
        >
        <input
          id="button-text"
          v-model="playground.content.value"
          type="text"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
          placeholder="Button text"
        />
      </div>
    </template>

    <template #preview>
      <Button
        :color="(playground.propValues.color as ButtonColor)"
        :outline="!!playground.propValues.outline"
        :plain="!!playground.propValues.plain"
        :disabled="!!playground.propValues.disabled"
        :loading="!!playground.propValues.loading"
      >
        {{ playground.content.value }}
      </Button>
    </template>
  </ComponentPlayground>
</template>
