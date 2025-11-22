import { ref } from 'vue'

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

const defaultSettings: AppSettings = {
  darkMode: false,
  showSecondarySidebar: true,
  showAside: true,
  showLineNumbers: false,
  wordWrap: true,
  fontSize: 'md',
}

/**
 * Composable for managing app settings (in-memory only, no persistence)
 */
export function useSettings() {
  // Initialize with defaults
  const settings = ref<AppSettings>({ ...defaultSettings })

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
