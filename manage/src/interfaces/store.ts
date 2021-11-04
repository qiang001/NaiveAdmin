import { IMenuItem } from './authorization'

export interface IUserInfo {
  _id: string
  username: string
  name: string
  roles: Array<{
    pageAuths: string[]
    contentAuths: string[]
    logicAuths: string[]
  }>
}

export type layoutStyleType = 'top-left-right' | 'left-right'

export interface State {
  layoutStyle: layoutStyleType
  mainColor: string
  ifDark: boolean
  ifPageTitle: boolean
  cacheList: string[]
  menuOptions: IMenuItem[]
  menuOptionsWithoutIcon: IMenuItem[]
  token: string
  userInfo: IUserInfo
  authKeys: string[]
  contentAuths: string[]
  logicAuths: string[]
  loginPageMessage: {
    type: string | null
    text: string | null
  }
}
