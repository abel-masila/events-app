import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NotFound from '../components/NotFound.vue'
import NetworkIssue from '../components/NetworkIssue.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
    props: true
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: { resource: 'page' }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start()
  next()
})
router.afterEach(() => {
  Nprogress.done()
})
export default router
