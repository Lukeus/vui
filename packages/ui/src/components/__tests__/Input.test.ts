import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../Input.vue'

describe('Input.vue', () => {
  it('generates id if not provided', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBeTruthy()
  })

  it('uses provided id', () => {
    const wrapper = mount(Input, {
      props: { id: 'my-input' },
    })
    expect(wrapper.find('input').attributes('id')).toBe('my-input')
  })

  it('sets aria-invalid when invalid', () => {
    const wrapper = mount(Input, {
      props: { invalid: true },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('sets aria-invalid to false when valid', () => {
    const wrapper = mount(Input, {
      props: { invalid: false },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
  })
})
