//密码登录的api
import { request } from '@/utils/request'
import type { User } from '@/types/user'
export const login = (mobile: string, password: string) => {
  return request<User>('login/password', 'post', { mobile, password })
}
