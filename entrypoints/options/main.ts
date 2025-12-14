import { createApp } from 'vue';
import Options from './options.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(Options);
app.use(Antd).mount('#app');
