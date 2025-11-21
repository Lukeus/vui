<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface FieldsetProps {
  disabled?: boolean
  class?: string
}

const props = defineProps<FieldsetProps>()

const classes = computed(() => cn('[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1', props.class))
</script>

<template>
  <fieldset :disabled="disabled" :class="classes">
    <slot />
  </fieldset>
</template>
