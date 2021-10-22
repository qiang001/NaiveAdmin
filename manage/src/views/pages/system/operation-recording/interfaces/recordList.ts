interface iDiff {
  value: string
  added?: boolean
  removed?: boolean
}

export interface IChange {
  _id: string
  name: string
  desc: string
  diffArr: Array<iDiff>
}

export interface IUserInfo {
  _id: string
  name: string
  username: string
}
export interface IRecord {
  _id: string
  name: string
  desc: string
  changes: Array<IChange>
  visitorInfo: IUserInfo
  createdAt: string
}
