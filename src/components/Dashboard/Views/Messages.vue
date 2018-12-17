<template>
  <div>
    <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
  </div>
</template>
<script>
// export default {
//   data () {

//     return {
//       messages: []
//     }
//   },
//   sockets: {
//     connect: function () {
//       console.log('socket connected')
//       this.$socket.emit('user_messages', {
//         from: '5bf28ce7c42b0838623f493c'
//       })
//     },
//     user_messages: function (data) {
//       console.log(
//         data
//       )
//       this.messages = data
//     },
//     message: function (data) {
//       console.log(
//         data
//       )
//       this.messages.push(data)
//       this.$socket.emit('recieve message', [data._id])
//     }
//   },
//   methods: {
//     clickButton: function (data) {
//       // $socket is socket.io-client instance
//       this.$socket.emit('emit_method', data)
//     }
//   }
// }
export default {
  name: 'app',
  data () {
    return {
      participants: [
        {
          id: '5c0df1275b18020ccf928597',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: '5bf28ce7c42b0838623f493c',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.$socket.emit('user_messages', {
        from: '5bf28ce7c42b0838623f493c',
        to: '5c0df1275b18020ccf928597'
      })
    },
    user_messages: function (data) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        let tempMessage = {
          text: data[i].message
        }
        let message
        if (data[i].from._id === '5bf28ce7c42b0838623f493c') {
          message = { author: data[i].from._id, type: 'text', data: tempMessage }
        } else if (data[i].from._id === '5c0df1275b18020ccf928597') {
          message = { author: data[i].from._id, type: 'text', data: tempMessage }
        }
        this.messageList.push(message)
      }
    },
    message: function (data) {
      console.log(
        data
      )
      let tempMessage = {
        text: data.message
      }
      let message = {author: '5bf28ce7c42b0838623f493c', type: 'text', data: tempMessage}
      this.messageList.push(message)
      this.$socket.emit('recieve message', [data._id])
    }
  },
  methods: {
    sendMessage (text) {
      console.log(text)
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: '5c0df1275b18020ccf928597', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      console.log(message)
      this.$socket.emit('message',
        {
          'message': message.data.text,
          'to': '5bf28ce7c42b0838623f493c'
        })
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
      console.log(message)
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
<style>
</style>
