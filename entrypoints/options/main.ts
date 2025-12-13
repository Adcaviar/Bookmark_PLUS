import { createApp } from 'vue';
import App from './index.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Antd).mount('#app');
