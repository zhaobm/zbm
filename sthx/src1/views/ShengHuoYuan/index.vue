<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <!--
      <NewBox1 title='非工业锅炉数量和占比(9226)' class="left-bottom">
          <div class="leftBtn" slot="header">
            <el-button-group class="leftBtnR">
            </el-button-group>
          </div>
          <div slot="content" class='left-bottom-content'>
            <PieLeftTopSHY  :data="pieDataGuoLu"/>
          </div>
      </NewBox1>
      <NewBox1 title='加油站\储油库数量(3232\48)' class="left-center">
          <div class="leftBtn" slot="header">
            <el-button-group class="leftBtnR">
              <el-button size="mini" @click.native="LeftBtnJYZ">加油站</el-button>
              <el-button size="mini" @click.native="LeftBtnCYK">储油库</el-button>

            </el-button-group>
          </div>
          <div slot="content" class='left-center-content'>
            <PieLeftCenter :data="pieDataLeftCenter"/>
          </div>
      </NewBox1>
      <Box title="入河（湖）排污口数量和占比(2870)">
        <PieLeftCenterSHY  :data="pieDataPaiWuKou"/>
      </Box>
      -->
      <NewBox1 title='非工业锅炉数量和占比(个)' class="left-bottom">
          <div class="leftBtn" slot="header">
            <el-button-group class="leftBtnR">
            </el-button-group>
          </div>
          <div slot="content" class='left-bottom-content'>
            <PieLeftTopSHY  :data="pieDataGuoLu"/>
          </div>
      </NewBox1>
      <NewBox1 title='加油站\储油库数量(个)' class="left-center">
          <div class="leftBtn" slot="header">
<!--            <el-button-group class="leftBtnR">
              <el-button size="mini" @click.native="LeftBtnJYZ">加油站</el-button>
              <el-button size="mini" @click.native="LeftBtnCYK">储油库</el-button>

            </el-button-group>-->

            <el-radio-group v-model="radioButtonLabel" size="mini">
              <el-radio-button label="加油站" @click.native="LeftBtnJYZ">加油站</el-radio-button>
              <el-radio-button label="储油库" @click.native="LeftBtnCYK">储油库</el-radio-button>
            </el-radio-group>
          </div>
          <div slot="content" class='left-center-content'>
            <PieLeftCenter :data="pieDataLeftCenter"/>
          </div>
      </NewBox1>
      <Box title="入河（湖）排污口数量和占比" >
        <PieLeftCenterSHY  :data="pieDataPaiWuKou"/>
      </Box>
    </div>
    <div class="center">
      <Box>
          <div class="top-box">
            <mapBox />
            <!--陕北关中陕南-->
            <div class='toolBar' v-if="isShowGuanZhong">
              <el-button-group>
                <el-button size="mini" round @click="shanbei()">陕北</el-button>
                <el-button size="mini" round @click="guanzhong()">关中</el-button>
                <el-button size="mini" round @click="shannan()">陕南</el-button>
              </el-button-group>
            </div>
            <div class='toolBarquery' :class="{'toolBarquery2' : !poiVisible}" v-if="isShowtoolBarquery">
                <el-button size="mini" round @click="Openquery()">查询</el-button>
            </div>
            <div class='toolBarPicture' v-if="isShowGuanZhong">
                <el-button size="mini" round @click="OpenPicture()">排污口</el-button>
                <el-button size="mini" round @click="OpenPictureGL()">锅炉</el-button>
            </div>
            <div class='toolBarPicture1' v-if="isShowGuanZhong">
                <el-button size="mini" round @click="OpenPictureJYZ()">加油站及储油库</el-button>
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
             <div class='toolBarRadioFenLei'>
              <el-radio-group v-model="radioFenLei"  @change="SelectFenLei()" v-if="isShowEntFenLei">
                <el-radio :label="1" ><span class='TLFGYGL'>  </span>&nbsp&nbsp&nbsp非工业锅炉</el-radio>
                <el-radio :label="2" ><span class='TLPWK'>  </span>&nbsp&nbsp&nbsp排污口</el-radio>
                <el-radio :label="3" ><span class='TLJYZ'>  </span>&nbsp&nbsp&nbsp加油站</el-radio>
                <el-radio :label="4" ><span class='TLCYK'>  </span>&nbsp&nbsp&nbsp储油库</el-radio>
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
              <PoiLocation class="poi" title="POI定位" :widgetActiveFlag="poiVisible" :mapbox="mapProp" :tablename="poiTablename" :fieldName="fieldName" :JingDu="JingDu" :WeiDu="WeiDu" @PoiClick="poiClickBigScreen"></PoiLocation>

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
        <NewBox :title=shyjbqk class='centerGyy'>
            <BarCenterSHY :data="barDataXingZhengCun" slot="contentGYY" class='centerGyyBar'/>
        </NewBox>
    </div>
    <div class="right-bar">
      <NewBox1 title='废水主要污染物排放量(万吨)' class="left-bottom">
        <div slot="content" class='left-bottom-content'>

          <BarRightCenterSHY :data="barDataRightCenterFeiShui"/>
        </div>
      </NewBox1>
      <NewBox1 title="废气主要污染物排放量(吨)" class="left-bottom-2">
        <div slot="content" class='left-bottom-content'>

          <BarRightBottomSHY :data="barDataRightBottomFeiQi"/>
        </div>
      </NewBox1>
      <Box :title= fgyglfq class="left-bottom-3" >
        <!--<LineChart  :data="lindata3"/>-->
        <BarRightTopSHY :data="barDataRightTopFeiQi"/>

      </Box>
    </div>
    <div></div>
    <ImageDiv class="attribute" v-show="isShowAImage" @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures" :selectFeature="selectFeature" ></ImageDiv>


  </div>
</template>
<script>
import PoiLocation from "../../components/poi";
import LineChart from "../../components/charts/line/line1";
import Bar4 from "../../components/charts/bar/bar4";
//import Bar1 from "../../components/charts/bar/barDuiDie";
//import Bar1 from "../../components/charts/bar/barDuiDieV";
import Bar1 from "../../components/charts/bar/barDuiDieVGYY";
import Bar1New from "../../components/charts/bar/bar1new";
import Bar2New from "../../components/charts/bar/bar2new";
import BarLeftBottom from "../../components/charts/bar/barHGYY";
import Bar5 from "../../components/charts/bar/barDuiDieV";
import BarLeftBottomSHY from "../../components/charts/bar/ShengHuoYuan/barSHY";

import PieLeftTopSHY from "../../components/charts/pie/ShengHuoYuan/pie1";
import PieLeftCenterSHY from "../../components/charts/pie/ShengHuoYuan/pie2";
import PieLeftBottomSHY from "../../components/charts/pie/ShengHuoYuan/pie3";

import PieLeftCenter from '../../components/charts/pie/YiDongYuan/PieYDY1';

//import BarCenterSHY from "../../components/charts/bar/ShengHuoYuan/barDuiDieSHY";

import BarCenterSHY from "../../components/charts/bar/ShengHuoYuan/barCenterDuiDie.vue";


import BarRightTopSHY from "../../components/charts/bar/ShengHuoYuan/bar1";





import BarRightCenterSHY from "../../components/charts/bar/ShengHuoYuan/bar2";
import BarRightBottomSHY from "../../components/charts/bar/ShengHuoYuan/bar3";

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
import sxdsjbj from "../../assets/js/geojson/sxdsjbj.json";


//散点图
//引入Echart
let echarts = require("echarts/lib/echarts");
import ADLayer from "../../lib/openlayers/openlayers.echart.js";
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");


export default {
  data() {
    return {
      radioButtonLabel:"加油站",
      isShowtoolBarquery:true,

      poiVisible: false,
      mapProp : {},
      poiTablename:'T_BAS_S103_AQ',
      fieldName: "dwmc",
      JingDu: "jindu",
      WeiDu: "weidu",

      //是否展示关中陕南陕北按钮
      isShowGuanZhong:false,


      fileTextShow:false,


      isShowEntFenLei:true,
      fgyglfq:"非工业锅炉废气主要污染物排放量(吨)",
        shyjbqk:"",
      //地市和企业
      radio: 2,
      radioDiTu:1,
      radioFenLei:1,
      isDiShi:false,
      isQiYe:true,
      //热力图
      SHYGLLayer:null,
      SHYGLLayerCount:0,
      //重点排污单位点击事件
      isPopupShow:false,
      isDynamicPoiShow:false,
      Popup:null,
      DynamicPOI:null,
      poiName:"",
      poiAddress:"",
      // poiVectorLayer:null,
      poiVectorSource:null,

        isShiJi: false,
        isXianJi: true,
        xjVectorSource:null,
      isXuanRan:false,
      isXuanRanZDClose:false,

      pieDataLeftCenter:{
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
      },

      pieDataLeftJiaYouZhan:{
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
      },

      pieDataLeftChuYouKu:{
        dataArr: [
          { value: 12, name: "延安市" },
          { value: 6, name: "宝鸡市" },
          { value: 6, name: "西安市" },
          { value: 6, name: "西咸新区" },
          { value: 5, name: "汉中市" },
          { value: 4, name: "榆林市" },
          { value: 3, name: "咸阳市" },
          { value: 2, name: "铜川市" },
          { value: 2, name: "安康市" },
          { value: 1, name: "渭南市" },
          { value: 1, name: "商洛市" },
          { value: 0, name: "韩城市" },
          { value: 0, name: "杨凌示范区" },
        ]
      },


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
          name:'工业源',
          value:'28674',
          unite:'个'
        },
        {
          name:'农业源',
          value:'8381',
          unite:'个'
        },
        {
          name:'集中式',
          value:'1890',
          unite:'个'
        },
        {
          name:'移动源',
          value:'3395',
          unite:'个'
        }
        ,{
          name:'生活源',
          value:'12093',
          unite:'个'
        }

      ],
      lineData1: {
        xAxis: ["氨氮","COD","总氮", "总磷"],
        yAxis: [ 1.46 ,41.3, 4.52 ,0.273 ],
        color: [188, 235, 127]
      },


      /*
      //左1
      //生活源锅炉和入河排污口占比，饼图
      pieDataShengHuoYuan:{
        dataArr: [
            { value: 9224, name: "生活源锅炉" },
            { value: 2870, name: "入河排污口" },
        ]
      },
      //各市生活源数量和占比
      pieDataXiAnShengHuoYuan:{
        dataArr: [
            { value: 1683, name: "生活源锅炉" },
            { value: 398, name: "入河排污口" },
        ]
      },
      pieDataBaoJiShengHuoYuan:{
        dataArr: [
            { value: 211, name: "生活源锅炉" },
            { value: 232, name: "入河排污口" },
        ]
      },
      pieDataXianYangShengHuoYuan:{
        dataArr: [
            { value: 253, name: "生活源锅炉" },
            { value: 97, name: "入河排污口" },
        ]
      },
      pieDataTongChuanShengHuoYuan:{
        dataArr: [
            { value: 265, name: "生活源锅炉" },
            { value: 64, name: "入河排污口" },
        ]
      },
      pieDataWeiNanShengHuoYuan:{
        dataArr: [
            { value: 508, name: "生活源锅炉" },
            { value: 119, name: "入河排污口" },
        ]
      },
      pieDataYanAnShengHuoYuan:{
        dataArr: [

            { value: 735, name: "生活源锅炉" },
            { value: 489, name: "入河排污口" },

        ]
      },
      pieDataYuLinShengHuoYuan:{
        dataArr: [

            { value: 1275, name: "生活源锅炉" },
            { value: 499, name: "入河排污口" },

        ]
      },
      pieDataHanZhongShengHuoYuan:{
        dataArr: [

            { value: 37, name: "生活源锅炉" },
            { value: 320, name: "入河排污口" },

        ]
      },
      pieDataAnKangShengHuoYuan:{
        dataArr: [

            { value: 44, name: "生活源锅炉" },
            { value: 318, name: "入河排污口" },

        ]
      },
      pieDataShangLuoShengHuoYuan:{
        dataArr: [

            { value: 116, name: "生活源锅炉" },
            { value: 294, name: "入河排污口" },

        ]
      },
      pieDataXiXianShengHuoYuan:{
        dataArr: [

            { value: 48, name: "生活源锅炉" },
            { value: 17, name: "入河排污口" },

        ]
      },
      pieDataYangLinShengHuoYuan:{
        dataArr: [
            { value: 15, name: "生活源锅炉" },
            { value: 4, name: "入河排污口" },
        ]
      },
      pieDataHanChengShengHuoYuan:{
        dataArr: [
            { value: 39, name: "生活源锅炉" },
            { value: 19, name: "入河排污口" },
        ]
      },
      */
            //左1--备份
      //各类生活源数量和占比，饼图
      //五类，重点区域生活源燃煤行政村（社区）、行政村、生活源锅炉、入河排污口、城镇居民生活源
      pieDataShengHuoYuan:{
        dataArr: [
            { value: 9279, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 13879, name: "行政村" },
            { value: 9224, name: "生活源锅炉" },
            { value: 2870, name: "入河排污口" },
            { value: 1014, name: "城镇居民生活源" },
        ]
      },
      pieDataQuanShengShengHuoYuan:{
        dataArr: [
            { value: 9279, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 13879, name: "行政村" },
            { value: 9224, name: "生活源锅炉" },
            { value: 2870, name: "入河排污口" },
            { value: 1014, name: "城镇居民生活源" },
        ]
      },
      //各市生活源数量和占比
      pieDataXiAnShengHuoYuan:{
        dataArr: [
            { value: 2667, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1199, name: "行政村" },
            { value: 1683, name: "生活源锅炉" },
            { value: 398, name: "入河排污口" },
            { value: 51, name: "城镇居民生活源" },
        ]
      },
      pieDataBaoJiShengHuoYuan:{
        dataArr: [
            { value: 1352, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 982, name: "行政村" },
            { value: 211, name: "生活源锅炉" },
            { value: 232, name: "入河排污口" },
            { value: 95, name: "城镇居民生活源" },
        ]
      },
      pieDataXianYangShengHuoYuan:{
        dataArr: [
            { value: 2041, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1195, name: "行政村" },
            { value: 253, name: "生活源锅炉" },
            { value: 97, name: "入河排污口" },
            { value: 105, name: "城镇居民生活源" },
        ]
      },
      pieDataTongChuanShengHuoYuan:{
        dataArr: [
            { value: 428, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 288, name: "行政村" },
            { value: 265, name: "生活源锅炉" },
            { value: 64, name: "入河排污口" },
            { value: 20, name: "城镇居民生活源" },
        ]
      },
      pieDataWeiNanShengHuoYuan:{
        dataArr: [
            { value: 2132, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1586, name: "行政村" },
            { value: 508, name: "生活源锅炉" },
            { value: 119, name: "入河排污口" },
            { value: 108, name: "城镇居民生活源" },
        ]
      },
      pieDataYanAnShengHuoYuan:{
        dataArr: [
            { value: 0, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1534, name: "行政村" },
            { value: 735, name: "生活源锅炉" },
            { value: 489, name: "入河排污口" },
            { value: 95, name: "城镇居民生活源" },
        ]
      },
      pieDataYuLinShengHuoYuan:{
        dataArr: [
            { value: 0, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 2661, name: "行政村" },
            { value: 1275, name: "生活源锅炉" },
            { value: 499, name: "入河排污口" },
            { value: 150, name: "城镇居民生活源" },
        ]
      },
      pieDataHanZhongShengHuoYuan:{
        dataArr: [
            { value: 0, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1817, name: "行政村" },
            { value: 37, name: "生活源锅炉" },
            { value: 320, name: "入河排污口" },
            { value: 158, name: "城镇居民生活源" },
        ]
      },
      pieDataAnKangShengHuoYuan:{
        dataArr: [
            { value: 0, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 1305, name: "行政村" },
            { value: 44, name: "生活源锅炉" },
            { value: 318, name: "入河排污口" },
            { value: 131, name: "城镇居民生活源" },
        ]
      },
      pieDataShangLuoShengHuoYuan:{
        dataArr: [
            { value: 0, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 854, name: "行政村" },
            { value: 116, name: "生活源锅炉" },
            { value: 294, name: "入河排污口" },
            { value: 93, name: "城镇居民生活源" },
        ]
      },
      pieDataXiXianShengHuoYuan:{
        dataArr: [
            { value: 377, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 327, name: "行政村" },
            { value: 48, name: "生活源锅炉" },
            { value: 17, name: "入河排污口" },
            { value: 0, name: "城镇居民生活源" },
        ]
      },
      pieDataYangLinShengHuoYuan:{
        dataArr: [
            { value: 77, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 44, name: "行政村" },
            { value: 15, name: "生活源锅炉" },
            { value: 4, name: "入河排污口" },
            { value: 3, name: "城镇居民生活源" },
        ]
      },
      pieDataHanChengShengHuoYuan:{
        dataArr: [
            { value: 205, name: "重点区域生活源燃煤行政村（社区）" },
            { value: 87, name: "行政村" },
            { value: 39, name: "生活源锅炉" },
            { value: 19, name: "入河排污口" },
            { value: 3, name: "城镇居民生活源" },
        ]
      },
      //左2
      //非工业锅炉数量和占比，饼图
      //四类，燃煤锅炉数量、燃油锅炉数量、燃气锅炉数量、燃生物质锅炉数量
      pieDataGuoLu:{
        dataArr: [
            { value: 1765, name: "燃煤锅炉数量" },
            { value: 162, name: "燃油锅炉数量" },
            { value: 7259, name: "燃气锅炉数量" },
            { value: 40, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataQuanShengGuoLu:{
        dataArr: [
            { value: 1765, name: "燃煤锅炉数量" },
            { value: 162, name: "燃油锅炉数量" },
            { value: 7259, name: "燃气锅炉数量" },
            { value: 40, name: "燃生物质锅炉数量" },
        ]
      },
      //各市生活源数量和占比
      pieDataXiAnGuoLu:{
        dataArr: [
            { value: 5, name: "燃煤锅炉数量" },
            { value: 35, name: "燃油锅炉数量" },
            { value: 3505, name: "燃气锅炉数量" },
            { value: 5, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataTongChuanGuoLu:{
        dataArr: [
            { value: 54, name: "燃煤锅炉数量" },
            { value: 22, name: "燃油锅炉数量" },
            { value: 413, name: "燃气锅炉数量" },
            { value: 0, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataBaoJiGuoLu:{
        dataArr: [
            { value: 169, name: "燃煤锅炉数量" },
            { value: 1, name: "燃油锅炉数量" },
            { value: 118, name: "燃气锅炉数量" },
            { value: 11, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataXianYangGuoLu:{
        dataArr: [
            { value: 14, name: "燃煤锅炉数量" },
            { value: 17, name: "燃油锅炉数量" },
            { value: 407, name: "燃气锅炉数量" },
            { value: 0, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataWeiNanGuoLu:{
        dataArr: [
            { value: 138, name: "燃煤锅炉数量" },
            { value: 47, name: "燃油锅炉数量" },
            { value: 724, name: "燃气锅炉数量" },
            { value: 8, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataYanAnGuoLu:{
        dataArr: [
            { value: 635, name: "燃煤锅炉数量" },
            { value: 17, name: "燃油锅炉数量" },
            { value: 422, name: "燃气锅炉数量" },
            { value: 0, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataYuLinGuoLu:{
        dataArr: [
            { value: 608, name: "燃煤锅炉数量" },
            { value: 14, name: "燃油锅炉数量" },
            { value: 1295, name: "燃气锅炉数量" },
            { value: 0, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataHanZhongGuoLu:{
        dataArr: [
            { value: 24, name: "燃煤锅炉数量" },
            { value: 3, name: "燃油锅炉数量" },
            { value: 32, name: "燃气锅炉数量" },
            { value: 4, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataAnKangGuoLu:{
        dataArr: [
            { value: 20, name: "燃煤锅炉数量" },
            { value: 3, name: "燃油锅炉数量" },
            { value: 38, name: "燃气锅炉数量" },
            { value: 1, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataShangLuoGuoLu:{
        dataArr: [
            { value: 90, name: "燃煤锅炉数量" },
            { value: 3, name: "燃油锅炉数量" },
            { value: 66, name: "燃气锅炉数量" },
            { value: 7, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataXiXianGuoLu:{
        dataArr: [
            { value: 8, name: "燃煤锅炉数量" },
            { value: 0, name: "燃油锅炉数量" },
            { value: 135, name: "燃气锅炉数量" },
            { value: 1, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataYangLinGuoLu:{
        dataArr: [
            { value: 0, name: "燃煤锅炉数量" },
            { value: 0, name: "燃油锅炉数量" },
            { value: 36, name: "燃气锅炉数量" },
            { value: 0, name: "燃生物质锅炉数量" },
        ]
      },
      pieDataHanChengGuoLu:{
        dataArr: [
            { value: 0, name: "燃煤锅炉数量" },
            { value: 0, name: "燃油锅炉数量" },
            { value: 68, name: "燃气锅炉数量" },
            { value: 3, name: "燃生物质锅炉数量" },
        ]
      },
      //左3
      //排污口数量和占比，饼图
      //两类，规模以上、规模以下
      pieDataPaiWuKou:{
        dataArr: [
            { value: 496, name: "规模以上" },
            { value: 2374, name: "规模以下" },
        ]
      },
      pieDataQuanShengPaiWuKou:{
        dataArr: [
            { value: 496, name: "规模以上" },
            { value: 2374, name: "规模以下" },
        ]
      },
      //各市生活源数量和占比
      pieDataXiAnPaiWuKou:{
        dataArr: [
            { value: 82, name: "规模以上" },
            { value: 316, name: "规模以下" },
        ]
      },
      pieDataBaoJiPaiWuKou:{
        dataArr: [
            { value: 37, name: "规模以上" },
            { value: 195, name: "规模以下" },
        ]
      },
      pieDataXianYangPaiWuKou:{
        dataArr: [
            { value: 33, name: "规模以上" },
            { value: 64, name: "规模以下" },
        ]
      },
      pieDataTongChuanPaiWuKou:{
        dataArr: [
            { value: 25, name: "规模以上" },
            { value: 39, name: "规模以下" },
        ]
      },
      pieDataWeiNanPaiWuKou:{
        dataArr: [
            { value: 50, name: "规模以上" },
            { value: 69, name: "规模以下" },
        ]
      },
      pieDataYanAnPaiWuKou:{
        dataArr: [
            { value: 33, name: "规模以上" },
            { value: 456, name: "规模以下" },
        ]
      },
      pieDataYuLinPaiWuKou:{
        dataArr: [
            { value: 112, name: "规模以上" },
            { value: 387, name: "规模以下" },
        ]
      },
      pieDataHanZhongPaiWuKou:{
        dataArr: [
            { value: 41, name: "规模以上" },
            { value: 279, name: "规模以下" },
        ]
      },
      pieDataAnKangPaiWuKou:{
        dataArr: [
            { value: 38, name: "规模以上" },
            { value: 280, name: "规模以下" },
        ]
      },
      pieDataShangLuoPaiWuKou:{
        dataArr: [
            { value: 13, name: "规模以上" },
            { value: 281, name: "规模以下" },
        ]
      },
      pieDataXiXianPaiWuKou:{
        dataArr: [
            { value: 12, name: "规模以上" },
            { value: 5, name: "规模以下" },
        ]
      },
      pieDataYangLinPaiWuKou:{
        dataArr: [
            { value: 3, name: "规模以上" },
            { value: 1, name: "规模以下" },
        ]
      },
      pieDataHanChengPaiWuKou:{
        dataArr: [
            { value: 17, name: "规模以上" },
            { value: 2, name: "规模以下" },
        ]
      },

      //中2
      //各地市重点区域生活源燃煤行政区（社区）和行政村的数量，堆叠
      /*
      barDataXingZhengCun:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市"],
        RMXZC: [1206,288,973,1172,1588,1534,1814,2661,1305,854,327,32,87],
      },
      */

      barDataXingZhengCun:{
        // xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市",],
        // FGYGLData:["3550",  "489",  "299",  "438"  ,"917", "1074", "63",  "1917"  , "62","166",    "144",    "36",    "71",     ],
        // CYKData:["6",   "2",   "6",   "3"  , "1",  "12",  "5",  "4"  ,   "2","1" ,   "6",      "0",    "0",       ],
        // JYZData:["493",  "101",    "293",    "327"   ,"472",   "250",   "256",   "553" ,     "174", "151" ,     "110",     "7",     "45",   ],
        // XZCData:["1206",  "288",    "973",    "1172"  , "1588",  "1534",  "1814",   "2661"  ,   "1305","854" ,    "327",     "32",      "87",    ],
      },

      //右一
      //非工业锅炉污染物排放量(吨)
      //颗粒物、二氧化硫、氮氧化物、挥发性有机物

      barDataRightTopFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [ 	0.76,	1.30,	0.95,0.12],
      },
      barDataQuanShengFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [ 	0.76,	1.30,	0.95,0.12],
      },
      barDataXiAnFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [ 	0.005,	0.14,0.0002,	0.02],
      },

      barDataTongChuanFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [ 	0.15,	0.03,	0.03,0.001],
      },

      barDataBaoJiFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.05,	0.03,	0.08,0.0007],
      },

      barDataXianYangFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.02,	0.01,0.003,	0.001],
      },

      barDataWeiNanFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.1,	0.03,	0.06,0.001],
      },

      barDataYanAnFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.07,	0.07,0.19,	0.005],
      },
       barDataHanZhongFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.03,	0.007,0.04,	0],
      },
       barDataYuLinFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.3,	0.95,0.53,	0.09],
      },
       barDataAnKangFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.01,	0.005,0.01,	0],
      },
       barDataShangLuoFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.02,	0.01,0.01,	0],
      },
       barDataXiXianFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [0,	0.003,0,		0],
      },
       barDataYangLinFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0,	0.001,0,	0],
      },
       barDataHanChengFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [	0.0004,	0.001,0,	0],
      },

      //右2 生活源废水排放量（万吨）
      //化学需氧量、氨氮、总氮、总磷
      barDataRightCenterFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [ 22.964,	1.341,	3.107,	0.17],
      },
      barDataQuanShengFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [ 22.964,	1.341,	3.107,	0.17],
      },
      barDataXiAnFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [ 4.695,	0.203,	0.966,	0.041],
      },

      barDataTongChuanFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [ 0.337,	0.016,	0.039,	0.002],
      },

      barDataBaoJiFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [1.801,	0.153,	0.288,	0.012],
      },

      barDataXianYangFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [2.147,	0.171,	0.34,	0.013],
      },

      barDataWeiNanFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [2.852,	0.116,	0.283,	0.016],
      },

      barDataYanAnFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [1.392,	0.079,	0.151,	0.016],
      },
       barDataHanZhongFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [3.355,	0.241,	0.372,	0.027],
      },
       barDataYuLinFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [1.679,	0.075,	0.205,	0.011],
      },
       barDataAnKangFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [2.467,	0.175,  0.261,	0.018],
      },
       barDataShangLuoFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [1.435,	0.074,	0.119,	0.01],
      },
       barDataXiXianFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [0.615,	0.025,	0.048,	0.004],
      },
       barDataYangLinFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [0.061,	0.009,	0.019,	0.001],
      },
       barDataHanChengFeiShui:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [0.127,	0.004,	0.016,	0.001],
      },
      //右3
      //生活源废气排放量(万吨)
      //二氧化硫、氮氧化物、颗粒物、挥发性有机物
      barDataRightBottomFeiQi:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 3.208,	2.95,	9.595,	8.62],
      },
      barDataQuanShengFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 3.208,	2.95,	9.595,	8.62],
      },
      barDataXiAnFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.316,	0.413,	0.842,	1.357],
      },

      barDataTongChuanFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.2,	0.066,	0.197,	0.198],
      },

      barDataBaoJiFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.37,	0.227,	1.25,	0.644],
      },

      barDataXianYangFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.255,	0.17,	0.805,	0.664],
      },

      barDataWeiNanFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.48,	0.281,	1.551,	0.904],
      },

      barDataYanAnFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.347,	0.256,	1.321,	0.918],
      },
       barDataHanZhongFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.324,	0.196,	1.039,	0.738],
      },
       barDataYuLinFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.641,	1.166,	1.746,	0.702],
      },
       barDataAnKangFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.145,	0.094,	0.46,	 0.423],
      },
       barDataShangLuoFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0.131,	0.077,	0.383,	0.359],
      },
       barDataXiXianFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0,	0.003,	0,	0.003],
      },
       barDataYangLinFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0,	0.001,	0,	0.024],
      },
       barDataHanChengFeiQi3:{
        xAxis: ["二氧化硫","氮氧化物","颗粒物","挥发性有机物"],
        yAxis: [ 0,	0.001,	0,	0.00008],
      },










      barDataRightTop:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸","韩城市","杨凌示范区"],
        KLWData:["398",    "64",    "232",  "97"  ,  "119",  "489",  "320",   "499"  , "294",  "318",    "17",    "19",    "4",   ],
        EYHLData:["398",    "64",    "232",  "97"  ,  "119",  "489",  "320",   "499"  , "294",  "318",    "17",    "19",    "4",   ],
        DYHWData:["398",    "64",    "232",  "97"  ,  "119",  "489",  "320",   "499"  , "294",  "318",    "17",    "19",    "4",   ],
        YJWData:["398",    "64",    "232",  "97"  ,  "119",  "489",  "320",   "499"  , "294",  "318",    "17",    "19",    "4",   ],
      },
      barDataLeftTop:{
        xAxis: ["COD","氨氮","总氮", "总磷","COD","氨氮","总氮", "总磷","COD","氨氮","总氮", "总磷"],
        yAxis: [ 1.3,1.46 , 4.52 ,0.273,1.3,1.46 , 4.52 ,0.273,1.3,1.46 , 4.52 ,0.273 ],
      },
      barDataLeftBottom:{
        xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","商洛市","安康市","西咸","韩城市","杨凌示范区"],
        yAxis:["398",    "64",    "232",  "97"  ,  "119",  "489",  "320",   "499"  , "294",  "318",    "17",    "19",    "4",   ],
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
      //十三个行业的排放量,单位是吨
      HuoDianFS:{hxxyl:'56.19',ad:'3.75',zd:'5.38',zl:'0.12'},
      HuoDianFQ:{eyhl:'29400',dy:'41100',klw:'12200',hfxyjw:'1300'},
      QiCheFS:{hxxyl:'387.27',ad:'1.03',zd:'6.36',zl:'4.97'},
      QiCheFQ:{eyhl:'6.81',dy:'241.43',klw:'915.47',hfxyjw:'2724.69'},
      ShiPinFS:{hxxyl:'4400',ad:'100',zd:'500',zl:'0'},
      ShiPinFQ:{eyhl:'2800',dy:'2700',klw:'1700',hfxyjw:'2500'},
      ZaoZhiFS:{hxxyl:'246.93',ad:'1.72',zd:'14.80',zl:'0.15'},
      ZaoZhiFQ:{eyhl:'545.30',dy:'395.78',klw:'397.30',hfxyjw:'261.92'},
      JiXieFS:{hxxyl:'31.28',ad:'0.01',zd:'0.14',zl:'0.01'},
      JiXieFQ:{eyhl:'9.19',dy:'23.37',klw:'932.73',hfxyjw:'218.45'},
      JianZhuCaiLiaoFS:{hxxyl:'11.90',ad:'0.13',zd:'0.17',zl:'0.01'},
      JianZhuCaiLiaoFQ:{eyhl:'515.50',dy:'1027.25',klw:'15747.38',hfxyjw:'177.53'},
      ShiHuaFS:{hxxyl:'385.76',ad:'39.45',zd:'139.76',zl:'0.59'},
      ShiHuaFQ:{eyhl:'7700',dy:'10900',klw:'5500',hfxyjw:'17500'},
      YouSeJinShuFS:{hxxyl:'94.26',ad:'8.16',zd:'17.58',zl:'0.95'},
      YouSeJinShuFQ:{eyhl:'31300',dy:'22000',klw:'24300',hfxyjw:'300'},
      GangTieFS:{hxxyl:'36.26',ad:'3.73',zd:'19.45',zl:'0'},
      GangTieFQ:{eyhl:'10400',dy:'18300',klw:'5900',hfxyjw:'1200'},
      JiaoHuaFS:{hxxyl:'1.23',ad:'0',zd:'0',zl:'0'},
      JiaoHuaFQ:{eyhl:'14700',dy:'30100',klw:'38100',hfxyjw:'12400'},
      ShuiNiFS:{hxxyl:'4.56',ad:'0',zd:'0',zl:'0'},
      ShuiNiFQ:{eyhl:'6390.06',dy:'21032.45',klw:'79247.64',hfxyjw:'1674.23'},
      GuoZhiFS:{hxxyl:'376.72',ad:'5.49',zd:'21.53',zl:'2.53'},
      GuoZhiFQ:{eyhl:'165.27',dy:'118.54',klw:'716.32',hfxyjw:'10.19'},
      YiYaoZhiZaoFS:{hxxyl:'1345.25',ad:'42.08',zd:'106.93',zl:'8.17'},
      YiYaoZhiZaoFQ:{eyhl:'485.89',dy:'251.93',klw:'392.80',hfxyjw:'2568.79'},
      //各个地市的各类排放量
      //1、废水
      XianFS:{hxxyl:'2500',ad:'73',zd:'270',zl:'10.9'},
      TongChuanFS:{hxxyl:'200',ad:'1',zd:'7',zl:'0.5'},
      BaoJiFS:{hxxyl:'2600',ad:'96',zd:'280',zl:'24.9'},
      XianYangFS:{hxxyl:'1300',ad:'68',zd:'110',zl:'9.3'},
      WeiNanFS:{hxxyl:'900',ad:'110',zd:'670',zl:'14.1'},
      YanAnFS:{hxxyl:'600',ad:'7',zd:'80',zl:'1.7'},
      HanZhongFS:{hxxyl:'2000',ad:'672',zd:'1210',zl:'7.4'},
      YuLinFS:{hxxyl:'7700',ad:'193',zd:'140',zl:'4.5'},
      AnKangFS:{hxxyl:'700',ad:'24',zd:'40',zl:'2.1'},
      ShangLuoFS:{hxxyl:'400',ad:'27',zd:'50',zl:'2.3'},
      XiXianFS:{hxxyl:'200',ad:'9',zd:'20',zl:'2.1'},
      YangLinFS:{hxxyl:'100',ad:'3',zd:'10',zl:'1'},
      HanChengFS:{hxxyl:'200',ad:'14',zd:'30',zl:'0.7'},
      //2、废气
      XianFQ:{eyhl:'3100',dy:'6300',klw:'17900',hfxyjw:'7194.62'},
      TongChuanFQ:{eyhl:'6900',dy:'7600',klw:'20900',hfxyjw:'465.50'},
      BaoJiFQ:{eyhl:'23500',dy:'24100',klw:'39200',hfxyjw:'3664.35'},
      XianYangFQ:{eyhl:'4900',dy:'8700',klw:'20100',hfxyjw:'3913.07'},
      WeiNanFQ:{eyhl:'7600',dy:'9500',klw:'24600',hfxyjw:'12401.22'},
      YanAnFQ:{eyhl:'9400',dy:'9700',klw:'21700',hfxyjw:'6540.38'},
      HanZhongFQ:{eyhl:'14400',dy:'20200',klw:'29000',hfxyjw:'1595.44'},
      YuLinFQ:{eyhl:'73300',dy:'61900',klw:'182800',hfxyjw:'25020.04'},
      AnKangFQ:{eyhl:'2500',dy:'2300',klw:'10300',hfxyjw:'279.40'},
      ShangLuoFQ:{eyhl:'3600',dy:'3100',klw:'17900',hfxyjw:'420.05'},
      XiXianFQ:{eyhl:'1200',dy:'3000',klw:'3500',hfxyjw:'1337.41'},
      YangLinFQ:{eyhl:'200',dy:'500',klw:'500',hfxyjw:'411.62'},
      HanChengFQ:{eyhl:'7500',dy:'23200',klw:'16600',hfxyjw:'7771.58'},
      //3、固废
      //一般固废产生量、一般固废综合利用量、一般工业固废处置量、一般工业固废贮存量，一般工业固废倾倒丢弃量
      XianGF:{csl:'227.29',lyl:'209.51',czl:'16.39',zcl:'1.59',dql:'0.124'},
      TongChuanGF:{csl:'782.79',lyl:'371.39',czl:'334.67',zcl:'77.22',dql:'0.001'},
      BaoJiGF:{csl:'220.98',lyl:'161.58',czl:'59.40',zcl:'0',dql:'0.003'},
      XianYangGF:{csl:'748.06',lyl:'357.33',czl:'159.76',zcl:'255.07',dql:'0.002'},
      WeiNanGF:{csl:'3316.03',lyl:'327.94',czl:'2793.51',zcl:'194.42',dql:'1.186'},
      YanAnGF:{csl:'445.45',lyl:'179.09',czl:'265.18',zcl:'2.24',dql:'0.005'},
      HanZhongGF:{csl:'4027.65',lyl:'1587.69',czl:'2102.34',zcl:'557.00',dql:'9.086'},
      YuLinGF:{csl:'964.46',lyl:'430.81',czl:'13.17',zcl:'528.34',dql:'0.007'},
      AnKangGF:{csl:'129.48',lyl:'26.82',czl:'5.67',zcl:'94.79',dql:'2.198'},
      ShangLuoGF:{csl:'866.80',lyl:'166.09',czl:'267.53',zcl:'657.24',dql:'0'},
      XiXianGF:{csl:'54.32',lyl:'54.27',czl:'0.05',zcl:'0.00128',dql:'0'},
      YangLinGF:{csl:'182.68',lyl:'158.46',czl:'24.22',zcl:'0.0012',dql:'0.00025'},
      HanChengGF:{csl:'980.22',lyl:'830.25',czl:'70.66',zcl:'120.02',dql:'0'},

      townId:'',//村id
      countryId:'',//镇id
      years:'',//最新年
      startDate:'',
      endDate:'',
      lng:'101.534554629',//经度
      lat:'34.597776638',//纬度
      sjVectorSource: null,
      sjVectorLayer: null,

      shyglVectorLayer:null,
      shyglVectorSource:null,

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
          // yanan:[109.428,36.256],
        /*yulin:[109.815,38.226],
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
        hanzhong:[107.052,33.198],*/
      },

      //气泡点击缩放至企业坐标
      geoCoordPoiEnt:{
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


      //陕西107县坐标,热力图
      shanxi107Xian:[
        {name:'府谷县',lat:39.180176,lng:110.85641,GuoLuCount:237},
        {name:'神木县',lat:38.81871	 ,lng:110.3245,GuoLuCount:307},
        {name:'榆林市',lat:38.385433,lng:109.62433,GuoLuCount:510},
        {name:'佳县'   ,lat:38.071999,lng:110.36139,GuoLuCount:16},
        {name:'横山县',lat:37.846004,lng:109.45303,GuoLuCount:145},
        {name:'米脂县',lat:37.822361,lng:110.17426,GuoLuCount:42},
        {name:'靖边县',lat:37.47818	 ,lng:108.79951,GuoLuCount:125},
        {name:'定边县',lat:37.378601,lng:107.74368,GuoLuCount:270},
        {name:'子洲县',lat:37.528671,lng:109.86617,GuoLuCount:63},
        {name:'绥德县',lat:37.513775,lng:110.38391,GuoLuCount:115},
        {name:'吴堡县',lat:37.586708,lng:110.68021,GuoLuCount:54},
        {name:'子长县',lat:37.224575,lng:109.6106	 ,GuoLuCount:54},
        {name:'清涧县',lat:37.180252,lng:110.27917,GuoLuCount:33},
        {name:'吴起县',lat:36.978729,lng:108.11695,GuoLuCount:60},
        {name:'安塞县',lat:36.92244	 ,lng:109.16022,GuoLuCount:31},
        {name:'志丹县',lat:36.747414,lng:108.65177,GuoLuCount:148},
        {name:'延川县',lat:36.876499,lng:110.07654,GuoLuCount:41},
        {name:'延安市',lat:36.571075,lng:109.63924,GuoLuCount:365},
        {name:'延长县',lat:36.538536,lng:110.12851,GuoLuCount:52},
        {name:'甘泉县',lat:36.347454,lng:109.17529,GuoLuCount:60},
        {name:'宜川县',lat:36.066189,lng:110.18259,GuoLuCount:85},
        {name:'富县'   ,lat:36.011528,lng:109.03996,GuoLuCount:49},
        {name:'洛川县',lat:35.740692,lng:109.55025,GuoLuCount:46},
        {name:'黄龙县',lat:35.698914,lng:109.93415,GuoLuCount:25},
        {name:'韩城市',lat:35.571899,lng:110.38703,GuoLuCount:71},
        {name:'黄陵县',lat:35.624554,lng:108.94093,GuoLuCount:58},
        {name:'宜君县',lat:35.382305,lng:109.19443,GuoLuCount:44},
        {name:'旬邑县',lat:35.21566	 ,lng:108.48059,GuoLuCount:11},
        {name:'白水县',lat:35.268898,lng:109.5593	 ,GuoLuCount:38},
        {name:'澄城县',lat:35.221897,lng:109.88828,GuoLuCount:34},
        {name:'合阳县',lat:35.206848,lng:110.18314,GuoLuCount:200},
        {name:'铜川市',lat:35.139496,lng:109.13754,GuoLuCount:367},
        {name:'耀县'   ,lat:35.058071,lng:108.8289,GuoLuCount:78},
        {name:'长武县',lat:35.165951,lng:107.82553,GuoLuCount:29},
        {name:'彬县'   ,lat:35.046146,lng:108.05853,GuoLuCount:15},
        {name:'蒲城县',lat:34.967697,lng:109.61523,GuoLuCount:26},
        {name:'富平县',lat:34.87545	 ,lng:109.2214,GuoLuCount:34},
        {name:'陇县'   ,lat:34.8713	 ,lng:106.76463,GuoLuCount:12},
        {name:'淳化县',lat:34.869228,lng:108.55704,GuoLuCount:8},
        {name:'大荔县',lat:34.797031,lng:110.01666,GuoLuCount:22},
        {name:'麟游县',lat:34.779633,lng:107.70363,GuoLuCount:6},
        {name:'永寿县',lat:34.80957	 ,lng:108.13791,GuoLuCount:6},
        {name:'千阳县',lat:34.76329	 ,lng:107.17184,GuoLuCount:10},
        {name:'三原县',lat:34.705315,lng:108.96616,GuoLuCount:38},
        {name:'礼泉县',lat:34.595531,lng:108.46864,GuoLuCount:33},
        {name:'渭南市',lat:34.552948,lng:109.55293,GuoLuCount:347},
        {name:'凤翔县',lat:34.569759,lng:107.4239	 ,GuoLuCount:17},
        {name:'泾阳县',lat:34.61158	 ,lng:108.76606,GuoLuCount:4},
        {name:'临潼区',lat:34.502499,lng:109.28719,GuoLuCount:103},
        {name:'乾县'   ,lat:34.526402,lng:108.21421,GuoLuCount:61},
        {name:'宝鸡市',lat:34.43483	 ,lng:106.98729,GuoLuCount:71},
        {name:'阎良区',lat:34.670021,lng:109.23008,GuoLuCount:85},
        {name:'华阴市',lat:34.533165,lng:110.04091,GuoLuCount:41},
        {name:'潼关县',lat:34.508957,lng:110.28524,GuoLuCount:60},
        {name:'永寿县',lat:34.578651,lng:108.05357,GuoLuCount:6},
        {name:'岐山县',lat:34.408802,lng:107.67982,GuoLuCount:24},
        {name:'扶风县',lat:34.404324,lng:107.91287,GuoLuCount:37},
        {name:'华州区',lat:34.410061,lng:109.79881,GuoLuCount:114},
        {name:'高陵县',lat:34.517235,lng:109.0607	 ,GuoLuCount:44},
        {name:'咸阳市',lat:34.393791,lng:108.72476,GuoLuCount:334},
        {name:'西安市',lat:34.301285,lng:108.98752 ,GuoLuCount:962},
        {name:'兴平市',lat:34.307404,lng:108.4615	 ,GuoLuCount:32},
        {name:'杨凌示范区',lat:34.331463,lng:108.0619	 ,GuoLuCount:36},
        {name:'洛南县',lat:34.162601,lng:110.26125,GuoLuCount:15},
        {name:'渭滨区',lat:34.282688,lng:107.10738,GuoLuCount:50},
        {name:'武功县',lat:34.293251,lng:108.2188	 ,GuoLuCount:11},
        {name:'蓝田县',lat:34.097881,lng:109.41129,GuoLuCount:54},
        {name:'眉县'   ,lat:34.142353,lng:107.82088,GuoLuCount:40},
        {name:'长安县',lat:34.039074,lng:108.93102,GuoLuCount:216},
        {name:'凤县'   ,lat:33.987247,lng:106.75455,GuoLuCount:24},
        {name:'户县'   ,lat:34.003029,lng:108.582	 ,GuoLuCount:54},
        {name:'周至县',lat:33.952236,lng:108.10886,GuoLuCount:28},
        {name:'商州区',lat:33.893108,lng:109.85985,GuoLuCount:44},
        {name:'太白县',lat:33.934196,lng:107.40987,GuoLuCount:8},
        {name:'丹凤县',lat:33.680286,lng:110.43032,GuoLuCount:18},
        {name:'柞水县',lat:33.691631,lng:109.26926,GuoLuCount:16},
        {name:'留坝县',lat:33.607704,lng:106.9526	 ,GuoLuCount:3},
        {name:'宁陕县',lat:33.533634,lng:108.44087,GuoLuCount:6},
        {name:'商南县',lat:33.408291,lng:110.75114,GuoLuCount:18},
        {name:'佛坪县',lat:33.541138,lng:107.91993,GuoLuCount:0},
        {name:'洋县'   ,lat:33.361046,lng:107.60492,GuoLuCount:1},
        {name:'山阳县',lat:33.423283,lng:109.9666	 ,GuoLuCount:47},
        {name:'镇安县',lat:33.377377,lng:109.06147,GuoLuCount:8},
        {name:'城固县',lat:33.216404,lng:107.25069,GuoLuCount:19},
        {name:'勉县'   ,lat:33.238243,lng:106.65135,GuoLuCount:0},
        {name:'略阳县',lat:33.378201,lng:106.15266,GuoLuCount:5},
        {name:'汉中市',lat:33.181648,lng:107.03486,GuoLuCount:33},
        {name:'石泉县',lat:33.063293,lng:108.23806,GuoLuCount:8},
        {name:'安康市',lat:32.811661,lng:108.88501,GuoLuCount:34},
        {name:'西乡县',lat:32.885872,lng:107.74493,GuoLuCount:0},
        {name:'旬阳县',lat:32.901176,lng:109.41047,GuoLuCount:4},
        {name:'宁强县',lat:32.906345,lng:106.13229,GuoLuCount:0},
        {name:'汉阴县',lat:32.9025	 ,lng:108.48432,GuoLuCount:0},
        {name:'南郑县',lat:32.805767,lng:106.96161,GuoLuCount:2},
        {name:'白河县',lat:32.72607	 ,lng:109.90749,GuoLuCount:1},
        {name:'镇巴县',lat:32.509552,lng:107.87395,GuoLuCount:0},
        {name:'紫阳县',lat:32.450802,lng:108.43322,GuoLuCount:1},
        {name:'平利县',lat:32.28878	 ,lng:109.25837,GuoLuCount:0},
        {name:'紫阳县',lat:32.542286,lng:108.66286,GuoLuCount:0},
        {name:'岚皋县',lat:32.245186,lng:108.87343,GuoLuCount:8},
        {name:'镇坪县',lat:31.939556,lng:109.44548,GuoLuCount:0},
      ],
      HeatLayer:null,

      sxxjbjProLayer:null,
      xjsource:null,
      xjfeatures:null,

      shyEntlWMTSLayer:null,

      shyEntfgyqyWMTSLayer:null,
      shyEntjyzWMTSLayer:null,
      shyEntpwkWMTSLayer:null,
      shyEntcykWMTSLayer:null,

      //午夜蓝图
      wuyelantu:null,
      //天地图
      tdtImage:null,
      tdtImageAnno:null,



      poiLayerCount:0,
      poiVectorLayer:null,

    };
  },
  methods: {
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
      this.map.getView().setZoom(12);

       //当为企业坐标点时
      var coordinateLngLat = ol.proj.transform(coordinatePro, 'EPSG:3857' ,'EPSG:4326');
      var EnterpriseInfo = await this.querySHYEntInfo(coordinateLngLat);

      this.getEntPoiInfo(EnterpriseInfo);





    },
    Openquery(){
      this.poiVisible = !this.poiVisible;
      this.mapProp = this.map;
    },


    async LoadDiShiPopup(){
      //加载地市点
      var dishiEntCountArr = {};
      if(this.radioFenLei == 1 && this.isQiYe){
        //dishiEntCountArr = await this.GetDiShiEntCount('pcxqdm','T_BAS_S103_AQ');
        // dishiEntCountArr = {"xixian":[{count:"144"}],"hancheng":[{count:"71"}],"yanglin":[{count:"36"}],weinan:[{count:"917"}],shangluo:[{count:"166"}],yanan:[{count:"1074"}],xian:[{count:"3550"}],hanzhong:[{count:"63"}],tongchaun:[{count:"489"}],xianyang:[{count:"438"}],yulin:[{count:"1917"}],ankang:[{count:"62"}],baoji:[{count:"299"}]};
          //lee 测试
        //dishiEntCountArr = {"610600":[{"count":"0"}],"610602":[{"count":"199"}],"610603":[{"count":"62"}],"610621":[{"count":"77"}],"610622":[{"count":"55"}],"610623":[{"count":"92"}],"610625":[{"count":"103"}],"610626":[{"count":"70"}],"610627":[{"count":"66"}],"610628":[{"count":"69"}],"610629":[{"count":"66"}],"610630":[{"count":"49"}],"610631":[{"count":"25"}],"610632":[{"count":"82"}]};
          /*
          SELECT SUM(COUNTGL) AS GLCOUNT  from
          (SELECT  count(*) COUNTGL from t_bas_s103
          INNER JOIN(
            SELECT distinct(FK_ID) as FK_ID from t_bas_s103_ext where 1 = 1
          )aa on t_bas_s103.fk_id = aa.fk_id
          INNER JOIN t_bas_source_ext t on t_bas_s103.fk_id=t.formid
          INNER JOIN t_qc_jzs q on t.cid=Q.id
          INNER JOIN sys_uicm_user u on q.resource_id=u.resource_id
          INNER JOIN t_bas_s103_ext e on t_bas_s103.fk_id=e.fk_id
          where t.type='T_BAS_S103' AND U.IS_ACTIVE='1' AND Q.REPORT_FLAG IN ('8','9','C') and e.fk_id is not null
          AND QYYXZT IN ('1','2','3')
          UNION ALL
          SELECT  count(*) COUNTGL from t_bas_s103
          INNER JOIN(
            SELECT distinct(FK_ID) as FK_ID from t_bas_s103_ext where 1 = 1
          )aa on t_bas_s103.fk_id = aa.fk_id
          INNER JOIN t_bas_source_ext t on t_bas_s103.fk_id=t.formid
          INNER JOIN t_qc_GMH q on t.cid=Q.id
          INNER JOIN sys_uicm_user u on q.resource_id=u.resource_id
          INNER JOIN t_bas_s103_ext e on t_bas_s103.fk_id=e.fk_id
          where t.type='T_BAS_S103' AND U.IS_ACTIVE='1' AND Q.REPORT_FLAG IN ('8','9','C') and e.fk_id is not null
          AND QYYXZT IN ('1','2','3')
          UNION ALL
          SELECT count(*) COUNTGL from t_bas_s103_AQ
          INNER JOIN(
          SELECT distinct(FK_ID) as FK_ID from t_bas_s103_aq_ext where 1 = 1
          )aa on t_bas_s103_AQ.fk_id = aa.fk_id
          INNER JOIN t_qc_AREA q on t_bas_s103_AQ.fk_id=q.fk_id
          INNER JOIN t_bas_s103_AQ_ext e on t_bas_s103_AQ.fk_id=e.fk_id
          where  Q.REPORT_FLAG IN ('8','9','C') AND Q.TABLE_NAME='T_BAS_S103_AQ' and e.fk_id is not null
          )
          WHERE 1=1
          */
          //dishiEntCountArr = await this.GetDiShiEntCount('qhdm','T_BAS_S103_AQ');
          var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
              "610629","610630","610631","610632"];
          var person = new Object();
          for(var i=0;i<xzqharray.length;i++)
          {
              var count=new Array();
              count.push({"count":this.barDataXingZhengCun.FGYGLData[i]});
              person[xzqharray[i]]=count;
          }
          dishiEntCountArr =person;

      }
      if(this.radioFenLei == 2 && this.isQiYe){
        dishiEntCountArr = await this.GetDiShiEntCount('qhdm','T_BAS_S104');
      }
      if(this.radioFenLei == 3 && this.isQiYe){
        //dishiEntCountArr = await this.GetDiShiEntCount('xzqdm','T_BAS_Y102');

        // dishiEntCountArr={"xixian":[{count:"110"}],"hancheng":[{count:"45"}],"yanglin":[{count:"7"}],"xian":[{count:"493"}],"tongchaun":[{count:"101"}],"baoji":[{count:"293"}],"xianyang":[{count:"327"}],"weinan":[{count:"472"}],"yanan":[{count:"250"}],"hanzhong":[{count:"256"}],"yulin":[{count:"553"}],"ankang":[{count:"174"}],"shangluo":[{count:"151"}]};
        //dishiEntCountArr = {"610600":[{"count":"0"}],"610602":[{"count":"199"}],"610603":[{"count":"62"}],"610621":[{"count":"77"}],"610622":[{"count":"55"}],"610623":[{"count":"92"}],"610625":[{"count":"103"}],"610626":[{"count":"70"}],"610627":[{"count":"66"}],"610628":[{"count":"69"}],"610629":[{"count":"66"}],"610630":[{"count":"49"}],"610631":[{"count":"25"}],"610632":[{"count":"82"}]};
         // dishiEntCountArr = await this.GetDiShiEntCount('xzqdm','T_BAS_Y102_20190104BAK');
          var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
              "610629","610630","610631","610632"];
          var person = new Object();
          for(var i=0;i<xzqharray.length;i++)
          {
              var count=new Array();
              count.push({"count":this.barDataXingZhengCun.JYZData[i]});
              person[xzqharray[i]]=count;
          }
          dishiEntCountArr =person;
      }
      if(this.radioFenLei == 4 && this.isQiYe){
       // dishiEntCountArr = await this.GetDiShiEntCount('qhdm','T_BAS_Y101');
          var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
              "610629","610630","610631","610632"];
          var person = new Object();
          for(var i=0;i<xzqharray.length;i++)
          {
              var count=new Array();
              count.push({"count":this.barDataXingZhengCun.CYKData[i]});
              person[xzqharray[i]]=count;
          }
          dishiEntCountArr =person;
      }
      console.log(dishiEntCountArr);
      this.GetPoiFeature(dishiEntCountArr);
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


    async GetDiShiEntCount(XZQfild,tableName){
      var DiShiEntCount = {};
      var Params = {
        tableName:tableName,
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
      this.removeshyEnt();
      this.closePopup();
      this.LoadDiShiPopup();
      this.poiLayerCount = 1;
      this.map.getView().setZoom(8);
      var coordinate = [12149145.114081362, 4316266.289];
      this.map.getView().setCenter(coordinate);

      if(this.radioFenLei == 1){
        this.poiTablename='T_BAS_S103_AQ',
        this.fieldName= "dwmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",

        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
/*        this.removeshyEnt();
        this.closePopup();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
       // this.changeToQuanSheng();
      }
      else if(this.radioFenLei == 2){
        this.poiTablename='T_BAS_S104',
        this.fieldName= "pwkmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",

        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
/*        this.removeshyEnt();
        this.closePopup();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
      //  this.changeToQuanSheng();
      }
      else if(this.radioFenLei == 3){
        this.poiTablename='T_BAS_Y102',
        this.fieldName= "dwxxmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",

        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
/*        this.removeshyEnt();
        this.closePopup();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
      //  this.changeToQuanSheng();
      }
      else if(this.radioFenLei == 4){
        this.poiTablename='T_BAS_Y101_COOR',
        this.fieldName= "dwxxmc",
        this.JingDu= "jingdu",
        this.WeiDu= "weidu",

        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
/*        this.removeshyEnt();
        this.closePopup();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
      //  this.changeToQuanSheng();
      }

    },
    removeshyEnt(){
      this.map.removeLayer(this.shyEntlWMTSLayer);
      this.map.removeLayer(this.shyEntfgyqyWMTSLayer);
      this.map.removeLayer(this.shyEntjyzWMTSLayer);
      this.map.removeLayer(this.shyEntpwkWMTSLayer);
      this.map.removeLayer(this.shyEntcykWMTSLayer);

    },
    addshyEnt(){
      this.map.addLayer(this.shyEntfgyqyWMTSLayer);
      this.map.addLayer(this.shyEntjyzWMTSLayer);
      this.map.addLayer(this.shyEntpwkWMTSLayer);
      this.map.addLayer(this.shyEntcykWMTSLayer);
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
        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
        this.radioFenLei = 1;
        this.resetPoiInfo();
        this.isDiShi = true;
        this.isQiYe = false;
        this.removeshyEnt();
        this.isShowEntFenLei=false;
/*        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
      //  this.changeToQuanSheng();
          this.created();
        this.map.removeLayer(this.poiVectorLayer);
        this.poiLayerCount = 0;
        this.isShowGuanZhong = false;
      }
      else{
        this.isShowtoolBarquery = true;
        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
        this.radioFenLei = 1;
        this.isDiShi = false;
        this.isQiYe = true;
        if(this.sjOverlayVectorSource){
          this.sjOverlayVectorSource.clear();
        }
        //this.addshyEnt();
        this.isShowEntFenLei=true;
      //  this.changeToQuanSheng();
          this.created();
/*        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.isShowGuanZhong = false;
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
      var layerName = 'hkywry:shypro';
      var gridsetName = 'EPSG:900913';
      var tileSource = new ol.source.WMTS({
            url: 'http://localhost:8082/geoserver/gwc/service/wmts',
            layer: layerName,
            format: "image/png",
            matrixSet: gridsetName,
            projection: projection,
            tileGrid: tilegrid
      });
      this.shyEntlWMTSLayer = new ol.layer.Tile({
        source: tileSource,
      });

      this.shyEntfgyqyWMTSLayer = new ol.layer.Tile({
        source:new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:shyfgyqypro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });
      this.shyEntjyzWMTSLayer = new ol.layer.Tile({
        source:new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:shyjyzpro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });
      this.shyEntpwkWMTSLayer = new ol.layer.Tile({
        source:new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:shypwkpro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });

      this.shyEntcykWMTSLayer = new ol.layer.Tile({
        source:new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:shycykpro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });






    },
    OpenPicture(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/排污口.jpg";
    },
    OpenPictureGL(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/锅炉.jpg";
    },
    OpenPictureJYZ(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/移动.jpg";
    },
    LeftBtnJYZ(){
      this.pieDataLeftCenter = this.pieDataLeftJiaYouZhan;
    },
    LeftBtnCYK(){
      this.pieDataLeftCenter = this.pieDataLeftChuYouKu;
    },
    LoadSHYGL(){
      var that = this;
      // 添加省级专题图，行政区边界只加载一次
      if(that.shyglVectorSource == null){
        that.shyglVectorSource = new ol.source.Vector();
        that.shyglVectorLayer = new ol.layer.Vector({
          source: that.shyglVectorSource,
        });
        that.map.addLayer(that.shyglVectorLayer);

        let json = require('../../assets/js/geojson/shyglpro.json')

        var features = (new ol.format.GeoJSON()).readFeatures(json,{
                  dataProjection : 'EPSG:3857',
                  featureProjection : 'EPSG:3857'
          })
        that.shyglVectorSource.addFeatures(features);
        // 刷新
        that.refreshShyglvectorLayer();
      }else{
        // 刷新
        that.refreshShyglvectorLayer();
      }
    },
    refreshShyglvectorLayer(){
      var that = this;


      // 根据统计数据结果更新数据，专题图和图例
      that.processRequestDataSHYGL(that.shyglVectorSource.getFeatures());

      that.shyglVectorLayer.setStyle(that.getStyleFunctionSHYGL);

    },
    // 将统计数据赋值给feature
    processRequestDataSHYGL(features){
      // 处理实体数量数据
      for(var j=0,jj=features.length; j<jj; j++){
          features[j].set("tagSHYGLValue", features[j].get("GuoLu"));
        }
    },
    getStyleFunctionSHYGL(feature){
      var that = this;
      return new ol.style.Style({
            fill: new ol.style.Fill({color: that.getFillColorSHYGL(feature)}),
            stroke: new ol.style.Stroke({color: 'rgb(201,204,204,0.3)', width: 0.5}),
          })
    },
    // 获取统计专题填充颜色
    getFillColorSHYGL(feature){
      var that = this;
      var tagValue = feature.get("tagSHYGLValue");
      var fillColor = null;

      if(tagValue>=0 && tagValue<= 4){
        fillColor = "rgb(11,197,188,0.3)";
      }else if(tagValue>=5 && tagValue<= 12){
        fillColor = "rgb(10,184,175,0.3)";
      }else if(tagValue>=13 && tagValue<= 19){
        fillColor = "rgb(8,172,163,0.3)";
      }else if(tagValue>=20 && tagValue<= 29){
        fillColor = "rgb(8,161,154,0.3)";
      }else if(tagValue>=30 && tagValue<= 42){
        fillColor = "rgb(7,150,143,0.3)";
      }else if(tagValue>=43 && tagValue<= 58){
        fillColor = "rgb(7,141,134,0.3)";
      }else if(tagValue>=59 && tagValue<= 85){
        fillColor = "rgb(6,131,125,0.3)";
      }else if(tagValue>=86 && tagValue<= 237){
        fillColor = "rgb(5,121,115,0.3)";
      }else if(tagValue>=238 && tagValue<= 510){
        fillColor = "rgb(5,117,112,0.3)";
      }else if(tagValue>=511 && tagValue<= 3366){
        fillColor = "rgb(5,109,104,0.3)";
      }
      else{
        fillColor = "rgb(5,109,104,0.3)";
      }

      return fillColor;
    },
    //删除工业锅炉
    LeftBtnGB(){
      /*
      this.map.removeLayer(this.HeatLayer);
      this.HeatLayer=null;
      */
      this.isXuanRan = false;

      var that = this;
      that.shyglVectorLayer.setStyle(that.DeleteStyleFunctionSHYGL);

    },
    DeleteStyleFunctionSHYGL(feature){
      var that = this;
      return new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba(255,255,255,0)'}),
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0)', width: 1}),
          })
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

        //左1
        this.pieDataShengHuoYuan = {
          dataArr: [
              { value: (parseFloat(this.pieDataYuLinShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataYanAnShengHuoYuan.dataArr[0].value)).toFixed(2), name: "重点区域生活源燃煤行政村（社区）" },
              { value: (parseFloat(this.pieDataYuLinShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataYanAnShengHuoYuan.dataArr[1].value)).toFixed(2), name: "行政村" },
              { value: (parseFloat(this.pieDataYuLinShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataYanAnShengHuoYuan.dataArr[2].value)).toFixed(2), name: "生活源锅炉" },
              { value: (parseFloat(this.pieDataYuLinShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataYanAnShengHuoYuan.dataArr[3].value)).toFixed(2), name: "入河排污口" },
              { value: (parseFloat(this.pieDataYuLinShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataYanAnShengHuoYuan.dataArr[4].value)).toFixed(2), name: "城镇居民生活源" },
          ]
        };

        //左2
        this.pieDataGuoLu = {
          dataArr: [
              { value: (parseFloat(this.pieDataYuLinGuoLu.dataArr[0].value) + parseFloat(this.pieDataYanAnGuoLu.dataArr[0].value)).toFixed(2), name: "燃煤锅炉数量" },
              { value: (parseFloat(this.pieDataYuLinGuoLu.dataArr[1].value) + parseFloat(this.pieDataYanAnGuoLu.dataArr[1].value)).toFixed(2), name: "燃油锅炉数量" },
              { value: (parseFloat(this.pieDataYuLinGuoLu.dataArr[2].value) + parseFloat(this.pieDataYanAnGuoLu.dataArr[2].value)).toFixed(2), name: "燃气锅炉数量" },
              { value: (parseFloat(this.pieDataYuLinGuoLu.dataArr[3].value) + parseFloat(this.pieDataYanAnGuoLu.dataArr[3].value)).toFixed(2), name: "燃生物质锅炉数量" },
          ]
        };

        //左3
        this.pieDataPaiWuKou = {
          dataArr: [
              { value: (parseFloat(this.pieDataYuLinPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataYanAnPaiWuKou.dataArr[0].value)).toFixed(2), name: "规模以上" },
              { value: (parseFloat(this.pieDataYuLinPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataYanAnPaiWuKou.dataArr[1].value)).toFixed(2), name: "规模以下" },
          ]
        };


        //右1
        this.barDataRightTopFeiQi = {
          xAxis: ["二氧化硫","氮氧化物", "颗粒物","挥发性有机物"],
          yAxis: [
            (parseFloat(this.barDataYuLinFeiQi.yAxis[0]) + parseFloat(this.barDataYanAnFeiQi.yAxis[0])),
            (parseFloat(this.barDataYuLinFeiQi.yAxis[1]) + parseFloat(this.barDataYanAnFeiQi.yAxis[1])),
            (parseFloat(this.barDataYuLinFeiQi.yAxis[2]) + parseFloat(this.barDataYanAnFeiQi.yAxis[2])),
            (parseFloat(this.barDataYuLinFeiQi.yAxis[3]) + parseFloat(this.barDataYanAnFeiQi.yAxis[3])),
          ],
        };



        //右2
        this.barDataRightCenterFeiShui = {
          xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
          yAxis: [
            (parseFloat(this.barDataYuLinFeiShui.yAxis[0]) + parseFloat(this.barDataYanAnFeiShui.yAxis[0])),
            (parseFloat(this.barDataYuLinFeiShui.yAxis[1]) + parseFloat(this.barDataYanAnFeiShui.yAxis[1])),
            (parseFloat(this.barDataYuLinFeiShui.yAxis[2]) + parseFloat(this.barDataYanAnFeiShui.yAxis[2])),
            (parseFloat(this.barDataYuLinFeiShui.yAxis[3]) + parseFloat(this.barDataYanAnFeiShui.yAxis[3])),
          ],
        };

        //右3
        this.barDataRightBottomFeiQi = {
          xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
          yAxis: [
            (parseFloat(this.barDataYuLinFeiQi3.yAxis[0]) + parseFloat(this.barDataYanAnFeiQi3.yAxis[0])),
            (parseFloat(this.barDataYuLinFeiQi3.yAxis[1]) + parseFloat(this.barDataYanAnFeiQi3.yAxis[1])),
            (parseFloat(this.barDataYuLinFeiQi3.yAxis[2]) + parseFloat(this.barDataYanAnFeiQi3.yAxis[2])),
            (parseFloat(this.barDataYuLinFeiQi3.yAxis[3]) + parseFloat(this.barDataYanAnFeiQi3.yAxis[3])),
          ],
        }




      }
      else if(quyu == "guanzhong"){



      //右3
      this.barDataRightTopFeiQi = {
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [0.325,0.240,0.1732,0.0237],
         /*
          yAxis: [
            (parseFloat(this.barDataTongChuanFeiQi.yAxis[0]) + parseFloat(this.barDataXiAnFeiQi.yAxis[0]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[0]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[0]) + parseFloat(this.barDataXianYangFeiQi.yAxis[0])),
            (parseFloat(this.barDataTongChuanFeiQi.yAxis[1]) + parseFloat(this.barDataXiAnFeiQi.yAxis[1]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[1]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[1]) + parseFloat(this.barDataXianYangFeiQi.yAxis[1])),
            (parseFloat(this.barDataTongChuanFeiQi.yAxis[2]) + parseFloat(this.barDataXiAnFeiQi.yAxis[2]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[2]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[2]) + parseFloat(this.barDataXianYangFeiQi.yAxis[2])),
            (parseFloat(this.barDataTongChuanFeiQi.yAxis[3]) + parseFloat(this.barDataXiAnFeiQi.yAxis[3]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[3]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[3]) + parseFloat(this.barDataXianYangFeiQi.yAxis[3])),
          ],
          */
      };
      //右1
      this.barDataRightCenterFeiShui = {
        xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        yAxis: [12.635,0.697,1.999,0.09],
        /*
        yAxis: [
          (parseFloat(this.pieDataHanChengFeiShui.dataArr[0].value)+parseFloat(this.pieDataXiXianFeiShui.dataArr[0].value)+parseFloat(this.pieDataYangLinFeiShui.dataArr[0].value)+parseFloat(this.barDataTongChuanFeiShui.yAxis[0]) + parseFloat(this.barDataXiAnFeiShui.yAxis[0]) + parseFloat(this.barDataWeiNanFeiShui.yAxis[0]) + parseFloat(this.barDataBaoJiFeiShui.yAxis[0]) + parseFloat(this.barDataXianYangFeiShui.yAxis[0])),
          (parseFloat(this.pieDataHanChengFeiShui.dataArr[1].value)+parseFloat(this.pieDataXiXianFeiShui.dataArr[1].value)+parseFloat(this.pieDataYangLinFeiShui.dataArr[1].value)+parseFloat(this.barDataTongChuanFeiShui.yAxis[1]) + parseFloat(this.barDataXiAnFeiShui.yAxis[1]) + parseFloat(this.barDataWeiNanFeiShui.yAxis[1]) + parseFloat(this.barDataBaoJiFeiShui.yAxis[1]) + parseFloat(this.barDataXianYangFeiShui.yAxis[1])),
          (parseFloat(this.pieDataHanChengFeiShui.dataArr[2].value)+parseFloat(this.pieDataXiXianFeiShui.dataArr[2].value)+parseFloat(this.pieDataYangLinFeiShui.dataArr[2].value)+parseFloat(this.barDataTongChuanFeiShui.yAxis[2]) + parseFloat(this.barDataXiAnFeiShui.yAxis[2]) + parseFloat(this.barDataWeiNanFeiShui.yAxis[2]) + parseFloat(this.barDataBaoJiFeiShui.yAxis[2]) + parseFloat(this.barDataXianYangFeiShui.yAxis[2])),
          (parseFloat(this.pieDataHanChengFeiShui.dataArr[3].value)+parseFloat(this.pieDataXiXianFeiShui.dataArr[3].value)+parseFloat(this.pieDataYangLinFeiShui.dataArr[3].value)+parseFloat(this.barDataTongChuanFeiShui.yAxis[3]) + parseFloat(this.barDataXiAnFeiShui.yAxis[3]) + parseFloat(this.barDataWeiNanFeiShui.yAxis[3]) + parseFloat(this.barDataBaoJiFeiShui.yAxis[3]) + parseFloat(this.barDataXianYangFeiShui.yAxis[3])),
        ],
        */
      };


      //右2
      this.barDataRightBottomFeiQi = {
        xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
        yAxis: [0.024,1.621,4.645,3.794],
        /*
        yAxis: [
          (parseFloat(this.pieDataHanChengFeiQi3.dataArr[0].value)+parseFloat(this.pieDataXiXianFeiQi3.dataArr[0].value)+parseFloat(this.pieDataYangLinFeiQi3.dataArr[0].value)+parseFloat(this.barDataTongChuanFeiQi3.yAxis[0]) + parseFloat(this.barDataXiAnFeiQi3.yAxis[0]) + parseFloat(this.barDataWeiNanFeiQi3.yAxis[0]) + parseFloat(this.barDataBaoJiFeiQi3.yAxis[0]) + parseFloat(this.barDataXianYangFeiQi3.yAxis[0])),
          (parseFloat(this.pieDataHanChengFeiQi3.dataArr[1].value)+parseFloat(this.pieDataXiXianFeiQi3.dataArr[1].value)+parseFloat(this.pieDataYangLinFeiQi3.dataArr[1].value)+parseFloat(this.barDataTongChuanFeiQi3.yAxis[1]) + parseFloat(this.barDataXiAnFeiQi3.yAxis[1]) + parseFloat(this.barDataWeiNanFeiQi3.yAxis[1]) + parseFloat(this.barDataBaoJiFeiQi3.yAxis[1]) + parseFloat(this.barDataXianYangFeiQi3.yAxis[1])),
          (parseFloat(this.pieDataHanChengFeiQi3.dataArr[2].value)+parseFloat(this.pieDataXiXianFeiQi3.dataArr[2].value)+parseFloat(this.pieDataYangLinFeiQi3.dataArr[2].value)+parseFloat(this.barDataTongChuanFeiQi3.yAxis[2]) + parseFloat(this.barDataXiAnFeiQi3.yAxis[2]) + parseFloat(this.barDataWeiNanFeiQi3.yAxis[2]) + parseFloat(this.barDataBaoJiFeiQi3.yAxis[2]) + parseFloat(this.barDataXianYangFeiQi3.yAxis[2])),
          (parseFloat(this.pieDataHanChengFeiQi3.dataArr[3].value)+parseFloat(this.pieDataXiXianFeiQi3.dataArr[3].value)+parseFloat(this.pieDataYangLinFeiQi3.dataArr[3].value)+parseFloat(this.barDataTongChuanFeiQi3.yAxis[3]) + parseFloat(this.barDataXiAnFeiQi3.yAxis[3]) + parseFloat(this.barDataWeiNanFeiQi3.yAxis[3]) + parseFloat(this.barDataBaoJiFeiQi3.yAxis[3]) + parseFloat(this.barDataXianYangFeiQi3.yAxis[3])),
        ],
        */
      }


        //左1

        this.pieDataShengHuoYuan = {
          dataArr: [
              { value: (parseFloat(this.pieDataTongChuanShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataXiAnShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataWeiNanShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataBaoJiShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataXianYangShengHuoYuan.dataArr[0].value)).toFixed(2), name: "重点区域生活源燃煤行政村（社区）" },
              { value: (parseFloat(this.pieDataTongChuanShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataXiAnShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataWeiNanShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataBaoJiShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataXianYangShengHuoYuan.dataArr[1].value)).toFixed(2), name: "行政村" },
              { value: (parseFloat(this.pieDataTongChuanShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataXiAnShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataWeiNanShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataBaoJiShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataXianYangShengHuoYuan.dataArr[2].value)).toFixed(2), name: "生活源锅炉" },
              { value: (parseFloat(this.pieDataTongChuanShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataXiAnShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataWeiNanShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataBaoJiShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataXianYangShengHuoYuan.dataArr[3].value)).toFixed(2), name: "入河排污口" },
              { value: (parseFloat(this.pieDataTongChuanShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataXiAnShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataWeiNanShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataBaoJiShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataXianYangShengHuoYuan.dataArr[4].value)).toFixed(2), name: "城镇居民生活源" },
          ]
        };

        //左2
        this.pieDataGuoLu = {
          dataArr: [
              { value: (parseFloat(this.pieDataHanChengGuoLu.dataArr[0].value)+parseFloat(this.pieDataXiXianGuoLu.dataArr[0].value)+parseFloat(this.pieDataYangLinGuoLu.dataArr[0].value)+parseFloat(this.pieDataTongChuanGuoLu.dataArr[0].value) + parseFloat(this.pieDataXiAnGuoLu.dataArr[0].value) + parseFloat(this.pieDataWeiNanGuoLu.dataArr[0].value) + parseFloat(this.pieDataBaoJiGuoLu.dataArr[0].value) + parseFloat(this.pieDataXianYangGuoLu.dataArr[0].value)).toFixed(2), name: "燃煤锅炉数量" },
              { value: (parseFloat(this.pieDataHanChengGuoLu.dataArr[1].value)+parseFloat(this.pieDataXiXianGuoLu.dataArr[1].value)+parseFloat(this.pieDataYangLinGuoLu.dataArr[1].value)+parseFloat(this.pieDataTongChuanGuoLu.dataArr[1].value) + parseFloat(this.pieDataXiAnGuoLu.dataArr[1].value) + parseFloat(this.pieDataWeiNanGuoLu.dataArr[1].value) + parseFloat(this.pieDataBaoJiGuoLu.dataArr[1].value) + parseFloat(this.pieDataXianYangGuoLu.dataArr[1].value)).toFixed(2), name: "燃油锅炉数量" },
              { value: (parseFloat(this.pieDataHanChengGuoLu.dataArr[2].value)+parseFloat(this.pieDataXiXianGuoLu.dataArr[2].value)+parseFloat(this.pieDataYangLinGuoLu.dataArr[2].value)+parseFloat(this.pieDataTongChuanGuoLu.dataArr[2].value) + parseFloat(this.pieDataXiAnGuoLu.dataArr[2].value) + parseFloat(this.pieDataWeiNanGuoLu.dataArr[2].value) + parseFloat(this.pieDataBaoJiGuoLu.dataArr[2].value) + parseFloat(this.pieDataXianYangGuoLu.dataArr[2].value)).toFixed(2), name: "燃气锅炉数量" },
              { value: (parseFloat(this.pieDataHanChengGuoLu.dataArr[3].value)+parseFloat(this.pieDataXiXianGuoLu.dataArr[3].value)+parseFloat(this.pieDataYangLinGuoLu.dataArr[3].value)+parseFloat(this.pieDataTongChuanGuoLu.dataArr[3].value) + parseFloat(this.pieDataXiAnGuoLu.dataArr[3].value) + parseFloat(this.pieDataWeiNanGuoLu.dataArr[3].value) + parseFloat(this.pieDataBaoJiGuoLu.dataArr[3].value) + parseFloat(this.pieDataXianYangGuoLu.dataArr[3].value)).toFixed(2), name: "燃生物质锅炉数量" },
          ]
        };

        //左3
        this.pieDataPaiWuKou = {
          dataArr: [
              { value: (parseFloat(this.pieDataHanChengPaiWuKou.dataArr[0].value)+parseFloat(this.pieDataXiXianPaiWuKou.dataArr[0].value)+parseFloat(this.pieDataYangLinPaiWuKou.dataArr[0].value)+parseFloat(this.pieDataTongChuanPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataXiAnPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataWeiNanPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataBaoJiPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataXianYangPaiWuKou.dataArr[0].value)).toFixed(2), name: "规模以上" },
              { value: (parseFloat(this.pieDataHanChengPaiWuKou.dataArr[1].value)+parseFloat(this.pieDataXiXianPaiWuKou.dataArr[1].value)+parseFloat(this.pieDataYangLinPaiWuKou.dataArr[1].value)+parseFloat(this.pieDataTongChuanPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataXiAnPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataWeiNanPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataBaoJiPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataXianYangPaiWuKou.dataArr[1].value)).toFixed(2), name: "规模以下" },
          ]
        };
        /*
        console.log('barDataRightTopFeiQi1',(parseFloat(this.barDataTongChuanFeiQi.yAxis[0]) + parseFloat(this.barDataXiAnFeiQi.yAxis[0]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[0]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[0]) + parseFloat(this.barDataXianYangFeiQi.yAxis[0])));
        console.log('barDataRightTopFeiQi2',(parseFloat(this.barDataTongChuanFeiQi.yAxis[1]) + parseFloat(this.barDataXiAnFeiQi.yAxis[1]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[1]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[1]) + parseFloat(this.barDataXianYangFeiQi.yAxis[1])));
        console.log('barDataRightTopFeiQi3',(parseFloat(this.barDataTongChuanFeiQi.yAxis[2]) + parseFloat(this.barDataXiAnFeiQi.yAxis[2]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[2]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[2]) + parseFloat(this.barDataXianYangFeiQi.yAxis[2])));
        console.log('barDataRightTopFeiQi4',(parseFloat(this.barDataTongChuanFeiQi.yAxis[3]) + parseFloat(this.barDataXiAnFeiQi.yAxis[3]) + parseFloat(this.barDataWeiNanFeiQi.yAxis[3]) + parseFloat(this.barDataBaoJiFeiQi.yAxis[3]) + parseFloat(this.barDataXianYangFeiQi.yAxis[3])));
        console.log('this.barDataRightTopFeiQi',this.barDataRightTopFeiQi);
        */

        //console.log('this.barDataRightTopFeiQi1111',this.barDataRightTopFeiQi);







      }
      else if(quyu == "shannan"){
        //左1
        this.pieDataShengHuoYuan = {
          dataArr: [
              { value: (parseFloat(this.pieDataHanZhongShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataShangLuoShengHuoYuan.dataArr[0].value) + parseFloat(this.pieDataAnKangShengHuoYuan.dataArr[0].value)).toFixed(2), name: "重点区域生活源燃煤行政村（社区）" },
              { value: (parseFloat(this.pieDataHanZhongShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataShangLuoShengHuoYuan.dataArr[1].value) + parseFloat(this.pieDataAnKangShengHuoYuan.dataArr[1].value)).toFixed(2), name: "行政村" },
              { value: (parseFloat(this.pieDataHanZhongShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataShangLuoShengHuoYuan.dataArr[2].value) + parseFloat(this.pieDataAnKangShengHuoYuan.dataArr[2].value)).toFixed(2), name: "生活源锅炉" },
              { value: (parseFloat(this.pieDataHanZhongShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataShangLuoShengHuoYuan.dataArr[3].value) + parseFloat(this.pieDataAnKangShengHuoYuan.dataArr[3].value)).toFixed(2), name: "入河排污口" },
              { value: (parseFloat(this.pieDataHanZhongShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataShangLuoShengHuoYuan.dataArr[4].value) + parseFloat(this.pieDataAnKangShengHuoYuan.dataArr[4].value)).toFixed(2), name: "城镇居民生活源" },
          ]
        };

        //左2
        this.pieDataGuoLu = {
          dataArr: [
              { value: (parseFloat(this.pieDataHanZhongGuoLu.dataArr[0].value) + parseFloat(this.pieDataShangLuoGuoLu.dataArr[0].value) + parseFloat(this.pieDataAnKangGuoLu.dataArr[0].value)).toFixed(2), name: "燃煤锅炉数量" },
              { value: (parseFloat(this.pieDataHanZhongGuoLu.dataArr[1].value) + parseFloat(this.pieDataShangLuoGuoLu.dataArr[1].value) + parseFloat(this.pieDataAnKangGuoLu.dataArr[1].value)).toFixed(2), name: "燃油锅炉数量" },
              { value: (parseFloat(this.pieDataHanZhongGuoLu.dataArr[2].value) + parseFloat(this.pieDataShangLuoGuoLu.dataArr[2].value) + parseFloat(this.pieDataAnKangGuoLu.dataArr[2].value)).toFixed(2), name: "燃气锅炉数量" },
              { value: (parseFloat(this.pieDataHanZhongGuoLu.dataArr[3].value) + parseFloat(this.pieDataShangLuoGuoLu.dataArr[3].value) + parseFloat(this.pieDataAnKangGuoLu.dataArr[3].value)).toFixed(2), name: "燃生物质锅炉数量" },
          ]
        };

        //左3
        this.pieDataPaiWuKou = {
          dataArr: [
              { value: (parseFloat(this.pieDataHanZhongPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataShangLuoPaiWuKou.dataArr[0].value) + parseFloat(this.pieDataAnKangPaiWuKou.dataArr[0].value)).toFixed(2), name: "规模以上" },
              { value: (parseFloat(this.pieDataHanZhongPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataShangLuoPaiWuKou.dataArr[1].value) + parseFloat(this.pieDataAnKangPaiWuKou.dataArr[1].value)).toFixed(2), name: "规模以下" },
          ]
        };

        //右1
        this.barDataRightTopFeiQi = {
          xAxis: ["二氧化硫","氮氧化物", "颗粒物","挥发性有机物"],
          yAxis: [
            (parseFloat(this.barDataHanZhongFeiQi.yAxis[0]) + parseFloat(this.barDataShangLuoFeiQi.yAxis[0]) + parseFloat(this.barDataAnKangFeiQi.yAxis[0])),
            (parseFloat(this.barDataHanZhongFeiQi.yAxis[1]) + parseFloat(this.barDataShangLuoFeiQi.yAxis[1]) + parseFloat(this.barDataAnKangFeiQi.yAxis[1])),
            (parseFloat(this.barDataHanZhongFeiQi.yAxis[2]) + parseFloat(this.barDataShangLuoFeiQi.yAxis[2]) + parseFloat(this.barDataAnKangFeiQi.yAxis[2])),
            (parseFloat(this.barDataHanZhongFeiQi.yAxis[3]) + parseFloat(this.barDataShangLuoFeiQi.yAxis[3]) + parseFloat(this.barDataAnKangFeiQi.yAxis[3])),
          ],
        };

        //右2
        this.barDataRightCenterFeiShui = {
          xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
          yAxis: [
            (parseFloat(this.barDataHanZhongFeiShui.yAxis[0]) + parseFloat(this.barDataShangLuoFeiShui.yAxis[0]) + parseFloat(this.barDataAnKangFeiShui.yAxis[0])),
            (parseFloat(this.barDataHanZhongFeiShui.yAxis[1]) + parseFloat(this.barDataShangLuoFeiShui.yAxis[1]) + parseFloat(this.barDataAnKangFeiShui.yAxis[1])),
            (parseFloat(this.barDataHanZhongFeiShui.yAxis[2]) + parseFloat(this.barDataShangLuoFeiShui.yAxis[2]) + parseFloat(this.barDataAnKangFeiShui.yAxis[2])),
            (parseFloat(this.barDataHanZhongFeiShui.yAxis[3]) + parseFloat(this.barDataShangLuoFeiShui.yAxis[3]) + parseFloat(this.barDataAnKangFeiShui.yAxis[3])),
          ],
        };

        //右3
        this.barDataRightBottomFeiQi = {
          xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
          yAxis: [
            (parseFloat(this.barDataHanZhongFeiQi3.yAxis[0]) + parseFloat(this.barDataShangLuoFeiQi3.yAxis[0]) + parseFloat(this.barDataAnKangFeiQi3.yAxis[0])),
            (parseFloat(this.barDataHanZhongFeiQi3.yAxis[1]) + parseFloat(this.barDataShangLuoFeiQi3.yAxis[1]) + parseFloat(this.barDataAnKangFeiQi3.yAxis[1])),
            (parseFloat(this.barDataHanZhongFeiQi3.yAxis[2]) + parseFloat(this.barDataShangLuoFeiQi3.yAxis[2]) + parseFloat(this.barDataAnKangFeiQi3.yAxis[2])),
            (parseFloat(this.barDataHanZhongFeiQi3.yAxis[3]) + parseFloat(this.barDataShangLuoFeiQi3.yAxis[3]) + parseFloat(this.barDataAnKangFeiQi3.yAxis[3])),
          ],
        }
      }
    },
    //加载热力图
    LeftBtnXR(){
      this.isXuanRan = true;
      this.LoadSHYGL();
      // 缩放到可视范围
      this.map.getView().fit(this.shyglVectorSource.getExtent());


      /*
      if(!this.HeatLayer){
        let json = require('../../assets/js/geojson/SXSHYGLRLT.json')

        var GLfeatures = (new ol.format.GeoJSON()).readFeatures(json,{
                  dataProjection : 'EPSG:3857',
                  featureProjection : 'EPSG:3857'
        })

        var vectorSource = new ol.source.Vector({
          features: GLfeatures,
        });
        this.HeatLayer = new ol.layer.Heatmap({
          source: vectorSource,
          radius: 20,//半径大小（以像素为单位,默认8
          gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
          opacity: [0, 0.8],//透明度
          blur: 20,//模糊大小（以像素为单位）,默认15
          shadow: 350,//阴影像素大小，默认250
          //矢量图层的渲染模式：
          //'image'：矢量图层呈现为图像。性能出色，但点符号和文本始终随视图一起旋转，像素在缩放动画期间缩放。
          //'vector'：矢量图层呈现为矢量。即使在动画期间也能获得最准确的渲染，但性能会降低。
          renderMode: 'vector',
          weight: function(feature) {
            var count = parseFloat(feature.get('GuoLu'))/100;
            console.log(count);
            return count;
          }

        });

        this.map.addLayer(this.HeatLayer);
        this.map.getView().setCenter([12149470.527,4175685.289]);
        this.map.getView().setZoom(6);
      }
      */







      /*
      var heatMapData = new ol.source.Vector();

      var coord = this.geoCoordMapNew.yulin;

      var lonLat = new ol.geom.Point(coord);

      var pointFeature = new ol.Feature({
        geometry: lonLat,
        weight: 20 // e.g. temperature
      });

      heatMapData.addFeature(pointFeature);

      //create the layer

      var heatMapLayer = new ol.layer.Heatmap({
        source: heatMapData,
        radius: 20
      });

      this.map.addLayer(heatMapLayer);
      */




      /*
      //var url="http://localhost:6080/arcgis/rest/services/SHYGLIDW/MapServer";
      //var url="http://localhost:6080/arcgis/rest/services/relituname/MapServer";
      var url="http://localhost:6080/arcgis/rest/services/relitu/MapServer";
      if(this.SHYGLLayerCount == 0){
        this.SHYGLLayer = this.LoadMapServer(url);
        this.map.addLayer(this.SHYGLLayer);
        this.SHYGLLayerCount = 1;
      }
      */
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
      //this.isDynamicPoiShow = true;

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
      created() {
          this.getYanAnchart();
          this.getXZQchart("610600");
      },
      //zjw 获取延安市整体数据
      async getYanAnchart(){
          var Params = {
            XZQDM: "init",
          }
          await api.getSHYgengxinCacheData(Params).then(res=>{
              var resultData = res.data;
              console.log(resultData);
              if(resultData){
                  if(resultData.status == "success"){
                      this.pieDataLeftCenter=resultData.data.grid02_1;
                      this.barDataXingZhengCun=resultData.data.grid04;
                      this.shyjbqk= "生活源基本情况（总量："+resultData.data.grid04.all+"）";
                      this.barDataRightCenterFeiShui=resultData.data.grid05;
                      this.barDataRightBottomFeiQi=resultData.data.grid06;
                      this.pieDataLeftJiaYouZhan=resultData.data.grid02_1;
                      this.pieDataLeftChuYouKu=resultData.data.grid02_2;
                  }
              }
          });
      },
      //zjw 获取点击变化数据
      async getXZQchart(xzqdm){
          var Params = {
              XZQDM: xzqdm,
          }
          await api.getSHYgengxinCacheData(Params).then(res=>{
              var resultData = res.data;
              console.log(resultData);
              if(resultData){
                  if(resultData.status == "success"){
                      this.pieDataGuoLu=resultData.data.grid01;
                      this.pieDataPaiWuKou=resultData.data.grid03;
                      this.barDataRightTopFeiQi=resultData.data.grid07;
                  }
              }
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
      this.map.on('moveend', this.onMapZoomHandler);
      this.map.on('pointermove', this.onMapMoveHandler);

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
/*          var name = feature.get('name');
          var lnglat = this.geoCoordPoiEnt[name];
          var LngLatPro = ol.proj.transform(lnglat, 'EPSG:4326' ,'EPSG:3857');
          //console.log('name',name,'LngLatPro',LngLatPro,'LngLat',feature.get('lnglat'));
          this.map.getView().setZoom(9);
          this.map.getView().setCenter(LngLatPro);*/
          //this.map.getView().setCenter(feature.get('lnglat'));

          this.map.getView().setZoom(10);
          this.map.getView().setCenter(e.coordinate);
        }
      }
      else{
          //当为企业坐标点时
          var coordinateLngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
          var EnterpriseInfo = await this.querySHYEntInfo(coordinateLngLat);
          this.closePopup();
          this.getEntPoiInfo(EnterpriseInfo);

      }

    },

    getEntPoiInfo(EnterpriseInfo){
      console.log("企业信息",EnterpriseInfo);
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
      if(EnterpriseInfo.LEIXING == 'jyz'){
        popContent.innerHTML = "";
        popContent.innerHTML += "<span class = 'poiText' >企业名称：" + EnterpriseInfo.name + "</span>";
        popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";
        if(EnterpriseInfo.SSJYZMC != 0 && EnterpriseInfo.SSJYZMC != 'null')
        popContent.innerHTML += "<span class = 'poiText' >所属加油站名称：" + EnterpriseInfo.SSJYZMC + "</span>";
        if(EnterpriseInfo.QYZGR != 0 &&EnterpriseInfo.QYZGR != 'null')
        popContent.innerHTML += "<span class = 'poiText' >汽油总罐容：" + EnterpriseInfo.QYZGR + "(立方米)</span>";
        if(EnterpriseInfo.QYNXSL != 0 &&EnterpriseInfo.QYNXSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >汽油年总销售量：" + EnterpriseInfo.QYNXSL + "(吨)</span>";
        if(EnterpriseInfo.CYZGR != 0 &&EnterpriseInfo.CYZGR != 'null')
        popContent.innerHTML += "<span class = 'poiText' >柴油总罐容：" + EnterpriseInfo.CYZGR + "(立方米)</span>";
        if(EnterpriseInfo.CYNXSL != 0 &&EnterpriseInfo.CYNXSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >柴油年总销售量：" + EnterpriseInfo.CYNXSL + "(吨)</span>";
        if(EnterpriseInfo.YQHSJDQY != 0 &&EnterpriseInfo.YQHSJDQY != 'null')
        popContent.innerHTML += "<span class = 'poiText' >油气回收阶段：" + EnterpriseInfo.YQHSJDQY + "</span>";
        if(EnterpriseInfo.LXR != 0 &&EnterpriseInfo.LXR != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXR + "</span>";
        if(EnterpriseInfo.DHHM != 0 &&EnterpriseInfo.DHHM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >电话号码：" + EnterpriseInfo.DHHM + "</span>";

      }
      else if(EnterpriseInfo.LEIXING == 'pwk'){
        popContent.innerHTML = "";
        popContent.innerHTML += "<span class = 'poiText' >名称：" + EnterpriseInfo.name + "</span>";
        popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";
        if(EnterpriseInfo.PWKLX_OR != 0 &&EnterpriseInfo.PWKLX_OR != 'null' && EnterpriseInfo.PWKLX_OR != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >排污口类型：" + EnterpriseInfo.PWKLX_OR + "</span>";
        if(EnterpriseInfo.PWKLB_OR != 0 &&EnterpriseInfo.PWKLB_OR != 'null'&& EnterpriseInfo.PWKLB_OR != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >排污口类别：" + EnterpriseInfo.PWKLB_OR + "</span>";
        if(EnterpriseInfo.PWKGM_OR != 0 &&EnterpriseInfo.PWKGM_OR != 'null'&& EnterpriseInfo.PWKGM_OR != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >排污口规模：" + EnterpriseInfo.PWKGM_OR + "</span>";
        if(EnterpriseInfo.RHHFS_OR != 0 &&EnterpriseInfo.RHHFS_OR != 'null'&& EnterpriseInfo.RHHFS_OR != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >入河（海）方式：" + EnterpriseInfo.RHHFS_OR + "</span>";
        if(EnterpriseInfo.SNSTMC != 0 &&EnterpriseInfo.SNSTMC != 'null'&& EnterpriseInfo.SNSTMC != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >受纳水体名称：" + EnterpriseInfo.SNSTMC + "</span>";
        if(EnterpriseInfo.SZDW != 0 &&EnterpriseInfo.SZDW != 'null'&& EnterpriseInfo.SZDW != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >设置单位：" + EnterpriseInfo.SZDW + "</span>";
        if(EnterpriseInfo.DWFZR != 0 &&EnterpriseInfo.DWFZR != 'null'&& EnterpriseInfo.DWFZR != 'undefined')
        popContent.innerHTML += "<span class = 'poiText' >单位负责人：" + EnterpriseInfo.DWFZR + "</span>";
      }
      else if(EnterpriseInfo.LEIXING == 'fgyqygl'){//非工业企业锅炉
          popContent.innerHTML = "";
          popContent.innerHTML += "<span class = 'poiText' >企业名称：" + EnterpriseInfo.name + "</span>";
          popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";
        if(EnterpriseInfo.YYGLSL != 0 &&EnterpriseInfo.YYGLSL != 'null')
          popContent.innerHTML += "<span class = 'poiText' >拥有锅炉数：" + EnterpriseInfo.YYGLSL + "(台)</span>";
        if(EnterpriseInfo.GLYT_OR != 0 &&EnterpriseInfo.GLYT_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >锅炉用途：" + EnterpriseInfo.GLYT_OR + "</span>";
        if(EnterpriseInfo.GLLX_OR != 0 &&EnterpriseInfo.GLLX_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >锅炉类型：" + EnterpriseInfo.GLLX_OR + "</span>";
        if(EnterpriseInfo.EDCL != 0 &&EnterpriseInfo.EDCL != 'null')
          popContent.innerHTML += "<span class = 'poiText' >额定出力：" + EnterpriseInfo.EDCL + "(吨/小时)</span>";
        if(EnterpriseInfo.NYXSJ != 0 &&EnterpriseInfo.NYXSJ != 'null')
          popContent.innerHTML += "<span class = 'poiText' >年运行时间：" + EnterpriseInfo.NYXSJ + "(月)</span>";
        if(EnterpriseInfo.PQTGD != 0 &&EnterpriseInfo.PQTGD != 'null')
          popContent.innerHTML += "<span class = 'poiText' >排气筒高度：" + EnterpriseInfo.PQTGD + "(米)</span>";
        if(EnterpriseInfo.GLRSFS_OR != 0 &&EnterpriseInfo.GLRSFS_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >锅炉燃烧方式：" + EnterpriseInfo.GLRSFS_OR + "</span>";
        if(EnterpriseInfo.RLMLX_OR != 0 &&EnterpriseInfo.RLMLX_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >燃料煤类型：" + EnterpriseInfo.RLMLX_OR + "</span>";
        if(EnterpriseInfo.RYLX_OR != 0 &&EnterpriseInfo.RYLX_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >燃油类型：" + EnterpriseInfo.RYLX_OR + "</span>";
        if(EnterpriseInfo.RQLX_OR != 0 &&EnterpriseInfo.RQLX_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >燃气类型：" + EnterpriseInfo.RQLX_OR + "</span>";
        if(EnterpriseInfo.ZXJCSSAZQK_OR != 0 &&EnterpriseInfo.ZXJCSSAZQK_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >在线监测设施安装情况：" + EnterpriseInfo.ZXJCSSAZQK_OR + "</span>";
        if(EnterpriseInfo.FMHLZDGFQX_OR != 0 &&EnterpriseInfo.FMHLZDGFQX_OR != 'null')
          popContent.innerHTML += "<span class = 'poiText' >粉煤灰、炉渣等固废去向：" + EnterpriseInfo.FMHLZDGFQX_OR + "</span>";
        if(EnterpriseInfo.LXFS_GDDH != 0 &&EnterpriseInfo.LXFS_GDDH != 'null')
          popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXFS_GDDH + "</span>";
        if(EnterpriseInfo.LXFS_YDDH != 0 &&EnterpriseInfo.LXFS_YDDH != 'null')
          popContent.innerHTML += "<span class = 'poiText' >电话：" + EnterpriseInfo.LXFS_YDDH + "</span>";

        this.fgyglfq = "非工业锅炉废气主要污染物排放量(吨)";
        this.barDataRightCenterFeiShui = {};
        this.barDataRightBottomFeiQi = {};
        this.fileTextShow = true;
        this.barDataRightTopFeiQi = EnterpriseInfo.fgyqyglFeiQi;

      }
      else{
        popContent.innerHTML = "";
        popContent.innerHTML += "<span class = 'poiText' >企业名称：" + EnterpriseInfo.name + "</span>";
        popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0].toFixed(2)+","+coordinate[1].toFixed(2) + "</span>";

        /*
        if(EnterpriseInfo.TYSHXYDM != 0 &&EnterpriseInfo.TYSHXYDM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >统一信用代码：" + EnterpriseInfo.TYSHXYDM + "</span>";
        if(EnterpriseInfo.QYFRDM != 0 &&EnterpriseInfo.QYFRDM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >组织机构代码：" + EnterpriseInfo.QYFRDM + "</span>";
        */
        if(EnterpriseInfo.FDDBRGTGSHHZXM != 0 &&EnterpriseInfo.FDDBRGTGSHHZXM != 'null'&&EnterpriseInfo.FDDBRGTGSHHZXM !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >法定代表人；" + EnterpriseInfo.FDDBRGTGSHHZXM + "</span>";
        if(EnterpriseInfo.QYNBDCYKQDMC != 0 &&EnterpriseInfo.QYNBDCYKQDMC != 'null'&&EnterpriseInfo.QYNBDCYKQDMC !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >企业内部的储油库（区）的名称：" + EnterpriseInfo.QYNBDCYKQDMC + "</span>";
        if(EnterpriseInfo.DHHM != 0 &&EnterpriseInfo.DHHM != 'null'&&EnterpriseInfo.DHHM !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >联系电话：" + EnterpriseInfo.DHHM + "</span>";


        if(EnterpriseInfo.YYCGBM1 != 0 &&EnterpriseInfo.YYCGBM1 != 'null' &&EnterpriseInfo.YYCGBM1 !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >原油-储罐编码：" + EnterpriseInfo.YYCGBM1 + "</span>";
        if(EnterpriseInfo.YYCGGR1 != 0 &&EnterpriseInfo.YYCGGR1 != 'null'&&EnterpriseInfo.YYCGGR1 !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >原油-储罐罐容：" + EnterpriseInfo.YYCGGR1 + "(立方米)</span>";
        if(EnterpriseInfo.YYNZZL1 != 0 &&EnterpriseInfo.YYNZZL1 != 'null'&&EnterpriseInfo.YYNZZL1 !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >原油-年周转量：" + EnterpriseInfo.YYNZZL1 + "(吨)</span>";
        if(EnterpriseInfo.QYYWZXJCXT != 0 &&EnterpriseInfo.QYYWZXJCXT != 'null'&&EnterpriseInfo.QYYWZXJCXT !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-有无在线监测系统：" + EnterpriseInfo.QYYWZXJCXT + "</span>";
        if(EnterpriseInfo.QYNZZL != 0 &&EnterpriseInfo.QYNZZL != 'null'&&EnterpriseInfo.QYNZZL !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-年周转量：" + EnterpriseInfo.QYNZZL + "(吨)</span>";
        if(EnterpriseInfo.QYYQHSZZYXXSS != 0 &&EnterpriseInfo.QYYQHSZZYXXSS != 'null'&&EnterpriseInfo.QYYQHSZZYXXSS !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-油气回收装置年运行小时数：" + EnterpriseInfo.QYYQHSZZYXXSS + "(小时)</span>";
        if(EnterpriseInfo.QYCGBM != 0 &&EnterpriseInfo.QYCGBM != 'null'&&EnterpriseInfo.QYCGBM !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-储罐编码：" + EnterpriseInfo.QYCGBM + "</span>";
        if(EnterpriseInfo.QYCGGR != 0 &&EnterpriseInfo.QYCGGR != 'null'&&EnterpriseInfo.QYCGGR !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-储罐罐容：" + EnterpriseInfo.QYCGGR + "(立方米)</span>";
        if(EnterpriseInfo.QYYQHSZLJSDGJG != 0 &&EnterpriseInfo.QYYQHSZLJSDGJG != 'null'&&EnterpriseInfo.QYYQHSZLJSDGJG !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-油气回收治理技术顶罐结构：" + EnterpriseInfo.QYYQHSZLJSDGJG + "</span>";
        if(EnterpriseInfo.QYZYFS != 0 &&EnterpriseInfo.QYZYFS != 'null'&&EnterpriseInfo.QYZYFS !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-装油方式：" + EnterpriseInfo.QYZYFS + "</span>";
        if(EnterpriseInfo.QYYQCLFF3 != 0 &&EnterpriseInfo.QYYQCLFF3 != 'null'&&EnterpriseInfo.QYYQCLFF3 !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >汽油-油气处理方法：" + EnterpriseInfo.QYYQCLFF3 + "</span>";
        if(EnterpriseInfo.CYCGBM != 0 &&EnterpriseInfo.CYCGBM != 'null'&&EnterpriseInfo.CYCGBM !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >柴油-储罐编码：" + EnterpriseInfo.CYCGBM + "</span>";
        if(EnterpriseInfo.CYCGGR != 0 &&EnterpriseInfo.CYCGGR != 'null'&&EnterpriseInfo.CYCGGR !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >柴油-储罐罐容：" + EnterpriseInfo.CYCGGR + "(立方米)</span>";
        if(EnterpriseInfo.CYNZZL != 0 &&EnterpriseInfo.CYNZZL != 'null'&&EnterpriseInfo.CYNZZL !=undefined)
        popContent.innerHTML += "<span class = 'poiText' >柴油-年周转量：" + EnterpriseInfo.CYNZZL + "(吨)</span>";


      }
      that.Popup.setPosition(coordinatePro);
      that.isPopupShow = true;

      this.map.updateSize();

    },

    //查询企业信息
    async querySHYEntInfo(coordinateLngLat){
      var EntInfo = {};
        var tolerance=10*this.map.getView().getResolution();
      var Params = {
        coor: coordinateLngLat.toString(),
          tolerance:tolerance
      }

      await api.QuerySHYEntInfo(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){

            var InfoData = resultData.data.Info[0];
            if(InfoData.DWMC){
              EntInfo.name = InfoData.DWMC;
            }
            else{
              EntInfo.name = InfoData.pwkmc;
            }

            EntInfo.lng = InfoData.JINDU;
            EntInfo.lat = InfoData.WEIDU;
            EntInfo.leixing = InfoData.LEIXING;
          }
        }
      });

      if(EntInfo.leixing == 'fgyqygl'){
        //查询非工业锅炉统一信用和组织结构代码
        var ParamsEntXYJG = {
          name: EntInfo.name,
        }
        await api.QuerySHYEntXYJGXiangXiInfo(ParamsEntXYJG).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var InfoData = resultData.data.Info[0];
                EntInfo.tyshxydm = InfoData.TYSHXYDM;
                EntInfo.qyfrdm = InfoData.QYFRDM;
                console.log("非工业锅炉基本信息",InfoData);

                EntInfo.LXFS_GDDH = InfoData.LXFS_GDDH;
                EntInfo.LXFS_YDDH = InfoData.LXFS_YDDH;
                EntInfo.YYGLSL = InfoData.YYGLSL;
                EntInfo.LEIXING = EntInfo.leixing;
              }
          }
        });

        //查询非工业锅炉废气
        EntInfo.fgyqyglFeiQi =
        {
          xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
          yAxis: [0,0,0,0]
        };

        var ParamsEnt = {
          name: EntInfo.name,
          tyshxydm: EntInfo.tyshxydm,
          qyfrdm: EntInfo.qyfrdm,
        }

        await api.QuerySHYEntXiangXiInfo(ParamsEnt).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                console.log("工业锅炉详细信息",resultData.data);


                var dataJson = resultData.data;
                //判断json的key是否存在
                if(dataJson.hasOwnProperty("fgyglxx")){
                  var flyglInfo = resultData.data.fgyglxx[0];
                  var FeiQiJSON = {
                    xAxis: ["二氧化硫","氮氧化物","颗粒物", "挥发性有机物"],
                    yAxis: [parseFloat(flyglInfo.EYHLPFL),parseFloat(flyglInfo.DYHWPFL),parseFloat(flyglInfo.KLWPFL),parseFloat(flyglInfo.HFXYJWPFL)/1000]
                  }
                  EntInfo.fgyqyglFeiQi = FeiQiJSON;


                  console.log('锅炉用途',flyglInfo.GLYT_OR);
                  EntInfo.GLYT_OR = flyglInfo.GLYT_OR;
                  if(flyglInfo.GLYT_OR == 'M1'){
                    EntInfo.GLYT_OR = '供水';
                  }
                  else if(flyglInfo.GLYT_OR == 'M2'){
                    EntInfo.GLYT_OR = '供暖';
                  }
                  else if(flyglInfo.GLYT_OR == 'M3'){
                    EntInfo.GLYT_OR = '洗浴';
                  }
                  else if(flyglInfo.GLYT_OR == 'M4'){
                    EntInfo.GLYT_OR = '烘干';
                  }
                  else if(flyglInfo.GLYT_OR == 'M5'){
                    EntInfo.GLYT_OR = '餐饮';
                  }
                  else if(flyglInfo.GLYT_OR == 'M6'){
                    EntInfo.GLYT_OR = '高温消毒';
                  }
                  else if(flyglInfo.GLYT_OR == 'M8'){
                    EntInfo.GLYT_OR = '制冷';
                  }
                  else if(flyglInfo.GLYT_OR == 'M9'){
                    EntInfo.GLYT_OR = '其他';
                  }

                  EntInfo.GLLX_OR = flyglInfo.GLLX_OR;
                  if(flyglInfo.GLLX_OR == 'R1'){
                    EntInfo.GLLX_OR = '燃煤锅炉';
                  }
                  else if(flyglInfo.GLLX_OR == 'R2'){
                    EntInfo.GLLX_OR = '燃油锅炉';
                  }
                  else if(flyglInfo.GLLX_OR == 'R3'){
                    EntInfo.GLLX_OR = '燃气锅炉';
                  }
                  else if(flyglInfo.GLLX_OR == 'R4'){
                    EntInfo.GLLX_OR = '燃生物质锅炉';
                  }

                  EntInfo.GLRSFS_OR = flyglInfo.GLRSFS_OR;
                  if(flyglInfo.GLRSFS_OR == 'RM01'){
                    EntInfo.GLRSFS_OR = '抛煤机炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RM02'){
                    EntInfo.GLRSFS_OR = '链条炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RM03'){
                    EntInfo.GLRSFS_OR = '其他层燃炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RM04'){
                    EntInfo.GLRSFS_OR = '循环流化床锅炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RM05'){
                    EntInfo.GLRSFS_OR = '煤粉炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RM06'){
                    EntInfo.GLRSFS_OR = '其它';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RQ01'){
                    EntInfo.GLRSFS_OR = '室燃炉';
                  }
                  else if(flyglInfo.GLRSFS_OR == 'RQ02'){
                    EntInfo.GLRSFS_OR = '其他';
                  }

                  EntInfo.RLMLX_OR = flyglInfo.RLMLX_OR;
                  if(flyglInfo.RLMLX_OR == '101'){
                    EntInfo.RLMLX_OR = '原煤';
                  }
                  else if(flyglInfo.RLMLX_OR == '102'){
                    EntInfo.RLMLX_OR = '洗精煤';
                  }
                  else if(flyglInfo.RLMLX_OR == '103'){
                    EntInfo.RLMLX_OR = '其他洗煤';
                  }
                  else if(flyglInfo.RLMLX_OR == '104'){
                    EntInfo.RLMLX_OR = '型煤';
                  }
                  else if(flyglInfo.RLMLX_OR == '106'){
                    EntInfo.RLMLX_OR = '焦炭';
                  }


                  EntInfo.RYLX_OR = flyglInfo.RYLX_OR;

                  if(flyglInfo.RYLX_OR == '301'){
                    EntInfo.RYLX_OR = '原油';
                  }
                  else if(flyglInfo.RYLX_OR == '302'){
                    EntInfo.RYLX_OR = '其它';
                  }
                  else if(flyglInfo.RYLX_OR == '303'){
                    EntInfo.RYLX_OR = '煤油';
                  }
                  else if(flyglInfo.RYLX_OR == '304'){
                    EntInfo.RYLX_OR = '柴油';
                  }
                  else if(flyglInfo.RYLX_OR == '305'){
                    EntInfo.RYLX_OR = '燃料油';
                  }
                  else if(flyglInfo.RYLX_OR == '306'){
                    EntInfo.RYLX_OR = '醇基燃料';
                  }
                  else if(flyglInfo.RYLX_OR == '307'){
                    EntInfo.RYLX_OR = '其它';
                  }

                  EntInfo.RQLX_OR = flyglInfo.RQLX_OR;
                  if(flyglInfo.RQLX_OR == '201'){
                    EntInfo.RQLX_OR = '焦炉煤气';
                  }
                  else if(flyglInfo.RQLX_OR == '202'){
                    EntInfo.RQLX_OR = '其它';
                  }
                  else if(flyglInfo.RQLX_OR == '203'){
                    EntInfo.RQLX_OR = '其它';
                  }
                  else if(flyglInfo.RQLX_OR == '204'){
                    EntInfo.RQLX_OR = '其它';
                  }
                  else if(flyglInfo.RQLX_OR == '205'){
                    EntInfo.RQLX_OR = '天然气';
                  }
                  else if(flyglInfo.RQLX_OR == '206'){
                    EntInfo.RQLX_OR = '液化天然气';
                  }
                  else if(flyglInfo.RQLX_OR == '207'){
                    EntInfo.RQLX_OR = '液化石油气';
                  }
                  else if(flyglInfo.RQLX_OR == '208'){
                    EntInfo.RQLX_OR = '其他气体燃料';
                  }
                  else if(flyglInfo.RQLX_OR == '209'){
                    EntInfo.RQLX_OR = '其他气体燃料';
                  }

                  EntInfo.ZXJCSSAZQK_OR = flyglInfo.ZXJCSSAZQK_OR;
                  if(flyglInfo.ZXJCSSAZQK_OR == 'ZX1'){
                    EntInfo.ZXJCSSAZQK_OR = '未安装';
                  }
                  else if(flyglInfo.ZXJCSSAZQK_OR == 'ZX2'){
                    EntInfo.ZXJCSSAZQK_OR = '安装未联网';
                  }
                  else if(flyglInfo.ZXJCSSAZQK_OR == 'ZX2'){
                    EntInfo.ZXJCSSAZQK_OR = '安装并联网';
                  }

                  EntInfo.FMHLZDGFQX_OR = flyglInfo.FMHLZDGFQX_OR;
                  if(flyglInfo.FMHLZDGFQX_OR == 'SJ1'){
                    EntInfo.FMHLZDGFQX_OR = '集中收集处置';
                  }
                  else if(flyglInfo.FMHLZDGFQX_OR == 'SJ2'){
                    EntInfo.FMHLZDGFQX_OR = '直接排放环境';
                  }
                  else if(flyglInfo.FMHLZDGFQX_OR == 'SJ3'){
                    EntInfo.FMHLZDGFQX_OR = '其他';
                  }


                  EntInfo.GLTYNF = flyglInfo.GLTYNF;
                  EntInfo.GLBH = flyglInfo.GLBH;
                  EntInfo.GLXH = flyglInfo.GLXH;
                  EntInfo.GLLX = flyglInfo.GLLX;
                  EntInfo.EDCL = flyglInfo.EDCL;
                  EntInfo.GLRSFS = flyglInfo.GLRSFS;
                  EntInfo.NYXSJ = flyglInfo.NYXSJ;
                  EntInfo.RLMLX = flyglInfo.RLMLX;
                  EntInfo.RLMXHL = flyglInfo.RLMXHL;
                  EntInfo.RLMXHLDW = flyglInfo.RLMXHLDW;
                  EntInfo.RLMPJHLL = flyglInfo.RLMPJHLL;
                  EntInfo.RLMPJHF = flyglInfo.RLMPJHF;
                  EntInfo.RLMPJGZWHJHFF = flyglInfo.RLMPJGZWHJHFF;
                  EntInfo.PQTGD = flyglInfo.PQTGD;
                }


              }
          }
        });
      }
      else if(EntInfo.leixing == 'jyz'){
        //查询加油站详细信息
        var ParamsEntXYJG = {
          name: EntInfo.name,
        }
        await api.QuerySHYJYZXiangXiInfo(ParamsEntXYJG).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var InfoData = resultData.data.Info[0];

                console.log("加油站",InfoData);
                EntInfo.QYZGR = InfoData.QYZGR;
                EntInfo.QYNXSL = InfoData.QYNXSL;
                EntInfo.CYZGR = InfoData.CYZGR;
                EntInfo.CYNXSL = InfoData.CYNXSL;
                EntInfo.DHHM = InfoData.DHHM;
                EntInfo.LXR = InfoData.LXR;
                EntInfo.SSJYZMC = InfoData.SSJYZMC;
                EntInfo.LEIXING = EntInfo.leixing;


                EntInfo.LEIXING = InfoData.LEIXING;
                if(InfoData.YQHSJDQY == "1"){
                  EntInfo.YQHSJDQY = "一阶段";
                }
                else if(InfoData.YQHSJDQY == "2"){
                  EntInfo.YQHSJDQY = "二阶段";
                }
                else{
                  EntInfo.YQHSJDQY = "无";
                }

              }
          }
        });
      }
      else if(EntInfo.leixing == 'pwk'){
        //查询排污口详细信息
        var ParamsPWK = {
          name: EntInfo.name,
        }
        await api.QuerySHYPWKXiangXiInfo(ParamsPWK).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var InfoData = resultData.data.PaiWuKou[0];
                console.log("排污口",InfoData);

                EntInfo.PWKLX_OR = InfoData.PWKLX_OR;
                if(InfoData.PWKLX_OR == "1"){
                  EntInfo.PWKLX_OR = '工业废水排污口';
                }
                else if(InfoData.PWKLX_OR == "2"){
                  EntInfo.PWKLX_OR = '生活污水排污口';
                }
                else if(InfoData.PWKLX_OR == "3"){
                  EntInfo.PWKLX_OR = '混合污废水排污口';
                }
                else if(InfoData.PWKLX_OR == "4"){
                  EntInfo.PWKLX_OR = '其它';
                }

                EntInfo.PWKLB_OR = InfoData.PWKLB_OR;
                if(InfoData.PWKLB_OR == "1"){
                  EntInfo.PWKLB_OR = '入河排污口';
                }
                else if(InfoData.PWKLB_OR == "2"){
                  EntInfo.PWKLB_OR = '入海排污口';
                }

                EntInfo.PWKGM_OR = InfoData.PWKGM_OR;
                if(InfoData.PWKGM_OR == "1"){
                  EntInfo.PWKGM_OR = "规模以上";
                }
                else if(InfoData.PWKGM_OR == "2"){
                  EntInfo.PWKGM_OR = "规模以下";
                }

                EntInfo.RHHFS_OR = InfoData.RHHFS_OR;
                if(InfoData.RHHFS_OR == "1"){
                  EntInfo.RHHFS_OR = "明渠";
                }
                else if(InfoData.RHHFS_OR == "2"){
                  EntInfo.RHHFS_OR = "暗管";
                }
                else if(InfoData.RHHFS_OR == "3"){
                  EntInfo.RHHFS_OR = "泵站";
                }
                else if(InfoData.RHHFS_OR == "4"){
                  EntInfo.RHHFS_OR = "涵闸";
                }
                else if(InfoData.RHHFS_OR == "5"){
                  EntInfo.RHHFS_OR = "其它";
                }


                EntInfo.SNSTMC = InfoData.SNSTMC;
                EntInfo.SZDW = InfoData.SZDW;
                EntInfo.DWFZR = InfoData.DWFZR;
                EntInfo.PWKBM = InfoData.PWKBM;
                EntInfo.LEIXING = EntInfo.leixing;

              }
          }
        });
      }
      else if(EntInfo.leixing == 'cyk'){
        var ParamsCYK = {
          name: EntInfo.name,
        }
        await api.QuerySHYCYKXiangXiInfo(ParamsCYK).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var InfoData = resultData.data.ChuYouKu[0];
                console.log("储油库",InfoData);
                EntInfo.FK_ID = InfoData.FK_ID;
                EntInfo.TYSHXYDM = InfoData.TYSHXYDM;
                EntInfo.QYFRDM = InfoData.QYFRDM;
                EntInfo.DWXXMC = InfoData.DWXXMC;
                EntInfo.FDDBRGTGSHHZXM = InfoData.FDDBRGTGSHHZXM;
                EntInfo.QYNBDCYKQDMC = InfoData.QYNBDCYKQDMC;
                EntInfo.DHHM = InfoData.DHHM;
                EntInfo.LEIXING = EntInfo.leixing;

              }
          }
        });


        var ParamsCYKEX = {
          fk_id: EntInfo.FK_ID,

        }

        await api.QuerySHYEntEXInfo(ParamsCYKEX).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                console.log("储油库EX原油信息",resultData.data.YuanYou[0]);
                console.log("储油库EX汽油信息",resultData.data.QiYou[0]);
                console.log("储油库EX柴油信息",resultData.data.ChaiYou[0]);
                var InfoDataYY  = resultData.data.YuanYou[0];
                var InfoDataQY  = resultData.data.QiYou[0];
                var InfoDataCY  = resultData.data.ChaiYou[0];

                EntInfo.YYCGBM1 = InfoDataYY.YYCGBM1;
                EntInfo.YYCGGR1 = InfoDataYY.YYCGGR1;
                EntInfo.YYNZZL1 = InfoDataYY.YYNZZL1;

                if(InfoDataQY.QYYWZXJCXT=="1"){
                  EntInfo.QYYWZXJCXT = "有";
                }
                else if(InfoDataQY.QYYWZXJCXT=="2"){
                  EntInfo.QYYWZXJCXT = "无";
                }

                EntInfo.QYNZZL = InfoDataQY.QYNZZL;
                EntInfo.QYYQHSZZYXXSS = InfoDataQY.QYYQHSZZYXXSS;
                EntInfo.QYCGBM = InfoDataQY.QYCGBM;
                EntInfo.QYCGGR = InfoDataQY.QYCGGR;

                if(InfoDataQY.QYYQHSZLJSDGJG=="1"){
                  EntInfo.QYYQHSZLJSDGJG = "内浮顶灌";
                }
                else if(InfoDataQY.QYYQHSZLJSDGJG=="2"){
                  EntInfo.QYYQHSZLJSDGJG = "外浮顶灌";
                }
                else if(InfoDataQY.QYYQHSZLJSDGJG=="3"){
                  EntInfo.QYYQHSZLJSDGJG = "固定顶灌";
                }


                if(InfoDataQY.QYZYFS=="1"){
                  EntInfo.QYZYFS = "底部装油";
                }
                else if(InfoDataQY.QYZYFS=="2"){
                  EntInfo.QYZYFS = "顶部装油";
                }




                if(InfoDataQY.QYYQCLFF3=="1"){
                  EntInfo.QYYQCLFF3 = "吸附法";
                }
                else if(InfoDataQY.QYYQCLFF3=="2"){
                  EntInfo.QYYQCLFF3 = "吸收法";
                }
                else if(InfoDataQY.QYYQCLFF3=="3"){
                  EntInfo.QYYQCLFF3 = "冷凝法";
                }
                else if(InfoDataQY.QYYQCLFF3=="4"){
                  EntInfo.QYYQCLFF3 = "膜分离法";
                }
                else if(InfoDataQY.QYYQCLFF3=="5"){
                  EntInfo.QYYQCLFF3 = "其它";
                }

                EntInfo.CYNZZL = InfoDataCY.CYNZZL;
                EntInfo.CYCGBM = InfoDataCY.CYCGBM;
                EntInfo.CYCGGR = InfoDataCY.CYCGGR;



              }
          }
        });





      }

      /*
      //查询排污口水质监测信息
      var ParamsPWKJC = {
        name: EntInfo.name,
        pwkbm: EntInfo.PWKBM,
      }
      await api.QuerySHYPWKJCInfo(ParamsPWKJC).then(res=>{
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
              var dataJson = resultData.data;
              EntInfo.pwkjcdata = dataJson;
              console.log("排污口监测",dataJson);
              if(dataJson.hasOwnProperty("PaiWuKouJC")){
                var InfoData = resultData.data.PaiWuKouJC[0];
                console.log("排污口监测1",InfoData);



              }


            }
        }
      });
      */




      console.log(EntInfo);


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

      if(this.isXuanRan){
        if(zoom >= 9){
          this.shyglVectorLayer.setStyle(this.DeleteStyleFunctionSHYGL);
          this.isXuanRanZDClose = true;
        }else{

          if(this.isXuanRanZDClose){
            this.LoadSHYGL();
            this.isXuanRanZDClose = false;
          }

        }
      }

      if(this.isQiYe){
        if(zoom >= 9){
          if(this.poiLayerCount ==1){
            if(this.radioFenLei == 1){
              this.map.addLayer(this.shyEntfgyqyWMTSLayer);
            }
            if(this.radioFenLei == 2){
              this.map.addLayer(this.shyEntpwkWMTSLayer);
            }
            if(this.radioFenLei == 3){
              this.map.addLayer(this.shyEntjyzWMTSLayer);
            }
            if(this.radioFenLei == 4){
              this.map.addLayer(this.shyEntcykWMTSLayer);
            }
            this.map.removeLayer(this.poiVectorLayer);
            console.log('删除poi');
            this.poiLayerCount = 0;
          }
        }
        else{

            if(this.poiLayerCount ==0){
              this.closePopup();
              this.removeshyEnt();
              this.LoadDiShiPopup();
              console.log('添加poi');
              this.poiLayerCount = 1;
            }

        }
      }
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
        var xjsource = new ol.source.Vector({
            features:that.xjfeatures
        });
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
        var that = this;
        if(that.sjOverlayVectorSource){
            that.sjOverlayVectorSource.clear();
        }else{
            return;
        }

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
        if(selFeature){
            this.DSJSXZDM = selFeature.N.PAC;
        } else
        {
            this.DSJSXZDM ="610600";
        }
        this.getYanAnchart();
        this.getXZQchart(this.DSJSXZDM);//测试数据610602
    },
    changeToQuanSheng(){
      //未选中行政区
        this.pieDataShengHuoYuan= this.pieDataQuanShengShengHuoYuan;
        this.pieDataGuoLu= this.pieDataQuanShengGuoLu;
        this.pieDataPaiWuKou= this.pieDataQuanShengPaiWuKou;
        this.barDataRightTopFeiQi= this.barDataQuanShengFeiQi;
        this.barDataRightCenterFeiShui= this.barDataQuanShengFeiShui;
        this.barDataRightBottomFeiQi= this.barDataQuanShengFeiQi3;
        this.fileTextShow = false;
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

        //左1
        this.pieDataShengHuoYuan = this.pieDataYuLinShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataYuLinGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataYuLinPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataYuLinFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataYuLinFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataYuLinFeiQi3;


      }
      else if(DSJSXZDM=='610600'){
        //延安
        console.log("延安");

        //左1
        this.pieDataShengHuoYuan = this.pieDataYanAnShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataYanAnGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataYanAnPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataYanAnFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataYanAnFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataYanAnFeiQi3;


      }
      else if(DSJSXZDM=='610500'){
        //渭南
        console.log("渭南");

        //左1
        this.pieDataShengHuoYuan = this.pieDataWeiNanShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataWeiNanGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataWeiNanPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataWeiNanFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataWeiNanFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataWeiNanFeiQi3;
      }
      else if(DSJSXZDM=='610200'){
        //铜川
        console.log("铜川");

         //左1
        this.pieDataShengHuoYuan = this.pieDataTongChuanShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataTongChuanGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataTongChuanPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataTongChuanFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataTongChuanFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataTongChuanFeiQi3;


      }
      else if(DSJSXZDM=='610400'){
        //咸阳
        console.log("咸阳");

        //左1
        this.pieDataShengHuoYuan = this.pieDataXianYangShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataXianYangGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataXianYangPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataXianYangFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataXianYangFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataXianYangFeiQi3;



      }
      else if(DSJSXZDM=='610300'){
        //宝鸡
        console.log("宝鸡");

        //左1
        this.pieDataShengHuoYuan = this.pieDataBaoJiShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataBaoJiGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataBaoJiPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataBaoJiFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataBaoJiFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataBaoJiFeiQi3;



      }
      else if(DSJSXZDM=='610100'){
        //西安
        console.log("西安");

        //左1
        this.pieDataShengHuoYuan = this.pieDataXiAnShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataXiAnGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataXiAnPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataXiAnFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataXiAnFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataXiAnFeiQi3;

      }
      else if(DSJSXZDM=='611000'){
        //商洛
        console.log("商洛");

        //左1
        this.pieDataShengHuoYuan = this.pieDataShangLuoShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataShangLuoGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataShangLuoPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataShangLuoFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataShangLuoFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataShangLuoFeiQi3;


      }
      else if(DSJSXZDM=='610900'){
        //安康
        console.log("安康");

        //左1
        this.pieDataShengHuoYuan = this.pieDataAnKangShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataAnKangGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataAnKangPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataAnKangFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataAnKangFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataAnKangFeiQi3;

      }
      else if(DSJSXZDM=='610700'){
        //汉中
        console.log("汉中");

        //左1
        this.pieDataShengHuoYuan = this.pieDataHanZhongShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataHanZhongGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataHanZhongPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataHanZhongFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataHanZhongFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataHanZhongFeiQi3;

      }
      else if(DSJSXZDM=='611300'){
        //汉中
        console.log("西咸");

        //左1
        this.pieDataShengHuoYuan = this.pieDataXiXianShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataXiXianGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataXiXianPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataXiXianFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataXiXianFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataXiXianFeiQi3;

      }
      else if(DSJSXZDM=='611400'){
        //汉中
        console.log("杨凌");

        //左1
        this.pieDataShengHuoYuan = this.pieDataYangLinShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataYangLinGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataYangLinPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataYangLinFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataYangLinFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataYangLinFeiQi3;

      }
      else if(DSJSXZDM=='611500'){
        //汉中
        console.log("韩城");

        //左1
        this.pieDataShengHuoYuan = this.pieDataHanChengShengHuoYuan;
        //左2
        this.pieDataGuoLu = this.pieDataHanChengGuoLu;
        //左3
        this.pieDataPaiWuKou = this.pieDataHanChengPaiWuKou;
        //右1
        this.barDataRightTopFeiQi = this.barDataHanChengFeiQi;
        //右2
        this.barDataRightCenterFeiShui = this.barDataHanChengFeiShui;
        //右3
        this.barDataRightBottomFeiQi = this.barDataHanChengFeiQi3;

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

    //加载mapserve
    LoadMapServer(url){
      var layer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
          url:url
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
    LoadGDMap(){
      var gaodeMapLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                        url:'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'//7,8
                    }),
            });
      this.map.addLayer(gaodeMapLayer);
    },
    //加载百度地图
    LoadBDMap(){
      var projection = ol.proj.get("EPSG:3857");
      var resolutions = [];
      for(var i=0; i<19; i++){
          resolutions[i] = Math.pow(2, 18-i);
      }
      var tilegrid  = new ol.tilegrid.TileGrid({
          origin: [0,0],
          resolutions: resolutions
      });

      var baidu_source = new ol.source.TileImage({
          projection: projection,
          tileGrid: tilegrid,
          tileUrlFunction: function(tileCoord, pixelRatio, proj){
              if(!tileCoord){
                  return "";
              }
              var z = tileCoord[0];
              var x = tileCoord[1];
              var y = tileCoord[2];

              if(x<0){
                  x = "M"+(-x);
              }
              if(y<0){
                  y = "M"+(-y);
              }

              return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1";
          }
      });
      var baiduMapLayer = new ol.layer.Tile({
                source: baidu_source,
            });
      this.map.addLayer(baiduMapLayer);
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
    //加载高德地图
    //this.LoadGDMap();
    //加载百度地图
    //this.LoadBDMap();
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
    this.loadGeoWMTSLayer();

    this.LoadDiShiPopup();

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
    BarLeftBottom,
    BarLeftBottomSHY,

    PieLeftTopSHY,
    PieLeftCenterSHY,
    PieLeftBottomSHY,

    PieLeftCenter,

    BarCenterSHY,

    BarRightTopSHY,
    BarRightCenterSHY,
    BarRightBottomSHY,
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
  .NewBox1 {
    flex: 1;
    margin-top: 0 !important;
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  .NewBox1:nth-child(1){
     flex: 1;
     height: 32.6% !important;
  }
  .NewBox1:nth-child(2){
    flex: 1;
    height: 32.6% !important;
  }
  .box:nth-child(3){
    flex: 1;
    height: 32.6% !important;
  }

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
        right: -35px;
        width: 180px;
        height: 50px;
        z-index: 1;
        .el-button{
          width: 50px;
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
    .toolBarPicture1{
      position: absolute;
        top: 80px;
        right: -37px;
        width: 182px;
        height: 50px;
        z-index: 1;
        .el-button{
          width: 110px;
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
      bottom:60px;
      right: 230px;
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
</style>

<style lang="scss" scoped>
  .toolBar .el-button{
    width: 40px;
    background: #102b38;
    border: 1px solid #2d9690;
    color: #FFF;
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
  .toolBar .el-button.el-button--mini{
    padding: 5px 0px 5px 0px;
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
        height:282px;
        box-sizing: border-box;
        margin-bottom: 18px;
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
  .left-bottom{
    height:32.6%;
    margin-bottom: 10px;
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
    .left-bottom-content{
      height:90%;
      width:90%;
      margin-left:20px;
      margin-top:10px;
    }
  }

  .left-bottom-2{
    height:32.6%;
    margin-bottom: 10px;
    .left-bottom-content{
      height:90%;
      width:90%;
      margin-left:20px;
      margin-top:10px;
    }
  }

  .left-bottom-3{
    height:32.6%;
    margin-bottom: 10px;
    .left-bottom-content{
      height:90%;
      width:90%;
      margin-left:20px;
      margin-top:10px;
    }
  }


  .left-center{
    height:32.6%;
    margin-bottom: 10px;
    .leftBtn{
      margin-top: 2px;
/*      .el-button{
          width: 55px;
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
      }*/
      /deep/ .el-radio-button__inner {
        width: 67px;
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
      //.leftBtnR{
      //  margin-left: 100px;
      //}
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
      margin-top:10px;
    }
  }

  .filltext{
    float:left;
    margin-top: 70px;
    margin-left: 80px;
    font-size: 50px;
  }
</style>


<style lang="scss" scoped>

  .TLFGYGL{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/shytuli/fgyqygl.png');
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
    }
  }
  .TLPWK{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/shytuli/pwk.png');
      background-repeat:no-repeat;
      background-size:120% 120%;
      -moz-background-size:100% 100%;
    }
  }

  .TLJYZ{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/shytuli/jyz.png');
      background-repeat:no-repeat;
     background-size:100% 100%;
      -moz-background-size:100% 100%;
    }
  }
  .TLCYK{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: 0px;
      background-image: url('../../assets/images/shytuli/cyk.png');
      background-repeat:no-repeat;
      background-size:100% 100%;
      -moz-background-size:100% 100%;
    }
  }

</style>
