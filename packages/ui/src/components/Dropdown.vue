<script setup lang="ts">
import { Menu as HeadlessMenu } from '@headlessui/vue'
</script>

<template>
  <HeadlessMenu as="div" class="relative">
    <slot />
  </HeadlessMenu>
</template>
