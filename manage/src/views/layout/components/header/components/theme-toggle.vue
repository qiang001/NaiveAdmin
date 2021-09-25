<template>
  <div
    id="toggle-wrapper"
    :class="`${store.state.ifDark ? 'dark-theme' : 'light-theme'}`"
  >
    <button id="theme-toggle" @click="switchTheme">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const switchTheme = () => {
  store.state.ifDark ? enableLightMode() : enableDarkMode()

  function enableDarkMode() {
    store.commit('SET_IFDARK', true)
  }
  function enableLightMode() {
    store.commit('SET_IFDARK', false)
  }
}
</script>

<style scoped>
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
