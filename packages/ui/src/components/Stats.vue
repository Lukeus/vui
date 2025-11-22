<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { computed, type Component } from 'vue'
import { cn } from '../utils/classes'

type StatTrend = 'up' | 'down' | 'neutral'

/**
 * Single stat item for the Stats component
 */
export interface StatItem {
  label: string
  value: string | number
  change?: string
  trend?: StatTrend
  icon?: Component
}

/**
 * Stats component for displaying dashboard metrics
 * @property {StatItem[]} stats - Array of stat items to display
 * @property {boolean} border - Show border around stats
 * @property {string} class - Additional CSS classes
 */
interface StatsProps {
  stats: StatItem[]
  border?: boolean
  class?: string
}

const props = withDefaults(defineProps<StatsProps>(), {
  border: false,
})

const containerClasses = computed(() =>
  cn(
    'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4',
    props.border && 'rounded-lg border border-zinc-200 p-5 dark:border-zinc-800',
    props.class
  )
)

const getTrendColor = (trend?: StatTrend) => {
  if (!trend) return ''
  return {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-zinc-600 dark:text-zinc-400',
  }[trend]
}

const getTrendIcon = (trend?: StatTrend) => {
  if (!trend) return null
  return {
    up: ArrowUpIcon,
    down: ArrowDownIcon,
    neutral: null,
  }[trend]
}
</script>

<template>
  <div :class="containerClasses">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 dark:bg-zinc-900"
    >
      <div class="flex items-center">
        <div class="flex-1">
          <dt class="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {{ stat.label }}
          </dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {{ stat.value }}
          </dd>
        </div>
        <component
          v-if="stat.icon"
          :is="stat.icon"
          class="size-12 text-zinc-400 dark:text-zinc-600"
          aria-hidden="true"
        />
      </div>
      <div v-if="stat.change" class="mt-4 flex items-baseline text-sm">
        <component
          v-if="getTrendIcon(stat.trend)"
          :is="getTrendIcon(stat.trend)"
          :class="['mr-0.5 size-4 shrink-0 self-center', getTrendColor(stat.trend)]"
          aria-hidden="true"
        />
        <span :class="getTrendColor(stat.trend)" class="font-medium">
          {{ stat.change }}
        </span>
        <span class="ml-2 text-zinc-500 dark:text-zinc-400">from last period</span>
      </div>
    </div>
  </div>
</template>
