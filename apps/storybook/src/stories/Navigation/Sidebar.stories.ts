import type { Meta, StoryObj } from '@storybook/vue3'
import { Sidebar, SidebarLayout } from '@vue-ui/ui'

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: (args) => ({
    components: { Sidebar, SidebarLayout },
    template: `
      <SidebarLayout>
        <template #sidebar>
          <Sidebar>\n            <div class="px-6 py-4 font-bold text-xl">App</div>\n            <nav class="flex flex-1 flex-col px-6">\n              <ul role="list" class="flex flex-1 flex-col gap-y-7">\n                <li>\n                  <ul role="list" class="-mx-2 space-y-1">\n                    <li><a href="#" class="block rounded-md bg-gray-50 p-2 text-sm font-semibold leading-6 text-gray-700 dark:bg-gray-800 dark:text-white">Dashboard</a></li>\n                    <li><a href="#" class="block rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">Team</a></li>\n                    <li><a href="#" class="block rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">Projects</a></li>\n                  </ul>\n                </li>\n              </ul>\n            </nav>\n          </Sidebar>
        </template>
        <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <!-- Main area -->
          <div class="h-96 rounded-lg border-2 border-dashed border-gray-200 dark:border-white/10" />
        </div>
      </SidebarLayout>
    `,
  }),
}
