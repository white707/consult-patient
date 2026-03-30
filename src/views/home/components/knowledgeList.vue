<script setup lang="ts">
import { List as VanList } from 'vant'
import KnowledgeCard from './knowledgeCard.vue'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consulet'

defineProps<{
  type: KnowledgeType
}>()
//加载中的状态
const loading = ref(false)
//是否完全加载完数据
const finished = ref(false)
//数据列表
const list = ref<number[]>([])
//加载更多数据
const onLoad = () => {
  const data = [1, 2, 3, 4, 5]
  setTimeout(() => {
    list.value.push(...data)

    if (list.value.length >= 20) {
      finished.value = true
    }
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="(item, i) in list" :key="i"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
