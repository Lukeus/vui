import type { Meta, StoryObj } from '@storybook/vue3'
import { Divider } from '@vue-ui/ui'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: (args) => ({
    components: { Divider },
    template: `
      <div class="space-y-4">
        <div class="text-sm">Section A</div>
        <Divider />
        <div class="text-sm">Section B</div>
      </div>
    `,
  }),
}
