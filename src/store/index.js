import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: 'masila'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']))
          commit('SET_EVENTS', res.data)
        })

        .catch(e => console.log(e))
    },
    fetchEvent({ commit }, id) {
      EventService.getEvent(id)
        .then(res => commit('SET_EVENT', res.data))
        .catch(e => console.log(e))
    }
  },
  modules: {},
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
