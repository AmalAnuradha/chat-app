<template lang='html'>
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
      <sui-table-row v-for='friend in friends' v-if='friends'>
        <sui-table-cell success>
          <sui-label ribbon v-bind:color="friend.presence==='online' ? 'green' : 'red'">{{friend.presence}}</sui-label>
        </sui-table-cell>
        <sui-table-cell>{{friend.firstname}} {{friend.lastname}}</sui-table-cell>
        <sui-table-cell>{{friend.email}}</sui-table-cell>
        <sui-table-cell><sui-button type='button' v-on:click='sendRequest(friend._id)'>request</sui-button></sui-table-cell>
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
  mounted () {
    this.fetchUsers()
    this.$socket.emit('user_ready')
  },
  methods: {
    sendRequest: function (userid) {
      this.$socket.emit('pair', {
        status: 'request',
        from: this.user._id,
        to: userid
      })
    },
    fetchUsers: function () {
      this.$http
        .get('http://192.168.0.66:3000/api/v1/users')
        .then(response => {
          this.friends = response.body.filter(user => {
            return user._id !== this.user._id
          }).sort(function (a, b) {
            return (a.presence === 'offline')
          })
          console.log(this.friends)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
    // friends: function (data) {
    //   this.friends = data
    //   console.log('friends table' + data)
    // }
  }
}
</script>
