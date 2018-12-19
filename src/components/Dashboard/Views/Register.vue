<template lang="html">
<sui-container text class="container-login">
  <sui-form v-on:submit.prevent="onSubmit">
    <sui-form-field>
      <label>First Name</label>
      <input placeholder="First Name" v-model="register.firstname">
    </sui-form-field>
    <sui-form-field>
      <label>Last Name</label>
      <input placeholder="Last Name" v-model="register.lastname">
    </sui-form-field>
    <sui-form-field>
      <label>Email</label>
      <input placeholder="Email" v-model="register.email">
    </sui-form-field>
    <sui-form-field>
      <label>Password</label>
      <input placeholder="Password" v-model="register.password" type="password">
    </sui-form-field>
    <sui-form-field>
      <label>Confirm Password</label>
      <input placeholder="Confirm Password" v-model="register.confirmpassword" type="password">
    </sui-form-field>
    <sui-button type="submit" v-on:click='registerUser()'>Register</sui-button>
  </sui-form>
  </sui-container>
</template>

<script>
export default {
  data () {
    return {
      register: {
        email: '',
        password: '',
        confirmpassword: '',
        firstname: '',
        mobile: '',
        lastname: ''
      }
    }
  },
  methods: {
    registerUser: function () {
      if (this.register.email === '' || this.register.password === '') {
        alert('Please type email and passwword')
        return
      }

      const formData = this.register
      this.$http
        .post('http://192.168.0.66:3000/api/v1/auth/register', JSON.stringify(formData), { emulateJSON: true })
        .then(response => {
          window.location.reload(false)
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
