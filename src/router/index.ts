import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

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
//全局前置导航
router.beforeEach((to) => {
  //获取token
  const store = useUserStore()
  //白名单
  const whiteList = ['/login']
  //如果没有token，且不在白名单中，跳转到登录页
  if (!store.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
})

export default router
