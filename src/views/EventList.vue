<template>
  <div>
    <h1>Event List View</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(res => (this.events = res.data))
      .catch(e => console.log(e))
  }
}
</script>
