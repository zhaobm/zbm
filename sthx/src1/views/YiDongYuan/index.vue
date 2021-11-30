<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <!--
      <NewBox1 title='飞机与铁路' class="left-top1">
          <div slot="content" class='left-top1-content'>
            <PieLeftTop :data="pieDataChuYouandYunShu"/>
          </div>
      </NewBox1>

      <Box title='机动车数量(6626092辆)'>
        <PieLeftBottom :data="pieDataLeftBottom"/>
      </Box>
      -->
        <Box title='机动车数量(辆)' class="left-center-content">
          <PieLeftBottom :data="pieDataLeftBottom"/>
        </Box>
<!--        <NewBox1 title="工程/农业机械保有情况" class="left-center">
            <div slot="content" class="weater-box">
              <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" :url="item.url" v-for="item in weathers" :key="item.id" />
            </div>
        </NewBox1>-->

      <NewBox1 title="飞机起落/农业机械情况" class="left-center">
        <div slot="content" class="weater-box">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" :url="item.url" v-for="item in weathers" :key="item.id" />
        </div>
      </NewBox1>


<!--        <NewBox1 title="飞机起落架次/铁路" class="left-center">
          <div slot="content" class="weater-box">
            <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" :url="item.url" v-for="item in weathers1" :key="item.id"/>
          </div>
        </NewBox1>-->
      <NewBox1 title='民航飞机/农业机械污染物排放量(吨)' class="left-center" style="margin-bottom: 0px">
        <div class="leftBtn" slot="header">
          <el-button-group >
            <el-button size="mini" @click.native="LeftBtnMHFJ">民航飞机</el-button>
            <el-button size="mini" @click.native="LeftBtnNYJX">农业机械</el-button>

          </el-button-group>
        </div>
        <div slot="content" class='left-center-content'>
          <PieLeftCenter :data="pieDataLeftCenter"/>
        </div>
      </NewBox1>
<!--      <Box title='机动车数量(辆)'>
        <PieLeftBottom :data="pieDataLeftBottom"/>
      </Box>-->

      <!--
      <Box title='加油站'>
        <PieLeftCenter :data="pieDataLeftCenter"/>
      </Box>
      -->

    </div>
    <div class="center">
      <Box>
          <div class="top-box">
            <mapBox />
            <!--陕北关中陕南-->
            <div class='toolBar'>
<!--              <el-button-group>
                <el-button size="mini" round @click="shanbei()">陕北</el-button>
                <el-button size="mini" round @click="guanzhong()">关中</el-button>
                <el-button size="mini" round @click="shannan()">陕南</el-button>
              </el-button-group>-->
            </div>
            <div class='toolBarPicture'>
                  <!--
                  <el-button size="mini" @click="OpenPicture()">地图</el-button>
                  -->
            </div>
            <!--显示地市还是企业-->
            <!--
            <div class='toolBarRadio'>
              <el-radio-group v-model="radio"  @change="SelectQueryModel()">
                <el-radio :label="1" >地市</el-radio>
                <el-radio :label="2" >企业</el-radio>
              </el-radio-group>
            </div>
            -->
            <!--显示地图或影像-->
              <div class='toolBarRadioDiTu'>
                <el-radio-group v-model="radioDiTu"  @change="SelectDiTu()">
                  <el-radio :label="1" >地图</el-radio>
                  <el-radio :label="2" >影像</el-radio>
                </el-radio-group>
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
        <NewBox title='移动源基本情况' class='centerGyy'>
            <BarCenter :data="barCenterData" slot="contentGYY" class='centerGyyBar'/>
        </NewBox>
    </div>
    <div class="right-bar">

      <NewBox1 title='移动废气污染物排放量(万吨)' class="left-top">
          <div slot="content" class='left-top-content'>
            <BarRightCenter :data="barDataFeiQi"/>

          </div>
      </NewBox1>
      <NewBox1 title='机动车污染物排放量(吨)' class="left-bottom">
          <div class="leftBtn" slot="header">
            <el-button-group class="leftBtnR">
              <el-button size="mini" @click.native="LeftBtnZK">载客</el-button>
              <el-button size="mini" @click.native="LeftBtnZH">载货</el-button>
              <el-button size="mini" @click.native="LeftBtnDS">低速</el-button>
            </el-button-group>
          </div>
          <div slot="content" class='left-bottom-content' v-show='isShowZaiKe'>
            <BarRightBottomydy :data="barDataRightBottomZK"/>
          </div>
           <div slot="content" class='left-bottom-content' v-show='isShowZaiHuo'>
            <BarRightBottomydy1 :data="barDataRightBottomZH"/>
          </div>
           <div slot="content" class='left-bottom-content' v-show='isShowDiSu'>
            <BarRightBottomydy2 :data="barDataRightBottomDS"/>
          </div>


      </NewBox1>
      <Box title="非道路污染源污染物排放量(吨)" >
        <BarRightBottomNew :data="barDataRightBottomFDL"/>
        <!--
        <LineChart  :data="lineData2"/>
        -->
      </Box>


    </div>
    <div></div>
    <ImageDiv class="attribute" v-show="isShowAImage" @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures" :selectFeature="selectFeature"  ></ImageDiv>

  </div>
</template>
<script>
import LineChart from "../../components/charts/line/line1";
import Bar4 from "../../components/charts/bar/bar4";
import BarLeftCenterydy from "../../components/charts/bar/YiDongYuan/barYDY";
import BarLeftBottomydy from "../../components/charts/bar/YiDongYuan/barYDY1";
import BarRightBottomydy from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY1";
import BarRightBottomydy1 from "../../components/charts/bar/YiDongYuan/barDuiDieVYDYnew1";
import BarRightBottomydy2 from "../../components/charts/bar/YiDongYuan/barDuiDieVYDYnew2";

import BarRightTopydy from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY2";

import BarRightBottomNew from "../../components/charts/bar/YiDongYuan/barDuiDieYDYRightBottom";

import PieLeftTop from "../../components/charts/pie/YiDongYuan/pieYDY2";
import PieLeftBottomNew from "../../components/charts/pie/YiDongYuan/pieYDY3";
import PieLeftBottom from '../../components/charts/pie/YiDongYuan/PieYDY';
// import PieLeftCenter from '../../components/charts/pie/YiDongYuan/PieYDY1';
// import PieLeftCenter from '../../components/charts/pie/JiZhongShi/pieJZS2';
import PieLeftCenter from '../../components/charts/pie/YiDongYuan/PieYDYlee';
//import Bar1 from "../../components/charts/bar/barDuiDie";
//import Bar1 from "../../components/charts/bar/barDuiDieV";
import Bar1 from "../../components/charts/bar/barDuiDieVGYY";
import BarCenter from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY3";
import BarLeftTop from "../../components/charts/bar/YiDongYuan/barDuiDieVYDY";

import BarRightCenter from "../../components/charts/bar/YiDongYuan/barYDY2";
import Bar1New from "../../components/charts/bar/bar1new";
import Bar2New from "../../components/charts/bar/bar2new";
import Bar5 from "../../components/charts/bar/barDuiDieV";
import PieChart3 from '../../components/charts/pie/pie3';
import PieChart4 from '../../components/charts/pie/pie4';
import PieChart5 from '../../components/charts/pie/pie5';
import WeaterItem from "../../components/common/weather/index3.vue";
import mapBox from "../../components/map/index.vue";
import Box from "../../components/common/box";
import NewBox from "../../components/common/newBox";
import NewBoxRight from "../../components/common/newBox/index2.vue";
import ol from 'openlayers';
import * as api from "../../assets/js/api/search.js";
import ImageDiv from "../../components/common/imageDiv";
import NewBox1 from "../../components/common/newBox/index1.vue";
//散点图
//引入Echart
let echarts = require("echarts/lib/echarts");
import ADLayer from "../../lib/openlayers/openlayers.echart.js";
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");


export default {
  data() {
    return {
      //地市和企业
      radio: 1,
      radioDiTu:1,
      isDiShi:true,
      isQiYe:false,

      isShowZaiKe :true,
      isShowZaiHuo :false,
      isShowDiSu :false,

/*      barDataRightBottomZK: {
        xAxis: ["氮氧化物",  "颗粒物",  "挥发性有机物"],
        WXKCData:["0.02","0","0.06" ],
        XXKCData:["0.72",  "0.003","3.39" ],
        ZXKCData:["0.11",   "0.002", "0.02"],
        DXKCData:["2.48",  "0.01",  "0.13"],
      },*/
      //lee 延安市载客（吨）
      barDataRightBottomZK: {
        xAxis: ["氮氧化物",  "颗粒物",  "挥发性有机物"],
        WXKCData:["5.79","0","24.84" ],
        XXKCData:["452.36",  "7.04","2044.7" ],
        ZXKCData:["61.9",   "0.88", "5.38"],
        DXKCData:["1830.07",  "10.21",  "77.78"],
      },
//lee 延安市载货（吨）
      barDataRightBottomZH: {
        xAxis: ["氮氧化物",  "颗粒物",  "挥发性有机物"],
        WXHCData:["0.14","0","0.42" ],
        QXHCData:[  "603.08",  "55.34","312.41" ],
        ZXHCData:["219.32",   "4.32", "13.03"],
        DXHCData:["3020.84",  "29.86",  "96.01"],
      },
//lee 延安市低速（吨）
      barDataRightBottomDS: {
        xAxis: ["氮氧化物",  "颗粒物",  "挥发性有机物"],
        SLQCData:["161.55","9.77","50.69" ],
        DSHCData:[  "20.55",  "1.28","6.5" ],
        //MTCData:["785.62",   "0", "2889.55"],
        PTTCData:["11.01",  "0",  "30.12"],
        QBMTCData:["0.03",  "0",  "0.33"],
      },



      //重点排污单位点击事件
      isPopupShow:false,
      isDynamicPoiShow:false,
      Popup:{},
      DynamicPOI:{},
      poiName:"",
      poiAddress:"",
      poiVectorLayer:null,
      poiVectorSource:null,

      GongChengHeNongJi:22222,
      FeiJiHeTieLu:22222,

      //浮动DIV
      isShowAImage:false,
      floatDivTitleImageurl:"",
      isShowAttribute:false,
      floatDivTitle:"统计表",
      AttrFeatures:{
        featureArr: {},
        totalCount:0,
      },
      selectFeature : {},

      weathers:[
        {
          name:'飞机起落架次',
          value:'1359',
          unite:'次'
        },
        {
          name:'农业机械柴油总动力',
          value:'119.7001',
          unite:'万千瓦'
        },

      ],

      weathers1:[
        {
          name:'飞机起落架次',
          value:'370643',
          unite:'次'
        },
        {
          name:'铁路燃油消耗量',
          value:'50490',
          unite:'吨'
        },

      ],

      //lee 延安，缺少铁路数据TLData，删去了
      barDataRightBottomFDL:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],

        GCJXData:["1501.89",    "64.32",    "160.97"],
        NYJXData:["3745.89",      "165.24",     "443.50" ],
        MHFJData:["15.00",     "0.50",      "1.12"  ],
        TLData:["0.27",     "0.01",      "0.01"],
      },











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
          { value: 15.00, name: "氮氧化物排放量" },
          { value: 0.50, name: "颗粒物排放量" },
          { value: 1.12, name: "挥发性有机物排放量" },
        ]
      },
      pieDataLeftFeiJi:{
        dataArr: [
          { value: 15.00, name: "氮氧化物排放量" },
          { value: 0.50, name: "颗粒物排放量" },
          { value: 1.12, name: "挥发性有机物排放量" },
        ]
      },
      pieDataLeftNongYe:{
        dataArr: [
          { value: 3745.89, name: "氮氧化物排放量" },
          { value: 165.24, name: "颗粒物排放量" },
          { value: 443.50, name: "挥发性有机物排放量" },
        ]
      },







      barDataRightBottom:{
        xAxis: ["氮氧化物",  "颗粒物",  "挥发性有机物"],
        WXKCData:["222.79","0","601.16" ],
        XXKCData:[  "7216.73",  "29.07","33910.92" ],
        ZXKCData:["1124.65",   "15.47", "166.03"],
        DXKCData:["24860.91",  "111.68",  "1323.34"],
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


      //左1，储油库数与油品运输企业数的占比
      pieDataChuYouandYunShu:{
        dataArr: [
          { value: 48, name: "储油库数" },
          { value: 115, name: "油品运输企业数" },
        ]
      },
      pieDataQuanShengChuYouandYunShu:{
        dataArr: [
          { value: 48, name: "储油库数" },
          { value: 115, name: "油品运输企业数" },
        ]
      },
      //各地市储油库数与油品运输企业数的对比
      pieDataXiAnChuYouandYunShu:{
        dataArr: [
          { value: 6, name: "储油库数" },
          { value: 15, name: "油品运输企业数" },
        ]
      },
      pieDataBaoJiChuYouandYunShu:{
        dataArr: [
          { value: 6, name: "储油库数" },
          { value: 4, name: "油品运输企业数" },
        ]
      },
      pieDataXianYangChuYouandYunShu:{
        dataArr: [
          { value: 3, name: "储油库数" },
          { value: 8, name: "油品运输企业数" },
        ]
      },
      pieDataTongChuanChuYouandYunShu:{
        dataArr: [
          { value: 2, name: "储油库数" },
          { value: 10, name: "油品运输企业数" },
        ]
      },
      pieDataWeiNanChuYouandYunShu:{
        dataArr: [
          { value: 1, name: "储油库数" },
          { value: 13, name: "油品运输企业数" },
        ]
      },
      pieDataYangLingChuYouandYunShu:{
        dataArr: [
          { value: 0, name: "储油库数" },
          { value: 0, name: "油品运输企业数" },
        ]
      },
      pieDataXiXianChuYouandYunShu:{
        dataArr: [
          { value: 6, name: "储油库数" },
          { value: 16, name: "油品运输企业数" },
        ]
      },
      pieDataYanAnChuYouandYunShu:{
        dataArr: [
          { value: 12, name: "储油库数" },
          { value: 19, name: "油品运输企业数" },
        ]
      },
      pieDataYuLinChuYouandYunShu:{
        dataArr: [
          { value: 4, name: "储油库数" },
          { value: 22, name: "油品运输企业数" },
        ]
      },
      pieDataHanZhongChuYouandYunShu:{
        dataArr: [
          { value: 5, name: "储油库数" },
          { value: 3, name: "油品运输企业数" },
        ]
      },
      pieDataAnKangChuYouandYunShu:{
        dataArr: [
          { value: 2, name: "储油库数" },
          { value: 0, name: "油品运输企业数" },
        ]
      },
      pieDataShangLuoChuYouandYunShu:{
        dataArr: [
          { value: 1, name: "储油库数" },
          { value: 4, name: "油品运输企业数" },
        ]
      },
      pieDataHanChengChuYouandYunShu:{
        dataArr: [
          { value: 0, name: "储油库数" },
          { value: 1, name: "油品运输企业数" },
        ]
      },

      //
      //左3 全延安市
      pieDataLeftBottom:{
        dataArr: [
          { value: 255677, name: "载客汽车" },
          { value: 34166, name: "载货汽车" },
          { value: 3317, name: "低速汽车" },
          { value: 16672, name: "摩托车" },
        ]
/*        dataArr: [
          { value: 4904137, name: "载客汽车" },
          { value: 519856, name: "载货汽车" },
          { value: 103816, name: "低速汽车" },
          { value: 1098283, name: "摩托车" },
        ]*/
      },
      pieDataQuanShengQC:{
        dataArr: [
          { value: 4904137, name: "载客汽车" },
          { value: 519856, name: "载货汽车" },
          { value: 103816, name: "低速汽车" },
          { value: 1098283, name: "摩托车" },
        ]
      },

      //各地市汽车种类
      pieDataXiAnQC:{
        dataArr: [
          { value: 2481660, name: "载客汽车" },
          { value: 212915, name: "载货汽车" },
          { value: 13549, name: "低速汽车" },
          { value: 122476, name: "摩托车" },
        ]
      },
      pieDataBaoJiQC:{
        dataArr: [
          { value: 278938, name: "载客汽车" },
          { value: 25712, name: "载货汽车" },
          { value: 3506, name: "低速汽车" },
          { value: 82703, name: "摩托车" },
        ]
      },
      pieDataXianYangQC:{
        dataArr: [
          { value: 365727, name: "载客汽车" },
          { value: 29697, name: "载货汽车" },
          { value: 3291, name: "低速汽车" },
          { value: 39062, name: "摩托车" },
        ]
      },
      pieDataTongChuanQC:{
        dataArr: [
          { value: 72084, name: "载客汽车" },
          { value: 8001, name: "载货汽车" },
          { value: 2444, name: "低速汽车" },
          { value: 28947, name: "摩托车" },
        ]
      },
      pieDataWeiNanQC:{
        dataArr: [
          { value: 437611, name: "载客汽车" },
          { value: 47571, name: "载货汽车" },
          { value: 41188, name: "低速汽车" },
          { value: 96006, name: "摩托车" },
        ]
      },
      pieDataYangLingQC:{
        dataArr: [
          { value: 58205, name: "载客汽车" },
          { value: 3402, name: "载货汽车" },
          { value: 16, name: "低速汽车" },
          { value: 1537, name: "摩托车" },
        ]
      },
      pieDataXiXianQC:{
        dataArr: [
          { value: 0, name: "载客汽车" },
          { value: 0, name: "载货汽车" },
          { value: 0, name: "低速汽车" },
          { value: 0, name: "摩托车" },
        ]
      },
      pieDataHanChengQC:{
        dataArr: [
          { value: 0, name: "载客汽车" },
          { value: 0, name: "载货汽车" },
          { value: 0, name: "低速汽车" },
          { value: 0, name: "摩托车" },
        ]
      },
      pieDataYanAnQC:{
        dataArr: [
          { value: 255677, name: "载客汽车" },
          { value: 34166, name: "载货汽车" },
          { value: 3317, name: "低速汽车" },
          { value: 16672, name: "摩托车" },
        ]
      },
      pieDataYuLinQC:{
        dataArr: [
          { value: 520929, name: "载客汽车" },
          { value: 103662, name: "载货汽车" },
          { value: 18179, name: "低速汽车" },
          { value: 38902, name: "摩托车" },
        ]
      },
      pieDataHanZhongQC:{
        dataArr: [
          { value: 232705, name: "载客汽车" },
          { value: 24812, name: "载货汽车" },
          { value: 5979, name: "低速汽车" },
          { value: 301683, name: "摩托车" },
        ]
      },
      pieDataAnKangQC:{
        dataArr: [
          { value: 125868, name: "载客汽车" },
          { value: 21871, name: "载货汽车" },
          { value: 6005, name: "低速汽车" },
          { value: 319258, name: "摩托车" },
        ]
      },
      pieDataShangLuoQC:{
        dataArr: [
          { value: 74733, name: "载客汽车" },
          { value: 8047, name: "载货汽车" },
          { value: 6342, name: "低速汽车" },
          { value: 51037, name: "摩托车" },
        ]
      },

      //右1，油品储运销环节挥发性有机物排放量
      barDataHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 49905.89,	3035.81,	532.11],
      },




      barDataQuanShengHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 49905.89,	3035.81,	532.11],
      },
      //各地市的vocs排放量（吨），柱状图
      barDataXiAnHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 1475.87,	847.51,	343.67],
      },
      barDataBaoJiHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 242.25,	228.9,	22.76],
      },
      barDataXianYangHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 6457.81,	328.63,	3.3],
      },
      barDataTongChuanHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 14.53,	87.49,	72.11],
      },
      barDataWeiNanHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 93.01,	324.31,	8.72],
      },
      barDataYangLingHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 0,	23.19,	0],
      },
      barDataXiXianHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 7958.01,	200.47,	32.94],
      },
      barDataYanAnHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 33072.24,	254.19,	25.62],
      },
      barDataYuLinHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 63.79,	293.54,	20.22],
      },
      barDataHanZhongHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 317.27,	166.16,	0.62],
      },
      barDataAnKangHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 206.24,	175.08,	0],
      },
      barDataShangLuoHuiFaLiang:{
        xAxis: ["储油库","加油站","油品运输企业"],
        yAxis: [ 4.87,	106.34,	2.15],
      },

      //右2，全省排放量
/*      barDataFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [25.86,0.67,7.81],
      },*/
/*      //lee 延安排放量（万吨）
      barDataFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [1.16,0.035,0.64],
      },*/
      //lee 延安排放量（万吨）
      barDataFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [1.16,0.035,0.64],
      },



  barDataQuanShengFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [25.86,0.67,7.81],
      },
      //各地市的vocs排放量（吨），柱状图
      barDataXiAnFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 7.39,0.19,2.80],
      },
      barDataBaoJiFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 2.08,0.062,0.47],
      },
      barDataXianYangFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 2.95,0.071,1.18],
      },
      barDataTongChuanFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.48,0.011,0.11],
      },
      barDataWeiNanFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 3.06,0.099,0.69],
      },
      barDataYangLingFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.12,0.0031,0.051],
      },
      barDataYanAnFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [1.16,0.035,0.64],
      },
      barDataYuLinFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [5.88,0.075,0.89],
      },
      barDataHanZhongFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 1.08,0.044,0.40],
      },
      barDataAnKangFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [0.74,0.041,0.29],
      },
      barDataShangLuoFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [0.36,0.014,0.12],
      },
 barDataHanChengFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [0.020,0.00086,0.0072],
      },
  barDataXiXianFeiQi:{
        xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [0.26,0.011,0.13],
      },

/*      //移动源中
      barCenterData:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市",],
        YPYSQYData:["15",   "10",   "4",   "8"  ,   "13",  "19",   "3",    "22"  ,    "0",    "4" ,    "16",      "0",       "1",    ],
        JDCData:["2830600","112580","390859","437777","622376","309832","565179","681672","473002","140159","0","63160","0"],
      },*/
      //lee 延安移动源中，油气挥发性有机物排放量（吨）
      barCenterData:{
        xAxis: ["宝塔区","安塞区","延长县","延川县","子长市","志丹县","吴起县","甘泉县","富县","洛川县","宜川县","黄龙县","黄陵县"],
        YPYSQYData:["1",   "0",   "0",   "11"  ,   "0",   "0",  "1",   "1",    "0"  ,    "2",    "0" ,    "0",    "3"        ],
        JDCData:[0,0,0,0,0,0,0,0,0,0,0,0,0]
        // JDCData:["0.09",   "0",   "0",   "7.4263","0", "0.068", "0.9532",    "0",    "4.12",   "0","0","12.9604","0"],
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
      //陕北，关中，陕南
      geoCoordMapNew:{
        yulin:[109.815,38.226],
        yanan:[109.428,36.256],
        weinan:[109.817,34.911],
        tongchaun:[108.973,35.178],
        xianyang:[108.389,34.753],
        baoji:[107.337,34.317],
        xixian:[108.78576, 34.37971],
        yanglin:[108.00908, 34.35034],
        hancheng:[110.32350, 35.55681],
        xian:[108.664,34.061],
        shangluo:[109.978,33.746],
        ankang:[108.955,32.616],
        hanzhong:[107.052,33.198],
      },
      sxxjbjProLayer:null,
      xjsource:null,
      xjfeatures:null,
      ydyEntlWMTSLayer:null,
      //午夜蓝图
      wuyelantu:null,
      //天地图
      tdtImage:null,
      tdtImageAnno:null,
/*      pieDataLeftCenter:{
        dataArr: [
          { value: 553, name: "榆林市" },
          { value: 493, name: "西安市" },
          { value: 472, name: "渭南市" },
          { value: 327, name: "咸阳市" },
          { value: 293, name: "宝鸡市" },
          { value: 256, name: "汉中市" },
          { value: 250, name: "延安市" },
          { value: 174, name: "安康市" },
          { value: 151, name: "商洛市" },
          { value: 110, name: "西咸新区" },
          { value: 101, name: "铜川市" },
          { value: 45, name: "韩城市" },
          { value: 7, name: "杨凌示范区" },
        ]
      },*/
    };
  },
  methods: {
    SelectDiTu(){
      if(this.radioDiTu == 1){

        var layersArray = this.map.getLayers();
        layersArray.insertAt(1,this.wuyelantu);

        this.map.removeLayer(this.tdtImage);
        this.map.removeLayer(this.tdtImageAnno);
      }
      else{
        var layersArray = this.map.getLayers();
        layersArray.insertAt(1,this.tdtImage);
        layersArray.insertAt(2,this.tdtImageAnno);
        this.map.removeLayer(this.wuyelantu);
      }
    },
    SelectQueryModel(){
      console.log(this.radio);
      if(this.radio == 1){
        this.resetPoiInfo();
        this.isDiShi = true;
        this.isQiYe = false;
        this.map.removeLayer(this.ydyEntlWMTSLayer);
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);
      }
      else{
        this.isDiShi = false;
        this.isQiYe = true;
        if(this.sjOverlayVectorSource){
          this.sjOverlayVectorSource.clear();
        }
        this.map.addLayer(this.ydyEntlWMTSLayer);
        this.changeToQuanSheng();
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);
      }
    },
    loadGeoWMTSLayer(){
      var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];      var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
      var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
      var tilegrid = new ol.tilegrid.WMTS({
            tileSize: [256,256],
            extent: [-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7],
            origin: [-2.003750834E7, 2.003750834E7],
            resolutions: resolutions,
            matrixIds: gridNames
        });
      var projection = new ol.proj.Projection({
        code: 'EPSG:900913',
        units: 'm',
        axisOrientation: 'neu'
      });
      var layerName = 'hkywry:ydypro';
      var gridsetName = 'EPSG:900913';
      var tileSource = new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: layerName,
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
      });
      this.ydyEntlWMTSLayer = new ol.layer.Tile({
        source: tileSource,
      });
      //this.map.addLayer(this.ydyEntlWMTSLayer);
    },
    OpenPicture(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/移动.jpg";
    },
    LeftBtnFJ(){
      this.FeiJiHeTieLu = 333
    },
    LeftBtnTL(){
      this.FeiJiHeTieLu = 444
    },
    LeftBtnGC(){
      this.GongChengHeNongJi =333
    },
    LeftBtnNY(){
      this.GongChengHeNongJi =444
    },
    LeftBtnMHFJ(){
      this.pieDataLeftCenter = this.pieDataLeftFeiJi;
    },
    LeftBtnNYJX(){
      this.pieDataLeftCenter = this.pieDataLeftNongYe;
    },
    //刷新map尺寸
    refreshMapSize(){
      window.onresize = function()
      {
        setTimeout( function() { map.updateSize();}, 200);
      }

      console.log('here');
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
                  dataProjection : 'EPSG:4326',
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
      var hancheng = ol.proj.transform(this.geoCoordMapNew.hancheng,'EPSG:4326', 'EPSG:3857' );
      var coordinates = [weinan,tongchaun,xianyang,baoji,xian,hancheng];
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
        this.pieDataChuYouandYunShu = {
          dataArr: [
            { value: (parseFloat(this.pieDataYuLinChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataYanAnChuYouandYunShu.dataArr[0].value)).toFixed(2), name: "储油库数" },
            { value: (parseFloat(this.pieDataYuLinChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataYanAnChuYouandYunShu.dataArr[1].value)).toFixed(2), name: "油品运输企业数" },
          ]
        };

        this.pieDataLeftBottom = {
          dataArr: [
            { value: (parseFloat(this.pieDataYuLinQC.dataArr[0].value) + parseFloat(this.pieDataYanAnQC.dataArr[0].value)).toFixed(2), name: "载客汽车" },
            { value: (parseFloat(this.pieDataYuLinQC.dataArr[1].value) + parseFloat(this.pieDataYanAnQC.dataArr[1].value)).toFixed(2), name: "载货汽车" },
            { value: (parseFloat(this.pieDataYuLinQC.dataArr[2].value) + parseFloat(this.pieDataYanAnQC.dataArr[2].value)).toFixed(2), name: "低速汽车" },
            { value: (parseFloat(this.pieDataYuLinQC.dataArr[3].value) + parseFloat(this.pieDataYanAnQC.dataArr[3].value)).toFixed(2), name: "摩托车" },
          ]
        };

        this.barDataHuiFaLiang= {
          xAxis: ["储油库","加油站","油品运输企业"],
          yAxis: [  (parseFloat(this.barDataYuLinHuiFaLiang.yAxis[0]) +parseFloat(this.barDataYanAnHuiFaLiang.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataYuLinHuiFaLiang.yAxis[1]) +parseFloat(this.barDataYanAnHuiFaLiang.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataYuLinHuiFaLiang.yAxis[2]) +parseFloat(this.barDataYanAnHuiFaLiang.yAxis[2])).toFixed(2),
          	    ],
        };

        this.barDataFeiQi= {
          xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
          yAxis: [  (parseFloat(this.barDataYuLinFeiQi.yAxis[0]) +parseFloat(this.barDataYanAnFeiQi.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataYuLinFeiQi.yAxis[1]) +parseFloat(this.barDataYanAnFeiQi.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataYuLinFeiQi.yAxis[2]) +parseFloat(this.barDataYanAnFeiQi.yAxis[2])).toFixed(2),
          	    ],
        };

      }
      else if(quyu == "guanzhong"){
        this.pieDataChuYouandYunShu = {
          dataArr: [
            { value: (parseFloat(this.pieDataWeiNanChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataTongChuanChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataXianYangChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataBaoJiChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataXiAnChuYouandYunShu.dataArr[0].value)).toFixed(2), name: "储油库数" },
            { value: (parseFloat(this.pieDataWeiNanChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataTongChuanChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataXianYangChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataBaoJiChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataXiAnChuYouandYunShu.dataArr[1].value)).toFixed(2), name: "油品运输企业数" },
          ]
        };

        this.pieDataLeftBottom = {
          dataArr: [
            { value: (parseFloat(this.pieDataYangLingQC.dataArr[0].value)+parseFloat(this.pieDataWeiNanQC.dataArr[0].value) + parseFloat(this.pieDataTongChuanQC.dataArr[0].value) + parseFloat(this.pieDataXianYangQC.dataArr[0].value) + parseFloat(this.pieDataBaoJiQC.dataArr[0].value) + parseFloat(this.pieDataXiAnQC.dataArr[0].value)).toFixed(2), name: "载客汽车" },
            { value: (parseFloat(this.pieDataYangLingQC.dataArr[1].value)+parseFloat(this.pieDataWeiNanQC.dataArr[1].value) + parseFloat(this.pieDataTongChuanQC.dataArr[1].value) + parseFloat(this.pieDataXianYangQC.dataArr[1].value) + parseFloat(this.pieDataBaoJiQC.dataArr[1].value) + parseFloat(this.pieDataXiAnQC.dataArr[1].value)).toFixed(2), name: "载货汽车" },
            { value: (parseFloat(this.pieDataYangLingQC.dataArr[2].value)+parseFloat(this.pieDataWeiNanQC.dataArr[2].value) + parseFloat(this.pieDataTongChuanQC.dataArr[2].value) + parseFloat(this.pieDataXianYangQC.dataArr[2].value) + parseFloat(this.pieDataBaoJiQC.dataArr[2].value) + parseFloat(this.pieDataXiAnQC.dataArr[2].value)).toFixed(2), name: "低速汽车" },
            { value: (parseFloat(this.pieDataYangLingQC.dataArr[3].value)+parseFloat(this.pieDataWeiNanQC.dataArr[3].value) + parseFloat(this.pieDataTongChuanQC.dataArr[3].value) + parseFloat(this.pieDataXianYangQC.dataArr[3].value) + parseFloat(this.pieDataBaoJiQC.dataArr[3].value) + parseFloat(this.pieDataXiAnQC.dataArr[3].value)).toFixed(2), name: "摩托车" },
          ]
        };

        this.barDataHuiFaLiang= {
          xAxis: ["储油库","加油站","油品运输企业"],
          yAxis: [
                    (parseFloat(this.barDataWeiNanHuiFaLiang.yAxis[0]) +parseFloat(this.barDataTongChuanHuiFaLiang.yAxis[0])+parseFloat(this.barDataXianYangHuiFaLiang.yAxis[0])+parseFloat(this.barDataBaoJiHuiFaLiang.yAxis[0])+parseFloat(this.barDataXiAnHuiFaLiang.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataWeiNanHuiFaLiang.yAxis[1]) +parseFloat(this.barDataTongChuanHuiFaLiang.yAxis[1])+parseFloat(this.barDataXianYangHuiFaLiang.yAxis[1])+parseFloat(this.barDataBaoJiHuiFaLiang.yAxis[1])+parseFloat(this.barDataXiAnHuiFaLiang.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataWeiNanHuiFaLiang.yAxis[2]) +parseFloat(this.barDataTongChuanHuiFaLiang.yAxis[2])+parseFloat(this.barDataXianYangHuiFaLiang.yAxis[2])+parseFloat(this.barDataBaoJiHuiFaLiang.yAxis[2])+parseFloat(this.barDataXiAnHuiFaLiang.yAxis[2])).toFixed(2),
          	    ],
        };

        this.barDataFeiQi= {
          xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
          yAxis: [
                    (parseFloat(this.barDataHanChengFeiQi.yAxis[0])+parseFloat(this.barDataXiXianFeiQi.yAxis[0])+parseFloat(this.barDataYangLingFeiQi.yAxis[0])+parseFloat(this.barDataWeiNanFeiQi.yAxis[0]) +parseFloat(this.barDataTongChuanFeiQi.yAxis[0])+parseFloat(this.barDataXianYangFeiQi.yAxis[0])+parseFloat(this.barDataBaoJiFeiQi.yAxis[0])+parseFloat(this.barDataXiAnFeiQi.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataHanChengFeiQi.yAxis[0])+parseFloat(this.barDataXiXianFeiQi.yAxis[1])+parseFloat(this.barDataYangLingFeiQi.yAxis[1])+parseFloat(this.barDataWeiNanFeiQi.yAxis[1]) +parseFloat(this.barDataTongChuanFeiQi.yAxis[1])+parseFloat(this.barDataXianYangFeiQi.yAxis[1])+parseFloat(this.barDataBaoJiFeiQi.yAxis[1])+parseFloat(this.barDataXiAnFeiQi.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataHanChengFeiQi.yAxis[0])+parseFloat(this.barDataXiXianFeiQi.yAxis[2])+parseFloat(this.barDataYangLingFeiQi.yAxis[2])+parseFloat(this.barDataWeiNanFeiQi.yAxis[2]) +parseFloat(this.barDataTongChuanFeiQi.yAxis[2])+parseFloat(this.barDataXianYangFeiQi.yAxis[2])+parseFloat(this.barDataBaoJiFeiQi.yAxis[2])+parseFloat(this.barDataXiAnFeiQi.yAxis[2])).toFixed(2),
          	    ],
        };
      }
      else if(quyu == "shannan"){
        this.pieDataChuYouandYunShu = {
          dataArr: [
            { value: (parseFloat(this.pieDataHanZhongChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataAnKangChuYouandYunShu.dataArr[0].value) + parseFloat(this.pieDataShangLuoChuYouandYunShu.dataArr[0].value)).toFixed(2), name: "储油库数" },
            { value: (parseFloat(this.pieDataHanZhongChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataAnKangChuYouandYunShu.dataArr[1].value) + parseFloat(this.pieDataShangLuoChuYouandYunShu.dataArr[1].value)).toFixed(2), name: "油品运输企业数" },
          ]
        };

        this.pieDataLeftBottom = {
          dataArr: [
            { value: (parseFloat(this.pieDataHanZhongQC.dataArr[0].value) + parseFloat(this.pieDataAnKangQC.dataArr[0].value) + parseFloat(this.pieDataShangLuoQC.dataArr[0].value)).toFixed(2), name: "载客汽车" },
            { value: (parseFloat(this.pieDataHanZhongQC.dataArr[1].value) + parseFloat(this.pieDataAnKangQC.dataArr[1].value) + parseFloat(this.pieDataShangLuoQC.dataArr[1].value)).toFixed(2), name: "载货汽车" },
            { value: (parseFloat(this.pieDataHanZhongQC.dataArr[2].value) + parseFloat(this.pieDataAnKangQC.dataArr[2].value) + parseFloat(this.pieDataShangLuoQC.dataArr[2].value)).toFixed(2), name: "低速汽车" },
            { value: (parseFloat(this.pieDataHanZhongQC.dataArr[3].value) + parseFloat(this.pieDataAnKangQC.dataArr[3].value) + parseFloat(this.pieDataShangLuoQC.dataArr[3].value)).toFixed(2), name: "摩托车" },
          ]
        };

        this.barDataHuiFaLiang= {
          xAxis: ["储油库","加油站","油品运输企业"],
          yAxis: [
                    (parseFloat(this.barDataHanZhongHuiFaLiang.yAxis[0]) +parseFloat(this.barDataAnKangHuiFaLiang.yAxis[0])+parseFloat(this.barDataShangLuoHuiFaLiang.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataHanZhongHuiFaLiang.yAxis[1]) +parseFloat(this.barDataAnKangHuiFaLiang.yAxis[1])+parseFloat(this.barDataShangLuoHuiFaLiang.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataHanZhongHuiFaLiang.yAxis[2]) +parseFloat(this.barDataAnKangHuiFaLiang.yAxis[2])+parseFloat(this.barDataShangLuoHuiFaLiang.yAxis[2])).toFixed(2),
          	    ],
        };

        this.barDataFeiQi= {
          xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
          yAxis: [
                    (parseFloat(this.barDataHanZhongFeiQi.yAxis[0]) +parseFloat(this.barDataAnKangFeiQi.yAxis[0])+parseFloat(this.barDataShangLuoFeiQi.yAxis[0])).toFixed(2),
                    (parseFloat(this.barDataHanZhongFeiQi.yAxis[1]) +parseFloat(this.barDataAnKangFeiQi.yAxis[1])+parseFloat(this.barDataShangLuoFeiQi.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataHanZhongFeiQi.yAxis[2]) +parseFloat(this.barDataAnKangFeiQi.yAxis[2])+parseFloat(this.barDataShangLuoFeiQi.yAxis[2])).toFixed(2),
          	    ],
        };
      }//
    },
    //右3大中小汽车排放量
    LeftBtnZK(){
      this.isShowZaiKe = true
      this.isShowZaiHuo = false
      this.isShowDiSu = false


    },
    LeftBtnZH(){
      this.isShowZaiKe = false
      this.isShowZaiHuo = true
      this.isShowDiSu = false

    },
    LeftBtnDS(){
      this.isShowZaiKe = false
      this.isShowZaiHuo = false
      this.isShowDiSu = true

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
      var coordinate = [parseFloat(0.0), parseFloat(0.0)];
      var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );
      this.DynamicPOI.setPosition(coordinatePro);
      this.Popup.setPosition(coordinatePro);
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
            }1
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
    CloseImage(){
      if(this.isShowAImage){
        this.isShowAImage = false;
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
        controls: ol.control.defaults({ attribution: false, zoom: true, rotate: false }).extend([]),

        target: 'map',
            view: new ol.View({
            	//extent: [-20026376.39,-20048966.10,20026376.39,20048966.10],
            	projection: this.gProjection,
                //resolutions: this.gResolutions,
                // center: [12129470.527,4255685.289],
              //center: [12130995.527, 4316266.289],
                center: [12149145.114081362, 4316266.289],
                zoom: 8
            })
        });
      //this.map.on('singleclick', this.onMapSelectHandler);
      //lee 暂时先不用点击事件
      // this.map.on('singleclick', this.onMapSingleSelHandler);
      this.map.on('moveend', this.onMapZoomHandler);

    },
    async onMapSingleSelHandler(e){
      //查询地市信息
      if(this.isDiShi){
        await this.onMapSelectHandler(e);
      }
      //查询企业信息
      if(this.isQiYe){
        await this.onMapSelEntHandler(e);
      }
    },
    //查询企业信息
    async onMapSelEntHandler(e){
      var coordinateLngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
      var EnterpriseInfo = await this.queryYDYEntInfo(coordinateLngLat);
      this.resetPoiInfo();
      this.getEntPoiInfo(EnterpriseInfo);

    },

    getEntPoiInfo(EnterpriseInfo){
      var that = this;
      var lng = EnterpriseInfo.lng;
      var lat = EnterpriseInfo.lat;
      var coordinate = [parseFloat(lng), parseFloat(lat)];
      var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );
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
      this.DynamicPOI.setPosition(coordinatePro);
      this.isDynamicPoiShow = true;

      //打开PopUp
      var popContent = document.getElementById("popContent");
      popContent.innerHTML = "";
      popContent.innerHTML += "<span class = 'poiText' >企业名称：" + EnterpriseInfo.name + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";
      that.Popup.setPosition(coordinatePro);
      that.isPopupShow = true;
      this.map.updateSize();

    },

    //查询企业信息
    async queryYDYEntInfo(coordinateLngLat){
      var EntInfo = {};

      var Params = {
        coor: coordinateLngLat.toString(),
      }

      await api.QueryYDYEntInfo(Params).then(res=>{
        console.log(res);
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
              var InfoData = resultData.data.Info[0];
              EntInfo.name = InfoData.DWXXMC;
              var lng = this.DuFenMiaoToDu(InfoData.QYDLWZ_JD_DU,InfoData.QYDLWZ_JD_FEN,InfoData.QYDLWZ_JD_MIAO);
              var lat = this.DuFenMiaoToDu(InfoData.QYDLWZ_WD_DU,InfoData.QYDLWZ_WD_FEN,InfoData.QYDLWZ_WD_MIAO);
              EntInfo.lng = lng;
              EntInfo.lat = lat;
            }
        }
      });
      return EntInfo;
    },
    //度分秒转度
    DuFenMiaoToDu(du,fen,miao){
      var Du = parseFloat(du) + parseFloat(fen/60) + parseFloat(miao/3600);
      return Du;
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


      if(zoom >= 11){

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
        dataProjection : 'EPSG:4326',
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
        this.changeToQuanSheng();
      }
    },
    changeToQuanSheng(){
      //未选中行政区
      this.pieDataChuYouandYunShu = this.pieDataQuanShengChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataQuanShengQC;
        this.barDataHuiFaLiang= this.barDataQuanShengHuiFaLiang;
        this.barDataFeiQi= this.barDataQuanShengFeiQi;
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
        this.pieDataChuYouandYunShu = this.pieDataYuLinChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataYuLinQC;
        this.barDataHuiFaLiang= this.barDataYuLinHuiFaLiang;
        this.barDataFeiQi= this.barDataYuLinFeiQi;
      }
      else if(DSJSXZDM=='610600'){
        //延安
        console.log("延安");
        this.pieDataChuYouandYunShu = this.pieDataYanAnChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataYanAnQC;
        this.barDataHuiFaLiang= this.barDataYanAnHuiFaLiang;
        this.barDataFeiQi= this.barDataYanAnFeiQi;
      }
      else if(DSJSXZDM=='610500'){
        //渭南
        console.log("渭南");
        this.pieDataChuYouandYunShu = this.pieDataWeiNanChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataWeiNanQC;
        this.barDataHuiFaLiang= this.barDataWeiNanHuiFaLiang;
        this.barDataFeiQi= this.barDataWeiNanFeiQi;
      }
      else if(DSJSXZDM=='610200'){
        //铜川
        console.log("铜川");
        this.pieDataChuYouandYunShu = this.pieDataTongChuanChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataTongChuanQC;
        this.barDataHuiFaLiang= this.barDataTongChuanHuiFaLiang;
        this.barDataFeiQi= this.barDataTongChuanFeiQi;
      }
      else if(DSJSXZDM=='610400'){
        //咸阳
        console.log("咸阳");
        this.pieDataChuYouandYunShu = this.pieDataXianYangChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataXianYangQC;
        this.barDataHuiFaLiang= this.barDataXianYangHuiFaLiang;
        this.barDataFeiQi= this.barDataXianYangFeiQi;
      }
      else if(DSJSXZDM=='610300'){
        //宝鸡
        console.log("宝鸡");
        this.pieDataChuYouandYunShu = this.pieDataBaoJiChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataBaoJiQC;
        this.barDataHuiFaLiang= this.barDataBaoJiHuiFaLiang;
        this.barDataFeiQi= this.barDataBaoJiFeiQi;
      }
      else if(DSJSXZDM=='610100'){
        //西安
        console.log("西安");
        this.pieDataChuYouandYunShu = this.pieDataXiAnChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataXiAnQC;
        this.barDataHuiFaLiang= this.barDataXiAnHuiFaLiang;
        this.barDataFeiQi= this.barDataXiAnFeiQi;
      }
      else if(DSJSXZDM=='611000'){
        //商洛
        console.log("商洛");
        this.pieDataChuYouandYunShu = this.pieDataShangLuoChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataShangLuoQC;
        this.barDataHuiFaLiang= this.barDataShangLuoHuiFaLiang;
        this.barDataFeiQi= this.barDataShangLuoFeiQi;
      }
      else if(DSJSXZDM=='610900'){
        //安康
        console.log("安康");
        this.pieDataChuYouandYunShu = this.pieDataAnKangChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataAnKangQC;
        this.barDataHuiFaLiang= this.barDataAnKangHuiFaLiang;
        this.barDataFeiQi= this.barDataAnKangFeiQi;
      }
      else if(DSJSXZDM=='610700'){
        //汉中
        console.log("汉中");
        this.pieDataChuYouandYunShu = this.pieDataHanZhongChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataHanZhongQC;
        this.barDataHuiFaLiang= this.barDataHanZhongHuiFaLiang;
        this.barDataFeiQi= this.barDataHanZhongFeiQi;
      }
      else if(DSJSXZDM=='611300'){
        //汉中
        console.log("西咸");
        this.pieDataChuYouandYunShu = this.pieDataXiXianChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataXiXianQC;
        this.barDataHuiFaLiang= this.barDataXiXianHuiFaLiang;
        this.barDataFeiQi= this.barDataXiXianFeiQi;
      }
      else if(DSJSXZDM=='611400'){
        //汉中
        console.log("杨凌");
        this.pieDataChuYouandYunShu = this.pieDataYangLingChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataYangLingQC;
        this.barDataHuiFaLiang= this.barDataYangLingHuiFaLiang;
        this.barDataFeiQi= this.barDataYangLingFeiQi;
      }
      else if(DSJSXZDM=='611500'){
        //汉中
        console.log("韩城");
        this.pieDataChuYouandYunShu = this.pieDataHanChengChuYouandYunShu;
        this.pieDataLeftBottom = this.pieDataHanChengQC;
        this.barDataHuiFaLiang= this.barDataHanChengHuiFaLiang;
        this.barDataFeiQi= this.barDataHanChengFeiQi;
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
    //加载午夜蓝图
    LoadGaoDeMap(){

      //午夜蓝图
      this.wuyelantu = new ol.layer.Tile({
          source: new ol.source.XYZ({
              url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}' //大地坐标
          })
      });

      //this.map.setMapStyle('amap://styles/whitesmoke');
      this.map.addLayer(this.wuyelantu);
    },
    //加载天地图影像地图
    LoadTianDiTuMap(){
      if(this.map){

        this.tdtImage = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
            })
        });
        //this.map.addLayer(this.tdtImage);
        this.tdtImageAnno = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
            })
        });
        //this.map.addLayer(this.tdtImageAnno);


      }

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

    //加载午夜蓝图
    this.LoadGaoDeMap();
    //加载天地图影像
    this.LoadTianDiTuMap();
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
        this.isShowZaiKe =true
    this.isShowZaiHuo =false
    this.isShowDiSu =false

    this.loadGeoWMTSLayer();
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
    BarLeftBottomydy,
    BarRightBottomydy,
    BarRightBottomydy1,
    BarRightBottomydy2,
    BarRightTopydy,
    BarRightBottomNew,
    PieLeftBottom,
    PieLeftBottomNew,
    PieLeftCenter,
    BarRightCenter,
    Bar5,
    PieChart3,
    PieChart4,
    PieChart5,
    mapBox,
    ImageDiv,
    NewBox1
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
    //height: 55% !important;
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
    .toolBarPicture{
        position: absolute;
          top: 50px;
          right: -70px;
          width: 180px;
          height: 50px;
          z-index: 1;
          .el-button{
            width: 40px;
            background: #102b38;
            border: 1px solid #2d9690;
            color: #FFF;
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
      }

    .toolBarRadio{
      position: absolute;
      bottom:50px;
      right: 40px;
    }

    .toolBarRadio /deep/ .el-radio{
      margin-top: 8px !important;
    }
    .toolBarRadio /deep/ .el-radio-group{
      display: flex;
      flex-direction: column;
    }
    .toolBarRadio /deep/ .el-radio__inner {
      background: #fff;
      border-color: #fff;
    }
    .toolBarRadio /deep/ .el-radio__label {
      color: #fff;
      font-size:18px;
    }

    .toolBarRadio /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #0b9e97 !important;
    }
    .toolBarRadio /deep/ .el-radio__input.is-checked .el-radio__inner {
      background: #0b9e97 !important;
      border-color: #0b9e97 !important;
    }

    .toolBarRadioDiTu{
      position: absolute;
      top:15px;
      left: 50px;
    }

    .toolBarRadioDiTu /deep/ .el-radio{
      margin-right: 10px !important;
    }

    .toolBarRadioDiTu /deep/ .el-radio__inner {
      background: #fff;
      border-color: #fff;
    }
    .toolBarRadioDiTu /deep/ .el-radio__label {
      color: #fff;
      font-size:18px;
    }

    .toolBarRadioDiTu /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #0b9e97 !important;
    }
    .toolBarRadioDiTu /deep/ .el-radio__input.is-checked .el-radio__inner {
      background: #0b9e97 !important;
      border-color: #0b9e97 !important;
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
    height:32.6%;
    margin-bottom: 12px;
    .left-top-content{
      height:100%;
      width:90%;
      margin-left:20px;
      margin-top:0px;
      margin-bottom: -30px;
    }
  }

/*
  .left-top1{
    height:32.6%;
    margin-top: 12px;
    .leftBtn{
      margin-top: 2px;
      margin-left:100px;
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
        margin-left: 85px;
      }
      .leftBtnL{
        width:90px;
        .Fei{
          opacity: 0;
          transition: all 0.3s ease-in;
          &.isShowFei{
            opacity: 100;
          }
        }
      }
    }
    .left-top1-content{
      .YiShuZi1{
        margin-top: 80px;
        display: block;
        text-align:center;
        color: hsl(200,75%,35%);
        font-size: 80px;
        font-weight: bold;
        text-shadow: 0 0 2px currentColor, 0 -1px 1px hsl(40,100%,80%), -1px -1px 1px hsl(10,100%,40%), 1px -1px 1px hsl(10,100%,40%), 1px 0 1px hsl(10,100%,40%), 0 -1px 1px hsl(10,100%,40%), 0 1px 1px hsl(10,100%,20%), 1px 1px 1px hsl(10,100%,40%), -1px 1px 1px hsl(10,100%,40%), -2px -2px 1px hsl(10,100%,20%), -1px -2px 1px hsl(10,100%,20%), 0 -2px 1px hsl(10,100%,20%), 1px -2px 1px hsl(10,100%,20%), 2px -2px 1px hsl(10,100%,20%), 2px -1px 1px hsl(10,100%,20%), 2px 0 1px hsl(10,100%,20%), 2px 1px 1px hsl(10,100%,20%), 2px 2px 1px hsl(10,100%,20%), 1px 2px 1px hsl(10,100%,20%), 0 2px 3px hsl(10,100%,20%), -1px 2px 1px hsl(10,100%,20%), -2px 2px 1px hsl(10,100%,20%), -2px 1px 1px hsl(10,100%,20%), -2px 0 1px hsl(10,100%,20%), -2px -1px 1px hsl(10,100%,20%);
      }
    }
  }
*/

  .left-center{
    height:32.6%;
    margin-bottom: 10px;
    .leftBtn{
      margin-top: 2px;
      .el-button{
        width: 70px;
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
        margin-left: 100px;
      }
      .leftBtnL{
        width:90px;
        .Fei{
          opacity: 0;
          transition: all 0.3s ease-in;
          &.isShowFei{
            opacity: 100;
          }
        }
      }
    }
    .left-center-content{
      height:87%;
      width:90%;
      margin-left:20px;
      //margin-top:10px;
      //margin-bottom: 35px;
    }
  }

  .left-bottom{

    height:32.6%;
    margin-bottom: 12px;
    .leftBtn{
      margin-top: 2px;

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
        margin-left: 0px;
      }
      .leftBtnL{
        width:90px;
        .Fei{
          opacity: 0;
          transition: all 0.3s ease-in;
          &.isShowFei{
            opacity: 100;
          }
        }
      }
    }
    .left-bottom-content{
      height:95%;
      width:90%;
      margin-left:10px;
      margin-top:10px;
      margin-bottom: -30px;
    }
  }

</style>
