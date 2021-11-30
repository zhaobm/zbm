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


import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video
// 引入vue-bmap-gl


import BaiduMap from 'vue-baidu-map'
// 引入vue-bmap-gl
import VueBMap from "vue-bmap-gl";
import VueMapvgl from "vue-mapvgl";
// import "vue-bmap-gl/dist/style.css";

// Vue.use(VueBMap);
// Vue.prototype.VueBMap = VueBMap;
// Vue.use(VueMapvgl);
// Vue.prototype.VueMapvgl = VueMapvgl;
//
// // 初始化vue-bmap
// VueBMap.initBMapApiLoader({
//   // 百度的key
//   ak: "NjDEPza8cZjtIG8hs5OyOM3ycKvy8mMj",//用自己的百度地图ak
//   // 百度 sdk 版本，默认为 1.0
//   v: "1.0"
// });



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
