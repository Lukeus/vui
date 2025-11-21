import type { Meta, StoryObj } from '@storybook/vue3'
import { Pagination } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<Pagination v-bind="args" v-model:currentPage="page" />',
  }),
}

export const Localized: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    ariaLabel: 'Navegación de páginas',
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<Pagination v-bind="args" v-model:currentPage="page" />',
  }),
}
