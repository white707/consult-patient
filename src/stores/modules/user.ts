import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
// import { t } from 'vue-router/dist/index-DFCq6eJK.js'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    //用户信息的状态
    const user = ref<User>()
    //设置用户登陆后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  { persist: true },
)
