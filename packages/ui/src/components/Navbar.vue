<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

/**
 * Navbar component for site/app navigation
 * @property {string} ariaLabel - Accessible label for the navigation
 * @property {string} class - Additional CSS classes
 */
interface NavbarProps {
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<NavbarProps>(), {
  ariaLabel: 'Main navigation',
})

const classes = computed(() =>
  cn(
    'flex items-center gap-4 px-4 py-3 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950',
    props.class
  )
)
</script>

<template>
  <nav role="navigation" :aria-label="ariaLabel" :class="classes">
    <slot />
  </nav>
</template>
