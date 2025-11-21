/**
 * Generates Vue component code snippets from prop configurations
 */

export interface PropConfig {
  name: string
  value: string | number | boolean | null
  type: 'string' | 'number' | 'boolean' | 'select'
  defaultValue?: string | number | boolean
}

export interface CodeGeneratorOptions {
  componentName: string
  props: PropConfig[]
  content?: string
  importPath?: string
}

/**
 * Generates a Vue SFC code snippet from component props
 */
export function generateComponentCode(options: CodeGeneratorOptions): string {
  const { componentName, props, content = '', importPath = '@vue-ui/ui' } = options

  // Filter out props that match default values
  const activeProps = props.filter((prop) => {
    if (prop.value === prop.defaultValue) return false
    if (prop.value === null || prop.value === undefined || prop.value === '') return false
    return true
  })

  // Build prop attributes
  const propStrings = activeProps.map((prop) => {
    if (prop.type === 'boolean') {
      return prop.value ? prop.name : null
    }
    if (prop.type === 'string') {
      return `${prop.name}="${prop.value}"`
    }
    if (prop.type === 'number' || prop.type === 'select') {
      return `${prop.name}="${prop.value}"`
    }
    return null
  })

  const validPropStrings = propStrings.filter((str): str is string => str !== null)
  const propsString = validPropStrings.length > 0 ? ' ' + validPropStrings.join(' ') : ''

  // Build template
  const hasContent = content.trim().length > 0
  const template = hasContent
    ? `<${componentName}${propsString}>\n    ${content}\n  </${componentName}>`
    : `<${componentName}${propsString} />`

  // Build script
  const script = `<script setup>
import { ${componentName} } from '${importPath}'
<\\/script>`

  // Combine
  return `<template>
  ${template}
</template>

${script}`
}

/**
 * Format prop value for display
 */
export function formatPropValue(value: string | number | boolean | null, type: PropConfig['type']): string {
  if (value === null || value === undefined) return ''
  if (type === 'boolean') return value ? 'true' : 'false'
  if (type === 'string') return `"${value}"`
  return String(value)
}
