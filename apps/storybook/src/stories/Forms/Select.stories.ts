import type { Meta, StoryObj } from '@storybook/vue3'
import { Select } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    name: 'status',
    disabled: false,
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref('active')
      return { args, selected }
    },
    template: `
      <Select v-bind="args" v-model="selected">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </Select>
    `,
  }),
}
