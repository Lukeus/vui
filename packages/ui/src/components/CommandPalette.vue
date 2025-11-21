<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import { cn } from '../utils/classes'

export interface CommandPaletteItem {
  id: string | number
  name: string
  icon?: unknown
  shortcut?: string
  url?: string
  category?: string
  action?: () => void
}

export interface CommandPaletteGroup {
  name: string
  items: CommandPaletteItem[]
}

/**
 * CommandPalette component for quick navigation and actions
 * @property {boolean} open - Controls visibility of the command palette
 * @property {CommandPaletteItem[]} items - List of available commands
 * @property {CommandPaletteItem[]} recentItems - Recently used commands
 * @property {CommandPaletteGroup[]} groups - Grouped commands for organization
 * @property {string} placeholder - Placeholder text for search input
 * @property {string} emptyMessage - Message shown when no results found
 */
interface CommandPaletteProps {
  open?: boolean
  items?: CommandPaletteItem[]
  recentItems?: CommandPaletteItem[]
  groups?: CommandPaletteGroup[]
  placeholder?: string
  emptyMessage?: string
}

const props = withDefaults(defineProps<CommandPaletteProps>(), {
  open: false,
  items: () => [],
  recentItems: () => [],
  groups: () => [],
  placeholder: 'Search...',
  emptyMessage: "We couldn't find any matches. Please try again.",
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  select: [item: CommandPaletteItem]
}>()

const query = ref('')

const filteredItems = computed(() => {
  if (query.value === '') {
    return []
  }

  const searchQuery = query.value.toLowerCase()
  return props.items.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery) || item.category?.toLowerCase().includes(searchQuery)
  })
})

const filteredGroups = computed(() => {
  if (query.value === '') {
    return []
  }

  const searchQuery = query.value.toLowerCase()
  return props.groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.name.toLowerCase().includes(searchQuery)),
    }))
    .filter((group) => group.items.length > 0)
})

const hasResults = computed(() => {
  return filteredItems.value.length > 0 || filteredGroups.value.length > 0
})

const handleClose = () => {
  emit('update:open', false)
  query.value = ''
}

const handleSelect = (item: CommandPaletteItem) => {
  if (item.action) {
    item.action()
  } else if (item.url) {
    window.location.href = item.url
  }
  emit('select', item)
  handleClose()
}

const handleAfterLeave = () => {
  query.value = ''
}
</script>

<template>
  <TransitionRoot :show="open" as="template" appear @after-leave="handleAfterLeave">
    <Dialog class="relative z-50" @close="handleClose">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-500/25 transition-opacity dark:bg-zinc-900/50" />
      </TransitionChild>

      <!-- Command palette container -->
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-2xl transform divide-y divide-zinc-500/10 overflow-hidden rounded-xl bg-white/80 shadow-2xl outline outline-1 outline-black/5 backdrop-blur-sm backdrop-filter transition-all dark:divide-white/10 dark:bg-zinc-900/80 dark:-outline-offset-1 dark:outline-white/10"
          >
            <Combobox @update:model-value="handleSelect">
              <!-- Search input -->
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute top-3.5 left-4 size-5 text-zinc-900/40 dark:text-zinc-500"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pr-4 pl-11 text-zinc-900 outline-hidden placeholder:text-zinc-500 focus:ring-0 sm:text-sm dark:text-white dark:placeholder:text-zinc-400"
                  :placeholder="placeholder"
                  @change="query = $event.target.value"
                />
              </div>

              <!-- Results -->
              <ComboboxOptions
                v-if="query === '' || hasResults"
                static
                as="div"
                class="max-h-80 scroll-py-2 overflow-y-auto"
              >
                <!-- Recent items (shown when no query) -->
                <div v-if="query === '' && recentItems.length > 0" class="p-2">
                  <h2 class="mt-4 mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-white">Recent searches</h2>
                  <ul class="text-sm text-zinc-700 dark:text-zinc-300">
                    <ComboboxOption
                      v-for="item in recentItems"
                      :key="item.id"
                      :value="item"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="
                          cn(
                            'flex cursor-default items-center rounded-md px-3 py-2 select-none',
                            active && 'bg-zinc-900/5 text-zinc-900 outline-hidden dark:bg-white/5 dark:text-white'
                          )
                        "
                      >
                        <component
                          :is="item.icon"
                          v-if="item.icon"
                          :class="
                            cn(
                              'size-6 flex-none',
                              !active && 'text-zinc-900/40 dark:text-zinc-500',
                              active && 'text-zinc-900 dark:text-white'
                            )
                          "
                          aria-hidden="true"
                        />
                        <span class="ml-3 flex-auto truncate">{{ item.name }}</span>
                        <span v-if="active" class="ml-3 flex-none text-zinc-500 dark:text-zinc-400"> Jump to... </span>
                      </li>
                    </ComboboxOption>
                  </ul>
                </div>

                <!-- Grouped results -->
                <div v-if="query !== '' && filteredGroups.length > 0">
                  <div v-for="group in filteredGroups" :key="group.name" class="p-2">
                    <h2 class="mt-4 mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-white">
                      {{ group.name }}
                    </h2>
                    <ul class="text-sm text-zinc-700 dark:text-zinc-300">
                      <ComboboxOption
                        v-for="item in group.items"
                        :key="item.id"
                        :value="item"
                        as="template"
                        v-slot="{ active }"
                      >
                        <li
                          :class="
                            cn(
                              'flex cursor-default items-center rounded-md px-3 py-2 select-none',
                              active && 'bg-zinc-900/5 text-zinc-900 outline-hidden dark:bg-white/5 dark:text-white'
                            )
                          "
                        >
                          <component
                            :is="item.icon"
                            v-if="item.icon"
                            :class="
                              cn(
                                'size-6 flex-none',
                                !active && 'text-zinc-900/40 dark:text-zinc-500',
                                active && 'text-zinc-900 dark:text-white'
                              )
                            "
                            aria-hidden="true"
                          />
                          <span class="ml-3 flex-auto truncate">{{ item.name }}</span>
                          <span
                            v-if="item.shortcut"
                            class="ml-3 flex-none text-xs font-semibold text-zinc-500 dark:text-zinc-400"
                          >
                            <kbd class="font-sans">⌘</kbd>
                            <kbd class="font-sans">{{ item.shortcut }}</kbd>
                          </span>
                        </li>
                      </ComboboxOption>
                    </ul>
                  </div>
                </div>

                <!-- Ungrouped filtered items -->
                <div v-if="query !== '' && filteredItems.length > 0" class="p-2">
                  <ul class="text-sm text-zinc-700 dark:text-zinc-300">
                    <ComboboxOption
                      v-for="item in filteredItems"
                      :key="item.id"
                      :value="item"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="
                          cn(
                            'flex cursor-default items-center rounded-md px-3 py-2 select-none',
                            active && 'bg-zinc-900/5 text-zinc-900 outline-hidden dark:bg-white/5 dark:text-white'
                          )
                        "
                      >
                        <component
                          :is="item.icon"
                          v-if="item.icon"
                          :class="
                            cn(
                              'size-6 flex-none',
                              !active && 'text-zinc-900/40 dark:text-zinc-500',
                              active && 'text-zinc-900 dark:text-white'
                            )
                          "
                          aria-hidden="true"
                        />
                        <span class="ml-3 flex-auto truncate">{{ item.name }}</span>
                        <span
                          v-if="item.shortcut"
                          class="ml-3 flex-none text-xs font-semibold text-zinc-500 dark:text-zinc-400"
                        >
                          <kbd class="font-sans">⌘</kbd>
                          <kbd class="font-sans">{{ item.shortcut }}</kbd>
                        </span>
                      </li>
                    </ComboboxOption>
                  </ul>
                </div>
              </ComboboxOptions>

              <!-- Empty state -->
              <div v-if="query !== '' && !hasResults" class="px-6 py-14 text-center sm:px-14">
                <MagnifyingGlassIcon class="mx-auto size-6 text-zinc-900/40 dark:text-zinc-500" aria-hidden="true" />
                <p class="mt-4 text-sm text-zinc-900 dark:text-zinc-300">
                  {{ emptyMessage }}
                </p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
