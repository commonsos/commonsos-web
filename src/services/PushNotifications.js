import userService from '@/services/UserService'
import eventbus from '@/eventbus'
import gateway from '@/gateway'

export default {

  user: null,
  registrationId: null,

  registerDeviceOnBackend: function () {
    gateway.post(`/users/${this.user.id}/mobile-device`, {pushNotificationToken: this.registrationId})
  },

  onUserChanged: function (newUser) {
    this.user = newUser
    if (newUser && this.registrationId) this.registerDeviceOnBackend()
  },

  onDeviceReady: function () {
    const push = PushNotification.init({
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
    });

    push.on('registration', data => {
      this.registrationId = data.registrationId
      if (this.user) this.registerDeviceOnBackend()
    });

    push.on('notification', data => {
      console.log(data.message, data, title);
      alert(JSON.stringify(data))
    });
  },

  init: function () {
    this.user = userService.user()
    eventbus.$on('userChanged', this.onUserChanged.bind(this))
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }
}