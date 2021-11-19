<template>
  <div>
    <n-drawer v-model:show="settingShow" :width="280" placement="right">
      <n-drawer-content title="全局配置" closable :native-scrollbar="false">
        <n-divider>「布局风格」</n-divider>
        <div class="d-flex a-center j-sb">
          <div
            v-for="(item, index) in styles"
            :key="item.styleName"
            class="d-flex a-center j-sb"
          >
            <n-checkbox
              v-model:checked="item.checked"
              :on-update:checked="(bool) => setStyle(item.styleName, bool)"
            >
              <div class="d-flex a-center">
                <n-element
                  class="d-flex"
                  style="
                    flex-direction: column;
                    width: 40px;
                    height: 40px;
                    box-shadow: 0 0 6px 0 #80808026;
                  "
                >
                  <div
                    style="height: 10px; background-color: var(--base-color)"
                    :style="{
                      backgroundColor: !ifDark
                        ? 'var(--base-color)'
                        : 'var(--table-color)',
                    }"
                    v-if="item.styleName === 'top-left-right'"
                  ></div>
                  <div
                    style="height: 10px; background-color: var(--base-color)"
                    :style="{
                      backgroundColor: 'var(--inverted-color)',
                    }"
                    v-if="item.styleName === 'top-left-right-inverted'"
                  ></div>
                  <div class="d-flex" style="flex: 1">
                    <div
                      style="flex: 1; background-color: var(--divider-color)"
                    ></div>
                    <div
                      style="
                        flex: 3;
                        background-color: var(--table-header-color);
                      "
                    ></div>
                  </div>
                </n-element>
              </div>
            </n-checkbox>
          </div>
        </div>
        <n-divider>「暗黑模式」</n-divider>
        <div class="d-flex a-center j-center">
          <n-switch
            v-model:value="ifDark"
            @update:value="handleSwitch"
            size="small"
          >
          </n-switch>
          <div class="ml-1">
            <div style="font-size: 12px" v-if="ifDark">关闭暗黑模式</div>
            <div style="font-size: 12px" v-else>开启暗黑模式</div>
          </div>
          <div
            class="ml-auto"
            :class="`${store.state.ifDark ? 'dark-theme' : 'light-theme'}`"
          >
            <button id="theme-toggle" @click="switchTheme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 472.39 472.39"
              >
                <g class="toggle-sun">
                  <path
                    d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"
                  />
                </g>
                <g class="toggle-circle">
                  <circle class="cls-1" cx="236.2" cy="236.2" r="103.78" />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <n-divider>「主题颜色」</n-divider>
        <div>
          <div
            v-for="(item, index) in colors"
            :key="item.key"
            class="d-flex a-center j-sb"
          >
            <n-checkbox
              v-model:checked="item.checked"
              :on-update:checked="(bool) => setColor(item, bool)"
            >
              <div class="d-flex a-center py-1" style="width: 209px">
                <div>{{ item.label }}</div>
                <div
                  style="width: 38px"
                  class="d-flex a-center j-center ml-auto"
                >
                  <div
                    class="color-box"
                    :style="{ backgroundColor: item.common.primaryColor }"
                  ></div>
                </div>
              </div>
            </n-checkbox>
          </div>
        </div>
        <n-divider>「页面设置」</n-divider>
        <n-space align="center">
          <n-checkbox
            v-model:checked="ifPageTitle"
            :on-update:checked="ifPageTitleChange"
          >
            标题
          </n-checkbox>
          <n-checkbox
            v-model:checked="ifEmbedded"
            :on-update:checked="ifEmbeddedChange"
          >
            嵌入效果
          </n-checkbox>
        </n-space>
        <n-divider>「左侧菜单」</n-divider>
        <n-space align="center">
          <n-checkbox
            v-model:checked="inverted"
            :on-update:checked="invertedChange"
          >
            深色
          </n-checkbox>
          <n-checkbox
            v-model:checked="accordion"
            :on-update:checked="accordionChange"
          >
            手风琴
          </n-checkbox>
          <n-checkbox
            v-model:checked="ifShowIcon"
            :on-update:checked="ifShowIconChange"
          >
            图标
          </n-checkbox>
          <n-checkbox
            v-model:checked="ifShowSearch"
            :on-update:checked="ifShowSearchChange"
          >
            快捷搜索
          </n-checkbox>
        </n-space>
        <template #footer>
          <n-button
            @click="resetSetting"
            type="primary"
            style="width: 100%"
            :loading="loading"
            :disabled="loading"
          >
            <template #icon>
              <n-icon>
                <renew-icon />
              </n-icon>
            </template>
            恢复默认配置
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDrawer,
  NDrawerContent,
  NCheckbox,
  NDivider,
  NSwitch,
  NSpace,
  NElement,
} from 'naive-ui'
import RenewIcon from '@vicons/material/AutorenewSharp'

import { useStore } from '@/hooks/useStore'
const store = useStore()

import { ref, inject, Ref } from 'vue'

const settingShow = inject('settingShow') as Ref<boolean>

import { layoutStyleType } from '@/store'
const styles = ref<Array<{ styleName: layoutStyleType; checked: boolean }>>([])
styles.value = store.getters.getLayoutStyles
const setStyle = (style: layoutStyleType, bool: boolean) => {
  if (!bool) return
  styles.value.forEach((s) => {
    style == s.styleName
      ? ((s.checked = true), store.commit('SET_LAYOUTSTYLE', style))
      : (s.checked = false)
  })
}

import { IColorInfo } from '@/configuration'
const colors = ref<Array<IColorInfo>>([])
colors.value = store.getters.getMainColors

const setColor = (item: IColorInfo, bool: boolean) => {
  if (!bool) return
  colors.value.forEach((color) => {
    item.key == color.key
      ? ((item.checked = true), store.commit('SET_MAINCOLOR', item.key))
      : (color.checked = false)
  })
}

const ifDark = ref(false)
ifDark.value = store.state.ifDark

const handleSwitch = (bool: boolean) => {
  ifDark.value = bool
  switchTheme()
}

const switchTheme = () => {
  store.state.ifDark
    ? ((ifDark.value = false), enableLightMode())
    : ((ifDark.value = true), enableDarkMode())

  function enableDarkMode() {
    store.commit('SET_IFDARK', true)
  }
  function enableLightMode() {
    store.commit('SET_IFDARK', false)
  }
}

const ifPageTitle = ref(true)
ifPageTitle.value = store.state.ifPageTitle

const ifPageTitleChange = (val: boolean) => {
  ifPageTitle.value = val
  store.commit('SET_IFPAGETITLE', val)
  val && ifEmbeddedChange(true)
}

const ifEmbedded = ref(true)
ifEmbedded.value = store.state.ifEmbedded

const ifEmbeddedChange = (val: boolean) => {
  ifEmbedded.value = val
  store.commit('SET_IFEMBEDDED', val)
}

const collapsed = inject('collapsed') as Ref<boolean>
const inverted = inject('inverted') as Ref<boolean>
const accordion = inject('accordion') as Ref<boolean>
const ifShowIcon = inject('ifShowIcon') as Ref<boolean>
const ifShowSearch = inject('ifShowSearch') as Ref<boolean>

const invertedChange = (val: boolean) => {
  inverted.value = val
}
const accordionChange = (val: boolean) => {
  accordion.value = val
}
const ifShowIconChange = (val: boolean) => {
  ifShowIcon.value = val
}
const ifShowSearchChange = (val: boolean) => {
  ifShowSearch.value = val
}

import { useDebounce } from '@/hooks/useDebounce'
const emit = defineEmits(['close'])
const { ifProcessing: loading, func: resetSetting } = useDebounce(() => {
  let defaultStyle = styles.value[0].styleName
  setStyle(defaultStyle, true)
  let defaultColor = colors.value[0]
  setColor(defaultColor, true)
  if (ifDark.value) {
    switchTheme()
  }
  ifPageTitleChange(false)
  ifEmbeddedChange(false)
  invertedChange(false)
  accordionChange(false)
  ifShowIconChange(true)
  emit('close')
  window.$message.success('恭喜你，默认配置恢复成功！')
})
</script>

<style scoped>
.color-box {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

:root {
  --clr-foreground: hsl(0 0% 0%);
  --clr-background: hsl(0 0% 100%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --clr-background: hsl(0 0% 0%);
    --clr-foreground: hsl(0 0% 100%);
  }
}

.light-theme {
  --clr-foreground: hsl(0 0% 0%);
  --clr-background: hsl(0 0% 100%);
}

.dark-theme {
  --clr-background: hsl(0 0% 0%);
  --clr-foreground: hsl(0 0% 100%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#toggle-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#theme-toggle {
  cursor: pointer;
  background: 0;
  border: 0;
  opacity: 0.8;
  padding: 10px;
  border-radius: 50%;
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
}

#theme-toggle svg {
  fill: var(--clr-foreground);
}

#theme-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 50% / 0.2);
  border-radius: inherit;
  transform: scale(0);
  opacity: 0;
  z-index: -1;
}

.light-theme #theme-toggle::before {
  animation: pulseToLight 650ms ease-out;
}

.dark-theme #theme-toggle::before {
  animation: pulseToDark 650ms ease-out;
}

#theme-toggle:hover,
#theme-toggle:focus {
  outline: 0;
  opacity: 1;
  background: hsl(0 0% 50% / 0.15);
}

#theme-toggle:hover::after,
#theme-toggle:focus-visible::after {
  opacity: 0.7;
  transform: scale(1);
  transition: transform 70ms linear, opacity 70ms linear;
}

.toggle-circle {
  transition: transform 500ms ease-out;
}

.light-theme .toggle-circle {
  transform: translateX(-15%);
}

.toggle-sun {
  transform-origin: center center;
  transition: transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32);
}

.light-theme .toggle-sun {
  transform: rotate(0.5turn);
}

@keyframes pulseToLight {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  10% {
    transform: scale(1);
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes pulseToDark {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  10% {
    transform: scale(1);
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
