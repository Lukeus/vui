<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import { cn } from '../utils/classes'

type CalendarMode = 'single' | 'range'

interface CalendarProps {
  modelValue?: Date | Date[] | null
  mode?: CalendarMode
  minDate?: Date
  maxDate?: Date
  class?: string
}

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: null,
  mode: 'single',
  class: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | Date[] | null]
}>()

const currentMonth = ref(new Date())

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const monthYear = computed(() => `${MONTHS[currentMonth.value.getMonth()]} ${currentMonth.value.getFullYear()}`)

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)

  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()

  const days: Array<{
    date: Date
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isInRange: boolean
    isDisabled: boolean
  }> = []

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevLastDate - i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isDisabled: isDateDisabled(date),
    })
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, new Date()),
      isSelected: isDateSelected(date),
      isInRange: isDateInRange(date),
      isDisabled: isDateDisabled(date),
    })
  }

  // Next month days
  const remainingDays = 42 - days.length // 6 weeks × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isDisabled: isDateDisabled(date),
    })
  }

  return days
})

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const isDateSelected = (date: Date) => {
  if (!props.modelValue) return false

  if (props.mode === 'single') {
    return isSameDay(date, props.modelValue as Date)
  } else {
    const dates = props.modelValue as Date[]
    return dates.some((d) => isSameDay(date, d))
  }
}

const isDateInRange = (date: Date) => {
  if (props.mode !== 'range' || !props.modelValue) return false

  const dates = props.modelValue as Date[]
  if (dates.length !== 2) return false

  const [start, end] = dates.sort((a, b) => a.getTime() - b.getTime())
  if (!start || !end) return false
  return date > start && date < end
}

const isDateDisabled = (date: Date) => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return false
}

const selectDate = (date: Date) => {
  if (isDateDisabled(date)) return

  if (props.mode === 'single') {
    emit('update:modelValue', date)
  } else {
    const dates = (props.modelValue as Date[]) || []
    if (dates.length === 0 || dates.length === 2) {
      emit('update:modelValue', [date])
    } else {
      emit(
        'update:modelValue',
        [...dates, date].sort((a, b) => a.getTime() - b.getTime())
      )
    }
  }
}

const previousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

const containerClass = computed(() =>
  cn('w-full max-w-sm rounded-lg bg-white p-4 shadow dark:bg-gray-800', props.class)
)
</script>

<template>
  <div :class="containerClass">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <button type="button" class="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700" @click="previousMonth">
        <ChevronLeftIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>

      <h2 class="text-sm font-semibold text-gray-900 dark:text-white">
        {{ monthYear }}
      </h2>

      <button type="button" class="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700" @click="nextMonth">
        <ChevronRightIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>

    <!-- Day names -->
    <div class="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-700 dark:text-gray-400">
      <div v-for="day in DAYS" :key="day">{{ day }}</div>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-1">
      <button
        v-for="(day, index) in calendarDays"
        :key="index"
        type="button"
        :disabled="day.isDisabled"
        :class="
          cn(
            'aspect-square rounded-lg text-sm',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'focus:ring-2 focus:ring-blue-500 focus:outline-none',
            !day.isCurrentMonth && 'text-gray-400 dark:text-gray-600',
            day.isCurrentMonth && 'text-gray-900 dark:text-white',
            day.isToday && 'font-bold ring-1 ring-blue-500',
            day.isSelected && 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500',
            day.isInRange && 'bg-blue-100 dark:bg-blue-900',
            day.isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent'
          )
        "
        @click="selectDate(day.date)"
      >
        {{ day.date.getDate() }}
      </button>
    </div>
  </div>
</template>
