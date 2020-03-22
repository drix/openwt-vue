import { shallowMount, mount } from '@vue/test-utils'
import BoatEdit from '@/components/BoatEdit.vue'

describe('BoatEdit.vue', () => {
  it('renders passed', () => {
    const wrapper = shallowMount(BoatEdit);
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.find('BoatForm')).toBeTruthy();
  })
})