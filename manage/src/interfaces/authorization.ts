export interface IMenuItem {
  icon?: any
  label: string
  key: string
  expandedKey: string
  children?: IMenuItem[]
}

export interface IMenuAuth {
  label: string
  key: string
  belongsTo?: string
  expandedKey: string
  children?: IMenuAuth[]
}

export interface ISearchOption {
  label: string
  labelPinYin: string
  value: string
}

export interface IMenuAuthsFlated {
  ALL_AUTH_KEYS: string[]
  HIDE_AUTH_KEYS: Array<{
    name: string
    belongsTo: string
  }>
  searchOptions: ISearchOption[]
}
