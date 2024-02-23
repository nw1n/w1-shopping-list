<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores'

const mainStore = useMainStore()
const view = computed(() => mainStore.$state.view)

const buttonText = computed(() =>
  mainStore.$state.view === 'products' ? 'Start List' : 'Back',
)
</script>

<template>
  <div class="w-full">
    <div class="pt-14"></div>
    <div class="flex w-full fixed bottom-0 left-0 right-0 p-2 pb-4 bg-white">
      <button
        class="clear-selection-button text-white bg-sky-600 p-1 mr-1 text-xs"
        v-if="view === 'products'"
        @click="mainStore.clearSelection"
      >
        Clear Selection
      </button>
      <button
        v-if="view === 'products'"
        class="clear-selection-button text-white bg-sky-600 p-1 text-xs"
        @click="mainStore.syncProducts"
      >
        Sync Products
      </button>
      <button
        :class="`view-changer view-changer--${view} text-white bg-sky-600 p-1 mla px-1 py-1 text-2xl ml-auto`"
        @click="mainStore.changeView"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  right: 0;
}
</style>
