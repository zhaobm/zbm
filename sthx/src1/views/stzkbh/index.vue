<template>
  <div class='resourceOverview'>
    <div class="left-bar">
      <Box title="土地利用变化">
        <barTdlybh  :data="barTdlybhData" slot="content"/>
      </Box>
      <!--      <NewBoxDouble :title="gfUnit" class="rightBottom">
              <BarSwmdzsLeftNew :data="barTdzyjzData" slot="leftContent"/>
              <BarSwmdzsRightNew :data="barTdzyjzRightData" slot="RightContent"/>
            </NewBoxDouble>-->
      <Box title="土地利用转移">
        <barTdlyzy  :data="barTdzyjzData" slot="content"/>
      </Box>
      <!--<Box title="EI县区变化" >
        <barStzkxqbh  :data="barStzkxqbhData" slot="content"/>

      </Box>-->
        <Box title="EI指数变化">
            <lineEIZS  slot="content" :data="lineEIZSData"/>
        </Box>
    </div>
    <div class="center">
      <Box>
        <div class="top-box" slot="content">
          <mapBox />
          <div class="tool" >
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
            <!--              <div class='toolBarDataUpdate'>-->
            <!--                <el-button size="mini" round @click="dataUpdateNew()">更新</el-button>-->
            <!--                &lt;!&ndash;-->
            <!--                <el-button size="mini" round @click="test()">测试</el-button>-->
            <!--                &ndash;&gt;-->
            <!--              </div>-->
            <div class='toolBarYearsSelect'>
<!--              <el-select v-model="xzqForm.xzq" v-if="isShowXzq" placeholder="请选择" size="small" :popper-append-to-body="false" @change="SelectXzq">
                <el-option
                    v-for="item in xzqs"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>-->
              <el-p id="textI" style="color:white;width:100px;font-size: 18px;margin-right: 10px" >{{message}}</el-p>
              <el-select v-model="value0[0].year0" @change="getDiff0()" size="small" :popper-append-to-body="false" style="width:110px">
                <el-option
                    v-for="item in years0"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
              </el-select>
              <el-select v-model="value1[0].year1" @change="getDiff1()" size="small" :popper-append-to-body="false" class='toolBarYearsSelect_year'  style="width:110px">
                <el-option
                    v-for="item in years1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                </el-option>
<!--                <el-select v-model="dataForm.year0"  @change="getDiff()" size="small" :popper-append-to-body="false" style="width:110px">-->
<!--                  <el-option-->
<!--                      v-for="item in years0"-->
<!--                      :key="item"-->
<!--                      :label="item"-->
<!--                      :value="item"-->
<!--                 >-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--                <el-select v-model="dataForm.year1" @change="getDiff()" size="small" :popper-append-to-body="false" class='toolBarYearsSelect_year'  style="width:110px">-->
<!--                  <el-option-->
<!--                      v-for="item in years1"-->
<!--                      :key="item"-->
<!--                      :label="item"-->
<!--                      :value="item"-->
<!--                 >-->
<!--                  </el-option>-->
              </el-select>

            </div>

<!--                          地图渲染、核查数据开关-->
            <div class='toolBarRadioMap1 toolBarRadioMap'>
              <el-switch
                  v-model="valueMap"
                  v-if="isShowSwitch"
                  inactive-color="gray"
                  active-text="地图渲染"
                  @change="SelectMap()">
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

            <div class='legend' v-if="isShowEILegend">
              <span class='legend-ei' v-for="(Items,$index) in EILegendItems" :key="$index">{{Items.text}}</span>
            </div>
            <div class='toolBarRadioXuanran toolBarRadioDiTu'>
              <el-radio-group v-model="xuanranMap" v-if="isShowXuanran" @change="handleMapCheckedChange">
                <el-radio :label="1" >EI评价</el-radio>
              </el-radio-group>
            </div>
            <div class='toolBarLunBo'>
              <el-button id="lunbo" size="mini" round v-if="isShowLunbo" @click="lunBo()">轮播</el-button>
            </div>
          </div>
        </div>
      </Box>
      <Box title='实时情况'>
        <div class="weater-box" slot="content">
          <WeaterItem :name="item.name" :value="item.value" :unite="item.unite" v-for="item in weathers" :key="item.id" />
          <!--          -->
        </div>
      </Box>
    </div>
    <div class="right-bar">
      <!--<Box title="生态环境总指数变化" class="rightbarTop">
        <barSthjzscz :data="barSthjzsczData" slot="content"/>
      </Box>-->
        <Box title="生态环境状况指数变化" class="rightbarTop">
            <barSthjzscz :data="barSthjzsczData" slot="content"/>
        </Box>
      <Box title="生态环境分指数变化" class="rightbarTopZL1" >
        <el-collapse v-model="activeName" accordion slot="content">
          <el-collapse-item title="生物丰度指数变化" name="1">
            <div><barSwfdzs :data="barSwfdzsData" /></div>
<!--            <div><barWrfhzs :data="barWrfhzsData"/></div>-->
          </el-collapse-item>
          <el-collapse-item title="植被覆盖指数变化" name="2">
            <div><barZbfgzs :data="barZbfgzsData"/></div>
          </el-collapse-item>
          <el-collapse-item title="土地胁迫指数变化" name="3">
            <div><barTdfgxp :data="barTdfgxpData"/></div>
          </el-collapse-item>
          <el-collapse-item title="污染负荷指数变化" name="4">
            <div><barWrfhzs :data="barWrfhzsData"/></div>
          </el-collapse-item>
<!--          <el-collapse-item title="环境限制指数变化" name="5">-->
<!--            <div>-->
<!--              <barHjxzzs :data="barHjxzzsData"/>-->
<!--            </div>-->
<!--          </el-collapse-item>-->
          <el-collapse-item title="水网密度指数" name="6">
            <div>
              <barHjxzzs :data="SwmdzsRightData" slot="RightContent"/>
            </div>
          </el-collapse-item>
        </el-collapse>
      </Box>

    </div>
    <div></div>
  </div>
</template>
<script>
import Box from "../../components/common/box";
import mapBox from "../../components/map/index.vue";


import barTdlybh from "../../components/charts/bar/stzkbh/barTdlybh.vue";
import pieStzkmj from "../../components/charts/pie/stzkbh/pieStzkmj.vue";
import barStzkxqbh from "../../components/charts/bar/stzkbh/barStzkxqbh.vue";
//import barStzkgs from "../../components/charts/bar/stzkbh/barStzkgs.vue";
import barStzkzs from "../../components/charts/bar/stzkbh/barStzkzs.vue";
import barGDPAAREA from "../../components/charts/bar/stzkbh/barGDPAAREA.vue";
import pieGDPZb from "../../components/charts/pie/stzkbh/pieGDPZb.vue";
import pieRkZb from "../../components/charts/pie/stzkbh/pieRkZb.vue";
import ol from 'openlayers';
import * as api from "../../assets/js/api/search.js";
import XZQCodeProcess from "../../dataprocess/XZQNameJoinAndSplit.js";
import ecahrtsExChange from "../../dataprocess/EcahrtsExChange.js";
import stzkpjTable from "../../dataprocess/stzkpjTable.js";
import openlayerOperation from "../../openlayerAPI/openlayerOperation";
import WeaterItem from "../../components/common/weather/indexStzkbhEi";
import barTdfgxp from "../../components/charts/bar/stzkbh/barTdfgxp.vue";
import barSwfdzs from "../../components/charts/bar/stzkpj/barSwfdzs.vue";
import barZbfgzs from "../../components/charts/bar/stzkbh/barZbfgzs.vue";
import barWrfhzs from "../../components/charts/bar/stzkbh/barWrfhzs.vue";
import pieHjfhzs from "../../components/charts/pie/stzkpj/pieHjfhzs.vue";
import NewBoxDouble from "../../components/common/newBox/indexDoubleStzkbh.vue";

import barSthjzscz from "../../components/charts/bar/stzkbh/barSthjzscz.vue"
import barHjxzzs from "../../components/charts/bar/stzkbh/barHjxzzs";


import BarSwmdzsLeftNew from "../../components/charts/bar/stzkbh/BarSwmdzsLeftNew";
import BarSwmdzsRightNew from "../../components/charts/bar/stzkbh/BarSwmdzsRightNew";
import barTdlyzy from "../../components/charts/bar/stzkbh/barTdlyzy";
import lineEIZS from "../../components/charts/line/stzkpj/lineEIZS";

export default {
  data() {
    return{
        lineEIZSData: {},
      message:"陕西省",
      activeName: '1',
      gfUnit:"土地转移变化",
      xjFeatures:null,
      xjVectorSource:null,
      xjVectorLayer:null,
      sjFeatures:null,
      sjVectorSource: null,
      sjVectorLayer: null,
      OverlayVectorSource: null,
        moveOverlayVectorSource: null,
        moveOverlayVectorlayer: null,
      OverlayVectorLayer:null,
      selecttype:"",
      selecttypeArr:["","","秦岭","全流域"],
      radioArea:1,
      radioDiTu:1,
      radioMap:1,
      valueMap:false,
      isShiJi:true,
      isXianJi:false,
      isChartQuanSheng:true,
      isChartDiShi:false,
      DSJSXZDM:"610000",
      value0:[{year0:"2016"}],
      value1:[{year1:"2017"}],
      TdzyjzqqData:{
        xAxis:["林地","草地","耕地","水域","建筑","未利用"],
        yAxis:[90607.11,-35676.64,-36485.74,2096.77,8882.05,3054.23]
      },
      barTdlybhData:{
        // xAxis:["林地","草地","耕地","水域","建筑","未利用"],
        // yAxis:[90607.11,-35676.64,-36485.74,2096.77,8882.05,3054.23]
      },
      pieStzkmjData:{
        dataArr: [
          { value: 76297.46, name: "优" },
          { value: 68210.25, name: "良" },
          { value: 62386.45, name: "一般" },
        ]
      },
      dataForm:{
        year0:"2017",
        year1:"2018",
      },
      // years:["2016","2017","2018","2019","2020"],
      years0:[{value:'2016',label:'2016',disabled:false},
        {value:'2017',label:'2017',disabled:false},
        {value:'2018',label:'2018',disabled:false},
        {value:'2019',label:'2019',disabled:false},
        {value:'2020',label:'2020',disabled:false},
      ],
      years1:[{value:'2016',label:'2016',disabled:false},
        {value:'2017',label:'2017',disabled:false},
        {value:'2018',label:'2018',disabled:false},
        {value:'2019',label:'2019',disabled:false},
        {value:'2020',label:'2020',disabled:false},
      ],
      // years0:["2016","2017","2018","2019","2020"],
      // years1:["2016","2017","2018","2019","2020"],
      /*
      barStzkgsData:{
        xAxis:["优","良","一般"],
        yAxis:[30.84,35.38,25.57],
      },
      */
      barTdzyjzData:{
        // xAxis:["草地","建设用地","未利用土地","水域","林地","耕地"],
        // cd:[0,30,31,20,16,40],
        // jsyd:[17,0,46,30,49,15],
        // wly:[16,35,0,30,25,24],
        // sy:[14,0,0,0,12,10],
        // ld:[14,3,12,14,0,8],
        // gd:[14,7,23,14,12,0],
      },
      barTdzyjzRightData:{
        // xAxis:["草地","建设用地","未利用土地","水域","林地","耕地"],
        // cd:[0,30,31,20,16,40],
        // jsyd:[17,0,46,30,49,15],
        // wly:[16,35,0,30,25,24],
        // sy:[14,0,0,0,12,10],
        // ld:[14,3,12,14,0,8],
        // gd:[14,7,23,14,12,0],
        // BB:[14,7,23,14,12,0]
      },
      barStzkxqbhData:{
        // xAxis:["2016","2017","2018","2019","2020"],
        // xqgsyou:[0,30,31,20,16],
        // xqgsliang:[17,42,46,50,49],
        // xqgsyiban:[66,35,30,30,25],
        // xqgsjiaocha:[14,0,0,14,12],
      },
      barSthjzsczData:{
        // xAxis:["生物丰度","植被覆盖","土地胁迫","污染负荷","环境限制","水网密度"],
        // yAxis:[51.0196,38.00073,48.0022,33.0097,68.0022,22.0097]
      },
      barSwfdzsData:{
        xAxis:['生境质量值','生境质量指数','生物多样性指数','生物丰度指数'],
        yAxis:[50,60,70,80],
      },
      barZbfgzsData:{
        // xAxis:["植被覆盖指数"],
        // yAxis:[84.9178]
      },
      barStzkzsData: {
        xAxis:["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市","杨凌"],
        ei2016:[67.52,62.68,72.81,58.12,59.89,58.23,83.17,39.76,82.43,77.49,51.72],
        ei2018:[70.10,65.84,75.35,61.47,61.31,62.75,82.97,47.61,82.04,79.75,60.47],
      },
      barGDPAAREAData:{
        xAxis:["优","良","一般"],
        gdpzb:[15.96,35.91,48.13],
        mjzb:[36.88,32.97,30.15],
      },
      pieGDPZbData:{
        dataArr: [
          { value: 2752.4762, name: "优" },
          { value: 7981.5952, name: "良" },
          { value: 10721.9127, name: "一般" },
        ]
      },
      pieRkZbData:{
        dataArr: [
          { value: 911.71, name: "优" },
          { value: 1722.2483, name: "良" },
          { value: 1201.4716, name: "一般" },
        ]
      },
      barTdfgxpData:{

      },
      pieHjfhzsData:{
        // dataArr: [
        //   { value: 3429.62, name: "固废：" },
        //   { value: 7715.04, name: "烟尘：" },
        //   { value: 800.33, name: "COO：" },
        //   { value: 10341.33, name: "SO2：" },
        //   { value: 450.03, name: "h2o：" },
        // ]
      },
      // "wubaoeitj":[
      //     {"unite":"","name":"EI2016","value":47.01},
      //     {"unite":"","name":"EI2017","value":46.88730529},
      //     {"unite":"","name":"△EI","value":-0.13},
      //     {"unite":"","name":"评价结果","value":"一般"},
      //     {"unite":"","name":"变化分级","value":"无明显变化"}
      //   ],
      weathers:{},
      autoRefreshSj:0,
      intervalID:0,
      isLunbo:false,
      sjCoordinate:{
        "":[
        [109.8735,38.2104],
        [108.9946,35.2221],
        [108.3794,34.7387],
        [107.0171,34.2993],
        [109.0825,34.1674],
        [110.2690,34.1235],
        [109.9614,34.8266],
        [108.9067,32.6733],
        [109.5659,36.5844],
        [107.0171,33.2446],
      ],
      "秦岭":[
        [109.8735,38.2104],
      ],
        "全流域":[
          [110.287,38.808],
          [109.343,37.890],
          [109.139,35.314],

        ]
      },
      hjjczzMapData: {},
      xuanranMap:0,
      checkedMapDatas: ['EI评价'],
      xzqForm:{
        xzq:"地市"
      },
      isXzq:false,
      xzqs:["地市","区县"],
      EILegendItems:[
        {text:"显著变好"},
        {text:"明显变好"},
        {text:"略微变好"},
        {text:"无明显变化"},
        {text:"略微变差"},
        {text:"明显变差"},
        {text:"显著变差"},
      ],
      isShowEILegend:false,
      isShowXuanran:false,
      isShowLunbo:true,
      isShowXzq:false,
      isShowSwitch:true,
     // colorArr: {"ei":['#a82d1d','#de8e2c','#C0FF3E','#68ce00','#015501','#023010','#660010','#44000A']},
       /* colorArr: {"ei":[
                '#FFCC66',
                '#CCFFCC',
                '#C0FF3E',
                '#68ce00',
                '#015501',
                '#023010',
                '#FF0000',
                '#44000A'
            ]},*/
        /*colorArr: {"ei":[
                '#023010',
                '#008000',
                '#3CB371',
                '#CCFFCC',
                '#FFCC66',
                '#FF0000',
                '#8B0000',
            ]},*/
        colorArr: {"ei":[
                '#023010',
                '#4e6c4a',
                '#81a27d',
                '#dbd0a6',
                '#c08d4b',
                '#a85031',
                '#8B0000',
            ]},
    }
  },
  methods: {
    created() {
      console.log("created called")
      this.queryDataCache("610000","2016","2017","");
      // this.queryMapDataCache()
    },
    handleMapCheckedChange() {
        this.isShowXzq = this.xuanranMap && this.radioArea != 3 ? true : false;
        console.log('this.isShowXzq',this.isShowXzq);
      // this.isShowXzq = this.xuanranMap && this.radioArea == 1 ? true : false;
      this.isShowEILegend = this.xuanranMap == 1 ? true : false;
      if (this.xuanranMap == 1) {
        this.LoadSxsjEI();
      }
      else {
        this.LoadSxQc();
      }
    },
    //  加载ei评价图
    LoadSxsjEI(){
      // console.log('JSON.stringify(this.hjjczzMapData)',JSON.stringify(this.hjjczzMapData))
      var xzq = this.xzqForm.xzq;
      var area = this.radioArea;
      var styleNotShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });
      console.log('xzq',xzq)
      if(xzq == "区县"){

        for(var i=0;i<this.sjFeatures.length;i++){
          this.sjFeatures[i].setStyle(styleNotShow);
        }
        for(var f=0;f<this.xjFeatures.length;f++){
          let pjNum = this.styleDt(area,"quxian",f).pjNum;
          let style = this.styleDt(area,"quxian",f).style;
          console.log('hhhhhhhhh')
          if(pjNum == "显著变好"){
            this.xjFeatures[f].setStyle(style[0]);
          }
          if(pjNum == "明显变好"){
            this.xjFeatures[f].setStyle(style[1]);
          }
          else if(pjNum == "略微变好"){
            this.xjFeatures[f].setStyle(style[2]);
          }
          else if(pjNum == "无明显变化"){
            this.xjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum == "略微变差"){
            this.xjFeatures[f].setStyle(style[4]);
          }
          if(pjNum == "明显变差"){
            this.xjFeatures[f].setStyle(style[5]);
          }
          if(pjNum == "显著变差"){
            this.xjFeatures[f].setStyle(style[6]);
          }
        }
      }
      else{
          for(var i=0;i<this.xjFeatures.length;i++){
              this.xjFeatures[i].setStyle(styleNotShow);
          }
        for(var f=0;f<this.sjFeatures.length;f++){
          let pjNum = this.styleDt(area,"shengshi",f).pjNum;
          let style = this.styleDt(area,"shengshi",f).style;
          if(pjNum == "显著变好"){
            this.sjFeatures[f].setStyle(style[0]);
          }
          if(pjNum == "明显变好"){
            this.sjFeatures[f].setStyle(style[1]);
          }
          else if(pjNum == "略微变好"){
            this.sjFeatures[f].setStyle(style[2]);
          }
          else if(pjNum == "无明显变化"){
            this.sjFeatures[f].setStyle(style[3]);
          }
          else if(pjNum == "略微变差"){
            this.sjFeatures[f].setStyle(style[4]);
          }
          if(pjNum == "明显变差"){
            this.sjFeatures[f].setStyle(style[5]);
          }
          if(pjNum == "显著变差"){
            this.sjFeatures[f].setStyle(style[6]);
          }
        }
      }
    },
    styleDt(area,xzqjb,f){
      var colorArr = this.colorArr["ei"];
      var style = this.StyleColor(colorArr);

      if(xzqjb=="shengshi"){
        var name = this.sjFeatures[f].N.NAME;
        // console.log('name',name)
      }
      else if(xzqjb=="quxian"){
        var name = this.xjFeatures[f].N.NAME;
      }
      for(var j=0;j<this.hjjczzMapData.length;j++){
        if(this.hjjczzMapData[j].name.indexOf(name)!= -1){
          var pjNum = this.hjjczzMapData[j].value;
        }
      }

      return {
        'pjNum': pjNum,
        'style': style
      };
    },
    StyleColor(colorArr){
      var style = [];
      for (var s=0;s<8;s++){
        style[s] =new ol.style.Style({
        //  stroke: new ol.style.Stroke({color: '#4690b3', width: 1}),
            stroke: new ol.style.Stroke({color: '#3b3f45', width: 0.3}),
          fill:new ol.style.Fill({
            color: colorArr[s]
          }),
        });
      }
      return style;
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
    async lunBo(){
      // autoRefreshSj:0,
      // isLunbo:false,
      this.isLunbo = ! this.isLunbo;
      if(this.isLunbo == true){
        document.getElementById("lunbo").innerText = "停止";
        this.autoRefreshSj = 0;
        window.clearInterval(this.intervalID);
        this.intervalID = window.setInterval(this.AutoRefreshSjCharts,2000);
      }
      else {
        document.getElementById("lunbo").innerText = "轮播";
        this.autoRefreshSj = 0;
        window.clearInterval(this.intervalID);
        if(this.OverlayVectorSource){
          this.OverlayVectorSource.clear();
        }else{
          return;
        }

      }

      // var LngLat = ol.proj.transform(e.coordinate, 'EPSG:3857' ,'EPSG:4326');
      // console.log("地图选中坐标："+e.coordinate);
      //
      // await this.refreshBigScreenCharts(e.coordinate);

    },
    AutoRefreshSjCharts(){
      // var proCoor = ol.proj.transform(this.sjCoordinate[this.autoRefreshSj], 'EPSG:4326' ,'EPSG:3857');
      //获取坐标
      var proCoor = this.sjCoordinate[this.selecttypeArr[this.radioArea]][this.autoRefreshSj];
      console.log("proCoor",proCoor);
      this.refreshBigScreenCharts(this.radioArea,proCoor);
      this.autoRefreshSj++;
      if(this.autoRefreshSj>this.sjCoordinate.length-1){
        this.autoRefreshSj = 0;
      }
    },
    // 初始化地图
    initMap() {
      this.gProjection = ol.proj.get('EPSG:4326');
      this.map = new ol.Map({
        controls: ol.control.defaults({ attribution: false, zoom: true, rotate: false }).extend([
        ]),
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
    //读取缓存的环境数据
    async queryDataCache(xzqdm,year0,year1,type){
      var params = {
        xzqdm:xzqdm,
        year0:year0,
        year1:year1,
        "type":type
      }
      await api.getStzkbhGrid1DataCache(params).then(res=>{
        var resultData = res.data;
        console.log("zjw",resultData)
        if(resultData) {
          if (resultData.status == "success") {
            this.barTdlybhData = resultData.data.grid1;
           // this.barStzkxqbhData = resultData.data.grid3;
              this.lineEIZSData = resultData.data.grid3;
            this.weathers = resultData.data.grid4;
            this.barSthjzsczData = resultData.data.grid5;
            this.barSwfdzsData = resultData.data.grid6;
            this.barZbfgzsData = resultData.data.grid7;
            this.barTdfgxpData = resultData.data.grid8;
            this.barWrfhzsData = resultData.data.grid9;
            this.barHjxzzsData = resultData.data.grid10;
            // this.SwmdzsLeftData=resultData.data.grid11;
            this.SwmdzsRightData = resultData.data.grid11;
            this.barTdzyjzData = resultData.data.grid2;
            this.barTdzyjzRightData = resultData.data.grid2R;
            this.hjjczzMapData = resultData.data.EIchange;
            console.log('this.hjjczzMapData',this.hjjczzMapData);
            if(this.valueMap == true){
              this.handleMapCheckedChange();
            }
          }
        }
      });
    },
    // async queryDataCache(){
    //   await api.getStzkbhDataCache({}).then(res=>{
    //     var resultData = res.data;
    //     if(resultData){
    //       if(resultData.status == "success"){
    //         console.log("转换成功");
    //         this.hjjczzData = resultData.data
    //         console.log("hjjczzData = " + JSON.stringify(this.hjjczzData))
    //         //默认未选中行政区状态下图标赋值
    //         // this.barTdlybhData = this.hjjczzData["shanxitdly"];
    //         // console.log("tu土地利用 = " ,JSON.stringify(this.hjjczzData["shanxitdly"]));
    //
    //         this.barSthjzsczData = this.hjjczzData["shanxisthjzscz"];
    //         this.barTdfgxpData = this.hjjczzData["shanxitdxpzs"];
    //         console.log("土地胁迫 = " ,JSON.stringify(this.hjjczzData["shanxitdxpzs"]));
    //
    //         // // this.barSwfdzsData = this.hjjczzData["shanxiswfdzs"];
    //         // this.SwmdzsLeftData = this.hjjczzData["shanxiswmdzsleft"];
    //         // this.SwmdzsRightData = this.hjjczzData["shanxiswmdzsright"];
    //         // this.lineEIZSData = this.hjjczzData["shanxieizs"];
    //         // // this.pieHjfhzsData = this.hjjczzData["shanxiwrfhzs"];
    //
    //         this.barZbfgzsData = this.hjjczzData["shanxizbfgzs"]
    //
    //
    //
    //         // this.weathers = this.hjjczzData["shanxieitj"];
    //         // console.log("这是一个EITJ",JSON.stringify(this.hjjczzData["shanxieitj"]));
    //       }
    //     }
    //   });
    // },
    //地图缩放事件
    onMapZoomHandler(e){
      var that = this;
      var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
      console.log(zoom);
      var styleShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: '#33a19c', width: 3}),
      });
      var styleNotShow = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 3}),
      });
      if(zoom > 7.2&&this.radioArea != 3){
        console.log("县级");
        this.isShiJi=false;
        this.isXianJi=true;
        if (this.valueMap == false){
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
      else if(zoom <= 7.2){
        console.log("市级");
        this.isShiJi=true;
        this.isXianJi=false;
        if (this.valueMap == false){
          if(this.xjFeatures){
            for(var i=0;i<this.xjFeatures.length;i++){
              this.xjFeatures[i].setStyle(styleNotShow);
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
      console.log("地图选中坐标："+e.coordinate);
        await this.refreshBigScreenCharts(this.radioArea,e.coordinate);

    },
    //点击后查询结果并刷新视图
    refreshBigScreenCharts(area,coordinate){
      var that = this;
      // 清除选择要素的样式
      if(that.OverlayVectorSource){
        that.OverlayVectorSource.clear();
      }else{
        return;
      }
      // 查询要素
      var selFeature = null;
      console.log('sjVectorSource',this.sjVectorSource)
      console.log('xjVectorSource',this.xjVectorSource)
      console.log('isShiJi',this.isShiJi)
      console.log('isXianJi',this.isXianJi)
      if(this.sjVectorSource && this.isShiJi){
        var features = that.sjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          document.getElementById("textI").innerHTML=selFeature.N.NAME;
        }
      }
      else if(this.xjVectorSource && this.isXianJi){
        var features = this.xjVectorSource.getFeaturesAtCoordinate(coordinate);
        if(features && features.length>0){
          selFeature = features[0].clone();
          document.getElementById("textI").innerHTML=selFeature.N.NAME;
/*          if(this.radioArea ==3){
            document.getElementById("textI").innerHTML=selFeature.N.NAME_1;
          }*/
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
console.log('selFeature',selFeature)
      if(selFeature && this.isShiJi){
        //this.DSJSXZDM = selFeature.N.BZ;
        if(area ==1){
          this.DSJSXZDM = selFeature.N["市代码"];
        }

        else if(area!=1)
        {
          this.DSJSXZDM="";
          this.selecttype=selFeature.N["NAME"];
        }
      }
      else if(selFeature && this.isXianJi){
        this.DSJSXZDM = selFeature.N.PAC;
        // this.selecttype = "";
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

/*      else{
        if(area==1)
        {
          this.DSJSXZDM ="610000";
        }else if(area==2)
        {
          this.DSJSXZDM="";
          this.selecttype="秦岭";
        }else if(area==3)
        {
          this.DSJSXZDM="";
          this.selecttype="全流域";
        }
      }*/
      //未选中时，全部显示陕西行政区数据
      else{
          if(area==1) {
              this.DSJSXZDM = "610000";
              this.selecttype = "";
          }
      }
      if(this.DSJSXZDM == "610000"){
        document.getElementById("textI").innerHTML="陕西省";
      }

      console.log("这是行政区代码"+this.DSJSXZDM);
      console.log('this.selecttype',this.selecttype);
      this.queryDataCache(this.DSJSXZDM,this.value0[0].year0,this.value1[0].year1,this.selecttype);
/*      if(this.selecttype ==""){
        this.queryDataCache(this.DSJSXZDM,this.value0[0].year0,this.value1[0].year1,this.selecttype);
      }
      else{
        this.queryDataCache("",this.value0[0].year0,this.value1[0].year1,this.selecttype);
      }*/


      // this.queryDataCache(this.DSJSXZDM,this.value0[0].year0,this.value1[0].year1,this.selecttype);

/*      if(this.DSJSXZDM!=""){
        var params = {
          xzqdm:this.DSJSXZDM,
          // xzqdm:"610000",
          year0:this.value0[0].year0,
          year1:this.value1[0].year1,
        }
        console.log("这是！！",params)

        await api.getStzkbhGrid1DataCache(params).then(res=>{
          var resultData = res.data;
          console.log("zjw",resultData)
          if(resultData.status == "success"){
            this.barTdlybhData=resultData.data.grid1;
            this.barStzkxqbhData=resultData.data.grid3;
            this.weathers=resultData.data.grid4;
            this.barSthjzsczData=resultData.data.grid5;
            this.barSwfdzsData=resultData.data.grid6;
            this.barZbfgzsData=resultData.data.grid7;
            this.barTdfgxpData=resultData.data.grid8;
            this.barWrfhzsData=resultData.data.grid9;
            this.barHjxzzsData=resultData.data.grid10;
            // this.SwmdzsLeftData=resultData.data.grid11;
            this.SwmdzsRightData=resultData.data.grid11;
            this.barTdzyjzData=resultData.data.grid2;
            this.barTdzyjzRightData=resultData.data.grid2R;
            this.hjjczzMapData = resultData.data.EIchange;
          }
        });
      }
      else{
        //未选中行政区
        console.log("当未选中区域！");
        var params = {
          xzqdm:610000,
          // xzqdm:"610000",
          year0:2017,
          year1:2018,
        }
        await api.getStzkbhGrid1DataCache(params).then(res=> {
          //   var resultData = res.data;
          //   console.log("zjw",resultData)
          //   if(resultData.status == "success"){
          //     this.barStzkxqbhData=resultData.data;
          //   }
          // });
          // this.barTdlybhData=resultData.data.
          var resultData = res.data;
          this.barTdlybhData=resultData.data.grid1;
          this.barStzkxqbhData=resultData.data.grid3;
          this.weathers=resultData.data.grid4;
          this.barSthjzsczData=resultData.data.grid5;
          this.barSwfdzsData=resultData.data.grid6;
          this.barZbfgzsData=resultData.data.grid7;
          this.barTdfgxpData=resultData.data.grid8;
          this.barWrfhzsData=resultData.data.grid9;
          this.barHjxzzsData=resultData.data.grid10;
          // this.SwmdzsLeftData=resultData.data.grid11;
          this.SwmdzsRightData=resultData.data.grid11;
          this.barTdzyjzData=resultData.data.grid2;
          this.barTdzyjzRightData=resultData.data.grid2R;
          this.hjjczzMapData = resultData.data.EIchange;

          that.isChartQuanSheng = true;
          that.isChartDiShi = false;
        });
      }*/
    },

    async getDiff0(){
      // console.log("zqq",this.value0)
      for(var t in this.years1)
      {
        var temp=this.years1[t];
        //temp是对象
        if(parseInt(this.value0[0].year0)>= parseInt(temp.value))
        {
          temp.disabled=true;
        }else
        {
          temp.disabled=false;
        }
      }
      await this.queryDataCache(this.DSJSXZDM,this.value0[0].year0,this.value1[0].year1,this.selecttype);

/*      var params = {

        xzqdm:this.DSJSXZDM,
        // xzqdm:"610000",
        year0:this.value0[0].year0,
        year1:this.value1[0].year1,

      }



      console.log("这是！！**",params)

      await api.getStzkbhGrid1DataCache(params).then(res=>{
        var resultData = res.data;
        console.log("zjw",resultData)
        if(resultData.status == "success"){
          this.barTdlybhData=resultData.data.grid1
          this.barStzkxqbhData=resultData.data.grid3;
          this.weathers=resultData.data.grid4;
          this.barSthjzsczData=resultData.data.grid5;
          this.barSwfdzsData=resultData.data.grid6;
          this.barZbfgzsData=resultData.data.grid7;
          this.barTdfgxpData=resultData.data.grid8;
          this.barWrfhzsData=resultData.data.grid9;
          this.barHjxzzsData=resultData.data.grid10;
          // this.SwmdzsLeftData=resultData.data.grid11;
          this.SwmdzsRightData=resultData.data.grid11;
          this.barTdzyjzData=resultData.data.grid2;
          this.barTdzyjzRightData=resultData.data.grid2R;
          this.hjjczzMapData = resultData.data.EIchange;
        }
        if(this.valueMap == true){
          this.handleMapCheckedChange();
        }
      });*/

    },

    async getDiff1(){

      await this.queryDataCache(this.DSJSXZDM,this.value0[0].year0,this.value1[0].year1,this.selecttype);

/*      var params = {
        xzqdm:this.DSJSXZDM,
        // xzqdm:"610000",
        year0:this.value0[0].year0,
        year1:this.value1[0].year1,
        "type":""
      }
      console.log("这是！！**",params)
      await api.getStzkbhGrid1DataCache(params).then(res=>{
        var resultData = res.data;
        console.log("zjw",resultData)
        if(resultData.status == "success"){
          this.barTdlybhData=resultData.data.grid1
          this.barStzkxqbhData=resultData.data.grid3;
          this.weathers=resultData.data.grid4;
          this.barSthjzsczData=resultData.data.grid5;
          this.barSwfdzsData=resultData.data.grid6;
          this.barZbfgzsData=resultData.data.grid7;
          this.barTdfgxpData=resultData.data.grid8;
          this.barWrfhzsData=resultData.data.grid9;
          this.barHjxzzsData=resultData.data.grid10;
          // this.SwmdzsLeftData=resultData.data.grid11;
          this.SwmdzsRightData=resultData.data.grid11;
          this.barTdzyjzData=resultData.data.grid2;
          this.barTdzyjzRightData=resultData.data.grid2R;
          this.hjjczzMapData = resultData.data.EIchange;
        }
        if(this.valueMap == true){
          this.handleMapCheckedChange();
        }
      });*/

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
    //加载县级流域geojson
    LoadSxxjbj(xjjson){
      // let json = require('../../assets/js/geojson/sxxjbjpro.json')
      let json = require('../../assets/js/geojson/' +xjjson);
      this.xjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
      });
      var style = new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(36, 91, 121, 0.0)'}),
        stroke: new ol.style.Stroke({color: 'rgba(36, 91, 121, 0.0)', width: 2}),
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
    //加载陕西地市边界geojson
    LoadSxdsjbj(jsonn){
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
      this.map.addLayer(this.sjVectorLayer);
    },
      //加载悬停图层
      initMoveOverlayVectorLayer(){
          this.moveOverlayVectorSource = new ol.source.Vector();
          this.moveOverlayVectorlayer = new ol.layer.Vector({
              source: this.moveOverlayVectorSource,
          });
          this.map.addLayer( this.moveOverlayVectorlayer );
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
        this.map.getView().setZoom(7.0);
        this.map.getView().setCenter([108.878,35.424]);
        this.selecttype = this.selecttypeArr[this.radioArea];

        console.log(this.isXzq)
        console.log(this.xzqForm.xzq)
      this.DSJSXZDM = "610000";
      this.selecttype = "";
      document.getElementById("textI").innerHTML="陕西省";

      // this.isShowSwitch = this.radioArea == 1 ? true : false;
      this.isShowLunbo = this.radioArea == 2 ? false : true;
      this.isXzqh = this.radioArea == 1 ? true : false;
      this.isQinling = this.radioArea == 2 ? true : false;
      this.isLiuyu = this.radioArea == 3 ? true : false;

        this.valueMap = false;

      if(this.radioArea == 3){
          this.isShowXzq = false;
/*                  this.isXzq = false;
        this.xzqForm.xzq = "地市";*/
      }

      // 清除选择要素的图层
      if(this.OverlayVectorLayer){
        // that.OverlayVectorLayer.clear();
        this.map.removeLayer(this.OverlayVectorLayer);
      }
      var dsjjson = "";
      var xjjson = "";


      if(this.radioArea == 1){
        this.isShowJjRkXuanran = true;
        dsjjson = "sxsj.json";
        xjjson = "sxxj.json";
        this.queryDataCache("610000",this.value0[0].year0,this.value1[0].year1,"");
      }
      else if(this.radioArea == 2){
        this.isShowJjRkXuanran = false;
        this.xuanranMap = 1;
        dsjjson = "sxqinling.json";
        xjjson = "sxqinlingfenxian.json";
        // this.queryDataCache("",this.value0[0].year0,this.value1[0].year1,"秦岭");
        this.queryDataCache("610000",this.value0[0].year0,this.value1[0].year1,"");
      }
      else if(this.radioArea == 3){
        this.isShowJjRkXuanran = false;
        this.xuanranMap = 1;
        dsjjson = "sxliuyu.json";
        xjjson = "sxliuyufenxian.json";
        // this.queryDataCache("",this.value0[0].year0,this.value1[0].year1,"全流域");
        this.queryDataCache("610000",this.value0[0].year0,this.value1[0].year1,"");
      }
      this.map.removeLayer(this.sjVectorLayer);
      this.map.removeLayer(this.xjVectorLayer);
      this.map.removeLayer(this.moveOverlayVectorlayer);
      //重新加载json
      this.LoadSxdsjbj(dsjjson);
      this.LoadSxxjbj(xjjson);
      this.LoadOverlayVectorLayer();
        this.initMoveOverlayVectorLayer();
        //是否渲染
        this.SelectMap();
      if(this.valueMap == true){
        this.handleMapCheckedChange();
      }
    },
    SelectMap(){
        // 关闭“地图渲染”按钮后，默认为地市级别
        if(this.valueMap == false){
                    this.isXzq = false;
        this.xzqForm.xzq = "地市";
        }


      if(this.valueMap == true && this.isShowSwitch == true){
        this.isShowXuanran = true;
        this.xuanranMap = 1;
      }
      else{
        this.isShowXuanran = false;
        this.xuanranMap = 0;
      }
/*      else if(this.valueMap == true && this.isShowSwitch == true){
        this.isShowXuanran = true;
        this.xuanranMap = 1;
      }*/
      this.handleMapCheckedChange();
    },
    SelectXzq(value){
      this.xzqForm.xzq = this.isXzq == false ? "地市" : "区县";
      console.log('this.xzqForm.xzq',this.xzqForm.xzq)
      this.LoadSxsjEI()
    },
    //测试
    test(){
      console.log("1");
      console.log("shanxisthjzs",shanxisthjzs);
    },
    //数据更新
/*    async dataUpdateNew(){
      var that = this;
      // var exResultData = {};

      var params = {
        xzqdm:that.DSJSXZDM,
        // xzqdm:"610000",
        year0:this.value0,
        year1:this.value1,
      }
      console.log("这是！！",params)

      await api.getStzkbhGrid1DataCache(params).then(res=>{
        var resultData = res.data;
        console.log("zjw",resultData)
        if(resultData.status == "success"){
          this.barTdlybhData=resultData.data;
        }
      });
      /!*   zjw测试后端传回grid03数据*!/
      // var params_test1 = {
      //   xzqdm:"610000",
      // }
      // await api.getStzkbhGrid3DataCache(params_test1).then(res=>{
      //   var resultData = res.data;
      //   console.log("zjw",resultData)
      //   if(resultData.status == "success"){
      //     this.barStzkxqbhData=resultData.data;
      //   }
      // });
      //   await api.getStzkbhData(params).then(res=>{
      //     console.log("res",res);
      //     var resultData = res.data;
      //     if(resultData){
      //       if(resultData.status == "success"){
      //         var stzkpjDataArr = resultData.data.oridata;
      //         exResultData = this.dataUpdateProcess(stzkpjDataArr,exResultData,key);
      //       }
      //     }
      //   });
      // // }
      // //结果数据写入
      // console.log("exResultData",exResultData);
      // var Params = {
      //   exResultData:JSON.stringify(exResultData),
      // }
      // await api.stzkbhDataUpdate(Params).then(res=>{
      //   var resultData = res.data;
      //   if(resultData){
      //     if(resultData.status == "success"){
      //       console.log("转换成功");
      //     }
      //   }
      // });
    },*/

    //数据更新数据处理函数
    dataUpdateProcess(resultDataArr,exResultData,type){
      for(var i=0;i<resultDataArr.length;i++){
        var resultData = resultDataArr[i];

        var name = XZQCodeProcess.XZQCodeJoin(resultData.xzqdm,type);
        var data ={};
        //为图表数据替换中文字段名
        for(var key1 in stzkpjTable.stzkbhTableArr[type]){
          if(type=="swmdzsleft"){
            data[stzkpjTable.stzkbhTableArr[type][key1]] = -resultDataArr[i][key1];
          }
          else{
            data[stzkpjTable.stzkbhTableArr[type][key1]] = resultDataArr[i][key1];
          }
        }
        console.log("name,data,type",name,data,type);
        var echartExData = this.echartsDataProcess(name,data,type);
        exResultData[name] = echartExData;
      }
      return exResultData;
    },
    //数据更新Echarts数据转换
    echartsDataProcess(name,data,type){

      if(type=="tdly" || type=="tdxpzs"|| type=="swfdzs" || type=="swmdzsleft" || type=="swmdzsright" || type=="zbfgzs"||type=="wrfhzs"){
        return ecahrtsExChange.normalBarExchange(name,data);
      }
      else if(type=="eizs"){
        return ecahrtsExChange.normalLineExchange(name,data);
      }
      else if(type=="wrfhzs1"){
        return ecahrtsExChange.normalPieExchange(name,data);
      }
      else if(type=="eitj"){
        return ecahrtsExChange.weatherExchange(name,data);
      }
    },
    init(){
      //初始化地图
      this.map = openlayerOperation.initMap('EPSG:4326',[12129470.527,4255685.289],6);
      openlayerOperation.addMapEvent(this.map,'moveend',this.onMapZoomHandler);
      openlayerOperation.addMapEvent(this.map,'singleclick',this.onMapSingleSelHandler);
    }
  },
  mounted() {
    // 初始化地图
    // this.init();
    this.initMap();
    //加载午夜蓝图
    this.LoadGaoDeMap();
    //加载天地图影像
    this.LoadTianDiTuMap();
    //加载县级json
    this.LoadSxxjbj('sxxj.json');
    //加载地市级json
    this.LoadSxdsjbj('sxsj.json');
      // 初始化悬停图层
      this.initMoveOverlayVectorLayer();
    //加载选中图层
    this.LoadOverlayVectorLayer();
    //加载数据
    this.created();
  },
  components: {
      lineEIZS,
    Box,
    mapBox,
    barTdlybh,
    pieStzkmj,
    barStzkxqbh,
    //barStzkgs,
    barTdfgxp,
    barStzkzs,
    barGDPAAREA,
    pieGDPZb,
    pieRkZb,
    WeaterItem,
    NewBoxDouble,

    barSwfdzs,
    barWrfhzs,
    barZbfgzs,
    pieHjfhzs,
    barSthjzscz,
    barHjxzzs,


    BarSwmdzsLeftNew,
    BarSwmdzsRightNew,
    barTdlyzy



  }
};
</script>

<style lang="scss" scoped>
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
}

.right-bar{
  .box:nth-child(1){
    flex: 1!important;
  }
  .box:nth-child(2){
    flex: 2;
    height: auto!important;
  }
}

.weater-box{
  padding: 0 10px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom:10px;
}
.rightBottom{
  //height:380px;
  box-sizing: border-box;
}

.rightbarTopZL1 /deep/ .el-collapse{
  border-top: 1px solid #2d9690;
}

.rightbarTopZL{
  height:282px;
  box-sizing: border-box;
  margin-bottom: 18px;
}
.center{
  .box:nth-child(1){
    flex: 3!important;
  }
  .box:nth-child(2){
    flex: 1;
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
  //.toolBarYearsSelect{
  //  position: absolute;
  //  top:20px;
  //  right: 100px;
  //  z-index: 1000;
  //  background-color: unset
  //}
  //.toolBarYearsSelect .el-button{
  //  width: 4px;
  //  border: 1px solid #2d9690;
  //  background-color: unset
  //}

  .toolBarYearsSelect{
    position: absolute;
    top:17px;
    right: 100px;
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
  .toolBarYearsSelect-toolBarYearsSelect_year /deep/.el-select-dropdown__item.hover, .el-select-dropdown__item:hover,.el-select-dropdown__item:hover {
    background-color: gainsboro;
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
    bottom:15px;
    left: 50px;
  }
  .toolBarRadioMap3{
    position: absolute;
    top:40px;
    left: 50px;
  }
/*  .toolBarRadioMap{
    position: absolute;
    bottom:15px;
    left: 50px;
  }
  .toolBarRadioMap /deep/ .el-switch__label{
    color: #fff;
    //font-size:28px;
  }
  .toolBarRadioMap /deep/ .el-switch__label *{
    //color: #fff;
    font-size:18px;
  }
  .toolBarRadioMap /deep/ .el-switch__label.is-active{
    color: #0b9e97 !important;
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
    bottom:50px;
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
    top:20px;
    right: 50px;
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

}
.el-collapse-item /deep/ .el-collapse-item__header{
  background: url("../../../src/assets/images/banner1.png") no-repeat;
  padding: 0;
  padding-left: 20px;
  //height: 38px;
  line-height: 26px;
  border: 1px solid #2d9690;
  background-color: rgba(255,255,255,0.0);
  color: #EEEEEE;

}
.el-collapse-item /deep/ .el-collapse-item__wrap{
  background-color: rgba(255,255,255,0.0);
  //
  border-bottom: 1px solid #2d9690;
  padding: 0px;
}
.toolBarLunBo{
  position: absolute;
  top:20px;
  right: 40px;
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
  //colorArr: {"ei":['#a82d1d','#de8e2c','#C0FF3E','#68ce00','#015501','#023010','#660010','#44000A']},}
 /* &:nth-child(1):before{
    background-color: rgb(2, 48, 16);
  }
  &:nth-child(2):before{
    background-color: rgb(8, 109, 10);
  }
  &:nth-child(3):before{
    background-color: rgb(0, 255, 0);
  }
  &:nth-child(4):before{
    //background-color: rgb(255, 100, 0);
      background-color: rgb(204,255,204);
  }
  &:nth-child(5):before{
    //background-color: rgb(177, 35, 10);
      background-color: rgb(255,204,102);
  }
  &:nth-child(6):before{
    background-color:rgb(255, 0, 0);
  }
  &:nth-child(7):before{
    background-color: rgb(147, 5, 26);
  }*/
    &:nth-child(1):before{
        background-color:#023010;
    }
    &:nth-child(2):before{
        background-color:#4e6c4a;
    }
    &:nth-child(3):before{
        background-color:#81a27d;
    }
    &:nth-child(4):before{
        background-color:#dbd0a6;
    }
    &:nth-child(5):before{
        background-color:#c08d4b;
    }
    &:nth-child(6):before{
        background-color:#a85031;
    }
    &:nth-child(7):before{
        background-color:#8B0000;
    }
}

//el-input /deep/ .el-input--small .el-input__inner {
//  background: red;
//}

</style>