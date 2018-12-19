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
                    icon="inbox">
                    <sui-message-content>
                        <sui-message-header>{{message.userID.firstname}}</sui-message-header>
                        <div v-if="messageType(message.message) === 0">{{message.message}}</div>
                        <sui-image v-if="messageType(message.message) === 1" v-bind:src="message.message" medium size="medium"/>
                        <video v-if="messageType(message.message) === 2" width="320" height="240" controls>
                            <source v-bind:src="message.message" type="video/mp4">
                        </video>
                    </sui-message-content>
                </sui-message>

                <sui-message success 
                    style="float: right;width:55%;background-color: beige;"
                    v-if="message.userID._id == user._id"
                    icon="inbox"
                >
                    <sui-message-content>
                        <sui-message-header>{{message.userID.firstname}}</sui-message-header>
                        <div v-if="messageType(message.message) === 0">{{message.message}}</div>
                        <sui-image v-if="messageType(message.message) === 1" v-bind:src="message.message" medium size="medium"/>
                        <video v-if="messageType(message.message) === 2" width="320" height="240" controls>
                            <source v-bind:src="message.message" type="video/mp4">
                        </video>
                    </sui-message-content>
                </sui-message>
        </div> 
        
        </div>
      </div>
        
      
    </div>
    <div class="row" v-if="joined">
      <div class="col-md-12 s-m-contianer">
        <div class="ui action left icon input">
          <i class="mail icon"></i>
          <input type="text" placeholder="Message..." v-model="message">
            <iframe v-if="joined" ref="myIframe" v-bind:src="link" id="myIframe" height="44"></iframe>
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
      roomName: '',
      messages: [],
      link: 'http://192.168.0.66:3000/fileuploader.html?'
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
      this.link = this.link + user._id + ':' + this.roomName
    }
  },
  methods: {
    messageType: function (text) {
      if (text.includes('.png') || text.includes('.jpg') || text.includes('.jpeg')) {
        return 1
      } else if (text.includes('.mp4') || text.includes('.webm') || text.includes('.mp3')) {
        return 2
      }
      return 0
    },
    joinRoom: function () {
      this.$socket.emit('join_chat_room', { room: this.roomName })
      this.link = 'http://192.168.0.66:3000/fileuploader.html?' + this.user._id + ':' + this.roomName
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
