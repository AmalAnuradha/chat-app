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
        <sui-table-cell>
          <sui-label ribbon v-if="friend.from">{{friend.from.presence}}</sui-label>
        </sui-table-cell>
        <sui-table-cell v-if="friend.from">{{friend.from.firstname}} {{friend.from.lastname}}</sui-table-cell>
        <sui-table-cell v-if="friend.from">{{friend.from.email}}</sui-table-cell>
        <sui-table-cell v-if="friend.from"><sui-button type="button" v-on:click='acceptRequest(friend.to, friend.from._id)'>accept</sui-button></sui-table-cell>
      </sui-table-row>
    </sui-table-body>

  
  </sui-table>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      friends: []
    }
  },
  methods: {
    acceptRequest: function (from, to) {
      this.$socket.emit('pair', {
        status: 'accept',
        from: from,
        to: to
      })
      console.log(from, to)
      this.friends = []
    }
  },
  mounted () {
    this.$socket.emit('user_ready')
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    requests: function (data) {
      this.friends = data
      console.log('friends table' + data)
    },
    pair: function (data) {
      this.friends = data
      console.log('friends table' + data)
    }
  }
}
</script>
