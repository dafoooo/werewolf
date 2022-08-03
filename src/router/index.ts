import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/SettingView.vue'),
    },
    {
      path: '/deck',
      name: 'deck',
      component: () => import('@/views/DeckView.vue'),
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('@/views/PlayerView.vue'),
    },
    {
      path: '/night',
      name: 'night',
      component: () => import('@/views/NightView.vue'),
    },
    {
      path: '/day',
      name: 'day',
      component: () => import('@/views/DayView.vue'),
    },
  ],
})

export default router
