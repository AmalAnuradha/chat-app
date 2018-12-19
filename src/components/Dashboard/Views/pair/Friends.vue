<template lang="html">
  <div>
    <sui-table celled>
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell>Status</sui-table-header-cell>  
        <sui-table-header-cell>Name</sui-table-header-cell>
        <sui-table-header-cell>Email</sui-table-header-cell>
        <sui-table-header-cell>Actions</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>

    <sui-table-body>
      <sui-table-row v-for="friend in friends" v-if="friends">
        <sui-table-cell v-if="friend.to">
          <sui-label ribbon  v-bind:color="friend.to.presence==='online' ? 'green' : 'red'">{{friend.to.presence}}</sui-label>
        </sui-table-cell>
        <sui-table-cell v-if="friend.to">{{friend.to.firstname}} {{friend.to.lastname}}</sui-table-cell>
        <sui-table-cell v-if="friend.to">{{friend.to.email}}</sui-table-cell>
        <sui-table-cell v-if="friend.to"></sui-table-cell>
      </sui-table-row>
    </sui-table-body>

  
  </sui-table>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      friends: [],
      user: ''
    }
  },
  created () {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user = user
    }
  },
  methods: {},
  mounted () {
    this.$socket.emit('user_ready')
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    friends: function (data) {
      this.friends = data.filter(user => {
        return user._id !== this.user._id
      })
      console.log('friends table' + data)
    }
  }
}
</script>
