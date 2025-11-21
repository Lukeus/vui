import type { Meta, StoryObj } from '@storybook/vue3'
import { Fieldset } from '@vue-ui/ui'

const meta: Meta<typeof Fieldset> = {
  title: 'Forms/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Fieldset>

export const Default: Story = {
  render: (args) => ({
    components: { Fieldset },
    template: `
      <Fieldset>
        <legend class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Notifications</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">We'll always let you know about important changes, but you pick what else you want to hear about.</p>
      </Fieldset>
    `,
  }),
}
