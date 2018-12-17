import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'
import VueSocketIO from 'vue-socket.io'
import Chat from 'vue-beautiful-chat'

// Plugins
import GlobalComponents from './gloablComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'
import 'semantic-ui-css/semantic.min.css'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(SideBar)
Vue.use(SuiVue)
Vue.use(Chat)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000?id=5c0df1275b18020ccf928597',
  transports: ['websocket', 'polling', 'flashsocket']
}))

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
