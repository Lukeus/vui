<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import type { BreadcrumbItem } from '../schemas'
import { cn } from '../utils/classes'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  class?: string
}

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  class: '',
})

const containerClass = computed(() => cn('flex items-center space-x-2 text-sm', props.class))
</script>

<template>
  <nav :class="containerClass" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <ChevronRightIcon
          v-if="index > 0"
          class="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        />
        <a
          v-if="item.href && !item.current"
          :href="item.href"
          :class="
            cn('text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200', index > 0 && 'ml-2')
          "
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :class="cn('font-medium text-gray-900 dark:text-white', index > 0 && 'ml-2')"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
