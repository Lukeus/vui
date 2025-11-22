<script setup lang="ts">
import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { computed } from 'vue'
import { useMobileSidebar } from '../composables/useLayout'
import { cn } from '../utils/classes'

/**
 * Multi-column layout component with VS Code-style interface
 * @property {string} iconSidebarWidth - Width class for icon sidebar (default: 'w-20')
 * @property {string} secondarySidebarWidth - Width class for secondary sidebar (default: 'w-96')
 * @property {string} asideWidth - Width class for right aside (default: 'w-96')
 * @property {string} navbarHeight - Height class for navbar (default: 'h-16')
 * @property {string} footerHeight - Height class for footer (default: 'h-6')
 * @property {boolean} navbarSticky - Enable sticky navbar positioning (default: true)
 * @property {boolean} showFooter - Show/hide bottom footer/status bar (default: false)
 * @property {boolean} showSecondarySidebar - Show/hide secondary sidebar on desktop (default: false)
 * @property {boolean} showAside - Show/hide right aside (default: false)
 * @property {string} class - Additional CSS classes
 */
interface MultiColumnLayoutProps {
  iconSidebarWidth?: string
  secondarySidebarWidth?: string
  asideWidth?: string
  navbarHeight?: string
  footerHeight?: string
  navbarSticky?: boolean
  showFooter?: boolean
  showSecondarySidebar?: boolean
  showAside?: boolean
  class?: string
}

const props = withDefaults(defineProps<MultiColumnLayoutProps>(), {
  iconSidebarWidth: 'w-20',
  secondarySidebarWidth: 'w-96',
  asideWidth: 'w-96',
  navbarHeight: 'h-16',
  footerHeight: 'h-6',
  navbarSticky: true,
  showFooter: false,
  showSecondarySidebar: false,
  showAside: false,
})

const { isOpen: mobileSidebarOpen, close: closeMobileSidebar, toggle: toggleMobileSidebar } = useMobileSidebar()

const mainAreaClasses = computed(() => cn('min-h-full'))

const navbarContainerClasses = computed(() => cn(props.navbarSticky && 'sticky top-0', 'z-40 shrink-0', 'w-full'))

const footerClasses = computed(() =>
  cn(
    'vscode-statusbar shrink-0 border-t border-zinc-200 dark:border-zinc-800',
    props.footerHeight
  )
)
</script>

<template>
  <div class="flex h-screen w-full flex-col overflow-hidden">
    <!-- Navbar spans full width at top -->
    <div :class="cn('vscode-navbar', navbarContainerClasses)">
      <slot name="navbar" :toggle-mobile-sidebar="toggleMobileSidebar" />
    </div>

    <!-- Main flex container with sidebars and content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Mobile Sidebar Dialog -->
      <TransitionRoot :show="mobileSidebarOpen" as="template">
        <HeadlessDialog class="relative z-50 lg:hidden" @close="closeMobileSidebar">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50" />
          </TransitionChild>

          <div class="fixed inset-0 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <HeadlessDialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <div class="flex grow flex-col overflow-y-auto bg-zinc-900 px-6 pb-2 ring-1 ring-white/10">
                  <slot name="icon-sidebar" />
                </div>
              </HeadlessDialogPanel>
            </TransitionChild>
          </div>
        </HeadlessDialog>
      </TransitionRoot>

      <!-- Desktop Icon Sidebar (fixed to flex container) -->
      <aside
        :class="
          cn(
            'vscode-icon-sidebar max-lg:hidden shrink-0 overflow-hidden border-r border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900',
            props.iconSidebarWidth
          )
        "
      >
        <slot name="icon-sidebar" />
      </aside>

      <!-- Desktop Secondary Sidebar (optional) -->
      <aside v-if="showSecondarySidebar" :class="cn('vscode-secondary-sidebar shrink-0 overflow-y-auto border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950', props.secondarySidebarWidth)">
        <slot name="secondary-sidebar" />
      </aside>

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-zinc-900" :class="mainAreaClasses">
        <slot />
      </main>

      <!-- Right Aside (optional) -->
      <aside v-if="showAside" :class="cn('vscode-aside shrink-0 overflow-y-auto border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950', props.asideWidth)">
        <slot name="aside" />
      </aside>
    </div>

    <!-- Footer / Status Bar spans full width at bottom -->
    <footer v-if="showFooter" :class="footerClasses">
      <slot name="footer" />
    </footer>
  </div>
</template>
