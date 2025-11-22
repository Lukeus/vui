<script setup lang="ts">
import type { BadgeColor, BadgeSize } from '@vue-ui/ui'
import { Badge } from '@vue-ui/ui'
import { usePlayground } from '../composables/usePlayground'
import type { PropConfig } from '../utils/code-generator'
import ComponentPlayground from './ComponentPlayground.vue'

const colors = [
  'zinc',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

const sizes = ['sm', 'md', 'lg']

const propConfigs: PropConfig[] = [
  { name: 'color', value: 'blue', type: 'select', defaultValue: 'zinc' },
  { name: 'size', value: 'md', type: 'select', defaultValue: 'md' },
]

const playground = usePlayground({
  componentName: 'Badge',
  props: propConfigs,
  content: 'Badge',
})
</script>

<template>
  <ComponentPlayground title="Badge Playground" :code="playground.generatedCode.value" @reset="playground.reset">
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

      <!-- Size Select -->
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">Size</label>
        <select
          v-model="playground.propValues.size"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
        >
          <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>

      <!-- Content Input -->
      <div>
        <label for="badge-text" class="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">Badge Text</label>
        <input
          id="badge-text"
          v-model="playground.content.value"
          type="text"
          class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-800 dark:text-white"
          placeholder="Badge text"
        />
      </div>
    </template>

    <template #preview>
      <Badge :color="(playground.propValues.color as BadgeColor)" :size="(playground.propValues.size as BadgeSize)">
        {{ playground.content.value }}
      </Badge>
    </template>
  </ComponentPlayground>
</template>
