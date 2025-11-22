<script setup lang="ts">
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Square2StackIcon,
} from '@heroicons/vue/20/solid'
import { Button, Dropdown, DropdownButton, DropdownItem, DropdownMenu, Heading, MultiColumnLayout } from '@vue-ui/ui'
import { ref, watch } from 'vue'
import FileTree from './components/FileTree.vue'
import MainContent from './components/MainContent.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import { useSettings } from './composables/useSettings'
import type { TreeItem } from './data/component-tree'
import { componentTree } from './data/component-tree'

const searchQuery = ref('')
const activeComponentId = ref('')

// Settings management
const settingsComposable = useSettings()
const settings = settingsComposable.settings
const { toggleDarkMode, toggleSecondarySidebar, toggleAside, toggleLineNumbers, toggleWordWrap, updateSetting, resetSettings } = settingsComposable

// Watch darkMode and apply to document
watch(
  () => settings.value.darkMode,
  (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true }
)

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

// FileTree handlers
const handleFileClick = (item: TreeItem) => {
  if (item.type === 'file' && item.id) {
    activeComponentId.value = item.id
    const element = document.getElementById(item.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<template>
  <MultiColumnLayout
    :show-secondary-sidebar="settings.showSecondarySidebar"
    :show-aside="settings.showAside"
    :show-footer="true"
  >
    <!-- Icon Sidebar -->
    <template #icon-sidebar>
      <nav class="mt-4">
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
        <!-- Branding Icon -->
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Vue UI"
          />
        </div>

        <!-- Separator -->
        <div class="h-6 w-px bg-zinc-900/10 dark:bg-white/10" aria-hidden="true"></div>

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
              {{ settings.darkMode ? '☀️' : '🌙' }}
            </Button>

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
      <div class="vscode-statusbar flex h-full items-center justify-between px-4 text-sm text-zinc-700 dark:text-white">
        <div class="flex h-full items-center gap-x-4">
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
        <div class="flex h-full items-center gap-x-4">
          <button class="vscode-statusbar-item rounded px-2 py-0.5">Vue 3.5.13</button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">TypeScript</button>
          <button class="vscode-statusbar-item rounded px-2 py-0.5">UTF-8</button>
          <button class="rounded px-2 py-0.5 hover:bg-indigo-700 dark:hover:bg-indigo-800">LF</button>
        </div>
      </div>
    </template>

    <!-- Secondary Sidebar -->
    <template #secondary-sidebar>
      <div class="flex h-full flex-col">
        <!-- Search Bar -->
        <div class="shrink-0 border-b border-zinc-200 p-3 dark:border-white/10">
          <div class="relative">
            <MagnifyingGlassIcon
              class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search components..."
              class="w-full rounded-md border border-zinc-300 bg-white py-2 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
            />
          </div>
        </div>

        <!-- File Tree -->
        <div class="flex-1 overflow-y-auto py-3">
          <FileTree
            :items="componentTree"
            :active-id="activeComponentId"
            :search-query="searchQuery"
            @item-click="handleFileClick"
          />
        </div>
      </div>
    </template>

    <!-- Main Content -->
    <MainContent />

    <!-- Right Aside -->
    <template #aside>
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <Heading :level="3" class="mb-4">Settings</Heading>
        <SettingsPanel
          :settings="settings"
          @toggle-dark-mode="toggleDarkMode"
          @toggle-secondary-sidebar="toggleSecondarySidebar"
          @toggle-aside="toggleAside"
          @toggle-line-numbers="toggleLineNumbers"
          @toggle-word-wrap="toggleWordWrap"
          @update-font-size="(size) => updateSetting('fontSize', size)"
          @reset="resetSettings"
        />
      </div>
    </template>
  </MultiColumnLayout>
</template>
