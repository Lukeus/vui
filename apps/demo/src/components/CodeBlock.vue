<script setup lang="ts">
import { Button } from '@vue-ui/ui'
import type { BundledLanguage, BundledTheme } from 'shiki'
import { computed, onMounted, ref } from 'vue'
import { copyToClipboard, highlightCode } from '../utils/highlighter'

/**
 * CodeBlock component for syntax-highlighted code display
 * @property {string} code - Source code to display
 * @property {BundledLanguage} language - Programming language for syntax highlighting
 * @property {BundledTheme} theme - Theme for syntax highlighting (auto-switches based on dark mode)
 * @property {boolean} showLineNumbers - Show line numbers on the left
 * @property {boolean} showCopyButton - Show copy to clipboard button
 * @property {string} filename - Optional filename to display above code
 */
interface CodeBlockProps {
  code: string
  language?: BundledLanguage
  theme?: BundledTheme
  showLineNumbers?: boolean
  showCopyButton?: boolean
  filename?: string
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  language: 'typescript',
  theme: 'github-dark',
  showLineNumbers: false,
  showCopyButton: true,
})

const highlightedCode = ref<string>('')
const isLoading = ref(true)
const isCopied = ref(false)
const error = ref<string | null>(null)

// Determine theme based on dark mode
const currentTheme = computed(() => {
  if (props.theme) return props.theme
  const isDark = document.documentElement.classList.contains('dark')
  return isDark ? 'github-dark' : 'github-light'
})

// Initialize syntax highlighting
onMounted(async () => {
  try {
    highlightedCode.value = await highlightCode(props.code, props.language, currentTheme.value)
    isLoading.value = false
  } catch (err) {
    console.error('Failed to highlight code:', err)
    error.value = 'Failed to load syntax highlighting'
    isLoading.value = false
  }
})

// Handle copy to clipboard
const handleCopy = async () => {
  try {
    await copyToClipboard(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <!-- Header with filename and copy button -->
    <div
      v-if="filename || showCopyButton"
      class="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-800/50"
    >
      <span v-if="filename" class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {{ filename }}
      </span>
      <div v-else class="flex-1"></div>

      <!-- Copy Button -->
      <Button
        v-if="showCopyButton"
        size="sm"
        color="zinc"
        plain
        class="opacity-0 transition-opacity group-hover:opacity-100"
        @click="handleCopy"
      >
        <span class="flex items-center gap-2">
          <svg
            v-if="!isCopied"
            class="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <svg
            v-else
            class="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ isCopied ? 'Copied!' : 'Copy' }}
        </span>
      </Button>
    </div>

    <!-- Code Content -->
    <div class="overflow-x-auto">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-4 text-sm text-zinc-500 dark:text-zinc-400">Loading syntax highlighting...</div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 text-sm text-red-500">{{ error }}</div>

      <!-- Highlighted Code -->
      <div
        v-else
        class="[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:text-sm [&>pre]:leading-relaxed"
        v-html="highlightedCode"
      ></div>
    </div>
  </div>
</template>
