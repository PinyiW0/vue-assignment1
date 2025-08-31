import { createRouter, createWebHistory } from 'vue-router'
import WeekOne from '../views/WeekOne.vue'
import WeekThree from '../views/WeekThree.vue'
import WeekTwo from '../views/WeekTwo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'week-one',
      component: WeekOne
    },
    {
      path: '/week-two',
      name: 'week-two',
      component: WeekTwo
    },
    {
      path: '/week-three',
      name: 'week-three',
      component: WeekThree
    },
  ]
})

export default router
