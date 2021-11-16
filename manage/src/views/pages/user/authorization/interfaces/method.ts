import { IRoleListItem } from './data'
import { modalType } from '@/hooks/useModal'

export interface I_initController_queryRoles {
  (): Promise<void>
}

export interface I_useActionHeader_exportExcel {
  (): Promise<void>
}

export interface I_useActionHeader_add {
  (): void
}

export interface I_useApiCenter_exportData {
  (): Promise<boolean>
}
export interface I_useApiCenter_getRoles {
  (): Promise<Array<IRoleListItem>>
}
export interface I_useApiCenter_saveToDB {
  (i: { data: IRoleListItem; type: modalType }): Promise<void>
}
export interface I_useApiCenter_deleteFromDB {
  (i: { data: { _id: string } }): Promise<void>
}

export interface I_useEditModal_open {
  (i: { data?: IRoleListItem; type: modalType }): void
}

export interface I_useEditModal_close {
  (): void
}

export interface I_useEditModal_confirm {
  (i: {
    pageAuths: string[]
    pageCheckedAuths: string[]
    contentAuths: string[]
    logicAuths: string[]
  }): Promise<void>
}

export interface I_useRoleList_edit {
  (row: IRoleListItem): void
}
export interface I_useRoleList__delete {
  (row: IRoleListItem): void
}
export interface I_useRoleList_closeResultModal {
  (): void
}
