import type { Meta, StoryObj } from '@storybook/vue3'
import { Alert, Button } from '@vue-ui/ui'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Attention needed',
    type: 'info',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">This is an alert message that needs your attention.</Alert>',
  }),
}

export const Success: Story = {
  args: {
    title: 'Order completed',
    type: 'success',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">Your order was placed successfully.</Alert>',
  }),
}

export const Warning: Story = {
  args: {
    title: 'Account limitations',
    type: 'warning',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">Your account has limited access until you verify your email.</Alert>',
  }),
}

export const Error: Story = {
  args: {
    title: 'Payment failed',
    type: 'error',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">There was an issue processing your payment.</Alert>',
  }),
}

export const WithActions: Story = {
  args: {
    title: 'Update available',
    type: 'info',
  },
  render: (args) => ({
    components: { Alert, Button },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <template #actions>
          <div class="-mx-2 -my-1.5 flex">
            <button type="button" class="rounded-md bg-blue-50 px-2 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900">View status</button>
            <button type="button" class="ml-3 rounded-md bg-blue-50 px-2 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900">Dismiss</button>
          </div>
        </template>
      </Alert>
    `,
  }),
}
