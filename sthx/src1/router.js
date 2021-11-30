import Vue from 'vue'
import Router from 'vue-router'
import ResourceOverview from './views/stzkpj/index.vue'
import StzkbhOverview from './views/stzkbh/index.vue'
import stygview from './views/CesiumTest/styg.vue'
import stdmview from './views/CesiumTest/stdm.vue'
import xykhview from './views/CesiumTest/xykh.vue'
import xykhview2 from './views/CesiumTest/xykh2.vue'
import xykhview3 from './views/CesiumTest/xykh3.vue'
import zrbhdview from './views/CesiumTest/zrbhd.vue'
import BmapShow from './views/bmap/bmap.vue'
import stzlview from './views/CesiumTest/stzl.vue'
import mywrview from './views/CesiumTest/mywr.vue'
import mainview from './views/CesiumTest/main.vue'

import showBox from './views/show.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: showBox,
      redirect: 'show',
      children: [
        {
          path: '/show',
          name: 'show',
          component: zrbhdview
        },
        {
          path: '/stxz',
          name: 'stxz',
          component: ResourceOverview
        },
        {
          path: '/stbh',
          name: 'stbh',
          component: StzkbhOverview
        },
        {
          path: '/xykhview2',
          name: 'xykhview2',
          component: xykhview2
        },
        {
          path: '/xykhview3',
          name: 'xykhview3',
          component: xykhview3
        },{
          path: '/stygview',
          name: 'stygview',
          component: stygview
        },
        {
          path: '/stdmview',
          name: 'stdmview',
          component: stdmview
        },
        {
          path: '/xykhview',
          name: 'xykhview',
          component: xykhview
        },{
          path: '/zrbhdview',
          name: 'zrbhdview',
          component: zrbhdview
        },{
          path: '/BmapShow',
          name: 'BmapShow',
          component: BmapShow
        }
      ]
    }

  ],
  //mode:'history'
})
