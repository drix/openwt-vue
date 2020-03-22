import { mount } from '@vue/test-utils'
import List from '@/components/List.vue'

const factory = (values = {}) => {
  return mount(List, {
    data () { return {
        busy: false,
        boats: [{name:"b1"},{name:"b2"},{name:"b3"}],
        ...values
    }},
    stubs: ['router-link'],
  })
}

describe('List.vue', () => {
  it('renders passed', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance).toBeTruthy();
  })

  it('renders empty list  passed', async () => {
    const wrapper = factory({ boats: []});
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('#boats tbody [role="row"]').length).toBe(0);
  })

  it('renders list when passed', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('#boats tbody [role="row"]').length).toBe(3);
  })

  it('renders filtered list when passed', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    wrapper.vm.searchKey = "b1";
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('#boats tbody [role="row"]').length).toBe(1);
  })
})
