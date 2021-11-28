import { NSpace, useDialog, NProgress } from 'naive-ui'
import { h, ref, Ref } from 'vue'
export interface I_renderProcessing_start {
  (): void
}
export const renderProcessing = (text: string, loadingRef: Ref<boolean>) => {
  let percentage = ref(0)
  let renderContent = (per: number) => {
    return h(
      NSpace,
      { vertical: true },
      {
        default: () => {
          return [
            h(
              'div',
              { style: { fontWeight: 'bold' } },
              { default: () => text || 'loading...' }
            ),
            h(NProgress, {
              type: 'line',
              height: 18,
              percentage: per,
              processing: true,
              indicatorPlacement: 'inside',
              borderRadius: 2,
            }),
          ]
        },
      }
    )
  }
  const dialog = useDialog()
  const start = () => {
    const d = dialog.create({
      bordered: true,
      closable: false,
      showIcon: false,
      maskClosable: false,
      content: () => renderContent(0),
    })

    startProgress()

    async function startProgress() {
      if (!loadingRef.value) {
        if (percentage.value) {
          return await finishProgress()
        }
      }
      await continueProgress()
    }

    async function sleep(count: number) {
      return new Promise((resolve) => setTimeout(resolve, count))
    }
    async function continueProgress() {
      await sleep(50)
      percentage.value += Math.random() * 3
      if (percentage.value >= 99) {
        percentage.value = 99.99
      }
      percentage.value = Math.round(percentage.value * 100) / 100
      d.content = () => renderContent(percentage.value)
      await startProgress()
    }
    async function finishProgress() {
      await sleep(50)
      percentage.value = 0
      d.content = () => renderContent(100)
      await sleep(500)
      d.destroy()
      setTimeout(() => window.$message.success('恭喜你，导出成功！'), 200)
    }
  }
  return {
    start,
  }
}
