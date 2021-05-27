import Vue from 'vue';
import components from './components';
import main from './views/view.main.vue';
import Engine from '../engine';

for (let key in components) {
  Vue.component(key, components[key]);
}

window.addEventListener('load', async () => {

  const engine = new Engine({cars:1});

  await engine.init('assets/map.png');

  new Vue({
    el: '#app',
    render: h => h(main, {props: {engine}})
  });

});
