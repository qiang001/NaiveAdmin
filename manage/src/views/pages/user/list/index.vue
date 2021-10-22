<template>
  <page-panel :title="'用户列表'" @resize="setMaxHeight">
    <action-header
      @add="addUser"
      @changeStatus="changeStatus"
      @clear="clearConditions"
      @changeSort="changeSort"
      @search="searchUsers"
    ></action-header>
    <user-list @edit="editUser" @resetPassword="resetPassword" @_delete="deleteUser"></user-list>
    <pagination
      @changePage="changePage"
      @changePageSize="changePageSize"
    ></pagination>
    <edit-modal
      @cancel="closeEditModal"
      @confirm="confirmEditModal"
    ></edit-modal>
    <reset-password-modal
      @cancel="closeResetPasswordModal"
      @confirm="confirmResetPasswordModal"
    ></reset-password-modal>
  </page-panel>
</template>

<script setup lang="ts">
import { provide, readonly } from 'vue'
import { initController } from './initController'
const {
  store,
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
  maxHeight,
  setMaxHeight,
  pagination,
  changePage,
  changePageSize,
  editUser,
  ifEdit,
  editModal,
  user,
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
} = initController()

provide('store', store)

import PagePanel from '@/components/PagePanel.vue'

import ActionHeader from './components/action-header.vue'
provide('filters', filters)
provide('searching', readonly(searching))
provide('sort', sort)

import UserList from './components/user-list.vue'
provide('users', users)
provide('loading', readonly(loading))
provide('maxHeight', readonly(maxHeight))

import Pagination from './components/pagination.vue'
provide('pagination', pagination)

import EditModal from './components/edit-modal.vue'
provide('ifEdit', readonly(ifEdit))
provide('editModal', readonly(editModal))
provide('user', user)
provide('roleOptions', readonly(roleOptions))
provide('confirmLoading', readonly(confirmLoading))

import ResetPasswordModal from './components/reset-password-modal.vue'
provide('resetPasswordModal', readonly(resetPasswordModal))
provide('resetUser', resetUser)
provide('resetLoading', readonly(resetLoading))
</script>

<style scoped></style>
