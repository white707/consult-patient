import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登录' },
    },
    {
      meta: { title: '首页' },
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          meta: { title: '首页' },
          path: '/home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          meta: { title: '健康百科' },
          path: '/article',
          component: () => import('@/views/article/index.vue'),
        },
        {
          meta: { title: '消息通知' },
          path: '/notify',
          component: () => import('@/views/notify/index.vue'),
        },
        {
          meta: { title: '个人中心' },
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
//全局后置守卫
router.afterEach((to) => {
  //设置文档标题
  document.title = `${to.meta.title || ''} - 问诊`
})
export default router
