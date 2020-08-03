<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model="email"
      @blur="$v.email.$touch()"
      :class="{ error: $v.email.$error }"
    />
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please Enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <button type="submit" :disabled="$v.$invalid">Submit</button>
    <p v-if="$v.$anyError">Fill out the required fields</p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('All good', this.email)
      }
    }
  }
}
</script>
