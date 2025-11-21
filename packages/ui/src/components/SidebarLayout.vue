<script setup lang="ts">
interface SidebarLayoutProps {
  class?: string
  navbarSticky?: boolean
}

const props = withDefaults(defineProps<SidebarLayoutProps>(), {
  navbarSticky: false,
})
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden" :class="props.class">
    <slot name="sidebar" />
    <div class="flex h-full min-w-0 flex-1 flex-col">
      <div class="z-40 shrink-0">
        <slot name="navbar" />
      </div>
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
