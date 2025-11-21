import type { Meta, StoryObj } from '@storybook/vue3'
import { Link } from '@vue-ui/ui'

const meta: Meta<typeof Link> = {
  title: 'Base/Link',
  component: Link,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: '#',
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Click me</Link>',
  }),
}
