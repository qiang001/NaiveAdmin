<template>
  <page-panel :title="'权限管理'" @resize="setMaxHeight">
    <action-header @exportExcel="exportExcel" @add="addRole"></action-header>
    <role-list @edit="editRole"></role-list>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
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
  maxHeight,
  setMaxHeight,
  editRole,
  ifEdit,
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

import EditModal from './components/edit-modal.vue'
provide('getMenuAuthTree', store.getters.getMenuAuthTree)
provide('getHideAuthKeys', store.getters.getHideAuthKeys)
provide('ifEdit', readonly(ifEdit))
provide('editModal', readonly(editModal))
provide('role', role)
provide('confirmLoading', readonly(confirmLoading))
</script>

<style scoped></style>
