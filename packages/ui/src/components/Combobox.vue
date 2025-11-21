<script setup lang="ts">
import {
  ComboboxButton,
  Combobox as HeadlessCombobox,
  ComboboxInput as HeadlessComboboxInput,
  ComboboxOption as HeadlessComboboxOption,
  ComboboxOptions as HeadlessComboboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { computed, ref, watch } from 'vue'
import type { ComboboxOption } from '../schemas'
import { cn } from '../utils/classes'

interface ComboboxProps {
  modelValue?: string | number | null
  options: ComboboxOption[]
  placeholder?: string
  nullable?: boolean
  disabled?: boolean
  class?: string
  loading?: boolean
  emptyMessage?: string
  shouldFilter?: boolean
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  modelValue: null,
  placeholder: 'Select option...',
  nullable: false,
  disabled: false,
  class: '',
  loading: false,
  emptyMessage: 'Nothing found.',
  shouldFilter: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'query-change': [query: string]
}>()

const query = ref('')

watch(query, (newQuery) => {
  emit('query-change', newQuery)
})

const filteredOptions = computed(() => {
  if (!props.shouldFilter) return props.options
  if (query.value === '') {
    return props.options
  }
  return props.options.filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase()))
})

const selectedOption = computed(() => props.options.find((option) => option.value === props.modelValue))

const displayValue = computed(() => {
  if (!selectedOption.value) return ''
  return selectedOption.value.label
})

const handleChange = (value: string | number | null) => {
  emit('update:modelValue', value)
}

const containerClass = computed(() => cn('relative', props.class))
</script>

<template>
  <HeadlessCombobox
    :model-value="modelValue"
    :nullable="nullable"
    :disabled="disabled"
    :class="containerClass"
    @update:model-value="handleChange"
  >
    <div class="relative">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm dark:bg-gray-800"
      >
        <HeadlessComboboxInput
          class="w-full border-none py-2 pr-10 pl-3 text-sm leading-5 text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white"
          :display-value="() => displayValue"
          :placeholder="placeholder"
          @change="query = $event.target.value"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>

      <HeadlessComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-gray-800"
      >
        <div v-if="loading" class="relative cursor-default px-4 py-2 text-gray-700 select-none dark:text-gray-400">
          Loading...
        </div>
        <div
          v-else-if="filteredOptions.length === 0 && query !== ''"
          class="relative cursor-default px-4 py-2 text-gray-700 select-none dark:text-gray-400"
        >
          {{ emptyMessage }}
        </div>

        <HeadlessComboboxOption
          v-for="option in filteredOptions"
          :key="option.value"
          v-slot="{ selected, active }"
          :value="option.value"
          :disabled="option.disabled"
          as="template"
        >
          <li
            :class="
              cn(
                'relative cursor-default py-2 pr-4 pl-10 select-none',
                active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-white',
                option.disabled && 'cursor-not-allowed opacity-50'
              )
            "
          >
            <span :class="cn('block truncate', selected ? 'font-medium' : 'font-normal')">
              {{ option.label }}
            </span>
            <span
              v-if="selected"
              :class="cn('absolute inset-y-0 left-0 flex items-center pl-3', active ? 'text-white' : 'text-blue-600')"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessComboboxOption>
      </HeadlessComboboxOptions>
    </div>
  </HeadlessCombobox>
</template>
