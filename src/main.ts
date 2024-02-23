import { createApp } from 'vue'
import { createPinia } from 'pinia'
import _ from 'lodash';
import App from './components/App.vue'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
