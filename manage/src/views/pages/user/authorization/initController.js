import { useApiCenter } from './hooks/useApiCenter'
import { useRoleList } from './hooks/useRoleList'
import { useAuthSetting } from './hooks/useAuthSetting'

export const initController = () => {
  const { getRoles, saveToDB } = useApiCenter()

  const {
    showModal: authSettingModal,
    open: openAuthSettingModal,
    close: closeAuthSettingModal,
    save: saveAuthSetting,
  } = useAuthSetting(saveToDB)

  const { roles, edit: editRole } = useRoleList(getRoles, openAuthSettingModal)
  
  return {
    roles,
    editRole,
    authSettingModal,
    closeAuthSettingModal,
    saveAuthSetting,
  }
}
