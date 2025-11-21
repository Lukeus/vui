<script setup lang="ts">
import { Button } from '@vue-ui/ui'
import type { BundledLanguage } from 'shiki'
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

/**
 * CodeExample component wraps component demonstrations with collapsible code
 * @property {string} code - Source code to display
 * @property {BundledLanguage} language - Programming language
 * @property {string} title - Example title
 * @property {boolean} defaultExpanded - Whether code is expanded by default
 */
interface CodeExampleProps {
  code: string
  language?: BundledLanguage
  title?: string
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<CodeExampleProps>(), {
  language: 'vue',
  defaultExpanded: false,
})

const isExpanded = ref(props.defaultExpanded)

const toggleCode = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="space-y-4">
    <!-- Component Demo Area -->
    <div class="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <slot />
    </div>

    <!-- Code Toggle Section -->
    <div class="flex items-center justify-between">
      <span v-if="title" class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {{ title }}
      </span>
      <Button size="sm" color="zinc" outline @click="toggleCode">
        <span class="flex items-center gap-2">
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {{ isExpanded ? 'Hide Code' : 'Show Code' }}
        </span>
      </Button>
    </div>

    <!-- Collapsible Code Block -->
    <div v-if="isExpanded" class="animate-in fade-in slide-in-from-top-2 duration-200">
      <CodeBlock :code="code" :language="language" />
    </div>
  </div>
</template>
