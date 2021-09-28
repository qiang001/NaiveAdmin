<template>
  <page-panel :title="'权限管理'">
    <role-list></role-list>
    <auth-setting @changeAuthKeys="changeAuthKeys"></auth-setting>
  </page-panel>
</template>

<script setup>
import PagePanel from '@/components/PagePanel.vue'
import AuthSetting from './componens/auth-setting.vue'
import RoleList from './componens/role-list.vue'
const changeAuthKeys = (authKeys) => {
  console.log(authKeys)
}
</script>

<style scoped></style>
