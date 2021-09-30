<template>
  <div
    style="width: 100%"
    class="page-panel"
    :class="`${store.state.ifDark ? 'page-panel-dark' : 'page-panel-light'}`"
  >
    <div class="title" v-if="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
import { toRefs } from 'vue'
const props = defineProps({
  title: String,
})
const { title } = toRefs(props)
</script>

<style scoped>
.page-panel {
  min-height: calc(100vh - 147px);
  padding: 35px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
}

@media only screen and (max-width: 720px) {
  .page-panel {
    display: none;
  }
}

.page-panel-light {
  background: white;
  box-shadow: 0 0 30px #eee;
}
.page-panel-dark {
  background: #ffffff08;
  box-shadow: 0 0 30px #00000070;
}
.title {
  font-family: Youshe Biaotihei;
  font-size: 18px;
  padding: 2px 10px;
  background: #333333;
  color: #f8f8f8;
  position: absolute;
  /* padding-left: 15px; */
  left: -9px;
  top: -9px;
  border-radius: 2px 0 2px 2px;
}
.title:after {
  content: '';
  width: 0px;
  height: 0px;
  border-top: 9px solid transparent;
  border-left: 9px solid #4b4b4b;
  position: absolute;
  top: 0;
  right: -9px;
}
</style>
