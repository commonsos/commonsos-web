import userService from '@/services/UserService'
import eventbus from '@/eventbus'
import gateway from '@/gateway'

describe('UserService.spec', () => {

  describe('login', () => {

    it('should resolve promise for valid credentials', (done) => {
      spyOn(eventbus, '$emit')
      spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {username: 'user'}}))

      userService.login('user', 'secret').then(() => {
        let user = {userName: 'user'}
        expect(localStorage.getItem('user')).toBe(JSON.stringify(user))
        expect(eventbus.$emit).toHaveBeenCalledWith('login', user)
        expect(gateway.post).toHaveBeenCalledWith('/login', {username: 'user', password: 'secret'})
        done()
      })
    })

    it('should reject promise for invalid credentials', (done) => {
      spyOn(gateway, 'post').and.returnValue(Promise.reject({}))

      userService.login('wrong', 'password').catch(e => {
        done()
      })
    })
  });

  it('logs out user', () => {
    localStorage.setItem('user', JSON.stringify({userName: 'username'}))
    spyOn(eventbus, '$emit')

    userService.logout()

    expect(userService.user().userName).toBe(undefined)
    expect(eventbus.$emit).toHaveBeenCalledWith('logout')
  });

  it('provides logged in user from localStorage', () => {
    localStorage.setItem('user', '{"foo": "bar"}')

    expect(userService.user()).toEqual({foo: "bar"})
  })

  it('provides empty user if storage format is not correct', () => {
    localStorage.setItem('user', 'username')

    expect(userService.user()).toEqual({})
  })

  it('provides empty user if not logged in', () => {
    expect(userService.user()).toEqual({})
  })

  describe('isLoggedIn', () => {
    it('return true', () => {
      localStorage.setItem('user', JSON.stringify({userName: 'username'}))
      expect(userService.isLoggedIn()).toBeTruthy()
    });

    it('return false', () => {
      localStorage.setItem('user', JSON.stringify({}))
      expect(userService.isLoggedIn()).toBeFalsy()
    });
  })

  afterEach(() => localStorage.clear())
})
