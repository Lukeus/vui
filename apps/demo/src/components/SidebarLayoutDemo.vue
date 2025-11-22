<script setup lang="ts">
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  Square2StackIcon,
} from '@heroicons/vue/20/solid'
import type { BreadcrumbItem, ComboboxOption } from '@vue-ui/ui'
import {
  Badge,
  Breadcrumbs,
  Button,
  Calendar,
  Combobox,
  EmptyState,
  Heading,
  Input,
  Navbar,
  Pagination,
  ProgressBar,
  Sidebar,
  SidebarLayout,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@vue-ui/ui'
import { ref } from 'vue'
import CodeExample from './CodeExample.vue'

interface SidebarLayoutDemoProps {
  darkMode: boolean
}

defineProps<SidebarLayoutDemoProps>()

const emit = defineEmits<{
  'toggle-dark-mode': []
  'switch-layout': []
}>()

const name = ref('')

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Components', href: '#', icon: Square2StackIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Demo', current: true },
]

const selectedTab = ref(0)
const currentPage = ref(1)
const totalPages = 10
const progressValue = ref(45)
const selectedPerson = ref<string | number | null>(null)
const people: ComboboxOption[] = [
  { value: 1, label: 'Wade Cooper' },
  { value: 2, label: 'Arlene Mccoy' },
  { value: 3, label: 'Devon Webb' },
  { value: 4, label: 'Tom Cook' },
  { value: 5, label: 'Tanya Fox' },
]
const selectedDate = ref<Date | Date[] | null>(null)

const buttonColorsCode = `<template>
  <div class="flex flex-wrap gap-3">
    <Button>Default</Button>
    <Button color="indigo">Indigo</Button>
    <Button color="blue">Blue</Button>
    <Button color="green">Green</Button>
    <Button color="red">Red</Button>
  </div>
</template>

<script setup>
import { Button } from '@vue-ui/ui'
<\/script>`

const buttonVariantsCode = `<template>
  <div class="flex flex-wrap gap-3">
    <Button outline>Outline</Button>
    <Button plain>Plain</Button>
    <Button disabled>Disabled</Button>
  </div>
</template>

<script setup>
import { Button } from '@vue-ui/ui'
<\/script>`
</script>

<template>
  <SidebarLayout navbar-sticky>
    <template #sidebar>
      <Sidebar>
        <div class="flex h-10 shrink-0 items-center px-2">
          <Heading :level="2">Vue UI</Heading>
        </div>
        <nav class="mt-6 flex flex-1 flex-col">
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <a
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-400 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-white',
                    'size-6 shrink-0',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
      </Sidebar>
    </template>

    <template #navbar>
      <Navbar>
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1" />
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <Button @click="emit('switch-layout')" color="indigo" outline size="sm">
              Switch to Multi-Column Layout
            </Button>
            <Button @click="emit('toggle-dark-mode')" color="zinc" plain>
              {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
            </Button>
          </div>
        </div>
      </Navbar>
    </template>

    <div class="min-h-full p-8 dark:bg-zinc-900">
      <div class="mx-auto max-w-4xl space-y-12">
        <!-- Header -->
        <div class="space-y-4">
          <Heading :level="1">Component Library Demo</Heading>
          <Text>A reusable component library built with Vue 3, TypeScript, and Tailwind CSS 4</Text>
        </div>

        <!-- Buttons Section -->
        <section class="space-y-4">
          <Heading :level="2">Buttons</Heading>

          <CodeExample title="Button Color Variants" :code="buttonColorsCode">
            <div class="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button color="indigo">Indigo</Button>
              <Button color="blue">Blue</Button>
              <Button color="green">Green</Button>
              <Button color="red">Red</Button>
            </div>
          </CodeExample>

          <CodeExample title="Button Variants" :code="buttonVariantsCode">
            <div class="flex flex-wrap gap-3">
              <Button outline>Outline</Button>
              <Button plain>Plain</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CodeExample>
        </section>

        <!-- Inputs Section -->
        <section class="space-y-4">
          <Heading :level="2">Inputs</Heading>

          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Name </label>
              <Input v-model="name" placeholder="Enter your name" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Email </label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Date </label>
              <Input type="date" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Disabled </label>
              <Input disabled placeholder="Disabled input" />
            </div>
          </div>
        </section>

        <!-- Badges Section -->
        <section class="space-y-4">
          <Heading :level="2">Badges</Heading>

          <div class="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge color="blue">Blue</Badge>
            <Badge color="green">Green</Badge>
            <Badge color="yellow">Yellow</Badge>
            <Badge color="red">Red</Badge>
            <Badge color="purple">Purple</Badge>
            <Badge color="pink">Pink</Badge>
          </div>
        </section>

        <!-- Interactive Section -->
        <section class="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50">
          <Heading :level="2" class="mb-4">Interactive Example</Heading>
          <Text class="mb-4">Try entering your name in the input field above. When you do:</Text>
          <div v-if="name" class="space-y-2">
            <Text
              >Hello, <Badge color="blue">{{ name }}</Badge
              >! 👋</Text
            >
            <Button color="indigo" @click="name = ''">Clear Name</Button>
          </div>
          <Text v-else class="text-zinc-400">Enter your name to see a personalized greeting.</Text>
        </section>

        <!-- Breadcrumbs Section -->
        <section class="space-y-4">
          <Heading :level="2">Breadcrumbs</Heading>
          <Breadcrumbs :items="breadcrumbItems" />
        </section>

        <!-- Tabs Section -->
        <section class="space-y-4">
          <Heading :level="2">Tabs</Heading>
          <Tabs v-model="selectedTab">
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Settings</Tab>
              <Tab>Messages</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>Profile content goes here. This is the first tab panel.</Text>
              </TabPanel>
              <TabPanel>
                <Text>Settings content goes here. This is the second tab panel.</Text>
              </TabPanel>
              <TabPanel>
                <Text>Messages content goes here. This is the third tab panel.</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        <!-- Pagination Section -->
        <section class="space-y-4">
          <Heading :level="2">Pagination</Heading>
          <Pagination v-model:current-page="currentPage" :total-pages="totalPages" />
          <Text class="text-center">Current page: {{ currentPage }}</Text>
        </section>

        <!-- Progress Bar Section -->
        <section class="space-y-4">
          <Heading :level="2">Progress Bar</Heading>
          <ProgressBar :value="progressValue" label="Upload progress" show-value />
          <ProgressBar :value="75" color="green" size="lg" />
          <ProgressBar indeterminate color="blue" label="Loading..." />
        </section>

        <!-- Empty State Section -->
        <section class="space-y-4">
          <Heading :level="2">Empty State</Heading>
          <EmptyState :icon="FolderIcon" title="No files found" description="Get started by creating a new file.">
            <template #action>
              <Button color="blue">Create File</Button>
            </template>
          </EmptyState>
        </section>

        <!-- Combobox Section -->
        <section class="space-y-4">
          <Heading :level="2">Combobox</Heading>
          <div class="max-w-md">
            <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Select a person </label>
            <Combobox v-model="selectedPerson" :options="people" placeholder="Search people..." />
            <Text v-if="selectedPerson" class="mt-2">
              Selected: {{ people.find((p) => p.value === selectedPerson)?.label }}
            </Text>
          </div>
        </section>

        <!-- Calendar Section -->
        <section class="space-y-4">
          <Heading :level="2">Calendar</Heading>
          <div class="flex justify-center">
            <Calendar v-model="selectedDate" mode="single" />
          </div>
          <Text v-if="selectedDate" class="text-center">
            Selected date: {{ (selectedDate as Date).toLocaleDateString() }}
          </Text>
        </section>

        <!-- Footer -->
        <footer class="border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
          <Text> Built with Vue 3 · TypeScript · Tailwind CSS 4 · @headlessui/vue </Text>
        </footer>
      </div>
    </div>
  </SidebarLayout>
</template>
