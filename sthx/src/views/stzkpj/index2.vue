<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <Box title="土地利用现状">
        <barTdlyxz slot="content" :data="barTdlyxzData"/>
      </Box>
      <Box title="EI指数">
        <lineEIZS  slot="content" :data="lineEIZSData"/>
<!--        <div class="weater-box" slot="content">-->
<!--          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathers" :key="item.id" />-->
<!--        </div>-->
      </Box>
      <Box title="GDP/人口" >
        <div class="leftBtn" slot="subBtn">
          <el-button-group class="leftBtnR">
            <el-button size="mini" @click.native="BtnGDP">GDP</el-button>
            <el-button size="mini" @click.native="BtnRK">人口</el-button>
          </el-button-group>
        </div>
        <pieGDPZb slot="content" :data="pieGDPZbData1" v-show="isShowGDP"/>
<!--        <pieRkZb slot="content" :data="pieRkZbData" v-show="isShowRK"/>-->
        <div class="weater-box" slot="content" v-show="isShowGDPXJ">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathersGDP" :key="item.id" />
        </div>
        <div class="weater-box" slot="content" v-show="isShowRKXJ">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathersRKTJ" :key="item.id" />
        </div>
      </Box>
    </div>
    <div class="center">
      <Box>
          <div class="top-box" slot="content">
            <mapBox />
            <div class="tool">
              <!--显示地图或影像-->
              <div class='toolBarRadioDt toolBarRadioDiTu'>
                <el-radio-group v-model="radioDiTu"  @change="SelectDiTu()">
                  <el-radio :label="1" >地图</el-radio>
                  <el-radio :label="2" >影像</el-radio>
                </el-radio-group>
              </div>

              <div class='toolBarRadioQinling toolBarRadioDiTu'>
                <el-radio-group v-model="radioArea"  @change="SelectArea()">
                  <el-radio :label="1" >行政区划</el-radio>
                  <el-radio :label="2" >秦岭</el-radio>
                  <el-radio :label="3" >流域</el-radio>
                </el-radio-group>
              </div>
<!--              图例的设置-->
              <div >
                <div class='legend' v-if="isShowEILegend">
                  <span class='legend-ei' v-for="(Items,$index) in EILegendItems" :key="$index">{{Items.text}}</span>
                </div>
                <div class='legend' v-if="isShowGdpLegend">
                  <span class='legend-gdp' v-for="(Items,$index) in GdpLegendItems" :key="$index">{{Items.text}}</span>
                </div>
                <div class='legend' v-if="isShowRkLegend">
                  <span class='legend-rk' v-for="(Items,$index) in RkLegendItems" :key="$index">{{Items.text}}</span>
                </div>
              </div>
              <!--核查数据-->
<!--              <div class='toolBarCheck'>
                <el-checkbox-group v-model="hcChecked" v-if="isShowData" @change="handleHcCheckedChange">
                  <el-checkbox v-for="hcData in hcCheckedDatas" :label="hcData" :key="hcData">{{hcData}}</el-checkbox>
                </el-checkbox-group>
              </div>-->

              <!--复选框，变单选框的选择-->
<!--              <div class='toolBarCheck'>
                <el-checkbox-group v-model="checkedMap" v-if="isShowXuanran" :min="0" :max="1" @change="handleMapCheckedChange">
                  <el-checkbox v-for="mapData in checkedMapDatas" :label="mapData" :key="mapData" style="display:block" >{{mapData}}</el-checkbox>
                </el-checkbox-group>
              </div>-->

              <div class='toolBarDataUpdate'>
                <el-button size="mini" round @click="dataUpdate()">更新</el-button>
                <!--
                <el-button size="mini" round @click="test()">测试</el-button>
                -->
              </div>
              <div class='toolBarLunBo'>
                <el-button size="mini" round @click="lunBo()">轮播</el-button>
              </div>

<!--              显示地图数据或渲染数据-->
<!--              <div class='toolBarRadioMap toolBarRadioDiTu'>
                <el-radio-group v-model="radioMap" @change="SelectMap()">
                  <el-radio :label="1" >地图数据</el-radio>
                  <el-radio :label="2" >地图渲染</el-radio>
                </el-radio-group>
              </div>-->
              <div class='toolBarRadioMap1 toolBarRadioMap'>
                <el-switch
                    v-model="value1"
                    inactive-color="gray"
                    active-text="地图渲染"
                    @change="SelectMap(value1)">
                </el-switch>
              </div>
              <div class='toolBarRadioMap2 toolBarRadioMap'>
                <el-switch
                    v-model="hcValue"
                    inactive-color="gray"
                    active-text="核查数据"
                    @change="handleHcCheckedChange(hcValue)">
                </el-switch>
              </div>

              <div class='toolBarRadioXuanran toolBarRadioDiTu'>
                <el-radio-group v-model="xuanranMap" v-if="isShowXuanran" @change="handleMapCheckedChange">
                  <el-radio :label="1" >EI评价</el-radio>
                  <el-radio :label="2" style="display:block;line-height:28px">经济密度</el-radio>
                  <el-radio :label="3" style="display:block;line-height:28px">人口密度</el-radio>
                </el-radio-group>
              </div>
              <div class='toolBarSelect toolBarYearsSelect'>
                <el-select v-model="dataForm.year" placeholder="请选择" size="small" :popper-append-to-body="false" @change="SelectYear">
                  <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
                <div class='toolBarDataUpdate'>
                  <el-p id="textSTZKPJ" style="color:white;width:100px" >{{message1}}</el-p>
                  <el-button size="mini" round @click="dataUpdate()">更新</el-button>
                  <!--
                  <el-button size="mini" round @click="test()">测试</el-button>
                  -->
                  <div class='toolBarLunBo'>
                    <el-button size="mini" round @click="lunBo()">轮播</el-button>
                  </div>
                </div>
              </div>
              <div class='toolBarXZQSelect toolBarYearsSelect'>
                <el-select v-model="xzqForm.xzq" v-if="isShowXzq" placeholder="请选择" size="small" :popper-append-to-body="false" @change="SelectXzq">
                  <el-option
                      v-for="item in xzqs"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
      </Box>

      <Box title='生态状况指数'>
        <barStzkzs :data="barSthjzleiData" slot="content"/>
        <!--
        <div class="weater-box" slot="content">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathers" :key="item.id" />
        </div>
        -->
      </Box>
      <ImageDiv class="Image" v-show="isShowAImage" @closeImgDiv = "CloseImage" :featuredata="AttrFeatures"></ImageDiv>
      <hcAttributeTable class="attribute" v-show="isShowAttribute" @closeDiv="ClsoeAttr"  :featuredata="hcDatas" :arrPosition="arrPosition" :selectFeature="selectHcDatas" @attrCall="attrCallBack"></hcAttributeTable>
      <TimeAxis class="timeAxis" title="时间轴" v-show="timeAxisVisible" :timeDataNode="timeDataNode" :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
    </div>
    <div class="right-bar">
      <Box title="生态环境总指数" class="rightbarTop">
        <barSthjzs slot="content" :data="barSthjzsData"/>
      </Box>
      <Box title="生态环境分指数" class="rightbarTopZL1" >
        <el-collapse v-model="activeName" accordion slot="content">
          <el-collapse-item title="生物丰度指数" name="1">
           <!-- <div><barSwfdzs :data="barSwfdzsData" /></div>-->
            <barSwfdzs :data="barSwfdzsData" />
          </el-collapse-item>
          <el-collapse-item title="植被覆盖指数" name="2">
            <div><barZbfgzs :data="barZbfgzsData"/></div>
          </el-collapse-item>
          <el-collapse-item title="土地胁迫指数" name="3">
            <div><barTdfgxp :data="barTdfgxpData"/></div>
          </el-collapse-item>
          <el-collapse-item title="污染负荷指数" name="4">
            <div><pieHjfhzs :data="pieHjfhzsData"/></div>
          </el-collapse-item>
          <el-collapse-item title="环境限制指数" name="5">
            <div>
              <barHjxzzs :data="barHjxzzsData"/>
            </div>
          </el-collapse-item>
          <el-collapse-item title="水网密度指数" name="6">
            <div>
              <NewBoxDouble :title= gfUnit class="rightBottom">
                <BarSwmdzsLeft :data="SwmdzsLeftData" slot="leftContent"/>
                <BarSwmdzsRight :data="SwmdzsRightData" slot="RightContent"/>
              </NewBoxDouble>
            </div>
          </el-collapse-item>
        </el-collapse>
      </Box>
      <!--
      <NewBoxDouble :title= gfUnit class="rightBottom">
        <BarSwmdzsLeft :data="SwmdzsLeftData" slot="leftContent"/>
        <BarSwmdzsRight :data="SwmdzsRightData" slot="RightContent"/>
      </NewBoxDouble>
      -->
    </div>
  </div>
</template>
<script>
import Box from "../../components/common/box";
import PureBox from "../../components/common/pureBox";
import mapBox from "../../components/map/index.vue";
import barSthjzs from "../../components/charts/bar/stzkpj/barSthjzs.vue";
import barTdlyxz from "../../components/charts/bar/stzkpj/barTdlyxz.vue";

import lineEIZS from "../../components/charts/line/stzkpj/lineEIZS.vue";
import barSwfdzs from "../../components/charts/bar/stzkpj/barSwfdzs.vue";
import barZbfgzs from "../../components/charts/bar/stzkpj/barZbfgzs.vue";
import barWrfhzs from "../../components/charts/bar/stzkpj/barWrfhzs.vue";
import pieHjfhzs from "../../components/charts/pie/stzkpj/pieHjfhzs.vue";
import barHjxzzs from "../../components/charts/bar/stzkpj/barHjxzzs.vue";
import pieGDPZb from "../../components/charts/pie/stzkpj/pieGDPZb.vue";
import pieRkZb from "../../components/charts/pie/stzkpj/pieRkZb.vue";
import WeaterItem from "../../components/common/weather/index";
import barTdfgxp from "../../components/charts/bar/stzkpj/barTdfgxp.vue";
import NewBoxDouble from "../../components/common/newBox/indexDouble.vue";
import BarSwmdzsLeft from "../../components/charts/bar/stzkpj/BarSwmdzsLeft.vue";
import BarSwmdzsRight from "../../components/charts/bar/stzkpj/BarSwmdzsRight.vue";
import ol from 'openlayers';
import * as api from "../../assets/js/api/search.js";
import XZQCodeProcess from "../../dataprocess/XZQNameJoinAndSplit.js";
import ecahrtsExChange from "../../dataprocess/EcahrtsExChange.js";
import stzkpjTable from "../../dataprocess/stzkpjTable.js";
import barStzkzs from "../../components/charts/bar/stzkpj/barStzkzs.vue";

import hcAttributeTable from "../../components/common/attribute/index.vue";
import ImageDiv from "../../components/common/imageDiv";
import TimeAxis from "../../components/common/dataZoom";

import CodeData from '../../dataprocess/XZQCodeData.js';
import {indexOf} from "core-js";


export default {
  data() {
      return{
        timeAxisVisible: false,
        TimeAxisStop:false,
        timeDataArray: [],
        message1:"陕西省",
        dataForm:{
          year:"2017"
        },
        years:["2017","2018","2019","2020"],

        isShowAttribute:false,
        hcDatas:{
          featureArr:{},
          searchArr: {},
          totalCount:0,
        },
        selectHcDatas:{},

        isShowAImage:false,
        AttrFeatures:{
          featureArr: [],
        },

        isShowGDP:true,
        isShowRK:false,

        isShowGDPXJ:false,
        isShowRKXJ:false,

        isGDP:true,
        isRK:false,

        activeName: '6',
        gfUnit:"水网密度指数相关",

        hcChecked:[],
        hcCheckedDatas:['核查数据'],
        isHcData:false,

        hcFeatures:null,
        hcVectorSource:null,
        hcVectorLayer:null,

        xjFeatures:null,
        xjVectorSource:null,
        xjVectorLayer:null,
        sjFeatures:null,
        sjVectorSource: null,
        sjVectorLayer: null,
        OverlayVectorSource: null,
        OverlayVectorLayer:null,
        selecttype:"秦岭",
        radioArea:1,
        radioDiTu:1,
        radioMap:1,
        value1:false,
        hcValue:false,
        isShiJi:true,
        isXianJi:false,
        hjjczzData: {},
        hjjczzMapData: {},
        barSthjzsData: {},
        barTdlyxzData:{},
        lineEIZSData: {},
        barSwfdzsData: {},
        barZbfgzsData:{},
        weathersGDP:[
          {
            name:'GDP',
            value:'61.51',
            unite:''
          },
          {
            name:'GDP全省占比',
            value:'10%',
            unite:''
          },
        ],
        weathersRKTJ:[
          {
            name:'人口',
            value:'6151',
            unite:''
          },
          {
            name:'人口全省占比',
            value:'10%',
            unite:''
          },
        ],
        barTdfgxpData: {},
        barWrfhzsData:{},
        pieHjfhzsData: {},
        barHjxzzsData:{
          xAxis:["环境限制指数"],
          yAxis:[30]
        },
        SwmdzsLeftData: {},
        SwmdzsRightData: {},
        pieGDPZbData1: {
          tooltip:"GDP",
          dataArr: [
            { value: 3429.62, name: "优" },
            { value: 7715.04, name: "良" },
            { value: 10341.33, name: "一般" },
          ]
        },
        pieGDPZbData: {
          tooltip:"GDP",
          dataArr: [
            { value: 3429.62, name: "优" },
            { value: 7715.04, name: "良" },
            { value: 10341.33, name: "一般" },
          ]
        },
        pieRkZbData: {
          tooltip:"Rk",
          dataArr: [
            { value: 911.71, name: "优" },
            { value: 1722.25, name: "良" },
            { value: 1201.47, name: "一般" },
          ]
        },
        barSthjzleiData: {
          xAxis:["新城区","碑林区","莲湖区","灞桥区","未央区","雁塔区","阎良区","新城区","碑林区","莲湖区","灞桥区","未央区","雁塔区","阎良区","新城区","碑林区","莲湖区","灞桥区","未央区","雁塔区","阎良区"],
          yAxis:[38.26,38.17,37.83,52.44,47.2,42.17,48.29,38.26,38.17,37.83,52.44,47.2,42.17,48.29,38.26,38.17,37.83,52.44,47.2,42.17,48.29]
        },
        // checkedMap: [],
        // checkedMapDatas: ['EI评价', '经济密度', '人口密度'],
        // xuanranMap:[],
        xuanranMap:0,
        xuanranMapDatas:["地图渲染"],
        xzqForm:{
          xzq:"省市"
        },
        xzqs:["省市","区县"],
        EILegendItems:[
          {text:"优"},
          {text:"良"},
          {text:"一般"},
          {text:"较差"},
          {text:"差"},
        ],
        GdpLegendItems:[
          {text:"500"},
          {text:"1000"},
          {text:"1500"},
          {text:"2000"},
          {text:"10000"},
        ],
        RkLegendItems:[
          {text:"100"},
          {text:"200"},
          {text:"400"},
          {text:"800"},
          {text:"1600"},
        ],
        isShowEILegend:false,
        isShowGdpLegend:false,
        isShowRkLegend:false,
        isShowXuanran:false,
        isShowData:true,
        isShowXzq:false,
        // isShowXzq:true,
        arrPosition:{},
        isXzqh:true,
        isQinling:false,
        isLiuyu:false,
        colorArr: {"ei":['#ff0000','#ff6400','#C0FF3E','#66CD00','#015501'],"rktj":['#f1d160','#ecbf1e','#cd9405','#e57017','#a73e05'],"gdp":['#87CEFF','#3ca3e6','#3193db','#2683d0','#104E8B']},

  }
  },
  computed: {
    // 实体变化统计
    timeDataNode: function() {
      console.log("timeDataNode");
      var timeData={};
      timeData.dataArr = this.timeDataArray;
      return timeData;
    },
    timeIsStop : function() {
      var timeIsStop=false;
      timeIsStop = this.TimeAxisStop;
      return timeIsStop;
    },
  },
  methods: {
    lunBo(){
      this.timeAxisVisible = !this.timeAxisVisible;
      if(this.timeAxisVisible == true){
        this.TimeAxisStop = false;
        this.timeDataArray = [
          { url: [] , year: 2017 },
          { url: [] , year: 2018 },
          { url: [] , year: 2019 },
          { url: [] , year: 2020 },
        ];
      }
      else{//未选中行政区
        this.TimeAxisStop = true;
        // this.map.getLayers().clear();
        //return;
      }
    },
    //时间轴切换
    alterMapByYear(year,url){
      //console.log("year",year);
      this.queryDataCache1(year);
      this.dataForm.year = year;
      if(this.xuanranMap != 0){
        this.handleMapCheckedChange();
      }
      //console.log("year,url",year,url);
      // var layer = null;
      // layer = this.createCGCS2000WMTSLayer(url);
      // if(layer){
      //
      //   var layers = this.map.getLayers().array_;
      //   if(layers.length == 2){
      //     this.map.removeLayer(layers[0]);
      //   }
      //
      //   this.map.addLayer(layer);
      // }
    },

    //属性表关闭
    ClsoeAttr(){
      this.isShowAttribute = false;
    },
    CloseImage(){
      this.isShowAImage = false;
    },

    //属性表点击
    attrCallBack(backData){
      console.log('backData',backData)
      var pictureFileNameArr = backData["照片附件"].split(",");
      var num = backData["序号"];
      var pictureArr = new Array();
      for(var i=0;i<pictureFileNameArr.length;i++){
        pictureArr.push("http://localhost:8013/hjcczzData/wyhc/picture/"+num+"/"+pictureFileNameArr[i]);
      }
      this.AttrFeatures = {
        featureArr: pictureArr
      }
      this.isShowAImage = true;
    },
    handleHcCheckedChange(value){
      console.log('value',value)
      // if(value[0]=="核查数据"){
        if(value==true){
        this.isHcData=true;
        // 清除选择要素的样式
        if(this.OverlayVectorSource){
          this.OverlayVectorSource.clear();
        }
        var layersArray = this.map.getLayers();
        layersArray.insertAt(3,this.hcVectorLayer);
        //this.map.addLayer(this.hcVectorLayer);
        this.map.getView().setZoom(14);
        // var coordinate = [12281652.259, 3986910.821];
          var coordinate = [110.328, 33.687];
        this.map.getView().setCenter(coordinate);
      }
      else{
        this.isHcData=false;
        this.isShowAImage = false;
        this.isShowAttribute = false;
        // 清除选择要素的样式
        if(this.OverlayVectorSource){
          this.OverlayVectorSource.clear();
        }
        this.map.removeLayer(this.hcVectorLayer);
        //核查缩放
        var coordinate = [109.05,35.25];
        this.map.getView().setCenter(coordinate);
        this.map.getView().setZoom(6);
      }
    },
    handleMapCheckedChange() {
      console.log("this.xuanranMap == 1",this.xuanranMap == 1);
      this.isShowXzq = this.xuanranMap == 1 ? true : false;
      this.isShowEILegend = this.xuanranMap == 1 ? true : false;
      this.isShowGdpLegend = this.xuanranMap == 2 ? true : false;
      this.isShowRkLegend = this.xuanranMap == 3 ? true : false;
      if (this.xuanranMap == 1) {
        this.LoadSxsjEI();
      }
      else if (this.xuanranMap == 2) {
        this.LoadSxsjGdp();
      }
      else if (this.xuanranMap == 3) {
        this.LoadSxsjRk();
      }
      else {
        this.LoadSxQc();
      }
    },
    BtnGDP(){
      this.pieGDPZbData1=this.pieGDPZbData;
        this.isGDP = true;
        this.isRK = false;
        this.isShowGDP = true;
        this.isShowRK = false;
        this.isShowGDPXJ = false;
        this.isShowRKXJ = false;
    },
    BtnRK(){
       this.pieGDPZbData1=this.pieRkZbData;
        this.isGDP = false;
        this.isRK = true;
      this.isShowGDP = true;
      this.isShowRK = false;
        this.isShowGDPXJ = false;
        this.isShowRKXJ = false;
    },
    StyleColor(colorAr){
      var stylee = [];
      for (var s=0;s<5;s++){
        stylee[s] =new ol.style.Style({
          stroke: new ol.style.Stroke({color: '#4690b3', width: 1}),
          fill:new ol.style.Fill({
            color: colorAr[s]
          }),
        });
      }
      return stylee;
    },
    //  加载ei评价图
    LoadSxsjEI(){
      var year = this.dataForm.year;
      var xzq = this.xzqForm.xzq;
      if(xzq == "区县"){
        var styleNotShow = new ol.style.Style({
          fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
          stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
        });
        for(var i=0;i<this.sjFeatures.length;i++){
          this.sjFeatures[i].setStyle(styleNotShow);
        }
        for(var f=0;f<this.xjFeatures.length;f++){
          var xjPjNum = this.styleDt(year,"ei","quxian",f).pjNum;
          var style = this.styleDt(year,"ei","quxian",f).style;
          // console.log('pjNum',pjNum)
          if(xjPjNum >= 75){
            this.xjFeatures[f].setStyle(style[4]);
          }
          else if(xjPjNum >= 55){
            this.xjFeatures[f].setStyle(style[3]);
          }
          else if(xjPjNum >= 35){
            this.xjFeatures[f].setStyle(style[2]);
          }
          else {
            this.xjFeatures[f].setStyle(style[1]);
          }
        }
      }
      else{
        for(var f=0;f<this.sjFeatures.length;f++){
          var pjNum = this.styleDt(year,"ei","shengshi",f).pjNum;
          if(pjNum >= 75){
            this.sjFeatures[f].setStyle(this.styleDt(year,"ei","shengshi",f).style[4]);
          }
          else if(pjNum >= 55){
            this.sjFeatures[f].setStyle(this.styleDt(year,"ei","shengshi",f).style[3]);
          }
          else if(pjNum >= 35){
            this.sjFeatures[f].setStyle(this.styleDt(year,"ei","shengshi",f).style[2]);
          }
        }
      }
    },
    LoadSxQc(){
      var styleShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });
      for(var i=0;i<this.sjFeatures.length;i++){
        this.sjFeatures[i].setStyle(styleShow);
      }
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 2}),
      });
      for(var i=0;i<this.xjFeatures.length;i++){
        this.xjFeatures[i].setStyle(style);
      }
    },
    styleDt(year,type,xzqjb,f){
      var colorArr = this.colorArr[type];
      var style = this.StyleColor(colorArr);
      if(xzqjb=="shengshi"){
        var sjFeatureDm = this.sjFeatures[f].N["市代码"];
        var name = XZQCodeProcess.XZQCodeJoin(sjFeatureDm, type);
        console.log("省市name",name)
      }
      else if(xzqjb=="quxian"){
        var xjFeatureDm = this.xjFeatures[f].N.PAC;
        console.log('xjFeature name',this.xjFeatures[f].N.NAME);
        console.log('xjFeatureDm',xjFeatureDm);
        var name = XZQCodeProcess.XZQCodeJoin(xjFeatureDm, type);
        console.log('name',name);
      }
      var element = type+year;
      console.log('this.hjjczzMapData[name]',this.hjjczzMapData[name])
      var index = this.hjjczzMapData[name]["xAxis"].indexOf(element);

      if(type=="ei"){
        var pjNum = this.hjjczzMapData[name]["yAxis"][index];
        console.log('pjNum',pjNum)
      }
      else{
        var nameArea = name.substr(0, name.length - type.length) + "area";
        var areaNum = "area"+year;
        var indexArea = this.hjjczzMapData[nameArea]["xAxis"].indexOf(areaNum);
        var num = this.hjjczzMapData[name]["yAxis"][index];
        var areaNum = this.hjjczzMapData[nameArea]["yAxis"][indexArea];
        var pjNum = num*10000/areaNum;
      }
      return {
        'pjNum': pjNum,
        'style': style
      };
    },
    created() {
      this.queryDataCache1("2017");
      this.queryMapDataCache()
    },
    // 初始化地图
    initMap() {
      // this.gProjection = ol.proj.get('EPSG:3857');
      this.gProjection = ol.proj.get('EPSG:4326');
      this.map = new ol.Map({
            target: 'map',
            view: new ol.View({
            	projection: this.gProjection,
                center: [108.878,35.424],
              // center: [12129470.527,4255685.289],
                zoom: 6.2
            })
        });
      //地图缩放
      this.map.on('moveend', this.onMapZoomHandler);
      //地图单机
      this.map.on('singleclick', this.onMapSingleSelHandler);
    },
    //采用不同方式，获取不同区域数据
    async queryDataCache(){
      console.log('this.radioArea',this.radioArea);
      console.log('this.xzqForm',this.xzqForm);
      console.log('this.dataForm.year',this.dataForm.year);
      if(this.radioArea == 1){
        console.log('here')
        await this.queryDataCache1(this.dataForm.year);
      }
      else{
        await this.queryDataCache2(this.selecttype,"",this.dataForm.year);
      }
    },
    //获取陕西行政区域json数据
    async queryDataCache1(yearParam){
      var params = {
        year: yearParam,
      }
      await api.getHjjczzDataCache(params).then(res=>{
        var resultData = res.data;
        //
        console.log('yearParam',yearParam);
        console.log("queryDataCache1 data" ,res.data);
        if(resultData){
          if(resultData.status == "success"){
            //console.log("转换成功");
            this.hjjczzData = resultData.data;
            //console.log("hjjczzData0 = " + JSON.stringify(this.hjjczzData));
            //默认未选中行政区状态下图标赋值
            this.barSthjzsData = this.hjjczzData["shanxisthjzs"];
            this.barTdlyxzData = this.hjjczzData["shanxitdly"];
            console.log('this.barTdlyxzData',this.barTdlyxzData);
            this.barTdfgxpData = this.hjjczzData["shanxitdxpzs"];
            //console.log("this.hjjczzData[\"shanxihjxzzs\"]",this.hjjczzData["shanxihjxzzs"])
            this.barHjxzzsData = this.hjjczzData["shanxihjxzzs"];
            this.barSwfdzsData = this.hjjczzData["shanxiswfdzs"];
            this.barZbfgzsData = this.hjjczzData["shanxizbfgzs"];
            this.SwmdzsLeftData = this.hjjczzData["shanxiswmdzsleft"];
            this.SwmdzsRightData = this.hjjczzData["shanxiswmdzsright"];
            this.lineEIZSData = this.hjjczzData["shanxiei"];
            console.log('this.lineEIZSData',this.lineEIZSData);
            this.pieHjfhzsData = this.hjjczzData["shanxiwrfhzs"];
            this.barSthjzleiData = this.hjjczzData["shanxisthjzlei"];
            //console.log('this.hjjczzData["shanxigdp"]',this.hjjczzData["shanxigdp"]);
            //console.log('this.hjjczzData["shanxirktj"]',this.hjjczzData["shanxirktj"]);
            // weathersGDP:[
            //   {
            //     name:'GDP',
            //     value:'61.51',
            //     unite:''
            //   },
            //   {
            //     name:'GDP全省占比',
            //     value:'10%',
            //     unite:''
            //   },
            // ],
            this.weathersGDP = this.hjjczzData["shanxigdp"];
            this.weathersRKTJ = this.hjjczzData["shanxirktj"];
            if(this.isGDP == true){
              this.isShowGDP = true;
              this.isShowRK = false;
              this.isShowGDPXJ = false;
              this.isShowRKXJ = false;
            }
            else if(this.isRK == true){
              this.isShowGDP = false;
              this.isShowRK = true;
              this.isShowGDPXJ = false;
              this.isShowRKXJ = false;
            }

          }
        }
      });
    },
    //获取秦岭/流域区域后台数据
    async queryDataCache2(area,xzqdm,year){
      //备注：参数要添加area
      var params = {
        xzqdm:xzqdm,
        year:year,
        type:area
      }
      //测试
      await api.getStzkpjDataCache(params).then(res=>{
        var resultData = res.data;
        console.log("zjw",resultData)
        if(resultData) {
          if (resultData.status == "success") {
            this.barTdlyxzData = resultData.data.grid1;
            this.lineEIZSData = resultData.data.grid2;
            this.barSthjzleiData = resultData.data.grid4;
            this.barSthjzsData = resultData.data.grid5;
            this.barTdfgxpData = resultData.data.grid8;
            this.barHjxzzsData =  resultData.data.grid10;
            this.barSwfdzsData = resultData.data.grid6;
            this.barZbfgzsData = resultData.data.grid7;
            this.SwmdzsLeftData = resultData.data.grid11_left;
            this.SwmdzsRightData = resultData.data.grid11_right;
            this.pieHjfhzsData = resultData.data.grid9;
          }
        }
      });
    },
    //获取地图渲染json数据
    async queryMapDataCache(){
      await api.getHjjczzMapDataCache({}).then(res=>{
        var resultData = res.data;
        //LEE
        console.log("map res.data" ,res.data);
        if(resultData){
          if(resultData.status == "success"){
            this.hjjczzMapData = resultData.data;
          }
        }
      });
    },
    //地图缩放事件
    onMapZoomHandler(e){
      var that = this;
      var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
      console.log("zoom="+zoom);
      var styleShow = new ol.style.Style({
          fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
          stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });
      var styleNotShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });
      if(zoom > 9){
        //console.log("当前地图的缩放级别=县级");
        this.isShiJi=false;
        this.isXianJi=true;
        if (this.xuanranMap == 0){
          if(this.xjFeatures){
            for(var i=0;i<this.xjFeatures.length;i++){
              this.xjFeatures[i].setStyle(styleShow);
            }
          }
          if(this.sjFeatures){
            for(var i=0;i<this.sjFeatures.length;i++){
              this.sjFeatures[i].setStyle(styleNotShow);
            }
          }
        }
      }
      else if(zoom <= 9){
        //console.log("当前地图的缩放级别=市级");
        this.isShiJi=true;
        this.isXianJi=false;
        /*this.isShiJi=false;
        this.isXianJi=true;*/
        if (this.xuanranMap == 0){
          if(this.xjFeatures){
            for(var i=0;i<this.xjFeatures.length;i++){
              this.xjFeatures[i].setStyle(styleNotShow);
              // this.xjFeatures[i].setStyle(styleShow);
            }
          }
          if(this.sjFeatures){
            for(var i=0;i<this.sjFeatures.length;i++){
              this.sjFeatures[i].setStyle(styleShow);
            }
          }
        }
      }
    },
    //地图点击事件
    async onMapSingleSelHandler(e){
      var LngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
      //console.log("地图选中坐标："+e.coordinate);
console.log('鼠标点击位置e',e)
      if(this.isHcData){
        //console.log("isHcData",this.isHcData);
        await this.selectHcData(e);
      }
      else{
        await this.refreshBigScreenCharts(this.radioArea,e.coordinate);
      }
    },
    //map数据更新
    async onMapHandler(){
      var exResultData = {};
      for(var key in stzkpjTable.stzkmapTableArr) {
        console.log("mapkey",key);
          var lineEIZSData = {};
          for (var codeKey in CodeData.XianJiCodeEN) {
            var params = {
              xzqdm: codeKey,
              type: key,
            }
            await api.getStzkpjData(params).then(res => {
              var resultData = res.data;
              console.log('mapresultData',resultData)
              if (resultData) {
                if (resultData.status == "success") {
                  var stzkpjDataArr = resultData.data.oridata;
                  var xAxis = new Array();
                  var yAxis = new Array();
                  for (var q = 0; q < stzkpjDataArr.length; q++) {
                    var xAxisName = key + stzkpjDataArr[q].year;
                    xAxis.push(xAxisName);
                    if(stzkpjDataArr[q].ei){
                      var yAxisValue = parseFloat(stzkpjDataArr[q].ei);
                    }
                    else if(stzkpjDataArr[q].rk){
                      var yAxisValue = parseFloat(stzkpjDataArr[q].rk);
                    }
                    else if(stzkpjDataArr[q].gdp){
                      var yAxisValue = parseFloat(stzkpjDataArr[q].gdp);
                    }
                    else if(stzkpjDataArr[q].area){
                      var yAxisValue = parseFloat(stzkpjDataArr[q].area);
                    }
                    yAxis.push(yAxisValue);
                    var name = XZQCodeProcess.XZQCodeJoin(codeKey, key);
                    lineEIZSData[name] = {
                      "xAxis": xAxis,
                      "yAxis": yAxis,
                    }
                  }
                }
              }
            });
          }
          for (var key in lineEIZSData) {
            exResultData[key] = lineEIZSData[key];
          }
      }
      //结果数据写入
      console.log("exResultData",exResultData);
      var Params = {
        exResultData:JSON.stringify(exResultData),
      }
      await api.resultMapDataUpdate(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            console.log("转换成功");
            alert("渲染数据更新成功，请刷新页面");
          }
        }
      });//
    },
    //选择核查要素
    async selectHcData(e){
      this.arrPosition['tableLeft'] = (e.b.clientX - 720) +'px';
      this.arrPosition['tableTop'] = (e.b.clientY - 100) +'px';
      console.log("this.arrPosition",this.arrPosition);
      console.log("e.b",e.b);
      var that = this;
      // 清除选择要素的样式
      if(that.OverlayVectorSource){
        that.OverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      if(this.hcVectorSource && this.isHcData){
        var features = that.hcVectorSource.getFeaturesAtCoordinate(e.coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
        }
      }
      // 设置选中样式
      if(selFeature){
        var style = new ol.style.Style({
          fill: new ol.style.Fill({color: "rgba(36, 91, 121, 0.0)"}),
          stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
        })
        selFeature.setStyle(style);
        that.OverlayVectorSource.addFeature(selFeature);
      }
      if(selFeature){
        //console.log("selFeature",selFeature.N);
        //excel
        var path1 = "\\webapps\\hjcczzData\\wyhc\\调绘成果.xls";
        var path2 = "\\webapps\\hjcczzData\\wyhc\\调绘照片成果.xls";
        var params = {
          path: path1+","+path2,
        }
        await api.getExcelDataCache(params).then(res=>{
          var resultData = res.data;
          if(resultData){
            if(resultData.status == "success"){
              //console.log("resultData",resultData);
              //Excel成果处理
              var ExcelResult = this.excelResultProgress(resultData.data,selFeature);
            }
          }
        });
      }

    },
    //Excel成果处理
    excelResultProgress(excelData,selFeature){
      var hcData = excelData.调绘成果;
      var hcDataPicture = excelData.调绘照片成果;
      var ObjectID = selFeature.N.OBJECTID;
      var hcDataMatch = "";
      var hcDataMatchArr = new Array();
      var searchData = {};
      var searchArr = new Array();
      //selfeature 匹配对应的excle成果
      for(var key in hcData){
        for(var i=0;i<hcData[key].length;i++){
          var nyNum = hcData[key][i]["内业编号"];
          if(ObjectID == nyNum){
            hcDataMatch =hcData[key][i];
            searchData = {"核查类型":key};
            hcDataMatch["核查类型"] =searchData["核查类型"];
            var pictureKey = searchData["核查类型"]+"照片";
            // console.log('pictureKey',pictureKey)
            var hcDataAndPictureMatch = "";
                for(var i=0;i<hcDataPicture[pictureKey].length;i++){
                  if(hcDataPicture[pictureKey][i]["核查编号"] == hcDataMatch["序号"]){
                    hcDataAndPictureMatch =  hcDataAndPictureMatch + hcDataPicture[pictureKey][i]["附件名称"]+",";
                  }
                }
            hcDataAndPictureMatch = hcDataAndPictureMatch.substring(0, hcDataAndPictureMatch.lastIndexOf(','));
            hcDataMatch["照片附件"] = hcDataAndPictureMatch;

            //属性表添加数据
            hcDataMatchArr.push(hcDataMatch);
            searchArr.push(searchData);
            this.hcDatas={
                featureArr: {attr:hcDataMatchArr},
                searchArr: {attr:searchArr},
                totalCount: hcDataMatchArr.length,
            }
            console.log("this.hcDatas",this.hcDatas);
            this.isShowAttribute = true;
          }
        }
      }
      if(hcDataMatch == ""){
        alert("没有相关数据");
      }
    },
    //点击后查询结果并刷新视图
    refreshBigScreenCharts(area,coordinate){
      console.log('area',area);
      var that = this;
      // 清除选择要素的样式
      if(that.OverlayVectorSource){
          that.OverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      console.log('this.xjVectorSource',this.xjVectorSource);
      console.log('this.sjVectorSource',this.sjVectorSource);
      console.log('this.isXianJi',this.isXianJi);
      console.log('this.isShiJi',this.isShiJi);
      if(this.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          this.message1=document.getElementById("textSTZKPJ").innerHTML=selFeature.N.NAME;

        }
      }
      else if(this.xjVectorSource && this.isXianJi){
        var features = this.xjVectorSource.getFeaturesAtCoordinate(coordinate);
        console.log('xj features',features);
        if(features && features.length>0){
          selFeature = features[0].clone();
          this.message1=document.getElementById("textSTZKPJ").innerHTML=selFeature.N.NAME;

        }
      }
      // 设置选中样式
      if(selFeature){
        var style = new ol.style.Style({
            fill: new ol.style.Fill({color: "rgba(36, 91, 121, 0.0)"}),
            stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
          })
        selFeature.setStyle(style);
        that.OverlayVectorSource.addFeature(selFeature);
      }
      var DSJSXZDM = "";
      if(selFeature && this.isShiJi){
        //DSJSXZDM = selFeature.N.BZ;
        DSJSXZDM = selFeature.N["市代码"];
        console.log('sj selFeature',selFeature);
        console.log('sj DSJSXZDM',DSJSXZDM);
        if(area!=1)
        {
          DSJSXZDM="";
          selecttype=selFeature.N["NAME"];
        }
      }
      else if(selFeature && this.isXianJi){
        //console.log("selFeature",selFeature)
        DSJSXZDM = selFeature.N.PAC;
        console.log('selFeature',selFeature);
        console.log('DSJSXZDM',DSJSXZDM);
        if(area==2)
        {
          DSJSXZDM = selFeature.N.PAC;
          selecttype=selFeature.N["NAME_1"];
        }else if(area==3)
        {
          DSJSXZDM = selFeature.N.PAC_1;
          selecttype=selFeature.N["NAME"];
        }
      }
      else{
        if(area==1)
        {
          DSJSXZDM ="610000";
        }else if(area==2)
        {
          DSJSXZDM="";
          selecttype="秦岭";
        }else if(area==3)
        {
          DSJSXZDM="";
          selecttype="全流域";//？？？
        }
      }
      if(DSJSXZDM=="610000"){
        this.message1=document.getElementById("textSTZKPJ").innerHTML="陕西省";
      }
      //console.log("DSJSXZDM="+DSJSXZDM);

      //2.根据不同区域，采用不同方法，变更不同数据
      //2.1陕西行政区域数据
      if(area ==1){
        if(DSJSXZDM!="610000"){
          //依据代码变更数据
          //console.log("stzkpjTable.stzkpjTableArr="+stzkpjTable.stzkpjTableArr);
          for(var key in stzkpjTable.stzkpjTableArr){
            var fieldname = key;
            var name = XZQCodeProcess.XZQCodeJoin(DSJSXZDM,fieldname);
            //console.log(name,fieldname);
            if(fieldname == 'sthjzs'){
              this.barSthjzsData = this.hjjczzData[name];
            }
            if(fieldname == 'tdly'){
              this.barTdlyxzData = this.hjjczzData[name];
            }
            if(fieldname == 'tdxpzs'){
              this.barTdfgxpData = this.hjjczzData[name];
            }
            if(fieldname == 'hjxzzs'){
              this.barHjxzzsData = this.hjjczzData[name];
            }
            if(fieldname == 'swfdzs'){
              this.barSwfdzsData = this.hjjczzData[name];
            }
            if(fieldname == 'zbfgzs'){
              this.barZbfgzsData = this.hjjczzData[name];
            }
            if(fieldname == 'swmdzsleft'){
              this.SwmdzsLeftData = this.hjjczzData[name];
            }
            if(fieldname == 'swmdzsright'){
              this.SwmdzsRightData = this.hjjczzData[name];
            }
            if(fieldname == 'sthjzlei'){
              if(this.isXianJi == false){
                this.barSthjzleiData = this.hjjczzData[name];
              }
              else{
                this.barSthjzleiData = this.hjjczzData["shanxisthjzlei"];
              }
            }
            if(fieldname == 'ei'){
              this.lineEIZSData = this.hjjczzData[name];
            }
            if(fieldname == 'wrfhzs'){
              this.pieHjfhzsData = this.hjjczzData[name];
            }
            if(fieldname == 'gdp'){
              //console.log("gdp",name);
              //console.log("this.hjjczzData[name]",this.hjjczzData[name]);
              this.weathersGDP = this.hjjczzData[name];
              if(this.isGDP == true){
                this.isShowGDP = false;
                this.isShowRK = false;
                this.isShowGDPXJ = true;
                this.isShowRKXJ = false;
              }
              else if(this.isRK == true){
                this.isShowGDP = false;
                this.isShowRK = false;
                this.isShowGDPXJ = false;
                this.isShowRKXJ = true;
              }
            }
            if(fieldname == 'rktj'){
              //console.log(name);
              this.weathersRKTJ = this.hjjczzData[name];
              if(this.isGDP == true){
                this.isShowGDP = false;
                this.isShowRK = false;
                this.isShowGDPXJ = true;
                this.isShowRKXJ = false;
              }
              else if(this.isRK == true){
                this.isShowGDP = false;
                this.isShowRK = false;
                this.isShowGDPXJ = false;
                this.isShowRKXJ = true;
              }
            }
          }
        }
        else{
          //未选中行政区
          //console.log("未选中行政区")
          this.barSthjzsData = this.hjjczzData["shanxisthjzs"];
          console.log("未选中行政区barTdlyxzData",this.hjjczzData["shanxitdly"]);
          this.barTdlyxzData = this.hjjczzData["shanxitdly"];
          this.barTdfgxpData = this.hjjczzData["shanxitdxpzs"];
          this.barHjxzzsData = this.hjjczzData["shanxihjxzzs"];
          this.barSwfdzsData = this.hjjczzData["shanxiswfdzs"];
          this.barZbfgzsData = this.hjjczzData["shanxizbfgzs"];
          this.SwmdzsLeftData = this.hjjczzData["shanxiswmdzsleft"];
          this.SwmdzsRightData = this.hjjczzData["shanxiswmdzsright"];
          this.lineEIZSData = this.hjjczzData["shanxiei"];
          this.barSthjzleiData = this.hjjczzData["shanxisthjzlei"];
          this.pieHjfhzsData = this.hjjczzData["shanxiwrfhzs"];
          this.weathersGDP = this.hjjczzData["shanxigdp"];
          this.weathersRKTJ = this.hjjczzData["shanxirktj"];
          if(this.isGDP == true){
            this.isShowGDP = true;
            this.isShowRK = false;
            this.isShowGDPXJ = false;
            this.isShowRKXJ = false;
          }
          else if(this.isRK == true){
            this.isShowGDP = true;
            this.isShowRK = false;
            this.isShowGDPXJ = false;
            this.isShowRKXJ = false;
          }
        }
      }
      //2.2秦岭（area==2, this.radioArea==2）、流域区域(area==3, this.radioArea==3)区域
      else{
        this.queryDataCache2(selecttype,DSJSXZDM,this.dataForm.year);
        console.log("zjw","type:"+selecttype+"xzqdm:"+DSJSXZDM+" year:"+this.dataForm.year)
      }

    },
    //加载午夜蓝图
    LoadGaoDeMap(){
      //午夜蓝图
      this.wuyelantu = new ol.layer.Tile({
          source: new ol.source.XYZ({
              url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}' //大地坐标
          })
      });
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
        this.tdtImageAnno = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
            })
        });
      }
    },
    //加载野外核查边界geojson
    LoadYwhcbj(){
      let json = require('../../assets/js/geojson/touyingpro.json')
      this.hcFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:4326'
      });
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });
      for(var i=0;i<this.hcFeatures.length;i++){
        this.hcFeatures[i].setStyle(style);
      }
      this.hcVectorSource= new ol.source.Vector({
        features:this.hcFeatures
      });
      this.hcVectorLayer = new ol.layer.Vector({
        source: this.hcVectorSource,
      });
      // this.map.addLayer(this.hcVectorLayer);
    },

    //加载县级流域geojson
    LoadSxxj(xjjson){
      // let json = require('../../assets/js/geojson/sxliuyufenxian.json')
      let json = require('../../assets/js/geojson/' +xjjson);
      this.xjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
        /*dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:3857'*/
      });
/*      console.log('json',json);
      console.log('this.xjFeatures',this.xjFeatures);*/
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)'}),
      });
      for(var i=0;i<this.xjFeatures.length;i++){
        this.xjFeatures[i].setStyle(style);
      }
      this.xjVectorSource= new ol.source.Vector({
        features:this.xjFeatures
      });
      this.xjVectorLayer = new ol.layer.Vector({
        source: this.xjVectorSource,
      });
      this.map.addLayer(this.xjVectorLayer);
    },
    //加载地市级边界json
    LoadSxdsj(jsonn){
      // let json = require('../../assets/js/geojson/sxdsjbjpro1.json');
      let json = require('../../assets/js/geojson/' +jsonn);
      this.sjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
        /*dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:3857'*/
      });
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });
      for(var i=0;i<this.sjFeatures.length;i++){
        this.sjFeatures[i].setStyle(style);
      };
      this.sjVectorSource= new ol.source.Vector({
        features:this.sjFeatures
      });
      this.sjVectorLayer = new ol.layer.Vector({
        source: this.sjVectorSource,
      });
      this.map.addLayer(this.sjVectorLayer);
    },
    //加载选中图层
    LoadOverlayVectorLayer(){
      this.OverlayVectorSource = new ol.source.Vector();
      this.OverlayVectorLayer = new ol.layer.Vector({
        source: this.OverlayVectorSource,
      });
      this.map.addLayer(this.OverlayVectorLayer);
    },
    //矢量影像切换
    SelectDiTu(){
      if(this.radioDiTu == 1){
        var layersArray = this.map.getLayers();
        layersArray.insertAt(1,this.wuyelantu);
        this.map.removeLayer(this.tdtImage);
        this.map.removeLayer(this.tdtImageAnno);
      }
      else{
        var layersArray = this.map.getLayers();
        //图层定位插入
        layersArray.insertAt(1,this.tdtImage);
        layersArray.insertAt(2,this.tdtImageAnno);
        this.map.removeLayer(this.wuyelantu);
      }
    },
    //切换显示不同区域
    SelectArea(){
      this.dataForm.year = 2017;
      this.isXzqh = this.radioArea == 1 ? true : false;
      this.isQinling = this.radioArea == 2 ? true : false;
      this.isLiuyu = this.radioArea == 3 ? true : false;
      // var that = this;
      // 清除选择要素的图层
      if(this.OverlayVectorLayer){
        console.log('OverlayVectorLayer')
        // that.OverlayVectorLayer.clear();
        this.map.removeLayer(this.OverlayVectorLayer);
      }
      var dsjjson = "";
      var xjjson = "";
      if(this.radioArea == 1){
        this.queryDataCache1("2017");
        dsjjson = "sxsj.json";
        xjjson = "sxxj.json";
      }
      else{

        if(this.radioArea == 2){
          this.queryDataCache2("秦岭","",this.dataForm.year);
          dsjjson = "sxqinling.json";
          xjjson = "sxqinlingfenxian.json";
          console.log('qinling');
        }
        else if(this.radioArea == 3){
          this.queryDataCache2("全流域","",this.dataForm.year);
          dsjjson = "sxliuyu.json";
          xjjson = "sxliuyufenxian.json";
        }
      }
      console.log('dsjjson',dsjjson);
      console.log('xjjson',xjjson);
      this.map.removeLayer(this.sjVectorLayer);
      this.map.removeLayer(this.xjVectorLayer);

      //重新加载json
      this.LoadSxdsj(dsjjson);
      this.LoadSxxj(xjjson);
      this.LoadOverlayVectorLayer();
      if(this.isShowXuanran == true){
        this.handleMapCheckedChange();
      }
    },
    SelectMap(value1){
      console.log('value1',value1)
      if(value1 == false){
        console.log('value1 false',value1)
        this.isShowXuanran = false;
        this.isShowData = true;
        // this.checkedMap = [];
        this.xuanranMap = 0;
        // this.handleMapCheckedChange([]);
      }
      else{
        this.isShowXuanran = true;
        this.isShowData = false;
        this.hcChecked = [];
        this.xuanranMap = 1;
        // this.handleHcCheckedChange([]);
      }
      this.handleMapCheckedChange();
    },
    SelectXzq(value){
      // if(this.checkedMap[0] == "EI评价"){
        this.LoadSxsjEI()
      // }
    },
    SelectYear(value){
      if(this.isShowXuanran == true){
        this.handleMapCheckedChange();
      }
      this.queryDataCache();
      // this.queryDataCache1(value);
    },
    //测试
    test(){
      //console.log("1");
      //console.log("shanxisthjzs",shanxisthjzs);

      //测试excel
      var basePath = "\\webapps\\hjcczzData\\wyhc\\";
      var filename = "wyhcExcel.xls";
      var params = {
        path:basePath+filename,
      }
      api.getExcelDataCache(params).then(res=>{
        var resultData = res.data;
        //console.log("resultData:",resultData);
        if(resultData){
          if(resultData.status == "success"){
            var excelData = resultData.data.excelData;
            //console.log("excelData:");
            for(var key in excelData){
              //console.log(key,":",excelData[key]);
            }
          }
        }
      });
    },
    //数据更新
    dataUpdate(){
      if(this.isShowData == true){
        this.dataUpdateNew();
      }
      else if(this.isShowData == false){
        this.onMapHandler();
      }
    },
    async dataUpdateNew(){

      var exResultData = {};
      var ShiXianXZQ = {610000:"陕西省",610100:"西安市",610200:"铜川市",610300:"宝鸡市",610400:"咸阳市",610500:"渭南市",610600:"延安市",610700:"汉中市",610800:"榆林市",610900:"安康市",611000:"商洛市"}
      //Echarts结果更新
      var yearArr = ["2016","2017","2018","2019","2020"];
      for(var y=0;y<yearArr.length;y++){
        for(var key in stzkpjTable.stzkpjTableArr){
          if(key == 'sthjzlei'){
            var stzkpjeiData = new Array();
            for(var keyXZQ in ShiXianXZQ){
              if(keyXZQ == '610000'){
                //console.log("省级");
                var params = {
                  xzqdm:61,
                  type:key,
                  year:yearArr[y],
                }
                await api.getStzkpjData(params).then(res=>{
                  var resultData = res.data;
                  if(resultData){
                    if(resultData.status == "success"){
                      var stzkpjDataArr = resultData.data.oridata;
                      var sjds = new Array();
                      for(var n=0;n<stzkpjDataArr.length;n++){
                        if(stzkpjDataArr[n]["xzqdm"]!="610000" && stzkpjDataArr[n]["xzqdm"].substring(stzkpjDataArr[n]["xzqdm"].length-2) == "00"){
                          sjds.push(stzkpjDataArr[n])
                        }
                      }
                      var xzqeiData = {};
                      var xzqField= XZQCodeProcess.XZQCodeJoin("610000", key);;
                      var xAxis = new Array();
                      var sthjzlei = new Array();
                      for(var m=0;m<sjds.length;m++){
                        var xzqdmStr = (sjds[m].xzqdm).toString();
                        var xzqmcStr = (sjds[m].xzqmc).toString();
                        var sthjzkzseiStr = (sjds[m].sthjzkzsei).toString();
                        xAxis.push(xzqmcStr);
                        sthjzlei.push(parseFloat(sthjzkzseiStr));
                      }
                      xzqeiData[xzqField] = {
                        "xAxis":xAxis,
                        "yAxis":sthjzlei
                      }
                      stzkpjeiData.push(xzqeiData);
                    }
                  }
                });
              }
              else{
                //console.log("地市级",keyXZQ.substring(0,4));
                //测试获取西安数据
                var params = {
                  xzqdm:keyXZQ.substring(0,4),
                  type:key,
                  year:yearArr[y],
                }
                await api.getStzkpjData(params).then(res=>{
                  var resultData = res.data;
                  if(resultData){
                    if(resultData.status == "success"){
                      var stzkpjDataArr = resultData.data.oridata;
                      var xzqeiData = {};
                      var xzqField;
                      var xAxis = new Array();
                      var sthjzlei = new Array();
                      for(var m=0;m<stzkpjDataArr.length;m++){
                        var xzqdmStr = (stzkpjDataArr[m].xzqdm).toString();
                        var xzqmcStr = (stzkpjDataArr[m].xzqmc).toString();
                        var sthjzkzseiStr = (stzkpjDataArr[m].sthjzkzsei).toString();
                        if(xzqdmStr.substring(xzqdmStr.length-2) == '00'){
                          xzqField= XZQCodeProcess.XZQCodeJoin(xzqdmStr, key);
                        }
                        else{
                          xAxis.push(xzqmcStr);
                          sthjzlei.push(parseFloat(sthjzkzseiStr));
                        }

                      }
                      xzqeiData[xzqField] = {
                        "xAxis":xAxis,
                        "yAxis":sthjzlei
                      }
                      stzkpjeiData.push(xzqeiData);
                    }
                  }
                });
              }
            }
            for(var p =0;p<stzkpjeiData.length;p++){
              for(var key in stzkpjeiData[p]) {
                exResultData[key] = stzkpjeiData[p][key];
              }
            }
          }
          else if(key == 'ei'){
            var lineEIZSData={};
            for(var codeKey in CodeData.XianJiCodeEN){
              var params = {
                xzqdm:codeKey,
                type:key,
              }
              await api.getStzkpjData(params).then(res=>{
                var resultData = res.data;
                if(resultData){
                  if(resultData.status == "success"){
                    var stzkpjDataArr = resultData.data.oridata;
                    //console.log("ei");
                    //console.log("stzkpjDataArr",stzkpjDataArr);
                    var xAxis = new Array();
                    var yAxis = new Array();
                    for(var q = 0;q<stzkpjDataArr.length;q++){
                      var xAxisName = key + stzkpjDataArr[q].year;
                      xAxis.push(xAxisName);
                      var yAxisValue = parseFloat(stzkpjDataArr[q].ei);
                      yAxis.push(yAxisValue);
                      var name = XZQCodeProcess.XZQCodeJoin(codeKey, key);
                      lineEIZSData[name]={
                        "xAxis":xAxis,
                        "yAxis":yAxis,
                        "color":[240,155,96]
                      }
                    }
                  }
                }
              });
            }
            for(var key in lineEIZSData) {
              exResultData[key] = lineEIZSData[key];
            }
          }
          else{
            var params = {
              xzqdm:"61",
              type:key,
              year:yearArr[y],
            }
            //console.log("params",params);
            await api.getStzkpjData(params).then(res=>{
              var resultData = res.data;
              //console.log("resultData",resultData);
              if(resultData){
                if(resultData.status == "success"){
                  var stzkpjDataArr = resultData.data.oridata;
                  exResultData = this.dataUpdateProcess(stzkpjDataArr,exResultData,key);
                }
              }
            });
          }
        }
        //结果数据写入
        //console.log("exResultData",exResultData);
        var Params = {
          exResultData:JSON.stringify(exResultData),
          year:yearArr[y],
        }
        await api.resultDataUpdate(Params).then(res=>{
          var resultData = res.data;
          if(resultData){
            if(resultData.status == "success"){
              console.log("数据更新成功"+yearArr[y]);
              //alert("数据更新成功，请刷新页面");
            }
          }
        });

      }

      alert("更新成功！");


    },
    //数据更新数据处理函数
    dataUpdateProcess(resultDataArr,exResultData,type){
        for(var i=0;i<resultDataArr.length;i++) {
          var resultData = resultDataArr[i];
          var name = XZQCodeProcess.XZQCodeJoin(resultData.xzqdm, type);
          var data = {};
          //为图表数据替换中文字段名
          for (var key1 in stzkpjTable.stzkpjTableArr[type]) {
            if (type == "swmdzsleft") {
              data[stzkpjTable.stzkpjTableArr[type][key1]] = -resultDataArr[i][key1];
            } else {
              data[stzkpjTable.stzkpjTableArr[type][key1]] = resultDataArr[i][key1];
            }
          }
          //console.log("name,data,type",name,data,type);
          var echartExData = this.echartsDataProcess(name, data, type);
          exResultData[name] = echartExData;
        }
      return exResultData;
    },
    //数据更新Echarts数据转换
    echartsDataProcess(name,data,type){
      if(type=="sthjzs" || type=="tdxpzs"|| type =="hjxzzs"||type=="swfdzs" || type=="swmdzsleft" || type=="swmdzsright" || type=="zbfgzs" ||type=="tdly"){
        return ecahrtsExChange.normalBarExchange(name,data);
      }
      else if(type=="wrfhzs"){
        return ecahrtsExChange.normalPieExchange(name,data);
      }
      else if(type=="gdp"){
        data["GDP"] = data["GDP"].toString();
        //console.log("gdpdata",data)
        //console.log("ecahrtsExChange.weatherExchange(name,data)",ecahrtsExChange.weatherExchange(name,data));
        return ecahrtsExChange.weatherExchange(name,data);
      }
      else if(type=="rktj"){
        data["人口"] = data["人口"].toString();
        //console.log("rkdata",data)
        //console.log("ecahrtsExChange.weatherExchange(name,data)",ecahrtsExChange.weatherExchange(name,data));
        return ecahrtsExChange.weatherExchange(name,data);
      }
    },
    LoadSxsjRk(){
      var year= this.dataForm.year;
      var pjNumArr = new Array();
      for(var f=0;f<this.sjFeatures.length;f++){
        var pjNum= this.styleDt(year,"rktj","shengshi",f).pjNum;
        var style= this.styleDt(year,"rktj","shengshi",f).style;

        pjNumArr[f] = pjNum;
          if(pjNum >=800){
            this.sjFeatures[f].setStyle(style[4]);
          }
          else if(pjNum >=400){
            this.sjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum >=200){
            this.sjFeatures[f].setStyle(style[2]);
          }
          else if(pjNum >=100){
            this.sjFeatures[f].setStyle(style[1]);
          }
          else {
            this.sjFeatures[f].setStyle(style[0]);
          }
      }
      console.log('pjNumArr',pjNumArr)
    },

    LoadSxsjGdp(){
      var year= this.dataForm.year;
      for(var f=0;f<this.sjFeatures.length;f++){
        var pjNum= this.styleDt(year,"gdp","shengshi",f).pjNum;
        var style= this.styleDt(year,"gdp","shengshi",f).style;
          console.log('pjNum',pjNum);
          if(pjNum >=5000){
            this.sjFeatures[f].setStyle(style[4]);
          }
          else if(pjNum >=2000){
            this.sjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum >=1000){
            this.sjFeatures[f].setStyle(style[2]);
          }
          else if(pjNum >=500){
            this.sjFeatures[f].setStyle(style[1]);
          }
          else {
            this.sjFeatures[f].setStyle(style[0]);
          }
      }
    },
  },
  mounted() {
    // 初始化地图
    this.initMap();
    //加载午夜蓝图
    this.LoadGaoDeMap();
    //加载天地图影像
    this.LoadTianDiTuMap();
    //加载县级json
    /*this.LoadSxxjbj();
    //加载地市级json
    this.LoadSxdsjbj();*/
    //加载省地市级别json
    this.LoadSxdsj('sxsj.json');
    // this.LoadSxdsj('sxdsjbjpro1.json');
    //加载县级json
    this.LoadSxxj('sxxj.json');
    //加载外业核查
    this.LoadYwhcbj();
    //加载选中图层
    this.LoadOverlayVectorLayer();
    //加载数据
    this.created();
    console.log("mounted--created");
  },
  components: {
    Box,
    mapBox,
    barSthjzs,
    barTdlyxz,
    lineEIZS,
    barSwfdzs,
    barZbfgzs,
    barWrfhzs,
    pieHjfhzs,
    barHjxzzs,
    pieGDPZb,
    pieRkZb,
    WeaterItem,
    barTdfgxp,
    NewBoxDouble,
    BarSwmdzsLeft,
    BarSwmdzsRight,
    barStzkzs,
    hcAttributeTable,
    ImageDiv,
    TimeAxis
  }
};
</script>

<style lang="scss" scoped>


.left-bar {
  .box {
    flex: 1;
    margin-top: 0 !important;
    margin-bottom: 12px;
    &:last-child {
      margin: 0;
    }
  }
}

.right-bar{
  .box:nth-child(1){
    flex: 1!important;
  }
  .box:nth-child(2){
    flex: 2;
    height: auto!important;
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
    width: 100%;
    height: 100%;
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
          background:rgba(3,47,61,.8);
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
  .toolBarCheck{
    position: absolute;
    bottom:40px;
    left: 50px;
  }
  .toolBarCheck /deep/ .el-checkbox__label{
    font-size: 18px;
    color: #EEEEEE;
  }

  .toolBarCheck /deep/ .el-checkbox__input {
    line-height: 1.4;
    vertical-align: text-top;
  }

  .toolBarRadioDt{
    position: absolute;
    top:15px;
    left: 50px;
  }
  .toolBarRadioQinling{
    position: absolute;
    top:15px;
    left: 240px;
  }
  .toolBarRadioMap1{
    position: absolute;
    bottom:45px;
    left: 50px;
  }
  .toolBarRadioMap2{
    position: absolute;
    bottom:15px;
    left: 50px;
  }

/*  .toolBarRadioMap /deep/ .el-switch__core{
    background: #0b9e97 !important;
    border-color: #0b9e97 !important;
  }*/

/*  .toolBarRadioMap /deep/ .el-switch__label{
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
  }
  .toolBarRadioMap /deep/ .el-switch__label--right.is-active{
    z-index: 1111;
    color: #fff !important;
  }*/

  .toolBarRadioMap /deep/ .el-switch__label{
    color: #fff;
    //font-size:28px;
  }
  .toolBarRadioMap /deep/ .el-switch__label *{
    //color: #fff;
    font-size:16px;
  }
/*  .toolBarRadioMap /deep/ .el-switch__label{
    color: #fff;
    //font-size:28px;
  }*/
  .toolBarRadioMap /deep/ .el-switch__label.is-active{
    color: #0b9e97 !important;
  }
  .toolBarRadioMap /deep/ .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 40px !important;
    height: 20px;
    margin: 0;
  }
  .toolBarRadioXuanran{
    position: absolute;
    bottom:80px;
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
    font-size:16px;
  }
  .toolBarRadioDiTu /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: #0b9e97 !important;
  }
  .toolBarRadioDiTu /deep/ .el-radio__input.is-checked .el-radio__inner {
    background: #0b9e97 !important;
    border-color: #0b9e97 !important;
  }

  .toolBarDataUpdate{
    position: absolute;
    top:3px;
    right: -110px;
    z-index: 1000;
  }
  .toolBarDataUpdate .el-button:hover{
      background: #1d4b63;
      border: 1px solid #03837c;
      color: #EEE;
  }
  .toolBarDataUpdate .el-button:focus{
    background: #45b0e6;
    border: 1px solid #03837c;
    color: #EEE;
  }

  .toolBarDataUpdate .el-button{
    width: 40px;
    background: #102b38;
    border: 1px solid #2d9690;
    color: #FFF;
  }
  .toolBarDataUpdate .el-button.el-button--mini{
    padding: 5px 0px 5px 0px;
  }
  .toolBarLunBo{
    position: absolute;
    top:-1px;
    right: -50px;
    z-index: 1000;
  }
  .toolBarLunBo .el-button:hover{
    background: #1d4b63;
    border: 1px solid #03837c;
    color: #EEE;
  }
  .toolBarLunBo .el-button:focus{
    background: #45b0e6;
    border: 1px solid #03837c;
    color: #EEE;
  }

  .toolBarLunBo .el-button{
    width: 40px;
    background: #102b38;
    border: 1px solid #2d9690;
    color: #FFF;
  }
  .toolBarLunBo .el-button.el-button--mini{
    padding: 5px 0px 5px 0px;
  }

  .attribute{
    z-index:100000
  }
  .Image{
    z-index:10000000
  }
}
.el-collapse-item /deep/ .el-collapse-item__header{
  height: 38px;
  line-height: 38px;
  border: 1px solid #2d9690;
  background-color: rgba(255,255,255,0.0);
  color: #EEEEEE;
  background: url("../../../src/assets/images/banner1.png") no-repeat;
  padding: 0;
  padding-left: 20px;

}
.el-collapse-item /deep/ .el-collapse-item__wrap{
  background-color: rgba(255,255,255,0.0);
  border-bottom: 1px solid #2d9690;
}

.el-collapse-item /deep/ .el-collapse-item:last-child{
  border-bottom: 1px solid #2d9690;
}
.rightbarTopZL1 /deep/ .el-collapse{
  border-top: 1px solid #2d9690;
}

.leftBtnR{
  margin-left: 380px;
}

.leftBtnR /deep/ .el-button{
  width: 45px;
  height:26px;
  font-size: 14px;
  background: #153849;
  border: 1px solid #056d68;
  color: #EEE;
}

.leftBtnR /deep/ .el-button:hover{
  background: #1d4b63;
  border: 1px solid #03837c;
  color: #EEE;
}

.leftBtnR /deep/ .el-button:focus{
  background: #45b0e6;
  border: 1px solid #03837c;
  color: #EEE;
}
.leftBtnR /deep/ .el-button.el-button--mini{
  padding: 5px 0px 5px 0px;
}

.toolBarSelect{
  position: absolute;
  top:17px;
  right: 200px;
  z-index: 1000;
}
.toolBarXZQSelect{
  position: absolute;
  top:17px;
  right: 320px;
  z-index: 1000;
}
.toolBarYearsSelect /deep/ .el-select{
  width:100px;
}
.toolBarYearsSelect /deep/ .el-select .el-input__inner{
  color: #FFF;
  background-color: #024463;
  border:1px solid #04168d;
}
/*修改下拉框样式*/
.toolBarYearsSelect /deep/ .el-popper{
  width: 100px;
}
.toolBarYearsSelect /deep/ .el-select-dropdown__wrap.el-scrollbar__wrap{
  margin-bottom: 0px !important;
}
.toolBarYearsSelect /deep/ .el-select-group__wrap{
  clear: both;
}
.toolBarYearsSelect /deep/ .el-scrollbar__view .el-select-group__wrap:not(:last-of-type)::after {
  display: none;
}
.toolBarYearsSelect /deep/ .el-select-group__wrap .el-select-group__title {
  font-size: 15px;
  color: #80afe7;
  padding-left: 10px;
}
.toolBarYearsSelect /deep/ .el-select-group .el-select-dropdown__item {
  color: #fff;
}

.toolBarYearsSelect /deep/ .el-select-group .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background-color: #80afe7;
}

.toolBarYearsSelect /deep/ .el-select-dropdown.el-popper
{
  background-color: #024463;
  border:1px solid #04168d;
}
.toolBarYearsSelect /deep/ .el-select-dropdown__wrap {
  background-color: rgba(20, 50, 66, 0);
}
.toolBarYearsSelect /deep/ .el-select-dropdown__wrap::-webkit-scrollbar{
  height: 0px;
}
.toolBarYearsSelect /deep/ .el-select-dropdown__wrap .el-select-group .el-select-dropdown__item{
  padding-left: 10px;
}
.toolBarYearsSelect /deep/ .el-select .el-input.el-input--suffix.is-focus .el-input__inner
{
  border-color: #80afe7;
}
.toolBarYearsSelect /deep/ .el-input.el-input--suffix .el-input__inner:hover{
  border-color: #3085b3;
}
.toolBarYearsSelect /deep/ .el-input.el-input--suffix .el-input__inner:focus {
  border-color: #1883b4;
}
.toolBarYearsSelect /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background-color: #80afe7;
}

.legend
{
  width: 140px;
  height: 205px;
  position: absolute;
  border:1px solid rgba( 255 , 255,  255, 0.15);
  border-radius: 5px;
  bottom:50px;
  right: 40px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding:  5px 0;
  background-color: rgba(20, 50, 66, 0.8);
  font-size: 14px;
  span{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255 ,255 ,255, 0.65);
    position: relative;
    padding-left: 10px;
    //元素之前插入的
    &:before{
      content:'';
      display: inline-block;
      width: 20px;
      height: 10px;
      //border-radius: 50%;
      background-color: rgb(226, 33, 52);
      position: absolute;
      left: 10px;
    }
  }
}
.legend-ei{
  &:nth-child(1):before{
    background-color: rgb(8, 109, 10);
  }
  &:nth-child(2):before{
    background-color: rgb(0, 255, 0);
  }
  &:nth-child(3):before{
    background-color: rgb(255, 255, 0);
  }
  &:nth-child(4):before{
    background-color: rgb(255, 100, 0);
  }
  &:nth-child(5):before{
    background-color:rgb(255, 0, 0);
  }
}
.legend-gdp{
  //['#b6e1fa','#87CEFF','#4aa6e7','#3896ce','#49708d']
  &:nth-child(1):before{
    background-color: #b6e1fa;
  }

  &:nth-child(2):before{
    background-color: #87CEFF;
  }
  &:nth-child(3):before{
    background-color: #4aa6e7;
  }
  &:nth-child(4):before{
    background-color: #3896ce;
  }
  &:nth-child(5):before{
    background-color: #49708d;
  }
}
.legend-rk{
  &:nth-child(1):before{
    background-color: #ffd5b3;
  }
  &:nth-child(2):before{
    background-color: #ffb980;
  }
  &:nth-child(3):before{
    background-color: #ff801a;
  }
  &:nth-child(4):before{
    background-color: #b35000;
  }
  &:nth-child(5):before{
    background-color:#6b3000;
  }
}

</style>

