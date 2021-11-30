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
      <NewBox1 title='种植' class="left-bottom">
          <div class="leftBtn" slot="header">
<!--            <el-button size="mini" @click.native="LeftBtnDM">地膜</el-button>
            <el-button size="mini" @click.native="LeftBtnGZ">耕种</el-button>-->

            <el-radio-group v-model="radioButton1" size="mini">
              <el-radio-button label="地膜" @click.native="LeftBtnDM">地膜</el-radio-button>
              <el-radio-button label="耕种" @click.native="LeftBtnGZ">耕种</el-radio-button>
            </el-radio-group>
            <!--
            <el-dropdown size="small" split-button type="primary" class="NYYDropdown">
              种植
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="LeftBtnDM">地膜</el-dropdown-item>
                <el-dropdown-item @click.native="LeftBtnGZ">耕种</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            -->
          </div>

          <div slot="content" class='left-bottom-content' v-show='showLeftBottomBar1'>
            <BarLeftBottom  :data="barDataLeftBottom" :legendData="legendData"/>
          </div>
<!--          <div slot="content" class='left-bottom-content' v-show='showLeftBottomBar3'>
            <BarLeftBottom2  :data="barDataLeftBottom"/>
          </div>
          <div slot="content" class='left-bottom-content' v-show='showLeftBottomPie1'>
            <PieLeftBottom1  :data="barDataLeftBottom"/>
          </div>-->
      </NewBox1>

      <NewBox1 title='陕西特色' class="left-bottom">
          <div class="leftBtn" slot="header">
<!--            <el-button-group>
              <el-button size="mini" @click.native="LeftBtnSG">水果</el-button>
              <el-button size="mini" @click.native="LeftBtnNY">农药</el-button>
              <el-button size="mini" @click.native="LeftBtnHF">化肥</el-button>
            </el-button-group>-->

            <el-radio-group v-model="radioButton2" size="mini">
              <el-radio-button label="水果" @click.native="LeftBtnSG">水果</el-radio-button>
              <el-radio-button label="农药" @click.native="LeftBtnNY">农药</el-radio-button>
              <el-radio-button label="化肥" @click.native="LeftBtnHF">化肥</el-radio-button>
            </el-radio-group>
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
<!--            lee 暂时用不上-->
<!--            <div class='toolBar' v-if="isShowGuanZhong">
              <el-button-group>
                <el-button size="mini" round @click="shanbei()">陕北</el-button>
                <el-button size="mini" round @click="guanzhong()">关中</el-button>
                <el-button size="mini" round @click="shannan()">陕南</el-button>
              </el-button-group>
            </div>-->
            <div class='toolBarquery' :class="{'toolBarquery2' : !poiVisible}" v-if="isShowtoolBarquery">
                <el-button size="mini" round @click="Openquery()">查询</el-button>
            </div>
            <div class='toolBarPicture' v-if="isShowGuanZhong">
                  <el-button size="mini" @click="OpenPicture()">地图</el-button>
            </div>
            <!--显示地市还是企业-->
            <div class='toolBarRadio'>
              <el-radio-group v-model="radio"  @change="SelectQueryModel()">
                <el-radio :label="2" >企业</el-radio>
                <el-radio :label="1" >地市</el-radio>
              </el-radio-group>
            </div>
            <!--显示地图或影像-->
            <div class='toolBarRadioDiTu'>
              <el-radio-group v-model="radioDiTu"  @change="SelectDiTu()">
                <el-radio :label="1" >地图</el-radio>
                <el-radio :label="2" >影像</el-radio>
                <el-p id="textXZQ" style="color:white;width:100px;font-size: 16px;height:20px;margin-top: 15px;margin-left: 17px;margin-right: 10px" >{{  }}</el-p>
              </el-radio-group>
            </div>
           <!-- <el-button type="primary" icon="el-icon-search" style="right: 5%;position:absolute;"
                       v-on:click="initdata()">刷新</el-button>-->
            <div class='toolBarRadioFenLei'>
              <el-radio-group v-model="radioFenLei"  @change="SelectFenLei()" v-if="isShowEntFenLei">
                <el-radio :label="1" >全部</el-radio>
                <el-radio :label="2" >&nbsp&nbsp&nbsp蛋鸡<span class='TLDanJi'>  </span></el-radio>
                <el-radio :label="3" >&nbsp&nbsp&nbsp肉鸡<span class='TLRouJi'>  </span></el-radio>
                <el-radio :label="4" >&nbsp&nbsp&nbsp奶牛<span class='TLNaiNiu'>  </span></el-radio>
                <el-radio :label="5" >&nbsp&nbsp&nbsp肉牛<span class='TLRouNiu'>  </span></el-radio>
                <el-radio :label="6" >&nbsp&nbsp&nbsp生猪<span class='TLShengZhu'>  </span></el-radio>
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
<!--          lee 查询框显示，点击事件从子组件传过来-->
          <PoiLocation class="poi" title="POI定位" :widgetActiveFlag="poiVisible" :mapbox="mapProp" :tablename="poiTablename" :fieldName="fieldName" :JingDu="JingDu" :WeiDu="WeiDu" @PoiClick="poiClickBigScreen" :FieldWhere = FieldWhere></PoiLocation>

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
        <NewBox :title=nysl class='centerGyy'>
            <BarCenterNYY :data="barDataYZC" slot="contentGYY" class='centerGyyBar'/>
        </NewBox>
    </div>
    <div class="right-bar">

      <NewBox1 title='废水主要污染物排放量(吨)' class="left-top">
          <div slot="content" class='left-top-content'>
            <BarRightTopNYY :data="barDataRightTopFeiShui"/>
          </div>
      </NewBox1>
<!--      <Box title="废气主要污染物排放量(万吨)" >
&lt;!&ndash;        <BarRightCenterNYY :data="barDataRightCenterFeiQi"/>&ndash;&gt;
&lt;!&ndash;        <BarRightCenterNYY :data="barDataRightCenterFeiQi"/>&ndash;&gt;
        <div class="leftBtn" slot="header">
        </div>
        <div slot="content" class='left-bottom-content'>
          <BarRightBottomNYY :data="barDataRightBottomJieGan"/>
        </div>
        &lt;!&ndash;
        <LineChart  :data="lineData2"/>
        &ndash;&gt;
      </Box>-->
      <Box title="废气主要污染物排放量(吨)" class="left-middle" style="height: 32.6%">

        <Bar2New :data="barDataRightCenterFeiQi"/>
        <!--
        <LineChart  :data="lineData2"/>
        -->
      </Box>
      <NewBox1 title='秸秆利用量及可回收量(吨)' class="left-bottom">
<!--          <div class="leftBtn" slot="header">-->
<!--          </div>-->
          <div slot="content" class='left-bottom-content'>
            <BarRightBottomNYY :data="barDataRightBottomJieGan"/>
          </div>
      </NewBox1>

    </div>
    <div></div>
    <ImageDiv class="attribute" v-show="isShowAImage" @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures" :selectFeature="selectFeature"  ></ImageDiv>

  </div>
</template>
<script>
import PoiLocation from "../../components/poi";

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
import ImageDiv from "../../components/common/imageDiv";
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
      radioButton2:"水果",
      radioButton1:"地膜",
      FieldWhere: "",

      isShowtoolBarquery:true,

      poiVisible: false,
      mapProp : {},
      poiTablename:'T_BAS_N101_1',
      fieldName: "yzcmc",
      JingDu: "jindu",
      WeiDu: "weidu",

      //是否展示关中陕南陕北按钮
      isShowGuanZhong:false,
      isShowEntFenLei:true,
      radio:2,
      radioDiTu:1,
      radioFenLei:1,
      isDiShi:false,
      isQiYe:true,
      //重点排污单位点击事件
      isPopupShow:false,
      isDynamicPoiShow:false,
      Popup:null,
      DynamicPOI:null,
      poiName:"",
      poiAddress:"",
      // poiVectorLayer:null,
      poiVectorSource:null,

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

      lineData1: {
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 1.46 ,41.3, 4.52 ,0.273 ],
        color: [188, 235, 127]
      },
      barDataRightTop:{
        xAxis: ["储油库","加油站","油品运输企业", "储运销"],
        CYXPFLData: [1475.87,847.51, 343.67,2667.05],
      },
      // barDataRightCenter:{
      //   xAxis: ["氮氧化物","颗粒物","挥发性有机物"],
      //   yAxis: [ 4316.33,559.69,21727.63],
      // },
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
      //

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
/*      barDataLeftTopLeft:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-2795,-302,-742,-4001,-540],

      },
      barDataLeftTopRight:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [524.67,14.14,8.81,3591.15,2943.23],
      },*/
      //全延安市规模化养殖场数量（个）
      barDataLeftTopLeft:{
        xAxis: ["肉鸡","肉牛","生猪","奶牛","蛋鸡",],
        yAxis: [-4,-39,-110,-1,-88],

      },
      barDataLeftTopRight:{
        xAxis: ["肉鸡","肉牛","生猪","奶牛","蛋鸡",],
        yAxis: [4.53,0.4129,30.5478,0.0137,105.8385],
      },
      barDataLeftTopLeftQuanSheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [-2795,-302,-742,-4001,-540],

      },
      barDataLeftTopRightQuanSheng:{
        xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
        yAxis: [524.67,14.14,8.81,3591.15,2943.23],
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
        yAxis: [34.58,0,0.41,44.6,88.02],
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
/*      barDataLeftBottom:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 23139.74,	13737.3826],
      },
      //全省地膜
      barDataDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 23139.74,	13737.3826],
      },
      //各地市地膜情况
      barDataXiAnDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [1344.95,	384.3811],
      },
      barDataTongChuanDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 601.35,	562.21],
      },
      barDataBaoJiDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 1349.2,	949.769],
      },
      barDataXianYangDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [3051.6,	2086.685],
      },
      barDataWeiNanDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 4728.6,	2688.4294],
      },
      barDataYanAnDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 2454.11,	2065.9221],
      },
      barDataHanZhongDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 1817.52,	522.2418],
      },
      barDataYuLinDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 3984.35,	2593.5709],
      },
      barDataAnKangDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 2292.48,	1073.0681],
      },
      barDataShangLuoDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 1137.92,	692.9044],
      },
      barDataXiXianDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 63.91,	4.7378],
      },
      barDataYanLinDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 181.58,	45.6044],
      },
      barDataHanChengDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 132.17,	67.8586],
      },
*/
//      全延安地膜使用量
 barDataLeftBottom:{
/*        xAxis: ["地膜累积残留量","地膜使用量",    ],
        yAxis: [ 2065.9221,2454.11],*/
      },
      //全省地膜
      barDataDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 2.31,1.37],
      }, 
      //各地市地膜情况
      barDataXiAnDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.13,0.038],
      },             
      barDataTongChuanDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.060,0.056],
      },          
      barDataBaoJiDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.13,0.095],
      },             
      barDataXianYangDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.31,0.21],
      },             
      barDataWeiNanDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.47,0.27],
      },             
      barDataYanAnDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.25,0.21],
      },
      barDataHanZhongDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.18,0.052],
      },  
      barDataYuLinDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.40,0.26],
      }, 
      barDataAnKangDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.23,0.11],
      }, 
      barDataShangLuoDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.11,0.069],
      }, 
      barDataXiXianDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.0064,0.00047],
      },        
      barDataYanLinDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [0.018,0.0046],
      },           
      barDataHanChengDiMo:{
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 0.013,0.0068],
      }, 

//全省耕种(亩)
/*
barDataGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 44706356.35,	23224804.18],
      },
      //各地市耕种情况
      barDataXiAnGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [3271218,	797856],
      },
      barDataTongChuanGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 1027631,	915673],
      },
      barDataBaoJiGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 4210736.5,	1202126],
      },
      barDataXianYangGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [4811375.7,	4041537],
      },
      barDataWeiNanGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 7085451,	2910957],
      },
      barDataYanAnGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 4053805,	4744915],
      },
      barDataHanZhongGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 3159575,	1718955],
      },
      barDataYuLinGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 11245424,	4019886],
      },
      barDataAnKangGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 2929807,	2072414],
      },
      barDataShangLuoGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 2005940,	551924],
      },
      barDataXiXianGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 477997.15,	132736.18],
      },
      barDataYanLinGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 58800,	19050],
      },
      barDataHanChengGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 368596,	96775],
      },
*/
      barDataGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 4470.64,2322.48],
      }, 
      //各地市耕种情况
      barDataXiAnGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [327.12,79.79],
      },             
      barDataTongChuanGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 102.76,91.57],
      },          
      barDataBaoJiGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 421.07,120.21],
      },             
      barDataXianYangGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [481.14,404.15],
      },             
      barDataWeiNanGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 708.55,291.10],
      },             
      barDataYanAnGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 405.38,474.49],
      },
      barDataHanZhongGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 315.96,171.90],
      },  
      barDataYuLinGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 1124.54,401.99],
      }, 
      barDataAnKangGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 292.98,207.24],
      }, 
      barDataShangLuoGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 200.59,55.19],
      }, 
      barDataXiXianGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 47.80,13.27],
      },        
      barDataYanLinGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [ 5.88,1.91],
      },           
      barDataHanChengGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
        yAxis: [36.86,9.68],
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
/*barDataLeftBottom1:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 771.44, 43.18],
        HSL:    [ 371.40, 41.71],
      },*/

      //全延安市默认值
      barDataLeftBottom1:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 176.21, 0],
        HSL:    [ 0.31, 0],
      },
//全延安市特色水果
      barDataShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 176.21, 0],
        HSL:    [ 0.31, 0],
      }, 
      //各地市水果套袋情况
      barDataXiAnShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 22.30, 8.85],
        HSL:    [ 22.28, 8.85],
      },             
      barDataTongChuanShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 34.88, 0.01],
        HSL:    [ 34.63, 0],
      },          
      barDataBaoJiShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 230.05, 0.096],
        HSL:    [ 6.50, 0.03],
      },             
      barDataXianYangShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 171.30, 24.62 ],
        HSL:    [ 172.49, 23.43],
      },             
      barDataWeiNanShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 131.07 ,9.09],
        HSL:    [ 130.07, 8.85],
      },             
      barDataYanAnShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 176.21, 0],
        HSL:    [ 0.31, 0],
      },
      barDataHanZhongShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 0.01, 0],
        HSL:    [ 0.006, 0],
      },  
      barDataYuLinShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 4.04, 0.15],
        HSL:    [ 3.79, 0],
      }, 
      barDataAnKangShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 0.002, 0],
        HSL:    [ 0.002, 0],
      }, 
      barDataShangLuoShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 0.10, 0],
        HSL:    [ 0.099, 0],
      }, 
      barDataYanLinShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 0.92, 0.31],
        HSL:    [ 0.67, 0.22],
      },           
      barDataHanChengShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:   [ 0.55, 0.36],
        HSL:   [ 0.45, 0.26],
      }, 
      barDataXiXianShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:   [ 0.75, 0.36],
        HSL:   [ 0.65, 0.16],
      }, 
      /*
      barDataYanLinShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 0.92, 0.01],
        HSL:    [ 0.67, 0.22],
      },           
      barDataHanChengShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:   [ 0.55, 0.36],
        HSL:   [ 0.55, 0.36],
      }, 
      barDataXiXianShuiGuo:{
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:   [ 0.75, 0.36],
        HSL:   [ 0.65, 0.16],
      }, 
      */
      //全省陕西特色农药
/*      barDataNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 3674.85, 	3766.41, 	15.35, 	21.41, 	29.23 ],
        HSL:    [ 104.61, 	139.58, 	2.86, 	2.14, 	3.06 ],
      },*/
      //全延安市农药
      barDataNongYao:{
      xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
          SYL:    [ 255.37, 	159.53, 	2.26, 	0.02, 	1.09 ],
        HSL:    [ 0, 	0, 	0, 	0, 	0],
    },
    //各地市农药情况
      barDataXiAnNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 308.26, 	309.37, 	2.94, 	2.27, 	8.78 ],
        HSL:    [ 7.70, 	12.32, 	0.00, 	0.00, 	0.09  ],
      },
      barDataTongChuanNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 41.03, 	20.44 , 	0, 	0, 	0 ],
        HSL:    [ 0.03, 	0, 	0, 	0, 	0 ],
      },
      barDataBaoJiNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 312.67, 	442.58, 	1.67, 	0.21, 	0.01  ],
        HSL:    [ 1.87, 	1.10, 	0.02, 	0.00, 	0.00  ],
      },
      barDataXianYangNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 495.02, 	493.92, 	3.03, 	1.20, 	1.35,  ],
        HSL:    [ 1.71, 	1.98, 	0.01, 	0.01, 	0.00  ],
      },
      barDataWeiNanNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 1546.92, 	1240.99, 	1.66, 	5.27, 	0.65  ],
        HSL:    [ 35.38, 	57.91, 	2.01, 	0.00, 	0.00  ],
      },

      barDataYanAnNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 255.37, 	159.53, 	2.26, 	0.02, 	1.09 ],
        HSL:    [ 0, 	0, 	0, 	0, 	0],
      },
      barDataHanZhongNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 251.78, 	578.83, 	0.36, 	1.17, 	0.24  ],
        HSL:    [ 23.05, 	19.15, 	0.29, 	0.20, 	0.20  ],
      },
      barDataYuLinNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 208.31, 	85.09, 	0.40, 	1.90, 	10.72  ],
        HSL:    [ 0, 	0, 	0.07, 	0, 	0 ],
      },
      barDataAnKangNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 99.80, 	210.56, 	0.25, 	2.36, 	6.32  ],
        HSL:    [ 20.88, 	30.99, 	0.05, 	1.92, 	2.77  ],
      },
      barDataShangLuoNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 43.01, 	120.76, 	1.43, 	7.00, 	0.07  ],
        HSL:    [ 12.00, 	14.86, 	0.42, 	0.01, 	0  ],
      },
      barDataXiXianNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 32.97, 	48.67 , 	0, 	0, 	0 ],
        HSL:    [ 1.36, 	0.93  , 	0, 	0, 	0 ],
      },
      barDataYanLinNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 10.64, 	8.05, 	1.30, 	0, 	0 ],
        HSL:    [ 0.09, 	0.18 , 	0, 	0, 	0 ],
      },
      barDataHanChengNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 69.07, 	47.63, 	0.05, 	0.01 , 	0 ],
        HSL:    [ 0.53, 	0.17 , 	0, 	0, 	0 ],
      },
      //全省陕西特色化肥
/*      barDataHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:   [ 2342.44, 	15545.77, 	436.72, 	47.14  ],
        HSL:   [ 1596.98, 	14245.23, 	414.00, 	27.61 ],
      },*/
      //全延安市特色化肥
      barDataHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 1341.28, 	1230.16, 	21.27,0 ],
        HSL:    [ 811.15, 	958.56, 	21.20 , 	0],
      },
      //各地市化肥情况
      barDataXiAnHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:   [ 375.34, 	2460.22, 	158.98,0 ],
        HSL:   [ 342.91, 	2426.27, 	158.97,0 ],
      },
      barDataTongChuanHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 132.86, 	452.67, 	23.83, 	21.05  ],
        HSL:    [ 86.62, 	424.30, 	23.73, 	17.34  ],
      },
      barDataBaoJiHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 82.99, 	2118.26, 	13.11, 	0.52 ],
        HSL:    [ 18.93, 	2021.51, 	12.44, 	0.00 ],
      },
      barDataXianYangHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 117.23, 	2801.35, 	81.33, 	18.21 ],
        HSL:    [ 76.20, 	2446.60, 	66.25, 	5.64 ],
      },
      barDataWeiNanHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 280.49, 	2783.34, 	131.26, 	4.86 ],
        HSL:    [ 256.33, 	2712.98, 	129.13, 	3.83 ],
      },

      barDataYanAnHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 1341.28, 	1230.16, 	21.27,0 ],
        HSL:    [ 811.15, 	958.56, 	21.20 , 	0],
      },
      barDataHanZhongHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 4.91, 	1238.14, 	0.03, 	1.30 ],
        HSL:    [ 3.02, 	1194.21, 	0.03, 	0.80 ],
      },
      barDataYuLinHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 4.77, 	988.07, 	6.14, 	1.20 ],
        HSL:    [ 0.94, 	716.87, 	1.48 , 	0 ],
      },
      barDataAnKangHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 0.07, 	837.49, 	0.01 , 	0  ],
        HSL:    [ 0.00, 	756.34, 	0.01 , 	0  ],
      },
      barDataShangLuoHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 1.00, 	431.61 , 	0, 	0  ],
        HSL:    [ 0, 	397.48, 0, 	0  ],
      },
      barDataYanLinHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [ 0.44, 	98.76, 	0.24 , 	0 ],
        HSL:    [ 0, 	89.5 , 	0.24, 	0, 	0 ],
      },
      barDataHanChengHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [1.08, 	105.71, 	0.53 , 	0 ],
        HSL:    [0.88, 	100.63, 	0.53 , 	0 ],
      },
      //没有西咸
      barDataXiXianHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
        SYL:    [0.88, 	102.71, 	0.43 , 	0 ],
        HSL:    [0.78, 	96.63, 	0.23 , 	0 ],
      },
      //中2
      xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市"],
      //农业源中
      barDataYZC:{
        /*xAxis: ["西安市","铜川市","宝鸡市", "咸阳市",  "渭南市", "延安市","汉中市", "榆林市",  "安康市","商洛市","西咸新区",  "杨凌示范区", "韩城市",],
        SZData:["227",    "56",   "274",    "700"  ,  "553",    "110",   "218",   "277"  ,  "188",   "143",      "19",     "17",   "13",    ],
        NNData:["85",     "6",    "47",     "75"  ,   "57",     "1",     "2",     "16"  ,   "0",     "0" ,         "4",       "8",   "1",     ],
        RNData:["83",     "19",   "89",     "94"   ,  "208",    "39",    "43",    "96" ,    "47",    "17" ,       "0",     "6",      "1",    ],
        DJData:["332",    "230",  "368",    "483"  ,  "1286",   "88",    "108",   "428"  ,  "42",    "564" ,      "38",     "10",      "24",      ],
        RJData:["82",     "11",   "60",     "79"  ,   "138",    "4",     "17",    "33"  ,   "45",    "63" ,       "7",       "0",     "1",      ],
*/      },
      //右1
      //废水排放量(吨)
      //畜禽、水产、种植
/*      barDataRightTopFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 21.05,   0.23,     1.23,   0.22],
        SC:    [ 0.15,    0.005,    0.04,   0.003],
        ZZ:    [ 0,       0.07,    0.78,     0.09],
      },*/
      barDataRightTopFeiShui:{
        "SC":["43.0143","1.6482","9.001","0.2749"],
        "ZZ":["0","72.3701","906.4951","93.3303"],
        "xAxis":["化学需氧量","氨氮","总氮","总磷"],
        "CQ":["11097.4338","84.0369","626.1453","81.3874"]
      },
      barDataQuanShengFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 21.05,   0.23,     1.23,   0.22],
        SC:    [ 0.15,    0.005,    0.04,   0.003],
        ZZ:    [ 0,       0.07,    0.78,     0.09],
      },
      //各市污水排放量
      barDataXiAnFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1.82,  0.02,  0.1,  0.02],
        SC:    [ 0.015,  0.0005,   0.003,    0.0002],
        ZZ:    [ 0,     0.004,   0.05,   0.006],
      },
      barDataBaoJiFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 3.69,  0.05,  0.23,  0.03],
        SC:    [ 0.003,   0.00009,    0.0008,    0.00006],
        ZZ:    [ 0,     0.006,   0.07,   0.007],
      },
      barDataXianYangFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 2.29,  0.02,  0.13,  0.03],
        SC:    [ 0.02,   0.0004,     0.004,      0.0008],
        ZZ:    [ 0,      0.08,   0.10,   0.01],
      },
      barDataTongChuanFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 0.41,  0.004,  0.02,  0.004],
        SC:    [ 0.0006,  0.00002,   0.0001,    0.00001],
        ZZ:    [ 0,    0.002,   0.02,   0.002],
      },
      barDataWeiNanFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 3.41,  0.03,  0.18,  0.04],
        SC:    [ 0.06,   0.002,   0.02,    0.002],
        ZZ:    [ 0,     0.01,   0.12,   0.01],
      },
      barDataYanAnFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1.11,    0.008,   0.063,  0.008],
        SC:    [ 0.004,    0.0002,    0.0009,   0.00003],
        ZZ:    [ 0,        0.007,   0.09,   0.009],
      },
      barDataYuLinFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 2.00,  0.03,  0.12,     0.02],
        SC:    [ 0.004,    0.0001,    0.001,       0.00003],
        ZZ:    [ 0,       0.02,  0.18,     0.02],
      },
      barDataHanZhongFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 2.86,  0.03,  0.17,  0.03],
        SC:    [ 0.03,   0.001,   0.006,    0.0003],
        ZZ:    [ 0,      0.005,   0.06,     0.006],
      },
      barDataAnKangFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1.8,  0.02,  0.1,  0.02],
        SC:    [ 0.009,   0.0003,    0.002,      0.0002],
        ZZ:    [ 0,     0.005,   0.06,     0.006],
      },
      barDataShangLuoFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 1.3,  0.01,  0.08,  0.01],
        SC:    [ 0.004,     0.0001,    0.0008,   0.0002],
        ZZ:    [ 0,     0.003,   0.03,     0.004],
      },
      barDataXiXianFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 0.09,   0.001,   0.005,     0.001],
        SC:    [ 0.0006,   0.00002,    0.0001,      0.00003],
        ZZ:    [ 0,       0.0006,   0.008,     0.0008],
      },
      barDataYangLinFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 0.12,   0.001,  0.006,      0.001],
        SC:    [ 0,      0,        0,             0],
        ZZ:    [ 0,      0.00008,   0.0009,    0.0001],
      },
      barDataHanChengFeiShui:{
        xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
        XQ:    [ 0.14,   0.002,  0.008,    0.002],
        SC:    [ 0.0006,   0.00002,    0.0001,        0.00001],
        ZZ:    [ 0,      0.0005,     0.006,      0.0006],
      },


      //右2 废气排放量（万吨）
      //注意，氨气分为种植业氨气和养殖业氨气。但是挥发性有机物又不分。因此做成堆叠图
      barDataRightCenterFeiQi:{
        /*xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 13.30,       0],
        YZYD:  [ 6.62,        0],
        HFXYJW:[ 0,          0.99],*/
      },

      barDataQuanShengZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 13.30,       0],
        YZYD:  [ 6.62,        0],
        HFXYJW:[ 0,          0.99],
      },

      //总废气（万吨）
      barDataRightCenter:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        gyyData:["16.679", "17.478", "41.049", "7.683"  , ],
        shyData:["3.208", "2.95",  "9.595",  "6.931"  ,],
        jzsData:["0.014",  "0.036",  "0.007",  "0"   ,  ],
        ydyData:["0",  "25.861",  "0.666",  "7.811"  , ],
        nyyData:["0",  "0",  "0", "0.985"  ,]
      },
      //各地市废水排放量(吨)
      barDataXiAnZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 1.18,       0],
        YZYD:  [ 0.51,        0],
        HFXYJW:[ 0,        0.04],
      },
      barDataBaoJiZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 1.10,       0],
        YZYD:  [ 1.01,        0],
        HFXYJW:[ 0,         0.07],
      },
      barDataXianYangZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 2.21,       0],
        YZYD:  [ 0.77,        0],
        HFXYJW:[ 0,          0.17],
      },
      barDataTongChuanZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.37,       0],
        YZYD:  [ 0.13,        0],
        HFXYJW:[ 0,         0.05],
      },
      barDataWeiNanZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 2.42,       0],
        YZYD:  [ 0.85,        0],
        HFXYJW:[ 0,         0.16],
      },
      barDataYanAnZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 1.60,       0],
        YZYD:  [ 0.34,        0],
        HFXYJW:[ 0,         0.2],
      },
      barDataYuLinZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 1.77,       0],
        YZYD:  [ 0.69,        0],
        HFXYJW:[ 0,         0.11],
      },
      barDataHanZhongZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 1.03,       0],
        YZYD:  [ 1.01,        0],
        HFXYJW:[ 0,          0.08],
      },
      barDataAnKangZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.96,       0],
        YZYD:  [ 0.72,        0],
        HFXYJW:[ 0,         0.07],
      },
      barDataShangLuoZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.41,       0],
        YZYD:  [ 0.47,        0],
        HFXYJW:[ 0,      0.03],
      },
      barDataXiXianZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.14,       0],
        YZYD:  [ 0.03,        0],
        HFXYJW:[ 0,         0.007],
      },
      barDataYangLinZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.02,       0],
        YZYD:  [ 0.04,        0],
        HFXYJW:[ 0,         0.0005],
      },
      barDataHanChengZFeiQi:{
        xAxis: ["氨气",        "挥发性有机物"],
        ZZYD:  [ 0.08,       0],
        YZYD:  [ 0.05,        0],
        HFXYJW:[ 0,      0.007],
      },

      //右3 秸秆的理论资源量、可收集资源量、利用量（万吨）
      //
      barDataRightBottomJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [1235.32,	1050.81,	991.25],
      },

      barQuanShengJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [1235.32,	1050.81,	991.25],
      },

      //各地市秸秆
      barXiAnJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [175.3,	144.5,	152.01],
      },
      barTongChuanJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [25.68,	22.04,	21.93],
      },
      barBaoJiJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [156.01,	128.78,	123.11],
      },
      barXianYangJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [184.42,	151.57,	156.08],
      },
      barWeiNanJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [244.32,	201.68,	195.19],
      },
      barYanAnJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [63.29,	58.78,	59.56],
      },
      barYuLinJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [106.56,	99.7,	85.17],
      },
      barHanZhongJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [112.76,	95.08,	81.51],
      },
      barAnKangJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [83,	73.9,	60.78],
      },
      barShangLuoJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [54,	50.02,	29.40],
      },
       barXiXianJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [20.64,	17.12,	18.49],
      },
       barYanLinJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [2.12,	1.76,	1.75],
      },
       barHanChengJieGan:{
        xAxis: ["理论资源量","可收集资源量","利用量"],
        yAxis: [7.23,	5.91,	6.27],
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
      moveOverlayVectorSource: null,
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
        // yulin:[109.815,38.226],
        // yanan:[109.428,36.256],
        /*weinan:[109.817,34.911],
        tongchaun:[108.973,35.178],
        xianyang:[108.389,34.753],
        baoji:[107.337,34.317],
        xixian:[108.78576, 34.37971],
        yanglin:[108.00908, 34.35034],
        hancheng:[110.32350, 35.55681],
        xian:[108.664,34.061],
        shangluo:[109.978,33.746],
        ankang:[108.955,32.616],
        hanzhong:[107.052,33.198],*/
      },
      //气泡点击缩放至企业坐标
      geoCoordPoiEnt:{
        yulin:[109.62433,38.385433],
        yanan:[109.63924,36.571075],
        weinan:[109.55293,34.552948],
        tongchaun:[109.13754,35.139496],
        xianyang:[108.72476,34.393791],
        baoji:[106.98729,34.43483],
        xixian:[108.78576, 34.37971],
        yanglin:[108.00908, 34.35034],
        hancheng:[110.32350, 35.55681],
        xian:[108.58752,34.101285],
        shangluo:[109.978,33.746],
        ankang:[108.88501,32.811661],
        hanzhong:[107.03486,33.181648],
      },
      sxxjbjProLayer:null,
      xjsource:null,
      xjfeatures:null,
      nyyEntlWMTSLayer:null,
      nyyEntdanjiWMTSLayer:null,
      nyyEntroujiWMTSLayer:null,
      nyyEntnainiuWMTSLayer:null,
      nyyEntrouniuWMTSLayer:null,
      nyyEntshengjiWMTSLayer:null,
      //午夜蓝图
      wuyelantu:null,
      //天地图
      tdtImage:null,
      tdtImageAnno:null,


      poiLayerCount:0,
      poiVectorLayer:null,

      isShiJi: false,
      isXianJi: true,
      pflx: "fs",
      wrwlx: "hxxylpfl",
      DSJSXZDM: "610600",
      xjVectorSource:null,
      peiDSJSXZDM: "6106",
      legendData: "地膜使用情况（吨）",
      dmLegend:"地膜使用情况（吨）",
      gdLegend:"土地面积（万亩）",
      nysl:'农业源基本情况（484个）'
    };
  },
  methods: {
    async initdata(){
      var Params = {
        XZQDM: "6106",
      }
      await api.getNYYgengxinData(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          alert("更新完成，请刷新页面。")
        }
      });
    },
    async poiClickBigScreen(coor){
      this.resetPoiInfo();
      this.poiVisible = false;
      var coordinate = coor.coor;
      var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );
      //动态POI
      var DynamicPoiDiv = document.getElementById("DynamicPoi");
      this.DynamicPOI = null;
      this.DynamicPOI = new ol.Overlay({
          element: DynamicPoiDiv,
          positioning: 'center-center'
      });
      this.map.addOverlay(this.DynamicPOI);
      this.DynamicPOI.setPosition(coordinatePro);
      this.isDynamicPoiShow = true;
      this.map.getView().setCenter(coordinatePro);
      this.map.getView().setZoom(13);
      //当为企业坐标点时
      var coordinateLngLat = ol.proj.transform(coordinatePro, 'EPSG:3857' ,'EPSG:4326');
      var EnterpriseInfo = await this.queryNYYEntInfo(coordinateLngLat);

      this.getEntPoiInfo(EnterpriseInfo);

    },
    Openquery(){
      //lee 点击查询按钮
      //lee 显示查询框
      this.poiVisible = !this.poiVisible;
      //lee 绑定的mapbox
      this.mapProp = this.map;
    },
    async LoadDiShiPopup(){
      //加载地市点
      var dishiEntCountArr = {};
      if(this.radioFenLei == 1 && this.isQiYe){
        //dishiEntCountArr = await this.GetNYYDiShiEntCount('pcxqdm');
        //lee 测试
      // dishiEntCountArr = {"610600":[{"count":"0"}],"610602":[{"count":"199"}],"610603":[{"count":"62"}],"610621":[{"count":"77"}],"610622":[{"count":"55"}],"610623":[{"count":"92"}],"610625":[{"count":"103"}],"610626":[{"count":"70"}],"610627":[{"count":"66"}],"610628":[{"count":"69"}],"610629":[{"count":"66"}],"610630":[{"count":"49"}],"610631":[{"count":"25"}],"610632":[{"count":"82"}]};
          var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
              "610629","610630","610631","610632"];
          var person = new Object();
          for(var i=0;i<xzqharray.length;i++)
          {
              var count=new Array();
              count.push({"count":(parseInt(this.barDataYZC.DJData[i])+parseInt(this.barDataYZC.RJData[i])
                      +parseInt(this.barDataYZC.RNData[i])+
                      parseInt(this.barDataYZC.SZData[i])+parseInt(this.barDataYZC.NNData[i]))+""});
              person[xzqharray[i]]=count;
          }
          dishiEntCountArr =person;
      }
      if(this.radioFenLei == 2 && this.isQiYe){
        dishiEntCountArr = await this.GetFenLeiDiShiEntCount('pcxqdm','yzzl','4');
      }
      if(this.radioFenLei == 3 && this.isQiYe){
        dishiEntCountArr = await this.GetFenLeiDiShiEntCount('pcxqdm','yzzl','5');
      }
      if(this.radioFenLei == 4 && this.isQiYe){
        dishiEntCountArr = await this.GetFenLeiDiShiEntCount('pcxqdm','yzzl','2');
      }
      if(this.radioFenLei == 5 && this.isQiYe){
        dishiEntCountArr = await this.GetFenLeiDiShiEntCount('pcxqdm','yzzl','3');
      }
      if(this.radioFenLei == 6 && this.isQiYe){
        dishiEntCountArr = await this.GetFenLeiDiShiEntCount('pcxqdm','yzzl','1');
      }
      this.GetPoiFeature(dishiEntCountArr);
    },
    //获取分类地市企业数量
    async GetFenLeiDiShiEntCount(XZQfild,LeiXingName,LeiXingCode){
      var FenLeiDiShiEntCount = {};
      var Params = {
        tableName:"T_BAS_N101_1",
        leibiecode:LeiXingCode,
        leixingname:LeiXingName,
        xzqfild:XZQfild,
      }
      await api.QueryFenLeiDiShiEntCount(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            FenLeiDiShiEntCount = resultData.data;
          }
        }
      });
      return FenLeiDiShiEntCount;
    },
    //生成POIFeature
    GetPoiFeature(dishiEntCountArr){
      if(this.poiLayerCount == 1){
        this.map.removeLayer(this.poiVectorLayer);
        this.poiLayerCount = 0;
      }
      this.poiVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          projection: 'EPSG:4490'
        }),
      });
      this.poiVectorLayer.set('name','poiLayer');
      this.map.addLayer(this.poiVectorLayer);
      this.poiLayerCount = 1;
      for(var key in this.geoCoordMapNew){
        var keyName = key;
        if(keyName !== '610600'){

          var data = dishiEntCountArr[keyName];

          var coordinate = [this.geoCoordMapNew[key][0],this.geoCoordMapNew[key][1]];
          var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );
          var poiFeature = new ol.Feature(new ol.geom.Point(coordinatePro));
          poiFeature.set('name',keyName);
          poiFeature.set('count',data[0].count);
          poiFeature.set('lnglat',coordinatePro);
          var poiStyle1 = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 18,
              fill: new ol.style.Fill({
                color: '#038749'
              })
            }),
            text: new ol.style.Text({
              textAlign: 'center',            //位置
              textBaseline: 'middle',         //基准线
              font: 'bold 16px 微软雅黑',
              text: poiFeature.get('count'),      //文本内容
              fill: new ol.style.Fill({       //文本填充样式（即文字颜色)
                color: '#ffffff'
              }),
            })
          });
          if(data[0].count !== '0'){
            poiFeature.setStyle(poiStyle1);
            this.poiVectorLayer.getSource().addFeature(poiFeature);
          }
        }
      }
    },
    //获取地市企业数量
    async GetNYYDiShiEntCount(XZQfild){
      var DiShiEntCount = {};
      var Params = {
        tableName:"T_BAS_N101_1",
        xzqfild:XZQfild
      }
      await api.QueryDiShiEntCount(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            DiShiEntCount = resultData.data;
          }
        }
      });
      return DiShiEntCount;
    },


    SelectFenLei(){
      this.closePopup();
      this.removeNyyLayer();
      //this.addNyyLayer();
      this.LoadDiShiPopup();
      this.poiLayerCount = 1;
      this.map.getView().setZoom(8);
      var coordinate = [12149145.114081362, 4316266.289];
      this.map.getView().setCenter(coordinate);

      if(this.radioFenLei == 1){
        this.FieldWhere = "";
        /*this.closePopup();
        this.removeNyyLayer();
        //this.addNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */

      }
      else if(this.radioFenLei == 2){
        this.FieldWhere = " and t.yzzl = '4' ";
       /* this.closePopup();
        this.removeNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */

      }
      else if(this.radioFenLei == 3){
        this.FieldWhere = " and t.yzzl = '5' ";
        /*this.closePopup();
        this.removeNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */

      }
      else if(this.radioFenLei == 4){
        this.FieldWhere = " and t.yzzl = '2' ";
        /*this.closePopup();
        this.removeNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */

      }
      else if(this.radioFenLei == 5){
        this.FieldWhere = " and t.yzzl = '3' ";
        /*this.closePopup();
        this.removeNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */

      }
      else if(this.radioFenLei == 6){
        this.FieldWhere = " and t.yzzl = '1' ";
        /*this.closePopup();
        this.removeNyyLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);
        //this.map.addLayer(this.nyyEntshengjiWMTSLayer);*/
      }
    },
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
      this.map.getView().setZoom(8);
      // var coordinate = [12129470.527, 4255685.289];
      var coordinate = [12149145.114081362, 4316266.289];
      this.map.getView().setCenter(coordinate);
      if(this.radio == 1){
        this.poiVisible = false;
        this.isShowtoolBarquery = false;
        this.radioFenLei = 1;
        this.resetPoiInfo();
        this.isDiShi = true;
        this.isQiYe = false;
        this.removeNyyLayer();
        this.isShowEntFenLei=false;

        //lee 用不上，暂注释
        // this.changeToQuanSheng();
          this.created();
        this.map.removeLayer(this.poiVectorLayer);
        this.poiLayerCount = 0;
        // this.isShowGuanZhong = true;
      }
      else{

        this.isShowtoolBarquery = true;
        this.radioFenLei = 1;
        this.isDiShi = false;
        this.isQiYe = true;
        if(this.sjOverlayVectorSource){
          this.sjOverlayVectorSource.clear();
        }
        //this.addNyyLayer();
        this.isShowEntFenLei=true;
        //lee 暂注释
        // this.changeToQuanSheng();
          this.created();

/*        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.isShowGuanZhong = false;
      }
    },
    removeNyyLayer(){
      this.map.removeLayer(this.nyyEntlWMTSLayer);
      this.map.removeLayer(this.nyyEntdanjiWMTSLayer);
      this.map.removeLayer(this.nyyEntroujiWMTSLayer);
      this.map.removeLayer(this.nyyEntnainiuWMTSLayer);
      this.map.removeLayer(this.nyyEntrouniuWMTSLayer);
      this.map.removeLayer(this.nyyEntshengjiWMTSLayer);
    },
    addNyyLayer(){
      this.map.addLayer(this.nyyEntdanjiWMTSLayer);
      this.map.addLayer(this.nyyEntroujiWMTSLayer);
      this.map.addLayer(this.nyyEntnainiuWMTSLayer);
      this.map.addLayer(this.nyyEntrouniuWMTSLayer);
      this.map.addLayer(this.nyyEntshengjiWMTSLayer);
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
      var layerName = 'hkywry:nyypro';
      var gridsetName = 'EPSG:900913';
      var tileSource = new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: layerName,
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
      });
      this.nyyEntlWMTSLayer = new ol.layer.Tile({
        source: tileSource,
      });

      this.nyyEntdanjiWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: 'hkywry:nyydanjipro',
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
        }),
      });
      this.nyyEntroujiWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: 'hkywry:nyyroujipro',
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
        }),
      });
      this.nyyEntnainiuWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: 'hkywry:nyynainiupro',
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
        }),
      });
      this.nyyEntrouniuWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: 'hkywry:nyyrouniupro',
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
        }),
      });
      this.nyyEntshengjiWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: 'hkywry:nyyshengzhupro',
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
        }),
      });

    },

    OpenPicture(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/农业.jpg";
    },
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
        this.initMoveOverlayVectorLayer();
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

          //barDataLeftTopLeft,barDataLeftTopRight,barDataRightTopFeiShui,barDataRightCenterFeiQi,barDataRightBottomJieGan

          this.barDataLeftTopLeft = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
            yAxis: [ (parseFloat(this.barDataLeftTopLeftYuLin.yAxis[0])+ parseFloat(this.barDataLeftTopLeftYanAn.yAxis[0])).toFixed(2) ,
                    (parseFloat(this.barDataLeftTopLeftYuLin.yAxis[1] )+ parseFloat( this.barDataLeftTopLeftYanAn.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataLeftTopLeftYuLin.yAxis[2] )+ parseFloat( this.barDataLeftTopLeftYanAn.yAxis[2])).toFixed(2),
                    (parseFloat(this.barDataLeftTopLeftYuLin.yAxis[3] )+ parseFloat( this.barDataLeftTopLeftYanAn.yAxis[3])).toFixed(2),
                    (parseFloat(this.barDataLeftTopLeftYuLin.yAxis[4] )+ parseFloat( this.barDataLeftTopLeftYanAn.yAxis[4])).toFixed(2)],
          },
          this.barDataLeftTopRight = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
            yAxis: [ (parseFloat(this.barDataLeftTopRightYuLin.yAxis[0] )+ parseFloat( this.barDataLeftTopRightYanAn.yAxis[0])).toFixed(2) ,
                   (parseFloat(this.barDataLeftTopRightYuLin.yAxis[1] )+ parseFloat( this.barDataLeftTopRightYanAn.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightYuLin.yAxis[2] )+ parseFloat( this.barDataLeftTopRightYanAn.yAxis[2])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightYuLin.yAxis[3] )+ parseFloat( this.barDataLeftTopRightYanAn.yAxis[3])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightYuLin.yAxis[4] )+ parseFloat( this.barDataLeftTopRightYanAn.yAxis[4])).toFixed(2)],            
          },


        /* this.pieDataLeftTopNYY = {
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
        }; */

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
       /*  this.pieDataLeftTopNYY = {
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
        }; */


        this.barDataLeftTopLeft = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
            yAxis: [ (parseFloat(this.barDataLeftTopLeftBaoJi.yAxis[0] )+ parseFloat(this.barDataLeftTopLeftXiAn.yAxis[0])+ parseFloat(this.barDataLeftTopLeftXianYang.yAxis[0])+parseFloat(this.barDataLeftTopLeftXiXian.yAxis[0]) + parseFloat(this.barDataLeftTopLeftHanCheng.yAxis[0])+ parseFloat(this.barDataLeftTopLeftTongChuan.yAxis[0])+parseFloat(this.barDataLeftTopLeftYangLing.yAxis[0] )+ parseFloat(this.barDataLeftTopLeftWeiNan.yAxis[0])).toFixed(2),
                     (parseFloat(this.barDataLeftTopLeftBaoJi.yAxis[1] )+ parseFloat(this.barDataLeftTopLeftXiAn.yAxis[1])+ parseFloat(this.barDataLeftTopLeftXianYang.yAxis[1])+parseFloat(this.barDataLeftTopLeftXiXian.yAxis[1]) + parseFloat(this.barDataLeftTopLeftHanCheng.yAxis[1])+ parseFloat(this.barDataLeftTopLeftTongChuan.yAxis[1])+parseFloat(this.barDataLeftTopLeftYangLing.yAxis[1] )+ parseFloat(this.barDataLeftTopLeftWeiNan.yAxis[1])).toFixed(2),
                     (parseFloat(this.barDataLeftTopLeftBaoJi.yAxis[2] )+ parseFloat(this.barDataLeftTopLeftXiAn.yAxis[2])+ parseFloat(this.barDataLeftTopLeftXianYang.yAxis[2])+parseFloat(this.barDataLeftTopLeftXiXian.yAxis[2]) + parseFloat(this.barDataLeftTopLeftHanCheng.yAxis[2])+ parseFloat(this.barDataLeftTopLeftTongChuan.yAxis[2])+parseFloat(this.barDataLeftTopLeftYangLing.yAxis[2] )+ parseFloat(this.barDataLeftTopLeftWeiNan.yAxis[2])).toFixed(2),
                     (parseFloat(this.barDataLeftTopLeftBaoJi.yAxis[3] )+ parseFloat(this.barDataLeftTopLeftXiAn.yAxis[3])+ parseFloat(this.barDataLeftTopLeftXianYang.yAxis[3])+parseFloat(this.barDataLeftTopLeftXiXian.yAxis[3]) + parseFloat(this.barDataLeftTopLeftHanCheng.yAxis[3])+ parseFloat(this.barDataLeftTopLeftTongChuan.yAxis[3])+parseFloat(this.barDataLeftTopLeftYangLing.yAxis[3] )+ parseFloat(this.barDataLeftTopLeftWeiNan.yAxis[3])).toFixed(2),
                     (parseFloat(this.barDataLeftTopLeftBaoJi.yAxis[4] )+ parseFloat(this.barDataLeftTopLeftXiAn.yAxis[4])+ parseFloat(this.barDataLeftTopLeftXianYang.yAxis[4])+parseFloat(this.barDataLeftTopLeftXiXian.yAxis[4]) + parseFloat(this.barDataLeftTopLeftHanCheng.yAxis[4])+ parseFloat(this.barDataLeftTopLeftTongChuan.yAxis[4])+parseFloat(this.barDataLeftTopLeftYangLing.yAxis[4] )+ parseFloat(this.barDataLeftTopLeftWeiNan.yAxis[4])).toFixed(2),
            ]
          },

          this.barDataLeftTopRight = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
           yAxis: [ (parseFloat(this.barDataLeftTopRightBaoJi.yAxis[0] )+ parseFloat(this.barDataLeftTopRightXiAn.yAxis[0])+ parseFloat(this.barDataLeftTopRightXianYang.yAxis[0])+parseFloat(this.barDataLeftTopRightXiXian.yAxis[0]) + parseFloat(this.barDataLeftTopRightHanCheng.yAxis[0])+ parseFloat(this.barDataLeftTopRightTongChuan.yAxis[0])+parseFloat(this.barDataLeftTopRightYangLing.yAxis[0] )+ parseFloat(this.barDataLeftTopRightWeiNan.yAxis[0])).toFixed(2),
                   (parseFloat(this.barDataLeftTopRightBaoJi.yAxis[1] )+ parseFloat(this.barDataLeftTopRightXiAn.yAxis[1])+ parseFloat(this.barDataLeftTopRightXianYang.yAxis[1])+parseFloat(this.barDataLeftTopRightXiXian.yAxis[1]) + parseFloat(this.barDataLeftTopRightHanCheng.yAxis[1])+ parseFloat(this.barDataLeftTopRightTongChuan.yAxis[1])+parseFloat(this.barDataLeftTopRightYangLing.yAxis[1] )+ parseFloat(this.barDataLeftTopRightWeiNan.yAxis[1])).toFixed(2),
                   (parseFloat(this.barDataLeftTopRightBaoJi.yAxis[2] )+ parseFloat(this.barDataLeftTopRightXiAn.yAxis[2])+ parseFloat(this.barDataLeftTopRightXianYang.yAxis[2])+parseFloat(this.barDataLeftTopRightXiXian.yAxis[2]) + parseFloat(this.barDataLeftTopRightHanCheng.yAxis[2])+ parseFloat(this.barDataLeftTopRightTongChuan.yAxis[2])+parseFloat(this.barDataLeftTopRightYangLing.yAxis[2] )+ parseFloat(this.barDataLeftTopRightWeiNan.yAxis[2])).toFixed(2),
                   (parseFloat(this.barDataLeftTopRightBaoJi.yAxis[3] )+ parseFloat(this.barDataLeftTopRightXiAn.yAxis[3])+ parseFloat(this.barDataLeftTopRightXianYang.yAxis[3])+parseFloat(this.barDataLeftTopRightXiXian.yAxis[3]) + parseFloat(this.barDataLeftTopRightHanCheng.yAxis[3])+ parseFloat(this.barDataLeftTopRightTongChuan.yAxis[3])+parseFloat(this.barDataLeftTopRightYangLing.yAxis[3] )+ parseFloat(this.barDataLeftTopRightWeiNan.yAxis[3])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightBaoJi.yAxis[4] )+ parseFloat(this.barDataLeftTopRightXiAn.yAxis[4])+ parseFloat(this.barDataLeftTopRightXianYang.yAxis[4])+parseFloat(this.barDataLeftTopRightXiXian.yAxis[4]) + parseFloat(this.barDataLeftTopRightHanCheng.yAxis[4])+ parseFloat(this.barDataLeftTopRightTongChuan.yAxis[4])+parseFloat(this.barDataLeftTopRightYangLing.yAxis[4] )+ parseFloat(this.barDataLeftTopRightWeiNan.yAxis[4])).toFixed(2),
                  ]          
            },


        this.barDataRightTopFeiShui = {
          xAxis: ["化学需氧量",  "氨氮",     "总氮",       "总磷"],
          XQ: [
                (parseFloat(this.barDataYangLinFeiShui.XQ[0]) + parseFloat(this.barDataHanChengFeiShui.XQ[0])  + parseFloat(this.barDataXiXianFeiShui.XQ[0])  + parseFloat(this.barDataTongChuanFeiShui.XQ[0]) + parseFloat(this.barDataXiAnFeiShui.XQ[0])  + parseFloat(this.barDataXianYangFeiShui.XQ[0])  + parseFloat(this.barDataWeiNanFeiShui.XQ[0])  + parseFloat(this.barDataBaoJiFeiShui.XQ[0])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.XQ[1]) + parseFloat(this.barDataHanChengFeiShui.XQ[1])  + parseFloat(this.barDataXiXianFeiShui.XQ[1])  + parseFloat(this.barDataTongChuanFeiShui.XQ[1]) + parseFloat(this.barDataXiAnFeiShui.XQ[1])  + parseFloat(this.barDataXianYangFeiShui.XQ[1])  + parseFloat(this.barDataWeiNanFeiShui.XQ[1])  + parseFloat(this.barDataBaoJiFeiShui.XQ[1])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.XQ[2]) + parseFloat(this.barDataHanChengFeiShui.XQ[2])  + parseFloat(this.barDataXiXianFeiShui.XQ[2])  + parseFloat(this.barDataTongChuanFeiShui.XQ[2]) + parseFloat(this.barDataXiAnFeiShui.XQ[2])  + parseFloat(this.barDataXianYangFeiShui.XQ[2])  + parseFloat(this.barDataWeiNanFeiShui.XQ[2])  + parseFloat(this.barDataBaoJiFeiShui.XQ[2])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.XQ[3]) + parseFloat(this.barDataHanChengFeiShui.XQ[3])  + parseFloat(this.barDataXiXianFeiShui.XQ[3])  + parseFloat(this.barDataTongChuanFeiShui.XQ[3]) + parseFloat(this.barDataXiAnFeiShui.XQ[3])  + parseFloat(this.barDataXianYangFeiShui.XQ[3])  + parseFloat(this.barDataWeiNanFeiShui.XQ[3])  + parseFloat(this.barDataBaoJiFeiShui.XQ[3])).toFixed(2),
              ],
          SC: [
                (parseFloat(this.barDataYangLinFeiShui.SC[0]) + parseFloat(this.barDataHanChengFeiShui.SC[0])  + parseFloat(this.barDataXiXianFeiShui.SC[0])  +parseFloat(this.barDataTongChuanFeiShui.SC[0]) + parseFloat(this.barDataXiAnFeiShui.SC[0])  + parseFloat(this.barDataXianYangFeiShui.SC[0])  + parseFloat(this.barDataWeiNanFeiShui.SC[0])  + parseFloat(this.barDataBaoJiFeiShui.SC[0])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.SC[1]) + parseFloat(this.barDataHanChengFeiShui.SC[1])  + parseFloat(this.barDataXiXianFeiShui.SC[1])  +parseFloat(this.barDataTongChuanFeiShui.SC[1]) + parseFloat(this.barDataXiAnFeiShui.SC[1])  + parseFloat(this.barDataXianYangFeiShui.SC[1])  + parseFloat(this.barDataWeiNanFeiShui.SC[1])  + parseFloat(this.barDataBaoJiFeiShui.SC[1])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.SC[2]) + parseFloat(this.barDataHanChengFeiShui.SC[2])  + parseFloat(this.barDataXiXianFeiShui.SC[2])  +parseFloat(this.barDataTongChuanFeiShui.SC[2]) + parseFloat(this.barDataXiAnFeiShui.SC[2])  + parseFloat(this.barDataXianYangFeiShui.SC[2])  + parseFloat(this.barDataWeiNanFeiShui.SC[2])  + parseFloat(this.barDataBaoJiFeiShui.SC[2])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.SC[3]) + parseFloat(this.barDataHanChengFeiShui.SC[3])  + parseFloat(this.barDataXiXianFeiShui.SC[3])  +parseFloat(this.barDataTongChuanFeiShui.SC[3]) + parseFloat(this.barDataXiAnFeiShui.SC[3])  + parseFloat(this.barDataXianYangFeiShui.SC[3])  + parseFloat(this.barDataWeiNanFeiShui.SC[3])  + parseFloat(this.barDataBaoJiFeiShui.SC[3])).toFixed(2),

              ],
          ZZ: [
                (parseFloat(this.barDataYangLinFeiShui.ZZ[0]) + parseFloat(this.barDataHanChengFeiShui.ZZ[0])  + parseFloat(this.barDataXiXianFeiShui.ZZ[0])  + parseFloat(this.barDataTongChuanFeiShui.ZZ[0]) + parseFloat(this.barDataXiAnFeiShui.ZZ[0])  + parseFloat(this.barDataXianYangFeiShui.ZZ[0])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[0])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[0])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.ZZ[1]) + parseFloat(this.barDataHanChengFeiShui.ZZ[1])  + parseFloat(this.barDataXiXianFeiShui.ZZ[1])  + parseFloat(this.barDataTongChuanFeiShui.ZZ[1]) + parseFloat(this.barDataXiAnFeiShui.ZZ[1])  + parseFloat(this.barDataXianYangFeiShui.ZZ[1])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[1])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[1])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.ZZ[2]) + parseFloat(this.barDataHanChengFeiShui.ZZ[2])  + parseFloat(this.barDataXiXianFeiShui.ZZ[2])  + parseFloat(this.barDataTongChuanFeiShui.ZZ[2]) + parseFloat(this.barDataXiAnFeiShui.ZZ[2])  + parseFloat(this.barDataXianYangFeiShui.ZZ[2])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[2])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[2])).toFixed(2),
                (parseFloat(this.barDataYangLinFeiShui.ZZ[3]) + parseFloat(this.barDataHanChengFeiShui.ZZ[3])  + parseFloat(this.barDataXiXianFeiShui.ZZ[3])  +parseFloat(this.barDataTongChuanFeiShui.ZZ[3]) + parseFloat(this.barDataXiAnFeiShui.ZZ[3])  + parseFloat(this.barDataXianYangFeiShui.ZZ[3])  + parseFloat(this.barDataWeiNanFeiShui.ZZ[3])  + parseFloat(this.barDataBaoJiFeiShui.ZZ[3])).toFixed(2),
              ],
        };


        this.barDataRightCenterFeiQi = {
          xAxis: ["氨气",        "挥发性有机物"],
          ZZYD:  [
            (parseFloat(this.barDataYangLinZFeiQi.ZZYD[0]) + parseFloat(this.barDataXiXianZFeiQi.ZZYD[0]) + parseFloat(this.barDataHanChengZFeiQi.ZZYD[0]) + parseFloat(this.barDataTongChuanZFeiQi.ZZYD[0]) + parseFloat(this.barDataXiAnZFeiQi.ZZYD[0]) + parseFloat(this.barDataXianYangZFeiQi.ZZYD[0]) + parseFloat(this.barDataWeiNanZFeiQi.ZZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.ZZYD[0])).toFixed(2),
            (parseFloat(this.barDataYangLinZFeiQi.ZZYD[1]) + parseFloat(this.barDataXiXianZFeiQi.ZZYD[1]) + parseFloat(this.barDataHanChengZFeiQi.ZZYD[1]) +parseFloat(this.barDataTongChuanZFeiQi.ZZYD[1]) + parseFloat(this.barDataXiAnZFeiQi.ZZYD[1]) + parseFloat(this.barDataXianYangZFeiQi.ZZYD[1]) + parseFloat(this.barDataWeiNanZFeiQi.ZZYD[1]) + parseFloat(this.barDataBaoJiZFeiQi.ZZYD[1])).toFixed(2),
          ],
          YZYD:  [
            (parseFloat(this.barDataYangLinZFeiQi.YZYD[0]) + parseFloat(this.barDataXiXianZFeiQi.YZYD[0]) + parseFloat(this.barDataHanChengZFeiQi.YZYD[0]) + parseFloat(this.barDataTongChuanZFeiQi.YZYD[0]) + parseFloat(this.barDataXiAnZFeiQi.YZYD[0]) + parseFloat(this.barDataXianYangZFeiQi.YZYD[0]) + parseFloat(this.barDataWeiNanZFeiQi.YZYD[0]) + parseFloat(this.barDataBaoJiZFeiQi.YZYD[0])).toFixed(2),
            (parseFloat(this.barDataYangLinZFeiQi.YZYD[1]) + parseFloat(this.barDataXiXianZFeiQi.YZYD[1]) + parseFloat(this.barDataHanChengZFeiQi.YZYD[1]) +parseFloat(this.barDataTongChuanZFeiQi.YZYD[1]) + parseFloat(this.barDataXiAnZFeiQi.YZYD[1]) + parseFloat(this.barDataXianYangZFeiQi.YZYD[1]) + parseFloat(this.barDataWeiNanZFeiQi.YZYD[1]) + parseFloat(this.barDataBaoJiZFeiQi.YZYD[1])).toFixed(2),

          ],
          HFXYJW:  [
            (parseFloat(this.barDataYangLinZFeiQi.HFXYJW[0]) + parseFloat(this.barDataXiXianZFeiQi.HFXYJW[0]) + parseFloat(this.barDataHanChengZFeiQi.HFXYJW[0]) + parseFloat(this.barDataTongChuanZFeiQi.HFXYJW[0]) + parseFloat(this.barDataXiAnZFeiQi.HFXYJW[0]) + parseFloat(this.barDataXianYangZFeiQi.HFXYJW[0]) + parseFloat(this.barDataWeiNanZFeiQi.HFXYJW[0]) + parseFloat(this.barDataBaoJiZFeiQi.HFXYJW[0])).toFixed(2),
            (parseFloat(this.barDataYangLinZFeiQi.HFXYJW[1]) + parseFloat(this.barDataXiXianZFeiQi.HFXYJW[1]) + parseFloat(this.barDataHanChengZFeiQi.HFXYJW[1]) + parseFloat(this.barDataTongChuanZFeiQi.HFXYJW[1]) + parseFloat(this.barDataXiAnZFeiQi.HFXYJW[1]) + parseFloat(this.barDataXianYangZFeiQi.HFXYJW[0])+ parseFloat(this.barDataWeiNanZFeiQi.HFXYJW[1]) + parseFloat(this.barDataBaoJiZFeiQi.HFXYJW[1])).toFixed(2),

          ],
        };


        this.barDataRightBottomJieGan = {
          xAxis: ["理论资源量","可收集资源量","利用量"],
          yAxis: [
            (parseFloat(this.barYanLinJieGan.yAxis[0]) + parseFloat(this.barHanChengJieGan.yAxis[0]) + parseFloat(this.barXiXianJieGan.yAxis[0]) +parseFloat(this.barTongChuanJieGan.yAxis[0]) + parseFloat(this.barXiAnJieGan.yAxis[0]) + parseFloat(this.barXianYangJieGan.yAxis[0]) + parseFloat(this.barWeiNanJieGan.yAxis[0]) + parseFloat(this.barBaoJiJieGan.yAxis[0])).toFixed(2),
            (parseFloat(this.barYanLinJieGan.yAxis[1]) + parseFloat(this.barHanChengJieGan.yAxis[1]) + parseFloat(this.barXiXianJieGan.yAxis[1]) + parseFloat(this.barTongChuanJieGan.yAxis[1]) + parseFloat(this.barXiAnJieGan.yAxis[1]) + parseFloat(this.barXianYangJieGan.yAxis[1]) + parseFloat(this.barWeiNanJieGan.yAxis[1]) + parseFloat(this.barBaoJiJieGan.yAxis[1])).toFixed(2),
            (parseFloat(this.barYanLinJieGan.yAxis[2]) + parseFloat(this.barHanChengJieGan.yAxis[2]) + parseFloat(this.barXiXianJieGan.yAxis[2]) + parseFloat(this.barTongChuanJieGan.yAxis[2]) + parseFloat(this.barXiAnJieGan.yAxis[2]) + parseFloat(this.barXianYangJieGan.yAxis[2]) + parseFloat(this.barWeiNanJieGan.yAxis[2]) + parseFloat(this.barBaoJiJieGan.yAxis[2])).toFixed(2),
          ],
        };
      }
      else if(quyu == "shannan"){
       /*  this.pieDataLeftTopNYY = {
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
        }; */
        this.barDataLeftTopLeft = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
            yAxis: [ (parseFloat(this.barDataLeftTopLeftAnKang.yAxis[0]) + parseFloat(this.barDataLeftTopLeftShangLuo.yAxis[0])+ parseFloat(this.barDataLeftTopLeftHanZhong.yAxis[0])).toFixed(2) ,
                    (parseFloat(this.barDataLeftTopLeftAnKang.yAxis[1] ) + parseFloat(this.barDataLeftTopLeftShangLuo.yAxis[1]+ this.barDataLeftTopLeftHanZhong.yAxis[1])).toFixed(2),
                   ( parseFloat(this.barDataLeftTopLeftAnKang.yAxis[2] ) + parseFloat( this.barDataLeftTopLeftShangLuo.yAxis[2]+ this.barDataLeftTopLeftHanZhong.yAxis[2])).toFixed(2),
                    (parseFloat(this.barDataLeftTopLeftAnKang.yAxis[3] ) + parseFloat( this.barDataLeftTopLeftShangLuo.yAxis[3]+ this.barDataLeftTopLeftHanZhong.yAxis[3])).toFixed(2),
                    (parseFloat(this.barDataLeftTopLeftAnKang.yAxis[4] ) + parseFloat( this.barDataLeftTopLeftShangLuo.yAxis[4]+ this.barDataLeftTopLeftHanZhong.yAxis[4])).toFixed(2)],
          },
          this.barDataLeftTopRight = {
            xAxis: ["生猪","奶牛","肉牛", "蛋鸡","肉鸡"],
           yAxis: [ (parseFloat(this.barDataLeftTopRightAnKang.yAxis[0] ) + parseFloat(this.barDataLeftTopRightShangLuo.yAxis[0]+ this.barDataLeftTopRightHanZhong.yAxis[0])).toFixed(2) ,
                    (parseFloat(this.barDataLeftTopRightAnKang.yAxis[1] ) + parseFloat( this.barDataLeftTopRightShangLuo.yAxis[1]+ this.barDataLeftTopRightHanZhong.yAxis[1])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightAnKang.yAxis[2] ) + parseFloat( this.barDataLeftTopRightShangLuo.yAxis[2]+ this.barDataLeftTopRightHanZhong.yAxis[2])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightAnKang.yAxis[3] ) + parseFloat( this.barDataLeftTopRightShangLuo.yAxis[3]+ this.barDataLeftTopRightHanZhong.yAxis[3])).toFixed(2),
                    (parseFloat(this.barDataLeftTopRightAnKang.yAxis[4] ) + parseFloat( this.barDataLeftTopRightShangLuo.yAxis[4]+ this.barDataLeftTopRightHanZhong.yAxis[4])).toFixed(2)],            
          },
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
      this.legendData = this.dmLegend;
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
      this.legendData = this.gdLegend;
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
        xAxis: ["地膜使用量(万吨)",    "地膜累积残留量(万吨)"],
        yAxis: [ 23139.74,	13737.3826],
      },
      //全省耕种
      barDataGengZhong:{
        xAxis: ["耕地面积(万亩)",    "园地面积(万亩)"],
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
        xAxis: ["纸袋(亿个)",    "薄膜袋(亿个)"],
        SYL:    [ 7714414.87, 431798.69],
        HSL:    [ 3714017.66, 417149.08],
      },
      //全省陕西特色农药
      barDataNongYao:{
        xAxis: ["瓶装(万)",    "袋装(万)",  "桶装(万)","气雾罐(万)","其他(万)"],
        SYL:    [ 3674.85, 	3766.41, 	15.35, 	21.41, 	29.23 ],
        HSL:    [ 104.61, 	139.58, 	2.86, 	2.14, 	3.06 ],
      },
      //全省陕西特色化肥
      barDataHuaFei:{
        xAxis: ["聚酯类(万)", "袋装(万)", "桶装(万)", "其他(万)"],
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
      var coordinate = [parseFloat(0.0), parseFloat(0.0)];
      var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );

      if(this.DynamicPOI != null){
        this.DynamicPOI.setPosition(coordinatePro);
      }
      if(this.Popup != null){
        this.Popup.setPosition(coordinatePro);
      }
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
      this.Popup = null;
      this.Popup = new ol.Overlay({
          element : element,
          positioning: 'bottom-center',
          stopEvent:false,
          offset:[0,-50]
      });
      this.map.addOverlay(this.Popup);

      //动态POI
      var DynamicPoiDiv = document.getElementById("DynamicPoi");
      this.DynamicPOI = null;
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
    initMoveOverlayVectorLayer(){
      var that = this;
      if(that.map){
        if(that.moveOverlayVectorSource == null){
          that.moveOverlayVectorSource = new ol.source.Vector();
          var vectorLayer = new ol.layer.Vector({
            source: that.moveOverlayVectorSource,
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
      console.log('that.autoRefreshSj',that.autoRefreshSj);
      console.log('sjCorrdinate[that.autoRefreshSj]',sjCorrdinate[that.autoRefreshSj]);
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
              center: [12149145.114081362, 4316266.289],
              zoom: 8
            })
        });
      //this.map.on('singleclick', this.onMapSelectHandler);
      this.map.on('singleclick', this.onMapSingleSelHandler);
      this.map.on('pointermove', this.onMapMoveHandler);
      this.map.on('moveend', this.onMapZoomHandler);

    },
    onMapMoveHandler(e){
      //鼠标悬停到相关区县高亮
      var that = this;
      // 清除选择要素的样式
      if(that.moveOverlayVectorSource){
        that.moveOverlayVectorSource.clear();
      }else{
        return;
      }

      var selFeature = null;
      if(that.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(e.coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
        }
      }
      else if(that.xjVectorSource && this.isXianJi){
        var features = that.xjVectorSource.getFeaturesAtCoordinate(e.coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
        }
      }
      // 设置选中样式
      if(selFeature){

        //当显示聚合数字时，悬停不显示区县名称，否则会丑
        var text = "";
        if(this.isDiShi || (this.map.getView().getZoom() >8)){
          text = selFeature.N.NAME;
        }

        document.getElementById("textXZQ").innerHTML=selFeature.N.NAME;

        var style = new ol.style.Style({
          // fill: new ol.style.Fill({color: "rgba(33,160,130,0.3)"}),
          fill: new ol.style.Fill({color: "rgba(9,112,167,0.7)"}),
          text:new ol.style.Text({
            textAlign:'center',
            textBaseline:'middle',
            font:"bold 16px 微软雅黑",
            // text:selFeature.N.NAME,
            text:text,
            fill:new ol.style.Fill({
              color:'#ffffff'
            })
          }),
          //stroke: new ol.style.Stroke({color: 'rgba(255, 204, 0, 0.8)', width: 2})
          // stroke: new ol.style.Stroke({color: '#ffaa33', width: 2})
        })
        var styleNotShow = new ol.style.Style({
          fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
          stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
        });

        //企业界面不显示hover图层
        if(this.isDiShi){
          selFeature.setStyle(style);
        }
        else{
          selFeature.setStyle(styleNotShow);
        }
        // selFeature.setStyle(style);
        that.moveOverlayVectorSource.addFeature(selFeature);
      }
      else{
        document.getElementById("textXZQ").innerHTML="";
      }


    },
    //刷新
    created() {
      this.getNYYYanAnchart();
      this.getNYYXZQchart("610600");//测试数据610602
      // this.getNYYHychart( "6106","fs","hxxylpfl");//测试数据 610602，fs,hxxylpfl;
    },
    async onMapSingleSelHandler(e){
      console.log("鼠标点击",e)
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
      var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
      //当为气泡时
      if(zoom <9){
        var feature = this.map.forEachFeatureAtPixel(
          e.pixel,
          function (feature) {
            return feature;
          },
          {
            layerFilter: function (layer) {
              return layer.get('name') === 'poiLayer';
            }
          }
        );
        if(feature){
         /*  var name = feature.get('name');
          var lnglat = this.geoCoordPoiEnt[name];
          var LngLatPro = ol.proj.transform(lnglat, 'EPSG:4326' ,'EPSG:3857');
          //console.log('name',name,'LngLatPro',LngLatPro,'LngLat',feature.get('lnglat'));
          this.map.getView().setZoom(9);
          this.map.getView().setCenter(LngLatPro);
          //this.map.getView().setCenter(feature.get('lnglat'));*/

          this.map.getView().setZoom(10);
          this.map.getView().setCenter(e.coordinate);
        }
      }
      else{
        //当为企业坐标点时
        var coordinateLngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
        var EnterpriseInfo = await this.queryNYYEntInfo(coordinateLngLat);
        this.resetPoiInfo();
        this.getEntPoiInfo(EnterpriseInfo);
      }
    },
    getEntPoiInfo(EnterpriseInfo){
      var that = this;
      var lng = EnterpriseInfo.lng;
      var lat = EnterpriseInfo.lat;
      var coordinate = [parseFloat(lng), parseFloat(lat)];
      var coordinatePro = ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:3857' );
      //初始化poiPopup
      var element = document.getElementById("poiPopup");
      this.Popup = null;
      this.Popup = new ol.Overlay({
          element : element,
          positioning: 'bottom-center',
          stopEvent:false,
          offset:[0,-50]
      });
      this.map.addOverlay(this.Popup);

      //动态POI
      var DynamicPoiDiv = document.getElementById("DynamicPoi");
      this.DynamicPOI = null;
      this.DynamicPOI = new ol.Overlay({
          element: DynamicPoiDiv,
          positioning: 'center-center'
      });
      this.map.addOverlay(this.DynamicPOI);
      this.DynamicPOI.setPosition(coordinatePro);
      //this.isDynamicPoiShow = true;

      //打开PopUp
      var popContent = document.getElementById("popContent");
      popContent.innerHTML = "";
      popContent.innerHTML += "<span class = 'poiText' >企业名称：" + EnterpriseInfo.name + "</span>";
      popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";
      //
      if(EnterpriseInfo.CLL != 0 && EnterpriseInfo.CLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >存栏量：" + EnterpriseInfo.CLL + "(头(羽))</span>";
      if(EnterpriseInfo.SYZQ != 0 && EnterpriseInfo.SYZQ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >饲养周期：" + EnterpriseInfo.SYZQ + "(天)</span>";
      if(EnterpriseInfo.YZCGL != 0 && EnterpriseInfo.YZCGL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >拥有锅炉量：" + EnterpriseInfo.YZCGL + "(台)</span>";
      if(EnterpriseInfo.LXFS_LX != 0 && EnterpriseInfo.LXFS_LX != 'null')
      popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXFS_LX + "</span>";
      if(EnterpriseInfo.LXFS_DHHM != 0 && EnterpriseInfo.LXFS_DHHM != 'null')
      popContent.innerHTML += "<span class = 'poiText' >电话号码：" + EnterpriseInfo.LXFS_DHHM + "</span>";
      if(EnterpriseInfo.NF != 0 && EnterpriseInfo.NF != 'null')
      popContent.innerHTML += "<span class = 'poiText' >年份：" + EnterpriseInfo.NF + "</span>";
      if(EnterpriseInfo.QSJZMJ != 0 && EnterpriseInfo.QSJZMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >圈舍建筑面积：" + EnterpriseInfo.QSJZMJ + "(平方米)</span>";
      if(EnterpriseInfo.SZNCLL != 0 && EnterpriseInfo.SZNCLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >生猪全年出栏量：" + EnterpriseInfo.SZNCLL + "(头)</span>";
      if(EnterpriseInfo.NNCLL != 0 && EnterpriseInfo.NNCLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >奶牛年末存栏量：" + EnterpriseInfo.NNCLL + "(头)</span>";
      if(EnterpriseInfo.RNNCLL != 0 && EnterpriseInfo.RNNCLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >肉牛全年出栏量：" + EnterpriseInfo.RNNCLL + "(头)</span>";
      if(EnterpriseInfo.DJCLL != 0 && EnterpriseInfo.DJCLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >蛋鸡年末存栏量：" + EnterpriseInfo.DJCLL + "(头)</span>";
      if(EnterpriseInfo.RJNCLL != 0 && EnterpriseInfo.RJNCLL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >肉鸡全年出栏量：" + EnterpriseInfo.RJNCLL + "(头)</span>";
      if(EnterpriseInfo.WSCSL != 0 && EnterpriseInfo.WSCSL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >污水产生量：" + EnterpriseInfo.WSCSL + "(吨/年)</span>";
      if(EnterpriseInfo.WSLYL != 0 && EnterpriseInfo.WSLYL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >污水利用量：" + EnterpriseInfo.WSLYL + "(吨/年)</span>";
      if(EnterpriseInfo.FBSJL != 0 && EnterpriseInfo.FBSJL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >粪便收集量：" + EnterpriseInfo.FBSJL + "(吨/年)</span>";
      if(EnterpriseInfo.FBLYL != 0 && EnterpriseInfo.FBLYL != 'null')
      popContent.innerHTML += "<span class = 'poiText' >粪便利用量：" + EnterpriseInfo.FBLYL + "(吨/年)</span>";
      if(EnterpriseInfo.NTMJ != 0 && EnterpriseInfo.NTMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >农田面积：" + EnterpriseInfo.NTMJ + "(亩)</span>";
      if(EnterpriseInfo.DTZWMJ != 0 && EnterpriseInfo.DTZWMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >大田作物面积：" + EnterpriseInfo.DTZWMJ + "(亩)</span>";
      if(EnterpriseInfo.DTZWXM != 0 && EnterpriseInfo.DTZWXM != 'null')
      popContent.innerHTML += "<span class = 'poiText' >小麦面积：" + EnterpriseInfo.DTZWXM + "(亩)</span>";
      if(EnterpriseInfo.DTZWYM != 0 && EnterpriseInfo.DTZWYM != 'null')
      popContent.innerHTML += "<span class = 'poiText' >玉米面积：" + EnterpriseInfo.DTZWYM + "(亩)</span>";
      if(EnterpriseInfo.DTZWSD != 0 && EnterpriseInfo.DTZWSD != 'null')
      popContent.innerHTML += "<span class = 'poiText' >水稻面积：" + EnterpriseInfo.DTZWSD + "(亩)</span>";
      if(EnterpriseInfo.DTZWGZ != 0 && EnterpriseInfo.DTZWGZ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >谷子面积：" + EnterpriseInfo.DTZWGZ + "(亩)</span>";
      if(EnterpriseInfo.DTZWQTZW != 0 && EnterpriseInfo.DTZWQTZW != 'null')
      popContent.innerHTML += "<span class = 'poiText' >大田其他作物面积：" + EnterpriseInfo.DTZWQTZW + "(亩)</span>";
      if(EnterpriseInfo.SCMJ != 0 && EnterpriseInfo.SCMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >蔬菜面积：" + EnterpriseInfo.SCMJ + "(亩)</span>";
      if(EnterpriseInfo.JJZWMJ != 0 && EnterpriseInfo.JJZWMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >经济作物面积：" + EnterpriseInfo.JJZWMJ + "(亩)</span>";
      if(EnterpriseInfo.GYMJ != 0 && EnterpriseInfo.GYMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >果园面积：" + EnterpriseInfo.GYMJ + "(亩)</span>";
      if(EnterpriseInfo.CDMJ != 0 && EnterpriseInfo.CDMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >草地面积：" + EnterpriseInfo.CDMJ + "(亩)</span>";
      if(EnterpriseInfo.LDMJ != 0 && EnterpriseInfo.LDMJ != 'null')
      popContent.innerHTML += "<span class = 'poiText' >林地面积：" + EnterpriseInfo.LDMJ + "(亩)</span>";


      that.Popup.setPosition(coordinatePro);
      that.isPopupShow = true;
      this.map.updateSize();

    },
    //查询养殖场基本信息
    async queryNYYEntInfo(coordinateLngLat){
      var EntInfo = {};
      var tolerance=10*this.map.getView().getResolution();
      var Params = {
        coor: coordinateLngLat.toString(),
          tolerance:tolerance
      }
      await api.QueryNYYEntInfo(Params).then(res=>{
        console.log("养殖厂信息111",res);
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){

              var InfoData = resultData.data.Info[0];
              console.log("养殖厂信息",InfoData);
              EntInfo.name = InfoData.YZCMC;
              var lng = this.DuFenMiaoToDu(InfoData.QYDLWZ_JD_DU,InfoData.QYDLWZ_JD_FEN,InfoData.QYDLWZ_JD_MIAO);
              var lat = this.DuFenMiaoToDu(InfoData.QYDLWZ_WD_DU,InfoData.QYDLWZ_WD_FEN,InfoData.QYDLWZ_WD_MIAO);
              EntInfo.lng = lng;
              EntInfo.lat = lat;
              EntInfo.FK_ID = InfoData.FK_ID;
              EntInfo.TYSHXYDM = InfoData.TYSHXYDM;
              EntInfo.QYFRDM = InfoData.QYFRDM;
              EntInfo.YZCGL = InfoData.YZCGL;
              EntInfo.LXFS_LX = InfoData.LXFS_LX;
              EntInfo.LXFS_DHHM = InfoData.LXFS_DHHM;
            }
        }
      });


      var ParamsJiBen = {
        FK_ID: EntInfo.FK_ID,
      }
      await api.QueryNYYEntJiBenInfo(ParamsJiBen).then(res=>{
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){

              var InfoData = resultData.data.NongYeYuan[0];

              EntInfo.CLL = InfoData.CLL;
              EntInfo.SYZQ = InfoData.SYZQ;

            }
        }
      });


      var ParamsXX = {
        name: EntInfo.name,
        tyshxydm: EntInfo.TYSHXYDM,
        qyfrdm: EntInfo.QYFRDM,
      }
      await api.QueryNYYEntXXInfo(ParamsXX).then(res=>{
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
              console.log("养殖厂基本详细",resultData.data);
              var InfoData = resultData.data.NongYeYuanXX[0];

              EntInfo.NF = InfoData.NF;
              EntInfo.QSJZMJ = InfoData.QSJZMJ;
              EntInfo.SZNCLL = InfoData.SZNCLL;
              EntInfo.NNCLL = InfoData.NNCLL;
              EntInfo.RNNCLL = InfoData.RNNCLL;
              EntInfo.DJCLL = InfoData.DJCLL;
              EntInfo.RJNCLL = InfoData.RJNCLL;
              EntInfo.WSCSL = InfoData.WSCSL;
              EntInfo.WSLYL = InfoData.WSLYL;
              EntInfo.FBSJL = InfoData.FBSJL;
              EntInfo.FBLYL = InfoData.FBLYL;
              EntInfo.NTMJ = InfoData.NTMJ;
              EntInfo.DTZWMJ = InfoData.DTZWMJ;
              EntInfo.DTZWXM = InfoData.DTZWXM;
              EntInfo.DTZWYM = InfoData.DTZWYM;
              EntInfo.DTZWSD = InfoData.DTZWSD;
              EntInfo.DTZWGZ = InfoData.DTZWGZ;
              EntInfo.DTZWQTZW = InfoData.DTZWQTZW;
              EntInfo.SCMJ = InfoData.SCMJ;
              EntInfo.JJZWMJ = InfoData.JJZWMJ;
              EntInfo.GYMJ = InfoData.GYMJ;
              EntInfo.CDMJ = InfoData.CDMJ;
              EntInfo.LDMJ = InfoData.LDMJ;


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


      if(zoom >= 8){

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

      if(this.isQiYe){
        if(zoom >= 9){
          if(this.poiLayerCount ==1){
            if(this.radioFenLei == 1){
              this.addNyyLayer();
            }

            if(this.radioFenLei == 2){
              this.map.addLayer(this.nyyEntdanjiWMTSLayer);
            }
            if(this.radioFenLei == 3){
              this.map.addLayer(this.nyyEntroujiWMTSLayer);
            }
            if(this.radioFenLei == 4){
              this.map.addLayer(this.nyyEntnainiuWMTSLayer);
            }
            if(this.radioFenLei == 5){
              this.map.addLayer(this.nyyEntrouniuWMTSLayer);
            }
            if(this.radioFenLei == 6){
              this.map.addLayer(this.nyyEntshengjiWMTSLayer);
            }

            this.map.removeLayer(this.poiVectorLayer);

            console.log('删除poi');
            this.poiLayerCount = 0;

          }
        }
        else{
          if(zoom < 9){
            if(this.poiLayerCount ==0){
              this.closePopup();
              this.removeNyyLayer();
              this.LoadDiShiPopup();
              console.log('添加poi');
              this.poiLayerCount = 1;
            }
          }
        }
      }
      //  lee 市县切换
      else if(this.isDiShi){
        if(zoom >= 8){
          this.isShiJi=false;
          this.isXianJi=true;
        }
        else{
          this.isShiJi=true;
          this.isXianJi=false;
        }

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
        var extent = ol.extent.boundingExtent(that.xjfeatures[i].getGeometry().getCoordinates()[0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
        var center = ol.extent.getCenter(extent);   //获取边界区域的中心位置
        center = ol.proj.transform(center,'EPSG:3857','EPSG:4326');
        var XZQHDM = that.xjfeatures[i].N.PAC;
        this.geoCoordMapNew[XZQHDM] = center;
      }

      that.xjVectorSource = new ol.source.Vector({
        features:that.xjfeatures
      });

      that.sxxjbjProLayer = new ol.layer.Vector({
        source: that.xjVectorSource,
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
      if(that.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
        }
      }
      else if(that.xjVectorSource && this.isXianJi){
        var features = that.xjVectorSource.getFeaturesAtCoordinate(coordinate);
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
/*      var DSJSXZDM = "";
      if(selFeature){
        DSJSXZDM = selFeature.N.BZ;
        console.log(DSJSXZDM);
      }

      if(DSJSXZDM!=""){
        that.refreshWRYEchart(DSJSXZDM);
      }
      else{
        this.changeToQuanSheng();
      }*/
      //获取行政区划代码
      if(selFeature){
        this.DSJSXZDM = selFeature.N.PAC;
        if(this.isShiJi){
          this.peiDSJSXZDM = "6106";
        }
        else if(this.isXianJi){
          this.peiDSJSXZDM = selFeature.N.PAC;
        }
      }
      else
      {
          this.peiDSJSXZDM = "6106";
          this.DSJSXZDM ="610600";
      }
      this.getNYYYanAnchart();
      this.getNYYXZQchart(this.DSJSXZDM);//测试数据610602
      // this.getNYYHychart( this.peiDSJSXZDM,this.pflx,this.wrwlx);//测试数据 610602，fs,hxxylpfl;

    },
    //zjw 获取延安市整体数据
/*    async getNYYYanAnchart(){
      var Params = {
        xzqdm: "6106",
      }
      await api.getNYYYanAnchart(Params).then(res=>{
        var resultData = res.data;
        // console.log('getNYYYanAnchart resultData',JSON.stringify(resultData));
        console.log('getNYYYanAnchart resultData',resultData);
        if(resultData){
          if(resultData.status == "success"){
            // this.barDataLeftBottom_DiShi = resultData.data.grid03;
            this.barDataYZC= resultData.data.grid04;
            this.nysl="农业源基本情况（"+resultData.data.grid04.all+"个）";
/!*            this.glsl="工业锅炉"+resultData.data.grid03.all+"台";
            this.gyqyzt="工业企业状态统计"+resultData.data.grid04.all+"个";*!/
          }
        }
      });
    },*/
    async getNYYYanAnchart(){
      var Params = {
        XZQDM: "init",
      }
      await api.getNYYgengxinCacheData(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            this.barDataYZC= resultData.data.grid04;
            this.nysl="农业源基本情况（"+resultData.data.grid04.all+"个）";
          }
        }
      });
    },
    //zjw 获取点击变化数据
/*    async getNYYXZQchart(xzqdm){
      var Params = {
        xzqdm: xzqdm,
      }
      await api.getNYYXZQchart(Params).then(res=>{
        var resultData = res.data;
        // console.log('getNYYXZQchart resultData',JSON.stringify(resultData));
        console.log('getNYYXZQchart resultData',resultData);

        if(resultData){
          if(resultData.status == "success"){
            this.barDataLeftTopLeft=resultData.data.grid01_L;
            this.barDataLeftTopRight=resultData.data.grid01_R;
            this.barDataDiMo=resultData.data.grid02_DM;
            this.barDataGengZhong=resultData.data.grid02_GD;
            this.barDataRightTopFeiShui=resultData.data.grid05;
            this.barDataRightCenterFeiQi=resultData.data.grid06;
            this.barDataRightBottomJieGan=resultData.data.grid07;

            this.barDataLeftBottom = this.isDiMo == true ? this.barDataDiMo : this.barDataGengZhong;
            console.log('resultData.data.grid05废水',JSON.stringify(resultData.data.grid05));
          }
        }
      });
    },*/

    async getNYYXZQchart(xzqdm){

      var Params = {
        XZQDM: xzqdm,
      }
      await api.getNYYgengxinCacheData(Params).then(res=>{
        var resultData = res.data;
        // console.log('getNYYXZQchart resultData',JSON.stringify(resultData));
        console.log('getNYYXZQchart resultData',resultData);
        if(resultData){
          if(resultData.status == "success"){
            this.barDataLeftTopLeft=resultData.data.grid01_L;
            this.barDataLeftTopRight=resultData.data.grid01_R;
            this.barDataDiMo=resultData.data.grid02_DM;
            this.barDataGengZhong=resultData.data.grid02_GD;
            this.barDataRightTopFeiShui=resultData.data.grid05;
            this.barDataRightCenterFeiQi=resultData.data.grid06;
            this.barDataRightBottomJieGan=resultData.data.grid07;

            this.barDataLeftBottom = this.isDiMo == true ? this.barDataDiMo : this.barDataGengZhong;
            console.log('resultData.data.grid05废水',JSON.stringify(resultData.data.grid05));
          }
        }
      });
    },

    //zjw获取扇形数据
    async getNYYHychart(xzqdm,pflx,wrwlx){
      var Params = {
        xzqdm: xzqdm,
        pflx:pflx,
        wrwlx:wrwlx
      }
      await api.getNYYHychart(Params).then(res=>{
        var resultData = res.data;
        console.log('getNYYHychart resultData',resultData);
        if(resultData){
          if(resultData.status == "success"){
            this.pieDataLeftCenter=resultData.data.grid02;
          }
        }
      });
    },
    changeToQuanSheng(){
      //未选中行政区
      this.barDataLeftTopLeft = this.barDataLeftTopLeftQuanSheng;
      this.barDataLeftTopRight = this.barDataLeftTopRightQuanSheng;

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

        this.barDataLeftTopLeft = this.barDataLeftTopLeftYuLin;
        this.barDataLeftTopRight = this.barDataLeftTopRightYuLin;


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

        this.barDataLeftTopLeft = this.barDataLeftTopLeftYanAn;
        this.barDataLeftTopRight = this.barDataLeftTopRightYanAn;

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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftWeiNan;
        this.barDataLeftTopRight = this.barDataLeftTopRightWeiNan;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftTongChuan;
        this.barDataLeftTopRight = this.barDataLeftTopRightTongChuan;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftXianYang;
        this.barDataLeftTopRight = this.barDataLeftTopRightXianYang;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftBaoJi;
        this.barDataLeftTopRight = this.barDataLeftTopRightBaoJi;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftXiAn;
        this.barDataLeftTopRight = this.barDataLeftTopRightXiAn;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftShangLuo;
        this.barDataLeftTopRight = this.barDataLeftTopRightShangLuo;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftAnKang;
        this.barDataLeftTopRight = this.barDataLeftTopRightAnKang;
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
        this.barDataLeftTopLeft = this.barDataLeftTopLeftHanZhong;
        this.barDataLeftTopRight = this.barDataLeftTopRightHanZhong;

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
        //西咸
        console.log("西咸");
        this.pieDataLeftTopNYY = this.pieDataXiXianGMS;
        this.pieDataLeftCenterNYY = this.pieDataXiXianGMX;
        this.barDataLeftTopLeft = this.barDataLeftTopLeftXiXian;
        this.barDataLeftTopRight = this.barDataLeftTopRightXiXian;

        this.barDataRightTopFeiShui = this.barDataXiXianFeiShui;
        this.barDataRightCenterFeiQi = this.barDataXiXianZFeiQi;
        this.barDataRightBottomJieGan = this.barXiXianJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataXiXianDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataXiXianGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataXiXianWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataXiXianShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataXiXianNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataXiXianHuaFei;
        }


      }
      else if(DSJSXZDM=='611400'){
        //杨凌
        console.log("杨凌");//pieDataHanChengGMX,pieDataYangLinGMX,pieDataXiXianGMX
        this.pieDataLeftTopNYY = this.pieDataYangLinGMS;
        this.pieDataLeftCenterNYY = this.pieDataYangLinGMX;
        this.barDataLeftTopLeft = this.barDataLeftTopLeftYangLing;
        this.barDataLeftTopRight = this.barDataLeftTopRightYangLing;

        this.barDataRightTopFeiShui = this.barDataYangLinFeiShui;
        this.barDataRightCenterFeiQi = this.barDataYangLinZFeiQi;
        this.barDataRightBottomJieGan = this.barYanLinJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataYanLinDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataYanLinGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataYangLinWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataYanLinShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataYanLinNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataYanLinHuaFei;
        }


      }
      else if(DSJSXZDM=='611500'){
        //韩城
        console.log("韩城");

        this.pieDataLeftTopNYY = this.pieDataHanChengGMS;
        this.pieDataLeftCenterNYY = this.pieDataHanChengGMX;
        this.barDataLeftTopLeft = this.barDataLeftTopLeftHanCheng;
        this.barDataLeftTopRight = this.barDataLeftTopRightHanCheng;

        this.barDataRightTopFeiShui = this.barDataHanChengFeiShui;
        this.barDataRightCenterFeiQi = this.barDataHanChengZFeiQi;
        this.barDataRightBottomJieGan = this.barHanChengJieGan;
        if(this.isDiMo){
          this.barDataLeftBottom = this.barDataHanChengDiMo;
          }
        if(this.isGengZhong){
          this.barDataLeftBottom = this.barDataHanChengGengZhong;
        }
        if(this.isShuiChan){
          this.barDataLeftBottom = this.pieDataHanChengWF;
        }
        if(this.isShuiGuo){
          this.barDataLeftBottom1 = this.barDataHanChengShuiGuo;
        }
        if(this.isNongYao){
          this.barDataLeftBottom1 = this.barDataHanChengNongYao;
        }
        if(this.isHuaFei){
          this.barDataLeftBottom1 = this.barDataHanChengHuaFei;
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
      console.log('that.ADLayer',that.ADLayer);
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
    this.loadGeoWMTSLayer();

    this.LoadDiShiPopup();
    //刷新页面
    this.created();
  },
  components: {
    PoiLocation,
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
    ImageDiv,
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

/*.left-bar {
  .NewBox1 {
    flex: 1;
    margin-top: 0 !important;
    margin-bottom: -12px;
    &:last-child {
      margin: 0;
    }
  }
  .NewBox1:nth-child(1){
     flex: 1;
     height: 25% !important;
  }
  .NewBox1:nth-child(2){
    flex: 1;
    height: 25% !important;
  }
  .NewBox1:nth-child(3){
    flex: 1;
    height: 25% !important;
  }
  !*
  .box1{
    height: 39%;
  }
  .box2{
    height: 59%;
  }
  *!
}*/
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
      .toolBarquery{
        position: absolute;
        top: 15px;
        //right: -20px;
        right: -75px;
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
    .toolBarquery2{
      .el-button:focus{
        background: #102b38;
        border: 1px solid #2d9690;
        color: #FFF;
      }
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




        .toolBarRadioFenLei{
      position: absolute;
      bottom:80px;
      right: 200px;
    }

    .toolBarRadioFenLei /deep/ .el-radio{
      margin-right: 7px !important;
    }

    .toolBarRadioFenLei /deep/ .el-radio__inner {
      background: #fff;
      border-color: #fff;
    }
    .toolBarRadioFenLei /deep/ .el-radio__label {
      color: #fff;
      font-size:18px;
    }

    .toolBarRadioFenLei /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #0b9e97 !important;
    }
    .toolBarRadioFenLei /deep/ .el-radio__input.is-checked .el-radio__inner {
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
.right-bar{
  .NewBox1 {
    flex: 1;
    //height: 30% !important;
    margin-top: 0 !important;
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  .NewBox1:nth-child(1){
    flex: 1;
    height: 25% !important;
  }
  .Box:nth-child(2){
    flex: 1;
    height: 25% !important;
  }
  .NewBox1:nth-child(3){
    flex: 1;
    height: 25% !important;
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
      margin-top: 10px;
      font-size:16px;
      font-family: "微软雅黑";
      min-width: 270px;
      max-height: 400px;
      overflow: auto;
  }

  .pop-content::-webkit-scrollbar{
    height: 6px;
    width: 13px;
  }

  .pop-content::-webkit-scrollbar-thumb{
    background-color: rgba(42, 136, 136, 0.5);
  }

  .pop-content::-webkit-scrollbar-track{
    border-radius: 0px;
  }

  .pop-content::-webkit-scrollbar-corner {
    background-color: rgba(42, 136, 136, 0.0);
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
  .left-top, {
    height:32.6%;
    margin-bottom: 0px;
    .left-top-content{
      height:90%;
      width:100%;
      margin-left:10px;
      margin-top:0px;
    }
  }
  .left-middle{
    height:32.6%;
  }
  .left-top-double{
    height:32.6%;
  }
/*  .left-top1{
    height:32.6%;
    margin-bottom: 12px;
    .left-top1-content{
      height:95%;
      width:90%;
      margin-left:10px;
      margin-top:0px;
    }
  }*/

  .left-bottom{
    height:32.6%;
    margin-top:12px;
/*    .leftBtn{
      margin-top: 2px;
      margin-left: 40px;
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

    }*/
    .leftBtn{
      margin-top: 0px;
      margin-left: 10px;
      /deep/ .el-radio-button__inner {
        width: 55px;
        height: 28px;
        border-radius: 4px 0px 0px 4px;
        border: 1px solid #056d68;
        background: #153849;
        color: #EEE;

        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        outline: none;
        box-shadow: none;
      }
      /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #45b0e6;
        border: 1px solid #03837c;
        color: #EEE;

        /*        background: #E6ECF2;
                border: 1px solid #98B5CA;
                color: #0D4376;
                line-height: 14px;
                outline: none;
                box-shadow: none;*/
      }
      .leftBtnR{
        margin-left: 76px;
      }

    }

    .left-bottom-content{
      height:95%;
      width:90%;
      margin-left:20px;
      margin-top:-10px;
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
<style lang="scss" scoped>
  .TLDanJi{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/nyytuli/dj.png');
      background-repeat:no-repeat;
      background-size:100% 130%;
      -moz-background-size:100% 100%;
    }
  }
  .TLRouJi{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/nyytuli/rj.png');
      background-repeat:no-repeat;
      background-size:100% 130%;
      -moz-background-size:100% 100%;
    }
  }

  .TLNaiNiu{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/nyytuli/nn.png');
      background-repeat:no-repeat;
     background-size:100% 130%;
      -moz-background-size:100% 100%;
    }
  }
  .TLRouNiu{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/nyytuli/rn.png');
      background-repeat:no-repeat;
      background-size:100% 130%;
      -moz-background-size:100% 100%;
    }
  }
  .TLShengZhu{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/nyytuli/sz.png');
      background-repeat:no-repeat;
      background-size:100% 130%;
      -moz-background-size:100% 100%;
    }
  }
</style>
