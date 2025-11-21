<script setup lang="ts">
import { Badge, Button, Card, Heading, Text } from '@vue-ui/ui'
import { computed } from 'vue'
import type { AppSettings } from '../composables/useSettings'

interface SettingsPanelProps {
  settings: AppSettings
}

const props = defineProps<SettingsPanelProps>()

const emit = defineEmits<{
  'toggle-dark-mode': []
  'toggle-secondary-sidebar': []
  'toggle-aside': []
  'toggle-line-numbers': []
  'toggle-word-wrap': []
  'update-font-size': [size: 'sm' | 'md' | 'lg']
  reset: []
}>()

const fontSizes = ['sm', 'md', 'lg'] as const

const componentCount = computed(() => 42)
const vueVersion = computed(() => '3.5')
const tailwindVersion = computed(() => '4.1')
</script>

<template>
  <div class="space-y-6">
    <!-- Theme Preferences -->
    <div>
      <Heading :level="3" class="mb-4 text-base">Theme</Heading>
      <Card variant="outlined" class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <Text class="text-sm font-medium text-zinc-900 dark:text-white">Dark Mode</Text>
              <Text class="text-xs text-zinc-500 dark:text-zinc-400">Toggle dark theme</Text>
            </div>
            <button
              type="button"
              :class="[
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden',
                settings.darkMode ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700',
              ]"
              role="switch"
              :aria-checked="settings.darkMode"
              @click="emit('toggle-dark-mode')"
            >
              <span
                :class="[
                  'pointer-events-none inline-block size-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.darkMode ? 'translate-x-5' : 'translate-x-0',
                ]"
              />
            </button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Layout Preferences -->
    <div>
      <Heading :level="3" class="mb-4 text-base">Layout</Heading>
      <Card variant="outlined" class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <Text class="text-sm text-zinc-900 dark:text-white">Component Browser</Text>
            <Badge :color="settings.showSecondarySidebar ? 'green' : 'zinc'">
              {{ settings.showSecondarySidebar ? 'Visible' : 'Hidden' }}
            </Badge>
          </div>
          <Button @click="emit('toggle-secondary-sidebar')" color="zinc" plain size="sm" class="w-full">
            {{ settings.showSecondarySidebar ? 'Hide' : 'Show' }} Browser
          </Button>

          <div class="border-t border-zinc-200 pt-3 dark:border-zinc-800"></div>

          <div class="flex items-center justify-between">
            <Text class="text-sm text-zinc-900 dark:text-white">Properties Panel</Text>
            <Badge :color="settings.showAside ? 'green' : 'zinc'">
              {{ settings.showAside ? 'Visible' : 'Hidden' }}
            </Badge>
          </div>
          <Button @click="emit('toggle-aside')" color="zinc" plain size="sm" class="w-full">
            {{ settings.showAside ? 'Hide' : 'Show' }} Properties
          </Button>
        </div>
      </Card>
    </div>

    <!-- Code Display Preferences -->
    <div>
      <Heading :level="3" class="mb-4 text-base">Code Display</Heading>
      <Card variant="outlined" class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <Text class="text-sm font-medium text-zinc-900 dark:text-white">Line Numbers</Text>
              <Text class="text-xs text-zinc-500 dark:text-zinc-400">Show in code blocks</Text>
            </div>
            <input
              type="checkbox"
              :checked="settings.showLineNumbers"
              class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
              @change="emit('toggle-line-numbers')"
            />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <Text class="text-sm font-medium text-zinc-900 dark:text-white">Word Wrap</Text>
              <Text class="text-xs text-zinc-500 dark:text-zinc-400">Wrap long lines</Text>
            </div>
            <input
              type="checkbox"
              :checked="settings.wordWrap"
              class="size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-white/10 dark:bg-zinc-800"
              @change="emit('toggle-word-wrap')"
            />
          </div>

          <div class="border-t border-zinc-200 pt-3 dark:border-zinc-800"></div>

          <div>
            <Text class="mb-2 text-sm font-medium text-zinc-900 dark:text-white">Font Size</Text>
            <div class="flex gap-2">
              <button
                v-for="size in fontSizes"
                :key="size"
                type="button"
                :class="[
                  'flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  settings.fontSize === size
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
                ]"
                @click="emit('update-font-size', size)"
              >
                {{ size.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Component Info -->
    <div>
      <Heading :level="3" class="mb-4 text-base">About</Heading>
      <Card variant="outlined" class="p-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Text class="text-sm text-zinc-600 dark:text-zinc-400">Components</Text>
            <Text class="text-sm font-medium text-zinc-900 dark:text-white">{{ componentCount }}</Text>
          </div>
          <div class="flex items-center justify-between">
            <Text class="text-sm text-zinc-600 dark:text-zinc-400">Vue Version</Text>
            <Text class="text-sm font-medium text-zinc-900 dark:text-white">{{ vueVersion }}</Text>
          </div>
          <div class="flex items-center justify-between">
            <Text class="text-sm text-zinc-600 dark:text-zinc-400">Tailwind CSS</Text>
            <Text class="text-sm font-medium text-zinc-900 dark:text-white">{{ tailwindVersion }}</Text>
          </div>
        </div>
      </Card>
    </div>

    <!-- Reset Button -->
    <Button @click="emit('reset')" color="red" outline class="w-full"> Reset to Defaults </Button>
  </div>
</template>
