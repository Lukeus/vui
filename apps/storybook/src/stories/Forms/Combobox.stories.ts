import type { Meta, StoryObj } from '@storybook/vue3'
import { Combobox } from '@vue-ui/ui'
import { ref } from 'vue'

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    options: { control: 'object' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    nullable: { control: 'boolean' },
    shouldFilter: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

const options = [
  { value: 1, label: 'Wade Cooper' },
  { value: 2, label: 'Arlene Mccoy' },
  { value: 3, label: 'Devon Webb' },
  { value: 4, label: 'Tom Cook' },
  { value: 5, label: 'Tanya Fox' },
  { value: 6, label: 'Hellen Schmidt' },
]

export const Default: Story = {
  args: {
    options,
    modelValue: null,
    placeholder: 'Select a person',
  },
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: '<Combobox v-bind="args" v-model="selected" />',
  }),
}

export const AsyncLoading: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: 'Searching...',
  },
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<Combobox v-bind="args" v-model="selected" />',
  }),
}

export const CustomEmptyMessage: Story = {
  args: {
    options: [],
    emptyMessage: 'No results found for your query.',
    placeholder: 'Type something...',
  },
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref(null)
      return { args, selected }
    },
    template: '<Combobox v-bind="args" v-model="selected" />',
  }),
}
