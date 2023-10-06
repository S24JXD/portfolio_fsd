<template class="p-3 mb-2 bg-dark text-white">
  <div class="p-3 mb-2 bg-dark text-white">
    <h1 class="text-center text-info display-4" ><strong>Login</strong></h1>
<br/>
    <form @submit.prevent="handleSubmit" class="text-center">
      <h5  class="text-center text-info " for="email">Email:</h5>
      <input type="email" name="email" v-model="email" />
      <div v-show="submitted && !email">Email is required</div>
      <!-- if lgoin is clicked and submitted becomes true but 
            theres no email then say email is reuired     -->

      <br /><br />

      <h5 class="text-center text-info " for="password">Password: </h5>
      <input type="password" name="password" v-model="password" />
      <div  class="text-info " v-show="submitted && !password">Password is required</div>


      <br /><br />
     <!-- <p class="text-info ">{{ email + " " + password}}</p>-->

      <button  class="btn btn-outline-info"> Login</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { usersService } from "../../services/users.service";
import EmailValidator from 'email-validator'
export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    }
  },


  methods: {
    handleSubmit(e) {
      this.submitted = true
      this.error = ""
      const { email, password } = this

      if (!(email && password)) {
        return;
      }

      if (!(EmailValidator.validate(email))) {
        this.error = "Email must be a valid email."
        return;
      }

      const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!(password_pattern.test(password))) {
        this.error = "Password is not strong enough"
        return;
      }
      alert("button clicked")

      usersService.login(email, password)
        .then(result => {
          console.log("Auth - go to dash")
          this.$router.push("/dashboard")
        })
        .catch(error => {
          this.error = error;
          this.loading = false;

        })



    }
  }
}




</script>