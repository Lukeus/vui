// Export all components
// Base
export { default as Badge } from './components/Badge.vue'
export type { BadgeColor, BadgeSize } from './components/Badge.vue'
export { default as Button } from './components/Button.vue'
export type { ButtonColor } from './components/Button.vue'
export { default as Input } from './components/Input.vue'
export type { InputType } from './components/Input.vue'
export { default as Link } from './components/Link.vue'
export { default as Text } from './components/Text.vue'

// Form Components
export { default as Checkbox } from './components/Checkbox.vue'
export { default as Fieldset } from './components/Fieldset.vue'
export { default as Radio } from './components/Radio.vue'
export { default as RadioGroup } from './components/RadioGroup.vue'
export { default as Select } from './components/Select.vue'
export { default as Textarea } from './components/Textarea.vue'
export { default as Toggle } from './components/Toggle.vue'

// Text & Typography
export { default as Heading } from './components/Heading.vue'

// Layout
export { default as Card } from './components/Card.vue'
export { default as Container } from './components/Container.vue'
export { default as Divider } from './components/Divider.vue'

// Data Display
export { default as Avatar } from './components/Avatar.vue'
export { default as Calendar } from './components/Calendar.vue'
export { default as Combobox } from './components/Combobox.vue'
export { default as DescriptionList } from './components/DescriptionList.vue'
export { default as DescriptionListItem } from './components/DescriptionListItem.vue'
export { default as Stats } from './components/Stats.vue'
export type { StatItem } from './components/Stats.vue'
export { default as Table } from './components/Table.vue'

// Feedback
export { default as Alert } from './components/Alert.vue'
export { default as EmptyState } from './components/EmptyState.vue'
export { default as ProgressBar } from './components/ProgressBar.vue'
export { default as Skeleton } from './components/Skeleton.vue'
export { default as Tooltip } from './components/Tooltip.vue'

// Overlays
export { default as CommandPalette } from './components/CommandPalette.vue'
export type { CommandPaletteGroup, CommandPaletteItem } from './components/CommandPalette.vue'
export { default as Dialog } from './components/Dialog.vue'
export { default as DialogTitle } from './components/DialogTitle.vue'
export { default as Drawer } from './components/Drawer.vue'
export { default as Dropdown } from './components/Dropdown.vue'
export { default as DropdownButton } from './components/DropdownButton.vue'
export { default as DropdownItem } from './components/DropdownItem.vue'
export { default as DropdownMenu } from './components/DropdownMenu.vue'
export { default as Toast } from './components/Toast.vue'
export { default as ToastContainer } from './components/ToastContainer.vue'
export type { ToastProps } from './components/Toast.vue'

// Navigation
export { default as Breadcrumbs } from './components/Breadcrumbs.vue'
export { default as MultiColumnLayout } from './components/MultiColumnLayout.vue'
export { default as Navbar } from './components/Navbar.vue'
export { default as Pagination } from './components/Pagination.vue'
export { default as Sidebar } from './components/Sidebar.vue'
export { default as SidebarLayout } from './components/SidebarLayout.vue'
export { default as Tab } from './components/Tab.vue'
export { default as TabList } from './components/TabList.vue'
export { default as TabPanel } from './components/TabPanel.vue'
export { default as TabPanels } from './components/TabPanels.vue'
export { default as Tabs } from './components/Tabs.vue'

// Export utilities
export { cn } from './utils/classes'

// Export composables
export * from './composables'

// Export schemas
export * from './schemas'

// Re-export icons for convenience
export * from '@vue-ui/icons'
