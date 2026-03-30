//定义请求函数
import { request } from '@/utils/request'
import type { KnowledgeParams, KnowledgePage } from '@/types/consulet'

export const getKnowledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('patient/home/knowledge', 'get', params)
}
