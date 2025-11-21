import {
  Cog6ToothIcon,
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  HashtagIcon,
  HomeIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
import type { Meta, StoryObj } from '@storybook/vue3'
import { CommandPalette, type CommandPaletteGroup, type CommandPaletteItem } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof CommandPalette> = {
  title: 'Overlays/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    placeholder: { control: 'text' },
    emptyMessage: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CommandPalette>

const projects: CommandPaletteItem[] = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', url: '#', icon: FolderIcon },
  { id: 2, name: 'Acme Corp / Mobile App', url: '#', icon: FolderIcon },
  { id: 3, name: 'TechStart / Dashboard', url: '#', icon: FolderIcon },
]

const quickActions: CommandPaletteItem[] = [
  {
    id: 'new-file',
    name: 'Add new file...',
    icon: DocumentPlusIcon,
    shortcut: 'N',
    action: () => console.log('New file'),
  },
  {
    id: 'new-folder',
    name: 'Add new folder...',
    icon: FolderPlusIcon,
    shortcut: 'F',
    action: () => console.log('New folder'),
  },
  { id: 'add-tag', name: 'Add hashtag...', icon: HashtagIcon, shortcut: 'H', action: () => console.log('Add hashtag') },
  { id: 'add-label', name: 'Add label...', icon: TagIcon, shortcut: 'L', action: () => console.log('Add label') },
]

const groups: CommandPaletteGroup[] = [
  {
    name: 'Quick Actions',
    items: quickActions,
  },
  {
    name: 'Projects',
    items: projects,
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { CommandPalette },
    setup() {
      const open = ref(true)
      return { args, open, projects: projects.slice(0, 1) }
    },
    template: `
      <div>
        <button 
          @click="open = true"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Open Command Palette (⌘K)
        </button>
        <CommandPalette 
          v-bind="args"
          v-model:open="open"
          :items="projects"
          @select="(item) => console.log('Selected:', item)"
        />
      </div>
    `,
  }),
}

export const WithRecentItems: Story = {
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(false)
      return { open, projects, recent: projects.slice(0, 1) }
    },
    template: `
      <div>
        <button 
          @click="open = true"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Open Command Palette
        </button>
        <CommandPalette 
          v-model:open="open"
          :items="projects"
          :recent-items="recent"
          @select="(item) => console.log('Selected:', item)"
        />
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(false)
      return { open, groups }
    },
    template: `
      <div>
        <button 
          @click="open = true"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Open Command Palette with Groups
        </button>
        <CommandPalette 
          v-model:open="open"
          :groups="groups"
          @select="(item) => console.log('Selected:', item)"
        />
      </div>
    `,
  }),
}

export const NavigationExample: Story = {
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(false)
      const navigationItems: CommandPaletteItem[] = [
        { id: 'home', name: 'Go to Home', icon: HomeIcon, url: '#', shortcut: 'H' },
        { id: 'settings', name: 'Open Settings', icon: Cog6ToothIcon, url: '#settings', shortcut: ',' },
        { id: 'profile', name: 'View Profile', icon: UserIcon, url: '#profile', shortcut: 'P' },
      ]

      return { open, navigationItems }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Press ⌘K to open the command palette and quickly navigate
        </p>
        <button 
          @click="open = true"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Open Navigation Palette
        </button>
        <CommandPalette 
          v-model:open="open"
          :items="navigationItems"
          placeholder="Where do you want to go?"
          @select="(item) => console.log('Navigate to:', item)"
        />
      </div>
    `,
  }),
}

export const CustomEmptyMessage: Story = {
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(false)
      const items: CommandPaletteItem[] = [{ id: 1, name: 'Single Item', icon: FolderIcon }]
      return { open, items }
    },
    template: `
      <div>
        <button 
          @click="open = true"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Open with Custom Empty Message
        </button>
        <CommandPalette 
          v-model:open="open"
          :items="items"
          empty-message="No commands found. Try a different search term."
          @select="(item) => console.log('Selected:', item)"
        />
      </div>
    `,
  }),
}
