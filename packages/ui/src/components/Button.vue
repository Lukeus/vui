<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'
import Link from './Link.vue'

export type ButtonColor =
  | 'dark/zinc'
  | 'light'
  | 'dark/white'
  | 'dark'
  | 'white'
  | 'zinc'
  | 'indigo'
  | 'cyan'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'sky'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

/**
 * Button component for user actions
 * @property {ButtonColor} color - Color variant of the button
 * @property {boolean} outline - Outline style variant
 * @property {boolean} plain - Plain style variant without border
 * @property {boolean} loading - Shows loading spinner and disables interaction
 * @property {string} href - If provided, renders as a link
 * @property {boolean} disabled - Disables the button
 * @property {string} type - Button type attribute
 */
interface ButtonProps {
  color?: ButtonColor
  outline?: boolean
  plain?: boolean
  loading?: boolean
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'dark/zinc',
  outline: false,
  plain: false,
  loading: false,
  disabled: false,
  type: 'button',
})

const isDisabled = computed(() => props.disabled || props.loading)

const styles = {
  base: [
    'relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold',
    'px-[calc(var(--spacing)*3.5-1px)] py-[calc(var(--spacing)*2.5-1px)] sm:px-[calc(var(--spacing)*3-1px)] sm:py-[calc(var(--spacing)*1.5-1px)] sm:text-sm/6',
    'focus:not-data-[focus]:outline-hidden data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    'data-[disabled]:opacity-50',
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4',
  ],
  solid: [
    'border-transparent bg-[var(--btn-border)]',
    'dark:bg-[var(--btn-bg)]',
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-[var(--btn-bg)]',
    'before:shadow-sm',
    'dark:before:hidden',
    'dark:border-white/5',
    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]',
    'after:shadow-[inset_0_1px_var(--color-white)]',
    'after:shadow-white/15',
    'data-active:after:bg-[var(--btn-hover-overlay)] data-hover:after:bg-[var(--btn-hover-overlay)]',
    'dark:after:-inset-px dark:after:rounded-lg',
    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
  ],
  outline: [
    'border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/2.5 data-hover:bg-zinc-950/2.5',
    'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
  ],
  plain: [
    'border-transparent text-zinc-950 data-active:bg-zinc-950/5 data-hover:bg-zinc-950/5',
    'dark:text-white dark:data-active:bg-white/10 dark:data-hover:bg-white/10',
  ],
  colors: {
    'dark/zinc': [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)] [--btn-border-alpha:0.9] [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1]',
      'dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)] dark:[--btn-hover-overlay-alpha:0.05]',
    ],
    light: [
      'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)] [--btn-border-alpha:0.1] [--btn-hover-overlay:var(--color-zinc-950)] [--btn-hover-overlay-alpha:0.025]',
      'dark:text-white dark:[--btn-hover-overlay:var(--color-white)] dark:[--btn-hover-overlay-alpha:0.05] dark:[--btn-bg:var(--color-zinc-800)]',
    ],
    'dark/white': [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)] [--btn-border-alpha:0.9] [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1]',
      'dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:var(--color-zinc-950)] dark:[--btn-hover-overlay-alpha:0.05]',
    ],
    dark: [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)] [--btn-border-alpha:0.9] [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1]',
      'dark:[--btn-hover-overlay:var(--color-white)] dark:[--btn-hover-overlay-alpha:0.05] dark:[--btn-bg:var(--color-zinc-800)]',
    ],
    white: [
      'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)] [--btn-border-alpha:0.1] [--btn-hover-overlay:var(--color-zinc-950)] [--btn-hover-overlay-alpha:0.025]',
      'dark:[--btn-hover-overlay:var(--color-zinc-950)] dark:[--btn-hover-overlay-alpha:0.05]',
    ],
    zinc: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-zinc-600)] [--btn-border:var(--color-zinc-700)] [--btn-border-alpha:0.9]',
      'dark:[--btn-hover-overlay:var(--color-white)] dark:[--btn-hover-overlay-alpha:0.05]',
    ],
    indigo: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)] [--btn-border-alpha:0.9]',
    ],
    cyan: [
      'text-cyan-950 [--btn-bg:var(--color-cyan-300)] [--btn-border:var(--color-cyan-400)] [--btn-border-alpha:0.8] [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.25]',
    ],
    red: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)] [--btn-border-alpha:0.9]',
    ],
    orange: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)] [--btn-border-alpha:0.9]',
    ],
    amber: [
      'text-amber-950 [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.25] [--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)] [--btn-border-alpha:0.8]',
    ],
    yellow: [
      'text-yellow-950 [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.25] [--btn-bg:var(--color-yellow-300)] [--btn-border:var(--color-yellow-400)] [--btn-border-alpha:0.8]',
    ],
    lime: [
      'text-lime-950 [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.25] [--btn-bg:var(--color-lime-300)] [--btn-border:var(--color-lime-400)] [--btn-border-alpha:0.8]',
    ],
    green: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)] [--btn-border-alpha:0.9]',
    ],
    emerald: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)] [--btn-border-alpha:0.9]',
    ],
    teal: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)] [--btn-border-alpha:0.9]',
    ],
    sky: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-sky-500)] [--btn-border:var(--color-sky-600)] [--btn-border-alpha:0.8]',
    ],
    blue: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)] [--btn-border-alpha:0.9]',
    ],
    violet: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-violet-500)] [--btn-border:var(--color-violet-600)] [--btn-border-alpha:0.9]',
    ],
    purple: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-purple-500)] [--btn-border:var(--color-purple-600)] [--btn-border-alpha:0.9]',
    ],
    fuchsia: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-fuchsia-500)] [--btn-border:var(--color-fuchsia-600)] [--btn-border-alpha:0.9]',
    ],
    pink: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-pink-500)] [--btn-border:var(--color-pink-600)] [--btn-border-alpha:0.9]',
    ],
    rose: [
      'text-white [--btn-hover-overlay:var(--color-white)] [--btn-hover-overlay-alpha:0.1] [--btn-bg:var(--color-rose-500)] [--btn-border:var(--color-rose-600)] [--btn-border-alpha:0.9]',
    ],
  },
}

const classes = computed(() =>
  cn(
    styles.base,
    props.outline ? styles.outline : props.plain ? styles.plain : [styles.solid, styles.colors[props.color]]
  )
)

const component = computed(() => (props.href ? Link : 'button'))
</script>

<template>
  <component
    :is="component"
    :href="href"
    :disabled="isDisabled"
    :type="!href ? type : undefined"
    :class="classes"
    :aria-busy="loading"
  >
    <span
      class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
      aria-hidden="true"
    />
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="mr-2 -ml-1 size-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </component>
</template>
