<script setup lang="ts">
import { ref } from 'vue'
import Logger from '../lib/Logger'

const isOpen = ref(false)
</script>

<template>
  <div class="mt-4">
    <hr />
    <button
      @click="isOpen = !isOpen"
      :class="`text-white p-1 ${isOpen ? 'bg-sky-300' : 'bg-sky-500'}`"
    >
      Show Logs
    </button>
    <div v-if="isOpen">
      <h5 class="py-2">Logs:</h5>
      <button
        @click="Logger.getInstance().clearAll()"
        class="text-white bg-red-500 p-1"
      >
        Clear Logs
      </button>
      <ul class="text-xs mt-2 leading-3">
        <li
          v-for="(record, index) in Logger.getInstance().allLogs"
          :key="index"
          class="item mb-1"
        >
          {{ record.timestamp }}: {{ record.lvl }}: {{ record.msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
