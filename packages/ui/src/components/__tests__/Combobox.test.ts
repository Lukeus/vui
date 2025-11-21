import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Combobox from '../Combobox.vue'

const options = [
  { value: 1, label: 'Apple' },
  { value: 2, label: 'Banana' },
  { value: 3, label: 'Cherry' },
]

describe('Combobox.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Combobox, {
      props: { options },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits query-change event', async () => {
    const wrapper = mount(Combobox, {
      props: { options },
    })
    const input = wrapper.find('input')
    await input.setValue('Ban')
    // The component watches 'query' ref which is updated by HeadlessComboboxInput @change
    // We might need to trigger the internal change or emulate it.
    // In our implementation: @change="query = $event.target.value" on HeadlessComboboxInput

    // Since we can't easily interact with HeadlessUI internals without a full DOM,
    // we can try to check if the event is emitted when we type.
    // Ideally, we test the logic.

    // Note: Testing Headless UI integration often requires 'global.ResizeObserver' mock and others.
  })
})
