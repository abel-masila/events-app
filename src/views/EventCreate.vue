<template>
  <div>
    <h1>Create An Event {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'categories']),
    catLength() {
      return this.$store.getters.catLength
    }
  }
}
</script>

<style></style>
