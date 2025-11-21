import type { Meta, StoryObj } from '@storybook/vue3'
import { Radio, RadioGroup } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => ({
    components: { Radio, RadioGroup },
    setup() {
      const selected = ref('startup')
      return { args, selected }
    },
    template: `
      <RadioGroup v-model="selected" class="flex gap-4">
        <Radio value="startup" label="Startup" description="12GB/6CPUs" />
        <Radio value="business" label="Business" description="16GB/8CPUs" />
        <Radio value="enterprise" label="Enterprise" description="32GB/12CPUs" />
      </RadioGroup>
    `,
  }),
}
