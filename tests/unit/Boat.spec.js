import { shallowMount } from '@vue/test-utils'
import Boat from '@/components/Boat.vue'

const factory = (values = {}) => {
  return shallowMount(Boat, {
    propsData: { id:"1" },
    stubs: ['router-link'],
    data () { return { ...values }}
  })
}

describe('Boat.vue', () => {

  it('renders description when passed', () => {
    const wrapper = factory({ data: { description: "my boat"  }})
    expect(wrapper.text()).toContain("my boat")
  })

  it('renders name when passed', () => {
    const wrapper = factory({ data: { name: "my boat"  }})
    expect(wrapper.find("[title='my boat']").exists()).toBeTruthy()
  })
})
