<script setup lang="ts">
import { useUserStore } from './stores'
import { Button } from 'vant'

const store = useUserStore()
</script>

<template>
  <p>{{ store.user }}</p>
  <Button @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">
    登录
  </Button>
  <Button @click="store.delUser()" type="primary"> 退出 </Button>
  <Button type="primary"> 重置密码 </Button>
</template>
