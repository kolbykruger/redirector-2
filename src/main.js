import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Global Components
import Pageheading from '@/components/Pageheading'
import PageNavigation from '@/components/PageNavigation'
import Tooltip from '@/components/Tooltip'

// Define App
const app = createApp(App)

// Register Components
app.component('Pageheading', Pageheading)
app.component('PageNavigation', PageNavigation)
app.component('Tooltip', Tooltip)

app.use(store)
    .use(router)
    .mount('#app')
