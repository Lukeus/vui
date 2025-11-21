import type { Meta, StoryObj } from '@storybook/vue3'
import { Textarea } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    resizable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Enter your description...',
    resizable: true,
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
}
