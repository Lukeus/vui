import { PlusIcon } from '@heroicons/vue/20/solid'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Button, EmptyState } from '@vue-ui/ui'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'No projects',
    description: 'Get started by creating a new project.',
  },
  render: (args) => ({
    components: { EmptyState, Button, PlusIcon },
    setup() {
      return { args }
    },
    template: `
      <EmptyState v-bind="args">
        <template #actions>
          <Button>
            <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Project
          </Button>
        </template>
      </EmptyState>
    `,
  }),
}
