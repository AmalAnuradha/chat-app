<template>
  <div>
    <div class="row">
      <div class="col-md-12 s-m-contianer" v-if="!joined">
        <div class="ui action icon input">
          <input type="text" placeholder="Room name" v-model="roomName">
          <div class="ui teal button" v-on:click="joinRoom()">Join</div>
        </div>
      </div>
    </div>

    <div id="message-container" v-chat-scroll>
      <div  v-for="message in messages" v-bind:key="message._id">
      
          <div class="col-xs-12 form-group">
          <div> 
              <sui-message 
                style="float: left;width:55%;background-color: beige;"
                v-if="message.userID._id !== user._id"
                icon="inbox"
                v-bind:header="message.userID.firstname"
                v-bind:content="message.message"
                />
                <sui-message 
                style="float: right;width:55%;background-color: beige;"
                v-if="message.userID._id == user._id"
                icon="inbox"
                v-bind:header="message.userID.firstname"
                v-bind:content="message.message"
                />
        </div> 
          </div>
      </div>
        
      
    </div>
    <div class="row">
      <div class="col-md-12 s-m-contianer">
        <div class="ui action left icon input">
          <i class="mail icon"></i>
          <input type="text" placeholder="Message..." v-model="message">
          <div class="ui teal button" v-on:click="sendRoomMessage()">Send</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: '',
      joined: false,
      message: '',
      roomName: 'public_chat',
      messages: []
    }
  },
  sockets: {
    group_message: function (data) {
      console.log('room message' + JSON.stringify(data))
      this.messages.push(data)
    },
    group_offline_messages: function (data) {
      console.log('room message' + JSON.stringify(data))
      this.messages = data
    }
  },
  created () {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user = user
    }
  },
  methods: {
    joinRoom: function () {
      this.$socket.emit('join_chat_room', { room: this.roomName })
      this.joined = true
    },
    sendRoomMessage: function () {
      this.$socket.emit('send_message', {
        room: this.roomName,
        message: this.message
      })
      this.message = ''
      this.joined = true
    }
  }
}
</script>
