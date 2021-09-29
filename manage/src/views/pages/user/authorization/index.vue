<template>
  <page-panel :title="'权限管理'">
    <role-list @edit="editRole"></role-list>
    <auth-setting
      @cancel="closeAuthSettingModal"
      @save="saveAuthSetting"
    ></auth-setting>
  </page-panel>
</template>

<script setup>
import PagePanel from '@/components/PagePanel.vue'
import AuthSetting from './components/auth-setting.vue'
import RoleList from './components/role-list.vue'
import { initController } from './initController'
import { provide, readonly } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const {
  roles,
  editRole,
  authSettingModal,
  closeAuthSettingModal,
  saveAuthSetting,
} = initController()
provide('roles', readonly(roles))
provide('authSettingModal', authSettingModal)
provide('getMenuAuthTree', store.getters.getMenuAuthTree)
provide('getHideAuthKeys', store.getters.getHideAuthKeys)
</script>

<style scoped></style>
