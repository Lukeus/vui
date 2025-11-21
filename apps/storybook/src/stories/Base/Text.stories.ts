import type { Meta, StoryObj } from '@storybook/vue3'
import { Text } from '@vue-ui/ui'

const meta: Meta<typeof Text> = {
  title: 'Base/Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: () => ({
    components: { Text },
    template: '<Text>The quick brown fox jumps over the lazy dog.</Text>',
  }),
}
