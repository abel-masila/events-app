<template>
  <div>
    <h1>Create An Event {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user', 'categories'])
}
</script>

<style></style>
