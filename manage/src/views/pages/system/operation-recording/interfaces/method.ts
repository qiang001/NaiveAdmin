import { IRecord } from './data'
export interface I_initController_queryRecords {
  (): Promise<void>
}

export interface I_useApiCenter_getRecords {
  (): Promise<Array<IRecord>>
}
