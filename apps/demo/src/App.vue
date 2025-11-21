<script setup lang="ts">
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Square2StackIcon,
} from '@heroicons/vue/20/solid'
import type { BreadcrumbItem, ComboboxOption } from '@vue-ui/ui'
import {
  Badge,
  Breadcrumbs,
  Button,
  Calendar,
  Card,
  Combobox,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  EmptyState,
  Heading,
  Input,
  MultiColumnLayout,
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
import CodeExample from './components/CodeExample.vue'

const name = ref('')
const darkMode = ref(false)
const useMultiColumn = ref(true) // Toggle between layouts
const showSecondarySidebar = ref(true)
const showAside = ref(true)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Sidebar Navigation
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Components', href: '#', icon: Square2StackIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

// Breadcrumbs
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Demo', current: true },
]

// Tabs
const selectedTab = ref(0)

// Pagination
const currentPage = ref(1)
const totalPages = 10

// Progress
const progressValue = ref(45)

// Combobox
const selectedPerson = ref<string | number | null>(null)
const people: ComboboxOption[] = [
  { value: 1, label: 'Wade Cooper' },
  { value: 2, label: 'Arlene Mccoy' },
  { value: 3, label: 'Devon Webb' },
  { value: 4, label: 'Tom Cook' },
  { value: 5, label: 'Tanya Fox' },
]

// Calendar
const selectedDate = ref<Date | Date[] | null>(null)
// Component tree for secondary sidebar
const componentTree = [
  { name: 'Base Components', expanded: true },
  { name: '  Button.vue', file: true },
  { name: '  Input.vue', file: true },
  { name: '  Badge.vue', file: true },
  { name: 'Layout Components', expanded: true },
  { name: '  SidebarLayout.vue', file: true },
  { name: '  MultiColumnLayout.vue', file: true },
  { name: '  Navbar.vue', file: true },
]

// Code examples used in CodeExample wrappers
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
  <!-- Layout Toggle -->
  <div v-if="!useMultiColumn">
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
              <Button @click="useMultiColumn = !useMultiColumn" color="indigo" outline size="sm">
                Switch to {{ useMultiColumn ? 'Simple' : 'Multi-Column' }} Layout
              </Button>
              <Button @click="toggleDarkMode" color="zinc" plain>
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
  </div>

  <!-- MultiColumnLayout -->
  <MultiColumnLayout v-else :show-secondary-sidebar="showSecondarySidebar" :show-aside="showAside" :show-footer="true">
    <!-- Icon Sidebar -->
    <template #icon-sidebar>
      <div class="flex h-16 shrink-0 items-center justify-center">
        <img
          class="h-8 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Vue UI"
        />
      </div>
      <nav class="mt-8">
        <ul role="list" class="flex flex-col items-center space-y-1">
          <li v-for="item in navigation" :key="item.name" class="group relative">
            <a
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-indigo-600 text-white dark:bg-white/5 dark:text-white'
                  : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white',
                'vscode-nav-item group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold',
              ]"
            >
              <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
              <span class="sr-only">{{ item.name }}</span>
            </a>
            <!-- Tooltip -->
            <div
              class="pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 rounded bg-zinc-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-zinc-700"
            >
              {{ item.name }}
            </div>
          </li>
        </ul>
      </nav>
    </template>

    <!-- Navbar -->
    <template #navbar="{ toggleMobileSidebar }">
      <div
        class="flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-zinc-900 dark:shadow-none dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10"
      >
        <button
          type="button"
          class="vscode-icon-button -m-2.5 p-2.5 text-zinc-700 lg:hidden dark:text-zinc-400"
          @click="toggleMobileSidebar"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-zinc-900/10 lg:hidden dark:bg-white/10" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <!-- Search -->
          <form class="grid flex-1 grid-cols-1" action="#" method="GET">
            <input
              name="search"
              aria-label="Search"
              class="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-zinc-900 outline-hidden placeholder:text-zinc-400 sm:text-sm/6 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
              placeholder="Search"
            />
            <MagnifyingGlassIcon
              class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-zinc-400"
              aria-hidden="true"
            />
          </form>

          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Layout Controls -->
            <Button @click="showSecondarySidebar = !showSecondarySidebar" color="zinc" plain size="sm">
              {{ showSecondarySidebar ? 'Hide' : 'Show' }} Files
            </Button>
            <Button @click="showAside = !showAside" color="zinc" plain size="sm">
              {{ showAside ? 'Hide' : 'Show' }} Properties
            </Button>

            <!-- Notifications -->
            <button
              type="button"
              class="vscode-icon-button -m-2.5 p-2.5 text-zinc-400 hover:text-zinc-500 dark:hover:text-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-900/10 dark:lg:bg-white/10" aria-hidden="true"></div>

            <!-- Dark Mode Toggle -->
            <Button @click="toggleDarkMode" color="zinc" plain>
              {{ darkMode ? '☀️' : '🌙' }}
            </Button>

            <!-- Layout Toggle -->
            <Button @click="useMultiColumn = false" color="indigo" outline size="sm"> Simple Layout </Button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-900/10 dark:lg:bg-white/10" aria-hidden="true"></div>

            <!-- Profile Dropdown -->
            <Dropdown>
              <DropdownButton class="flex items-center">
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full bg-zinc-50 outline -outline-offset-1 outline-black/5 dark:bg-zinc-800 dark:outline-white/10"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-zinc-900 dark:text-white" aria-hidden="true">
                    Tom Cook
                  </span>
                  <ChevronDownIcon class="ml-2 size-5 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </span>
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem v-for="item in userNavigation" :key="item.name" :href="item.href">
                  {{ item.name }}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </template>

    <!-- Footer / Status Bar -->
    <template #footer>
      <div class="vscode-statusbar flex h-8 items-center justify-between px-4 py-1.5 text-sm text-white">
        <div class="flex items-center gap-x-4">
          <button class="vscode-statusbar-item flex items-center gap-x-1.5 rounded px-2 py-0.5">
            <svg class="size-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" />
              <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            </svg>
            <span class="font-medium">main</span>
          </button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">✓ 0 ✗ 0</button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">⚠ 0</button>
        </div>
        <div class="flex items-center gap-x-4">
          <button class="vscode-statusbar-item rounded px-2 py-0.5">Vue 3.5.13</button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">TypeScript</button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">UTF-8</button>
          <button class="rounded px-2 py-0.5 hover:bg-indigo-700 dark:hover:bg-indigo-800">LF</button>
        </div>
      </div>
    </template>

    <!-- Secondary Sidebar -->
    <template #secondary-sidebar>
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <Heading :level="3" class="mb-4">Component Tree</Heading>
        <ul class="space-y-1 text-sm">
          <li
            v-for="(item, index) in componentTree"
            :key="index"
            :class="[
              item.file ? 'pl-4 text-zinc-600 dark:text-zinc-400' : 'font-semibold text-zinc-900 dark:text-white',
              'py-1',
            ]"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </template>

    <!-- Main Content (reuse existing demos) -->
    <div class="min-h-full p-8 dark:bg-zinc-900">
      <div class="mx-auto max-w-4xl space-y-12">
        <!-- Header -->
        <div class="space-y-4">
          <Heading :level="1">Multi-Column Layout Demo</Heading>
          <Text>VS Code-inspired layout with icon sidebar, secondary sidebar, and right aside</Text>
        </div>

        <!-- Buttons Section -->
        <section class="space-y-4">
          <Heading :level="2">Buttons</Heading>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button color="indigo">Indigo</Button>
              <Button color="blue">Blue</Button>
              <Button color="green">Green</Button>
              <Button color="red">Red</Button>
            </div>

            <div class="flex flex-wrap gap-3">
              <Button outline>Outline</Button>
              <Button plain>Plain</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
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
          </div>
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

        <!-- Footer -->
        <footer class="border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
          <Text> Built with Vue 3 · TypeScript · Tailwind CSS 4 · @headlessui/vue </Text>
        </footer>
      </div>
    </div>

    <!-- Right Aside -->
    <template #aside>
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <Heading :level="3" class="mb-4">Properties</Heading>
        <Card variant="outlined" class="p-4">
          <div class="space-y-4">
            <div>
              <Text class="text-sm font-semibold text-zinc-900 dark:text-white">Layout Settings</Text>
              <div class="mt-2 space-y-2">
                <div class="flex items-center justify-between">
                  <Text class="text-sm text-zinc-600 dark:text-zinc-400">Dark Mode</Text>
                  <Badge :color="darkMode ? 'green' : 'zinc'">{{ darkMode ? 'On' : 'Off' }}</Badge>
                </div>
                <div class="flex items-center justify-between">
                  <Text class="text-sm text-zinc-600 dark:text-zinc-400">Secondary Sidebar</Text>
                  <Badge :color="showSecondarySidebar ? 'green' : 'zinc'">
                    {{ showSecondarySidebar ? 'Visible' : 'Hidden' }}
                  </Badge>
                </div>
              </div>
            </div>

            <div class="border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <Text class="text-sm font-semibold text-zinc-900 dark:text-white">Component Info</Text>
              <div class="mt-2 space-y-1">
                <Text class="text-sm text-zinc-600 dark:text-zinc-400">Total Components: 42</Text>
                <Text class="text-sm text-zinc-600 dark:text-zinc-400">Vue Version: 3.5</Text>
                <Text class="text-sm text-zinc-600 dark:text-zinc-400">Tailwind CSS: 4.1</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </template>
  </MultiColumnLayout>
</template>
