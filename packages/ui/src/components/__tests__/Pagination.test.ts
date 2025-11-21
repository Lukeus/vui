import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Pagination from '../Pagination.vue'

describe('Pagination.vue', () => {
  it('renders correct pages', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
      },
    })
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('10')
  })

  it('uses custom labels', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        previousLabel: 'Anterior',
        nextLabel: 'Siguiente',
      },
    })
    expect(wrapper.html()).toContain('Anterior')
    expect(wrapper.html()).toContain('Siguiente')
  })

  it('uses custom aria-label', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        ariaLabel: 'Navegación',
      },
    })
    expect(wrapper.attributes('aria-label')).toBe('Navegación')
  })
})
