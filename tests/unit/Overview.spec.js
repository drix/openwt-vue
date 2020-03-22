import { shallowMount, mount } from '@vue/test-utils'
import Overview from '@/components/Overview.vue'

describe('Overview.vue', () => {
  it('renders passed', () => {
    expect(mount(Overview).isVueInstance).toBeTruthy();
  })
})