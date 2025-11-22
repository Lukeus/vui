<script setup lang="ts">
/**
 * DescriptionListItem component for individual key-value pairs
 * @property {string} term - The key/label
 * @property {string} itemClass - Additional CSS classes
 */
interface DescriptionListItemProps {
  term: string
  itemClass?: string
}

defineProps<DescriptionListItemProps>()
</script>

<template>
  <div :class="itemClass">
    <dt class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      {{ term }}
    </dt>
    <dd class="mt-1 text-sm text-zinc-900 dark:text-white sm:col-span-2 sm:mt-0">
      <slot />
    </dd>
  </div>
</template>
