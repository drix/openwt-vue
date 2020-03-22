import { mount } from '@vue/test-utils'
import About from '@/components/About.vue'

describe('About.vue', () => {
  it('renders passed', () => {
    expect(mount(About).isVueInstance).toBeTruthy();
  })
})