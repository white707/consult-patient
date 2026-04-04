import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consulet'
import type { ConsultType } from '@/enums'
import type { consultIllness } from '@/types/consulet'

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
    //问诊科室
    const setDep = (depId: string) => {
      consult.value.depId = depId
    }

    //记录病情
    const setIllness = (illness: consultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    return { consult, setType, setIllnessType, setDep, setIllness }
  },
  { persist: true },
)
