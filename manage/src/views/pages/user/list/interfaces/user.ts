export interface IUserListItem {
  _id: string
  name: string
  username: string
  roles: Array<{
    name: string
    _id: string
  }>
  ifActive: boolean
  createdAt: string
}

export interface IUser {
  _id: string
  name: string
  username: string
  password: string
  roles: string[]
  ifActive: boolean
}

export interface IUserResetPassword {
  _id: string
  password: string
  passwordConfirm: string
}
