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

export interface State {
  mainColor: string
  ifDark: boolean
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
