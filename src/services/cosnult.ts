//定义请求函数
import { request } from '@/utils/request'
import type {
  KnowledgeParams,
  KnowledgePage,
  TopDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderItem,
} from '@/types/consulet'

export const getKnowledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('patient/home/knowledge', 'get', params)
}
export const getALLDep = () => {
  return request<TopDep[]>('dep/all')
}
//上传图片接口
export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request<Image>('upload', 'post', formData)
}
//获取预支付信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) => {
  return request<ConsultOrderPreData>('patient/consult/order/pre', 'get', params)
}
//创建问诊订单
export const createConsultOrder = (data: PartialConsult) => {
  return request<{ id: string }>('patient/consult/order', 'post', data)
}
//获得支付url
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return request<{ payUrl: string }>('patient/consult/pay', 'post', params)
}

export const getCosultOrderDetail = (orderId: string) => {
  return request<ConsultOrderItem>('patient/consult/order/detail', 'get', { orderId })
}
