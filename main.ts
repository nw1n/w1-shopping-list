import { createApp } from 'vue'
import { createPinia } from 'pinia'
import _ from 'lodash'
import App from './components/App.vue'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

const testArray = [1, 2, 3]
console.log(_.reverse(testArray))

app.use(pinia)
app.mount('#app')
