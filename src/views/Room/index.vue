<script setup lang="ts">
import io, { Socket } from 'socket.io-client'
import RoomMessage from './components/RoomMessage.vue'
import RoomAction from './components/RoomAction.vue'
import CpNavBar from '@/components/cpNavBar.vue'
import RoomStatus from './components/RoomStatus.vue'
import { onMounted, onUnmounted } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useUserStore()
let socket: Socket
onMounted(() => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`,
    },
    query: {
      orderId: route.query.orderId,
    },
  })
  socket.on('connect', () => {
    console.log('连接成功')
  })
  socket.on('disconnect', () => {
    console.log('连接断开')
  })
  socket.on('error', () => {
    console.log('连接错误')
  })
})

onUnmounted(() => {
  socket.close()
})

// //建立连接
// const socket = io('http://localhost:3000')
// //监听连接成功事件
// socket.on('connect', () => {
//   console.log('连接成功')
//   //发送消息
//   socket.emit('chat message', 'Hello, server!')
// })
// //监听消息事件
// socket.on('chat message', (msg) => {
//   console.log(msg)
//   socket.close()
// })
// socket.on('disconnect', () => {
//   console.log('连接断开')
// })
</script>
<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室"></cp-nav-bar>
    <!-- 咨询状态栏 -->
    <RoomStatus />
    <!-- 咨询操作栏 -->
    <RoomAction />
    <!-- 咨询消息框 -->
    <RoomMessage />
  </div>
</template>
<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
