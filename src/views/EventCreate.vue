<template>
  <div>
    <h1>Create An Event</h1>
    <form @submit.prevent="createEVent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput label="Title" v-model="event.title" placeholder="Title" />
      <BaseInput
        label="Description"
        v-model="event.description"
        placeholder="Add a description"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        placeholder="Add a location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect label="Select a time" :options="times" v-model="event.time" />

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Nprogress from 'nprogress'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObj()
    }
  },
  methods: {
    createEVent() {
      Nprogress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObj()
        })
        .catch(() => Nprogress.done())
    },
    createFreshEventObj() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user.name,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
