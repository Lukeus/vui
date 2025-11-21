<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface LinkProps {
  href?: string
  target?: string
  rel?: string
  class?: string
}

const props = defineProps<LinkProps>()

const classes = computed(() =>
  cn('cursor-pointer text-inherit no-underline outline-hidden focus:outline-2 focus:outline-offset-2', props.class)
)
</script>

<template>
  <a :href="href" :target="target" :rel="rel" :class="classes">
    <slot />
  </a>
</template>
