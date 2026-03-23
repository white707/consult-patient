<script setup lang="ts">
import { ref } from 'vue'
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant'
import CpIcon from '@/components/cpIcon.vue'

const active = ref(0)
</script>
<template>
  <div class="layout-page">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <VanTabbar v-model="active" voute>
      <VanTabbarItem to="/home"
        >首页
        <template #icon="{ active }">
          <cp-icon :name="`home-index-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </VanTabbarItem>
      <VanTabbarItem to="/article"
        >健康百科
        <template #icon="{ active }">
          <cp-icon :name="`home-article-${active ? 'active' : 'default'}`"></cp-icon> </template
      ></VanTabbarItem>
      <VanTabbarItem to="/notify"
        >消息通知
        <template #icon="{ active }">
          <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`"></cp-icon> </template
      ></VanTabbarItem>
      <VanTabbarItem to="/user"
        >我的
        <template #icon="{ active }">
          <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`"></cp-icon> </template
      ></VanTabbarItem>
    </VanTabbar>
  </div>
</template>
<style scoped lang="scss">
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
