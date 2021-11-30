<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <NewBoxDouble title="畜禽规模养殖场" class="left-top-double">
        <barLeftTopLeft :data="barDataLeftTopLeft" slot="leftContent"/>
        <barLeftTopRight :data="barDataLeftTopRight" slot="RightContent"/>
      </NewBoxDouble>
      <!--
      <NewBox1 title='全省畜禽种类规模上（万头）' class="left-top1">
        <div slot="content" class='left-top1-content'>
          <PieLeftCenter :data="pieDataLeftTopNYY"/>
        </div>
      </NewBox1>
      -->
      <NewBox1 title='种植、水产' class="left-bottom">
          <div class="leftBtn" slot="header">
            <el-button size="mini" @click.native="LeftBtnSC">水产</el-button>
            <el-dropdown size="small" split-button type="primary" class="NYYDropdown">
              种植
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="LeftBtnDM">地膜</el-dropdown-item>
                <el-dropdown-item @click.native="LeftBtnGZ">耕种</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div slot="content" class='left-bottom-content' v-show='showLeftBottomBar1'>
            <BarLeftBottom  :data="barDataLeftBottom"/>
          </div>
          <div slot="content" class='left-bottom-content' v-show='showLeftBottomBar3'>
            <BarLeftBottom2  :data="barDataLeftBottom"/>
          </div>
          <div slot="content" class='left-bottom-content' v-show='showLeftBottomPie1'>
            <PieLeftBottom1  :data="barDataLeftBottom"/>
          </div>
      </NewBox1>

      <NewBox1 title='陕西特色' class="left-bottom">
          <div class="leftBtn" slot="header">
            <el-button-group>
              <el-button size="mini" @click.native="LeftBtnSG">水果</el-button>
              <el-button size="mini" @click.native="LeftBtnNY">农药</el-button>
              <el-button size="mini" @click.native="LeftBtnHF">化肥</el-button>
            </el-button-group>
          </div>
          <div slot="content" class='left-bottom-content'>
            <BarLeftBottom1  :data="barDataLeftBottom1"/>
          </div>
      </NewBox1>
    </div>
    <div class="center">
      <Box>
          <div class="top-box">
            <mapBox />
            <!--陕北关中陕南-->
            <div class='toolBar'>
              <el-button-group>
                <el-button size="mini" round @click="shanbei()">陕北</el-button>
                <el-button size="mini" round @click="guanzhong()">关中</el-button>
                <el-button size="mini" round @click="shannan()">陕南</el-button>
              </el-button-group>
            </div>
            <!--散点图-->
            <div ref="myChart"
              class="myChart-wrapper">
            </div>
          </div>
          <!--Pop-->
          <div id= "poiPopup" class="ol-popup" :class={popupShow:isPopupShow}>
            <a href="#" id="popup-closer" class="ol-popup-closer" @click="closePopup()"></a>
            <div class="pop-content" id="popContent">
            </div>
          </div>
          <div class="css_animation" :class={DynamicPoiShow:isDynamicPoiShow} id="DynamicPoi"><p></p><span></span></div>
          <!--
          <div class="bottom-box">
              <div class="chart-warp">
                   <h3>五类源占比</h3>
                    <PieChart3 :data="pie3Data"/>
              </div>
              <div class="chart-warp">
                    <h3>企业状态</h3>
                    <PieChart4 :data="pie4Data"/>
              </div>
          </div>
          -->
      </Box>
        <NewBox title='农业源基本情况' class='centerGyy'>
            <BarCenterNYY :data="barDataYZC" slot="contentGYY" class='centerGyyBar'/>
        </NewBox>
    </div>
    <div class="right-bar">

      <NewBox1 title='废水主要污染物排放量(吨)' class="left-top">
          <div slot="content" class='left-top-content'>
            <BarRightTopNYY :data="barDataRightTopFeiShui"/>
          </div>
      </NewBox1>
      <Box title="废气主要污染物排放量(吨)" >
        <BarRightCenterNYY :data="barDataRightCenterFeiQi"/>
        <!--
        <LineChart  :data="lineData2"/>
        -->
      </Box>

      <NewBox1 title='秸秆利用量及可回收量(万吨)' class="left-bottom">
          <div class="leftBtn" slot="header">
          </div>
          <div slot="content" class='left-bottom-content'>
            <BarRightBottomNYY :data="barDataRightBottomJieGan"/>
          </div>
      </NewBox1>

    </div>
    <div></div>
    <FloatDiv class="attribute" v-show="isShowAttribute" @closeDiv = "CloseAttr" :featuredata="AttrFeatures" :title ="floatDivTitle" :selectFeature="selectFeature" @attrCall="attrCallBack"></FloatDiv>
  </div>
</template>
<script>
import LineChart from "../../components/charts/line/line1";
import Bar4 from "../../components/charts/bar/bar4";
import BarLeftCenterydy from "../../components/charts/bar/YiDongYuan/barYDY";

import BarLeftBottom from "../../components/charts/bar/NongYeYuan/barNYY";
import BarLeftBottom1 from "../../components/charts/bar/NongYeYuan/barNYY1";
import BarLeftBottom2 from "../../components/charts/bar/NongYeYuan/barNYY2";
import PieLeftBottom1 from '../../components/charts/pie/NongYeYuan/pieNYY';
import BarCenterNYY from "../../components/charts/bar/NongYeYuan/barDuiDieVNYY";

import BarRightTopNYY from "../../components/charts/bar/NongYeYuan/barNYYRight";
import BarRightCenterNYY from "../../components/charts/bar/NongYeYuan/barNYYRight2";
import BarRightBottomNYY from "../../components/charts/bar/NongYeYuan/barNYYRight3";

import BarRightBottomydy from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY1";
import BarRightTopydy from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY2";
import PieLeftBottom from '../../components/charts/pie/YiDongYuan/PieYDY';
import PieLeftCenter from '../../components/charts/pie/YiDongYuan/PieYDY1';

import barLeftTopLeft from "../../components/charts/bar/NongYeYuan/barLeftTopLeft.vue";
import barLeftTopRight from "../../components/charts/bar/NongYeYuan/barLeftTopRight.vue";


//import Bar1 from "../../components/charts/bar/barDuiDie";
//import Bar1 from "../../components/charts/bar/barDuiDieV";
import Bar1 from "../../components/charts/bar/barDuiDieVGYY";
import BarCenter from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY3";
import BarLeftTop from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY";
import PieLeftTop from "../../components/charts/bar/YiDongYuan/pieDoubleYDY";
import BarRightCenter from "../../components/charts/bar/YiDongYuan/barYDY2";
import Bar1New from "../../components/charts/bar/bar1new";
import Bar2New from "../../components/charts/bar/bar2new";
import Bar5 from "../../components/charts/bar/barDuiDieV";
import PieChart3 from '../../components/charts/pie/pie3';
import PieChart4 from '../../components/charts/pie/pie4';
import PieChart5 from '../../components/charts/pie/pie5';
import WeaterItem from "../../components/common/weather/index";
import mapBox from "../../components/map/index.vue";
import Box from "../../components/common/box";
import NewBox from "../../components/common/newBox";
import NewBoxRight from "../../components/common/newBox/index2.vue";
import ol from 'openlayers';
import * as api from "../../assets/js/api/search.js";
import FloatDiv from "../../components/common/floatDiv";
import NewBox1 from "../../components/common/newBox/index1.vue";
import NewBoxDouble from "../../components/common/newBox/indexDouble.vue";
//散点图
//引入Echart
let echarts = require("echarts/lib/echarts");
import ADLayer from "../../lib/openlayers/openlayers.echart.js";
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");


export default {
  data() {
    return {
      //重点排污单位点击事件
      isPopupShow:false,
      isDynamicPoiShow:false,
      Popup:{},
      DynamicPOI:{},
      poiName:"",
      poiAddress:"",
      poiVectorLayer:null,
      poiVectorSource:null,        
      


      //浮动DIV
      isShowAttribute:false,
      floatDivTitle:"统计表",
      AttrFeatures:{
        featureArr: {},
        totalCount:0,    
      },
      selectFeature : {},


  
      lineData1: {
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 1.46 ,41.3, 4.52 ,0.273 ],
        color: [188, 235, 127]
      },
      barDataRightTop:{
        xAxis: ["储油库","加油站","油品运输企业", "储运销"],
        CYXPFLData: [1475.87,847.51, 343.67,2667.05],
      },
      barDataRightCenter:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 4316.33,559.69,21727.63],
      },
      barDataLeftCenter:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        yAxis:["6",    "2",      "6",     "3"  ,  "1",    "12",    "5",     "4"  , "1",   "2",       "6",    "0",   "0",   ],
      },
      pieDataLeftCenter:{
        dataArr: [
          { value: 6, name: "西安市" },
          { value: 2, name: "铜川市" },
          { value: 6, name: "宝鸡市" },
          { value: 3, name: "咸阳市" },
          { value: 1, name: "渭南市" },
          { value: 12, name: "延安市" },
          { value: 5, name: "汉中市" },
          { value: 4, name: "榆林市" },
          { value: 1, name: "商洛市" },
          { value: 2, name: "安康市" },
          { value: 6, name: "西咸新区" },
        ]
      },
      pieDataLeftBottom:{
        dataArr: [
          { value: 2830600, name: "西安市" },
          { value: 112580, name: "铜川市" },
          { value: 390859, name: "宝鸡市" },
          { value: 437777, name: "咸阳市" },
          { value: 622376, name: "渭南市" },
          { value: 309832, name: "延安市" },
          { value: 565179, name: "汉中市" },
          { value: 681672, name: "榆林市" },
          { value: 140159, name: "商洛市" },
          { value: 473002, name: "安康市" },
          { value: 63160, name: "杨凌示范区" },
        ]
      },
      barDataRightBottom:{
        xAxis: ["微型客车",  "小型客车",  "中型客车", "大型客车"],
        DYHWData:[  "222.79", "7216.73","1124.65","24860.91"],
        KLWData:[  "0",  "29.07",   "15.47",  "111.68"],
        HFXYJWData:["601.16","33910.92", "166.03",  "1323.34"],
      },
      lineData2: {
        xAxis: ["SO2","NOx","颗粒物","VOCs"],
        yAxis: ["18.16","39.09","44.72","33.17"],
        color: [240,155,96]
      },
      
      lineData1ShanBei:{
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 0.2 ,  5.71, 0.52 ,  0.04 ],
        color: [188, 235, 127]
      },
      lineData1GuanZhong:{
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 1.06 ,45.68,4.21 ,0.46],
        color: [188, 235, 127]
      },
      lineData1ShanNan:{
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 0.89 ,23.06, 2.84 ,0.15 ],
        color: [188, 235, 127]
      },
      lineData2ShanBei:{
        xAxis: ["SO2","NOx","颗粒物","VOCs"],
        yAxis: ["8.76","14.19","21.25","11.94"],
        color: [240,155,96]
      },
      lineData2GuanZhong:{
        xAxis: ["SO2","NOx","颗粒物","VOCs"],
        yAxis: ["5.88","21.28","14.86","8.42"],
        color: [240,155,96]
      },
      lineData2ShanNan:{
        xAxis: ["SO2","NOx","颗粒物","VOCs"],
        yAxis: ["7.28","21.5","17.37","17.93"],
        color: [240,155,96]
      },




      lindata3: {
        xAxis: ["化学需氧量","氨氮","总氮","总磷"],
        yAxis: ["28.77","1.09","3.36","0.19"],
        yAxis1: ["12.51","0.61","1.16","0.08"],
        color: [49,173,165]
      },
      pie3Data:{
        dataArr: [
            { value: 28674, name: "工业源" },
            { value: 8381, name: "农业源" },
            { value: 1890, name: "集中式" },
            { value: 3395, name: "移动源" },
            { value: 12093, name: "生活源" },
        ]
      },
      pie4Data:{
        dataArr: [
             { value: 4758, name: "停产" },
             { value: 65, name: "工业园区" },
             { value: 2101, name: "关闭" },
             { value: 3118, name: "其它" },
             { value: 18696, name: "运行" },
        ]
      },
      /*
      barData:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","西咸新区","杨凌示范区","韩城市","安康市"],
        gyyData:["7798", "349", "3682", "2509"  , "2141", "1176", "2899", "2691", "1397", "1549", "211", "263", "2009"],
        nyyData:["809",  "322",  "838", "1431"  , "2241", "242",  "391",  "850",  "787",  "67",  "41",   "40",  "322"],
        jzsData:["131",  "42",  "529",  "137"   ,  "131",  "81",   "163",   "79",  "170",  "27",  "25",   "35",  "253"],
        ydyData:["517",  "117",  "307",  "342"  , "490",  "285",  "268",  "583",  "160",  "132",  "10",  "49",   "180"],
        shyData:["5142", "841",  "1511",  "1730"  , "2622", "3097", "2201", "5082",  "1314",  "490",  "84",  "177",  "1685"],
      },
      */
      barDataLeftTop:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        CYKData:["6",    "2",      "6",     "3"  ,  "1",    "12",    "5",     "4"  , "1",   "2",       "6",    "0",   "0",   ],
        YPYSQYData:["15",   "10",   "4",   "8"  ,   "13",   "19",  "3",    "22"  ,   "4" ,   "0",    "16",     "1",    "0",    ],
      },
      pieDataLeftTop:{
        dataArr: [
          {value:6, name:'西安市', selected:true},
          {value:2, name:'铜川市'},
          {value:6, name:'宝鸡市'},
          {value:3, name:'咸阳市'},
          {value:1, name:'渭南市'},
          {value:12, name:'延安市'},
          {value:5, name:'汉中市'},
          {value:4, name:'榆林市'},
          {value:1, name:'商洛市'},
          {value:2, name:'安康市'},
          {value:6, name:'西咸新区'},
          {value:0, name:'韩城市'},
          {value:0, name:'杨凌示范区'},
        ],
        dataArr1: 
        [
          {value:15, name:'西安市'},
          {value:10, name:'铜川市'},
          {value:4, name:'宝鸡市'},
          {value:8, name:'咸阳市'},
          {value:13, name:'渭南市'},
          {value:19, name:'延安市'},
          {value:3, name:'汉中市'},
          {value:22, name:'榆林市'},
          {value:4, name:'商洛市'},
          {value:0, name:'安康市'},
          {value:16, name:'西咸新区'},
          {value:1, name:'韩城市'},
          {value:0, name:'杨凌示范区'},
        ],
      },


      //左1
      //全省规模化养殖场数量（个）  
      barDataLeftTopLeft:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-2795,-302,-742,-4001,-540],
        
      },
      barDataLeftTopRight:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [524.70,14.14,8.81,3591.15,2943.43],
      },
      barDataLeftTopLeftQuanSheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-2795,-302,-742,-4001,-540],
        
      },
      barDataLeftTopRightQuanSheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [524.70,14.14,8.81,3591.15,2943.43],
      },
      barDataLeftTopLeftXiAn:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-227,-85,-83,-332,-82],
        
      },
      barDataLeftTopRightXiAn:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [33.92,2.17,1.34,303.43,384.36],
      },
      barDataLeftTopLeftTongChuan:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-56,-6,-19,-230,-11],
        
      },
      barDataLeftTopRightTongChuan:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [10.93,0.44,0.19,301.85,33.7],
      },
      barDataLeftTopLeftBaoJi:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-274,-47,-89,-368,-60],
        
      },
      barDataLeftTopRightBaoJi:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [29.33,3.56,1.17,374.90,259.3],
      },
      barDataLeftTopLeftXianYang:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-700,-75,-94,-483,-79],
        
      },
      barDataLeftTopRightXianYang:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [182.92,3.34,1.12,522.50,404.94],
      },
      barDataLeftTopLeftWeiNan:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-553,-57,-208,-1286,-138],
        
      },
      barDataLeftTopRightWeiNan:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [77.96,3.60,2.45,978.82,1077.9],
      },
      barDataLeftTopLeftYanAn:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-110,-1,-39,-88,-4],
        
      },
      barDataLeftTopRightYanAn:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [30.55,0.01,0.41,105.84,4.53],
      },
      barDataLeftTopLeftHanZhong:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-218,-2,-43,-108,-17],
        
      },
      barDataLeftTopRightHanZhong:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [32.65,0.01,0.34,117.23,22.2],
      },
      barDataLeftTopLeftYuLin:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-277,-16,-96,-428,-33],
        
      },
      barDataLeftTopRightYuLin:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [47.79,0.54,0.86,391.31,57.39],
      },
      barDataLeftTopLeftAnKang:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-188,0,-47,-42,-45],
        
      },
      barDataLeftTopRightAnKang:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [34.58,0,41,44.6,88.02],
      },
      barDataLeftTopLeftShangLuo:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-143,0,-17,-564,-63],
        
      },
      barDataLeftTopRightShangLuo:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [21.09,0,0.24,377.33,597.38],
      },
      barDataLeftTopLeftXiXian:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-19,-4,0,-38,-7],
        
      },
      barDataLeftTopRightXiXian:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [1.907,0.17,0,47.69,10],
      },
      barDataLeftTopLeftYangLing:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-17,-8,-6,-10,0],
        
      },
      barDataLeftTopRightYangLing:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [19.52,0.27,0.26,10.8,0],
      },
      barDataLeftTopLeftHanCheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-13,-1,-1,-24,-1],
        
      },
      barDataLeftTopRightHanCheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [1.56,0.02,0.02,14.86,3.52],
      },


      //左2
      //全省畜禽种类汇总，规模下（万头）      
      pieDataLeftCenterNYY:{
        dataArr: [
            { value: 820.7337, name: "生猪" },
            { value: 59.0347, name: "肉牛" },
            { value: 15.5604, name: "奶牛" },
            { value: 2363.8933, name: "肉鸡" },
            { value: 2264.4086, name: "蛋鸡" },
        ]
      },
      //全省畜禽种类汇总，规模下（万头）      
      pieDataQuanShengGMX:{
        dataArr: [
            { value: 820.7337, name: "生猪" },
            { value: 59.0347, name: "肉牛" },
            { value: 15.5604, name: "奶牛" },
            { value: 2363.8933, name: "肉鸡" },
            { value: 2264.4086, name: "蛋鸡" },
        ]
      },
      //各市畜禽数量，规模下
      pieDataXiAnGMX:{
        dataArr: [
            { value: 48.0075, name: "生猪" },
            { value: 4.4043, name: "肉牛" },
            { value: 1.0133, name: "奶牛" },
            { value: 201.9395, name: "肉鸡" },
            { value: 190.5617, name: "蛋鸡" },
        ]
      },
      pieDataTongChuanGMX:{
        dataArr: [
            { value: 6.1019, name: "生猪" },
            { value: 0.547, name: "肉牛" },
            { value: 0.0667, name: "奶牛" },
            { value: 16.34, name: "肉鸡" },
            { value: 62.22, name: "蛋鸡" },
        ]
      },
      pieDataBaoJiGMX:{
        dataArr: [	
            { value: 72.8968, name: "生猪" },
            { value: 14.6598, name: "肉牛" },
            { value: 10.3393, name: "奶牛" },
            { value: 205.0016, name: "肉鸡" },
            { value: 304.4748, name: "蛋鸡" },
        ]
      },      
      pieDataXianYangGMX:{
        dataArr: [
            { value: 42.9533, name: "生猪" },
            { value: 5.7836, name: "肉牛" },
            { value: 1.7829, name: "奶牛" },
            { value: 115.9384, name: "肉鸡" },
            { value: 173.7296, name: "蛋鸡" },
        ]
      },
      pieDataWeiNanGMX:{
        dataArr: [
            { value: 89.4658, name: "生猪" },
            { value: 3.2114, name: "肉牛" },
            { value: 0.3602, name: "奶牛" },
            { value: 53.2747, name: "肉鸡" },
            { value: 130.6706, name: "蛋鸡" },
        ]
      },
      pieDataYanAnGMX:{
        dataArr: [
            { value: 23.5826, name: "生猪" },
            { value: 7.4786, name: "肉牛" },
            { value: 0.1555, name: "奶牛" },
            { value: 17.9324, name: "肉鸡" },
            { value: 247.1347, name: "蛋鸡" },
        ]
      }, 
      pieDataYuLinGMX:{
        dataArr: [        				
            { value: 100.6248, name: "生猪" },
            { value: 3.9072, name: "肉牛" },
            { value: 1.484, name: "奶牛" },
            { value: 274.205, name: "肉鸡" },
            { value: 260.8891, name: "蛋鸡" },
        ]
      },                 

      pieDataHanZhongGMX:{
        dataArr: [
            { value: 213.6151, name: "生猪" },
            { value: 10.4815, name: "肉牛" },
            { value: 0.2124, name: "奶牛" },
            { value: 729.9994, name: "肉鸡" },
            { value: 261.2922, name: "蛋鸡" },
        ]
      },
      pieDataAnKangGMX:{
        dataArr: [
            { value: 142.9299, name: "生猪" },
            { value: 5.5061, name: "肉牛" },
            { value: 0, name: "奶牛" },
            { value: 634.9563, name: "肉鸡" },
            { value: 281.8951, name: "蛋鸡" },
        ]
      },
      pieDataShangLuoGMX:{
        dataArr: [
            { value: 68.7756, name: "生猪" },
            { value: 2.7332, name: "肉牛" },
            { value: 0.032, name: "奶牛" },
            { value: 112.946, name: "肉鸡" },
            { value: 326.3682, name: "蛋鸡" },
        ]
      },
      pieDataXiXianGMX:{
        dataArr: [
            { value: 3.3495, name: "生猪" },
            { value: 0.0054, name: "肉牛" },
            { value: 0.0276, name: "奶牛" },
            { value: 1.36, name: "肉鸡" },
            { value: 8.0826, name: "蛋鸡" },
        ]
      },
      pieDataYangLinGMX:{
        dataArr: [				
            { value: 0.5469, name: "生猪" },
            { value: 0.0152, name: "肉牛" },
            { value: 0.0515, name: "奶牛" },
            { value: 0, name: "肉鸡" },
            { value: 0.45, name: "蛋鸡" },
        ]
      },
      pieDataHanChengGMX:{
        dataArr: [                  								
            { value: 7.884, name: "生猪" },
            { value: 0.3014, name: "肉牛" },
            { value: 0.035, name: "奶牛" },
            { value: 0, name: "肉鸡" },
            { value: 16.64, name: "蛋鸡" },
        ]
      },

      //左3      
      btnShowZZ:true,
      btnShowTS:false,
      
      showLeftBottomBar1:true,
      showLeftBottomBar2:true,
      showLeftBottomBar3:true,
      showLeftBottomPie1:true,

      isDiMo:true,
      isGengZhong:false,
      isShuiChan : false,
      isShuiGuo : true,
      isNongYao : false,
      isHuaFei : false,
      //默认数据
      barDataLeftBottom:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 23139.74,	13737.3826],
      },
      //全省地膜
      barDataDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 23139.74,	13737.3826],
      }, 
      //各地市地膜情况
      barDataXiAnDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [1344.95,	384.3811],
      },  	  	 	 	 
      barDataTongChuanDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 601.35,	562.21],
      },  	 	 	 	
      barDataBaoJiDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 1349.2,	949.769],
      },  	  	  	 
      barDataXianYangDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [3051.6,	2086.685],
      },  	 	 	 	 	 
      barDataWeiNanDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 4728.6,	2688.4294],
      },  	 	 	 	 	 
      barDataYanAnDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 2454.11,	2065.9221],
      },
      barDataHanZhongDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 1817.52,	522.2418],
      },  
      barDataYuLinDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 3984.35,	2593.5709],
      }, 
      barDataAnKangDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 2292.48,	1073.0681],
      }, 
      barDataShangLuoDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 1137.92,	692.9044],
      }, 
      barDataXiXianDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 63.91,	4.7378],
      }, 	      
      barDataYanLinDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 181.58,	45.6044],
      }, 	 	 	 	 	 
      barDataHanChengDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 132.17,	67.8586],
      }, 

      //全省耕种(亩)
      barDataGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 44706356.35,	23224804.18],
      }, 
      //各地市耕种情况
      barDataXiAnGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [3271218,	797856],
      },  	  	 	 	 
      barDataTongChuanGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 1027631,	915673],
      },  	 	 	 	
      barDataBaoJiGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 4210736.5,	1202126],
      },  	  	  	 
      barDataXianYangGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [4811375.7,	4041537],
      },  	 	 	 	 	 
      barDataWeiNanGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 7085451,	2910957],
      },  	 	 	 	 	 
      barDataYanAnGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 4053805,	4744915],
      },
      barDataHanZhongGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 3159575,	1718955],
      },  
      barDataYuLinGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 11245424,	4019886],
      }, 
      barDataAnKangGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 2929807,	2072414],
      }, 
      barDataShangLuoGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 2005940,	551924],
      }, 
      barDataXiXianGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 477997.15,	132736.18],
      }, 	      
      barDataYanLinGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 58800,	19050],
      }, 	 	 	 	 	 
      barDataHanChengGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 368596,	96775],
      },
      //全省水产
      pieDataBottom:{
        dataArr: [
            { value: 1472, name: "规模养殖场" },
            { value: 9827, name: "规模以下养殖场" },
        ]
      },
      //各市水产养殖场个数
      pieDataXiAnWF:{
        dataArr: [
            { value: 3, name: "规模养殖场" },
            { value: 2180, name: "规模以下养殖场" },
        ]
      },
      pieDataBaoJiWF:{
        dataArr: [
            { value: 151, name: "规模养殖场" },
            { value: 281, name: "规模以下养殖场" },
        ]
      },
      pieDataXianYangWF:{
        dataArr: [
            { value: 33, name: "规模养殖场" },
            { value: 1002, name: "规模以下养殖场" },
        ]
      },
      pieDataTongChuanWF:{
        dataArr: [
            { value: 0, name: "规模养殖场" },
            { value: 243, name: "规模以下养殖场" },
        ]
      },
      pieDataWeiNanWF:{
        dataArr: [
            { value: 201, name: "规模养殖场" },
            { value: 593, name: "规模以下养殖场" },
        ]
      },
      pieDataYanAnWF:{
        dataArr: [
            { value: 60, name: "规模养殖场" },
            { value: 597, name: "规模以下养殖场" },
        ]
      },
      pieDataYuLinWF:{
        dataArr: [
            { value: 399, name: "规模养殖场" },
            { value: 1958, name: "规模以下养殖场" },
        ]
      },
      pieDataHanZhongWF:{
        dataArr: [
            { value: 162, name: "规模养殖场" },
            { value: 1959, name: "规模以下养殖场" },
        ]
      },
      pieDataAnKangWF:{
        dataArr: [
            { value: 229, name: "规模养殖场" },
            { value: 735, name: "规模以下养殖场" },
        ]
      },
      pieDataShangLuoWF:{
        dataArr: [
            { value: 225, name: "规模养殖场" },
            { value: 225, name: "规模以下养殖场" },
        ]
      },
      pieDataXiXianWF:{
        dataArr: [
            { value: 1, name: "规模养殖场" },
            { value: 42, name: "规模以下养殖场" },
        ]
      },
      pieDataHanChengWF:{
        dataArr: [
            { value: 8, name: "规模养殖场" },
            { value: 12, name: "规模以下养殖场" },
        ]
      },
      barDataLeftBottom1:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 7714414.87, 431798.69],
        HSL:    [ 3714017.66, 417149.08],
      },
      //全省陕西特色水果
      barDataShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 7714414.87, 431798.69],
        HSL:    [ 3714017.66, 417149.08],
      }, 
      //各地市水果套袋情况
      barDataXiAnShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 223008.20, 88454.18],
        HSL:    [ 222804.2, 88454.18],
      },  	  	 	 	 
      barDataTongChuanShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 348784, 96],
        HSL:    [ 346344, 0],
      },  	 	 	 	
      barDataBaoJiShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 2300544.65, 963.00],
        HSL:    [ 65030.85, 264],
      },  	  	  	 
      barDataXianYangShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 1712948.05, 246226.90 ],
        HSL:    [ 1724921.05, 234253.9],
      },  	 	 	 	 	 
      barDataWeiNanShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 1310733 ,90925],
        HSL:    [ 1300695, 88485],
      },  	 	 	 	 	 
      barDataYanAnShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 1762122.50, 0],
        HSL:    [ 3066, 0],
      },
      barDataHanZhongShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 137.80, 0],
        HSL:    [ 57.80, 0],
      },  
      barDataYuLinShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 40432.01, 1448.61],
        HSL:    [ 37860.50, 0],
      }, 
      barDataAnKangShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 20.65, 0],
        HSL:    [ 20.65, 0],
      }, 
      barDataShangLuoShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 1002.30, 0],
        HSL:    [ 986.60, 0],
      }, 
      barDataYanLinShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 9201.71, 96],
        HSL:    [ 6671.01, 2154],
      }, 	 	 	 	 	 
      barDataHanChengShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 5480, 3589],
        HSL:    [ 5480, 3589],
      }, 
      //全省陕西特色农药
      barDataNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 3674.85, 	3766.41, 	15.35, 	21.41, 	29.23 ],
        HSL:    [ 104.61, 	139.58, 	2.86, 	2.14, 	3.06 ],
      }, 
      //各地市农药情况
      barDataXiAnNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 308.26, 	309.37, 	2.94, 	2.27, 	8.78 ],
        HSL:    [ 7.70, 	12.32, 	0.00, 	0.00, 	0.09  ],
      },  	  	 	 	 
      barDataTongChuanNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 41.03, 	20.44 , 	0, 	0, 	0 ],
        HSL:    [ 0.03, 	0, 	0, 	0, 	0 ],
      },  	 	 	 	
      barDataBaoJiNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 312.67, 	442.58, 	1.67, 	0.21, 	0.01  ],
        HSL:    [ 1.87, 	1.10, 	0.02, 	0.00, 	0.00  ],
      },  	  	  	 
      barDataXianYangNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 495.02, 	493.92, 	3.03, 	1.20, 	1.35,  ],
        HSL:    [ 1.71, 	1.98, 	0.01, 	0.01, 	0.00  ],
      },  	 	 	 	 	 
      barDataWeiNanNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 1546.92, 	1240.99, 	1.66, 	5.27, 	0.65  ],
        HSL:    [ 35.38, 	57.91, 	2.01, 	0.00, 	0.00  ],
      },  	 	 
	 	 	 
      barDataYanAnNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 255.37, 	159.53, 	2.26, 	0.02, 	1.09 ],
        HSL:    [ 0, 	0, 	0, 	0, 	0],
      }, 	 	 	 	 
      barDataHanZhongNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 251.78, 	578.83, 	0.36, 	1.17, 	0.24  ],
        HSL:    [ 23.05, 	19.15, 	0.29, 	0.20, 	0.20  ],
      },  
      barDataYuLinNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 208.31, 	85.09, 	0.40, 	1.90, 	10.72  ],
        HSL:    [ 0, 	0, 	0.07, 	0, 	0 ],
      }, 
      barDataAnKangNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 99.80, 	210.56, 	0.25, 	2.36, 	6.32  ],
        HSL:    [ 20.88, 	30.99, 	0.05, 	1.92, 	2.77  ],
      }, 
      barDataShangLuoNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 43.01, 	120.76, 	1.43, 	7.00, 	0.07  ],
        HSL:    [ 12.00, 	14.86, 	0.42, 	0.01, 	0  ],
      },
      barDataXiXianNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 32.97, 	48.67 , 	0, 	0, 	0 ],
        HSL:    [ 1.36, 	0.93  , 	0, 	0, 	0 ],
      },       
      barDataYanLinNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 10.64, 	8.05, 	1.30, 	0, 	0 ],
        HSL:    [ 0.09, 	0.18 , 	0, 	0, 	0 ],
      }, 	 	 	 	 	 
      barDataHanChengNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 69.07, 	47.63, 	0.05, 	0.01 , 	0 ],
        HSL:    [ 0.53, 	0.17 , 	0, 	0, 	0 ],
      },
      //全省陕西特色化肥
      barDataHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:   [ 2342.44, 	15545.77, 	436.72, 	47.14  ],
        HSL:   [ 1596.98, 	14245.23, 	414.00, 	27.61 ],
      },
      //各地市化肥情况
      barDataXiAnHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:   [ 375.34, 	2460.22, 	158.98,0 ],
        HSL:   [ 342.91, 	2426.27, 	158.97,0 ],
      },  	  	 	 	 
      barDataTongChuanHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 132.86, 	452.67, 	23.83, 	21.05  ],
        HSL:    [ 86.62, 	424.30, 	23.73, 	17.34  ],
      },  	 	 	 	
      barDataBaoJiHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 82.99, 	2118.26, 	13.11, 	0.52 ],
        HSL:    [ 18.93, 	2021.51, 	12.44, 	0.00 ],
      },  	  	  	 
      barDataXianYangHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 117.23, 	2801.35, 	81.33, 	18.21 ],
        HSL:    [ 76.20, 	2446.60, 	66.25, 	5.64 ],
      },  	 	 	 	 	 
      barDataWeiNanHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 280.49, 	2783.34, 	131.26, 	4.86 ],
        HSL:    [ 256.33, 	2712.98, 	129.13, 	3.83 ],
      },  	 	 
	 	 	 
      barDataYanAnHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 1341.28, 	1230.16, 	21.27,0 ],
        HSL:    [ 811.15, 	958.56, 	21.20 , 	0],
      }, 	 	 	 	 
      barDataHanZhongHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 4.91, 	1238.14, 	0.03, 	1.30 ],
        HSL:    [ 3.02, 	1194.21, 	0.03, 	0.80 ],
      },  
      barDataYuLinHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 4.77, 	988.07, 	6.14, 	1.20 ],
        HSL:    [ 0.94, 	716.87, 	1.48 , 	0 ],
      }, 
      barDataAnKangHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 0.07, 	837.49, 	0.01 , 	0  ],
        HSL:    [ 0.00, 	756.34, 	0.01 , 	0  ],
      }, 
      barDataShangLuoHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 1.00, 	431.61 , 	0, 	0  ],
        HSL:    [ 0, 	397.48, 0, 	0  ],
      },      
      barDataYanLinHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [ 0.44, 	98.76, 	0.24 , 	0 ],
        HSL:    [ 0, 	89.5 , 	0.24, 	0, 	0 ],
      }, 	 	 	 	 	 
      barDataHanChengHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:    [1.08, 	105.71, 	0.53 , 	0 ],
        HSL:    [0.88, 	100.63, 	0.53 , 	0 ],
      },
      //中2
      //农业源中
      barDataYZC:{
        xAxis: ["西安市","铜川市","宝鸡市", "咸阳市",  "渭南市", "延安市","汉中市", "榆林市",  "商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        SZData:["227",    "56",   "274",    "700"  ,  "553",    "110",   "218",   "277"  ,  "143",   "188",   "19",     "13",    "17",   ],
        NNData:["85",     "6",    "47",     "75"  ,   "57",     "1",     "2",     "16"  ,   "0" ,    "0",     "4",      "1",     "8",    ],
        RNData:["83",     "19",   "89",     "94"   ,  "208",    "39",    "43",    "96" ,    "17" ,   "47",    "0",      "1",    "6",  ],
        DJData:["332",    "230",  "368",    "483"  ,  "1286",   "88",    "108",   "428"  ,  "564" ,  "42",    "38",     "24",      "10",    ],
        RJData:["82",     "11",   "60",     "79"  ,   "138",    "4",     "17",    "33"  ,   "63" ,   "45",    "7",      "1",      "0",    ],
      },
      //右1
      //废水排放量(吨)
      //畜禽、水产、种植
      barDataRightTopFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 210496.8968, 2298.4182,  12269.7478  , 2208.0448],
        SC:    [ 1501.716,    50.0021,    355.7177  ,  32.8855],
        ZZ:    [ 0,           652.6,      7843.4062  , 854.6504],
      },
      barDataQuanShengFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 210496.8968, 2298.4182,  12269.7478  , 2208.0448],
        SC:    [ 1501.716,    50.0021,    355.7177  ,  32.8855],
        ZZ:    [ 0,           652.6,      7843.4062  , 854.6504],
      },
      //各市污水排放量
      barDataXiAnFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 18214.5884,  171.2768,  986.0425  ,  186.9402],
        SC:    [ 145.8877,     5.6862,    29.3891  ,    1.8034],
        ZZ:    [ 0,           43.2439,   507.1982  ,   57.1266],
      },
      barDataBaoJiFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 36910.3735,  515.4876,  2315.4098  ,  346.6279],
        SC:    [ 34.1879,      0.896,     8.0748  ,    0.6884],
        ZZ:    [ 0,            56.5394,   665.8281  ,   74.5846],       		
      },  
      barDataXianYangFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 22896.1867,  231.8808,  1285.0597  ,  264.8872],
        SC:    [ 159.8653,    3.5417,     41.57  ,      8.0988],
        ZZ:    [ 0,           77.9442,   958.2321  ,   101.2312], 			
      },  
      barDataTongChuanFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 4122.6913,  35.0304,  238.6975  ,  44.552],
        SC:    [ 5.6097,    0.2366,    1.1135  ,    0.1021],
        ZZ:    [ 0,         16.91,   208.5453  ,   21.936],
      },
      barDataWeiNanFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 34063.5172,  306.2383,  1812.253  ,  395.7621],
        SC:    [ 609.1726,    17.8876,   164.2487,    18.1056],
        ZZ:    [ 0,           99.5802,   1186.1175  ,   130.8329],
      }, 		
      barDataYanAnFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 11097.4338,  84.0369,   626.1453 ,  81.3874],
        SC:    [ 43.0143,     1.6482,    9.001,        0.2749],
        ZZ:    [ 0,           72.3701,   906.4951  ,   93.3303],
      }, 			
      barDataYuLinFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 20002.9315,  251.5312,  1233.1631,     219.1089],
        SC:    [ 39.3166,     1.1535,    11.3612,       0.2512],
        ZZ:    [ 0,           155.0445,  1838.0947,     204.0462],
      }, 						
      barDataHanZhongFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 28634.1121,  335.9451,  1726.2383  ,  308.9005],
        SC:    [ 319.3326,    13.9588,   58.9284,      3.3431],
        ZZ:    [ 0,           46.5096,   560.0644,     60.8668],
      },		
      barDataAnKangFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 18044.8408,  204.1125,  1072.5793,  190.9118],
        SC:    [ 89.4594,     3.2055,    22.0908,      -1.7891],
        ZZ:    [ 0,           45.5197,   554.7422,     59.3115],
      },				
      barDataShangLuoFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 13025.6597,  123.7004,  774.7781,  127.4238],
        SC:    [ 42.8806,     1.4832,    7.5407,      1.6263],
        ZZ:    [ 0,           26.8309,   315.6562,     35.4066],
      },   				 
      barDataXiXianFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 898.6726,   9.9448,   53.0976,     11.1994],
        SC:    [ 6.7354,     0.2098,    1.4452,      0.3082],
        ZZ:    [ 0,          6.3996,   75.3081,     8.4444],
      },				
      barDataYangLinFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1232.8176,   12.1743,  62.6109,      14.8208],
        SC:    [ 0,           0,        0,             0],
        ZZ:    [ 0,           0.8009,   9.4653,        1.0551],
      },
      barDataHanChengFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1353.0716,   17.0591,  83.6727,      15.5228],
        SC:    [ 6.2539,      0.2008,    1.4981,        0.139],
        ZZ:    [ 0,           4.907,     57.659,      6.4782],
      },   

      //右2 废气排放量
      //注意，氮气分为种植业氮和养殖业氮。但是挥发性有机物又不分。因此做成堆叠图，一个氮，一个挥发
      barDataRightCenterFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 132964.2411,       0],
        YZYD:  [ 66374.7207,        0],
        HFXYJW:[ 0,              9850.6399],
      },

      barDataQuanShengZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 132964.2411,       0],
        YZYD:  [ 66374.7207,        0],
        HFXYJW:[ 0,              9850.6399],
      },
      //各地市废水排放量(吨)
      barDataXiAnZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 11817.2211,       0],
        YZYD:  [ 5101.7334,        0],
        HFXYJW:[ 0,              404.2112],
      },
      barDataBaoJiZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 10990.3828,       0],
        YZYD:  [ 10122.9913,        0],
        HFXYJW:[ 0,              650.1849],
      },		
      barDataXianYangZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 22138.7726,       0],
        YZYD:  [ 7666.6743,        0],
        HFXYJW:[ 0,              1678.6245],
      }, 		
      barDataTongChuanZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 3716.619,       0],
        YZYD:  [ 1345.2349,        0],
        HFXYJW:[ 0,              451.4518],
      },           		
      barDataWeiNanZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 24191.6717,       0],
        YZYD:  [ 8485.4294,        0],
        HFXYJW:[ 0,              1555.8207],
      },		
      barDataYanAnZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 16024.7178,       0],
        YZYD:  [ 3402.2207,        0],
        HFXYJW:[ 0,              1988.6286],
      }, 		
      barDataYuLinZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 17654.2273,       0],
        YZYD:  [ 6941.6878,        0],
        HFXYJW:[ 0,              1141.1071],
      },        		
      barDataHanZhongZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 10256.3314,       0],
        YZYD:  [ 10083.4868,        0],
        HFXYJW:[ 0,              848.5119],
      },		
      barDataAnKangZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 9644.9913,       0],
        YZYD:  [ 7187.1815,        0],
        HFXYJW:[ 0,              694.4336],
      }, 		
      barDataShangLuoZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 4137.7796,       0],
        YZYD:  [ 4682.3205,        0],
        HFXYJW:[ 0,              300.1587],
      },          		
      barDataXiXianZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 1388.1329,       0],
        YZYD:  [ 288.0438,        0],
        HFXYJW:[ 0,              65.5403],
      },		
      barDataYangLinZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 158.9287,       0],
        YZYD:  [ 441.394,        0],
        HFXYJW:[ 0,              5.535],
      }, 		
      barDataHanChengZFeiQi:{
        xAxis: ["氮气",        "挥发性有机物"],
        ZZYD:  [ 844.4649,       0],
        YZYD:  [ 496.9114,        0],
        HFXYJW:[ 0,              66.4316],
      },

      //右3 秸秆的理论资源量、可收集资源量、利用量（万吨）
      //
      barDataRightBottomJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [1235.3225,	1050.8077,	991.246],
      },

      barQuanShengJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [1235.3225,	1050.8077,	991.246],
      },

      //各地市秸秆
      barXiAnJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [175.3014,	144.4788,	152.0108],
      },
      barTongChuanJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [25.6818,	22.0373,	21.9324],
      },  
      barBaoJiJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [156.0101,	128.7774,	123.1136],
      },           
      barXianYangJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [184.4179,	151.5687,	156.0835],
      }, 
      barWeiNanJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [244.3151,	201.6816,	195.1896],
      },            
      barYanAnJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [63.2897,	58.7802,	59.5552],
      },
      barYuLinJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [106.5599,	99.7006,	85.1693],
      },      
      barHanZhongJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [112.757,	95.0771,	81.5069],
      },      
      barAnKangJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [82.9974,	73.8972,	60.7817],
      },      
      barShangLuoJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [53.9967,	50.0178,	29.3993], 
      },      
       barXiXianJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [20.6426,	17.1239,	18.4854], 
      },           
       barYanLinJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [2.1205,	1.7608,	1.7482], 
      },
       barHanChengJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [7.2324,	5.9063,	6.2701], 
      },



      //移动源中
      barCenterData:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        CYKData:["6",     "2",     "6",     "3"  , "1",    "12",   "5",    "4"  ,   "1",     "2",    "6",       "0",     "0",   ],
        YPYSQYData:["15",   "10",   "4",   "8"  ,   "13",  "19",   "3",    "22"  ,   "4" ,   "0",    "16",       "1",     "0",    ],
        JYZData:["493",  "101", "293",    "327"   , "472", "250",   "256",   "553" ,  "151" ,  "174",  "110",     "45",     "7",  ],
      },

      //切换数据
      barData:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        YXData:["4786",  "255",  "2944",  "1630"  ,"1378", "858", "1906",  "1778"  , "678",   "1260", "876",    "176",   "171",   ],
        TCData:["601",   "73",   "598",   "297"  , "455",  "173",  "708",  "808"  ,   "473" , "403",  "72",     "66",    "31",    ],
        GBData:["1024",  "1024", "47",    "216"   , "159", "3",   "103",   "24" ,    "57" ,    "7",  "434",     "21",     "5",  ],
        QTData:["1387",  "1",    "93",    "366"  , "149",  "142",  "182",  "80"  ,   "189" ,   "339", "167",    "0",     "4",    ],
      },
      barDataQuanSheng:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸新区","韩城市","杨凌示范区"],
        YXData:["4786",  "255",  "2944",  "1630"  ,"1378", "858", "1906",  "1778"  , "678",   "1260", "876",    "176",   "171",   ],
        TCData:["601",   "73",   "598",   "297"  , "455",  "173",  "708",  "808"  ,   "473" , "403",  "72",     "66",    "31",    ],
        GBData:["1024",  "1024", "47",    "216"   , "159", "3",   "103",   "24" ,    "57" ,    "7",  "434",     "21",     "5",  ],
        QTData:["1387",  "1",    "93",    "366"  , "149",  "142",  "182",  "80"  ,   "189" ,   "339", "167",    "0",     "4",    ],
      },
      barDataXiAn:{
        xAxis: ["阎良区","临潼区","高陵区","灞桥区","未央区","莲湖区","新城区","碑林区","雁塔区","蓝田县","长安区",  "鄠邑区",  "周至县"],
        YXData:["193",  "296",  "284",    "333"  ,"299",    "140",  "56",    "26"  , "167", "263",    "775" ,    "786",    "115",   ],
        TCData:["13",    "43",   "69",     "30"  , "125",   "9",    "12",    "0"  ,  "13" , "29",      "77" ,     "81",     "20",    ],
        GBData:["27",    "48",   "74",    "140"   , "51",   "8",    "0",     "0" ,   "1"  ,  "14",     "74" ,     "97",     "518",  ],
        QTData:["4",     "40",    "25",    "96"  , "74",    "33",   "22",    "4"  ,  "115" , "56",    "456" ,     "150",      "4",    ],
      },
      barDataTongChuan:{
        xAxis:  ["王益区","印台区","耀州区","新区",  "宜君县"],
        gyyData:["78",   "49",    "136",   "54"  , "32"],
        nyyData:["13",   "45",    "188",   "55"  , "21"],
        jzsData:["1",    "12",    "27",    "1"   , "5"],
        ydyData:["12",   "30",    "34",    "17"  , "20"],
        shyData:["220",  "111",   "97",    "57"  , "65"],
      },
      barDataBaoJi:{
        xAxis:  ["渭滨区","金台区","陈仓区","技术开发区","凤翔县","岐山县","扶风县","眉县", "陇县", "千阳县","麟游县","凤县","太白县"],
        gyyData:["413",  "317",   "372",  "911"  ,     "241",   "477",  "180",   "368", "144",  "60",   "34",    "149", "16"],
        nyyData:["9",    "11",    "177",  "58"  ,       "100",   "89",   "246",   "65" , "27" ,  "13",   "32",    "7",   "6"],
        jzsData:["21",   "34",    "53",   "34"  ,       "90",    "32",   "58",    "68" , "43" ,  "33",   "37",    "26",  "46"],
        ydyData:["15",   "29",    "40",   "26"  ,       "32",    "37",   "36",    "33" , "14" ,  "7",    "10",    "13",  "10"],
        shyData:["110",  "36",    "22",   "87"  ,       "19",    "59",   "40",    "51" , "15" ,  "12",   "14",    "55",  "9"],
      },
      barDataXianYang:{
        xAxis: ["秦都区","渭城区","纺织工业园","三原县","泾阳县","乾县","礼泉县","永寿县","彬县","长武县","旬邑县","淳化县","武功县","兴平市"],
        gyyData:["328", "53",       "3",       "417"  ,"166",  "258", "176",  "54"  ,  "113", "96",   "45",    "28",   "177",   "595"],
        nyyData:["5",   "0",         "0",       "213"  ,"223",  "59",  "37",   "137"  , "30",  "13",   "26",    "247",   "205",  "249"],
        jzsData:["6",   "2",         "1",        "4"  ,  "25",   "4",   "10",   "11"  ,  "22",  "7",    "15",    "2",     "6",    "22"],
        ydyData:["30",  "8",         "0",        "50"  , "28",   "36",  "39",   "21"  ,  "32",  "14",   "19",    "14",    "22",   "27"],
        shyData:["141", "55",        "1",        "53"  , "6",    "63",  "38",   "7"  ,   "46",  "37",   "31",    "10",    "14",   "33"],

      },
      barDataWeiNan:{
        xAxis: ["临渭区","华州区","高新开发区","经济开发区","潼关县","大荔县","合阳县","澄城县","蒲城县","白水县","富平县","华阴市"],
        gyyData:["197", "99",    "137",         "84"  ,   "155",   "261",  "104",   "135"  ,"438",   "138",  "321",   "70"],
        nyyData:["218", "171",    "3",          "63"  ,    "48",    "258",  "207",   "242"  ,"439",   "65",  "474",    "57"],
        jzsData:["20", "6",       "1",           "4"  ,     "8",     "10",   "29",    "9"  ,  "11",    "3",   "30",     "3"],
        ydyData:["71", "33",      "8",           "7"  ,    "14",    "73",   "43",    "43"  , "74",    "36",  "56",     "31"],
        shyData:["311", "124",    "46",          "12"  ,    "76",    "26",   "216",   "41"  , "29",    "55",  "52",     "46"],

      },
      barDataYanAn:{
        xAxis:  ["宝塔区","安塞区","延长县","延川县",  "子长县", "志丹县","吴起县", "甘泉县", "富县", "洛川县",  "宜川县", "黄龙县", "黄陵县"],
        gyyData:["223",  "69",    "85",   "78"  ,    "104",   "147",  "70",     "74",     "74",  "69",      "52",    "26",     "105"],
        nyyData:["35",   "27",   "13",    "9"  ,     "57",    "12",   "8",      "39" ,    "12" , "11",      "6",     "9",      "9"],
        jzsData:["20",   "5",     "2",    "7"  ,     "3",     "6",   "10",      "4" ,     "7" ,  "9",       "2",     "2",      "7"],
        ydyData:["48",   "17",    "12",   "35"  ,    "25",    "20",   "20",     "17" ,    "17" , "29",      "16",    "6",      "31"],
        shyData:["415",  "113",   "69",   "46"  ,    "75",    "194",   "80",    "94" ,    "105" ,"56",      "126",   "28",     "162"],

      },
      barDataHanZhong:{
        xAxis: ["汉台区","南郑区","城固县","洋县","西乡县","勉县","宁强县","略阳县","镇巴县","留坝县","佛坪县"],
        gyyData:["858", "394",   "358",  "209" ,"271",  "357", "104",  "193"  , "97",   "20",    "38"],
        nyyData:["77",  "44",    "75",   "61"  ,"47",   "73",  "22",   "4" ,    "15",   "0",     "1" ],
        jzsData:["7",   "26",    "8",    "19"  ,"47",   "15",  "3",    "11"  ,  "3",    "7",     "16"],
        ydyData:["52",  "33",    "36",   "24"  ,"33",   "31",  "19",   "15"  ,  "11",   "7",     "3"],
        shyData:["68",  "47",    "50",   "36"  ,"34",   "23",  "28",   "33"  ,  "35",   "14",    "15"],

      },
      barDataYuLin:{
        xAxis: ["榆阳区", "横山区",  "府谷县", "靖边县", "定边县", "绥德县","米脂县", "佳县",  "吴堡县",  "清涧县", "子洲县", "神木市"],
        gyyData:["329",  "157",     "425",   "183"  ,  "116",   "238",  "68",     "197"  , "97",      "168",   "61",    "651"],
        nyyData:["143",  "49",      "35",    "67"  ,   "165",   "93",  "86",      "59"  ,  "30",      "34",    "26",    "82"],
        jzsData:["9",    "4",       "2",     "15"  ,   "4",     "4",   "2",       "2"  ,   "3",       "2",     "2",     "34"],
        ydyData:["136",  "28",      "69",    "74"  ,   "77",    "24",    "12",    "18",    "9"  ,     "7",     "10",    "115"],
        shyData:["612",  "195",     "267",   "202"  ,  "271",   "163",   "65",    "37"  ,  "82",      "49",    "96",    "373"],

      },
      barDataShangLuo:{
        xAxis: ["商州区","洛南县", "丹凤县", "商南县",  "山阳县",  "镇安县",  "柞水县"],
        gyyData:["268", "253",    "112",   "210" ,    "283",     "190",    "81"],
        nyyData:["90",  "245",    "100",   "163"  ,   "133",     "23",     "34"],
        jzsData:["34",  "11",     "35",    "34"  ,    "17",      "31",     "8"],
        ydyData:["24",  "22",     "21",    "31"  ,    "25",      "19",     "16"],
        shyData:["74",  "81",     "70",    "35"  ,    "94",      "53",     "53"],

      },
      barDataXiXian:{
        xAxis: ["空港新城","沣东新城", "秦汉新城",  "沣西新城",  "泾河新城"],
        gyyData:["52",     "725",    "221",       "277" ,     "274"],
        nyyData:["37",     "0",      "15",        "21"  ,     "13"],
        jzsData:["8",      "8",      "8",         "3"  ,      "8"],
        ydyData:["10",     "46",     "44",        "10"  ,     "21"],
        shyData:["18",     "101",    "13",        "6"  ,      "23"],

      },
      barDataYangLing:{

        xAxis: ["杨凌示范区"],
        gyyData:["211"],
        nyyData:["41"],
        jzsData:["25"],
        ydyData:["7"],
        shyData:["40"],

      },
      barDataHanCheng:{

        xAxis: ["韩城市"],
        gyyData:["263"],
        nyyData:["41"],
        jzsData:["35"],
        ydyData:["46"],
        shyData:["90"],

      },
      barDataAnKang:{
        xAxis: ["汉滨区","汉阴县", "石泉县", "宁陕县", "紫阳县",  "岚皋县",  "平利县", "镇坪县", "旬阳县", "白河县", "高新开发区"],
        gyyData:["579",  "148",   "164",   "58" ,    "228",    "112",     "205",   "70"  ,   "188",   "123",    "134"],
        nyyData:["106",  "14",    "35",    "4"  ,    "24",     "33",      "23",    "28" ,    "36",    "27",     "2" ],
        jzsData:["56",   "15",    "18",    "12"  ,   "10",     "37",      "29",    "7"  ,    "38",    "32",     "1"],
        ydyData:["48",   "14",    "14",    "13"  ,   "16",     "8",       "11",    "7"  ,    "28",    "13",     "5"],
        shyData:["83",   "44",    "41",    "32"  ,   "23",     "24",      "14",    "12"  ,   "66",    "33",     "8"],
      },


      barData1: 
      {
        xAxis: ["工业源", "农业源", "集中式", "移动源",'生活源'],
        yAxis: ["28674","8381","1890","3395","12093"],
      },
      barData2: {
        xAxis: ["VOC", "COD", "氨氮", "总氮",'重金属'],
        gyyData:["4631","3445 ","5383 ","3132","3054","4031","3245 ","5083 ","3432","3754","4231","3345"],
        nyyData:["2631","2445 ","3383 ","2132","2054","2031","2245 ","2083 ","3432","2754","1231","1345"],
        jzsData:["3331","3045 ","4383 ","1132","1054","2031","4245 ","3083 ","4432","2754","1231","3345"],
        ydyData:["2231","2345 ","3383 ","3232","3154","3431","3545 ","3283 ","3132","3054","3531","1245"],
        shyData:["1631","1445 ","1383 ","1132","1254","1331","1245 ","1483 ","1432","1754","1231","1345"],
      },
      barData4: 
      {
        xAxis: ["化学需氧量","氨氮","总氮","总磷"],
        yAxis: ["28.77","1.09","3.36","0.19"],
        yAxis1: ["12.51","0.61","1.16","0.08"],
      },

      //各市五类源数量
      XiAnWLY:{gyy:'7798',nyy:'809',jzs:'131',ydy:'517',shy:'5142',gyyq:'10'},
      TongChuanWLY:{gyy:'349',nyy:'322',jzs:'42',ydy:'117',shy:'841',gyyq:'1'},
      BaoJiWLY:{gyy:'3682',nyy:'838',jzs:'529',ydy:'307',shy:'1511',gyyq:'9'},
      XianYangWLY:{gyy:'2509',nyy:'1431',jzs:'137',ydy:'342',shy:'1730',gyyq:'8'},
      WeiNanWLY:{gyy:'2141',nyy:'2241',jzs:'131',ydy:'490',shy:'2622',gyyq:'9'},
      YananWLY:{gyy:'1176',nyy:'242',jzs:'81',ydy:'285',shy:'3097',gyyq:'6'},
      HanZhongWLY:{gyy:'2899',nyy:'391',jzs:'163',ydy:'268',shy:'2201',gyyq:'5'},
      YuLinWLY:{gyy:'2691',nyy:'850',jzs:'79',ydy:'583',shy:'5082',gyyq:'4'},
      ShangLuoWLY:{gyy:'1397',nyy:'787',jzs:'170',ydy:'160',shy:'1314',gyyq:'4'},
      XiXianWLY:{gyy:'1549',nyy:'67',jzs:'27',ydy:'132',shy:'490',gyyq:'0'},
      YangLinWLY:{gyy:'211',nyy:'41',jzs:'25',ydy:'10',shy:'84',gyyq:'1'},
      HanChengWLY:{gyy:'263',nyy:'40',jzs:'35',ydy:'49',shy:'177',gyyq:'3'},
      AnKangWLY:{gyy:'2009',nyy:'322',jzs:'253',ydy:'180',shy:'1685',gyyq:'7'},
      //各市工业源企业数量
      XiAnGYYQY:{yx:'4786',tc:'601',gb:'1024',qt:'1387',gyyq:'10'},
      BaoJiGYYQY:{yx:'255',tc:'73',gb:'1',qt:'20',gyyq:'1'},
      XianYangGYYQY:{yx:'2944',tc:'598',gb:'47',qt:'93',gyyq:'6'},
      TongChuanGYYQY:{yx:'1630',tc:'297',gb:'216',qt:'366',gyyq:'11'},
      WeiNanGYYQY:{yx:'1378',tc:'455',gb:'159',qt:'149',gyyq:'9'},
      YananGYYQY:{yx:'858',tc:'173',gb:'3',qt:'142',gyyq:'6'},
      YuLinGYYQY:{yx:'1906',tc:'708',gb:'103',qt:'182',gyyq:'4'},
      HanZhongGYYQY:{yx:'1778',tc:'808',gb:'24',qt:'80',gyyq:'4'},
      AnKangGYYQY:{yx:'1260',tc:'403',gb:'7',qt:'339',gyyq:'7'},
      ShangLuoGYYQY:{yx:'678',tc:'473',gb:'57',qt:'189',gyyq:'3'},
      XiXianGYYQY:{yx:'876',tc:'72',gb:'434',qt:'167',gyyq:'0'},
      YangLinGYYQY:{yx:'171',tc:'31',gb:'5',qt:'4',gyyq:'1'},
      HanChengGYYQY:{yx:'176',tc:'66',gb:'21',qt:'0',gyyq:'3'},

      townId:'',//村id
      countryId:'',//镇id
      years:'',//最新年
      startDate:'',
      endDate:'',
      lng:'101.534554629',//经度
      lat:'34.597776638',//纬度
      sjVectorSource: null,
      sjVectorLayer: null,
      sjOverlayVectorSource: null,
      //xzqWFSUrl: "http://10.61.104.60:6080/arcgis/services/gqk/sxxzq/MapServer/WFSServer",
      xzqWFSUrl: "http://localhost:6080/arcgis/services/sxdsjbj/MapServer/WFSServer",
      
      sjLevels : 0,
      autoRefreshSj : 0,
      intervalID : 0,

      //散点图
      ADLayer:null,
      data:[
        {name: '榆林市', value: 20},
        {name: '延安市', value: 20},
        {name: '渭南市', value: 20},
        {name: '铜川市', value: 20},
        {name: '咸阳市', value: 20},
        {name: '宝鸡市', value: 20},
        {name: '西安市', value: 20},
        {name: '商洛市', value: 20},
        {name: '安康市', value: 20},
        {name: '汉中市', value: 20},
      ],
      geoCoordMap:{
        '榆林市':[109.815,38.226],
        '延安市':[109.428,36.256],
        '渭南市':[109.817,34.911],
        '铜川市':[108.973,35.178],
        '咸阳市':[108.389,34.753],
        '宝鸡市':[107.337,34.317],
        '西安市':[108.664,34.061],
        '商洛市':[109.978,33.746],
        '安康市':[108.955,32.616],
        '汉中市':[107.052,33.198],
      },
      ScatterColor:"red",
      //陕北，关中，陕南
      geoCoordMapNew:{
        yulin:[109.815,38.226],
        yanan:[109.428,36.256],
        weinan:[109.817,34.911],
        tongchaun:[108.973,35.178],
        xianyang:[108.389,34.753],
        baoji:[107.337,34.317],
        xian:[108.664,34.061],
        shangluo:[109.978,33.746],
        ankang:[108.955,32.616],
        hanzhong:[107.052,33.198],
      },
      sxxjbjProLayer:null,
      xjsource:null,
      xjfeatures:null,
    };
  },
  methods: {
    //刷新map尺寸
    refreshMapSize(){
      this.map.updateSize();
    },
    LoadSxdsjbj(){
      var that = this;
      // 添加省级专题图，行政区边界只加载一次
      if(that.sjVectorSource == null){
        that.sjVectorSource = new ol.source.Vector();
        that.sjVectorLayer = new ol.layer.Vector({
          source: that.sjVectorSource,
        });
        that.map.addLayer(that.sjVectorLayer);
        // 初始化overlay
        this.initSjOverlayVectorLayer();
        
        let json = require('../../assets/js/geojson/sxdsjbjpro1.json')

        var features = (new ol.format.GeoJSON()).readFeatures(json,{
                  dataProjection : 'EPSG:3857',
                  featureProjection : 'EPSG:3857'
          })
        that.sjVectorSource.addFeatures(features);
        // 刷新
        that.refreshSjvectorLayer();
        if(that.ADLayer){
          that.ADLayer.clear();
        }
        //that.ScatterColor="yellow";
        //that.initChart(that.ScatterColor);
        //that.loadDefaultLayer();
        this.map.updateSize();
      }else{
        // 刷新
        that.refreshSjvectorLayer();
      }
    },
    //陕北，关中，陕南
    shanbei(){
      var YuLin = ol.proj.transform(this.geoCoordMapNew.yulin,'EPSG:4326', 'EPSG:3857' );
      var YanAn = ol.proj.transform(this.geoCoordMapNew.yanan,'EPSG:4326', 'EPSG:3857' );

      var coordinates = [YuLin,YanAn];
      this.mulSelecMap(coordinates);
      this.refreshMulSelect('shanbei');
    },
    guanzhong(){
      var weinan = ol.proj.transform(this.geoCoordMapNew.weinan,'EPSG:4326', 'EPSG:3857' );
      var tongchaun = ol.proj.transform(this.geoCoordMapNew.tongchaun,'EPSG:4326', 'EPSG:3857' );
      var xianyang = ol.proj.transform(this.geoCoordMapNew.xianyang,'EPSG:4326', 'EPSG:3857' );
      var baoji = ol.proj.transform(this.geoCoordMapNew.baoji,'EPSG:4326', 'EPSG:3857' );
      var xian = ol.proj.transform(this.geoCoordMapNew.xian,'EPSG:4326', 'EPSG:3857' );
      var coordinates = [weinan,tongchaun,xianyang,baoji,xian];
      this.mulSelecMap(coordinates);
      this.refreshMulSelect('guanzhong');
    },
    shannan(){
      var shangluo = ol.proj.transform(this.geoCoordMapNew.shangluo,'EPSG:4326', 'EPSG:3857' );
      var ankang = ol.proj.transform(this.geoCoordMapNew.ankang,'EPSG:4326', 'EPSG:3857' );
      var hanzhong = ol.proj.transform(this.geoCoordMapNew.hanzhong,'EPSG:4326', 'EPSG:3857' );

      var coordinates = [shangluo,ankang,hanzhong];

      this.mulSelecMap(coordinates);
      this.refreshMulSelect('shannan');
    },
    //陕北，关中，陕南多选
    mulSelecMap(coordinates){
      var that = this;
      // 清除选择要素的样式
      if(that.sjOverlayVectorSource){
          that.sjOverlayVectorSource.clear();
      }else{
        return;
      }

      var featureArr = new Array();
      for(var i=0;i<coordinates.length;i++){
        // 查询要素
        var selFeature = null;
        if(that.sjVectorSource){
          var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinates[i]);
          if(features && features.length>0){
            selFeature = features[0].clone();
          }
        }
        // 设置选中样式
        if(selFeature){
          var style = new ol.style.Style({
              fill: new ol.style.Fill({color: "rgba(36, 91, 121, 0.0)"}),
              //stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.8)', width: 2})
              stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
            })
          selFeature.setStyle(style);
        }
        featureArr.push(selFeature);
      }
      that.sjOverlayVectorSource.addFeatures(featureArr);
    },
    //陕北，关中，陕南刷新表
    refreshMulSelect(quyu){
      if(quyu == "shanbei"){
          
          //barDataLeftTopLeft,barDataLeftTopRight,barDataRightTopFeiShui,barDataRightCenterFeiQi,barDataRightBottomJieGan

          this.barDataLeftTopLeft = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
            yAxis: [ parseFloat(this.barDataLeftTopLeftYuLin.yAxis[0] + this.barDataLeftTopLeftYanAn.yAxis[0]).toFixed(0) ,
                    parseFloat(this.barDataLeftTopLeftYuLin.yAxis[1] + this.barDataLeftTopLeftYanAn.yAxis[1]).toFixed(0),
                    parseFloat(this.barDataLeftTopLeftYuLin.yAxis[2] + this.barDataLeftTopLeftYanAn.yAxis[2]).toFixed(0),
                    parseFloat(this.barDataLeftTopLeftYuLin.yAxis[3] + this.barDataLeftTopLeftYanAn.yAxis[3]).toFixed(0),
                    parseFloat(this.barDataLeftTopLeftYuLin.yAxis[4] + this.barDataLeftTopLeftYanAn.yAxis[4]).toFixed(0)],
            
          },











        this.pieDataLeftTopNYY = {
          dataArr: [         				
              { value: (parseFloat(this.pieDataYuLinGMS.dataArr[0].value) + parseFloat(this.pieDataYanAnGMS.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataYuLinGMS.dataArr[1].value) + parseFloat(this.pieDataYanAnGMS.dataArr[1].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataYuLinGMS.dataArr[2].value) + parseFloat(this.pieDataYanAnGMS.dataArr[2].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataYuLinGMS.dataArr[3].value) + parseFloat(this.pieDataYanAnGMS.dataArr[3].value)).toFixed(2), name: "蛋鸡" },
              { value: (parseFloat(this.pieDataYuLinGMS.dataArr[4].value) + parseFloat(this.pieDataYanAnGMS.dataArr[4].value)).toFixed(2), name: "肉鸡" },
          ]
        };

        this.pieDataLeftCenterNYY = {
          dataArr: [        				
              { value: (parseFloat(this.pieDataYuLinGMX.dataArr[0].value) + parseFloat(this.pieDataYanAnGMX.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataYuLinGMX.dataArr[1].value) + parseFloat(this.pieDataYanAnGMX.dataArr[1].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataYuLinGMX.dataArr[2].value) + parseFloat(this.pieDataYanAnGMX.dataArr[2].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataYuLinGMX.dataArr[3].value) + parseFloat(this.pieDataYanAnGMX.dataArr[3].value)).toFixed(2), name: "肉鸡" },
              { value: (parseFloat(this.pieDataYuLinGMX.dataArr[4].value) + parseFloat(this.pieDataYanAnGMX.dataArr[4].value)).toFixed(2), name: "蛋鸡" },
          ]
        };

        this.barDataRightTopFeiShui = {
          xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
          XQ: [ 
                (parseFloat(this.barDataYuLinFeiShui.XQ[0]) + parseFloat(this.barDataYanAnFeiShui.XQ[0])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.XQ[1]) + parseFloat(this.barDataYanAnFeiShui.XQ[1])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.XQ[2]) + parseFloat(this.barDataYanAnFeiShui.XQ[2])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.XQ[3]) + parseFloat(this.barDataYanAnFeiShui.XQ[3])).toFixed(2),
              ],
          SC: [ 
                (parseFloat(this.barDataYuLinFeiShui.SC[0]) + parseFloat(this.barDataYanAnFeiShui.SC[0])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.SC[1]) + parseFloat(this.barDataYanAnFeiShui.SC[1])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.SC[2]) + parseFloat(this.barDataYanAnFeiShui.SC[2])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.SC[3]) + parseFloat(this.barDataYanAnFeiShui.SC[3])).toFixed(2),
              ],
          ZZ: [ 
                (parseFloat(this.barDataYuLinFeiShui.ZZ[0]) + parseFloat(this.barDataYanAnFeiShui.ZZ[0])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.ZZ[1]) + parseFloat(this.barDataYanAnFeiShui.ZZ[1])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.ZZ[2]) + parseFloat(this.barDataYanAnFeiShui.ZZ[2])).toFixed(2),
                (parseFloat(this.barDataYuLinFeiShui.ZZ[3]) + parseFloat(this.barDataYanAnFeiShui.ZZ[3])).toFixed(2),
              ],
        };

        
        this.barDataRightCenterFeiQi = {
          xAxis: ["氨气",        "挥发性有机物"],
          ZZYD:  [ 
            (parseFloat(this.barDataYuLinZFeiQi.ZZYD[0]) + parseFloat(this.barDataYanAnZFeiQi.ZZYD[0])).toFixed(2),
            (parseFloat(this.barDataYuLinZFeiQi.ZZYD[1]) + parseFloat(this.barDataYanAnZFeiQi.ZZYD[1])).toFixed(2),
          ],
          YZYD:  [ 
            (parseFloat(this.barDataYuLinZFeiQi.YZYD[0]) + parseFloat(this.barDataYanAnZFeiQi.YZYD[0])).toFixed(2),
            (parseFloat(this.barDataYuLinZFeiQi.YZYD[1]) + parseFloat(this.barDataYanAnZFeiQi.YZYD[1])).toFixed(2),
          ],
          HFXYJW:  [ 
            (parseFloat(this.barDataYuLinZFeiQi.HFXYJW[0]) + parseFloat(this.barDataYanAnZFeiQi.HFXYJW[0])).toFixed(2),
            (parseFloat(this.barDataYuLinZFeiQi.HFXYJW[1]) + parseFloat(this.barDataYanAnZFeiQi.HFXYJW[1])).toFixed(2),
          ],
        };

        this.barDataRightBottomJieGan = {
          xAxis: ["理论资源量","可收集资源量","利用量"],
          yAxis: [
            (parseFloat(this.barYuLinJieGan.yAxis[0]) + parseFloat(this.barYanAnJieGan.yAxis[0])).toFixed(2),
            (parseFloat(this.barYuLinJieGan.yAxis[1]) + parseFloat(this.barYanAnJieGan.yAxis[1])).toFixed(2),
            (parseFloat(this.barYuLinJieGan.yAxis[2]) + parseFloat(this.barYanAnJieGan.yAxis[2])).toFixed(2),
          ],
        };
    
      }
      else if(quyu == "guanzhong"){
        this.pieDataLeftTopNYY = {
          dataArr: [         				
              { value: (parseFloat(this.pieDataTongChuanGMS.dataArr[0].value) + parseFloat(this.pieDataXiAnGMS.dataArr[0].value) + parseFloat(this.pieDataXianYangGMS.dataArr[0].value) + parseFloat(this.pieDataWeiNanGMS.dataArr[0].value) + parseFloat(this.pieDataBaoJiGMS.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataTongChuanGMS.dataArr[1].value) + parseFloat(this.pieDataXiAnGMS.dataArr[1].value) + parseFloat(this.pieDataXianYangGMS.dataArr[1].value) + parseFloat(this.pieDataWeiNanGMS.dataArr[1].value) + parseFloat(this.pieDataBaoJiGMS.dataArr[1].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataTongChuanGMS.dataArr[2].value) + parseFloat(this.pieDataXiAnGMS.dataArr[2].value) + parseFloat(this.pieDataXianYangGMS.dataArr[2].value) + parseFloat(this.pieDataWeiNanGMS.dataArr[2].value) + parseFloat(this.pieDataBaoJiGMS.dataArr[2].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataTongChuanGMS.dataArr[3].value) + parseFloat(this.pieDataXiAnGMS.dataArr[3].value) + parseFloat(this.pieDataXianYangGMS.dataArr[3].value) + parseFloat(this.pieDataWeiNanGMS.dataArr[3].value) + parseFloat(this.pieDataBaoJiGMS.dataArr[3].value)).toFixed(2), name: "蛋鸡" },
              { value: (parseFloat(this.pieDataTongChuanGMS.dataArr[4].value) + parseFloat(this.pieDataXiAnGMS.dataArr[4].value) + parseFloat(this.pieDataXianYangGMS.dataArr[4].value) + parseFloat(this.pieDataWeiNanGMS.dataArr[4].value) + parseFloat(this.pieDataBaoJiGMS.dataArr[4].value)).toFixed(2), name: "肉鸡" },
          ]
        };

        this.pieDataLeftCenterNYY = {
          dataArr: [        				
              { value: (parseFloat(this.pieDataTongChuanGMX.dataArr[0].value) + parseFloat(this.pieDataXiAnGMX.dataArr[0].value) + parseFloat(this.pieDataXianYangGMX.dataArr[0].value) + parseFloat(this.pieDataWeiNanGMX.dataArr[0].value) + parseFloat(this.pieDataBaoJiGMX.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataTongChuanGMX.dataArr[1].value) + parseFloat(this.pieDataXiAnGMX.dataArr[1].value) + parseFloat(this.pieDataXianYangGMX.dataArr[1].value) + parseFloat(this.pieDataWeiNanGMX.dataArr[1].value) + parseFloat(this.pieDataBaoJiGMX.dataArr[1].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataTongChuanGMX.dataArr[2].value) + parseFloat(this.pieDataXiAnGMX.dataArr[2].value) + parseFloat(this.pieDataXianYangGMX.dataArr[2].value) + parseFloat(this.pieDataWeiNanGMX.dataArr[2].value) + parseFloat(this.pieDataBaoJiGMX.dataArr[2].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataTongChuanGMX.dataArr[3].value) + parseFloat(this.pieDataXiAnGMX.dataArr[3].value) + parseFloat(this.pieDataXianYangGMX.dataArr[3].value) + parseFloat(this.pieDataWeiNanGMX.dataArr[3].value) + parseFloat(this.pieDataBaoJiGMX.dataArr[3].value)).toFixed(2), name: "肉鸡" },
              { value: (parseFloat(this.pieDataTongChuanGMX.dataArr[4].value) + parseFloat(this.pieDataXiAnGMX.dataArr[4].value) + parseFloat(this.pieDataXianYangGMX.dataArr[4].value) + parseFloat(this.pieDataWeiNanGMX.dataArr[4].value) + parseFloat(this.pieDataBaoJiGMX.dataArr[4].value)).toFixed(2), name: "蛋鸡" },
          ]
        };

        this.barDataRightTopFeiShui = {
          xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
          XQ: [ 
                (parseFloat(this.barDataTongChuanFeiShui.XQ[0]) + parseFloat(this.barDataXiAnFeiShui.XQ[0])  + parseFloat(this.barDataXianYangFeiShui.XQ[0])  + parseFloat(this.barDataWeiNanFeiShui.XQ[0])  + parseFloat(this.barDataBaoJiFeiShui.XQ[0])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.XQ[1]) + parseFloat(this.barDataXiAnFeiShui.XQ[1])  + parseFloat(this.barDataXianYangFeiShui.XQ[1])  + parseFloat(this.barDataWeiNanFeiShui.XQ[1])  + parseFloat(this.barDataBaoJiFeiShui.XQ[1])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.XQ[2]) + parseFloat(this.barDataXiAnFeiShui.XQ[2])  + parseFloat(this.barDataXianYangFeiShui.XQ[2])  + parseFloat(this.barDataWeiNanFeiShui.XQ[2])  + parseFloat(this.barDataBaoJiFeiShui.XQ[2])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.XQ[3]) + parseFloat(this.barDataXiAnFeiShui.XQ[3])  + parseFloat(this.barDataXianYangFeiShui.XQ[3])  + parseFloat(this.barDataWeiNanFeiShui.XQ[3])  + parseFloat(this.barDataBaoJiFeiShui.XQ[3])).toFixed(2),
              ],
          SC: [ 
                (parseFloat(this.barDataTongChuanFeiShui.SC[0]) + parseFloat(this.barDataXiAnFeiShui.SC[0])  + parseFloat(this.barDataXianYangFeiShui.SC[0])  + parseFloat(this.barDataWeiNanFeiShui.SC[0])  + parseFloat(this.barDataBaoJiFeiShui.SC[0])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.SC[1]) + parseFloat(this.barDataXiAnFeiShui.SC[1])  + parseFloat(this.barDataXianYangFeiShui.SC[1])  + parseFloat(this.barDataWeiNanFeiShui.SC[1])  + parseFloat(this.barDataBaoJiFeiShui.SC[1])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.SC[2]) + parseFloat(this.barDataXiAnFeiShui.SC[2])  + parseFloat(this.barDataXianYangFeiShui.SC[2])  + parseFloat(this.barDataWeiNanFeiShui.SC[2])  + parseFloat(this.barDataBaoJiFeiShui.SC[2])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.SC[3]) + parseFloat(this.barDataXiAnFeiShui.SC[3])  + parseFloat(this.barDataXianYangFeiShui.SC[3])  + parseFloat(this.barDataWeiNanFeiShui.SC[3])  + parseFloat(this.barDataBaoJiFeiShui.SC[3])).toFixed(2),

              ],
          ZZ: [ 
                (parseFloat(this.barDataTongChuanFeiShui.ZZ[0]) + parseFloat(this.barDataXiAnFeiShui.ZZ[0])  + parseFloat(this.barDataXianYangFeiShui.ZZ[0])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[0])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[0])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.ZZ[1]) + parseFloat(this.barDataXiAnFeiShui.ZZ[1])  + parseFloat(this.barDataXianYangFeiShui.ZZ[1])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[1])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[1])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.ZZ[2]) + parseFloat(this.barDataXiAnFeiShui.ZZ[2])  + parseFloat(this.barDataXianYangFeiShui.ZZ[2])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[2])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[2])).toFixed(2),
                (parseFloat(this.barDataTongChuanFeiShui.ZZ[3]) + parseFloat(this.barDataXiAnFeiShui.ZZ[3])  + parseFloat(this.barDataXianYangFeiShui.ZZ[3])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[3])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[3])).toFixed(2),
              ],
        };

        
        this.barDataRightCenterFeiQi = {
          xAxis: ["氨气",        "挥发性有机物"],
          ZZYD:  [ 
            (parseFloat(this.barDataTongChuanZFeiQi.ZZYD[0]) + parseFloat(this.barDataXiAnZFeiQi.ZZYD[0]) + parseFloat(this.barDataXianYangZFeiQi.ZZYD[0]) + parseFloat(this.barDataWeiNanZFeiQi.ZZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.ZZYD[0])).toFixed(2),
            (parseFloat(this.barDataTongChuanZFeiQi.ZZYD[1]) + parseFloat(this.barDataXiAnZFeiQi.ZZYD[1]) + parseFloat(this.barDataXianYangZFeiQi.ZZYD[1]) + parseFloat(this.barDataWeiNanZFeiQi.ZZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.ZZYD[1])).toFixed(2),
          ],
          YZYD:  [ 
            (parseFloat(this.barDataTongChuanZFeiQi.YZYD[0]) + parseFloat(this.barDataXiAnZFeiQi.YZYD[0]) + parseFloat(this.barDataXianYangZFeiQi.YZYD[0]) + parseFloat(this.barDataWeiNanZFeiQi.YZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.YZYD[0])).toFixed(2),
            (parseFloat(this.barDataTongChuanZFeiQi.YZYD[1]) + parseFloat(this.barDataXiAnZFeiQi.YZYD[1]) + parseFloat(this.barDataXianYangZFeiQi.YZYD[1]) + parseFloat(this.barDataWeiNanZFeiQi.YZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.YZYD[1])).toFixed(2),

          ],
          HFXYJW:  [ 
            (parseFloat(this.barDataTongChuanZFeiQi.HFXYJW[0]) + parseFloat(this.barDataXiAnZFeiQi.HFXYJW[0]) + parseFloat(this.barDataXianYangZFeiQi.HFXYJW[0]) + parseFloat(this.barDataWeiNanZFeiQi.HFXYJW[0]) + parseFloat(this.barDataBaoJiZFeiQi.HFXYJW[0])).toFixed(2),
            (parseFloat(this.barDataTongChuanZFeiQi.HFXYJW[1]) + parseFloat(this.barDataXiAnZFeiQi.HFXYJW[1]) + parseFloat(this.barDataXianYangZFeiQi.HFXYJW[1]) + parseFloat(this.barDataWeiNanZFeiQi.HFXYJW[0]) + parseFloat(this.barDataBaoJiZFeiQi.HFXYJW[1])).toFixed(2),

          ],
        };

        this.barDataRightBottomJieGan = {
          xAxis: ["理论资源量","可收集资源量","利用量"],
          yAxis: [
            (parseFloat(this.barTongChuanJieGan.yAxis[0]) + parseFloat(this.barXiAnJieGan.yAxis[0]) + parseFloat(this.barXianYangJieGan.yAxis[0]) + parseFloat(this.barWeiNanJieGan.yAxis[0]) + parseFloat(this.barBaoJiJieGan.yAxis[0])).toFixed(2),
            (parseFloat(this.barTongChuanJieGan.yAxis[1]) + parseFloat(this.barXiAnJieGan.yAxis[1]) + parseFloat(this.barXianYangJieGan.yAxis[1]) + parseFloat(this.barWeiNanJieGan.yAxis[1]) + parseFloat(this.barBaoJiJieGan.yAxis[1])).toFixed(2),
            (parseFloat(this.barTongChuanJieGan.yAxis[2]) + parseFloat(this.barXiAnJieGan.yAxis[2]) + parseFloat(this.barXianYangJieGan.yAxis[2]) + parseFloat(this.barWeiNanJieGan.yAxis[2]) + parseFloat(this.barBaoJiJieGan.yAxis[2])).toFixed(2),
          ],
        };
      }
      else if(quyu == "shannan"){
        this.pieDataLeftTopNYY = {
          dataArr: [         				
              { value: (parseFloat(this.pieDataHanZhongGMS.dataArr[0].value) + parseFloat(this.pieDataAnKangGMS.dataArr[0].value) + parseFloat(this.pieDataShangLuoGMS.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataHanZhongGMS.dataArr[1].value) + parseFloat(this.pieDataAnKangGMS.dataArr[1].value) + parseFloat(this.pieDataShangLuoGMS.dataArr[1].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataHanZhongGMS.dataArr[2].value) + parseFloat(this.pieDataAnKangGMS.dataArr[2].value) + parseFloat(this.pieDataShangLuoGMS.dataArr[2].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataHanZhongGMS.dataArr[3].value) + parseFloat(this.pieDataAnKangGMS.dataArr[3].value) + parseFloat(this.pieDataShangLuoGMS.dataArr[3].value)).toFixed(2), name: "蛋鸡" },
              { value: (parseFloat(this.pieDataHanZhongGMS.dataArr[4].value) + parseFloat(this.pieDataAnKangGMS.dataArr[4].value) + parseFloat(this.pieDataShangLuoGMS.dataArr[4].value)).toFixed(2), name: "肉鸡" },
          ]
        };

        this.pieDataLeftCenterNYY = {
          dataArr: [        				
              { value: (parseFloat(this.pieDataHanZhongGMX.dataArr[0].value) + parseFloat(this.pieDataAnKangGMX.dataArr[0].value) + parseFloat(this.pieDataShangLuoGMX.dataArr[0].value)).toFixed(2), name: "生猪" },
              { value: (parseFloat(this.pieDataHanZhongGMX.dataArr[1].value) + parseFloat(this.pieDataAnKangGMX.dataArr[1].value) + parseFloat(this.pieDataShangLuoGMX.dataArr[1].value)).toFixed(2), name: "肉牛" },
              { value: (parseFloat(this.pieDataHanZhongGMX.dataArr[2].value) + parseFloat(this.pieDataAnKangGMX.dataArr[2].value) + parseFloat(this.pieDataShangLuoGMX.dataArr[2].value)).toFixed(2), name: "奶牛" },
              { value: (parseFloat(this.pieDataHanZhongGMX.dataArr[3].value) + parseFloat(this.pieDataAnKangGMX.dataArr[3].value) + parseFloat(this.pieDataShangLuoGMX.dataArr[3].value)).toFixed(2), name: "肉鸡" },
              { value: (parseFloat(this.pieDataHanZhongGMX.dataArr[4].value) + parseFloat(this.pieDataAnKangGMX.dataArr[4].value) + parseFloat(this.pieDataShangLuoGMX.dataArr[4].value)).toFixed(2), name: "蛋鸡" },
          ]
        };

        this.barDataRightTopFeiShui = {
          xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
          XQ: [ 
                (parseFloat(this.barDataHanZhongFeiShui.XQ[0]) + parseFloat(this.barDataAnKangFeiShui.XQ[0])  + parseFloat(this.barDataShangLuoFeiShui.XQ[0])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.XQ[1]) + parseFloat(this.barDataAnKangFeiShui.XQ[1])  + parseFloat(this.barDataShangLuoFeiShui.XQ[1])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.XQ[2]) + parseFloat(this.barDataAnKangFeiShui.XQ[2])  + parseFloat(this.barDataShangLuoFeiShui.XQ[2])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.XQ[3]) + parseFloat(this.barDataAnKangFeiShui.XQ[3])  + parseFloat(this.barDataShangLuoFeiShui.XQ[3])).toFixed(2),
              ],
          SC: [ 
                (parseFloat(this.barDataHanZhongFeiShui.SC[0]) + parseFloat(this.barDataAnKangFeiShui.SC[0])  + parseFloat(this.barDataShangLuoFeiShui.SC[0])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.SC[1]) + parseFloat(this.barDataAnKangFeiShui.SC[1])  + parseFloat(this.barDataShangLuoFeiShui.SC[1])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.SC[2]) + parseFloat(this.barDataAnKangFeiShui.SC[2])  + parseFloat(this.barDataShangLuoFeiShui.SC[2])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.SC[3]) + parseFloat(this.barDataAnKangFeiShui.SC[3])  + parseFloat(this.barDataShangLuoFeiShui.SC[3])).toFixed(2),
              ],
          ZZ: [ 
                (parseFloat(this.barDataHanZhongFeiShui.ZZ[0]) + parseFloat(this.barDataAnKangFeiShui.ZZ[0])  + parseFloat(this.barDataShangLuoFeiShui.ZZ[0])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.ZZ[1]) + parseFloat(this.barDataAnKangFeiShui.ZZ[1])  + parseFloat(this.barDataShangLuoFeiShui.ZZ[1])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.ZZ[2]) + parseFloat(this.barDataAnKangFeiShui.ZZ[2])  + parseFloat(this.barDataShangLuoFeiShui.ZZ[2])).toFixed(2),
                (parseFloat(this.barDataHanZhongFeiShui.ZZ[3]) + parseFloat(this.barDataAnKangFeiShui.ZZ[3])  + parseFloat(this.barDataShangLuoFeiShui.ZZ[3])).toFixed(2),
              ],
        };

        
        this.barDataRightCenterFeiQi = {
          xAxis: ["氨气",        "挥发性有机物"],
          ZZYD:  [ 
            (parseFloat(this.barDataHanZhongZFeiQi.ZZYD[0]) + parseFloat(this.barDataAnKangZFeiQi.ZZYD[0]) + parseFloat(this.barDataShangLuoZFeiQi.ZZYD[0])).toFixed(2),
            (parseFloat(this.barDataHanZhongZFeiQi.ZZYD[1]) + parseFloat(this.barDataAnKangZFeiQi.ZZYD[1]) + parseFloat(this.barDataShangLuoZFeiQi.ZZYD[1])).toFixed(2),
          ],
          YZYD:  [ 
            (parseFloat(this.barDataHanZhongZFeiQi.YZYD[0]) + parseFloat(this.barDataAnKangZFeiQi.YZYD[0]) + parseFloat(this.barDataShangLuoZFeiQi.YZYD[0])).toFixed(2),
            (parseFloat(this.barDataHanZhongZFeiQi.YZYD[1]) + parseFloat(this.barDataAnKangZFeiQi.YZYD[1]) + parseFloat(this.barDataShangLuoZFeiQi.YZYD[1])).toFixed(2),
          ],
          HFXYJW:  [ 
            (parseFloat(this.barDataHanZhongZFeiQi.HFXYJW[0]) + parseFloat(this.barDataAnKangZFeiQi.HFXYJW[0]) + parseFloat(this.barDataShangLuoZFeiQi.HFXYJW[0])).toFixed(2),
            (parseFloat(this.barDataHanZhongZFeiQi.HFXYJW[1]) + parseFloat(this.barDataAnKangZFeiQi.HFXYJW[1]) + parseFloat(this.barDataShangLuoZFeiQi.HFXYJW[1])).toFixed(2),
          ],
        };

        this.barDataRightBottomJieGan = {
          xAxis: ["理论资源量","可收集资源量","利用量"],
          yAxis: [
            (parseFloat(this.barHanZhongJieGan.yAxis[0]) + parseFloat(this.barAnKangJieGan.yAxis[0]) + parseFloat(this.barShangLuoJieGan.yAxis[0])).toFixed(2),
            (parseFloat(this.barHanZhongJieGan.yAxis[1]) + parseFloat(this.barAnKangJieGan.yAxis[1]) + parseFloat(this.barShangLuoJieGan.yAxis[1])).toFixed(2),
            (parseFloat(this.barHanZhongJieGan.yAxis[2]) + parseFloat(this.barAnKangJieGan.yAxis[2]) + parseFloat(this.barShangLuoJieGan.yAxis[2])).toFixed(2),
          ],
        }; 
      }
    },
    //右3大中小汽车排放量
    LeftBtnDM(){
      
      this.isDiMo = true;
      this.isGengZhong = false;
      this.isShuiChan = false;


      this.showLeftBottomBar1 = true;
      this.showLeftBottomBar2 = false;
      this.showLeftBottomBar3 = false;
      this.showLeftBottomPie1 = false;

      this.barDataLeftBottom = this.barDataDiMo;
    },
    LeftBtnGZ(){
      
      this.isDiMo = false;
      this.isGengZhong = true;
      this.isShuiChan = false;

      this.showLeftBottomBar1 = true;
      this.showLeftBottomBar2 = false;
      this.showLeftBottomBar3 = false;
      this.showLeftBottomPie1 = false;

      this.barDataLeftBottom = this.barDataGengZhong;
    },
    LeftBtnSG(){
      
      this.isShuiGuo = true;
      this.isNongYao = false;
      this.isHuaFei = false;


      this.barDataLeftBottom1 = this.barDataShuiGuo;
    },
    LeftBtnNY(){
      
      this.isShuiGuo = false;
      this.isNongYao = true;
      this.isHuaFei = false;


      this.barDataLeftBottom1 = this.barDataNongYao;
    },
    LeftBtnHF(){
      
      this.isShuiGuo = false;
      this.isNongYao = false;
      this.isHuaFei = true;


      this.barDataLeftBottom1 = this.barDataHuaFei;
    },
    LeftBtnZZ(){
      /*
            <div class="leftBtn" slot="header">
            <el-button-group class="leftBtnR">
              <el-button size="mini" @click.native="LeftBtnZZ">种植</el-button>
              <el-button size="mini" @click.native="LeftBtnSC">水产</el-button>
              <el-button size="mini" @click.native="LeftBtnTS">特色</el-button>
            </el-button-group>
          </div>

        <div class="leftBtnBottom" slot="subBtn" v-show="btnShowZZ">
            <el-button-group>
              <el-button size="mini" @click.native="LeftBtnDM">地膜</el-button>
              <el-button size="mini" @click.native="LeftBtnGZ">耕种</el-button>
            </el-button-group>
          </div>
          <div class="leftBtnBottom" slot="subBtn" v-show="btnShowTS">
            <el-button-group >
              <el-button size="mini" @click.native="LeftBtnSG">水果</el-button>
              <el-button size="mini" @click.native="LeftBtnNY">农药</el-button>
              <el-button size="mini" @click.native="LeftBtnHF">化肥</el-button>
            </el-button-group>
          </div>
      
      btnShowZZ:true,
      btnShowTS:false,
      
      isDiMo:true,
      isGengZhong:false,
      isShuiChan : false,
      isShuiGuo : false,
      isNongYao : false,
      isHuaFei : false,

      //全省地膜
      barDataDiMo:{
        xAxis: ["地膜使用量",    "地膜累积残留量"],
        yAxis: [ 23139.74,	13737.3826],
      }, 
      //全省耕种
      barDataGengZhong:{
        xAxis: ["耕地面积",    "园地面积"],
        yAxis: [ 44706356.35,	23224804.18],
      }, 
      //全省水产
      pieDataBottom:{
        dataArr: [
            { value: 1472, name: "规模养殖场" },
            { value: 9827, name: "规模以下养殖场" },
        ]
      },
      //全省陕西特色水果
      barDataShuiGuo:{
        xAxis: ["纸袋",    "薄膜袋"],
        SYL:    [ 7714414.87, 431798.69],
        HSL:    [ 3714017.66, 417149.08],
      }, 
      //全省陕西特色农药
      barDataNongYao:{
        xAxis: ["瓶装",    "袋装",  "桶装","气雾罐","其他"],
        SYL:    [ 3674.85, 	3766.41, 	15.35, 	21.41, 	29.23 ],
        HSL:    [ 104.61, 	139.58, 	2.86, 	2.14, 	3.06 ],
      }, 
      //全省陕西特色化肥
      barDataHuaFei:{
        xAxis: ["聚酯类包装物", "袋装包装物", "桶装包装物", "其他包装物"],
        SYL:   [ 2342.44, 	15545.77, 	436.72, 	47.14  ],
        HSL:   [ 1596.98, 	14245.23, 	414.00, 	27.61 ],
      },
      */
      this.btnShowZZ = true;
      this.btnShowTS = false;
      
      this.isDiMo = true;
      this.isGengZhong = false;
      this.isShuiChan = false;
      this.isShuiGuo = false;
      this.isNongYao = false;
      this.isHuaFei = false;

      this.showLeftBottomBar1 = true;
      this.showLeftBottomBar2 = false;
      this.showLeftBottomBar3 = false;
      this.showLeftBottomPie1 = false;

      this.barDataLeftBottom = this.barDataDiMo;
    },
    LeftBtnSC(){
      this.btnShowZZ = false;
      this.btnShowTS = false;
      
      this.isDiMo = false;
      this.isGengZhong = false;
      this.isShuiChan = true;

      this.showLeftBottomBar1 = false;
      this.showLeftBottomBar2 = false;
      this.showLeftBottomBar3 = false;
      this.showLeftBottomPie1 = true;

      this.barDataLeftBottom = this.pieDataBottom;
    },
    LeftBtnTS(){
      this.btnShowZZ = false;
      this.btnShowTS = true;
      
      this.isDiMo = false;
      this.isGengZhong = false;
      this.isShuiChan = false;
      this.isShuiGuo = true;
      this.isNongYao = false;
      this.isHuaFei = false;

      this.showLeftBottomBar1 = false;
      this.showLeftBottomBar2 = true;
      this.showLeftBottomBar3 = false;
      this.showLeftBottomPie1 = false;

      this.barDataLeftBottom = this.barDataShuiGuo;
    },
    //重点排污单位点击事件
    resetPoiInfo(){
      this.isPopupShow = false;
      this.isDynamicPoiShow = false;
      if(this.poiVectorLayer!=null){
          if(this.poiVectorLayer.getSource()!=null){
              this.poiVectorLayer.getSource().clear();
          }
      }
      this.poiName="";
      this.poiAddress="";
    },
    closePopup(){
      this.isPopupShow = false;
      this.isDynamicPoiShow = false;
      if(this.poiVectorLayer!=null){
          if(this.poiVectorLayer.getSource()!=null){
              this.poiVectorLayer.getSource().clear();
          }  
      }
    },
    ListClick(danwei){
      //alert(danwei.name);
      this.resetPoiInfo();
      this.getPoiInfo(danwei);
    },
    getPoiInfo(danwei){
      var that = this;
      var lng=(parseInt(danwei.lngDu)+(parseInt(danwei.lngFen)/60)+(parseInt(danwei.lngMiao)/3600)).toFixed(5);
      var lat=(parseInt(danwei.latDu)+(parseInt(danwei.latFen)/60)+(parseInt(danwei.latMiao)/3600)).toFixed(5);
      var coordinate = [parseFloat(lng), parseFloat(lat)];

      var centerCoordinate =  [parseFloat(lng)+0.005, parseFloat(lat)+0.015];
      this.map.getView().setCenter(centerCoordinate);
      this.map.getView().setZoom(13);

      //初始化poiPopup
      var element = document.getElementById("poiPopup");
      this.Popup = {};
      this.Popup = new ol.Overlay({
          element : element,
          positioning: 'bottom-center',
          stopEvent:false,
          offset:[0,-50]
      });
      this.map.addOverlay(this.Popup);

      //动态POI
      var DynamicPoiDiv = document.getElementById("DynamicPoi");
      this.DynamicPOI = {};
      this.DynamicPOI = new ol.Overlay({
          element: DynamicPoiDiv,
          positioning: 'center-center'
      });
      this.map.addOverlay(this.DynamicPOI);
      this.DynamicPOI.setPosition(coordinate);
      this.isDynamicPoiShow = true;

      //打开PopUp
      var popContent = document.getElementById("popContent");
      popContent.innerHTML = "";
      popContent.innerHTML += "<span class = 'poiText' >企业名称：" + danwei.name + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >行业名称：" + danwei.HYMC + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >地址：" + danwei.address + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0]+","+coordinate[1] + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >企业规模：" + danwei.QYGM + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >企业运行状态：" + danwei.QYYXZT + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >工业总产值：" + danwei.GYZCZ + "</span>";

      that.Popup.setPosition(coordinate);
      that.isPopupShow = true;

      this.map.updateSize();

    },
    //左下部分滚动
    newscroll(){
        /*
        var scrollBox1 = document.getElementById("scrollBox1");
        var top = window.getComputedStyle(scrollBox1,null).getPropertyValue("top");
        var height = window.getComputedStyle(scrollBox1,null).getPropertyValue("height");
        var heightValue = parseInt(height.substring(0,height.length-2));
        console.log(heightValue);
        var topValue = top.substring(0,top.length-2);
        var newTop = parseInt(topValue) - 2;
        scrollBox1.style.top = newTop + "px";

        var scrollBox2 = document.getElementById("scrollBox2");
        var top = window.getComputedStyle(scrollBox2,null).getPropertyValue("top");
        var topValue = top.substring(0,top.length-2);
        var newTop = parseInt(topValue) - 2;
        scrollBox2.style.top = newTop + "px";
        change = change + 2;
        if(change>heightValue){
          scrollBox1.style.top = -10 + "px";
        }
        */
        var box=document.getElementById("boxlist");
        var l1=document.getElementById("list1");
        var l2=document.getElementById("list2");
        //l2.innerHTML=l1.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
        function scrollup(){
            if(box.scrollTop>=(l1.offsetHeight+15)){ //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
                box.scrollTop=0;
            }else{
                box.scrollTop++;
            }
            //console.log(box.scrollTop,l1.offsetHeight);
        }
        
        var scrollMove=setInterval(scrollup,30);//数值越大，滚动速度越慢

        //鼠标经过时，滚动停止
        box.onmouseover=function(){
            clearInterval(scrollMove)
        }

        //鼠标离开时，滚动继续
        box.onmouseout=function(){
            scrollMove=setInterval(scrollup,30);
        }


    },
    //底部浮动按钮
    bottomBtnLeft(){
      this.floatDivTitle = "全 省 主 要 能 源 消 耗 统 计 表";
      var Attr = new Array();
      /*
      for(var i=0;i<15;i++){
        Attr.push({"FID":"111","GB":"1111","aa":"1111","bb":"1111","cc":"1111","dd":"1111","ee":"1111"});
      }
      */
      Attr.push({"序号":"1","名称":"煤炭","单位":"万吨","普查数据":"1.50","统计数据":"1.47","差之比(%)":"2"});
      Attr.push({"序号":"2","名称":"天然气","单位":"亿立方米","普查数据":"33.17","统计数据":"39.96","差之比(%)":"-16.9"});
      Attr.push({"序号":"3","名称":"原油","单位":"万吨","普查数据":"2035.51","统计数据":"1832.83","差之比(%)":"11"});
      Attr.push({"序号":"4","名称":"焦炭","单位":"万吨","普查数据":"614.03","统计数据":"685.36","差之比(%)":"-10"});
      Attr.push({"序号":"5","名称":"取水量","单位":"亿立方米","普查数据":"15.17","统计数据":"14.34","差之比(%)":"5.8"});

      this.AttrFeatures = {
        featureArr:{attr:Attr},
        totalCount: Attr.length,
      }
      if(!this.isShowAttribute){
        this.isShowAttribute = true;
      }
    },
    bottomBtnRight(){
      this.floatDivTitle = "全 省 主 要 产 品 产 量 统 计 表";
      var Attr = new Array();
      /*
      for(var i=0;i<15;i++){
        Attr.push({"FID":"222","GB":"2222","aa":"2222","bb":"2222","cc":"2222","dd":"2222","ee":"2222"});
      }
      */
      Attr.push({"序号":"1","名称":"原油","单位":"万吨","普查数据":"60258.81","统计数据":"56959.93","差之比(%)":"6"});
      Attr.push({"序号":"2","名称":"天然原油","单位":"万吨","普查数据":"3687.45","统计数据":"3489.82","差之比(%)":"6"});
      Attr.push({"序号":"3","名称":"火力发电量","单位":"亿千瓦小时","普查数据":"1725.31","统计数据":"1781.39","差之比(%)":"-3"});
      Attr.push({"序号":"4","名称":"天然气","单位":"亿立方米","普查数据":"183.1","统计数据":"204.41","差之比(%)":"-10"});
      Attr.push({"序号":"5","名称":"啤酒","单位":"万千升","普查数据":"84.43","统计数据":"91.73","差之比(%)":"-8"});
      Attr.push({"序号":"6","名称":"焦炭","单位":"万吨","普查数据":"3870.91","统计数据":"4050.41","差之比(%)":"-4"});
      Attr.push({"序号":"7","名称":"中成药","单位":"万吨","普查数据":"8.45","统计数据":"7.95","差之比(%)":"6"});
      Attr.push({"序号":"8","名称":"水泥","单位":"万吨","普查数据":"5398.73","统计数据":"7476.09","差之比(%)":"-28"});
      Attr.push({"序号":"9","名称":"生铁","单位":"万吨","普查数据":"1128.49","统计数据":"1137.06","差之比(%)":"-1"});
      Attr.push({"序号":"10","名称":"粗钢","单位":"万吨","普查数据":"1185.14","统计数据":"1184.26","差之比(%)":"0"});
      Attr.push({"序号":"11","名称":"农村常住人口","单位":"万人","普查数据":"1821.19","统计数据":"1626.40","差之比(%)":"11.98"});
      Attr.push({"序号":"12","名称":"全市常住人口","单位":"万人","普查数据":"3835.4","统计数据":"3835.4","差之比(%)":"0"});
      Attr.push({"序号":"13","名称":"生活用水","单位":"万立方米","普查数据":"258.32","统计数据":"254.10","差之比(%)":"1.66"});
      Attr.push({"序号":"14","名称":"生猪","单位":"万头","普查数据":"1348.85","统计数据":"1141.01","差之比(%)":"18.22"});
      Attr.push({"序号":"15","名称":"奶牛","单位":"万头","普查数据":"29.70","统计数据":"28.42","差之比(%)":"4.52"});
      Attr.push({"序号":"16","名称":"肉牛","单位":"万头","普查数据":"69.56","统计数据":"57.61","差之比(%)":"20.73"});
      Attr.push({"序号":"17","名称":"蛋鸡","单位":"万羽","普查数据":"6021.42","统计数据":"6734.87","差之比(%)":"-10.59"});
      Attr.push({"序号":"18","名称":"肉鸡","单位":"万羽","普查数据":"5720.01","统计数据":"5198.97","差之比(%)":"10.02"});

      this.AttrFeatures = {
        featureArr:{attr:Attr},
        totalCount: Attr.length,
      }
      if(!this.isShowAttribute){
        this.isShowAttribute = true;
      }
    },
    //浮动DIV
    CloseAttr(){
      if(this.isShowAttribute){
        this.isShowAttribute = false;
        this.AttrFeatures={
          featureArr: {},
          totalCount:0,    
        }
      } 
    },
    attrCallBack(row){

    },

    shiji(){
      var that = this;

      // 重置地图
      //that.resetMap();

      // 添加省级专题图，行政区边界只加载一次
      if(that.sjVectorSource == null){
        that.sjVectorSource = new ol.source.Vector();
        that.sjVectorLayer = new ol.layer.Vector({
          source: that.sjVectorSource,
        });
        that.map.addLayer(that.sjVectorLayer);
        // 初始化overlay
        this.initSjOverlayVectorLayer();
        
        
        // 请求WFS服务，获取市级行政区边界
        var featureRequest = new ol.format.WFS().writeGetFeature({
          srsName: 'EPSG:4490',
          //featureTypes: ['sxxzq:dsjbj'],
          featureTypes: ['sxdsjbj:sxdsjbj'],
          outputFormat: 'GML3',
        });

        var reqParam = new XMLSerializer().serializeToString(featureRequest);
        api.wfsPostXml(this.xzqWFSUrl, reqParam).then(res=>{
          if(res.data){
            var features = new ol.format.WFS().readFeatures(res.data);
            that.sjVectorSource.addFeatures(features);
            // 刷新
            that.refreshSjvectorLayer();
            if(that.ADLayer){
              that.ADLayer.clear();
            }
            //that.ScatterColor="yellow";
            //that.initChart(that.ScatterColor);
            //that.loadDefaultLayer();
            this.map.updateSize();
          }
        });
      }else{
        // 刷新
        that.refreshSjvectorLayer();
      }
    },
    resetMap(){
      var that = this;
      // 清空省级overlay状态
      if(that.sjOverlayVectorSource){
        that.sjOverlayVectorSource.clear();
      }
      // 清空行政区样式
      if(that.sjVectorLayer){
        that.sjVectorLayer.setStyle(null);
      }
    },
    initSjOverlayVectorLayer(){
      var that = this;
      if(that.map){
         if(that.sjOverlayVectorSource == null){
            that.sjOverlayVectorSource = new ol.source.Vector();
            var vectorLayer = new ol.layer.Vector({
              source: that.sjOverlayVectorSource,
            });
            that.map.addLayer(vectorLayer);
         }
      }
    },
    refreshSjvectorLayer(){
      var that = this;

      // 缩放到可视范围
      //that.map.getView().fit(that.sjVectorSource.getExtent());
      // 根据统计数据结果更新数据，专题图和图例
      that.processRequestData(that.sjVectorSource.getFeatures());
       
      that.sjVectorLayer.setStyle(that.getStyleFunction);

    },
        // 将统计数据赋值给feature
    processRequestData(features){
      
      // 处理实体数量数据
      for(var j=0,jj=features.length; j<jj; j++){    
          features[j].set("tagValue", j);
        }
    },
    getStyleFunction(feature){
      var that = this;
      //console.log(feature.N.NAME);
      return new ol.style.Style({
            fill: new ol.style.Fill({color: that.getFillColor(feature)}),
            //stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.8)', width: 2})
            //stroke: new ol.style.Stroke({color: '#33a19c', width: 2})
            stroke: new ol.style.Stroke({color: '#33a19c', width: 2}),
            //text:new ol.style.Text({font:'15px Microsoft YaHei',text:feature.N.NAME,fill: new ol.style.Fill({color:'rgba(188, 235, 127)'})})
          })
    },
    // 获取统计专题填充颜色
    getFillColor(feature){
      var that = this;
      var tagValue = feature.get("tagValue");
      var fillColor = null;
      if(tagValue == 0){
        //fillColor = "rgba(188,235,127,1)";
        //fillColor = "rgba(20, 50, 66, 0.3)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 1){
        //fillColor = "rgba(133,178,139,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 2){
        //fillColor = "rgba(227,168,91,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 3){
        //fillColor = "rgba(216,90,88,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 4){
        //fillColor = "rgba(226,33,52,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 5){
        //fillColor = "rgba(226,33,100,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 6){
        //fillColor = "rgba(139, 37, 165,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 7){
        //fillColor = "rgba(223, 79, 12,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 8){
        //fillColor = "rgba(196, 27, 182,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 9){
        //fillColor = "rgba(194, 44, 114,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }else if(tagValue == 10){
        //fillColor = "rgba(204, 107, 38,1)";
        fillColor = "rgba(36, 91, 121, 0.3)";
      }
      else{
        fillColor = "rgba(36, 91, 121, 0.3)";
      }
      return fillColor;
    },
    tingzhi(){
      var that = this;
      window.clearInterval(that.intervalID);
      if(that.sjOverlayVectorSource){
          that.sjOverlayVectorSource.clear();
      }else{
        return;
      }
      that.autoRefreshSj = 0;
    },
    zidong(){
      var that = this;
      that.autoRefreshSj = 0;
      that.intervalID = window.setInterval(that.AutoRefreshSJBigScreenCharts,2000);
    },
    AutoRefreshSJBigScreenCharts(){
      var that = this;
      var sjCorrdinate = new Array();
      sjCorrdinate.push([109.87358093261719, 38.21044921875]);
      sjCorrdinate.push([108.99467468261719, 35.22216796875]); 
      sjCorrdinate.push([108.37944030761719, 34.73876953125]);
      sjCorrdinate.push([107.01713562011719, 34.29931640625]);
      sjCorrdinate.push([109.08256530761719, 34.16748046875]);
      sjCorrdinate.push([110.26908874511719, 34.12353515625]);
      sjCorrdinate.push([109.96147155761719, 34.82666015625]);
      sjCorrdinate.push([108.90678405761719, 32.67333984375001]);
      sjCorrdinate.push([109.56596374511719, 36.58447265625]);
      sjCorrdinate.push([107.01713562011719, 33.24462890625001]);
      console.log(that.autoRefreshSj);
      console.log(sjCorrdinate[that.autoRefreshSj]);
      that.refreshBigScreenCharts(sjCorrdinate[that.autoRefreshSj]);
      that.autoRefreshSj++;
      if(that.autoRefreshSj>sjCorrdinate.length-1){
        that.autoRefreshSj = 0;
      }
    },
    // 初始化地图参数
    initMapParams(){

    	this.gProjection = ol.proj.get('EPSG:3857');
    	this.gResolutions = new Array(22);
      this.gMatrixIds = new Array(22);
        for (var z = 0; z < 22; z++) {
        	this.gResolutions[z] = 360 / (256 * Math.pow(2, z+1));
        	this.gMatrixIds[z] = z;
        }
        this.gTileGrid = new ol.tilegrid.WMTS({
        	  origin: [-20026376.39, 20048966.10],
            resolutions: this.gResolutions,
            matrixIds: this.gMatrixIds
        });
    },

   // 初始化地图
    initMap() {
      //this.initMapParams();
      this.gProjection = ol.proj.get('EPSG:3857');
      this.map = new ol.Map({
            target: 'map',
            view: new ol.View({
            	//extent: [-20026376.39,-20048966.10,20026376.39,20048966.10],
            	projection: this.gProjection,
                //resolutions: this.gResolutions,
                center: [12149470.527,4175685.289], 
                zoom: 6
            })
        });
      this.map.on('singleclick', this.onMapSelectHandler);
          this.map.on('moveend', this.onMapZoomHandler);

    },
    //地图缩放事件
    onMapZoomHandler(e){
      var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
      console.log(zoom);
      
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        //stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.7)', width: 3}),
        //'#33a19c'
        stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });

      var style1 = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        //stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.7)', width: 3}),
        //'#33a19c'
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });

      
      if(zoom >= 9){
        
        for(var i=0;i<this.xjfeatures.length;i++){
          this.xjfeatures[i].setStyle(style);
        }

        this.sjVectorLayer.setStyle(this.setSjNoShowStyle);

      }else{
        
        for(var i=0;i<this.xjfeatures.length;i++){
          this.xjfeatures[i].setStyle(style1);
        }

        this.sjVectorLayer.setStyle(this.setSjShowStyle);

      }
    },
    setSjNoShowStyle(feature){
      var that = this;
      //console.log(feature.N.NAME);
      return new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba(255, 204, 0, 0.0)'}),
            //stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.8)', width: 2})
            //stroke: new ol.style.Stroke({color: '#33a19c', width: 2})
            stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.0)', width: 2}),
            //text:new ol.style.Text({font:'15px Microsoft YaHei',text:feature.N.NAME,fill: new ol.style.Fill({color:'rgba(188, 235, 127)'})})
          })
    },
    setSjShowStyle(feature){
      var that = this;
      //console.log(feature.N.NAME);
      return new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
            //stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.7)', width: 3}),
            //'#33a19c'
            stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
          })
    },
    //加载陕西县级边界geojson
    LoadSxxjbj(){
      
      var that = this;
      
      let json = require('../../assets/js/geojson/sxxjbjpro.json')

      that.xjfeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:3857'
      });
      
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 2}),
      });

      for(var i=0;i<that.xjfeatures.length;i++){
        that.xjfeatures[i].setStyle(style);
      }
      var xjsource = new ol.source.Vector({
        features:that.xjfeatures
      });
      

      that.sxxjbjProLayer = new ol.layer.Vector({
        source: xjsource,
      });

      that.map.addLayer(that.sxxjbjProLayer);

    },
    onMapSelectHandler(e){
      var that = this;
      that.refreshBigScreenCharts(e.coordinate);
    },
    refreshBigScreenCharts(coordinate){
      //console.log(coordinate);
      //console.log("zhixing");
      var that = this;
      // 清除选择要素的样式
      if(that.sjOverlayVectorSource){
          that.sjOverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      if(that.sjVectorSource){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
        }
      }
      // 设置选中样式
      if(selFeature){
        var style = new ol.style.Style({
            fill: new ol.style.Fill({color: "rgba(36, 91, 121, 0.0)"}),
            //stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.8)', width: 2})
            stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
          })
        selFeature.setStyle(style);
        that.sjOverlayVectorSource.addFeature(selFeature);
      }
      var DSJSXZDM = "";
      if(selFeature){
        DSJSXZDM = selFeature.N.BZ;
        console.log(DSJSXZDM);
      }
      
      if(DSJSXZDM!=""){
        that.refreshWRYEchart(DSJSXZDM);
      }
      else{
        //未选中行政区
        //左1
        this.pieDataLeftTopNYY = this.pieDataQuanShengGMS;
        //左2
        this.pieDataLeftCenterNYY = this.pieDataQuanShengGMX;

        this.barDataRightTopFeiShui = this.barDataQuanShengFeiShui;
        this.barDataRightCenterFeiQi = this.barDataQuanShengZFeiQi;
        this.barDataRightBottomJieGan = this.barQuanShengJieGan;


        //左三
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataBottom;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHuaFei;
        }
      }
    },
    getSelectedStyleFunction(feature){
      var that = this;
      return new ol.style.Style({
            fill: new ol.style.Fill({color: that.getFillColor(feature)}),
            stroke: new ol.style.Stroke({color: 'rgba(243, 45, 45, 0.8)', width: 2})
          })
    },

    refreshWRYEchart(DSJSXZDM){
      //console.log(DSJSXZDM);
      if(DSJSXZDM=='610800'){
        //榆林市
        console.log("榆林市");
        this.pieDataLeftTopNYY = this.pieDataYuLinGMS;
        this.pieDataLeftCenterNYY = this.pieDataYuLinGMX;
        this.barDataRightTopFeiShui = this.barDataYuLinFeiShui;
        this.barDataRightCenterFeiQi = this.barDataYuLinZFeiQi;
        this.barDataRightBottomJieGan = this.barYuLinJieGan;

        /*
        isDiMo:true,
        isGengZhong:false,
        isShuiChan : false,
        isShuiGuo : false,
        isNongYao : false,
        isHuaFei : false,
        */
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataYuLinDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataYuLinGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataYuLinWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataYuLinShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataYuLinNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataYuLinHuaFei;
        }

      }
      else if(DSJSXZDM=='610600'){
        //延安
        console.log("延安");
        this.pieDataLeftTopNYY = this.pieDataYanAnGMS;
        this.pieDataLeftCenterNYY = this.pieDataYanAnGMX;

        this.barDataRightTopFeiShui = this.barDataYanAnFeiShui;
        this.barDataRightCenterFeiQi = this.barDataYanAnZFeiQi;
        this.barDataRightBottomJieGan = this.barYanAnJieGan;

        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataYanAnDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataYanAnGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataYanAnWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataYanAnShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataYanAnNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataYanAnHuaFei;
        }

       
      }
      else if(DSJSXZDM=='610500'){
        //渭南
        console.log("渭南");
        this.pieDataLeftTopNYY = this.pieDataWeiNanGMS;
        this.pieDataLeftCenterNYY = this.pieDataWeiNanGMX;

        this.barDataRightTopFeiShui = this.barDataWeiNanFeiShui;
        this.barDataRightCenterFeiQi = this.barDataWeiNanZFeiQi;
        this.barDataRightBottomJieGan = this.barWeiNanJieGan;

        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataWeiNanDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataWeiNanGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataWeiNanWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataWeiNanShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataWeiNanNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataWeiNanHuaFei;
        }

      }
      else if(DSJSXZDM=='610200'){
        //铜川
        console.log("铜川");
        this.pieDataLeftTopNYY = this.pieDataTongChuanGMS;
        this.pieDataLeftCenterNYY = this.pieDataTongChuanGMX;

        this.barDataRightTopFeiShui = this.barDataTongChuanFeiShui;
        this.barDataRightCenterFeiQi = this.barDataTongChuanZFeiQi;
        this.barDataRightBottomJieGan = this.barTongChuanJieGan;


        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataTongChuanDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataTongChuanGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataTongChuanWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataTongChuanShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataTongChuanNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataTongChuanHuaFei;
        }

        

      }
      else if(DSJSXZDM=='610400'){
        //咸阳
        console.log("咸阳");
        this.pieDataLeftTopNYY = this.pieDataXianYangGMS;
        this.pieDataLeftCenterNYY = this.pieDataXianYangGMX;

        this.barDataRightTopFeiShui = this.barDataXianYangFeiShui;
        this.barDataRightCenterFeiQi = this.barDataXianYangZFeiQi;
        this.barDataRightBottomJieGan = this.barXianYangJieGan;


        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataXianYangDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataXianYangGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataXianYangWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataXianYangShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataXianYangNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataXianYangHuaFei;
        }


      }
      else if(DSJSXZDM=='610300'){
        //宝鸡
        console.log("宝鸡");
        this.pieDataLeftTopNYY = this.pieDataBaoJiGMS;
        this.pieDataLeftCenterNYY = this.pieDataBaoJiGMX;

        this.barDataRightTopFeiShui = this.barDataBaoJiFeiShui;
        this.barDataRightCenterFeiQi = this.barDataBaoJiZFeiQi;
        this.barDataRightBottomJieGan = this.barBaoJiJieGan;


        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataBaoJiDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataBaoJiGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataBaoJiWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataBaoJiShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataBaoJiNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataBaoJiHuaFei;
        }


      }
      else if(DSJSXZDM=='610100'){
        //西安
        console.log("西安");
        this.pieDataLeftTopNYY = this.pieDataXiAnGMS;
        this.pieDataLeftCenterNYY = this.pieDataXiAnGMX;

        this.barDataRightTopFeiShui = this.barDataXiAnFeiShui;
        this.barDataRightCenterFeiQi = this.barDataXiAnZFeiQi;
        this.barDataRightBottomJieGan = this.barXiAnJieGan;

        
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataXiAnDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataXiAnGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataXiAnWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataXiAnShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataXiAnNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataXiAnHuaFei;
        }

      }
      else if(DSJSXZDM=='611000'){
        //商洛
        console.log("商洛");
        this.pieDataLeftTopNYY = this.pieDataShangLuoGMS;
        this.pieDataLeftCenterNYY = this.pieDataShangLuoGMX;

        this.barDataRightTopFeiShui = this.barDataShangLuoFeiShui;
        this.barDataRightCenterFeiQi = this.barDataShangLuoZFeiQi;
        this.barDataRightBottomJieGan = this.barShangLuoJieGan;


        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataShangLuoDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataShangLuoGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataShangLuoWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataShangLuoShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataShangLuoNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataShangLuoHuaFei;
        }

      
      }
      else if(DSJSXZDM=='610900'){
        //安康
        console.log("安康");
        this.pieDataLeftTopNYY = this.pieDataAnKangGMS;
        this.pieDataLeftCenterNYY = this.pieDataAnKangGMX;

        this.barDataRightTopFeiShui = this.barDataAnKangFeiShui;
        this.barDataRightCenterFeiQi = this.barDataAnKangZFeiQi;
        this.barDataRightBottomJieGan = this.barAnKangJieGan;


        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataAnKangDiMo;
        }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataAnKangGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataAnKangWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataAnKangShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataAnKangNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataAnKangHuaFei;
        }

      }
      else if(DSJSXZDM=='610700'){
        //汉中
        console.log("汉中");
        this.pieDataLeftTopNYY = this.pieDataHanZhongGMS;
        this.pieDataLeftCenterNYY = this.pieDataHanZhongGMX;

        this.barDataRightTopFeiShui = this.barDataHanZhongFeiShui;
        this.barDataRightCenterFeiQi = this.barDataHanZhongZFeiQi;
        this.barDataRightBottomJieGan = this.barHanZhongJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataHanZhongDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataHanZhongGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataHanZhongWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataHanZhongShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataHanZhongNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHanZhongHuaFei;
        }

        
      }
      else if(DSJSXZDM=='611300'){
        //汉中
        console.log("西咸");
        this.pieDataLeftTopNYY = this.pieDataHanZhongGMS;
        this.pieDataLeftCenterNYY = this.pieDataHanZhongGMX;

        this.barDataRightTopFeiShui = this.barDataHanZhongFeiShui;
        this.barDataRightCenterFeiQi = this.barDataHanZhongZFeiQi;
        this.barDataRightBottomJieGan = this.barHanZhongJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataHanZhongDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataHanZhongGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataHanZhongWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataHanZhongShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataHanZhongNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHanZhongHuaFei;
        }

        
      }
      else if(DSJSXZDM=='611400'){
        //汉中
        console.log("杨凌");
        this.pieDataLeftTopNYY = this.pieDataHanZhongGMS;
        this.pieDataLeftCenterNYY = this.pieDataHanZhongGMX;

        this.barDataRightTopFeiShui = this.barDataHanZhongFeiShui;
        this.barDataRightCenterFeiQi = this.barDataHanZhongZFeiQi;
        this.barDataRightBottomJieGan = this.barHanZhongJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataHanZhongDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataHanZhongGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataHanZhongWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataHanZhongShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataHanZhongNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHanZhongHuaFei;
        }

        
      }
      else if(DSJSXZDM=='611500'){
        //汉中
        console.log("韩城");
        this.pieDataLeftTopNYY = this.pieDataHanZhongGMS;
        this.pieDataLeftCenterNYY = this.pieDataHanZhongGMX;

        this.barDataRightTopFeiShui = this.barDataHanZhongFeiShui;
        this.barDataRightCenterFeiQi = this.barDataHanZhongZFeiQi;
        this.barDataRightBottomJieGan = this.barHanZhongJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataHanZhongDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataHanZhongGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataHanZhongWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataHanZhongShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataHanZhongNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHanZhongHuaFei;
        }

        
      }

      
    },
    // 创建瓦片layer
    createCGCS2000WMTSLayer(layerUrl){
      var layer = new ol.layer.Tile({
          extent: [-180, -90, 180, 90],
          source: new ol.source.TileImage({
            tileUrlFunction: function (tileCoord) {
              var z = tileCoord[0] + 1
              var x = tileCoord[1]
              var y = -tileCoord[2] - 1
              var n = Math.pow(2, z + 1)
              x = x % n
              if (x * n < 0) {
                x = x + n
              }
              return layerUrl.replace('{z}', z.toString())
                .replace('{y}', y.toString())
                .replace('{x}', x.toString())
            },
            projection: this.gProjection,
            tileGrid: this.gTileGrid,
          })
        });
      return layer;
    },
    
    // 加载默认底图
    loadDefaultLayer(){
      if(this.map){
        //var sxmapUrl = "http://10.61.104.60:6080/arcgis/rest/services/gqk/sxdlgqW2018/MapServer/WMTS?layer=gqk_sxdlgqW2018&style=default&tilematrixset=default028mm&request=GetTile&version=1.0.0&format=image/jpgpng&tilematrix={z}&tilecol={x}&tilerow={y}";
        //var sxmapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/WMTS?layer=ChinaOnlineStreetPurplishBlue&style=default&tilematrixset=default028mm&request=GetTile&version=1.0.0&format=image/png&tilematrix={z}&tilecol={x}&tilerow={y}";
        //var sxmapUrl = "http://10.61.104.60:6080/arcgis/rest/services/gqksdewy1/MapServer/WMTS?layer=gqksdewy1&style=default&tilematrixset=default028mm&request=GetTile&version=1.0.0&format=image/jpgpng&tilematrix={z}&tilecol={x}&tilerow={y}";
        //this.map.addLayer(this.createCGCS2000WMTSLayer(sxmapUrl));
        
        //var tk = "&tk=3d7df4cd5fbc6850a1a9de669be2b48a";
        //var tdtimageurl = 'http://t0.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}';
	      //var tdtAnnotationurl = 'http://t0.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}';

        var tk = "&tk=ba55f42568ebf82584d60b5fbd8eee27";
        //var tdtimageurl = 'http://t0.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}';
	      var tdtAnnotationurl = 'http://t0.tianditu.com/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}';
        //this.map.addLayer(this.createCGCS2000WMTSLayer(tdtimageurl+tk));
        this.map.addLayer(this.createCGCS2000WMTSLayer(tdtAnnotationurl+tk));
      }
    },
    //加载默认WFS
    LoadDefaultWFS(){
      this.shiji();
    },
    //加载高德地图
    LoadGaoDeMap(){
      var gaodeMapLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
              //url: 'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}'
              url:'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          })
      });
      //this.map.setMapStyle('amap://styles/whitesmoke');
      this.map.addLayer(gaodeMapLayer);
    },
    //散点图
    convertData(data,geoCoordMap) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
              });
          }
      }
      return res;
    },
    //散点图
    initChart (scatterColor) {
      let that = this;
      var convertData = that.convertData(that.data,that.geoCoordMap);
      var option = {
        /*
        tooltip:{
          trigger:'item',
          formatter: function (val) {
            return '地灾点：'+val.data.name
          },
          extraCssText: 'border:1px solid #31ada5;background-color:#002336;'
        },
        */
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo', 
            symbol: 'circle', 
            symbolSize: function (val) {
              return val[2] / 5
            },
            /*
            label:{
              normal:{
                formatter:'{b}',
                position:'right',
                show:false,
              },
              emphasis:{
                show:true
              }
            },
            */
            itemStyle: {
              color: scatterColor
            },
            data: convertData
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo', 
            symbol: 'circle',  
            symbolSize: function (val) {
              return val[2] / 5
            },
            rippleEffect:{
              brushType:'stroke'
            },
            /*
            label:{
              normal:{
                formatter:'{b}',
                position:'right',
                show:true,
                textStyle:{
                  fontSize:15,
                  fontWeight:'bolder',
                  color:'yellow',
                  padding:[5,0,0,10],
                }
              },
            },
            */
            itemStyle: {
              color: scatterColor,
              shadowBlur:10,
              shadowColor:'#333'
            },
            zlevel:1,
            data: convertData
          }
        ]
      }
      
      that.ADLayer = new ADLayer(option,this.map,echarts); 
      console.log(that.ADLayer);
      if(that.ADLayer){
        that.ADLayer.render();
      }
    },
    //散点图
    switchScatter(name){
      var that = this;
      if(name == "工业源"){
        if(that.ADLayer){
          that.ADLayer.clear();
        } 
        that.ScatterColor="red";
        that.initChart(that.ScatterColor);
        this.map.updateSize();
      }
      else if(name == "农业源"){
        if(that.ADLayer){
          that.ADLayer.clear();
        }
        that.ScatterColor="yellow";
        that.initChart(that.ScatterColor);
        this.map.updateSize();
      }
      else if(name == "集中式"){
        if(that.ADLayer){
          that.ADLayer.clear();
        }
        that.ScatterColor="rgb(132, 236, 100)";
        that.initChart(that.ScatterColor);
        this.map.updateSize();
      }
      else if(name == "移动源"){
        if(that.ADLayer){
          that.ADLayer.clear();
        }
        that.ScatterColor="rgb(240, 138, 54)";
        that.initChart(that.ScatterColor);
        this.map.updateSize();
      }
      else if(name == "生活源"){
        if(that.ADLayer){
          that.ADLayer.clear();
        }
        that.ScatterColor="rgb(240, 54, 224)";
        that.initChart(that.ScatterColor);
        this.map.updateSize();
      }
    },
  },
  mounted() {
    // 初始化地图
    this.initMap();

    // 加载默认底图
    //this.loadDefaultLayer();

    //加载高德地图
    this.LoadGaoDeMap();
    //加载默认WFS
    //this.LoadDefaultWFS();
    //加载县级json
    this.LoadSxxjbj();
    //加载Geojson
    this.LoadSxdsjbj();
    //刷新地图尺寸
    this.refreshMapSize();
    //滚动
    //this.newscroll();
    //初始化散点图
    //散点图
    //this.ScatterColor="yellow";
    //this.initChart(this.ScatterColor);
  },
  components: {
    Box,
    NewBox,
    NewBoxRight,
    LineChart,
    Bar4,
    WeaterItem,
    Bar1,
    Bar1New,
    Bar2New,
    BarLeftTop,
    PieLeftTop,
    BarCenter,
    BarLeftCenterydy,
    BarLeftBottom,
    BarLeftBottom1,
    BarLeftBottom2,
    PieLeftBottom1,
    BarCenterNYY,
    BarRightTopNYY,
    BarRightCenterNYY,
    BarRightBottomNYY,
    BarRightBottomydy,
    BarRightTopydy,
    PieLeftBottom,
    PieLeftCenter,
    barLeftTopLeft,
    barLeftTopRight,
    BarRightCenter,
    Bar5,
    PieChart3,
    PieChart4,
    PieChart5,
    mapBox,
    FloatDiv,
    NewBox1,
    NewBoxDouble
  }
};
</script>

<style lang="scss" scoped>
.bigScreen .bigScreenContent .left-bar{
  width:24.4%;
};
.bigScreen .bigScreenContent .right-bar{
  width:24.4%;
};
.right-bar,
.left-bar {
  .box {
    flex: 1;
    margin-top: 0 !important;
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  .box:nth-child(1){
     flex: 1;
     //height: 30% !important;
  }
  .box:nth-child(2){
    flex: 1;
    height: 55% !important;
  }
  /*
  .box1{
    height: 39%;
  }
  .box2{
    height: 59%;
  }
  */
}
.center{
  .box:nth-child(1){
    flex: 3!important;
  }
  .box:nth-child(2){
    flex: 1;
    height: auto!important;
  }
  .weater-box{
    padding: 0 10px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom:10px;
  }
  .top-box{
      flex: 1;
      .toolBar{
        position: absolute;
        top: 20px;
        right: -30px;
        width: 180px;
        height: 50px;
        z-index: 1;  
    }
  }
  .bottom-box{
      height: 30%;
      display: flex;
      flex-direction: row;
      z-index: 9;
      .chart-warp{
          flex: 1;
          height: 100%;
          background:rgba(3,47,61,0.8);
          &:last-child {
            margin: 0 0 0 12px!important;
          }
          h3{
            padding: 0;
            margin:0;
            height: 26px;
            line-height: 26px;
            font-size: 1.6rem;
            color: #72DBD3;
            font-weight: normal;
            text-indent: 10px;
            margin-bottom:15px;
            margin-top:5px;
        }
      }

  }
  

}
</style>

<style lang="scss" scoped>
  .toolBar .el-button{
    width: 40px;
    background: #102b38;
    border: 1px solid #2d9690;
    color: #FFF;
  }
  .toolBar .el-button.el-button--mini{
    padding: 5px 0px 5px 0px;
  }
  .toolBar .el-button:hover{
    background: #1d4b63;
    border: 1px solid #03837c;
    color: #EEE;
  }
  .toolBar .el-button:focus{
    background: #45b0e6;
    border: 1px solid #03837c;
    color: #EEE;
  }
</style>

<style>
  .attribute{
    z-index: 100000;
  }
</style>

<style  lang="scss" scoped>
    *{margin:0; padding:0;}
    ul,li{list-style: none;}
    #boxlist{ 
      margin-top: 12px;
      width: 100%; 
      height:200px; 
      overflow:hidden; 
      padding-left: 50px;
      padding-right: 50px;
      box-sizing: border-box;
      ul{
        li{
          font-size: 1.6em;
          margin-top: 15px;
          box-sizing:border-box;
          text-align: center;
          color: #eee;
          //border-bottom:1px solid #03837c;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          width:100%;
          cursor: pointer;
        }
        li:hover{
          color: #72dbd3;
        }
      }
    }
    #list1{
      min-height:235px;
    }
    #list2{
      min-height:235px;
    }
/*
  .floatList{
    height: 77%;
    //background-color: rgb(230, 127, 127);
    margin-top:10px;
    overflow: hidden;
    position: relative;
    .list1{
      //background-color: rgb(129, 221, 101);
      position: relative;
      top:-10px;
      p{
        //background-color: rgb(20, 13, 13);
        margin-left:10%;
        //margin-right:40px;
        margin-top:20px;
        box-sizing:border-box;
        text-align: center;
        font-size:1.5em;
        color: #eee;
        //border-bottom:1px solid #03837c;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        width:80%;
        cursor: pointer;
      }
      p:hover{
        color: rgb(36, 160, 118);
      }
    }
    .list2{
      //background-color: rgb(129, 221, 101);
      position: relative;
      top:-10px;
      p{
        //background-color: rgb(20, 13, 13);
        margin-left:10%;
        //margin-right:40px;
        margin-top:20px;
        box-sizing:border-box;
        text-align: center;
        font-size:1.5em;
        color: #eee;
        //border-bottom:1px solid #03837c;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        width:80%;
        cursor: pointer;
      }
      p:hover{
        color: rgb(36, 160, 118);
      }
    }
  }
*/
</style>

<style lang="scss" scoped>
    .ol-popup{
        opacity: 0;
        transition: all 0.2s ease-in;
        &.popupShow{
            opacity: 100;
        }
    }
</style>

<style>

.ol-popup{
    position: absolute;
    background-color: rgba(20, 50, 66, 0.8);
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border:1px solid #2d9690;
    bottom: -12px;
    left: -50px;
}

.ol-popup:after,.ol-popup:before{
    top:100%;
    border:solid transparent;
    content: "";
    height:0;
    width:0;
    position:absolute;
    pointer-events: none;
}

.ol-popup:after{
    border-top-color: rgba(20, 50, 66, 0.8);
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before{
    border-top-color: #2d9690;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer{
    text-decoration: none;
    position: absolute;
    top:2px;
    right:8px;
}

.ol-popup-closer:after{
    content: "X";
    height:30px;
    padding:12px;
    color:#eee
}

.pop-content{
    font-size:16px;
    font-family: "微软雅黑";
    min-width: 270px;
}

.pop-content span{
    margin-top: 10px;
    display: block;
}

.poiText{
  color:#eee;
  font-size:17px;
  line-height:22px;
}

.css_animation{
  height:10px;
  width:10px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.8);
  /*
  transform: scale(1);
  animation: myfirst 3s;
  animation-iteration-count: infinite;
  */
}

.css_animation p{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius:50%;
    animation: KuoSan 3s  infinite;
    box-shadow: 0px 0px 5px rgba(255, 0, 0, 1);
}
.css_animation span{
  position: absolute;
  display:block;
  width: 10px;
  height: 10px;
  border-radius:50%;
  animation: KuoSan 3s  infinite;
  animation-delay: 1.5s;
  box-shadow: 0px 0px 5px rgba(255, 0, 0, 1); 
}

@keyframes KuoSan{
  20% {transform: scale(1.4);}
  40% {transform: scale(1.8);}
  60% {transform: scale(2.2);}
  80% {transform: scale(2.6);}
  100% {transform: scale(3.0);}
}

@keyframes myfirst{
    to{
        transform: scale(1.5);
        background: rgba(255, 0, 0, 0.3);
    }
}
</style>

<style lang="scss" scoped>
    .css_animation{
        opacity: 0;
        transition: all 0.2s ease-in;
        &.DynamicPoiShow{
            opacity: 100;
        }
    }
</style>

<style lang="scss" scoped>
    .rightbarTopZL{
        height:290px;
        box-sizing: border-box;
        //margin-bottom: 18px;
    }
</style>

<style  lang="scss" scoped>
  .centerGyy{
    height:216px;
    .centerGyyBar{
      height:175px;
      margin-top: -10px;
    }
  }
</style>

<style lang="scss" scoped>
  .left-top{
    height:282px;
    margin-bottom: 12px;
    .left-top-content{
      height:95%;
      width:90%;
      margin-left:20px;
      margin-top:10px;
    }
  }
  .left-top-double{
    height:282px;
  } 
  .left-top1{
    height:282px;
    margin-bottom: 12px;
    .left-top1-content{
      height:95%;
      width:90%;
      margin-left:20px;
      margin-top:0px;
    }
  }

  .left-bottom{
    height:335px;
    //margin-top:8px;
    .leftBtn{
      margin-top: 2px;
      margin-left: 70px;
      .el-button{
          width: 45px;
          height:26px;
          font-size: 14px;
          background: #153849;
          border: 1px solid #056d68;
          color: #EEE;
      }
      .el-button:hover{
          background: #1d4b63;
          border: 1px solid #03837c;
          color: #EEE;
      }
      .el-button:focus{
        background: #45b0e6;
        border: 1px solid #03837c;
        color: #EEE;
      }
      .el-button.el-button--mini{
          padding: 5px 0px 5px 0px;
      }
      .leftBtnR{
        margin-left: 76px;
      }

    }

    .left-bottom-content{
      height:95%;
      width:90%;
      margin-left:20px;
      margin-top:10px;
    }
  }

</style>

<style lang="scss" scoped>
  .NYYDropdown /deep/ .el-button-group > .el-button:first-child{
    width: 40px;
    height:26px;
    font-size: 14px;
    background: #153849;
    border: 1px solid #056d68;
    color: #EEE;
    text-align:center;
    padding: 0px 0px;
    box-sizing: border-box;

  }
  .NYYDropdown /deep/ .el-button-group>.el-button:last-child{
    width: 20px;
    height:26px;
    font-size: 14px;
    background: #153849;
    border: 1px solid #056d68;
    color: #EEE;
    text-align:center;
    padding: 0px 0px;
    box-sizing: border-box;

  }

</style>

<style>
  .el-dropdown-menu.el-popper{
    font-size: 14px;
    background: #153849;
    border: 1px solid #056d68;
    
  }
  .el-dropdown-menu.el-popper .el-dropdown-menu__item{
    color: #EEE;
  }
  .el-dropdown-menu.el-popper .el-dropdown-menu__item:hover{
    color: #EEE;
    background-color: #056d68;
  }

</style>
