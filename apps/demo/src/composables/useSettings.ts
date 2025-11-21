import { ref, watch } from 'vue'

export interface AppSettings {
  // Theme preferences
  darkMode: boolean

  // Layout preferences
  showSecondarySidebar: boolean
  showAside: boolean

  // Code display preferences
  showLineNumbers: boolean
  wordWrap: boolean

  // Font size
  fontSize: 'sm' | 'md' | 'lg'
}

const STORAGE_KEY = 'vue-ui-demo-settings'

const defaultSettings: AppSettings = {
  darkMode: false,
  showSecondarySidebar: true,
  showAside: true,
  showLineNumbers: false,
  wordWrap: true,
  fontSize: 'md',
}

/**
 * Load settings from localStorage
 */
function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultSettings, ...parsed }
    }
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error)
  }
  return { ...defaultSettings }
}

/**
 * Save settings to localStorage
 */
function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error)
  }
}

/**
 * Composable for managing app settings with localStorage persistence
 */
export function useSettings() {
  // Initialize from localStorage or defaults
  const settings = ref<AppSettings>(loadSettings())

  // Watch for changes and persist to localStorage
  watch(
    settings,
    (newSettings) => {
      saveSettings(newSettings)
    },
    { deep: true }
  )

  /**
   * Update a single setting
   */
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    settings.value[key] = value
  }

  /**
   * Reset all settings to defaults
   */
  const resetSettings = () => {
    settings.value = { ...defaultSettings }
  }

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    settings.value.darkMode = !settings.value.darkMode
  }

  /**
   * Toggle secondary sidebar visibility
   */
  const toggleSecondarySidebar = () => {
    settings.value.showSecondarySidebar = !settings.value.showSecondarySidebar
  }

  /**
   * Toggle aside visibility
   */
  const toggleAside = () => {
    settings.value.showAside = !settings.value.showAside
  }

  /**
   * Toggle line numbers
   */
  const toggleLineNumbers = () => {
    settings.value.showLineNumbers = !settings.value.showLineNumbers
  }

  /**
   * Toggle word wrap
   */
  const toggleWordWrap = () => {
    settings.value.wordWrap = !settings.value.wordWrap
  }

  return {
    settings,
    updateSetting,
    resetSettings,
    toggleDarkMode,
    toggleSecondarySidebar,
    toggleAside,
    toggleLineNumbers,
    toggleWordWrap,
  }
}
