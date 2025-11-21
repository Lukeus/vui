// Theme utilities and exports
export const themeColors = {
  primary: 'indigo',
  secondary: 'zinc',
  success: 'green',
  warning: 'amber',
  danger: 'red',
  info: 'blue',
} as const

export type ThemeColor = keyof typeof themeColors
