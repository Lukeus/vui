import type { Meta, StoryObj } from '@storybook/vue3'
import { Skeleton } from '@vue-ui/ui'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'card', 'avatar', 'button', 'circle', 'rectangle'],
    },
    lines: { control: 'number' },
    width: { control: 'text' },
    height: { control: 'text' },
    animate: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 1,
  },
}

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
}

export const Card: Story = {
  args: {
    variant: 'card',
    width: '300px',
  },
}

export const Avatar: Story = {
  args: {
    variant: 'avatar',
  },
}

export const Button: Story = {
  args: {
    variant: 'button',
    width: '120px',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '80px',
    height: '80px',
  },
}

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    width: '200px',
    height: '150px',
  },
}

export const WithoutAnimation: Story = {
  args: {
    variant: 'text',
    lines: 2,
    animate: false,
  },
}

export const UserCardLoading: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-80 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
        <div class="flex items-start gap-4">
          <Skeleton variant="avatar" />
          <div class="flex-1 space-y-3">
            <Skeleton width="60%" />
            <Skeleton variant="text" lines="2" />
            <Skeleton variant="button" width="100px" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const TableLoading: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-full max-w-2xl space-y-3 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
        <div class="flex items-center justify-between">
          <Skeleton width="150px" height="32px" />
          <Skeleton variant="button" width="100px" />
        </div>
        <div class="space-y-2">
          <Skeleton variant="text" lines="1" />
          <Skeleton variant="text" lines="1" />
          <Skeleton variant="text" lines="1" />
          <Skeleton variant="text" lines="1" />
        </div>
      </div>
    `,
  }),
}
