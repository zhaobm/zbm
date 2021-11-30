import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import './assets/css/leaflet.css';
import './assets/css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import { fontSize } from './assets/js/fontsize';
import { Scrollbar } from 'element-ui';
import './lib/openlayers/ol.css';
import echarts from 'echarts';
import 'jquery'
import './assets/css/commen.css';
import namelist from './assets/er/js/自然保护区.js';
// import VueHighcharts from 'vue-highcharts';
// Vue.use(VueHighcharts);

// import VideoPlayer from 'vue-video-player'
// import 'vue-video-player/src/custom-theme.css'
// import 'video.js/dist/video-js.css'
// Vue.use(VideoPlayer)

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video


Vue.use(ElementUI);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.namelist = namelist;
fontSize();


new Vue({
  // VueHighcharts,
  router,
  store,
  ElementUI,
  Scrollbar,
  render: h => h(App)
}).$mount('#app')
