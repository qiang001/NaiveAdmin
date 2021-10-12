<template>
  <page-panel :title="'操作记录'" :ifExpand="false" @resize="setMaxHeight">
    <record-list></record-list>
  </page-panel>
</template>

<script setup>
import { provide, readonly } from 'vue'
import { initController } from './initController'
const { store,records, loading, maxHeight, setMaxHeight } = initController()

import PagePanel from '@/components/PagePanel.vue'

import RecordList from './components/record-list.vue'
provide('maxHeight', readonly(maxHeight))
provide('records', readonly(records))
provide('loading', readonly(loading))
provide('store',readonly(store))
</script>

<style></style>
