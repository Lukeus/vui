/**
 * Focus management utilities for accessible components
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ].join(',')

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
  )
}

/**
 * Trap focus within an element (useful for modals and dialogs)
 * Returns a cleanup function to remove the trap
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = getFocusableElements(element)
  const firstFocusable = focusableElements[0]

  // Store the previously focused element to restore later
  const previouslyFocused = document.activeElement as HTMLElement

  // Focus the first element
  firstFocusable?.focus()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusables = getFocusableElements(element)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const current = document.activeElement

    if (e.shiftKey) {
      // Shift + Tab: wrap to last element
      if (current === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      // Tab: wrap to first element
      if (current === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  // Cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown)
    previouslyFocused?.focus()
  }
}

/**
 * Returns the next focusable element after the given element
 */
export function getNextFocusableElement(current: HTMLElement): HTMLElement | null {
  const allFocusable = getFocusableElements(document.body)
  const currentIndex = allFocusable.indexOf(current)

  if (currentIndex === -1 || currentIndex === allFocusable.length - 1) {
    return null
  }

  return allFocusable[currentIndex + 1]
}

/**
 * Returns the previous focusable element before the given element
 */
export function getPreviousFocusableElement(current: HTMLElement): HTMLElement | null {
  const allFocusable = getFocusableElements(document.body)
  const currentIndex = allFocusable.indexOf(current)

  if (currentIndex <= 0) {
    return null
  }

  return allFocusable[currentIndex - 1]
}

/**
 * Focus the first focusable element within a container
 */
export function focusFirstElement(container: HTMLElement): void {
  const focusable = getFocusableElements(container)
  focusable[0]?.focus()
}

/**
 * Focus the last focusable element within a container
 */
export function focusLastElement(container: HTMLElement): void {
  const focusable = getFocusableElements(container)
  focusable[focusable.length - 1]?.focus()
}

/**
 * Check if an element is currently focused
 */
export function isFocused(element: HTMLElement): boolean {
  return document.activeElement === element
}

/**
 * Programmatically trigger focus-visible state
 * Useful for accessibility when focusing via keyboard navigation
 */
export function focusWithKeyboard(element: HTMLElement): void {
  element.focus()
  // Add focus-visible class for styling
  element.classList.add('focus-visible')
}

/**
 * Create a focus guard element to help with focus trapping
 */
export function createFocusGuard(): HTMLDivElement {
  const guard = document.createElement('div')
  guard.setAttribute('tabindex', '0')
  guard.setAttribute('aria-hidden', 'true')
  guard.style.cssText = 'position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden;'
  return guard
}
