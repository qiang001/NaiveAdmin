/* eslint-disable */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  $message: any
  $dialog: any
}

declare interface Document {
  [propName: string]: any
}

declare interface Date {
  Format: any
}

/// <reference types="vite/client" />
