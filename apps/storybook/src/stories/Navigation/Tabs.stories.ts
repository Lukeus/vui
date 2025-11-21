import type { Meta, StoryObj } from '@storybook/vue3'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, TabList, Tab, TabPanels, TabPanel },
    setup() {
      const selectedIndex = ref(0)
      return { args, selectedIndex }
    },
    template: `
      <Tabs v-model="selectedIndex">
        <TabList>
          <Tab>Recent</Tab>
          <Tab>Popular</Tab>
          <Tab>Trending</Tab>
        </TabList>
        <TabPanels class="mt-2">
          <TabPanel class="p-3 rounded-xl bg-white dark:bg-white/5">
            <ul>
              <li class="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-white/5">
                <h3 class="text-sm font-medium leading-5">Does drinking coffee make you smarter?</h3>
              </li>
              <li class="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-white/5">
                <h3 class="text-sm font-medium leading-5">So you've bought coffee... now what?</h3>
              </li>
            </ul>
          </TabPanel>
          <TabPanel class="p-3 rounded-xl bg-white dark:bg-white/5">
            <ul>
              <li class="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-white/5">
                <h3 class="text-sm font-medium leading-5">Is tech making coffee better or worse?</h3>
              </li>
            </ul>
          </TabPanel>
          <TabPanel class="p-3 rounded-xl bg-white dark:bg-white/5">
            <ul>
              <li class="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-white/5">
                <h3 class="text-sm font-medium leading-5">Ask Me Anything: 10 answers to your questions about coffee</h3>
              </li>
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    `,
  }),
}
