import { createApp } from 'vue'
import App from './App.vue'
import { ChakraProvider } from '@chakra-ui/vue-next'
import '@chakra-ui/vue-next/dist/style.css'

const app = createApp(App)
app.use(ChakraProvider)
app.mount('#app')