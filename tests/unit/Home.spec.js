import { shallowMount, mount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', () => {
  it('renders passed', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.find('Overview')).toBeTruthy();
  })
})