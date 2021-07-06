import { createApp } from 'vue';
import App from './App.vue';
import VueNextProgressbar from '../src/progressbar';
import '../src/progressbar.scss';

const app = createApp(App);
app.use(VueNextProgressbar);
app.mount('#app');
