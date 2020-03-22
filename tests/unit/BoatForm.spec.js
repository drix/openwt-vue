import { shallowMount, mount } from '@vue/test-utils'
import BoatForm from '@/components/BoatForm.vue'
import Vue from 'vue'
import { VBToggle } from 'bootstrap-vue'

Vue.directive('b-toggle', VBToggle)

const factory = (values = {}) => {
  return mount(BoatForm, {
    data () { return {
        busy: false,
        ...values
    }},
    stubs: ['router-link'],
  })
}

describe('BoatForm.vue', () => {
  it('renders empty passed', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance).toBeTruthy();
  })

  it('renders ensure create is disable if invalid', async () => {
    const wrapper = factory();
    expect(wrapper.find('button[type="submit"][disabled="disabled"]').exists()).toBeTruthy();
  })

  it('renders ensure create is enable if valid', async () => {
    const wrapper = factory({ data: { name: "test" }});
    expect(wrapper.find('button[type="submit"][disabled="disabled"]').exists()).toEqual(false);
  })

  it('ensure reset works', async () => {
    const wrapper = factory({ data: { name: "test" }})
    expect(wrapper.find('button[type="reset"]').exists()).toBeTruthy();
    expect(wrapper.vm.data.name).toEqual("test");
    wrapper.vm.onReset();
    expect(wrapper.vm.data.name).toEqual("");
  })

  it('ensure it can create', async () => {
    const wrapper = factory({ data: { name: "test" }});
    wrapper.vm.api.createNew = jest.fn().mockImplementation(() => Promise.resolve());
    wrapper.vm.onSubmit();
    expect(wrapper.vm.api.createNew).toBeCalled();
  })

  it('ensure it can update', async () => {
    const wrapper = factory({ data: {  name: "test" }});
    wrapper.setProps({ id: 1 });
    wrapper.vm.api.updateForId = jest.fn().mockImplementation(() => Promise.resolve());
    wrapper.vm.onSubmit();
    expect(wrapper.vm.api.updateForId).toBeCalled();
  })

  it('ensure it can fail', async () => {
    const wrapper = factory({ data: { name: "test" }});
    wrapper.vm.api.createNew = jest.fn().mockImplementation(() => Promise.reject());
    wrapper.vm.onSubmit();
    expect(wrapper.vm.busy).toBeTruthy();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.busy).toEqual(false);
    expect(wrapper.vm.error).toBeTruthy();
  })

  it('ensure it can delete', async () => {
    const wrapper = factory({ data: {  name: "test" }});
    wrapper.setProps({ id: 1 });
    wrapper.vm.api.removeForId = jest.fn().mockImplementation(() => Promise.resolve());
    wrapper.vm.$router = { replace: jest.fn() };
    wrapper.vm.onDelete();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.api.removeForId).toBeCalled();
    expect(wrapper.vm.$router.replace).toBeCalled();
  })
})
