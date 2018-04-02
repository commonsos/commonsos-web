import eventbus from '@/eventbus'
import router from '@/router'
import gateway from '@/gateway'

let instance = {

  _user: null,

  user() {
    return this._user
  },

  login(username, password) {
    return gateway.post('/login', {username, password}).then(r => {
      this.setUser(r.data)
      router.push('/')
    })
  },

  logout() {
    return gateway.post('/logout').then(() => {
      this.setUser(null)
      router.push('/login')
    })
  },

  setUser(user) {
    this._user = user
    eventbus.$emit('userChanged', this._user)
  },

  loadUser() {
    gateway.get('user').then(r => this.setUser(r.data)).catch(() => {})
  },

  isLoggedIn() {
    return !!this._user
  }
}

export default instance