<script setup lang="ts">
import { Input } from '@vue-ui/ui'
import { ref } from 'vue'
import { usePlayground } from '../composables/usePlayground'
import type { PropConfig } from '../utils/code-generator'
import ComponentPlayground from './ComponentPlayground.vue'

const inputTypes = ['text', 'email', 'password', 'search', 'tel', 'url', 'number', 'date']

const propConfigs: PropConfig[] = [
  { name: 'type', value: 'text', type: 'select', defaultValue: 'text' },
  { name: 'placeholder', value: 'Enter text...', type: 'string', defaultValue: '' },
  { name: 'disabled', value: false, type: 'boolean', defaultValue: false },
  { name: 'invalid', value: false, type: 'boolean', defaultValue: false },
]

const playground = usePlayground({
  componentName: 'Input',
  props: propConfigs,
})

const inputValue = ref('')
</script>

<template>
  <ComponentPlayground title="Input Playground" :code="playground.generatedCode" @reset="playground.reset">
    <template #controls>
      <!-- Type Select -->
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">Type</label>
        <select
          v-model="playground.propValues.type"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
        >
          <option v-for="type in inputTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- Placeholder Input -->
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">Placeholder</label>
        <input
          v-model="playground.propValues.placeholder"
          type="text"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
          placeholder="Placeholder text"
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

      <!-- Invalid Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-zinc-900 dark:text-white">Invalid</label>
        <input
          v-model="playground.propValues.invalid"
          type="checkbox"
          class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
        />
      </div>
    </template>

    <template #preview>
      <div class="w-full max-w-sm">
        <Input
          v-model="inputValue"
          :type="playground.propValues.type as any"
          :placeholder="playground.propValues.placeholder as string"
          :disabled="!!playground.propValues.disabled"
          :invalid="!!playground.propValues.invalid"
        />
      </div>
    </template>
  </ComponentPlayground>
</template>
