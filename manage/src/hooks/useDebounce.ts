import { ref } from 'vue'
export function useDebounce(fn, delay = 1000) {
  let timer = null
  const ifProcessing = ref(false)
  return {
    ifProcessing,
    func:function () {
      ifProcessing.value = true
      let _this = this
      let _arguments = arguments
      if (timer) clearTimeout(timer)
      return new Promise((resolve, reject) => {
        timer = setTimeout(async function () {
          try {
            let res = await fn.apply(_this, _arguments)
            resolve(res)
          } catch (error) {
            reject(error)
          }
          ifProcessing.value = false
        }, delay)
      })
    },
  }
}
