<template>
  <page-panel :title="'用户列表'" @resize="setMaxHeight">
    <action-header
      @add="addUser"
      @clear="clearConditions"
      @changeSort="changeSort"
      @search="searchUsers"
    ></action-header>
    <user-list @edit="editUser" @_delete="deleteUser"></user-list>
    <pagination
      @changePage="changePage"
      @changePageSize="changePageSize"
    ></pagination>
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
  filters,
  sort,
  searching,
  addUser,
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
  deleteUser,
} = initController()

provide('store', store)

import PagePanel from '@/components/PagePanel.vue'

import ActionHeader from './components/action-header.vue'
provide('filters', filters)
provide('searching', readonly(searching))
provide('sort', sort)

import UserList from './components/user-list.vue'
provide('users', readonly(users))
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
</script>

<style scoped></style>
