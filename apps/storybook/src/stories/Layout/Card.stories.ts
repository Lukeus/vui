import type { Meta, StoryObj } from '@storybook/vue3'
import { Card } from '@vue-ui/ui'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    template: `
      <Card class="max-w-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Applicant Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application.</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-white/10">
          <dl class="sm:divide-y sm:divide-gray-200 dark:sm:divide-white/10">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">Margot Foster</dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Application for</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">Backend Developer</dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">margotfoster@example.com</dd>
            </div>
          </dl>
        </div>
      </Card>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="space-y-4 max-w-md">
        <Card variant="outlined">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white">Outlined Card</h4>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Simple border with no elevation.</p>
        </Card>
        <Card variant="elevated">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white">Elevated Card (Default)</h4>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Raised appearance with shadow.</p>
        </Card>
        <Card variant="filled">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white">Filled Card</h4>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Filled background with subtle styling.</p>
        </Card>
      </div>
    `,
  }),
}
