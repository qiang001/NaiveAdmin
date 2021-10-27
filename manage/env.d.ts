/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  $message: any
  $dialog: any
  gsap:any
}

declare interface Document {
  [propName: string]: any
}

declare interface Date {
  Format: any
}
