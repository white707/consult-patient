<script setup lang="ts">
import { List as VanList } from 'vant'
import KnowledgeCard from './knowledgeCard.vue'
import { ref } from 'vue'
import type { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/consulet'
import { getKnowledgePage } from '@/services/cosnult'

const props = defineProps<{
  type: KnowledgeType
}>()
//加载中的状态
const loading = ref(false)
//是否完全加载完数据
const finished = ref(false)
//数据列表
const list = ref<KnowledgeList>([])
//查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 5,
})
//加载更多数据
const onLoad = async () => {
  const res = await getKnowledgePage(params.value)
  list.value = [...list.value, ...res.data.rows]
  //判断加载完成
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
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
      <knowledge-card :item="item" v-for="item in list" :key="item.id"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
