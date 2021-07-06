<template>
  <header class="page-header">
    <div class="page-header__logo">
      <img src="./assets/logo.png" alt="" />
      <span class="page-header__logo-text"></span>
    </div>
    <h1>Vue Progressbar</h1>
    <p class="brief big">Slim progress bars for Vue 3.</p>
  </header>
  <div class="contents">
    <div class="controls">
      <p>
        <button class="button play" @click="progressBar.start()"></button>
        <i>ProgressBar</i><b>.start()</b>
        — shows the progress bar
      </p>
      <p>
        <button class="button play" @click="progressBar.done()"></button>
        <i>ProgressBar</i><b>.done()</b>
        — completes the progress
      </p>
    </div>
  </div>
  <div class="hr-rule"></div>
  <div class="share-buttons">
    <iframe
      src="https://ghbtns.com/github-btn.html?user=jambonn&amp;repo=vue-next-progressbar&amp;type=watch&amp;count=true"
      allowtransparency="true"
      frameborder="0"
      scrolling="0"
      width="100"
      height="20"
    ></iframe>
    <iframe
      src="https://ghbtns.com/github-btn.html?user=jambonn&amp;type=follow&amp;count=true"
      allowtransparency="true"
      frameborder="0"
      scrolling="0"
      width="175"
      height="20"
    ></iframe>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue';
export default {
  name: 'App',
  setup() {
    const app = getCurrentInstance();
    const progressBar = app.appContext.config.globalProperties.$Progressbar;
    return { progressBar };
  },
};
</script>
<style lang="css">
* {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
body {
  background: #fff;
}
body,
html {
  padding: 0;
  margin: 0;
}
body,
td,
input,
textarea {
  font-family: inter, source sans pro, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #222;
}
.page-header {
  text-align: center;
  max-width: 400px;
  padding: 3em 20px;
  margin: 0 auto;
}
@media (min-width: 480px) {
  .page-header {
    padding: 4.5em 20px 3.5em;
  }
}
.page-header h1 {
  font-size: 2em;
  text-align: center;
  font-weight: 200;
  line-height: 1.3;
  color: #333;
  margin: 0;
}
@media (min-width: 480px) {
  .page-header h1 {
    font-size: 3em;
    margin-top: 1em;
    margin-bottom: 0.4em;
  }
}
.page-header__logo {
  position: relative;
  display: inline-block;
}
.page-header__logo-text {
  display: inline-block;
  width: 100px;
  height: 20px;
  border: solid 4px #2d9;
  border-radius: 10px;
  position: absolute;
  right: -20px;
  bottom: 20px;
}
.page-header__logo-text:after {
  content: '';
  display: block;
  position: absolute;
  top: 4px;
  left: 4px;
  bottom: 4px;
  width: 40%;
  background: #2d9;
  border-radius: 3px;
}
p.brief.big {
  font-size: 1.1em;
}
button {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}
.button {
  display: inline-block;
  text-decoration: none;
  background: #eee;
  color: #777;
  border-radius: 2px;
  padding: 8px 10px;
  font-weight: 700;
  text-align: left;
}
.button.play:before {
  content: '\25b6';
}
.controls .button {
  width: 40px;
  margin-right: 10px;
  text-align: center;
}
i,
b {
  font-style: normal;
  font-weight: 400;
}
.controls {
  font-size: 0.9em;
  text-align: left;
  margin: 0 auto;
  max-width: 480px;
}
@media (min-width: 480px) {
  .controls {
    max-width: 380px;
  }
}
.controls i {
  color: #999;
}
.controls b {
  color: #29d;
  font-weight: 700;
}
.hr-rule {
  height: 1px;
  width: 100px;
  margin: 40px auto;
  background: #ddd;
}
.share-buttons {
  margin: 0 auto;
  text-align: center;
}
</style>
