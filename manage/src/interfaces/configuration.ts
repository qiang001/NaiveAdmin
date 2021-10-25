export interface IPageItem {
  name: string
  label: string
  labelPinYin?: string
  icon?: string
  path?: string
  ifCache?: boolean
  ifHide?: boolean
  belongsTo?: string
  children?: IPageItem[]
}

export interface IPermission {
  page: string
  label: string
  contentAuths: Array<{ key: string; desc: string }>
  logicAuths: Array<{ key: string; desc: string }>
}

export interface IColorInfo {
  key: string
  label: string
  common: {
    baseColor?: string
    primaryColor: string
    primaryColorHover: string
    primaryColorPressed: string
    primaryColorSuppl: string
    [otherKey: string]: any
  }
  [otherComponentName: string]: any
}

export interface IColorCollection {
  [colorName: string]: IColorInfo
}
