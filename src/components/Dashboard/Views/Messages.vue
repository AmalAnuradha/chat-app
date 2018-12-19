<template>
   
    <div>
    <div class="form-group" >
      <sui-dropdown
    
          placeholder="Select Friend"
          selection
          :options="options"
          v-model="current"

          v-on:click="selectFriend(current)"
        />
    </div>
    
    <div id="message-container" v-chat-scroll v-if="messages.length > 0">
      <div v-for="message in messages" v-bind:key="message._id">
      <sui-message v-bind:class="{isnew : message.isnew}" style="float: left;width:55%;background-color: beige;" v-if="message.from && message.to && message.from._id == userID && message.to._id == userid"
        icon="inbox"
        v-bind:header=message.from.firstname
        v-bind:content=message.message
      />
      <div style="clear:both;"></div>
      
      <sui-message  style="float:right;width:55%;margin-top: 0;margin-bottom:1em;" v-if="message.from && message.to && message.from._id == userid && message.to._id == userID"
        icon="inbox"
        v-bind:header=message.from.firstname
        v-bind:content=message.message
      />
      <div style="clear:both;"></div>
      </div>
    </div>
       <div class="row">
      <div class="col-md-12 s-m-contianer" v-if="isLogged">
          <div class="ui action left icon input">
            <i class="mail icon"></i> 
            <input type="text" placeholder="Message..." v-model="messageToSend"> 
            <div class="ui teal button" v-on:click="onMessageWasSent(messageToSend)">Send</div>
          </div>
      </div>  
    </div>
   </div>
  
</template>
<script>
export default {
  metaInfo: {
    title: 'chat app',
    titleTemplate: '%s - Yay!',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data () {
    return {
      title1: '',
      isNew: true,
      isLogged: false,
      userID: '',
      current: null,
      options: [],
      messageToSend: '',
      userid: '',
      messages: [],
      login: {
        email: '',
        password: ''
      }
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    user_messages: function (data) {
      console.log(this.$tmauserid)
      this.messages = data
      console.log(this.messages)
    },
    message: function (data) {
      data.isnew = this.isNew
      setTimeout(function () { data.isnew = false }, 3000)
      this.messages.push(data)
      this.$socket.emit('recieve message', [data._id])
      console.log('meta' + this.metaInfo)
    },
    friends: function (data) {
      for (let user of data) {
        console.log('friends: ' + user)
        let friend = {
          key: user.to._id,
          text: user.to.firstname + ' ' + user.to.lastname,
          value: user.to._id + '_' + user.to.firstname,
          image: { avatar: true, src: 'static/images/avatar/small/jenny.jpg' }
        }
        this.options.push(friend)
      }
    }
  },
  mounted: function () {
    this.userid = this.$tmauserid
    this.$socket.emit('messages_ready', {

    })
  },
  methods: {
    selectFriend: function (current) {
      if (this.current) {
        this.isLogged = localStorage.getItem('isLogged')
        this.userid = localStorage.getItem('userid')
        this.userID = this.current.split('_')[0]
        this.$socket.emit('user_messages', {
          from: this.userID,
          to: this.userid
        })
      }
    },
    submitLogin: function () {
      if (this.login.email === '' || this.login.password === '') {
        alert('Please enter your credentials')
        return
      }

      localStorage.setItem('isLogged', true)
      console.log('is logges' + this.isLogged)
      const formData = this.login
      this.$http
        .post('http://192.168.0.66:3000/api/v1/auth/login', JSON.stringify(formData), { emulateJSON: true })
        .then(response => {
          this.$tmauserid = response.body._id
          console.log(this.$tmauserid)
          localStorage.setItem('userid', response.body._id)
          localStorage.setItem('username', response.body.firstname)
          window.location.reload(false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onMessageWasSent (message) {
      this.$socket.emit('message',
        {
          'message': message,
          'to': this.userID
        })
      // called when the user sends a message
      let messageToShow = message
      message = {
        to: {
          firstname: this.current.split('_')[1],
          _id: this.userID
        },
        from: {
          _id: this.userid,
          firstname: localStorage.getItem('username')
        },
        message: messageToShow
      }
      console.log(message)
      message._id = (new Date()).getTime().toString()
      this.messages.push(message)
      this.messageToSend = ''
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
  }
}
</script>
