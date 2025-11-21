import { type BundledLanguage, type BundledTheme, type HighlighterGeneric, createHighlighter } from 'shiki'

let highlighterInstance: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null

/**
 * Initialize Shiki highlighter with VS Code themes
 * Lazy loads and caches the highlighter instance
 */
export async function getHighlighter() {
  if (highlighterInstance) {
    return highlighterInstance
  }

  highlighterInstance = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['typescript', 'vue', 'javascript', 'json', 'css', 'html'],
  })

  return highlighterInstance
}

/**
 * Highlight code with Shiki
 * @param code - Source code to highlight
 * @param lang - Language for syntax highlighting
 * @param theme - Theme name (defaults to 'github-dark')
 * @returns HTML string with syntax highlighting
 */
export async function highlightCode(
  code: string,
  lang: BundledLanguage = 'typescript',
  theme: BundledTheme = 'github-dark'
): Promise<string> {
  const highlighter = await getHighlighter()

  return highlighter.codeToHtml(code, {
    lang,
    theme,
  })
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is successful
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      textArea.remove()
    } catch (error) {
      console.error('Failed to copy:', error)
      textArea.remove()
      throw error
    }
  }
}
