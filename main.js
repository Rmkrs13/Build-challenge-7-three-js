import { ChakraUIVuePlugin } from '@chakra-ui/vue-next'
import '@chakra-ui/vue-next/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ChakraUIVuePlugin)
app.mount('#app')