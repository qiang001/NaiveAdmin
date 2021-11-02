<template>
  <page-panel :title="'权限管理'" :allow-expand="false" @resize="setMaxHeight">
    <action-header @exportExcel="exportExcel" @add="addRole"></action-header>
    <role-list @edit="editRole" @_delete="deleteRole"></role-list>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
  </page-panel>
</template>

<script setup lang="ts">
import { provide, readonly } from 'vue'
import { initController } from './initController'
const {
  exportLoading,
  exportExcel,
  addRole,
  roles,
  loading,
  maxHeight,
  setMaxHeight,
  editRole,
  deleteRole,
  editModalType,
  editModal,
  role,
  confirmLoading,
  closeEditModal,
  confirmEditModal,
} = initController()

import PagePanel from '@/components/PagePanel.vue'

import ActionHeader from './components/action-header.vue'
provide('exportLoading', readonly(exportLoading))

import RoleList from './components/role-list.vue'
provide('maxHeight', readonly(maxHeight))
provide('roles', readonly(roles))
provide('loading', readonly(loading))

import EditModal from './components/edit-modal.vue'
provide('editModalType', readonly(editModalType))
provide('editModal', readonly(editModal))
provide('role', role)
provide('confirmLoading', readonly(confirmLoading))
</script>

<style scoped></style>
