import eventbus from '@/eventbus'
import gateway from '@/gateway'
import messagePoller from '@/services/MessagePoller'

let instance = {

  _user: null,

  user() {
    return this._user
  },

  login(username, password) {
    return gateway.post('/login', {username, password}).then(r => {
      this.setUser(r.data)
      messagePoller.start()
      window.$router.push('/')
    })
  },

  createAndLogin(newUser) {
    return gateway.post('/create-account', newUser).then(r => {
      this.setUser(r.data)
      messagePoller.start()
      window.$router.push('/profile')
    })
  },

  logout() {
    return gateway.post('/logout').then(() => {
      this.setUser(null)
      messagePoller.stop()
      window.$router.push('/login')
    })
  },

  setUser(user) {
    this._user = user
    eventbus.$emit('userChanged', this._user)
  },

  loadUser() {
    return gateway.get('user').then(r => {
      this.setUser(r.data)
    }).catch(() => {})
  },

  isLoggedIn() {
    return !!this._user
  }
}

export default instance