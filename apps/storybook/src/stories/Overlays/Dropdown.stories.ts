import type { Meta, StoryObj } from '@storybook/vue3'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@vue-ui/ui'

const meta: Meta<typeof Dropdown> = {
  title: 'Overlays/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args) => ({
    components: { Dropdown, DropdownButton, DropdownMenu, DropdownItem },
    template: `
      <Dropdown>
        <DropdownButton>Options</DropdownButton>
        <DropdownMenu>
          <DropdownItem href="#">Account settings</DropdownItem>
          <DropdownItem href="#">Support</DropdownItem>
          <DropdownItem href="#">License</DropdownItem>
          <DropdownItem href="#">Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    `,
  }),
}
