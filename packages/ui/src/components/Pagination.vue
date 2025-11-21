<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface PaginationProps {
  currentPage: number
  totalPages: number
  maxVisible?: number
  class?: string
  previousLabel?: string
  nextLabel?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisible: 7,
  class: '',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  ariaLabel: 'Pagination',
})

const emit = defineEmits<{
  'update:currentPage': [value: number]
}>()

const containerClass = computed(() => cn('flex items-center justify-center space-x-2', props.class))

const pages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  const maxVisible = props.maxVisible

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  const halfVisible = Math.floor(maxVisible / 2)

  if (current <= halfVisible + 1) {
    // Near start
    for (let i = 1; i <= maxVisible - 2; i++) {
      pages.push(i)
    }
    pages.push('...')
    pages.push(total)
  } else if (current >= total - halfVisible) {
    // Near end
    pages.push(1)
    pages.push('...')
    for (let i = total - (maxVisible - 3); i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Middle
    pages.push(1)
    pages.push('...')
    for (let i = current - halfVisible + 2; i <= current + halfVisible - 2; i++) {
      pages.push(i)
    }
    pages.push('...')
    pages.push(total)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const previousDisabled = computed(() => props.currentPage <= 1)
const nextDisabled = computed(() => props.currentPage >= props.totalPages)
</script>

<template>
  <nav :class="containerClass" :aria-label="ariaLabel">
    <button
      type="button"
      :disabled="previousDisabled"
      :class="
        cn(
          'inline-flex items-center rounded-md px-2 py-2 text-sm font-medium',
          'ring-1 ring-gray-300 ring-inset dark:ring-gray-700',
          previousDisabled
            ? 'cursor-not-allowed bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
            : 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
        )
      "
      @click="goToPage(currentPage - 1)"
    >
      <span class="sr-only">{{ previousLabel }}</span>
      <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
    </button>

    <div class="flex space-x-1">
      <template v-for="(page, index) in pages" :key="index">
        <span
          v-if="page === '...'"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          ...
        </span>
        <button
          v-else
          type="button"
          :class="
            cn(
              'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
              'ring-1 ring-gray-300 ring-inset dark:ring-gray-700',
              page === currentPage
                ? 'bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500'
                : 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
            )
          "
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <button
      type="button"
      :disabled="nextDisabled"
      :class="
        cn(
          'inline-flex items-center rounded-md px-2 py-2 text-sm font-medium',
          'ring-1 ring-gray-300 ring-inset dark:ring-gray-700',
          nextDisabled
            ? 'cursor-not-allowed bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
            : 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
        )
      "
      @click="goToPage(currentPage + 1)"
    >
      <span class="sr-only">{{ nextLabel }}</span>
      <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
    </button>
  </nav>
</template>
