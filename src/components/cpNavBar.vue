<script setup lang="ts">
import { NavBar as VanNavBar } from 'vant'
</script>

<template>
  <VanNavBar title="登录" fixed left-arrow right-text="注册" />
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
