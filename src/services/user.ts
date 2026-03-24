//密码登录
import { request } from '@/utils/request'
import type { CodeType, User, UserInfo } from '@/types/user'
export const login = (mobile: string, password: string) => {
  return request<User>('login/password', 'post', { mobile, password })
}
//发送验证码
export const sendCode = (mobile: string, type: CodeType) => {
  return request('code', 'get', { mobile, type })
}
//短信登陆
export const loginByCode = (mobile: string, code: string) => {
  return request<User>('login', 'post', { mobile, code })
}
//获取用户信息
export const getUserInfo = () => {
  return request<UserInfo>('patient/myUser')
}
