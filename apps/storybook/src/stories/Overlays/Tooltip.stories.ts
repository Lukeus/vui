import type { Meta, StoryObj } from '@storybook/vue3'
import { Button, Tooltip } from '@vue-ui/ui'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    placement: 'top',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    placement: 'left',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    placement: 'right',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="grid grid-cols-2 gap-8 p-8">
        <div class="flex min-h-[150px] items-center justify-center">
          <Tooltip content="Top tooltip" placement="top">
            <Button>Top</Button>
          </Tooltip>
        </div>
        <div class="flex min-h-[150px] items-center justify-center">
          <Tooltip content="Bottom tooltip" placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </div>
        <div class="flex min-h-[150px] items-center justify-center">
          <Tooltip content="Left tooltip" placement="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
        <div class="flex min-h-[150px] items-center justify-center">
          <Tooltip content="Right tooltip" placement="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip placement="top">
          <Button>Hover for details</Button>
          <template #content>
            <div class="space-y-1">
              <div class="font-semibold">Custom Content</div>
              <div class="text-xs opacity-90">You can pass any content here</div>
            </div>
          </template>
        </Tooltip>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex min-h-[200px] items-center justify-center">
        <Tooltip v-bind="args">
          <Button>Tooltip disabled</Button>
        </Tooltip>
      </div>
    `,
  }),
}
