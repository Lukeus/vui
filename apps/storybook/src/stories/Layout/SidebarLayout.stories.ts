import type { Meta, StoryObj } from '@storybook/vue3'
import { Sidebar, SidebarLayout } from '@vue-ui/ui'

const meta: Meta<typeof SidebarLayout> = {
  title: 'Layout/SidebarLayout',
  component: SidebarLayout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayout>

export const Default: Story = {
  render: (args) => ({
    components: { SidebarLayout, Sidebar },
    template: `
      <SidebarLayout>
        <template #sidebar>
          <Sidebar>
            <div class="p-6">Sidebar Content</div>
          </Sidebar>
        </template>
        <div class="p-6">Main Content Area</div>
      </SidebarLayout>
    `,
  }),
}
