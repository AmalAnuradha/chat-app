<template lang="html">
  <div>
    <friends class="form-group"></friends>
    <requests class="form-group"></requests>
    <users class="form-group"></users>
  </div>
</template>
  
<script>
import Friends from './pair/Friends.vue'
import Requests from './pair/Requests.vue'
import Users from './pair/Users.vue'
export default {
  components: {
    Friends,
    Requests,
    Users
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
