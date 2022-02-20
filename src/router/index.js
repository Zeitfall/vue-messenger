import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'register',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/views/login')
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/main')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
