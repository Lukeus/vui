import type { Meta, StoryObj } from '@storybook/vue3'
import { Button, Dialog, DialogTitle } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: (args) => ({
    components: { Dialog, DialogTitle, Button },
    setup() {
      const isOpen = ref(false)
      const setIsOpen = (value: boolean) => {
        isOpen.value = value
      }
      return { args, isOpen, setIsOpen }
    },
    template: `
      <Button @click="setIsOpen(true)">Open dialog</Button>
      <Dialog :open="isOpen" @close="setIsOpen(false)">
        <DialogTitle class="font-bold text-lg">Payment successful</DialogTitle>
        <div class="mt-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
          </p>
        </div>
        <div class="mt-4">
          <Button color="light" @click="setIsOpen(false)">Got it, thanks!</Button>
        </div>
      </Dialog>
    `,
  }),
}
