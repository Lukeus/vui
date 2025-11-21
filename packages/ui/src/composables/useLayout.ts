import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Composable for managing mobile sidebar open/closed state
 * Auto-closes on window resize above breakpoint
 */
export function useMobileSidebar() {
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  // Auto-close on window resize to desktop breakpoint
  const handleResize = () => {
    if (window.innerWidth >= 1024 && isOpen.value) {
      // lg breakpoint
      close()
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

/**
 * Composable for reactive media query matching
 * @param query - CSS media query string (e.g., '(min-width: 1024px)')
 * @returns Ref<boolean> indicating if the media query matches
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)

  let mediaQueryList: MediaQueryList | null = null

  const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
    matches.value = e.matches
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      mediaQueryList = window.matchMedia(query)
      matches.value = mediaQueryList.matches

      // Modern browsers
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', updateMatches)
      } else {
        // Fallback for older browsers
        mediaQueryList.addListener(updateMatches)
      }
    }
  })

  onUnmounted(() => {
    if (mediaQueryList) {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', updateMatches)
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(updateMatches)
      }
    }
  })

  return matches
}

/**
 * Tailwind CSS breakpoint values
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * Composable for detecting current Tailwind breakpoint
 * @returns Ref<Breakpoint> - Current breakpoint name
 */
export function useBreakpoint(): Ref<Breakpoint> {
  const currentBreakpoint = ref<Breakpoint>('sm')

  const updateBreakpoint = () => {
    const width = window.innerWidth

    if (width >= breakpoints['2xl']) {
      currentBreakpoint.value = '2xl'
    } else if (width >= breakpoints.xl) {
      currentBreakpoint.value = 'xl'
    } else if (width >= breakpoints.lg) {
      currentBreakpoint.value = 'lg'
    } else if (width >= breakpoints.md) {
      currentBreakpoint.value = 'md'
    } else {
      currentBreakpoint.value = 'sm'
    }
  }

  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  return currentBreakpoint
}
