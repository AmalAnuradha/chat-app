<template>
  <div>
    <input type='text' placeholder='email...' v-model='login.email'>
    <input type='text' placeholder='password...' v-model='login.password'>
    <div class='ui teal button' v-on:click='submitLogin()'>LOGIN</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin: function () {
      const formData = this.login
      this.$http
        .post('http://192.168.0.66:3000/api/v1/auth/login', JSON.stringify(formData), { emulateJSON: true })
        .then(response => {
          this.$tmauserid = response.body._id
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
