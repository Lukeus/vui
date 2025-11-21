<script setup lang="ts">
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@vue-ui/ui'
import { computed, ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

interface ComponentPlaygroundProps {
  title?: string
  code: string
  showReset?: boolean
}

const props = withDefaults(defineProps<ComponentPlaygroundProps>(), {
  title: 'Playground',
  showReset: true,
})

const emit = defineEmits<{
  reset: []
}>()

const selectedTab = ref(0)

const tabNames = computed(() => ['Controls & Preview', 'Code'])
</script>

<template>
  <Card variant="outlined" class="overflow-hidden">
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-900"
    >
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-white">{{ title }}</h3>
      <Button v-if="showReset && selectedTab === 0" size="sm" plain @click="emit('reset')"> Reset </Button>
    </div>

    <!-- Tabs -->
    <Tabs v-model="selectedTab" class="flex flex-col">
      <div class="border-b border-zinc-200 bg-white px-4 dark:border-white/10 dark:bg-zinc-900">
        <TabList class="-mb-px">
          <Tab v-for="(name, index) in tabNames" :key="index" class="px-4 py-2.5 text-sm font-medium">
            {{ name }}
          </Tab>
        </TabList>
      </div>

      <TabPanels>
        <!-- Controls & Preview Tab -->
        <TabPanel class="p-0">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Controls -->
            <div
              class="border-b border-zinc-200 bg-zinc-50 p-6 lg:border-r lg:border-b-0 dark:border-white/10 dark:bg-zinc-900"
            >
              <h4 class="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Controls</h4>
              <div class="space-y-4">
                <slot name="controls"></slot>
              </div>
            </div>

            <!-- Preview -->
            <div class="bg-white p-6 dark:bg-zinc-950">
              <h4 class="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Preview</h4>
              <div
                class="flex min-h-[200px] items-center justify-center rounded-lg border border-zinc-200 p-8 dark:border-white/10"
              >
                <slot name="preview"></slot>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- Code Tab -->
        <TabPanel class="p-0">
          <div class="max-h-[500px] overflow-auto">
            <CodeBlock :code="code" language="vue" :show-copy-button="true" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Card>
</template>
