import {
  IUserListItem,
  IFilters,
  IRoleOption,
  IEditUser,
} from './data'
import { IPagination } from '@/hooks/usePagination'
import { modalType } from '@/hooks/useModal'
// useActionHeader
export interface I_useActionHeader_add {
  (): void
}
export interface I_useActionHeader_changeStatus {
  (val: string): Promise<void>
}
export interface I_useActionHeader_clear {
  (): Promise<void>
}
export interface I_useActionHeader_search {
  (): Promise<void>
}
export interface I_useActionHeader_changeSort {
  (val: string): Promise<void>
}

// useApiCenter
export interface I_useApiCenter_getUsers {
  (i: { filters: IFilters; sort: string; pagination: IPagination }): Promise<{
    total: number
    payload: Array<IUserListItem>
  }>
}
export interface I_useApiCenter_getRoleOptions {
  (): Promise<Array<IRoleOption>>
}
export interface I_useApiCenter_saveToDB {
  (i: { data: IEditUser; type: modalType }): Promise<void>
}
export interface I_useApiCenter_changePassword {
  (i: { data: { _id: string; password: string } }): Promise<void>
}
export interface I_useApiCenter_deleteFromDB {
  (i: { data: { _id: string } }): Promise<void>
}
// useEditModal 编辑框
export interface I_useEditModal_open {
  (i: { data?: IUserListItem; type: modalType }): void
}

export interface I_useEditModal_close {
  (): void
}

export interface I_useEditModal_confirm {
  (): Promise<void>
}

// useConditions [搜索、排序、分页]逻辑
export interface I_useConditions_resetFilters {
  (): void
}

export interface I_useConditions_setStatus {
  (val: string): void
}

export interface I_useConditions_resetSort {
  (): void
}

export interface I_useConditions_setSort {
  (val: string): void
}

export interface I_useConditions_resetPage {
  (): void
}

export interface I_useConditions_queryUsers {
  (): Promise<void>
}

export interface I_useConditions_changePage {
  (num: number): void
}

export interface I_useConditions_changePageSize {
  (num: number): void
}

// useResetPasswordModal 重置密码框
export interface I_useResetPasswordModal_open {
  (i: { data: IUserListItem }): void
}

export interface I_useResetPasswordModal_close {
  (): void
}

export interface I_useResetPasswordModal_confirm {
  (): Promise<void>
}

// useUserList
export interface I_useUserList_refresh {
  (): Promise<void>
}
export interface I_useUserList_edit {
  (row: IUserListItem): void
}
export interface I_useUserList_resetPassword {
  (row: IUserListItem): void
}
export interface I_useUserList__delete {
  (row: IUserListItem): void
}
