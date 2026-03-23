import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: '/article',
          component: () => import('@/views/article/index.vue'),
        },
        {
          path: '/notify',
          component: () => import('@/views/notify/index.vue'),
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue'),
        },
      ],
    },
  ],
})
export default router
