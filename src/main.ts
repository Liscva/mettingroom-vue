import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './router';
import App from './App.vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import 'animate.css/animate.min.css'

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')
