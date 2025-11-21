import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge } from '@vue-ui/ui'

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
        'zinc',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    color: 'zinc',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-3">
        <Badge size="sm" color="blue">Small</Badge>
        <Badge size="md" color="blue">Medium</Badge>
        <Badge size="lg" color="blue">Large</Badge>
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge color="blue">Blue</Badge>
        <Badge color="green">Green</Badge>
        <Badge color="red">Red</Badge>
        <Badge color="amber">Amber</Badge>
        <Badge color="zinc">Zinc</Badge>
      </div>
    `,
  }),
}
