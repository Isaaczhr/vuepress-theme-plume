<script setup lang="ts">
import VPLink from '@theme/VPLink.vue'
import { FadeInExpandTransition } from '@vuepress/helper/client'
import { ref } from 'vue'
import { useLangs } from '../../composables/index.js'

import '@vuepress/helper/transition/fade-in-height-expand.css'

const { localeLinks, currentLang } = useLangs()
const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
    v-if="localeLinks.length && currentLang.text"
    class="vp-nav-screen-translations"
    :class="{ open: isOpen }"
  >
    <button class="title" @click="toggle">
      <span class="vpi-languages icon lang" />
      {{ currentLang.text }}
      <span class="vpi-chevron-down icon chevron" />
    </button>

    <FadeInExpandTransition>
      <div v-show="isOpen" class="vp-nav-screen-translations-container">
        <ul class="list">
          <li v-for="locale in localeLinks" :key="locale.link" class="item">
            <VPLink class="link" :href="locale.link">
              {{ locale.text }}
            </VPLink>
          </li>
        </ul>
      </div>
    </FadeInExpandTransition>
  </div>
</template>

<style scoped>
.vp-nav-screen-translations {
  min-height: 24px;
  overflow: hidden;
}

.title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color var(--vp-t-color);
}

.icon {
  font-size: 16px;
}

.icon.lang {
  margin-right: 8px;
}

.icon.chevron {
  margin-left: 4px;
}

.list {
  padding: 4px 0 0 24px;
}

.link {
  font-size: 13px;
  line-height: 32px;
  color: var(--vp-c-text-1);
  transition: color var(--vp-t-color);
}
</style>
