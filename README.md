# Vue next progressbar
> Slim progress bars for Vue 3.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#compiles-and-hot-reloads-for-development)
- [License](#license)

## Installation
``` bash
npm install @jambonn/vue-next-progressbar
```

or if you prefer yarn

``` bash
yarn add @jambonn/vue-next-progressbar
```

## Usage
### Global
You may install Vue next progressbar globally:
```js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import VueNextProgressbar from '@jambonn/vue-next-progressbar';
import App from './App.vue';

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [],
}));
app.use(VueNextProgressbar, { router: true });
app.mount('#app');
```
### Use in component
When install global Vue next progressbar, you can control progress in component
```vue
<template>
  <button type="button" @click="progressBar.start()">Shows the progress bar</button>
  <button type="button" @click="progressBar.done()">Completes the progress</button>
</template>
<script>
import { getCurrentInstance, inject } from 'vue';
export default {
  setup() {
    // Get from global properties
    const app = getCurrentInstance();
    const progressBar = app.appContext.config.globalProperties.$Progressbar;

    // Get from provide
    const injectProgressBar = inject('Progressbar');
    return { progressBar, injectProgressBar }
  }
}
</script>
```

### Control progress
Simply call start() and done() to control the Vue next progress bar.
```js
import { VueProgressbar } from '@jambonn/vue-next-progressbar';
VueProgressbar.start();
VueProgressbar.done();
```

### Configuration
#### `trickleSpeed`
Adjust how often to trickle/increment, in ms.
```js
import { createApp } from 'vue';
import VueNextProgressbar from '@jambonn/vue-next-progressbar';
import App from './App.vue';

const app = createApp(App);
const options = {
  trickleSpeed: 500, // default: 800
};
app.use(VueNextProgressbar, options);
```

### Compiles and hot-reloads for development
``` bash
yarn install
yarn dev
```
then navigate to `http://localhost:8080`

### Compiles and minifies for production
```
yarn build
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
