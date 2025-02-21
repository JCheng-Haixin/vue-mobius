import { test, expect } from 'vitest'

import { mount, shallowMount } from '@vue/test-utils'
import Flex from '../Flex.vue'

test('abc', () => {
  const wrapper = mount(Flex, { attachTo: document.body })
  expect(wrapper.element.children.length).toBe(0)
  console.log('style display', getComputedStyle(wrapper.element))
})