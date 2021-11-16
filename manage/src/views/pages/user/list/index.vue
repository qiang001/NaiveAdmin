<template>
  <page-panel :title="'用户列表'" :allow-expand="!users.length">
    <action-header
      @add="addUser"
      @changeStatus="changeStatus"
      @clear="clearConditions"
      @changeSort="changeSort"
      @search="searchUsers"
    ></action-header>
    <user-list
      @refresh="refreshList"
      @edit="editUser"
      @resetPassword="resetPassword"
      @_delete="deleteUser"
      @changePage="changePage"
      @changePageSize="changePageSize"
    ></user-list>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
    <reset-password-modal
      @cancel="closeResetPasswordModal"
      @confirm="confirmResetPasswordModal"
    ></reset-password-modal>
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

<script lang="ts">
export default { name: 'UserList' }
</script>

<script setup lang="ts">
import { provide, readonly } from 'vue'
import { initController } from './initController'
const {
  filters,
  sort,
  searching,
  addUser,
  changeStatus,
  clearConditions,
  searchUsers,
  changeSort,
  users,
  loading,
  dynamicWidth,
  maxHeight,
  pagination,
  changePage,
  changePageSize,
  refreshList,
  editUser,
  editModalType,
  editModal,
  user,
  rolesLoading,
  roleOptions,
  confirmLoading,
  closeEditModal,
  confirmEditModal,
  resetPassword,
  resetPasswordModal,
  resetLoading,
  resetUser,
  closeResetPasswordModal,
  confirmResetPasswordModal,
  deleteUser,
  resultOptions,
  closeResultModal,
} = initController()

import PagePanel from '@/components/PagePanel.vue'
import ResultModal from '@/components/ResultModal.vue'

import ActionHeader from './components/action-header.vue'
provide('filters', filters)
provide('searching', readonly(searching))
provide('sort', sort)

import UserList from './components/user-list.vue'
provide('users', users)
provide('loading', readonly(loading))
provide('dynamicWidth', readonly(dynamicWidth))
provide('maxHeight', readonly(maxHeight))
provide('pagination', pagination)

import EditModal from './components/edit-modal.vue'
provide('editModalType', readonly(editModalType))
provide('editModal', readonly(editModal))
provide('user', user)
provide('rolesLoading', readonly(rolesLoading))
provide('roleOptions', readonly(roleOptions))
provide('confirmLoading', readonly(confirmLoading))

import ResetPasswordModal from './components/reset-password-modal.vue'
provide('resetPasswordModal', readonly(resetPasswordModal))
provide('resetUser', resetUser)
provide('resetLoading', readonly(resetLoading))
</script>

<style scoped></style>
