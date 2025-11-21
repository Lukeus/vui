import type { Meta, StoryObj } from '@storybook/vue3'
import { Toggle } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    color: {
      control: 'select',
      options: [
        'dark/zinc',
        'light',
        'dark/white',
        'dark',
        'white',
        'zinc',
        'indigo',
        'cyan',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'sky',
        'blue',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    color: 'dark/zinc',
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: '<Toggle v-bind="args" v-model="enabled" />',
  }),
}
