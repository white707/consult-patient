<script setup lang="ts">
import { NavBar as VanNavBar } from 'vant'
//通过props传入标题和右边的文本
defineProps<{
  title?: string
  rightText?: string
}>()
//自定义emit来触发自定义事件
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
//点击右边的文本时触发自定义事件
const onClickRight = () => {
  emit('click-right')
}
</script>
<template>
  <VanNavBar :title="title" fixed left-arrow :right-text="rightText" @click-right="onClickRight" />
</template>
<style scoped lang="scss">
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
