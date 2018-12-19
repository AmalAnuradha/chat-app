import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Register from 'src/components/Dashboard/Views/Register.vue'
import GroupMessages from 'src/components/Dashboard/Views/GroupMessages.vue'
import Messages from 'src/components/Dashboard/Views/Messages.vue'
import Login from 'src/components/Dashboard/Views/Login.vue'
import Pair from 'src/components/Dashboard/Views/Pair.vue'
import GroupConfig from 'src/components/Dashboard/Views/ChatRoomConfig.vue'

const routes = [
  {
    path: '/',
    component: Login,
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'messages',
        name: 'messages',
        component: Messages
      },
      {
        path: 'pair',
        name: 'friends',
        component: Pair
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'signup',
        name: 'signup',
        component: Register
      },
      {
        path: 'groupmessages',
        name: 'groupmessages',
        component: GroupMessages
      },
      {
        path: 'group/config',
        name: 'groupConfig',
        component: GroupConfig
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
