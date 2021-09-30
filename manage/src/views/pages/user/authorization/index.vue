<template>
  <page-panel :title="'权限管理'">
    <action-header @exportExcel="exportExcel" @add="addRole"></action-header>
    <role-list @edit="editRole"></role-list>
    <edit-modal @cancel="closeEditModal" @save="saveEditModal"></edit-modal>
  </page-panel>
</template>

<script setup>
import { provide, readonly } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

import { initController } from './initController'
const {
  exportLoading,
  exportExcel,
  addRole,
  roles,
  editRole,
  ifEdit,
  editModal,
  role,
  saveLoading,
  closeEditModal,
  saveEditModal,
} = initController()

import PagePanel from '@/components/PagePanel.vue'

import ActionHeader from './components/action-header.vue'
provide('exportLoading', readonly(exportLoading))

import RoleList from './components/role-list.vue'
provide('roles', readonly(roles))

import EditModal from './components/edit-modal.vue'
provide('getMenuAuthTree', store.getters.getMenuAuthTree)
provide('getHideAuthKeys', store.getters.getHideAuthKeys)
provide('ifEdit', readonly(ifEdit))
provide('editModal', readonly(editModal))
provide('role', role)
provide('saveLoading', readonly(saveLoading))
</script>

<style scoped></style>
