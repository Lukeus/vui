<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  square?: boolean
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  square: false,
})

const classes = computed(() =>
  cn(
    'inline-grid size-10 shrink-0 align-middle *:col-start-1 *:row-start-1',
    'outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10',
    props.square ? 'rounded-lg *:rounded-lg' : 'rounded-full *:rounded-full',
    props.class
  )
)
</script>

<template>
  <span :class="classes">
    <img v-if="src" :src="src" :alt="alt" class="size-full" />
    <span
      v-else-if="initials"
      class="flex size-full items-center justify-center bg-zinc-100 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
    >
      {{ initials }}
    </span>
    <svg v-else class="size-full fill-zinc-400 select-none dark:fill-zinc-600" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
  </span>
</template>
