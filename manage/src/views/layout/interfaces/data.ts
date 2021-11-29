export interface IHistory {
  name: string
  label: string
  ifCurrent: boolean
  query: {
    [queryKey: string]: string
  }
  fullPath: string
  path: string
  meta: {
    [metaKey: string]: string
  }
}
