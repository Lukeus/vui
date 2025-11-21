import type { Meta, StoryObj } from '@storybook/vue3'
import { ProgressBar } from '@vue-ui/ui'

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100 } },
    color: {
      control: 'select',
      options: ['indigo', 'blue', 'green', 'red', 'yellow', 'purple', 'pink'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    progress: 45,
    label: 'Uploading...',
    color: 'indigo',
  },
}
