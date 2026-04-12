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
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enums'
import { ref } from 'vue'
import { getCosultOrderDetail } from '@/services/cosnult'
import type { ConsultOrderItem } from '@/types/consulet'

const route = useRoute()
const store = useUserStore()
const list = ref<Message[]>([])
const cosnult = ref<ConsultOrderItem>()
const loadConsult = async () => {
  const res = await getCosultOrderDetail(route.query.orderId as string)
  cosnult.value = res.data
}
let socket: Socket
onMounted(() => {
  loadConsult()
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

  //获取聊天记录，第一次（默认消息）
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    //data数据转换成[{createtime},...items]
    const arr: Message[] = []
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime,
        },
        createTime: item.createTime,
        id: item.createTime,
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)
  })
  //监听订单状态变化
  socket.on('orderStatusChange', () => {
    loadConsult()
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
    <!-- 咨询消息框 -->
    <RoomMessage v-for="item in list" :key="item.id" :item="item" />

    <!-- 咨询操作栏 -->
    <RoomAction />
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
