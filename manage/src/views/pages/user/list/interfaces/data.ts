export interface IUserListItem {
  _id: string
  name: string
  username: string
  gender: string
  age: number
  avatar: string
  roles: Array<{
    name: string
    _id: string
  }>
  ifActive: boolean
  createdAt: string
}

export interface IEditUser {
  _id: string
  name: string
  username: string
  password: string
  roles: string[]
  ifActive: boolean
}

export interface IRoleOption {
  label: string
  value: string
}

export interface IUserResetPassword {
  _id: string
  password: string
  passwordConfirm: string
}

export interface IFilters {
  name: string
  username: string
  ifActive: string
}
