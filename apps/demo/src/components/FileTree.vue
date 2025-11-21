<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeItem } from '../data/component-tree'

/**
 * FileTree component for displaying hierarchical file/folder structure
 * @property {TreeItem[]} items - Tree data structure
 * @property {string} activeId - ID of the currently active item
 * @property {string} searchQuery - Optional search filter
 */
interface FileTreeProps {
  items: TreeItem[]
  activeId?: string
  searchQuery?: string
}

const props = withDefaults(defineProps<FileTreeProps>(), {
  activeId: '',
  searchQuery: '',
})

const emit = defineEmits<{
  'item-click': [item: TreeItem]
  'folder-toggle': [item: TreeItem]
}>()

// Local state for expanded folders
const expandedFolders = ref<Set<string>>(new Set())

// Initialize expanded state from items
props.items.forEach((item) => {
  if (item.expanded) {
    expandedFolders.value.add(item.name)
  }
})

const toggleFolder = (item: TreeItem) => {
  if (item.type !== 'folder') return

  if (expandedFolders.value.has(item.name)) {
    expandedFolders.value.delete(item.name)
  } else {
    expandedFolders.value.add(item.name)
  }

  emit('folder-toggle', item)
}

const handleItemClick = (item: TreeItem) => {
  if (item.type === 'folder') {
    toggleFolder(item)
  } else {
    emit('item-click', item)
  }
}

// Filter items based on search query
const filteredItems = computed(() => {
  if (!props.searchQuery) return props.items

  const query = props.searchQuery.toLowerCase()

  return props.items
    .map((folder) => {
      if (folder.type === 'folder' && folder.children) {
        const filteredChildren = folder.children.filter((child) => child.name.toLowerCase().includes(query))

        if (filteredChildren.length > 0) {
          // Auto-expand folders with matches
          if (!expandedFolders.value.has(folder.name)) {
            expandedFolders.value.add(folder.name)
          }
          return { ...folder, children: filteredChildren }
        }
      }
      return null
    })
    .filter((item): item is TreeItem => item !== null)
})

const isFolderExpanded = (folderName: string) => {
  return expandedFolders.value.has(folderName)
}
</script>

<template>
  <div class="vscode-tree">
    <div v-for="item in filteredItems" :key="item.name" class="tree-folder">
      <!-- Folder -->
      <div
        v-if="item.type === 'folder'"
        class="vscode-tree-item vscode-tree-folder flex cursor-pointer items-center gap-2 py-1 pl-2 text-sm"
        @click="handleItemClick(item)"
      >
        <!-- Chevron -->
        <svg
          class="size-4 shrink-0 transition-transform"
          :class="{ 'rotate-90': isFolderExpanded(item.name) }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Folder Icon -->
        <svg
          class="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>

        <span>{{ item.name }}</span>
      </div>

      <!-- Children (when folder is expanded) -->
      <div v-if="item.type === 'folder' && item.children && isFolderExpanded(item.name)" class="tree-children">
        <div
          v-for="child in item.children"
          :key="child.name"
          class="vscode-tree-item vscode-tree-file flex cursor-pointer items-center gap-2 py-1 pl-9 text-sm"
          :class="{ active: child.id === activeId }"
          @click="handleItemClick(child)"
        >
          <!-- File Icon -->
          <svg
            class="size-4 shrink-0 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <span>{{ child.name }}</span>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div
      v-if="searchQuery && filteredItems.length === 0"
      class="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400"
    >
      No components found for "{{ searchQuery }}"
    </div>
  </div>
</template>
