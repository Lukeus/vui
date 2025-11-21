import { setProjectAnnotations } from '@storybook/vue3'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview'

const annotations = setProjectAnnotations([projectAnnotations])

beforeAll(annotations.beforeAll)
