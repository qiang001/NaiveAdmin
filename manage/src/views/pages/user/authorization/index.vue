<template>
  <page-panel :title="'权限管理'" :allow-expand="!roles.length">
    <action-header @exportExcel="exportExcel" @add="addRole"></action-header>
    <role-list @edit="editRole" @_delete="deleteRole"></role-list>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
    <result-modal
      :showModal="resultOptions.showModal"
      :type="resultOptions.type"
      :content="resultOptions.content"
      :description="resultOptions.description"
      :confirmBtnText="resultOptions.confirmBtnText"
      @confirm="closeResultModal"
    />
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
  editRole,
  deleteRole,
  editModalType,
  editModal,
  role,
  confirmLoading,
  closeEditModal,
  confirmEditModal,
  resultOptions,
  closeResultModal,
} = initController()

import PagePanel from '@/components/PagePanel.vue'
import ResultModal from '@/components/ResultModal.vue'

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
