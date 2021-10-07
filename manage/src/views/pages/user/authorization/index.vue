<template>
  <page-panel :title="'权限管理'" :ifExpand="false" @resize="setMaxHeight">
    <action-header @exportExcel="exportExcel" @add="addRole"></action-header>
    <role-list @edit="editRole" @_delete="deleteRole"></role-list>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
  </page-panel>
</template>

<script setup>
import { provide, readonly } from 'vue'
import { initController } from './initController'
const {
  store,
  exportLoading,
  exportExcel,
  addRole,
  roles,
  maxHeight,
  setMaxHeight,
  editRole,
  deleteRole,
  ifEdit,
  editModal,
  role,
  confirmLoading,
  closeEditModal,
  confirmEditModal,
} = initController()

provide('store', store)

import PagePanel from '@/components/PagePanel.vue'

import ActionHeader from './components/action-header.vue'
provide('exportLoading', readonly(exportLoading))

import RoleList from './components/role-list.vue'
provide('maxHeight', readonly(maxHeight))
provide('roles', readonly(roles))

import EditModal from './components/edit-modal.vue'
provide('ifEdit', readonly(ifEdit))
provide('editModal', readonly(editModal))
provide('role', role)
provide('confirmLoading', readonly(confirmLoading))
</script>

<style scoped></style>
