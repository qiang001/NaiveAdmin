import { reactive } from 'vue'
export type resultType = 'success' | 'error'
export interface IResultOptions {
  showModal: boolean
  type: resultType
  content?: string
  description?: string
  confirmBtnText?: string
}
export interface ISetTexts {
  content?: string
  description?: string
  confirmBtnText?: string
}
export interface I_useResultModal_openResultModal {
  (): void
}
export interface I_useResultModal_openResultModalAsync {
  (): Promise<unknown>
}
export interface I_useResultModal_closeResultModal {
  (): void
}
export interface I_useResultModal_setResultType {
  (type: resultType): void
}
export interface I_useResultModal_setTexts {
  (payload: ISetTexts): void
}
export const useResultModal = () => {
  const options = reactive<IResultOptions>({
    showModal: false,
    type: undefined,
    content: '',
    description: '',
    confirmBtnText: '',
  })
  const openResultModal = () => {
    options.showModal = true
  }
  let resolveFunc = null
  const openResultModalAsync = async () => {
    options.showModal = true
    return new Promise((res) => (resolveFunc = res))
  }
  const closeResultModal = () => {
    options.showModal = false
    resolveFunc && resolveFunc()
  }
  const setResultType = (type: resultType) => {
    options.type = type
  }
  const setTexts = (
    payload: ISetTexts = {
      content: '',
      description: '',
      confirmBtnText: '知道了',
    }
  ) => {
    const { content, description, confirmBtnText } = payload
    options.content = content
    options.description = description
    options.confirmBtnText = confirmBtnText
  }
  return {
    resultOptions: options,
    setResultType,
    setTexts,
    openResultModal,
    openResultModalAsync,
    closeResultModal,
  }
}
