<script setup lang="ts">
import { useUserStore } from './stores'
import { Button } from 'vant'
const store = useUserStore()
import { request } from './utils/request'
import axios from './utils/request'
const getUser = () => {
  request('/patient/myUser', 'get')
}
const login = () => {
  axios
    .request({
      url: '/login/password',
      method: 'post',
      data: {
        mobile: '13211112222',
        password: 'abc12345',
      },
    })
    .then((res) => {
      console.log(12345, res)
    })
    .catch((err) => {
      console.log(404, err)
    })
}
</script>

<template>
  <p>{{ store.user }}</p>
  <Button @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">
    登录
  </Button>
  <Button @click="store.delUser()" type="primary"> 退出 </Button>
  <Button type="primary" @click="getUser"> 获取用户信息 </Button>
  <Button type="primary" @click="login"> 用户denglu </Button>
</template>
