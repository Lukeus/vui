export interface TreeItem {
  name: string
  type: 'folder' | 'file'
  id?: string
  children?: TreeItem[]
  expanded?: boolean
  icon?: string
}

export const componentTree: TreeItem[] = [
  {
    name: 'Base',
    type: 'folder',
    expanded: true,
    children: [
      { name: 'Button.vue', type: 'file', id: 'button' },
      { name: 'Input.vue', type: 'file', id: 'input' },
      { name: 'Badge.vue', type: 'file', id: 'badge' },
      { name: 'Link.vue', type: 'file', id: 'link' },
      { name: 'Text.vue', type: 'file', id: 'text' },
    ],
  },
  {
    name: 'Forms',
    type: 'folder',
    expanded: true,
    children: [
      { name: 'Checkbox.vue', type: 'file', id: 'checkbox' },
      { name: 'Radio.vue', type: 'file', id: 'radio' },
      { name: 'RadioGroup.vue', type: 'file', id: 'radiogroup' },
      { name: 'Select.vue', type: 'file', id: 'select' },
      { name: 'Textarea.vue', type: 'file', id: 'textarea' },
      { name: 'Fieldset.vue', type: 'file', id: 'fieldset' },
      { name: 'Toggle.vue', type: 'file', id: 'toggle' },
      { name: 'Combobox.vue', type: 'file', id: 'combobox' },
    ],
  },
  {
    name: 'Navigation',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'Navbar.vue', type: 'file', id: 'navbar' },
      { name: 'Sidebar.vue', type: 'file', id: 'sidebar' },
      { name: 'Breadcrumbs.vue', type: 'file', id: 'breadcrumbs' },
      { name: 'Tabs.vue', type: 'file', id: 'tabs' },
      { name: 'Pagination.vue', type: 'file', id: 'pagination' },
    ],
  },
  {
    name: 'Overlays',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'Dialog.vue', type: 'file', id: 'dialog' },
      { name: 'Dropdown.vue', type: 'file', id: 'dropdown' },
      { name: 'CommandPalette.vue', type: 'file', id: 'commandpalette' },
      { name: 'Tooltip.vue', type: 'file', id: 'tooltip' },
    ],
  },
  {
    name: 'Data Display',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'Avatar.vue', type: 'file', id: 'avatar' },
      { name: 'Table.vue', type: 'file', id: 'table' },
      { name: 'Calendar.vue', type: 'file', id: 'calendar' },
    ],
  },
  {
    name: 'Feedback',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'Alert.vue', type: 'file', id: 'alert' },
      { name: 'EmptyState.vue', type: 'file', id: 'emptystate' },
      { name: 'ProgressBar.vue', type: 'file', id: 'progressbar' },
      { name: 'Skeleton.vue', type: 'file', id: 'skeleton' },
    ],
  },
  {
    name: 'Layout',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'Card.vue', type: 'file', id: 'card' },
      { name: 'Container.vue', type: 'file', id: 'container' },
      { name: 'Divider.vue', type: 'file', id: 'divider' },
      { name: 'SidebarLayout.vue', type: 'file', id: 'sidebarlayout' },
      { name: 'MultiColumnLayout.vue', type: 'file', id: 'multicolumnlayout' },
    ],
  },
]
