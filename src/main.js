import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from '@/App'
import router from '@/router'
import VueMoment from 'vue-moment'
import 'vuetify/dist/vuetify.css'
import './assets/scss/main.scss'
import Vuetify from 'vuetify'
import i18n from '@/i18n'
import PushNotifications from '@/services/PushNotifications'
import VueCroppie from 'vue-croppie';
import Exif from 'exif-js';

Vue.use(Vuetify)
Vue.use(VeeValidate, {i18n: i18n})
Vue.use(VueMoment)
Vue.use(VueCroppie);

Vue.config.productionTip = false

window.$vm = new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

window.$router = router
window.EXIF = Exif

PushNotifications.init()

window.confirm = function confirm(message) {
  let iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  const confirmed = window.frames[0].window.confirm(message)
  iframe.parentNode.removeChild(iframe);
  return confirmed;
}
