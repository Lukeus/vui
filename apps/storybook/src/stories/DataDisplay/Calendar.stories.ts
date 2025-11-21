import type { Meta, StoryObj } from '@storybook/vue3'
import { Calendar } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Calendar> = {
  title: 'DataDisplay/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(new Date())
      return { args, date }
    },
    template: `
      <div class="max-w-md mx-auto">
        <Calendar v-model="date" />
      </div>
    `,
  }),
}
