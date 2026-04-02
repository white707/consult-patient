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
    //问诊级别二甲三甲
    const setIllnessType = (illnessType: 0 | 1) => {
      consult.value.illnessType = illnessType
    }
    return { consult, setType, setIllnessType }
  },
  { persist: true },
)
