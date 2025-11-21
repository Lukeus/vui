import type { Meta, StoryObj } from '@storybook/vue3'
import { Navbar } from '@vue-ui/ui'

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  render: (args) => ({
    components: { Navbar },
    template: `
      <Navbar>\n        <template #logo>\n          <span class="font-bold text-xl">Logo</span>\n        </template>\n        <template #default>\n          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Product</a>\n          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Features</a>\n          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Marketplace</a>\n          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Company</a>\n        </template>\n        <template #right>\n          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Log in</a>\n        </template>\n      </Navbar>
    `,
  }),
}
