import { computed, reactive, ref } from 'vue'
import { generateComponentCode, type PropConfig } from '../utils/code-generator'

export interface PlaygroundConfig {
  componentName: string
  props: PropConfig[]
  content?: string
  importPath?: string
}

/**
 * Composable for managing component playground state
 */
export function usePlayground(config: PlaygroundConfig) {
  const componentName = ref(config.componentName)
  const importPath = ref(config.importPath || '@vue-ui/ui')
  const content = ref(config.content || '')

  // Create reactive prop values from initial config
  const propValues = reactive<Record<string, string | number | boolean | null>>(
    Object.fromEntries(config.props.map((prop) => [prop.name, prop.defaultValue ?? prop.value]))
  )

  // Store initial values for reset
  const initialPropValues = { ...propValues }

  /**
   * Generate code snippet from current prop values
   */
  const generatedCode = computed(() => {
    const propsWithValues: PropConfig[] = config.props.map((prop) => ({
      ...prop,
      value: propValues[prop.name] ?? prop.defaultValue ?? null,
    }))

    return generateComponentCode({
      componentName: componentName.value,
      props: propsWithValues,
      content: content.value,
      importPath: importPath.value,
    })
  })

  /**
   * Get current value for a prop
   */
  const getPropValue = (propName: string) => {
    return propValues[propName]
  }

  /**
   * Update a prop value
   */
  const setPropValue = (propName: string, value: string | number | boolean | null) => {
    propValues[propName] = value
  }

  /**
   * Reset all props to initial values
   */
  const reset = () => {
    Object.keys(propValues).forEach((key) => {
      propValues[key] = initialPropValues[key]
    })
    content.value = config.content || ''
  }

  /**
   * Update content/slot value
   */
  const setContent = (newContent: string) => {
    content.value = newContent
  }

  return {
    componentName,
    propValues,
    content,
    generatedCode,
    getPropValue,
    setPropValue,
    setContent,
    reset,
  }
}
