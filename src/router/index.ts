import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingView from '../views/SettingView.vue'
import TheDeck from '../pages/TheDeck.vue'
import ThePeople from '../pages/ThePeople.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },
    {
      path: '/deck',
      name: 'deck',
      component: TheDeck,
    },
    {
      path: '/people',
      name: 'people',
      component: ThePeople,
    },
  ],
})

export default router
