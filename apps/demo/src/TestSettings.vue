<script setup lang="ts">
import { useSettings } from './composables/useSettings'

console.log('TestSettings: About to call useSettings')
const result = useSettings()
console.log('TestSettings: useSettings result:', result)
console.log('TestSettings: settings value:', result.settings)
console.log('TestSettings: settings.value:', result.settings.value)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Settings Test</h1>
    <pre>{{ result }}</pre>
  </div>
</template>
