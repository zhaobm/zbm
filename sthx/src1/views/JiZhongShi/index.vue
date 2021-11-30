<template>
  <div class='resourceOverview'>
    <div  class="right-bar">
      <!--
        <NewBox1 title='集中式污水处理厂数量(1406)' class="left-bottom">
            <div slot="content" class='left-bottom-content'>
              <PieLeftTop :data="pieDataTop"/>
            </div>
        </NewBox1>
        <NewBox1 title="生活垃圾集中处置场数量(358)" class="left-bottom-2">
          <div slot="content" class='left-bottom-content'>
            <PieLeftCenter :data="pieDataCenter"/>
          </div>
        </NewBox1>
        <NewBox1 title="危险废物集中处置厂数量(42)" class="rightbarTopZL">
          <div slot="content" class='left-bottom-content'>
            <PieLeftBottom :data="pieDataBottom"/>
          </div>
        </NewBox1>
        -->
        <NewBox1 title='集中式污水处理厂数量(个)' class="left-bottom">
            <div slot="content" class='left-bottom-content'>
              <PieLeftTop :data="pieDataTop"/>
            </div>
        </NewBox1>
        <NewBox1 title="生活垃圾集中处置场数量(个)" class="left-bottom-2">
          <div slot="content" class='left-bottom-content'>
            <PieLeftCenter :data="pieDataCenter"/>
          </div>
        </NewBox1>
        <NewBox1 title="危险废物集中处置厂数量(个)" class="rightbarTopZL">
          <div slot="content" class='left-bottom-content'>
            <PieLeftBottom :data="pieDataBottom"/>
          </div>
        </NewBox1>
    </div>
    <div class="center">
      <Box>
          <div class="top-box">
            <mapBox />
            <!--陕北关中陕南-->
            <div class='toolBar' v-if="isShowGuanZhong">
              <el-button-group>
<!--                <el-button size="mini" round @click="shanbei()">陕北</el-button>-->
<!--                <el-button size="mini" round @click="guanzhong()">关中</el-button>-->
<!--                <el-button size="mini" round @click="shannan()">陕南</el-button>-->
              </el-button-group>
            </div>
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
            <div class='toolBarRadioFenLei'>
              <el-radio-group v-model="radioFenLei"  @change="SelectFenLei()" v-if="isShowEntFenLei">
                <el-radio :label="1" >&nbsp&nbsp&nbsp生活垃圾处理厂<span class='SHLJCLC'>  </span></el-radio>
                <el-radio :label="2" >&nbsp&nbsp&nbsp危险废物处理厂<span class='WXFWCLC'>  </span></el-radio>
                <el-radio :label="3" >&nbsp&nbsp&nbsp污水处理厂<span class='WSCLC'>  </span></el-radio>
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
              </div>ϵ =-dѰ/dt  Ѱ=B.dS  I = ϵ/R 与 时间的关系
          </div>
          -->
      </Box>
        <NewBox :title=jzswrzlss class='centerGyy'>
<!--          <NewBox title='集中式污染治理设施情况（全省1796个）' class='centerGyy'>-->

          <Bar1 :data="barDataWuShui" slot="contentGYY" class='centerGyyBar'/>
        </NewBox>
    </div>
    <div class="right-bar">
      <NewBox1 title='污水处理厂污染物去除量(吨)' class="left-bottom">
          <div slot="content" class='left-bottom-content'>
            <span class="filltext" v-if="fileTextShowTop"><p>无相关数据</p></span>
            <Bar3New :data="bar3NewData" />
          </div>
      </NewBox1>
      <NewBox1 title="生活垃圾集中处置情况(万吨)" class="left-bottom-2">
        <div slot="content" class='left-bottom-content'>
<!--          <span class="filltext" v-if="fileTextShowCenter"><p>无相关数据</p></span>-->
<!--          <div class="filltext" v-if="fileTextShowCenter"><p>无相关数据</p></div>-->
          <Bar2New :data="barDataRightCenterFeiShui"/>
        </div>
      </NewBox1>

      <NewBoxRight :title=  WFUnit class="left-bottom-3">
<!--        <span class="filltext" v-if="fileTextShowBottom"><p>无相关数据</p></span>-->
        <Bar1New :data="barDataRightBottomFeiQi"/>
      </NewBoxRight>

    </div>
    <div></div>
    <ImageDiv class="attribute" v-show="isShowAImage" @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures" :selectFeature="selectFeature"></ImageDiv>

  </div>
</template>
<script>
import PoiLocation from "../../components/poi";
import LineChart from "../../components/charts/line/line1";
import Bar4 from "../../components/charts/bar/bar4";
//import Bar1 from "../../components/charts/bar/barDuiDie";
//import Bar1 from "../../components/charts/bar/barDuiDieV";
import Bar1 from "../../components/charts/bar/barDuiDieVJZS";
import Bar1New from "../../components/charts/bar/JiZhongShi/bar1new";
import Bar2New from "../../components/charts/bar/JiZhongShi/bar2new";
import Bar3New from "../../components/charts/bar/bar3new";
import BarLeftBottom from "../../components/charts/bar/barHGYY";
import Bar5 from "../../components/charts/bar/barDuiDieV";
//import PieLeftTop from '../../components/charts/pie/pieJZS1';
//import PieLeftCenter from '../../components/charts/pie/pieJZS2';
//import PieLeftBottom from '../../components/charts/pie/pieJZS3';
import PieLeftTop from '../../components/charts/pie/JiZhongShi/pieJZS1';
import PieLeftCenter from '../../components/charts/pie/JiZhongShi/pieJZS2';
import PieLeftBottom from '../../components/charts/pie/JiZhongShi/pieJZS3';
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
//散点图
//引入Echart
let echarts = require("echarts/lib/echarts");
import ADLayer from "../../lib/openlayers/openlayers.echart.js";
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");


export default {
  data() {
    return {
      isShowtoolBarquery:true,
      poiVisible: false,
      mapProp : {},
      poiTablename:'T_BAS_J102_1',
      fieldName: "dwxxmc",
      JingDu: "jindu",
      WeiDu: "weidu",
      jzswrzlss:"集中式污染治理81台",
      //是否展示关中陕南陕北按钮
      isShowGuanZhong:false,

      fileTextShowTop:false,
      fileTextShowCenter:false,
      fileTextShowBottom:false,

      isShowEntFenLei:true,
      //地市和企业
      radio: 2,
      radioDiTu:1,
      radioFenLei:1,
      isDiShi:false,
      isQiYe:true,

      isShiJi: false,
      isXianJi: true,
      pflx: "fs",
      wrwlx: "hxxylpfl",
      DSJSXZDM: "610600",
      xjVectorSource:null,
      peiDSJSXZDM: "6106",

      xjVectorLayer: null,
      xjOverlayVectorSource: null,
      WFUnit:"危险废物集中利用处置（处理）情况(吨)",
      //重点排污单位点击事件
      isPopupShow:false,
      isDynamicPoiShow:false,
      Popup:null,
      DynamicPOI:null,
      poiName:"",
      poiAddress:"",
      poiVectorLayer:null,
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
      barDataRightTop:{
        xAxis: ["COD","氨氮","总氮", "总磷"],
        yAxis: [ 41.3,1.46 , 4.52 ,0.273 ],
      },

      bar3NewData:{
        // xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        // yAxis: [ 53.34,4.81, 5.32,0.73],
      },
      // bar3NewDataQuanSheng:{
      //   xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
      //   yAxis: [ 53.34,4.81, 5.32,0.73],
      // },


      //右2
      //生活废水和危险废水的总和
      barDataRightCenterFeiShui:{
        // xAxis: ["化学需氧量","氨氮","总氮", "总磷"],
        // yAxis: [ 500.79,103.05,128.76,1.68],
      },
/*
     barDataQuanShengZFS:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        yAxis: [ 500.79,103.05,128.76,1.68],
      },

      //各地市废水排放量(吨)
      barDataXiAnZFS:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        yAxis: [33.16,7.06,9.11,0.18],
      },
      barDataTongChuanZFS:{
        xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        yAxis: [3.12,0.69,0.92,0.02],
      },*/

      //右3
      //危险垃圾处置
      barDataRightBottomFeiQi:{
        // xAxis: ["工业","医疗","其他","综合利用"],
        // yAxis: [26.16,2.86,0.07,35.20],
      },
      /*
            barDataQuanShengZFQ:{
              xAxis: ["工业","医疗","其他","综合利用"],
              yAxis: [26.16,2.86,0.07,35.20],
            },
            //各地市废气汇总
            barDataXiAnZFQ:{
              xAxis: ["工业","医疗","其他","综合利用"],
              yAxis: [0,1.3,0,0.22],
            },
            barDataTongchuanZFQ:{
              xAxis: ["工业","医疗","其他","综合利用"],
              yAxis: [0,0.06,0,0],
            },

      */
      barDataLeftBottom:{
        xAxis: ["COD","氨氮","总氮", "总磷","COD","氨氮","总氮", "总磷","COD","氨氮","总氮", "总磷"],
        yAxis: [ 1.3,1.46 , 4.52 ,0.273,1.3,1.46 , 4.52 ,0.273,1.3,1.46 , 4.52 ,0.273 ],
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
      //PieDataTop
      pieDataTop:{
        dataArr: [
        //     // { value: 241, name: "城镇污水处理厂" },
        //     // { value: 17, name: "工业污水处理厂" },
        //     // { value: 1100, name: "农村污水处理厂" },
        //     // { value: 48, name: "其它污水处理厂" },
        ]
      },
      pieDataQuanShengWuShui:{
        dataArr: [
            { value: 241, name: "城镇污水处理厂" },
            { value: 17, name: "工业污水处理厂" },
            { value: 1100, name: "农村污水处理厂" },
            { value: 48, name: "其它污水处理厂" },
        ]
      },
      //各市污水处理厂个数
      pieDataXiAnWuShui:{
        dataArr: [
            { value: 40, name: "城镇污水处理厂" },
            { value: 3, name: "工业污水处理厂" },
            { value: 39, name: "农村污水处理厂" },
            { value: 20, name: "其它污水处理厂" },
        ]
      },
      pieDataBaoJiWuShui:{
        dataArr: [
            { value: 22, name: "城镇污水处理厂" },
            { value: 2, name: "工业污水处理厂" },
            { value: 482, name: "农村污水处理厂" },
            { value: 1, name: "其它污水处理厂" },
        ]
      },
      pieDataXianYangWuShui:{
        dataArr: [
            { value: 21, name: "城镇污水处理厂" },
            { value: 3, name: "工业污水处理厂" },
            { value: 67, name: "农村污水处理厂" },
            { value: 1, name: "其它污水处理厂" },
        ]
      },
      pieDataTongChuanWuShui:{
        dataArr: [
            { value: 6, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 22, name: "农村污水处理厂" },
            { value: 9, name: "其它污水处理厂" },
        ]
      },
      pieDataWeiNanWuShui:{
        dataArr: [
            { value: 26, name: "城镇污水处理厂" },
            { value: 3, name: "工业污水处理厂" },
            { value: 70, name: "农村污水处理厂" },
            { value: 5, name: "其它污水处理厂" },
        ]
      },
      pieDataYanAnWuShui:{
        dataArr: [
            { value: 23, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 11, name: "农村污水处理厂" },
            { value: 3, name: "其它污水处理厂" },
        ]
      },
      pieDataYuLinWuShui:{
        dataArr: [
            { value: 21, name: "城镇污水处理厂" },
            { value: 6, name: "工业污水处理厂" },
            { value: 8, name: "农村污水处理厂" },
            { value: 2, name: "其它污水处理厂" },
        ]
      },

      pieDataHanZhongWuShui:{
        dataArr: [
            { value: 24, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 86, name: "农村污水处理厂" },
            { value: 1, name: "其它污水处理厂" },
        ]
      },
      pieDataAnKangWuShui:{
        dataArr: [
            { value: 24, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 164, name: "农村污水处理厂" },
            { value: 0, name: "其它污水处理厂" },
        ]
      },
      pieDataShangLuoWuShui:{
        dataArr: [
            { value: 12, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 93, name: "农村污水处理厂" },
            { value: 3, name: "其它污水处理厂" },
        ]
      },
      pieDataXiXianWuShui:{
        dataArr: [
            { value: 10, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 12, name: "农村污水处理厂" },
            { value: 3, name: "其它污水处理厂" },
        ]
      },
      pieDataYangLinWuShui:{
        dataArr: [
            { value: 2, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 22, name: "农村污水处理厂" },
            { value: 0, name: "其它污水处理厂" },
        ]
      },
      pieDataHanChengWuShui:{
        dataArr: [
            { value: 10, name: "城镇污水处理厂" },
            { value: 0, name: "工业污水处理厂" },
            { value: 24, name: "农村污水处理厂" },
            { value: 0, name: "其它污水处理厂" },
        ]
      },

      //PieDataCenter
      pieDataCenter:{
        dataArr: [
            // { value: 345, name: "垃圾填埋场" },
            // { value: 7, name: "垃圾堆肥场" },
            // { value: 5, name: "垃圾焚烧场" },
            // { value: 3, name: "其它处置方式" },
        ]
      },
      pieDataQuanShengLJ:{
        dataArr: [
            { value: 345, name: "垃圾填埋场" },
            { value: 7, name: "垃圾堆肥场" },
            { value: 5, name: "垃圾焚烧场" },
            { value: 3, name: "其它处置方式" },
        ]
      },
      //各市生活垃圾集中处理厂个数
      pieDataXiAnLJ:{
        dataArr: [
            { value: 26, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataBaoJiLJ:{
        dataArr: [
            { value: 20, name: "垃圾填埋场" },
            { value: 1, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataXianYangLJ:{
        dataArr: [
            { value: 37, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataTongChuanLJ:{
        dataArr: [
            { value: 7, name: "垃圾填埋场" },
            { value: 1, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataWeiNanLJ:{
        dataArr: [
            { value: 22, name: "垃圾填埋场" },
            { value: 2, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataYanAnLJ:{
        dataArr: [
            { value: 34, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 1, name: "其他处置厂" },
        ]
      },
      pieDataYuLinLJ:{
        dataArr: [
            { value: 32, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 2, name: "其他处置厂" },
        ]
      },
      pieDataHanZhongLJ:{
        dataArr: [
            { value: 47, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataAnKangLJ:{
        dataArr: [
            { value: 62, name: "垃圾填埋场" },
            { value: 2, name: "垃圾堆肥场" },
            { value: 1, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataShangLuoLJ:{
        dataArr: [
            { value: 55, name: "垃圾填埋场" },
            { value: 2, name: "垃圾堆肥场" },
            { value: 4, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataXiXianLJ:{
        dataArr: [
            { value: 2, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataYangLinLJ:{
        dataArr: [
            { value: 1, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      pieDataHanChengLJ:{
        dataArr: [
            { value: 1, name: "垃圾填埋场" },
            { value: 0, name: "垃圾堆肥场" },
            { value: 0, name: "垃圾焚烧厂" },
            { value: 0, name: "其他处置厂" },
        ]
      },
      //pieDataBottom
      pieDataBottom:{
        dataArr: [
            // { value: 23, name: "危险废物集中处置" },
            // { value: 9, name: "医疗废物集中处置" },
            // { value: 10, name: "其它企业协同处置" },
        ]
      },
      pieDataQuanShengWF:{
        dataArr: [
            { value: 23, name: "危险废物集中处置" },
            { value: 9, name: "医疗废物集中处置" },
            { value: 10, name: "其它企业协同处置" },
        ]
      },

      //各市危险废物处置厂个数
      pieDataXiAnWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 2, name: "其他企业协同处置" },
        ]
      },
      pieDataBaoJiWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataXianYangWF:{
        dataArr: [
            { value: 4, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 3, name: "其他企业协同处置" },
        ]
      },
      pieDataTongChuanWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 2, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataWeiNanWF:{
        dataArr: [
            { value: 3, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 1, name: "其他企业协同处置" },
        ]
      },
      pieDataYanAnWF:{
        dataArr: [
            { value: 8, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 1, name: "其他企业协同处置" },
        ]
      },
      pieDataYuLinWF:{
        dataArr: [
            { value: 7, name: "危险废弃物集中处置厂" },
            { value: 0, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataHanZhongWF:{
        dataArr: [
            { value: 1, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 3, name: "其他企业协同处置" },
        ]
      },
      pieDataAnKangWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataShangLuoWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 1, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataXiXianWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 0, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataYangLinWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 0, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
      },
      pieDataHanChengWF:{
        dataArr: [
            { value: 0, name: "危险废弃物集中处置厂" },
            { value: 0, name: "医疗废弃物集中处置厂" },
            { value: 0, name: "其他企业协同处置" },
        ]
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
      barDataWuShui:{
        // xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市"],
        // JZSData:["102",    "37",   "507",    "92"  , "104",    "37",   "111",   "37"  ,  "188",  "108",   "25",  "24",    "34",   ],
        // SHLJData:["26",     "8",    "21",     "37"  ,  "22",     "34",  "47",    "34"  ,   "64" ,  "61",    "2",  "1",     "1",    ],
        // WXFWData:["3",      "1",    "1",      "8"   ,  "5",    "10",    "5",    "7" ,    "1" ,  "1",    "0",    "0",    "0",  ],
      },
      // barDataQuanSheng:{
      //   xAxis: ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","西咸新区","杨凌示范区","韩城市"],
      //   JZSData:["102",    "37",   "507",    "92"  , "104",    "37",   "111",   "37"  ,  "188",  "108",   "25",  "24",    "34",   ],
      //   SHLJData:["26",     "8",    "21",     "37"  ,  "22",     "34",  "47",    "34"  ,   "64" ,  "61",    "2",  "1",     "1",    ],
      //   WXFWData:["3",      "1",    "1",      "8"   ,  "5",    "10",    "5",    "7" ,    "1" ,  "1",    "0",    "0",    "0",  ],
      // },

      /*
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
      HanCheng:{
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
      */

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
      sxxjbjProLayer:null,
      xjsource:null,
      xjfeatures:null,


      jzsEntlWMTSLayer:null,
      jzsEntshenghuoWMTSLayer:null,
      jzsEntweixianWMTSLayer:null,
      jzsEntwsWMTSLayer:null,



      //午夜蓝图
      wuyelantu:null,
      //天地图
      tdtImage:null,
      tdtImageAnno:null,

      poiLayerCount:0,
      // poiVectorLayer:null,
    };
  },
  methods: {

    async poiClickBigScreen(coor){
      this.resetPoiInfo();
      this.poiVisible = false;
      var coordinate = coor.coor;
      console.log("coordinate",coordinate);
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
      //查询到点击数据库的信息
      var EnterpriseInfo = await this.queryJZSEntInfo(coordinateLngLat);
      // console.log("EnterpriseInfo111",EnterpriseInfo);
      //将信息放到指定样式
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
        var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
          "610629","610630","610631","610632"];
        var person = new Object();
        for(var i=0;i<xzqharray.length;i++)
        {
          var count=new Array();

          count.push({"count":this.barDataWuShui.SHLJData[i]});
          person[xzqharray[i]]=count;
        }
        dishiEntCountArr =person;
        // dishiEntCountArr = await this.GetDiShiEntCount('pcxqdm','T_BAS_J102_1');
      }

      if(this.radioFenLei == 2 && this.isQiYe){
        // dishiEntCountArr = await this.GetDiShiEntCount('pcxqdm','T_BAS_J103_1');
        //dishiEntCountArr={"xixian":[{count:"0"}],"hancheng":[{count:"0"}],"yanglin":[{count:"0"}],"xian":[{count:"3"}],"tongchaun":[{count:"1"}],"baoji":[{count:"1"}],"xianyang":[{count:"8"}],"weinan":[{count:"5"}],"yanan":[{count:"10"}],"hanzhong":[{count:"5"}],"yulin":[{count:"7"}],"ankang":[{count:"1"}],"shangluo":[{count:"1"}]};
        var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
          "610629","610630","610631","610632"];
        var person = new Object();
        for(var i=0;i<xzqharray.length;i++)
        {
          var count=new Array();
          count.push({"count":this.barDataWuShui.WXFWData[i]});
          person[xzqharray[i]]=count;
        }
        dishiEntCountArr =person;
      }
      if(this.radioFenLei == 3 && this.isQiYe){
        // dishiEntCountArr = await this.GetDiShiEntCount('xzqdm','T_BAS_J101_1');
        var xzqharray=["610602","610603","610621","610622","610623","610625","610626","610627","610628",
          "610629","610630","610631","610632"];
        var person = new Object();
        for(var i=0;i<xzqharray.length;i++)
        {
          var count=new Array();
          count.push({"count":this.barDataWuShui.JZSData[i]});
          person[xzqharray[i]]=count;
        }
        dishiEntCountArr =person;
      }

      console.log("dishiEntCountArr",dishiEntCountArr);
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
            console.log("这是DiShiEntCount",DiShiEntCount)
          }
        }
      });
      return DiShiEntCount;
    },
    SelectFenLei(){
      this.closePopup();
      this.removejzsEntLayer();
      this.LoadDiShiPopup();
      this.poiLayerCount = 1;
      this.map.getView().setZoom(8);
      var coordinate = [12149145.114081362, 4316266.289];
      this.map.getView().setCenter(coordinate);
      // this.changeToQuanSheng();

      if(this.radioFenLei == 1){
        this.poiTablename='T_BAS_J102_1',
        this.fieldName="dwxxmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",
/*        this.closePopup();
        this.removejzsEntLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */
        this.changeToQuanSheng();
      }
      else if(this.radioFenLei == 2){
        this.poiTablename='T_BAS_J103_1',
        this.fieldName="dwxxmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",
/*        this.closePopup();
        this.removejzsEntLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */
        this.changeToQuanSheng();
      }
      else if(this.radioFenLei == 3){
        this.poiTablename='T_BAS_J101_1',
        this.fieldName="dwxxmc",
        this.JingDu= "jindu",
        this.WeiDu= "weidu",
/*        this.closePopup();
        this.removejzsEntLayer();
        this.LoadDiShiPopup();
        this.poiLayerCount = 1;
        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate); */
        this.changeToQuanSheng();
      }
    },
    removejzsEntLayer(){
      this.map.removeLayer(this.jzsEntlWMTSLayer);
      this.map.removeLayer(this.jzsEntshenghuoWMTSLayer);
      this.map.removeLayer(this.jzsEntweixianWMTSLayer);
      this.map.removeLayer(this.jzsEntwsWMTSLayer);
    },
    addjzsEntLayer(){
      this.map.addLayer(this.jzsEntshenghuoWMTSLayer);
      this.map.addLayer(this.jzsEntweixianWMTSLayer);
      this.map.addLayer(this.jzsEntwsWMTSLayer);
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
      console.log(this.radio);
      this.map.getView().setZoom(8);
      // var coordinate = [12129470.527, 4255685.289];
      var coordinate = [12149145.114081362, 4316266.289];
      this.map.getView().setCenter(coordinate);
      if(this.radio == 1){
        this.poiVisible = false;
        this.isShowtoolBarquery = false;
        this.WFUnit="危险废物集中利用处置（处理）情况(吨)";
        this.radioFenLei = 1;
        this.closePopup();
        this.isDiShi = true;
        this.isQiYe = false;
        this.removejzsEntLayer();
        this.isShowEntFenLei = false;
/*        this.map.getView().setZoom(6);
        var coordinate = [12129470.527, 4255685.289];
        this.map.getView().setCenter(coordinate);*/
        // this.changeToQuanSheng();
          this.created();
        this.map.removeLayer(this.poiVectorLayer);
        this.poiLayerCount = 0;
        // this.isShowGuanZhong = true;
      }
      else{
        this.isShowtoolBarquery = true;
        this.WFUnit="危险废物集中利用处置（处理）情况(吨)";
        this.radioFenLei = 1;
        this.isDiShi = false;
        this.isQiYe = true;
        if(this.sjOverlayVectorSource){
          this.sjOverlayVectorSource.clear();
        }
        //this.addjzsEntLayer();
        this.isShowEntFenLei = true;
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
    loadGeoWMTSLayer(){
      var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];      var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
      var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
      var tilegrid = new ol.tilegrid.WMTS({//数据源的加载方式，通过WMTS加载
            tileSize: [256,256],
            extent: [-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7],
            origin: [-2.003750834E7, 2.003750834E7],
            resolutions: resolutions,//分辨率数组
            matrixIds: gridNames//级别0-30级
        });
      var projection = new ol.proj.Projection({
        code: 'EPSG:900913',
        axisOrientation: 'neu'
      });
      var layerName = 'hkywry:jzspro';
      var gridsetName = 'EPSG:900913';
      var tileSource = new ol.source.WMTS({
        url: 'http://localhost:8082/geoserver/gwc/service/wmts',
        layer: layerName,
        format: "image/png",
        matrixSet: gridsetName,//投影坐标系设置矩阵
        projection: projection, //数据的投影坐标系
        tileGrid: tilegrid
      });
      this.jzsEntlWMTSLayer = new ol.layer.Tile({
        source: tileSource,
      });

      this.jzsEntshenghuoWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:jzsshenghuopro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });

      this.jzsEntweixianWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:jzsweixianpro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });
      this.jzsEntwsWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          layer: 'hkywry:jzswspro',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
      });


    },
    OpenPicture(){
      this.isShowAImage = true;
      this.floatDivTitleImageurl = "http://localhost:8080/Pictures/集中式.jpg";
    },
    //刷新map尺寸
    refreshMapSize(){
      this.map.updateSize();
    },
    //加载陕西边界geojson
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

      var that = this;
      if(quyu == "shanbei"){

        // this.pieDataTop = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataYuLinWuShui.dataArr[0].value)+parseFloat(this.pieDataYanAnWuShui.dataArr[0].value)), name: "城镇污水处理厂" },
        //       { value: (parseFloat(this.pieDataYuLinWuShui.dataArr[1].value)+parseFloat(this.pieDataYanAnWuShui.dataArr[1].value)), name: "工业污水处理厂" },
        //       { value: (parseFloat(this.pieDataYuLinWuShui.dataArr[2].value)+parseFloat(this.pieDataYanAnWuShui.dataArr[2].value)), name: "农村污水处理厂" },
        //       { value: (parseFloat(this.pieDataYuLinWuShui.dataArr[3].value)+parseFloat(this.pieDataYanAnWuShui.dataArr[3].value)), name: "其它污水处理厂" },
        //   ]
        // };
        // this.pieDataCenter = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataYuLinLJ.dataArr[0].value)+parseFloat(this.pieDataYanAnLJ.dataArr[0].value)), name: "垃圾填埋场" },
        //       { value: (parseFloat(this.pieDataYuLinLJ.dataArr[1].value)+parseFloat(this.pieDataYanAnLJ.dataArr[1].value)), name: "垃圾堆肥场" },
        //       { value: (parseFloat(this.pieDataYuLinLJ.dataArr[2].value)+parseFloat(this.pieDataYanAnLJ.dataArr[2].value)), name: "垃圾焚烧厂" },
        //       { value: (parseFloat(this.pieDataYuLinLJ.dataArr[3].value)+parseFloat(this.pieDataYanAnLJ.dataArr[3].value)), name: "其他处置厂" },
        //   ]
        // };
        // this.pieDataBottom = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataYuLinWF.dataArr[0].value)+parseFloat(this.pieDataYanAnWF.dataArr[0].value)), name: "危险废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataYuLinWF.dataArr[1].value)+parseFloat(this.pieDataYanAnWF.dataArr[1].value)), name: "医疗废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataYuLinWF.dataArr[2].value)+parseFloat(this.pieDataYanAnWF.dataArr[2].value)), name: "其他企业协同处置" },
        //   ]
        // };
        // this.bar3NewData = {
        //   xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        //   yAxis: [
        //       (parseFloat(this.barDataYuLinWuShui.yAxis[0])+parseFloat(this.barDataYanAnWuShui.yAxis[0])),
        //       (parseFloat(this.barDataYuLinWuShui.yAxis[1])+parseFloat(this.barDataYanAnWuShui.yAxis[1])),
        //       (parseFloat(this.barDataYuLinWuShui.yAxis[2])+parseFloat(this.barDataYanAnWuShui.yAxis[2])),
        //       (parseFloat(this.barDataYuLinWuShui.yAxis[3])+parseFloat(this.barDataYanAnWuShui.yAxis[3])),
        //       (parseFloat(this.barDataYuLinWuShui.yAxis[4])+parseFloat(this.barDataYanAnWuShui.yAxis[4]))
        //     ],
        // };

        // this.barDataRightCenterFeiShui = {
        //   xAxis: ["填埋量","焚烧处置量","堆肥量", "其他处置量" ],
        //   yAxis: [
        //     (parseFloat(this.barDataYuLinZFS.yAxis[0])+parseFloat(this.barDataYanAnZFS.yAxis[0])),
        //     (parseFloat(this.barDataYuLinZFS.yAxis[1])+parseFloat(this.barDataYanAnZFS.yAxis[1])),
        //     (parseFloat(this.barDataYuLinZFS.yAxis[2])+parseFloat(this.barDataYanAnZFS.yAxis[2])),
        //     (parseFloat(this.barDataYuLinZFS.yAxis[3])+parseFloat(this.barDataYanAnZFS.yAxis[3])),
        //     (parseFloat(this.barDataYuLinZFS.yAxis[4])+parseFloat(this.barDataYanAnZFS.yAxis[4]))
        //   ],
        // };

        // this.barDataRightBottomFeiQi = {
        // xAxis: ["工业","医疗","其他","综合利用"],
        //   yAxis: [
        //     (parseFloat(this.barYuLinZFQ.yAxis[0])+parseFloat(this.barYanAnZFQ.yAxis[0])),
        //     (parseFloat(this.barYuLinZFQ.yAxis[1])+parseFloat(this.barYanAnZFQ.yAxis[1])),
        //     (parseFloat(this.barYuLinZFQ.yAxis[2])+parseFloat(this.barYanAnZFQ.yAxis[2])),
        //     (parseFloat(this.barYuLinZFQ.yAxis[3])+parseFloat(this.barYanAnZFQ.yAxis[3])),
        //   ],
        // };


      }
      else if(quyu == "guanzhong"){
        // this.pieDataTop = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataHanChengWuShui.dataArr[0].value)+parseFloat(this.pieDataXiXianWuShui.dataArr[0].value)+parseFloat(this.pieDataYangLinWuShui.dataArr[0].value)+parseFloat(this.pieDataWeiNanWuShui.dataArr[0].value)+parseFloat(this.pieDataTongChuanWuShui.dataArr[0].value)+parseFloat(this.pieDataXianYangWuShui.dataArr[0].value)+parseFloat(this.pieDataBaoJiWuShui.dataArr[0].value)+parseFloat(this.pieDataXiAnWuShui.dataArr[0].value)), name: "城镇污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanChengWuShui.dataArr[1].value)+parseFloat(this.pieDataXiXianWuShui.dataArr[1].value)+parseFloat(this.pieDataYangLinWuShui.dataArr[1].value)+parseFloat(this.pieDataWeiNanWuShui.dataArr[1].value)+parseFloat(this.pieDataTongChuanWuShui.dataArr[1].value)+parseFloat(this.pieDataXianYangWuShui.dataArr[1].value)+parseFloat(this.pieDataBaoJiWuShui.dataArr[1].value)+parseFloat(this.pieDataXiAnWuShui.dataArr[1].value)), name: "工业污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanChengWuShui.dataArr[2].value)+parseFloat(this.pieDataXiXianWuShui.dataArr[2].value)+parseFloat(this.pieDataYangLinWuShui.dataArr[2].value)+parseFloat(this.pieDataWeiNanWuShui.dataArr[2].value)+parseFloat(this.pieDataTongChuanWuShui.dataArr[2].value)+parseFloat(this.pieDataXianYangWuShui.dataArr[2].value)+parseFloat(this.pieDataBaoJiWuShui.dataArr[2].value)+parseFloat(this.pieDataXiAnWuShui.dataArr[2].value)), name: "农村污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanChengWuShui.dataArr[3].value)+parseFloat(this.pieDataXiXianWuShui.dataArr[3].value)+parseFloat(this.pieDataYangLinWuShui.dataArr[3].value)+parseFloat(this.pieDataWeiNanWuShui.dataArr[3].value)+parseFloat(this.pieDataTongChuanWuShui.dataArr[3].value)+parseFloat(this.pieDataXianYangWuShui.dataArr[3].value)+parseFloat(this.pieDataBaoJiWuShui.dataArr[3].value)+parseFloat(this.pieDataXiAnWuShui.dataArr[3].value)), name: "其它污水处理厂" },
        //   ]
        // };
        // this.pieDataCenter = {
        //   dataArr: [
        //
        //       { value: (parseFloat(this.pieDataHanChengLJ.dataArr[0].value)+parseFloat(this.pieDataXiXianLJ.dataArr[0].value)+parseFloat(this.pieDataYangLinLJ.dataArr[0].value)+parseFloat(this.pieDataWeiNanLJ.dataArr[0].value)+parseFloat(this.pieDataTongChuanLJ.dataArr[0].value)+parseFloat(this.pieDataXianYangLJ.dataArr[0].value)+parseFloat(this.pieDataBaoJiLJ.dataArr[0].value)+parseFloat(this.pieDataXiAnLJ.dataArr[0].value)), name: "垃圾填埋场" },
        //       { value: (parseFloat(this.pieDataHanChengLJ.dataArr[1].value)+parseFloat(this.pieDataXiXianLJ.dataArr[1].value)+parseFloat(this.pieDataYangLinLJ.dataArr[1].value)+parseFloat(this.pieDataWeiNanLJ.dataArr[1].value)+parseFloat(this.pieDataTongChuanLJ.dataArr[1].value)+parseFloat(this.pieDataXianYangLJ.dataArr[1].value)+parseFloat(this.pieDataBaoJiLJ.dataArr[1].value)+parseFloat(this.pieDataXiAnLJ.dataArr[1].value)), name: "垃圾堆肥场" },
        //       { value: (parseFloat(this.pieDataHanChengLJ.dataArr[2].value)+parseFloat(this.pieDataXiXianLJ.dataArr[2].value)+parseFloat(this.pieDataYangLinLJ.dataArr[2].value)+parseFloat(this.pieDataWeiNanLJ.dataArr[2].value)+parseFloat(this.pieDataTongChuanLJ.dataArr[2].value)+parseFloat(this.pieDataXianYangLJ.dataArr[2].value)+parseFloat(this.pieDataBaoJiLJ.dataArr[2].value)+parseFloat(this.pieDataXiAnLJ.dataArr[2].value)), name: "垃圾焚烧厂" },
        //       { value: (parseFloat(this.pieDataHanChengLJ.dataArr[3].value)+parseFloat(this.pieDataXiXianLJ.dataArr[3].value)+parseFloat(this.pieDataYangLinLJ.dataArr[3].value)+parseFloat(this.pieDataWeiNanLJ.dataArr[3].value)+parseFloat(this.pieDataTongChuanLJ.dataArr[3].value)+parseFloat(this.pieDataXianYangLJ.dataArr[3].value)+parseFloat(this.pieDataBaoJiLJ.dataArr[3].value)+parseFloat(this.pieDataXiAnLJ.dataArr[3].value)), name: "其他处置厂" },
        //
        //   ]
        // };
        // this.pieDataBottom = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataHanChengWF.dataArr[0].value)+parseFloat(this.pieDataXiXianWF.dataArr[0].value)+parseFloat(this.pieDataYangLinWF.dataArr[0].value)+parseFloat(this.pieDataWeiNanWF.dataArr[0].value)+parseFloat(this.pieDataTongChuanWF.dataArr[0].value)+parseFloat(this.pieDataXianYangWF.dataArr[0].value)+parseFloat(this.pieDataBaoJiWF.dataArr[0].value)+parseFloat(this.pieDataXiAnWF.dataArr[0].value)), name: "危险废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataHanChengWF.dataArr[1].value)+parseFloat(this.pieDataXiXianWF.dataArr[1].value)+parseFloat(this.pieDataYangLinWF.dataArr[1].value)+parseFloat(this.pieDataWeiNanWF.dataArr[1].value)+parseFloat(this.pieDataTongChuanWF.dataArr[1].value)+parseFloat(this.pieDataXianYangWF.dataArr[1].value)+parseFloat(this.pieDataBaoJiWF.dataArr[1].value)+parseFloat(this.pieDataXiAnWF.dataArr[1].value)), name: "医疗废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataHanChengWF.dataArr[2].value)+parseFloat(this.pieDataXiXianWF.dataArr[2].value)+parseFloat(this.pieDataYangLinWF.dataArr[2].value)+parseFloat(this.pieDataWeiNanWF.dataArr[2].value)+parseFloat(this.pieDataTongChuanWF.dataArr[2].value)+parseFloat(this.pieDataXianYangWF.dataArr[2].value)+parseFloat(this.pieDataBaoJiWF.dataArr[2].value)+parseFloat(this.pieDataXiAnWF.dataArr[2].value)), name: "其他企业协同处置" },
        //   ]
        // };
        // this.bar3NewData = {
        //   xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        //   yAxis: [
        //       (parseFloat(this.barDataHanChengWuShui.yAxis[0])+parseFloat(this.barDataXiXianWuShui.yAxis[0])+parseFloat(this.barDataYangLinWuShui.yAxis[0])+parseFloat(this.barDataWeiNanWuShui.yAxis[0])+parseFloat(this.barDataTongChuanWuShui.yAxis[0])+parseFloat(this.barDataXianYangWuShui.yAxis[0])+parseFloat(this.barDataBaoJiWuShui.yAxis[0])+parseFloat(this.barDataXiAnWuShui.yAxis[0])),
        //       (parseFloat(this.barDataHanChengWuShui.yAxis[1])+parseFloat(this.barDataXiXianWuShui.yAxis[1])+parseFloat(this.barDataYangLinWuShui.yAxis[1])+parseFloat(this.barDataWeiNanWuShui.yAxis[1])+parseFloat(this.barDataTongChuanWuShui.yAxis[1])+parseFloat(this.barDataXianYangWuShui.yAxis[1])+parseFloat(this.barDataBaoJiWuShui.yAxis[1])+parseFloat(this.barDataXiAnWuShui.yAxis[1])),
        //       (parseFloat(this.barDataHanChengWuShui.yAxis[2])+parseFloat(this.barDataXiXianWuShui.yAxis[2])+parseFloat(this.barDataYangLinWuShui.yAxis[2])+parseFloat(this.barDataWeiNanWuShui.yAxis[2])+parseFloat(this.barDataTongChuanWuShui.yAxis[2])+parseFloat(this.barDataXianYangWuShui.yAxis[2])+parseFloat(this.barDataBaoJiWuShui.yAxis[2])+parseFloat(this.barDataXiAnWuShui.yAxis[2])),
        //       (parseFloat(this.barDataHanChengWuShui.yAxis[3])+parseFloat(this.barDataXiXianWuShui.yAxis[3])+parseFloat(this.barDataYangLinWuShui.yAxis[3])+parseFloat(this.barDataWeiNanWuShui.yAxis[3])+parseFloat(this.barDataTongChuanWuShui.yAxis[3])+parseFloat(this.barDataXianYangWuShui.yAxis[3])+parseFloat(this.barDataBaoJiWuShui.yAxis[3])+parseFloat(this.barDataXiAnWuShui.yAxis[3])),
        //       (parseFloat(this.barDataHanChengWuShui.yAxis[4])+parseFloat(this.barDataXiXianWuShui.yAxis[4])+parseFloat(this.barDataYangLinWuShui.yAxis[4])+parseFloat(this.barDataWeiNanWuShui.yAxis[4])+parseFloat(this.barDataTongChuanWuShui.yAxis[4])+parseFloat(this.barDataXianYangWuShui.yAxis[4])+parseFloat(this.barDataBaoJiWuShui.yAxis[4])+parseFloat(this.barDataXiAnWuShui.yAxis[4])),
        //     ]
        // };



        //console.log('barDataRightBottomFeiQi', (parseFloat(this.barDataHanChengZFQ.yAxis[0])+parseFloat(this.barDataXiXianZFQ.yAxis[0])+parseFloat(this.barDataYangLinZFQ.yAxis[0])+parseFloat(this.barDataWeiNanZFQ.yAxis[0])+parseFloat(this.barDataXianYangZFQ.yAxis[0])+parseFloat(this.barDataXiAnZFQ.yAxis[0])+parseFloat(this.barDataTongchuanZFQ11.yAxis[0])+parseFloat(this.barDataBaojiZFQ12.yAxis[0])));
        //console.log('barDataTongchuanZFQ11',this.barDataTongchuanZFQ11);
        //console.log('barDataBaojiZFQ12',this.barDataBaojiZFQ12);

        // this.barDataRightBottomFeiQi = {
        // xAxis: ["工业","医疗","其他","综合利用"],
        //   yAxis: [
        //     (parseFloat(this.barDataHanChengZFQ.yAxis[0])+parseFloat(this.barDataXiXianZFQ.yAxis[0])+parseFloat(this.barDataYangLinZFQ.yAxis[0])+parseFloat(this.barDataWeiNanZFQ.yAxis[0])+parseFloat(this.barDataXianYangZFQ.yAxis[0])+parseFloat(this.barDataXiAnZFQ.yAxis[0])+parseFloat(this.barDataTongchuanZFQ11.yAxis[0])+parseFloat(this.barDataBaojiZFQ12.yAxis[0])),
        //     (parseFloat(this.barDataHanChengZFQ.yAxis[1])+parseFloat(this.barDataXiXianZFQ.yAxis[1])+parseFloat(this.barDataYangLinZFQ.yAxis[1])+parseFloat(this.barDataWeiNanZFQ.yAxis[1])+parseFloat(this.barDataXianYangZFQ.yAxis[1])+parseFloat(this.barDataXiAnZFQ.yAxis[1])+parseFloat(this.barDataTongchuanZFQ11.yAxis[1])+parseFloat(this.barDataBaojiZFQ12.yAxis[1])),
        //     (parseFloat(this.barDataHanChengZFQ.yAxis[2])+parseFloat(this.barDataXiXianZFQ.yAxis[2])+parseFloat(this.barDataYangLinZFQ.yAxis[2])+parseFloat(this.barDataWeiNanZFQ.yAxis[2])+parseFloat(this.barDataXianYangZFQ.yAxis[2])+parseFloat(this.barDataXiAnZFQ.yAxis[2])+parseFloat(this.barDataTongchuanZFQ11.yAxis[2])+parseFloat(this.barDataBaojiZFQ12.yAxis[2])),
        //     (parseFloat(this.barDataHanChengZFQ.yAxis[3])+parseFloat(this.barDataXiXianZFQ.yAxis[3])+parseFloat(this.barDataYangLinZFQ.yAxis[3])+parseFloat(this.barDataWeiNanZFQ.yAxis[3])+parseFloat(this.barDataXianYangZFQ.yAxis[3])+parseFloat(this.barDataXiAnZFQ.yAxis[3])+parseFloat(this.barDataTongchuanZFQ11.yAxis[3])+parseFloat(this.barDataBaojiZFQ12.yAxis[3])),
        //   ],
        // };


      }
      else if(quyu == "shannan"){
        // this.pieDataTop = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataHanZhongWuShui.dataArr[0].value)+parseFloat(this.pieDataAnKangWuShui.dataArr[0].value)+parseFloat(this.pieDataShangLuoWuShui.dataArr[0].value)), name: "城镇污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanZhongWuShui.dataArr[1].value)+parseFloat(this.pieDataAnKangWuShui.dataArr[1].value)+parseFloat(this.pieDataShangLuoWuShui.dataArr[1].value)), name: "工业污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanZhongWuShui.dataArr[2].value)+parseFloat(this.pieDataAnKangWuShui.dataArr[2].value)+parseFloat(this.pieDataShangLuoWuShui.dataArr[2].value)), name: "农村污水处理厂" },
        //       { value: (parseFloat(this.pieDataHanZhongWuShui.dataArr[3].value)+parseFloat(this.pieDataAnKangWuShui.dataArr[3].value)+parseFloat(this.pieDataShangLuoWuShui.dataArr[3].value)), name: "其它污水处理厂" },
        //   ]
        // };
        // this.pieDataCenter = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataHanZhongLJ.dataArr[0].value)+parseFloat(this.pieDataAnKangLJ.dataArr[0].value)+parseFloat(this.pieDataShangLuoLJ.dataArr[0].value)), name: "垃圾填埋场" },
        //       { value: (parseFloat(this.pieDataHanZhongLJ.dataArr[1].value)+parseFloat(this.pieDataAnKangLJ.dataArr[1].value)+parseFloat(this.pieDataShangLuoLJ.dataArr[1].value)), name: "垃圾堆肥场" },
        //       { value: (parseFloat(this.pieDataHanZhongLJ.dataArr[2].value)+parseFloat(this.pieDataAnKangLJ.dataArr[2].value)+parseFloat(this.pieDataShangLuoLJ.dataArr[2].value)), name: "垃圾焚烧厂" },
        //       { value: (parseFloat(this.pieDataHanZhongLJ.dataArr[3].value)+parseFloat(this.pieDataAnKangLJ.dataArr[3].value)+parseFloat(this.pieDataShangLuoLJ.dataArr[3].value)), name: "其他处置厂" },
        //
        //   ]
        // };
        // this.pieDataBottom = {
        //   dataArr: [
        //       { value: (parseFloat(this.pieDataHanZhongWF.dataArr[0].value)+parseFloat(this.pieDataAnKangWF.dataArr[0].value)+parseFloat(this.pieDataShangLuoWF.dataArr[0].value)), name: "危险废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataHanZhongWF.dataArr[1].value)+parseFloat(this.pieDataAnKangWF.dataArr[1].value)+parseFloat(this.pieDataShangLuoWF.dataArr[1].value)), name: "医疗废弃物集中处置厂" },
        //       { value: (parseFloat(this.pieDataHanZhongWF.dataArr[2].value)+parseFloat(this.pieDataAnKangWF.dataArr[2].value)+parseFloat(this.pieDataShangLuoWF.dataArr[2].value)), name: "其他企业协同处置" },
        //   ]
        // };
        // this.bar3NewData = {
        //   xAxis: ["化学需氧量","氨氮","总氮", "总磷" ],
        //   yAxis: [
        //       (parseFloat(this.HanChengWuShui.yAxis[0])+parseFloat(this.barDataAnKangWuShui.yAxis[0])+parseFloat(this.barDataShangLuoWuShui.yAxis[0])),
        //       (parseFloat(this.HanChengWuShui.yAxis[1])+parseFloat(this.barDataAnKangWuShui.yAxis[1])+parseFloat(this.barDataShangLuoWuShui.yAxis[1])),
        //       (parseFloat(this.HanChengWuShui.yAxis[2])+parseFloat(this.barDataAnKangWuShui.yAxis[2])+parseFloat(this.barDataShangLuoWuShui.yAxis[2])),
        //       (parseFloat(this.HanChengWuShui.yAxis[3])+parseFloat(this.barDataAnKangWuShui.yAxis[3])+parseFloat(this.barDataShangLuoWuShui.yAxis[3])),
        //       (parseFloat(this.HanChengWuShui.yAxis[4])+parseFloat(this.barDataAnKangWuShui.yAxis[4])+parseFloat(this.barDataShangLuoWuShui.yAxis[4]))
        //     ],
        // };



        // this.barDataRightBottomFeiQi = {
        //   xAxis: ["工业","医疗","其他","综合利用"],
        //   yAxis: [
        //     (parseFloat(this.barHanZhongZFQ.yAxis[0])+parseFloat(this.barAnKangZFQ.yAxis[0])+parseFloat(this.barShangLuoZFQ.yAxis[0])),
        //     (parseFloat(this.barHanZhongZFQ.yAxis[1])+parseFloat(this.barAnKangZFQ.yAxis[1])+parseFloat(this.barShangLuoZFQ.yAxis[1])),
        //     (parseFloat(this.barHanZhongZFQ.yAxis[2])+parseFloat(this.barAnKangZFQ.yAxis[2])+parseFloat(this.barShangLuoZFQ.yAxis[2])),
        //     (parseFloat(this.barHanZhongZFQ.yAxis[3])+parseFloat(this.barAnKangZFQ.yAxis[3])+parseFloat(this.barShangLuoZFQ.yAxis[3])),
        //   ],
        // };
      }
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
/*                center: [12129470.527, 4255685.289],
                zoom: 6*/
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
          /* var name = feature.get('name');

          var lnglat = this.geoCoordPoiEnt[name];

          var LngLatPro = ol.proj.transform(lnglat, 'EPSG:4326' ,'EPSG:3857');
          //console.log('name',name,'LngLatPro',LngLatPro,'LngLat',feature.get('lnglat'));
          this.map.getView().setZoom(9);
          this.map.getView().setCenter(LngLatPro);
          //this.map.getView().setCenter(feature.get('lnglat'));
*/
         /* this.map.getView().setZoom(9);
          this.map.getView().setCenter([12164928.607418582,4358388.38935899]);*/
          this.map.getView().setZoom(10);
          this.map.getView().setCenter(e.coordinate);
        }
      }
      else{
        //当为企业坐标点时
        var coordinateLngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
        var EnterpriseInfo = await this.queryJZSEntInfo(coordinateLngLat);
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
      if(EnterpriseInfo.leixing == 'shljclc'){
        if(EnterpriseInfo.SNSTMC != 0 && EnterpriseInfo.SNSTMC != 'null')
        popContent.innerHTML += "<span class = 'poiText' >受纳水体名称：" + EnterpriseInfo.SNSTMC + "</span>";
        if(EnterpriseInfo.LXFS_LXR != 0 && EnterpriseInfo.LXFS_LXR != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXFS_LXR + "</span>";
        if(EnterpriseInfo.LXFS_DHHM != 0 && EnterpriseInfo.LXFS_DHHM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系电话：" + EnterpriseInfo.LXFS_DHHM + "</span>";
        if(EnterpriseInfo.JCSJN != 0 && EnterpriseInfo.JCSJN != 'null')
        popContent.innerHTML += "<span class = 'poiText' >建成年月：" + EnterpriseInfo.JCSJN + "</span>";
        if(EnterpriseInfo.NYXTS != 0 && EnterpriseInfo.NYXTS != 'null')
        popContent.innerHTML += "<span class = 'poiText' >年运行天数：" + EnterpriseInfo.NYXTS + "(天)</span>";
        if(EnterpriseInfo.WSCSL != 0 && EnterpriseInfo.WSCSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >废水(含渗滤液)产生量：" + EnterpriseInfo.WSCSL + "(立方米)</span>";
        if(EnterpriseInfo.FSCLFS != 0 && EnterpriseInfo.FSCLFS != 'null')
        popContent.innerHTML += "<span class = 'poiText' >废水处理方式：" + EnterpriseInfo.FSCLFS + "</span>";
        /*
        popContent.innerHTML += "<span class = 'poiText' >废水实际处理量：" + EnterpriseInfo.WSSJCLL + "</span>";
        popContent.innerHTML += "<span class = 'poiText' >废水实际排放量：" + EnterpriseInfo.FSSJPFL + "</span>";
        */

        this.bar3NewData = {};
        this.barDataRightCenterFeiShui = EnterpriseInfo.LaJiChuLiChang;
        this.barDataRightBottomFeiQi = {};


        this.fileTextShowTop = true;
        this.fileTextShowCenter = false;
        this.fileTextShowBottom = true;


      }
      else if(EnterpriseInfo.leixing == 'wxfwclc'){

        if(EnterpriseInfo.JCSJN != 0 && EnterpriseInfo.JCSJN != 'null')
        popContent.innerHTML += "<span class = 'poiText' >建成年月：" + EnterpriseInfo.JCSJN + "</span>";
        if(EnterpriseInfo.JZCLCLX != 0 && EnterpriseInfo.JZCLCLX != 'null')
        popContent.innerHTML += "<span class = 'poiText' >集中处理厂类型：" + EnterpriseInfo.JZCLCLX + "</span>";
        if(EnterpriseInfo.SNSTMC != 0 && EnterpriseInfo.SNSTMC != 'null')
        popContent.innerHTML += "<span class = 'poiText' >受纳水体名称：" + EnterpriseInfo.SNSTMC + "</span>";
        if(EnterpriseInfo.LXR != 0 && EnterpriseInfo.LXR != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXR + "</span>";
        if(EnterpriseInfo.DHHM != 0 && EnterpriseInfo.DHHM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系电话：" + EnterpriseInfo.DHHM + "</span>";
        if(EnterpriseInfo.BNYXTS != 0 && EnterpriseInfo.BNYXTS != 'null')
        popContent.innerHTML += "<span class = 'poiText' >本年运行天数：" + EnterpriseInfo.BNYXTS + "(天)</span>";
        if(EnterpriseInfo.BNWXFWJSL != 0 && EnterpriseInfo.BNWXFWJSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >危险废物接收量：" + EnterpriseInfo.BNWXFWJSL + "(吨)</span>";
        if(EnterpriseInfo.WXFWSJCZNL != 0 && EnterpriseInfo.WXFWSJCZNL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >危险废物设计处置利用能力：" + EnterpriseInfo.WXFWSJCZNL + "(吨/年)</span>";
        if(EnterpriseInfo.SJLYL != 0 && EnterpriseInfo.SJLYL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >实际利用量：" + EnterpriseInfo.SJLYL + "(吨)</span>";
        if(EnterpriseInfo.FSCSL != 0 && EnterpriseInfo.FSCSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >废水产生量：" + EnterpriseInfo.FSCSL + "(立方米)</span>";
        if(EnterpriseInfo.BNSJCLFSL != 0 && EnterpriseInfo.BNSJCLFSL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >实际处理废水量：" + EnterpriseInfo.BNSJCLFSL + "(立方米)</span>";
        if(EnterpriseInfo.FSPFL != 0 && EnterpriseInfo.FSPFL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >废水排放量：" + EnterpriseInfo.FSPFL + "(立方米)</span>";

        this.bar3NewData = {};
        this.barDataRightCenterFeiShui = {};
        this.barDataRightBottomFeiQi = EnterpriseInfo.WeiXianFeiWuChuLiChang;
        this.WFUnit="危险废物集中利用处置（处理）情况(吨)";

        this.fileTextShowTop = true;
        this.fileTextShowCenter = true;
        this.fileTextShowBottom = false;

      }
      else if(EnterpriseInfo.leixing == 'wsclc'){
        if(EnterpriseInfo.SNSTMC != 0 && EnterpriseInfo.SNSTMC != 'null')
        popContent.innerHTML += "<span class = 'poiText' >受纳水体名称：" + EnterpriseInfo.SNSTMC + "</span>";
        if(EnterpriseInfo.JCSJ_N != 0 && EnterpriseInfo.JCSJ_N != 'null')
        popContent.innerHTML += "<span class = 'poiText' >建成年月：" + EnterpriseInfo.JCSJ_N + "</span>";
        if(EnterpriseInfo.LXFS_LX != 0 && EnterpriseInfo.LXFS_LX != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系人：" + EnterpriseInfo.LXFS_LX + "</span>";
        if(EnterpriseInfo.LXFS_DHHM != 0 && EnterpriseInfo.LXFS_DHHM != 'null')
        popContent.innerHTML += "<span class = 'poiText' >联系电话：" + EnterpriseInfo.LXFS_DHHM + "</span>";
        if(EnterpriseInfo.NYXTS != 0 && EnterpriseInfo.NYXTS != 'null')
        popContent.innerHTML += "<span class = 'poiText' >年运行天数：" + EnterpriseInfo.NYXTS + "(天)</span>";
        if(EnterpriseInfo.YDL != 0 && EnterpriseInfo.YDL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >用电量：" + EnterpriseInfo.YDL + "(万千瓦时)</span>";
        if(EnterpriseInfo.WSSJCLNL != 0 && EnterpriseInfo.WSSJCLNL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >污水设计处理能力：" + EnterpriseInfo.WSSJCLNL + "(立方米/日)</span>";
        if(EnterpriseInfo.WSSJCLL != 0 && EnterpriseInfo.WSSJCLL != 'null')
        popContent.innerHTML += "<span class = 'poiText' >污水实际处理量：" + EnterpriseInfo.WSSJCLL + "(万立方米)</span>";
        if(EnterpriseInfo.WSCLSSLX != 0 && EnterpriseInfo.WSCLSSLX != 'null')
        popContent.innerHTML += "<span class = 'poiText' >污水处理设施类型：" + EnterpriseInfo.WSCLSSLX + "</span>";



        this.fileTextShowTop = false;
        this.fileTextShowCenter = false;
        this.fileTextShowBottom = false;

      }

      that.Popup.setPosition(coordinatePro);
      that.isPopupShow = true;
      this.map.updateSize();

    },

    //查询企业信息
    async queryJZSEntInfo(coordinateLngLat){
      var EntInfo = {};
        var tolerance=10*this.map.getView().getResolution();
      var Params = {
        coor: coordinateLngLat.toString(),
          tolerance:tolerance
      }
      await api.QueryJZSEntInfo(Params).then(res=>{

        var resultData = res.data;

        if(resultData){
            if(resultData.status == "success"){
              var InfoData = resultData.data.Info[0];
              EntInfo.name = InfoData.DWXXMC;
              EntInfo.leixing = InfoData.LEIXING;
              var lng = this.DuFenMiaoToDu(InfoData.QYDLWZ_JD_DU,InfoData.QYDLWZ_JD_FEN,InfoData.QYDLWZ_JD_MIAO);
              var lat = this.DuFenMiaoToDu(InfoData.QYDLWZ_WD_DU,InfoData.QYDLWZ_WD_FEN,InfoData.QYDLWZ_WD_MIAO);
              EntInfo.lng = lng;
              EntInfo.lat = lat;
            }
        }
      });
      // console.log("企业信息类型",EntInfo.leixing);
      if(EntInfo.leixing == 'shljclc'){
        //查询生活垃圾集中处置场详细信息
        var ParamsEnt = {
          name: EntInfo.name,
        }

        await api.QueryJZSEntXXInfo(ParamsEnt).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                console.log("JZSEntInfo:",resultData.data.JZSEntXXInfo[0]);
                var JZSEntInfo = resultData.data.JZSEntXXInfo[0];
                EntInfo.FK_ID = JZSEntInfo.FK_ID;
                EntInfo.TYSHXYDM = JZSEntInfo.TYSHXYDM;
                EntInfo.QYFRDM = JZSEntInfo.QYFRDM;
                EntInfo.SNSTMC = JZSEntInfo.SNSTMC;
                EntInfo.LXFS_LXR = JZSEntInfo.LXFS_LXR;
                EntInfo.LXFS_DHHM = JZSEntInfo.LXFS_DHHM;
                EntInfo.JCSJN = JZSEntInfo.JCSJN;

              }
          }
        });

        //查询生活垃圾集中处置场详细信息
        var ParamsEntCZ = {
          name: EntInfo.name,
          tyshxydm: EntInfo.TYSHXYDM,
          qyfrdm: EntInfo.QYFRDM,
        }

        await api.QueryJZSEntCZInfo(ParamsEntCZ).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){

                var JZSEntCZInfo = resultData.data.JZSEntCZInfo[0];
                // console.log("生活源垃圾处理厂处置信息",JZSEntCZInfo);

                if(JZSEntCZInfo.TM_NSJTML == "null"){
                  EntInfo.TM_NSJTML = parseFloat(0);
                }
                else{
                  EntInfo.TM_NSJTML = parseFloat(JZSEntCZInfo.TM_NSJTML);
                }

                if(JZSEntCZInfo.FS_NSJFSCLL == "null"){
                  EntInfo.FS_NSJFSCLL = parseFloat(0);
                }
                else{
                  EntInfo.FS_NSJFSCLL = parseFloat(JZSEntCZInfo.FS_NSJFSCLL);
                }
                if(JZSEntCZInfo.DF_BNSJDFL == "null"){
                  EntInfo.DF_BNSJDFL = parseFloat(0);
                }
                else{
                  EntInfo.DF_BNSJDFL = parseFloat(JZSEntCZInfo.DF_BNSJDFL);
                }
                if(JZSEntCZInfo.QT_BNSJCZL == "null"){
                  EntInfo.QT_BNSJCZL = parseFloat(0);
                }
                else{
                  EntInfo.QT_BNSJCZL = parseFloat(JZSEntCZInfo.QT_BNSJCZL);
                }

                EntInfo.LaJiChuLiChang =
                {
                  xAxis: ["填埋量","焚烧处置量","堆肥量", "其他处置量"],
                  yAxis: [ EntInfo.TM_NSJTML,EntInfo.FS_NSJFSCLL,EntInfo.DF_BNSJDFL,EntInfo.QT_BNSJCZL],
                }


                EntInfo.NYXTS = JZSEntCZInfo.NYXTS
                EntInfo.WSCSL = JZSEntCZInfo.WSCSL
                if(JZSEntCZInfo.FSCLFS == '1'){
                  EntInfo.FSCLFS = '自行处理'
                }
                else if(JZSEntCZInfo.FSCLFS == '2'){
                  EntInfo.FSCLFS = '委托其它单位处理'
                }
                else if(JZSEntCZInfo.FSCLFS == '3'){
                  EntInfo.FSCLFS = '直接回喷至填埋场'
                }
                else if(JZSEntCZInfo.FSCLFS == '4'){
                  EntInfo.FSCLFS = '直接排放'
                }
                else{
                  EntInfo.FSCLFS = '无'
                }

                EntInfo.WSSJCLL = JZSEntCZInfo.WSSJCLL
                EntInfo.FSSJPFL = JZSEntCZInfo.FSSJPFL

              }
          }
        });
      }
      else if(EntInfo.leixing == 'wxfwclc'){
        //查询危险废物集中处置场详细信息
        var ParamsEntWF = {
          name: EntInfo.name,
        }

        await api.QueryJZSEntWFXXInfo(ParamsEntWF).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var JZSEntWFInfo = resultData.data.JZSEntWFXXInfo[0];
                console.log("危险处理厂详细信息",JZSEntWFInfo);

                EntInfo.FK_ID = JZSEntWFInfo.FK_ID;
                EntInfo.TYSHXYDM = JZSEntWFInfo.TYSHXYDM;
                EntInfo.QYFRDM = JZSEntWFInfo.QYFRDM;
                EntInfo.SNSTMC = JZSEntWFInfo.SNSTMC;
                EntInfo.LXR = JZSEntWFInfo.LXR;
                EntInfo.DHHM = JZSEntWFInfo.DHHM;
                EntInfo.JCSJN = JZSEntWFInfo.JCSJN;


                if(JZSEntWFInfo.JZCLCLX=='1'){
                  EntInfo.JZCLCLX = '危险废物集中处置厂'
                }
                else if(JZSEntWFInfo.JZCLCLX=='2'){
                  EntInfo.JZCLCLX = '(单独)医疗废物集中处置厂'
                }
                else if(JZSEntWFInfo.JZCLCLX=='3'){
                  EntInfo.JZCLCLX = '其他企业协同处置'
                }
                else{
                  EntInfo.JZCLCLX = '无'
                }


              }
          }
        });


        //查询危险废物集中处置场详细信息
        var ParamsEntWFCZ = {
          name: EntInfo.name,
          tyshxydm: EntInfo.TYSHXYDM,
          qyfrdm: EntInfo.QYFRDM,
        }

        await api.QueryJZSEntWFCZInfo(ParamsEntWFCZ).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){

                var JZSEntWFCZInfo = resultData.data.JZSEntWFCZInfo[0];


                if(JZSEntWFCZInfo.QZCZGYWXFWL == "null"){
                  EntInfo.QZCZGYWXFWL = parseFloat(0);
                }
                else{
                  EntInfo.QZCZGYWXFWL = parseFloat(JZSEntWFCZInfo.QZCZGYWXFWL);
                }

                if(JZSEntWFCZInfo.CZYLFWL == "null"){
                  EntInfo.CZYLFWL = parseFloat(0);
                }
                else{
                  EntInfo.CZYLFWL = parseFloat(JZSEntWFCZInfo.CZYLFWL);
                }
                if(JZSEntWFCZInfo.CZQTWXFWL == "null"){
                  EntInfo.CZQTWXFWL = parseFloat(0);
                }
                else{
                  EntInfo.CZQTWXFWL = parseFloat(JZSEntWFCZInfo.CZQTWXFWL);
                }
                if(JZSEntWFCZInfo.ZHLYWXFWL == "null"){
                  EntInfo.ZHLYWXFWL = parseFloat(0);
                }
                else{
                  EntInfo.ZHLYWXFWL = parseFloat(JZSEntWFCZInfo.ZHLYWXFWL);
                }

                EntInfo.WeiXianFeiWuChuLiChang =
                {
                  xAxis: ["工业","医疗","其它", "综合利用"],
                  yAxis: [ EntInfo.QZCZGYWXFWL,EntInfo.CZYLFWL,EntInfo.CZQTWXFWL,EntInfo.ZHLYWXFWL],
                }

                EntInfo.BNYXTS = JZSEntWFCZInfo.BNYXTS
                EntInfo.BNWXFWJSL = JZSEntWFCZInfo.BNWXFWJSL
                EntInfo.WXFWSJCZNL = JZSEntWFCZInfo.WXFWSJCZNL
                EntInfo.SJLYL = JZSEntWFCZInfo.SJLYL
                EntInfo.FSCSL = JZSEntWFCZInfo.FSCSL
                EntInfo.BNSJCLFSL = JZSEntWFCZInfo.BNSJCLFSL
                EntInfo.FSPFL = JZSEntWFCZInfo.FSPFL


              }
          }
        });

      }
      else if(EntInfo.leixing == 'wsclc'){
        //查询污水处置场详细信息
        var ParamsEntWS = {
          name: EntInfo.name,
        }

        await api.QueryJZSEntWSXXInfo(ParamsEntWS).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var JZSEntWSInfo = resultData.data.JZSEntWSXXInfo[0];
                console.log("污水处理厂详细信息",JZSEntWSInfo);

                EntInfo.FK_ID = JZSEntWSInfo.FK_ID;
                EntInfo.TYSHXYDM = JZSEntWSInfo.TYSHXYDM;
                EntInfo.QYFRDM = JZSEntWSInfo.QYFRDM;
                EntInfo.SNSTMC = JZSEntWSInfo.SNSTMC;
                EntInfo.LXFS_LX = JZSEntWSInfo.LXFS_LX;
                EntInfo.LXFS_DHHM = JZSEntWSInfo.LXFS_DHHM;
                EntInfo.JCSJ_N = JZSEntWSInfo.JCSJ_N;
                if(JZSEntWSInfo.WSCLSSLX == 1){
                  EntInfo.WSCLSSLX = "城镇污水处理厂";
                }
                else if(JZSEntWSInfo.WSCLSSLX == 2){
                  EntInfo.WSCLSSLX = "工业污水处理厂";
                }
                else if(JZSEntWSInfo.WSCLSSLX == 3){
                  EntInfo.WSCLSSLX = "农村污水处理厂";
                }
                else if(JZSEntWSInfo.WSCLSSLX == 4){
                  EntInfo.WSCLSSLX = "其它污水处理厂";
                }

              }
          }
        });


        //查询污水处置场运行状态详细信息
        var ParamsEntWSYX = {
          name: EntInfo.name,
          tyshxydm: EntInfo.TYSHXYDM,
          qyfrdm: EntInfo.QYFRDM,
        }

        await api.QueryJZSEntWSYXInfo(ParamsEntWSYX).then(res=>{
          var resultData = res.data;
          if(resultData){
              if(resultData.status == "success"){
                var JZSEntWSInfo = resultData.data.JZSEntWSYXInfo[0];
                console.log("污水处理厂运行详细信息",JZSEntWSInfo);


                EntInfo.NYXTS = JZSEntWSInfo.NYXTS;
                EntInfo.YDL = JZSEntWSInfo.YDL;
                EntInfo.WSSJCLNL = JZSEntWSInfo.WSSJCLNL;
                EntInfo.WSSJCLL = JZSEntWSInfo.WSSJCLL;


              }
          }
        });


      }




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
        // this.sxxjbjProLayer.setStyle(this.setSjShowStyle);
      }else{
        for(var i=0;i<this.xjfeatures.length;i++){
          this.xjfeatures[i].setStyle(style1);
        }
        this.sjVectorLayer.setStyle(this.setSjShowStyle);
        // this.sxxjbjProLayer.setStyle(this.setSjNoShowStyle);
      }

      if(this.isQiYe){
        if(zoom >= 9){
          if(this.poiLayerCount ==1){
            if(this.radioFenLei == 1){
              this.map.addLayer(this.jzsEntshenghuoWMTSLayer);
            }
            if(this.radioFenLei == 2){
              this.map.addLayer(this.jzsEntweixianWMTSLayer);
            }
            if(this.radioFenLei == 3){
              this.map.addLayer(this.jzsEntwsWMTSLayer);
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
              this.removejzsEntLayer();;
              this.LoadDiShiPopup();
              console.log('添加poi');
              this.poiLayerCount = 1;
            }
          }
        }
      }
      else if(this.isDiShi){
        if(zoom>=8){
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
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.7)', width: 2}),
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
      console.log('that.xjVectorSource',that.xjVectorSource);
      console.log('this.isXianJi',this.isXianJi);
      if(that.sjVectorSource && this.isShiJi) {
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if (features && features.length > 0) {
          selFeature = features[0].clone();
        }
      }
        else if(that.xjVectorSource && this.isXianJi){
          var features = that.xjVectorSource.getFeaturesAtCoordinate(coordinate);
          if(features && features.length>0){
            console.log('这是县级',features);
            selFeature = features[0].clone();
          }
        }

      console.log('selfeature',selFeature);
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
 /*     var DSJSXZDM = "";
      if(selFeature){
        DSJSXZDM = selFeature.N.BZ;
        console.log(DSJSXZDM);
      }

      if(DSJSXZDM!=""){
        that.refreshWRYEchart(DSJSXZDM);
      }
      else{
        //未选中行政区
        //集中式
        this.changeToQuanSheng();
      }*/


//获取行政区代码
if(selFeature) {
  this.DSJSXZDM = selFeature.N.PAC;
}else {
    this.DSJSXZDM ="610600";
}
      this.getYanAnchart_Jizhongshi();
      this.getXZQchart_Jizhongshi(this.DSJSXZDM);//测试数据610602
      // this.getHychart( this.peiDSJSXZDM,this.pflx,this.wrwlx);//测试数据 610602，fs,hxxylpfl;
    },

    //zqq 获取延安整体数据

    async getYanAnchart_Jizhongshi(){
      var Params = {
        XZQDM: "init",
      }
      await api.getJZSgengxinCacheData(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            this.barDataWuShui=resultData.data.grid04;
            this.jzswrzlss = "集中式污染治理"+resultData.data.grid04.all+"个";
            console.log("这是返回结果",resultData.data);
            console.log("这是grid04",this.barDataWuShui);

          }
        }
      });
    },

    //zqq 获取点击变化数据
    async getXZQchart_Jizhongshi(xzqdm){
      var Params = {
        XZQDM: xzqdm,
      }
      console.log("这是params:",Params);
      await api.getJZSgengxinCacheData(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            this.bar3NewData=resultData.data.grid05;
            this.barDataRightCenterFeiShui=resultData.data.grid06;
            this.barDataRightBottomFeiQi=resultData.data.grid07;

            this.pieDataTop=resultData.data.grid01;
            this.pieDataCenter=resultData.data.grid02;
            this.pieDataBottom=resultData.data.grid03;

          }
        }
      });
    },


    changeToQuanSheng(){
      this.jzswrzlss = "集中式污染治理11台",
      //集中式
      // this.pieDataTop = this.pieDataQuanShengWuShui;
      // this.pieDataCenter = this.pieDataQuanShengLJ;
      // this.pieDataBottom = this.pieDataQuanShengWF;

      //右1
      // this.bar3NewData = this.bar3NewDataQuanSheng;
      //右2
      // this.barDataRightCenterFeiShui = this.barDataQuanShengZFS;

      // this.barDataRightBottomFeiQi = this.barDataQuanShengZFQ;

      this.fileTextShowTop = false;
      this.fileTextShowCenter = false;
      this.fileTextShowBottom = false;
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
        // this.pieDataTop = this.pieDataYuLinWuShui;
        // this.pieDataCenter = this.pieDataYuLinLJ;
        // this.pieDataBottom = this.pieDataYuLinWF;

        //右1
        // this.bar3NewData = this.barDataYuLinWuShui;

        // this.barDataRightCenterFeiShui = this.barDataYuLinZFS;

        // this.barDataRightBottomFeiQi = this.barYuLinZFQ;

        this.lineData1 = this.lineData1ShanBei;
        this.lineData2 = this.lineData2ShanBei;
        this.barData = this.barDataYuLin;

        this.barData1 =
        {
          xAxis: ["工业源", "农业源", "集中式", "移动源",'生活源'],
          yAxis: [this.YuLinWLY.gyy,this.YuLinWLY.nyy,this.YuLinWLY.jzs,this.YuLinWLY.ydy,this.YuLinWLY.shy],
        };
        this.pie3Data =
        {
          dataArr: [
              { value: this.YuLinWLY.gyy, name: "工业源" },
              { value: this.YuLinWLY.nyy, name: "农业源" },
              { value: this.YuLinWLY.jzs, name: "集中式" },
              { value: this.YuLinWLY.ydy, name: "移动源" },
              { value: this.YuLinWLY.shy, name: "生活源" },
          ]
        };

        this.weathers =
        [
          {
            name:'工业源',
            value:this.YuLinWLY.gyy,
            unite:'个'
          },
          {
            name:'农业源',
            value:this.YuLinWLY.nyy,
            unite:'个'
          },
          {
            name:'集中式',
            value:this.YuLinWLY.jzs,
            unite:'个'
          },
          {
            name:'移动源',
            value:this.YuLinWLY.ydy,
            unite:'个'
          }
          ,{
            name:'生活源',
            value:this.YuLinWLY.shy,
            unite:'个'
          }

        ];
        this.pie4Data =
        {
          dataArr: [
              { value: this.YuLinGYYQY.tc, name: "停产" },
              { value: this.YuLinGYYQY.gyyq, name: "工业园区" },
              { value: this.YuLinGYYQY.gb, name: "关闭" },
              { value: this.YuLinGYYQY.qt, name: "其它" },
              { value: this.YuLinGYYQY.yx, name: "运行" },
          ]
        };
      }
      else if(DSJSXZDM=='610600'){
        //延安
        console.log("延安");
        // this.pieDataTop = this.pieDataYanAnWuShui
        // this.pieDataCenter = this.pieDataYanAnLJ;
        // this.pieDataBottom = this.pieDataYanAnWF;

        //右1
        // this.bar3NewData = this.barDataYanAnWuShui;

        // this.barDataRightCenterFeiShui = this.barDataYanAnZFS;
        //
        // this.barDataRightBottomFeiQi = this.barYanAnZFQ;

        this.lineData1 = this.lineData1ShanBei;
        this.lineData2 = this.lineData2ShanBei;
        this.barData = this.barDataYanAn;

        this.barData1 =
        {
          xAxis: ["工业源", "农业源", "集中式", "移动源",'生活源'],
          yAxis: [this.YananWLY.gyy,this.YananWLY.nyy,this.YananWLY.jzs,this.YananWLY.ydy,this.YananWLY.shy],
        };
        this.pie3Data =
        {
          dataArr: [
              { value: this.YananWLY.gyy, name: "工业源" },
              { value: this.YananWLY.nyy, name: "农业源" },
              { value: this.YananWLY.jzs, name: "集中式" },
              { value: this.YananWLY.ydy, name: "移动源" },
              { value: this.YananWLY.shy, name: "生活源" },
          ]
        };

        this.weathers =
        [
          {
            name:'工业源',
            value:this.YananWLY.gyy,
            unite:'个'
          },
          {
            name:'农业源',
            value:this.YananWLY.nyy,
            unite:'个'
          },
          {
            name:'集中式',
            value:this.YananWLY.jzs,
            unite:'个'
          },
          {
            name:'移动源',
            value:this.YananWLY.ydy,
            unite:'个'
          }
          ,{
            name:'生活源',
            value:this.YananWLY.shy,
            unite:'个'
          }

        ];
        this.pie4Data =
        {
          dataArr: [
              { value: this.YananGYYQY.tc, name: "停产" },
              { value: this.YananGYYQY.gyyq, name: "工业园区" },
              { value: this.YananGYYQY.gb, name: "关闭" },
              { value: this.YananGYYQY.qt, name: "其它" },
              { value: this.YananGYYQY.yx, name: "运行" },
          ]
        };
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
    created(){
      this.getYanAnchart_Jizhongshi();
      this.getXZQchart_Jizhongshi("610600");//测试数据610602
     // this.getHychart_Jizhongshi( "610600");//测试数据 610602，fs,hxxylpfl;
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
    //加载WMTS
    this.loadGeoWMTSLayer();

    this.LoadDiShiPopup();

  //  刷新
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
    Bar3New,
    BarLeftBottom,
    Bar5,
    PieLeftTop,
    PieLeftCenter,
    PieLeftBottom,
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
  .Newbox1 {
    flex: 1;
    margin-top: 0 !important;
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
  .Newbox1:nth-child(1){
     flex: 1;
     height: 32.6% !important;
  }
  .Newbox1:nth-child(2){
    flex: 1;
    height: 32.6% !important;
  }
  .Newbox1:nth-child(3){
    flex: 1;
    height: 32.6% !important;
  }
/*
  .box1{
    height: 39%;
  }
  .box2{
    height: 59%;
  }*/
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
      bottom:60px;
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
  /*  .rightbarTopZL{
        height:32.6%;
        box-sizing: border-box;
        //margin-bottom: 12px;
    }*/
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
    margin-bottom: 12px;
  }

  .left-bottom-content{
    height:87%;
    width:90%;
    //margin-left:20px;
    //margin-top:10px;
  }

  .left-bottom-2{
    height:32.6%;
    margin-bottom: 12px;
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
    //.rightbarTopZL{
    //    height:32.6%;
    //    box-sizing: border-box;
    //    //margin-bottom: 12px;
    //}

  .filltext{
    //float:left;
    margin-top: 10px;
    margin-left: 160px;
    font-size: 30px;
  }

</style>



<style lang="scss" scoped>

  .SHLJCLC{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: -3px;
      background-image: url('../../assets/images/jzstuli/shljclc.png');
      background-repeat:no-repeat;
      background-size:120% 120%;
      -moz-background-size:100% 100%;
    }
  }
  .WXFWCLC{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: -3px;
      background-image: url('../../assets/images/jzstuli/wxfwclc.png');
      background-repeat:no-repeat;
      background-size:120% 120%;
      -moz-background-size:100% 100%;
    }
  }

  .WSCLC{
    &:after{
      content:'';
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 17px;
      top: -3px;
      background-image: url('../../assets/images/jzstuli/wsclc.png');
      background-repeat:no-repeat;
      background-size:120% 120%;
      -moz-background-size:100% 100%;
    }
  }


</style>
