import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import _ from 'lodash'

export const useLogStore = defineStore({
  id: 'logger',
  state: () => ({
    records: useStorage('log_records', []),
  }),
  getters: {
    getAllRecords() {
      return this.records
    },
  },
  actions: {
    addNewRecord(item) {
      if (item) {
        this.records.unshift(item)
      }
    },
    removeAllRecords() {
      this.records.length = 0
    },
  },
})
