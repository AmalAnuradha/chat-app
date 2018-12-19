<template lang="html">

 <div>
    <sui-container text class="container-login">
    <sui-form v-on:submit.prevent="onSubmit">
      <sui-form-field>
        <label>Email</label>
        <input placeholder="Email" v-model='login.email'>
      </sui-form-field>
      <sui-form-field>
        <label>Password</label>
        <input placeholder="Password" v-model='login.password' type="password">
      </sui-form-field>
      <sui-button type="submit" v-on:click='submitLogin()'>Login</sui-button>
      <sui-button type="button" v-on:click='register()'>Register</sui-button>
    </sui-form>
  </sui-container>
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
    register: function () {
      this.$router.push('/signup')
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
          localStorage.setItem('user', JSON.stringify(response.body))
          window.location.reload(false)
          this.$router.push('/admin/messages')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
