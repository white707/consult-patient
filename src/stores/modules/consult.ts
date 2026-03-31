import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consulet'
import type { ConsultType } from '@/enums'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    //问诊消息
    const consult = ref<PartialConsult>({})
    //立即问诊类型
    const setType = (type: ConsultType) => {
      consult.value.type = type
    }
    return { consult, setType }
  },
  { persist: true },
)
