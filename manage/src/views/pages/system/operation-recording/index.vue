<template>
  <page-panel :title="'操作记录'" :allow-expand="true">
    <record-list></record-list>
  </page-panel>
</template>

<script setup lang="ts">
import { provide, readonly } from 'vue'
import { initController } from './initController'
const { records, loading } = initController()

import PagePanel from '@/components/PagePanel.vue'

import RecordList from './components/record-list.vue'
provide('records', readonly(records))
provide('loading', readonly(loading))
</script>

<style></style>
