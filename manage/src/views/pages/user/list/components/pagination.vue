<template>
  <div class="d-flex a-center mt-1">
    <div class="ml-auto">
      <n-pagination
        :item-count="pagination.total"
        :page="pagination.page"
        :page-sizes="pagination.sizes"
        showSizePicker
        :on-update:page="changePage"
        :on-update:page-size="changePageSize"
      />
    </div>
  </div>
</template>

<script setup>
import { NPagination } from 'naive-ui'
import { inject } from 'vue'
const pagination = inject('pagination')
// 暴露事件
const emit = defineEmits(['changePage', 'changePageSize'])

const changePage = (val) => {
  emit('changePage', val)
}

const changePageSize = (val) => {
  emit('changePageSize', val)
}
</script>

<style></style>
