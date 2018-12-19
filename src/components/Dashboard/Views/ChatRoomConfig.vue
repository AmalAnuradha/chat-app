<template>
  <div>
    <div class="row">
      <div class="col-md-12 s-m-contianer" v-if="!joined">
        <div class="ui action icon input">
          <input type="text" placeholder="Room name" v-model="roomName">
          <div class="ui teal button" v-on:click="createRoom()">create</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      roomName: ''
    }
  },
  methods: {
    createRoom: function () {
      this.$socket.emit('create_chat_room', { room: this.roomName })
      this.roomName = ''
    }
  }
}
</script>
