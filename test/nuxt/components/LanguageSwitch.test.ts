import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LanguageSwitch from '~/components/LanguageSwitch.vue'

describe('LanguageSwitch', () => {
  it('renders language switch component', async () => {
    const component = await mountSuspended(LanguageSwitch)
    expect(component.exists()).toBe(true)
  })

  it('displays language options', async () => {
    const component = await mountSuspended(LanguageSwitch)
    
    // Check if the component renders without errors
    expect(component.findComponent({ name: 'VSelect' }).exists()).toBe(true)
  })

  it('has proper accessibility attributes', async () => {
    const component = await mountSuspended(LanguageSwitch)
    
    const select = component.findComponent({ name: 'VSelect' })
    expect(select.attributes('aria-label')).toBeDefined()
  })
})
