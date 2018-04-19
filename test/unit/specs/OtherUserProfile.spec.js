import OtherUserProfile from '@/components/OtherUserProfile'
import {mount, shallow} from '@vue/test-utils'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'
import gateway from '@/gateway'

describe('OtherUserProfile.vue', () => {

  let router

  beforeEach(() => {
    router = new VueRouter()
  })

  it('should display other user profile to admin user', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: true})
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {balance: 10, fullName: 'other user full name'}}))

    let wrapper = mount(OtherUserProfile, {router, propsData: {userId: 'otheruserid'}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('other user full name')
      expect(wrapper.text()).toContain('10')
      expect(wrapper.find('.top-up').element).toBeDefined()
      expect(gateway.get).toHaveBeenCalledWith('/users/otheruserid')
      done()
    }, 0)
  })

  it('should display other user profile to regular user', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: false})
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {fullName: 'other user full name'}}))

    let wrapper = mount(OtherUserProfile, {router, propsData: {userId: 'otheruserid'}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('other user full name')
      expect(wrapper.find('.top-up').element).toBeUndefined()
      done()
    }, 0)
  })


  it('should reload user balance after modal topup is done', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: true})
    spyOn(gateway, 'get').and.returnValues(
        Promise.resolve({data: {balance: 10, fullName: 'other user full name'}}),
        Promise.resolve({data: {balance: 20, fullName: 'other user full name'}})
      )
    let wrapper = shallow(OtherUserProfile, {router})

    setTimeout(() => {
      expect(wrapper.vm.otherUser.balance).toBe(10)

      wrapper.vm.paymentDone()

      setTimeout(() => {
        expect(wrapper.vm.otherUser.balance).toBe(20)
        done()
      }, 0)
    }, 0)
  })
})
