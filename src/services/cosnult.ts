//定义请求函数
import { request } from '@/utils/request'
import type { KnowledgeParams, KnowledgePage, TopDep, Image } from '@/types/consulet'

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
