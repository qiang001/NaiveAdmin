export interface IRoleListItem {
  _id: string
  name: string
  desc: string
  usersCount?: number
  pageAuths: string[]
  pageCheckedAuths: string[]
  contentAuths: string[]
  logicAuths: string[]
  createdAt?: string
}
