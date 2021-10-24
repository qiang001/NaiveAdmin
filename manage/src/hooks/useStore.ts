import { InjectionKey } from 'vue'
import {  Store,useStore as _useStore } from 'vuex'
import { State } from '../interfaces/store'

export const storeKey: InjectionKey<Store<State>> = Symbol()

export const useStore = ():Store<State> => {
    const store = _useStore(storeKey)
    return store
}