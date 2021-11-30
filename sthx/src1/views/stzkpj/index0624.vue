<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <Box title="土地利用现状">
        <barTdlyxz slot="content" :data="barTdlyxzData"/>
      </Box>
 <!--     <Box title="EI指数">
        <lineEIZS  slot="content" :data="lineEIZSData"/>
      </Box>-->
     <!-- <Box title="GDP/人口" >
        <div class="leftBtn" slot="subBtn">
          <el-button-group class="leftBtnR">
            <el-button size="mini" @click.native="BtnGDP">GDP</el-button>
            <el-button size="mini" @click.native="BtnRK">人口</el-button>
          </el-button-group>
        </div>
        <pieGDPZb slot="content" :data="pieGDPZbData1" v-show="isShowGDP"/>
        &lt;!&ndash;        <pieRkZb slot="content" :data="pieRkZbData" v-show="isShowRK"/>&ndash;&gt;
        <div class="weater-box" slot="content" v-show="isShowGDPXJ" style="width: 100%; position: absolute; top: 30%;"
        >
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathersGDP" :key="item.id" />
        </div>
        <div class="weater-box" slot="content" v-show="isShowRKXJ" style="width: 100%; position: absolute; top: 30%;">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathersRKTJ" :key="item.id" />
        </div>
      </Box>-->

      <Box title="土地利用现状" >
        <pietdlyxZ slot="content" :data="pietdlyxzData" />
      </Box>

      <Box title="EI指数">
        <div class="weater-box" slot="content" style="width: 100%; position: absolute; top: 30%;">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathersEIPJ" :key="item.id" />
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
              <div class='toolBarDataUpdate'>
                <el-button size="mini" round @click="dataUpdate()">更新</el-button>
                <!--
                <el-button size="mini" round @click="test()">测试</el-button>
                -->
              </div>
              <div class='toolBarLunBo'>
                <el-button size="mini" round @click="lunBo()">轮播</el-button>
              </div>

<!--              地图渲染、省市、核查数据开关-->

              <div class='toolBarRadioMap1 toolBarRadioMap'>
                <el-switch
                    v-model="isShowXuanran"
                    v-if="isShowSwitch"
                    inactive-color="gray"
                    active-text="地图渲染"
                    @change="SelectXuanran()">
                </el-switch>
              </div>
              <div class='toolBarRadioMap3 toolBarRadioMap'>
                <el-switch
                    v-model="isXzq"
                    v-if = "isShowXzq"
                    inactive-color="#0b9e97"
                    active-text="区县"
                    inactive-text="地市"
                    @change="SelectXzq">
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


<!--              地图渲染radio组件-->
              <div class='toolBarRadioXuanran toolBarRadioDiTu'>
                <el-radio-group v-model="xuanranMap" v-if="isShowXuanran" @change="handleMapCheckedChange">
                  <el-radio :label="1" >EI评价</el-radio>
               <!--   <el-radio v-if="isShowJjRkXuanran" :label="2" style="display:block;line-height:28px">经济密度</el-radio>
                  <el-radio v-if="isShowJjRkXuanran" :label="3" style="display:block;line-height:28px">人口密度</el-radio>
           -->
                </el-radio-group>
              </div>
              <div class='toolBarSelect toolBarYearsSelect'>
                <el-p id="textSTZKPJ" style="color:white;width:100px;font-size: 18px;margin-right: 10px" >{{message1}}</el-p>
                <el-select v-model="dataForm.year" placeholder="请选择" size="small" :popper-append-to-body="false" @change="SelectYear">
                  <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
                <div class='toolBarDataUpdate'>

                  <el-button size="mini" round @click="dataUpdate()">更新</el-button>
                  <!--
                  <el-button size="mini" round @click="test()">测试</el-button>
                  -->
                  <div class='toolBarLunBo'>
                    <el-button size="mini" round @click="lunBo()">轮播</el-button>
                  </div>
                </div>
              </div>
<!--              <div class='toolBarXZQSelect toolBarYearsSelect'>
                <el-select v-model="xzqForm.xzq" v-if="isShowXzq" placeholder="请选择" size="small" :popper-append-to-body="false" @change="SelectXzq">
                  <el-option
                      v-for="item in xzqs"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </div>-->

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
      <!--      <hcAttributeTable class="attribute" v-show="isShowAttribute" @closeDiv="ClsoeAttr"  :featuredata="hcDatas" :arrPosition="arrPosition" :selectFeature="selectHcDatas" @attrCall="attrCallBack"></hcAttributeTable>-->
      <!--    核查-->
      <hcAttributeTable class="attribute" v-show="isShowAttribute" @closeDiv="ClsoeAttr"  :featuredata="hcDatas" :selectFeature="selectHcDatas" @attrCall="attrCallBack"></hcAttributeTable>
      <!--     轮播时间轴-->
      <TimeAxis class="timeAxis" title="时间轴" v-show="timeAxisVisible" :timeDataNode="timeDataNode" :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
    </div>
    <div class="right-bar">
      <Box title="生态环境总指数" class="rightbarTop">
        <barSthjzs slot="content" :data="barSthjzsData"/>
      </Box>
      <Box title="生态环境分指数" class="rightbarTopZL1" >
        <el-collapse v-model="activeName" accordion slot="content">
          <el-collapse-item title="生物丰度指数" name="1">
            <div ><barSwfdzs :data="barSwfdzsData" /></div>
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
<!--          <el-collapse-item title="环境限制指数" name="5">
            <div>
              <barHjxzzs :data="barHjxzzsData"/>
            </div>
          </el-collapse-item>-->
          <el-collapse-item title="水网密度指数" name="5">
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
import pietdlyxZ from "../../components/charts/pie/stzkpj/pietdlyxZ.vue";
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
          year:"2016"
        },
        years:["2016","2017","2018","2019","2020"],

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

        activeName: '5',
        gfUnit:"水网密度指数相关",

        hcChecked:[],
        hcCheckedDatas:['核查数据'],
        isHcData:false,

        hcFeatures:null,
        hcVectorSource:null,
        hcVectorLayer:null,
        hcVectorLayer_cluster:null,
        xjFeatures:null,
        xjVectorSource:null,
        xjVectorLayer:null,
        sjFeatures:null,
        sjVectorSource: null,
        sjVectorLayer: null,
        OverlayVectorSource: null,
        moveOverlayVectorSource: null,
        OverlayVectorLayer:null,
        selecttype:"秦岭",
        selecttypeArr:["","行政区划","秦岭","全流域"],
        radioArea:1,
        radioDiTu:1,
        radioMap:1,
        // valuexuanran:false,
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
        weathersEIPJ:[
          {
            name:'EI指数',
            value:'61.51',
            unite:''
          },
          {
            name:'EI分级',
            value:'10%',
            unite:''
          },
        ],
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
        pietdlyxzData:{
        },
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
        barSthjzleiData: {},
        xuanranMap:1,
        xuanranMapDatas:["地图渲染"],
        xzqForm:{
          xzq:"地市"
        },
        isXzq:false,
        xzqs:["市级","区县"],
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
        isShowSwitch:true,
        isShowJjRkXuanran:true,
        isShowData:true,
        isShowXzq:false,
        arrPosition:{},
        isXzqh:true,
        isQinling:false,
        isLiuyu:false,
        DSJSXZDM:"610000",
        hcStyle:"",
        colorArr: {
         // "ei":['#ff0000','#ff6400','#C0FF3E','#66CD00','#015501'],
           "ei":['#ff0000','#e3b05a','#9da385','#558848','#264321'],
          "rktj":['#f1d160','#ecbf1e','#cd9405','#e57017','#a73e05'],
          "gdp":['#87CEFF','#3ca3e6','#3193db','#2683d0','#104E8B']},

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
          { url: [] , year: 2016 },
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
      this.queryDataCache();
      this.dataForm.year = year;
      if(this.isShowXuanran == true){
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
      var pictureFileNameArr = backData["野外相片编码"].split(";");
      var num = backData["编号"];
      var pictureArr = new Array();
      for(var i=0;i<pictureFileNameArr.length;i++){
        if(pictureFileNameArr[i]!=""){
          pictureArr.push("http://localhost:8013/hjcczzData/wyhc/"+this.dataForm.year+"/picture/"+num+"/"+pictureFileNameArr[i]);
        }

      }
      this.AttrFeatures = {
        featureArr: pictureArr
      }
      console.log('this.AttrFeatures',this.AttrFeatures);
      this.isShowAImage = true;
    },
    handleHcCheckedChange(value){
        if(value){
         // this.LoadYwhcbj();
         this.LoadYwhcbj1();
        this.isHcData=true;
        // 清除选择要素的样式
        if(this.OverlayVectorSource){
          this.OverlayVectorSource.clear();
        }

        this.map.getView().setZoom(7);
        // var coordinate = [110.328, 33.687];
          var coordinate = [108.878,35.424];
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
       this.map.removeLayer(this.hcVectorLayer_cluster);
        this.map.removeLayer(this.hcVectorLayer);
        //核查缩放
        // var coordinate = [109.05,35.25];
          var coordinate = [108.878,35.424];
        this.map.getView().setCenter(coordinate);
        //this.map.getView().setZoom(7);
      }
    },


    BtnGDP(){
      this.pieGDPZbData1=this.pieGDPZbData;
        this.isGDP = true;
        this.isRK = false;

      this.isShowGDP = this.DSJSXZDM == "610000" ? true : false;
      this.isShowGDPXJ = this.isGDP== true && this.DSJSXZDM != "610000" ? true : false;
      this.isShowRKXJ = this.isRK== true && this.DSJSXZDM != "610000" ? true : false;
    },
    BtnRK(){
       this.pieGDPZbData1=this.pieRkZbData;
        this.isGDP = false;
        this.isRK = true;

      this.isShowGDP = this.DSJSXZDM == "610000" ? true : false;
      this.isShowGDPXJ = this.isGDP== true && this.DSJSXZDM != "610000" ? true : false;
      this.isShowRKXJ = this.isRK== true && this.DSJSXZDM != "610000" ? true : false;
    },


    created() {
      this.queryDataCache1("2017","610000");
      this.queryMapDataCache()
    },

    //采用不同方式，获取不同区域数据
    async queryDataCache(){
      //未选中状态，均默认显示陕西省数据
      if(this.DSJSXZDM =="610000"){
        await this.queryDataCache1(this.dataForm.year,"610000");
      }

      else if(this.radioArea == 1){
        await this.queryDataCache1(this.dataForm.year,this.DSJSXZDM);
      }
      else{
        await this.queryDataCache2(this.selecttype,"",this.dataForm.year);
      }
    },
    //获取陕西行政区域json数据
    async queryDataCache1(yearParam,DSJSXZDM){
      var params = {
        year: yearParam,
      }
      await api.getHjjczzDataCache(params).then(res=>{
        var resultData = res.data;
        if(resultData){
          if(resultData.status == "success"){
            console.log("转换成功");
            this.hjjczzData = resultData.data;
            this.echartsDataExchange(DSJSXZDM);
          }
        }
      });
    },
    //获取秦岭/流域区域后台数据
    async queryDataCache2(area,xzqdm,year){

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
            this.pietdlyxzData=this.getpietdlydata(this.barTdlyxzData);
            //this.lineEIZSData = resultData.data.grid2;
            this.weathersEIPJ=resultData.data.grid2;
            this.barSthjzleiData = resultData.data.grid4;
            this.barSthjzsData = resultData.data.grid5;
            this.barTdfgxpData = resultData.data.grid8;
            this.barHjxzzsData =  resultData.data.grid10;
            this.barSwfdzsData = resultData.data.grid6;
            this.barZbfgzsData = resultData.data.grid7;
            this.SwmdzsLeftData = resultData.data.grid11_left;
            this.SwmdzsRightData = resultData.data.grid11_right;
            this.pieHjfhzsData = resultData.data.grid9;
            if(this.isShowXuanran == true){
              this.handleMapCheckedChange();
            }
          }
        }
      });
    },
    //获取地图渲染json数据
    async queryMapDataCache(){
      await api.getHjjczzMapDataCache({}).then(res=>{
        var resultData = res.data;
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

      //流域不显示县级数据

        if(zoom > 9){
          if(this.hcValue ) {
            this.hcVectorLayer_cluster.setVisible(false);
            this.hcVectorLayer.setVisible(true);
          }
          //console.log("当前地图的缩放级别=县级");
          if(this.radioArea != 3){
            this.isShiJi=false;
            this.isXianJi=true;
            if (this.isShowXuanran == false){
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
        }
        else if(zoom <= 9){
          if(this.hcValue){
            that.OverlayVectorSource.clear();
            this.hcVectorLayer_cluster.setVisible (true);
            this.hcVectorLayer.setVisible (false);
          }
          //console.log("当前地图的缩放级别=市级");
          this.isShiJi=true;
          this.isXianJi=false;
          /*this.isShiJi=false;
          this.isXianJi=true;*/
          if (this.isShowXuanran == false){
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
      // var LngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
      //console.log("地图选中坐标："+e.coordinate);
      console.log('鼠标点击位置e',e);
      if(this.hcValue&&this.map.getView().getZoom()>9){
        await this.selectHcData(e);
      }else if(this.hcValue&&this.map.getView().getZoom()<=9){
        this.map.getView().setZoom(9);
        this.map.getView().setCenter(e.coordinate);
      }
      else if(!this.hcValue){
        await this.refreshBigScreenCharts(this.radioArea,e.coordinate);
      }
    },

    //选择核查要素
    async selectHcData(e){
      this.arrPosition['tableLeft'] = (e.b.clientX - 720) +'px';
      this.arrPosition['tableTop'] = (e.b.clientY - 100) +'px';
      var that = this;
      // 清除选择要素的样式
      if(that.OverlayVectorSource){
        that.OverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      if(this.hcVectorSource && this.hcValue){
        // var features = that.hcVectorSource.getFeaturesAtCoordinate(e.coordinate);
        //根据坐标获取最近的feature
        var features = that.hcVectorSource.getClosestFeatureToCoordinate(e.coordinate)
        // if(features && features.length>0){
          if(features){
          // selFeature = features[0].clone();
            selFeature = features.clone();
        }
      }
      console.log('selFeature',selFeature)
      // 设置选中样式
      if(selFeature){
/*        var style = new ol.style.Style({
          fill: new ol.style.Fill({color: "rgba(36, 91, 121, 0.0)"}),
          stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
        })*/
        var style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 15,                             // 半径
            stroke: new ol.style.Stroke({           // 边界样式
              color: '#f80707',                    // 边界颜色
              width: 3                            // 边界宽度
            }),
            fill: new ol.style.Fill({               // 填充样式
              // color:'rgba(36, 91, 121, 0.0)'// 填充颜色
              color:'#f66809'
            })
          })
        });

        selFeature.setStyle(style);
        that.OverlayVectorSource.addFeature(selFeature);
      }
      if(selFeature){
        //excel
/*        var path1 = "\\webapps\\hjcczzData\\wyhc\\调绘成果.xls";
        var path2 = "\\webapps\\hjcczzData\\wyhc\\调绘照片成果.xls";*/
        var path1 = "\\webapps\\hjcczzData\\wyhc\\"+this.dataForm.year+"\\全省核查.xls";

        var params = {
          path: path1+",",
        }
        await api.getExcelDataCache(params).then(res=>{
          var resultData = res.data;
          if(resultData){
            if(resultData.status == "success"){
              console.log("resultData",resultData);
              //Excel成果处理
              var ExcelResult = this.excelResultProgress(resultData.data,selFeature);
            }
          }
        });
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
      if(this.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          this.message1=document.getElementById("textSTZKPJ").innerHTML=selFeature.N.NAME;

        }
      }
      else if(this.xjVectorSource && this.isXianJi){
        var features = this.xjVectorSource.getFeaturesAtCoordinate(coordinate);
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
      //获取行政区划代码、区域类型名称
      if(selFeature && this.isShiJi){
        //this.DSJSXZDM = selFeature.N.BZ;
        this.DSJSXZDM = selFeature.N["市代码"];
        if(area!=1)
        {
          this.DSJSXZDM="";
          this.selecttype=selFeature.N["NAME"];
        }
      }
      else if(selFeature && this.isXianJi){
        this.DSJSXZDM = selFeature.N.PAC;
        if(area==2)
        {
          this.DSJSXZDM = selFeature.N.PAC;
          this.selecttype=selFeature.N["NAME_1"];
        }else if(area==3)
        {
          this.DSJSXZDM = selFeature.N.PAC_1;
          this.selecttype=selFeature.N["NAME"];
        }
      }
      //未选中时，全部显示陕西行政区数据
      else{
        if(area==1)
        {
          this.DSJSXZDM ="610000";
          this.selecttype="";
        }
      }
      if(this.DSJSXZDM=="610000"){
        this.message1=document.getElementById("textSTZKPJ").innerHTML="陕西省";
      }

      //2.根据不同区域，采用不同方法，变更不同数据
      //2.1陕西行政区域数据
      if(area ==1){
        this.echartsDataExchange(this.DSJSXZDM);
      }
      //2.2秦岭（area==2, this.radioArea==2）、流域区域(area==3, this.radioArea==3)区域
      else{
        this.queryDataCache2(this.selecttype,this.DSJSXZDM,this.dataForm.year);
        console.log("zjw","type:"+this.selecttype+"xzqdm:"+this.DSJSXZDM+" year:"+this.dataForm.year)
      }
    },
    //Excel成果处理
    excelResultProgress(excelData,selFeature){
      var hcData = excelData.全省核查;
      // var hcDataPicture = excelData.调绘照片成果;
      var ObjectID = selFeature.N.WHBH;
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

/*            var pictureKey = searchData["核查类型"]+"照片";
            // console.log('pictureKey',pictureKey)
            var hcDataAndPictureMatch = "";
                for(var i=0;i<hcDataPicture[pictureKey].length;i++){
                  if(hcDataPicture[pictureKey][i]["核查编号"] == hcDataMatch["序号"]){
                    hcDataAndPictureMatch =  hcDataAndPictureMatch + hcDataPicture[pictureKey][i]["附件名称"]+",";
                  }
                }
            hcDataAndPictureMatch = hcDataAndPictureMatch.substring(0, hcDataAndPictureMatch.lastIndexOf(','));
            hcDataMatch["照片附件"] = hcDataAndPictureMatch;*/

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

    // 初始化地图
    initMap() {
      // this.gProjection = ol.proj.get('EPSG:3857');
      this.gProjection = ol.proj.get('EPSG:4326');
      this.map = new ol.Map({
        //取消右下角i
        controls: ol.control.defaults({ attribution: false, zoom: true, rotate: false }).extend([]),
        target: 'map',
        view: new ol.View({
          projection: this.gProjection,
          center: [108.878,35.424],
          // center: [12129470.527,4255685.289],
          zoom: 7.0
        })
      });
      //地图缩放
      this.map.on('moveend', this.onMapZoomHandler);
      //鼠标悬停高亮
      this.map.on('pointermove', this.onMapMoveHandler);
      //地图单机
      this.map.on('singleclick', this.onMapSingleSelHandler);

    },
    onMapMoveHandler(e){
      //鼠标悬停到相关区县高亮
console.log('here')
      var that = this;
      // 清除选择要素的样式
      if(that.moveOverlayVectorSource){
        that.moveOverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      if(this.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(e.coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          // this.message1=document.getElementById("textSTZKPJ").innerHTML=selFeature.N.NAME;

        }
      }
      else if(this.xjVectorSource && this.isXianJi){
        var features = this.xjVectorSource.getFeaturesAtCoordinate(e.coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          // this.message1=document.getElementById("textSTZKPJ").innerHTML=selFeature.N.NAME;

        }
      }
      // 设置选中样式
      if(selFeature){
        var style = new ol.style.Style({
        //  fill: new ol.style.Fill({color: "rgba(255, 91, 121, 0.7)"}),
          fill: new ol.style.Fill({color: "rgba(14,97,160,0.8)"}),
          text: new ol.style.Text({
            textAlign: 'center',            //位置
            textBaseline: 'middle',
            font: 'bold 16px 微软雅黑',    //字体与大小
            text: selFeature.N.NAME,
            fill: new ol.style.Fill({    //文字填充色
              color: '#ffffff'
            }),
          }),
         // stroke: new ol.style.Stroke({color: '#FFAA33', width: 2})
        })
        selFeature.setStyle(style);
        that.moveOverlayVectorSource.addFeature(selFeature);
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
    //加载野外核查边界geojson-zjw
    LoadYwhcbj1(){
      //this.hcValue=false;
      let json = require('../../assets/js/geojson/'+this.dataForm.year+'wyhc.json');
      this.hcFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
      });
      this.hcStyle = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,                             // 半径
          stroke: new ol.style.Stroke({           // 边界样式
            color: '#33a19c',                    // 边界颜色
            width: 3                            // 边界宽度
          }),
          fill: new ol.style.Fill({               // 填充样式
            color:'#FFF'
          })
        })
      });
      for(var i=0;i<this.hcFeatures.length;i++){
        this.hcFeatures[i].setStyle(this.hcStyle);
      }
      this.hcVectorSource= new ol.source.Vector({
        features:this.hcFeatures
      });
      this.hcVectorLayer = new ol.layer.Vector({
        source: this.hcVectorSource,
      })

      this.hcVectorLayer_cluster = new ol.layer.Vector({
        source: new ol.source.Vector({
          projection: 'EPSG:4326'
        }),
      });
      //遍历市级，用市级作查询，获取市级中心点坐标
      for(var j=0;j<this.sjFeatures.length;j++){
        var extent = ol.extent.boundingExtent(this.sjFeatures[j].getGeometry().getCoordinates()[0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
        var center = ol.extent.getCenter(extent);   //获取边界区域的中心位置
        var poiFeature = new ol.Feature(new ol.geom.Point(center));
        var thisdaima=(this.sjFeatures[j].N.市代码+"").substr(0,4);
        var thiscitycount=0;
        for(var i=0;i<this.hcFeatures.length;i++){
         if(this.hcFeatures[i].N.BH.indexOf(thisdaima)!=-1)
         {
           thiscitycount++;
         }
        }
        var poiStyle1 = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 16,
            fill: new ol.style.Fill({
              color: 'orange'
            })
          }),
          text: new ol.style.Text({
            textAlign: 'center',            //位置
            textBaseline: 'middle',         //基准线
            font: 'bold 12px 微软雅黑',
            text: thiscitycount+"",      //文本内容
            fill: new ol.style.Fill({       //文本填充样式（即文字颜色)
              color: '#000000'
            }),
          })
        });
        poiFeature.setStyle(poiStyle1);
        this.hcVectorLayer_cluster.getSource().addFeature(poiFeature);
      }
      this.map.addLayer(this.hcVectorLayer_cluster);
      this.map.addLayer(this.hcVectorLayer);
      this.hcVectorLayer.setVisible (false);
    },


    //加载野外核查边界geojson
    LoadYwhcbj(){
      // let json = require('../../assets/js/geojson/touyingpro.json')
      let json = require('../../assets/js/geojson/'+this.dataForm.year+'wyhc.json');
      this.hcFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
      });
      this.hcStyle = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,                             // 半径
          stroke: new ol.style.Stroke({           // 边界样式
            color: '#33a19c',                    // 边界颜色
            width: 3                            // 边界宽度
          }),
          fill: new ol.style.Fill({               // 填充样式
            // color:'rgba(36, 91, 121, 0.0)'// 填充颜色
            color:'#FFF'
          })
        })
      });
      this.hcVectorSource= new ol.source.Vector({
        features:this.hcFeatures
      });

      // 聚合
      var cluster = new ol.source.Cluster({
        source: this.hcVectorSource,
        distance: 200
      });
      // 创建图层
      this.hcVectorLayer = new ol.layer.Vector({
        source: cluster,
        style: function (feature, resolution) {
          var size = feature.get('features').length;
          if (size == 1) {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                  color: '#33a19c',
                  width: 3
                }),
                fill: new ol.style.Fill({
                  color: '#FFF'
                })
              }),
            })
          }
          else {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 15,
                stroke: new ol.style.Stroke({
                  color: '#33a19c',
                  width: 3
                }),
                fill: new ol.style.Fill({
                  color: '#FFF'
                })
              }),
              text: new ol.style.Text({
                font: '18px Calibri,sans-serif',
                text: size.toString(),
                fill: new ol.style.Fill({
                  color: '#1c5250'
                })
              })
            })
          }
          return style;
        }
      });
    },

    //加载县级流域geojson
    LoadSxxj(xjjson){
      let json = require('../../assets/js/geojson/' +xjjson);
      this.xjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
      });
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
      let json = require('../../assets/js/geojson/' +jsonn);
      this.sjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
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


/*// text 画图

      // 创建和绘制一个 canvas 图案
      var canvas = document.createElement("canvas");
      canvas.width = 20;
      canvas.height = 20;
      var context = canvas.getContext("2d");
      context.strokeStyle = "red";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(20, 20);
      context.lineTo(20, 0);
      context.lineTo(0, 20);
      context.lineTo(0, 0);
      context.stroke();

      // new style 样式
      var style = new ol.style.Style({
        image: new ol.style.Icon({
          img: canvas,
          imgSize: [canvas.width, canvas.height],
          rotation: (90 * Math.PI) / 180,
        }),
      });

      // new 一个功能，里面有一个点（北京的坐标点）
      var shape = new ol.Feature({
        geometry: new ol.geom.Point([108.95, 34.34]),
      });
      console.log('shape',shape);

      // 给这个点赋值上前面 new 的样式
      shape.setStyle(style);
      // 最后把加了样式之后的点（北京的坐标点）添加给 layer 层
      this.sjVectorLayer.getSource().addFeature(shape);*/

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
    //加载悬停图层
    initMoveOverlayVectorLayer(){
      this.moveOverlayVectorSource = new ol.source.Vector();
      var vectorLayer = new ol.layer.Vector({
        source: this.moveOverlayVectorSource,
      });
      this.map.addLayer(vectorLayer);

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

    //数据更新
    dataUpdate(){
      if(this.isShowXuanran == false){
        this.dataUpdateNew();
      }
      else if(this.isShowXuanran == true){
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
         /* else if(key == 'ei'){
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
          }*/
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

      alert("数据更新成功，请刷新界面");


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
      else if(type=="ei"){
        data["EI指数"] = data["EI指数"].toString();
        //console.log("rkdata",data)
        //console.log("ecahrtsExChange.weatherExchange(name,data)",ecahrtsExChange.weatherExchange(name,data));
        return ecahrtsExChange.weatherExchange(name,data);
      }
    },
    echartsDataExchange(DSJSXZDM){
        //依据行政区划代码变更数据
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
            this.pietdlyxzData = this.getpietdlydata(this.hjjczzData[name]);
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
            //this.lineEIZSData = this.hjjczzData[name];
            this.weathersEIPJ = this.hjjczzData[name];
          }
          if(fieldname == 'wrfhzs'){
            this.pieHjfhzsData = this.hjjczzData[name];
          }
          if(fieldname == 'gdp'){
            this.weathersGDP = this.hjjczzData[name];

          }
          if(fieldname == 'rktj'){
            this.weathersRKTJ = this.hjjczzData[name];
          }
        }
      this.isShowGDP = DSJSXZDM == "610000" ? true : false;
      this.isShowGDPXJ = this.isGDP== true && DSJSXZDM != "610000" ? true : false;
      this.isShowRKXJ = this.isRK== true && DSJSXZDM != "610000" ? true : false;

    },

    getpietdlydata(objtest){
      var returnobj=new Object();
      var dataarray=new Array();
      for(var i=0;i<6;i++)
      {
        var Obj=new Object();
        Obj.name=objtest["xAxis"][i];
        Obj.value=objtest["yAxis"][i];
        dataarray.push(Obj);
      }
      returnobj.tooltip="类型";
      returnobj.dataArr=dataarray;
      console.log(returnobj);
      return returnobj;
    },
    //map数据更新
    async onMapHandler(){
      var exResultData = {};
      for(var key in stzkpjTable.stzkmapTableArr) {

        var lineEIZSData = {};
        for (var codeKey in CodeData.XianJiCodeEN) {
          var params = {
            xzqdm: codeKey,
            type: key,
          }
          await api.getStzkpjData(params).then(res => {
            var resultData = res.data;
            if (resultData) {
              if (resultData.status == "success") {
                var stzkpjDataArr = resultData.data.oridata;
                var xAxis = new Array();
                var yAxis = new Array();
                for (var q = 0; q < stzkpjDataArr.length; q++) {
                  if(key =="area"){
                    var xAxisName = key;
                  }
                  else{
                    var xAxisName = key + stzkpjDataArr[q].year;
                  }

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
      });
    },

    //切换显示不同区域
    SelectArea(){
      this.map.getView().setZoom(7.0);
      this.map.getView().setCenter([108.878,35.424]);
      var dsjjson = "";
      var xjjson = "";
      this.selecttype = this.selecttypeArr[this.radioArea];

      console.log('this.xzqForm.xzq',this.xzqForm.xzq)
      console.log('this.isXzq',this.isXzq)

      //切换时默认显示陕西省行政区划数据
      this.DSJSXZDM = "610000";
      this.selecttype = "";
      this.echartsDataExchange("610000");
      document.getElementById("textSTZKPJ").innerHTML="陕西省";

      //isShowSwitch用来判断是否显示“地图渲染”按钮
      // this.isShowSwitch = this.radioArea == 1 ? true : false;
      this.isXzqh = this.radioArea == 1 ? true : false;
      this.isQinling = this.radioArea == 2 ? true : false;
      this.isLiuyu = this.radioArea == 3 ? true : false;

      this.isShowXuanran = false;


/*      if(this.radioArea == 3){
        this.isXzq = false;
        this.xzqForm.xzq = "地市";
      }*/
      // 清除选择要素的图层
      if(this.OverlayVectorLayer){
        // that.OverlayVectorLayer.clear();
        this.map.removeLayer(this.OverlayVectorLayer);
      }

      //切换地图
      if(this.radioArea == 1){
        this.isShowJjRkXuanran = true;
        dsjjson = "sxsj.json";
        xjjson = "sxxj.json";
      }
      else if(this.radioArea == 2){
        this.isShowJjRkXuanran = false;
        this.xuanranMap = 1;
        dsjjson = "sxqinling.json";
        xjjson = "sxqinlingfenxian.json";
      }
      else if(this.radioArea == 3){
        this.isShowJjRkXuanran = false;
        this.xuanranMap = 1;
        dsjjson = "sxliuyu.json";
        xjjson = "sxliuyufenxian.json";
      }
      this.map.removeLayer(this.sjVectorLayer);
      this.map.removeLayer(this.xjVectorLayer);

      //重新加载json
      this.LoadSxdsj(dsjjson);
      this.LoadSxxj(xjjson);
      this.LoadOverlayVectorLayer();
      //是否渲染
      this.SelectXuanran();
      if(this.isShowXuanran == true){
        this.handleMapCheckedChange();
      }
    },
    SelectXuanran(){
      // 打开/关闭“地图渲染”按钮后，默认为地市级别
      if(this.isShowXuanran == false){
        this.isXzq = false;
        this.xzqForm.xzq = "地市";
      }


      if(this.isShowXuanran == true && this.isShowSwitch == true){
        this.xuanranMap = 1;
        // this.hcChecked = [];
      }
      else{
        this.isShowXuanran = false;
        this.xuanranMap = 0;
      }
      this.handleMapCheckedChange();
    },
    //切换显示ei、gdp、rk地图渲染
    handleMapCheckedChange() {
      this.isShowXzq = this.xuanranMap== 1 && this.radioArea != 3? true : false;
      // this.isShowXzq = this.xuanranMap== 1 && this.radioArea == 1 ? true : false;
      this.isShowEILegend = this.xuanranMap == 1 ? true : false;
      this.isShowGdpLegend = this.xuanranMap == 2 ? true : false;
      this.isShowRkLegend = this.xuanranMap == 3 ? true : false;
      if (this.xuanranMap == 1) {
        this.LoadSxsjEI();
      }
      else if (this.xuanranMap == 2) {
        this.xzqForm.xzq = "地市"
        this.isXzq = false;
        this.LoadSxsjGdpRk("gdp");
      }
      else if (this.xuanranMap == 3) {
        this.xzqForm.xzq = "地市"
        this.isXzq = false;
        this.LoadSxsjGdpRk("rktj");
      }
      else {
        this.LoadSxQc();
      }
    },
    SelectXzq(value){
      this.xzqForm.xzq = this.isXzq == false ? "地市" : "区县";
      this.LoadSxsjEI()
    },
    SelectYear(value){
      this.queryDataCache();
      if(this.isShowXuanran == true){
        this.handleMapCheckedChange();
      }
      // 清除选择要素的样式
      if(this.OverlayVectorSource && this.hcValue){
        this.OverlayVectorSource.clear();
      }
      //打开核查数据
      if(this.hcValue == true){
        //移除原核查图斑图层
        this.map.removeLayer(this.hcVectorLayer);
        this.map.removeLayer(this.hcVectorLayer_cluster);
        //添加选择年份的核查图斑图层
       // let filename = this.dataForm.year+"wyhc.json";
       // this.LoadYwhcbj();
        this.LoadYwhcbj1();
        /*var layersArray = this.map.getLayers();
        layersArray.insertAt(3,this.hcVectorLayer);*/
       /* this.map.addLayer(this.hcVectorLayer);
        this.map.addLayer(this.hcVectorLayer_cluster);
        this.hcVectorLayer.setVisible (false);*/
      }
    },

    //  加载ei评价图
    LoadSxsjEI(){
      var year = this.dataForm.year;
      var xzq = this.xzqForm.xzq;

      var area = this.radioArea;
      var styleNotShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });
      if(xzq == "区县"){
        for(var i=0;i<this.sjFeatures.length;i++){
          this.sjFeatures[i].setStyle(styleNotShow);
        }
        for(var f=0;f<this.xjFeatures.length;f++){
          let pjNum = this.styleDt(year,area,"ei","quxian",f).pjNum;
          let style = this.styleDt(year,area,"ei","quxian",f).style;
          // console.log('pjNum',pjNum)
          if(pjNum >= 75){
            this.xjFeatures[f].setStyle(style[4]);
          }
          else if(pjNum >= 55){
            this.xjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum >= 35){
            this.xjFeatures[f].setStyle(style[2]);
          }
          else {
            this.xjFeatures[f].setStyle(style[1]);
          }
        }
      }
      else{
        for(var i=0;i<this.xjFeatures.length;i++){
          this.xjFeatures[i].setStyle(styleNotShow);
        }
        for(var f=0;f<this.sjFeatures.length;f++){
          let pjNum = this.styleDt(year,area,"ei","shengshi",f).pjNum;
          let style = this.styleDt(year,area,"ei","shengshi",f).style;
          if(pjNum >= 75){
            this.sjFeatures[f].setStyle(style[4]);
          }
          else if(pjNum >= 55){
            this.sjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum >= 35){
            this.sjFeatures[f].setStyle(style[2]);
          }
          else if(pjNum >= 15){
            this.sjFeatures[f].setStyle(style[1]);
          }
        }
      }
    },
    StyleColor(colorAr){
      var stylee = [];
      for (var s=0;s<5;s++){
        stylee[s] =new ol.style.Style({
         // stroke: new ol.style.Stroke({color: '#4690b3', width: 1}),808080
          stroke: new ol.style.Stroke({color: '#808080', width: 0.3}),
          fill:new ol.style.Fill({
            color: colorAr[s],
          }),
        });
      }
      return stylee;
    },
    styleDt(year,area,type,xzqjb,f){
      var colorArr = this.colorArr[type];
      var style = this.StyleColor(colorArr);
      var sjFeatureDm = "";
      var xjFeatureDm = "";
      var name = "";
      var pjNum = "";

      if(area== 1){
        console.log('xzqjb',xzqjb)
        if(xzqjb=="shengshi"){
          sjFeatureDm = this.sjFeatures[f].N["市代码"];
          name = XZQCodeProcess.XZQCodeJoin(sjFeatureDm, type);
        }
        else if(xzqjb=="quxian"){
          xjFeatureDm = this.xjFeatures[f].N.PAC;
          name = XZQCodeProcess.XZQCodeJoin(xjFeatureDm, type);
        }
        var element = type+year;
        var index = this.hjjczzMapData[name]["xAxis"].indexOf(element);
        if(type=="ei"){
          pjNum = this.hjjczzMapData[name]["yAxis"][index];
        }
        else{
          //总量
          var num = this.hjjczzMapData[name]["yAxis"][index];
          //面积
          var nameArea = name.substr(0, name.length - type.length) + "area";
          var areaNum = this.hjjczzMapData[nameArea]["yAxis"][0];
          pjNum = num*10000/areaNum;


        }
      }
      //秦岭、流域
      else{
        if(xzqjb=="shengshi"){
          name = this.sjFeatures[f].N.NAME;

        }
        else if(xzqjb=="quxian"){
          name = this.xjFeatures[f].N.NAME;
        }
        for(var i=0;i<this.barSthjzleiData.xAxis.length;i++){
          //  name和grid4X轴名称不完全相等，所以用是否包含字符来判断
          if(this.barSthjzleiData.xAxis[i].indexOf(name)!= -1){
            pjNum = this.barSthjzleiData.yAxis[i];
          }
        }
      }
      return {
        'pjNum': pjNum,
        'style': style
      };
    },

    LoadSxsjGdpRk(type){
      var year= this.dataForm.year;
      var area= this.radioArea;
      var pjNumArr = new Array();
      var styleNotShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });
      for(var i=0;i<this.xjFeatures.length;i++){
          this.xjFeatures[i].setStyle(styleNotShow);
      }
      for(var f=0;f<this.sjFeatures.length;f++){
        var pjNum= this.styleDt(year,area,type,"shengshi",f).pjNum;
        var style= this.styleDt(year,area,type,"shengshi",f).style;
        pjNumArr[f] = pjNum;
      }
      this.pjNumStyle(pjNumArr,style);
    },
    pjNumStyle(pjNumArr,style){
      var avr = Math.floor(Math.max.apply(null, pjNumArr)/16);
      for(var i=0;i<this.sjFeatures.length;i++){
        if(pjNumArr[i] >= avr*12){
          this.sjFeatures[i].setStyle(style[4]);
        }
        else if(pjNumArr[i] >= avr*6 & pjNumArr[i] < avr*12){
          this.sjFeatures[i].setStyle(style[3]);
        }
        else if(pjNumArr[i] >= avr*3 & pjNumArr[i] < avr*6){
          this.sjFeatures[i].setStyle(style[2]);
        }
        else if(pjNumArr[i] >= avr*1 & pjNumArr[i] < avr*3){
          this.sjFeatures[i].setStyle(style[1]);
        }
        else {
          this.sjFeatures[i].setStyle(style[0]);
        }
      }
    },
    //清除渲染
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

  },
  mounted() {
    // 初始化地图
    this.initMap();
    //加载午夜蓝图
    this.LoadGaoDeMap();
    //加载天地图影像
    this.LoadTianDiTuMap();
    //加载省地市级别json
    this.LoadSxdsj('sxsj.json');
    //加载县级json
    this.LoadSxxj('sxxj.json');
   /* //加载外业核查
    this.LoadYwhcbj();
    this.LoadYwhcbj1();*/
    // 初始化悬停图层
    this.initMoveOverlayVectorLayer();
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
    pietdlyxZ,
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
  .toolBarRadioMap3{
    position: absolute;
    top:40px;
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
    height: 18px;
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
    right: -50px;
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
 // height: 38px;
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
  right: 100px;
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
/*.legend-ei{
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
}*/

.legend-ei{
  &:nth-child(1):before{
    background-color:#264321;
  }
  &:nth-child(2):before{
    background-color:#558848;
  }
  &:nth-child(3):before{
    background-color:#9da385;
  }
  &:nth-child(4):before{
    background-color:#e3b05a;
  }
  &:nth-child(5):before{
    background-color:#ff0000;
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

