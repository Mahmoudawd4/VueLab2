import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Lab3 from './Lab3.vue'

import book from './components/book.vue'

import './assets/main.css'
// const app = createApp(App)

const app = createApp(Lab3)

// const app = createApp(book)

app.use(router)

app.mount('#app')
// createApp(Lab3).mount('.container')
