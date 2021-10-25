interface iDiff {
  value: string
  added?: boolean
  removed?: boolean
}

interface iChange {
  _id: string
  name: string
  desc: string
  diffArr: Array<iDiff>
}

interface iUserInfo {
  _id: string
  name: string
  username: string
}

export interface IRecord {
  _id: string
  name: string
  desc: string
  changes: Array<iChange>
  visitorInfo: iUserInfo
  createdAt: string
}
