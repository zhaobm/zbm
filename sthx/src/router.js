import Vue from 'vue'
import Router from 'vue-router'
import ResourceOverview from './views/stzkpj/index.vue'
import StzkbhOverview from './views/stzkbh/index.vue'
import stygview from './views/CesiumTest/styg.vue'
import stdmview from './views/CesiumTest/earth.vue'
import xykhview from './views/CesiumTest/xykh.vue'
import zrbhdview from './views/CesiumTest/zrbhd.vue'
import zrbhdview2 from './views/CesiumTest/zrbhd2.vue'
import stzlview from './views/CesiumTest/stzl.vue'
import mywrview from './views/CesiumTest/mywr.vue'
import mainview from './views/CesiumTest/main.vue'

import tuji from './components/common/tuji.vue'
import duoping from './components/common/duibi/duoping.vue'
import juanlian from './components/common/duibi/juanlian.vue'

import videox from './views/html/g.vue'
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
          component: tuji
        },

        {
          path: '/mywrview',
          name: 'mywrview',
          component: mywrview
        },
        {
          path: '/stzlview',
          name: 'stzlview',
          component: stzlview
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
        //   path: '/zrbhdview2',
        //   name: 'zrbhdview2',
        //   component: zrbhdview2
        // },{
          path: '/tuji',
          name: 'tuji',
          component: tuji
        }
        ,{
          path: '/duoping',
          name: 'duoping',
          component: duoping
        }
        ,{
          path: '/juanlian',
          name: 'juanlian',
          component: juanlian
        }
      ]
    }

  ],
  //mode:'history'
})
