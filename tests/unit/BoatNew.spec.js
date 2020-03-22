import { shallowMount } from '@vue/test-utils'
import BoatNew from '@/components/BoatNew.vue'

describe('BoatNew.vue', () => {
  it('renders passed', () => {
    const wrapper = shallowMount(BoatNew);
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.find('BoatForm')).toBeTruthy();
  })
})