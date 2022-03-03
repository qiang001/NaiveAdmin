import { ref, UnwrapRef, Ref } from 'vue'

export type Commit<T> = (val: T) => void

const useState = <T>(initial?: T) => {
  const state = ref<T>(initial)
  const commit = (next: T) => (state.value = next as UnwrapRef<T>)
  return [state, commit] as [Ref<T>, Commit<T>]
}

export { useState }
