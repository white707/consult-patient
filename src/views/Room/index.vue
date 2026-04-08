<script setup lang="ts">
import RoomMessage from './components/RoomMessage.vue'
import RoomAction from './components/RoomAction.vue'
import CpNavBar from '@/components/cpNavBar.vue'
import RoomStatus from './components/RoomStatus.vue'
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
