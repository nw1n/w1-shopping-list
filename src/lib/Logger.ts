import { useLogStore } from './../stores/logger'

let instance: Logger | null = null

export default class Logger {
  logStore: any

  constructor() {
    this.logStore = useLogStore()
  }

  addRecord(msg, lvl = 'info') {
    const rec = {
      timestamp: Date.now(),
      lvl,
      msg: msg ? msg : 'no log message',
    }
    this.logStore.addNewRecord(rec)
    console.log(rec.lvl + ': ' + rec.msg)
  }
  clearAll() {
    this.logStore.removeAllRecords()
    console.log('all records removed')
  }
  get allLogs() {
    return this.logStore.records
  }
  static getInstance() {
    if (!instance) {
      instance = new Logger()
    }
    return instance
  }
}
