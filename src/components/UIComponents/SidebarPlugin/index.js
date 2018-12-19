import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    // {
    //   name: 'Dashboard',
    //   icon: 'ti-panel',
    //   path: '/admin/overview'
    // },
    // {
    //   name: 'User Profile',
    //   icon: 'ti-user',
    //   path: '/admin/stats'
    // },
    // {
    //   name: 'Table List',
    //   icon: 'ti-view-list-alt',
    //   path: '/admin/table-list'
    // },
    // {
    //   name: 'Signup',
    //   icon: 'ti-text',
    //   path: '/admin/signup'
    // },
    // {
    //   name: 'Icons',
    //   icon: 'ti-pencil-alt2',
    //   path: '/admin/icons'
    // },
    // {
    //   name: 'Maps',
    //   icon: 'ti-map',
    //   path: '/admin/maps'
    // },
    {
      name: 'Friends',
      icon: 'fa fa-male',
      path: '/admin/pair'
    },
    {
      name: 'Messages',
      icon: 'fa fa-envelope',
      path: '/admin/messages'
    },
    {
      name: 'Group Messages',
      icon: 'fa fa-envelope',
      path: '/admin/groupmessages'
    },
    {
      name: 'Group Config',
      icon: 'fa fa-cog',
      path: '/admin/group/config'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
