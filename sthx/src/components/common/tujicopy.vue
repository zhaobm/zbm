<template>
  <div class="mainview">

<!--      三维球-->
      <div class="ys-absolute-container" id="map" style="overflow: hidden"></div>

    <!--    左侧-->
    <div class="leftdiv" id="left1" style="width:22%;flex-direction: row;transition:width 1s"  >
      <Box title="生态遥感图层" style="flex:1">
        <div id="boxlist1" class="boxlist" slot="content" >
          <p>陕西省生态遥感</p>
          <el-tree
              :data="stygLayerData"
              show-checkbox
              :default-expanded-keys="[1,11,111,112,12,121,122,13,131,132,14,141,142,2,21,22,23,24]"
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              @check-change="handleCheckChange">
            <!--            分别表示当前节点的 Node 对象和当前节点的数据-->
            <span  class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span >
<!--                只在2级节点显示check框-->
<!--                <el-checkbox  label="对比"
                              @change="checked=>Duibi(checked,node)"
                              v-if="data.level=='l2'" >
              </el-checkbox>-->
              </span>
            </span>
          </el-tree>


          <div style="margin-top:20px">
            <nav class="navLeft">

                <div>
                    <a href="#/mywrview" class="thistuji" ></a>
                    <!--  <el-button  class="thisheliu" ></el-button>-->
                </div>
                <router-link
                        :to="{name:'mywrview',params: {duibiName:this.duibiGroup}}">
                    <!--                使用params形式路由跳转，参数为键值对形式，{duibiName:this.duibiGroup}-->
                    <el-button type="primary" plain>返回面源污染
                    </el-button>
                </router-link>
            </nav>

            <!--            <el-image
                            style="width: 100px; height: 100px"
                            src="http://localhost:8013/hjcczzData/wyhc/2020/picture/610430-5/M610430201125005P.jpg" :fit='fill'></el-image>

                        <el-image class="image" v-for="(img,index) in imgArr" :src="img" v-bind:key= "img" :preview-src-list="getImgList(index)" ></el-image>
            &lt;!&ndash;            <el-button type="primary" @click="juanlian()"
                                   plain>卷帘</el-button>&ndash;&gt;
            &lt;!&ndash;            <el-button type="primary" @click="duopin()"
                                   plain>多屏</el-button>&ndash;&gt;-->
          </div>
        </div>
      </Box>
      <div class="leftdivbutton" @click="hide"></div>

    </div>

    <!--    底部：时间轴-->
    <div>
        <TimeAxis style="bottom: 80px;"class="timeAxis" title="时间轴" v-show="true" :timeDataNode="timeDataNode"
                  :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
    </div>

    <!--    图集-->
        <ImageDiv class="attribute" v-show="isShowAImage"
                  @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures"
                  :selectFeature="selectFeature" ></ImageDiv>
  </div>

</template>

<script>
import mapBox from "../../components/map/index.vue";//地图容器
import ol from 'openlayers';
import Box from "../../components/common/er/box";
import TimeAxis from "../../components/common/dataZoom";//时间轴
import juanlianBox from "../../components/common/duibi/juanlian.vue";//卷帘对比地图
import duopingBox from "../../components/common/duibi/duoping.vue";//多屏对比地图


import ImageDiv from "../../components/common/imageDiv/tuji.vue";
import url from  "../../assets/er/images/world1.jpg";//球初始贴图，用的静文的

import TujiName from "../../dataprocess/TujiNameExchange.js";
//图集容器

export default {
  name: "",
  data() {

    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }];
    return{
        imageUrl:url,
        year:'2019',
      isShowPureMap:true,
      jltext:'卷帘',
      dptext:'多屏',
      isopenjl:true,
      isopendp:true,
      data: JSON.parse(JSON.stringify(data)),

      stygLayerData: [{
        id: 1,
        level:'l1',//节点所在层级
        type:'agr',//生态遥感类型
        label: '农田径流',
        children: [{
          id: 11,
          level:'l2',
          label: '总磷',
          children: [{
            id: 111,
            label: '入河负荷'
          }, {
            id: 112,
            label: '排放负荷'
          }]
        },{
          id: 12,
          level:'l2',
          label: '总氮',
          children: [{
            id: 121,
            label: '入河负荷'
          }, {
            id: 122,
            label: '排放负荷'
          }]
        },{
          id: 13,
          level:'l2',
          label: '氨氮',
          children: [{
            id: 131,
            label: '入河负荷'
          }, {
            id: 132,
            label: '排放负荷'
          }]
        },{
          id: 14,
          level:'l2',
          label: '化学需氧量',
          children: [{
            id: 141,
            label: '入河负荷'
          }, {
            id: 142,
            label: '排放负荷'
          }]
        }
        ]
      },{
        id: 2,
        level:'l1',//节点所在层级
        type:'Cattle',//生态遥感类型
        label: '畜禽养殖',
        children: [{
          id: 21,
          level:'l2',
          label: '总磷',
          children: [{
            id: 211,
            label: '入河负荷'
          }, {
            id: 212,
            label: '排放负荷'
          }]
        },{
          id: 22,
          level:'l2',
          label: '总氮',
          children: [{
            id: 221,
            label: '入河负荷'
          }, {
            id: 222,
            label: '排放负荷'
          }]
        },{
          id: 23,
          level:'l2',
          label: '氨氮',
          children: [{
            id: 231,
            label: '入河负荷'
          }, {
            id: 232,
            label: '排放负荷'
          }]
        },{
          id: 24,
          level:'l2',
          label: '化学需氧量',
          children: [{
            id: 241,
            label: '入河负荷'
          }, {
            id: 242,
            label: '排放负荷'
          }]
        }
        ]
      },{
          id: 3,
          level:'l1',//节点所在层级
          type:'Cattle',//生态遥感类型
          label: '城市径流',
          children: [{
              id: 31,
              level:'l2',
              label: '总磷',
              children: [{
                  id: 311,
                  label: '入河负荷'
              }, {
                  id: 312,
                  label: '排放负荷'
              }]
          },{
              id: 32,
              level:'l2',
              label: '总氮',
              children: [{
                  id: 321,
                  label: '入河负荷'
              }, {
                  id: 322,
                  label: '排放负荷'
              }]
          },{
              id: 33,
              level:'l2',
              label: '氨氮',
              children: [{
                  id: 331,
                  label: '入河负荷'
              }, {
                  id: 332,
                  label: '排放负荷'
              }]
          },{
              id: 34,
              level:'l2',
              label: '化学需氧量',
              children: [{
                  id: 341,
                  label: '入河负荷'
              }, {
                  id: 342,
                  label: '排放负荷'
              }]
          }
          ]
      },{
          id: 4,
          level:'l1',//节点所在层级
          type:'Cattle',//生态遥感类型
          label: '农村生活',
          children: [{
              id: 41,
              level:'l2',
              label: '总磷',
              children: [{
                  id: 411,
                  label: '入河负荷'
              }, {
                  id: 412,
                  label: '排放负荷'
              }]
          },{
              id: 42,
              level:'l2',
              label: '总氮',
              children: [{
                  id: 421,
                  label: '入河负荷'
              }, {
                  id: 422,
                  label: '排放负荷'
              }]
          },{
              id: 43,
              level:'l2',
              label: '氨氮',
              children: [{
                  id: 431,
                  label: '入河负荷'
              }, {
                  id: 432,
                  label: '排放负荷'
              }]
          },{
              id: 44,
              level:'l2',
              label: '化学需氧量',
              children: [{
                  id: 441,
                  label: '入河负荷'
              }, {
                  id: 442,
                  label: '排放负荷'
              }]
          }
          ]
      },{
          id: 5,
          level:'l1',//节点所在层级
          type:'Cattle',//生态遥感类型
          label: '水土流失',
          children: [{
              id: 51,
              level:'l2',
              label: '总磷',
              children: [{
                  id: 511,
                  label: '入河负荷'
              }, {
                  id: 512,
                  label: '排放负荷'
              }]
          },{
              id: 52,
              level:'l2',
              label: '总氮',
              children: [{
                  id: 521,
                  label: '入河负荷'
              }, {
                  id: 522,
                  label: '排放负荷'
              }]
          },{
              id: 53,
              level:'l2',
              label: '氨氮',
              children: [{
                  id: 531,
                  label: '入河负荷'
              }, {
                  id: 532,
                  label: '排放负荷'
              }]
          },{
              id: 54,
              level:'l2',
              label: '化学需氧量',
              children: [{
                  id: 541,
                  label: '入河负荷'
              }, {
                  id: 542,
                  label: '排放负荷'
              }]
          }
          ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isDiejiaShow:true,
      duibiGroup:[],

      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,

      //图集浮动容器
      isShowAImage:false,
      floatDivTitleImageurl:"",
      AttrFeatures:{
        featureArr: {},
        totalCount:0,
      },
      selectFeature : {},


    }
  },
  mounted() {




    //  初始化地图
    this.initMap(3);
    //加载午夜蓝图
    this.LoadGaoDeMap();
    //加载天地图影像
    this.LoadTianDiTuMap();

    //加载省地市级别json
    this.LoadSxdsj('sxsj.json');

    // this.isopenjl = true;
    this.isopenjl = false;
    // this.isopendp = true;
    this.isopendp = false;
      this.timeDataArray = [
/*          { url: [] , year: 2016 },
          { url: [] , year: 2017 },
          { url: [] , year: 2018 },*/
          { url: [] , year: 2019 },
          // { url: [] , year: 2020 },
      ];

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
    //判断是否弹出/隐藏容器
    ifChangeHide(){
      if(!this.isopenjl && !this.isopendp){
        this.hide();
      }
    },
    //弹出/隐藏容器
    hide(){
      var div1=document.getElementById("left1");

      if(div1.style.width=="22%")
      {
        div1.style.width="0px";

      }else
      {

        div1.style.width="22%";
      }

    },
    handleCheckChange(data, checked, indeterminate) {
      //鼠标选中的节点，而非它的父节点（显示为选中状态）
      if(checked == true){
        console.log('当前节点data',data);
        console.log('checked', checked);//是否是鼠标选中节点
        console.log('indeterminate', indeterminate);//当前节点是否有子节点

        this.$refs.tree.setCheckedNodes([data]);//实现将多选转为单选的功能

        let idnum = data.id;//id是三位数字

        //  根据idnum找到每一层的内容
          var numL3 = Math.floor(idnum%10);//个位数字
          idnum = Math.floor(idnum/10);//前两位数字
          var numL2 = Math.floor(idnum%10);//十位数字
          var numL1 = Math.floor(idnum/10);//百位数字

          let level1Arr = ['agr','Cattle','Urban','Cou','E','total'];
          let level2Arr = ['TP','TN','NH4-N','COD'];
          let level3Arr = ['into','product'];

          //strName即根据第三级的id拼接字符串。如2019年id 121 对应字符串 agr_TN_into_2019
          var strName = level1Arr[numL1-1]+'_'+level2Arr[numL2-1]+'_'+level3Arr[numL3-1]+'_'+this.year;
          var tujiname = TujiName.TujiCodeEN[strName];//js索引表查询字符串对应图集名称

          //开闭指定图集
          if(tujiname){
              //floatDivTitleImageurl图片地址
              this.isShowAImage = true;
              // this.floatDivTitleImageurl = "http://localhost:8080/Pictures/工业.jpg";
              if(level1Arr[numL1-1] == 'total'){
                  this.floatDivTitleImageurl = "http://localhost:8013/hjjczz2Data/tuji/图集"
                      +this.year+"/total/"+tujiname+".jpg";
                  console.log('here0 this.floatDivTitleImageurl',this.floatDivTitleImageurl);
              }
              else{
                  this.floatDivTitleImageurl = "http://localhost:8013/hjjczz2Data/tuji/图集"
                      +this.year+"/type/"+level3Arr[numL3-1]+"/"+tujiname+".jpg";
                  console.log('this.floatDivTitleImageurl',this.floatDivTitleImageurl);
              }
          }
          else{
              this.isShowAImage = false;
              console.log('没有对应图集');
              console.log(tujiname)
          }

          /*let nameL1ArrCN = ['农田径流','畜禽养殖','城市径流','农村生活','水土流失'];

          for(var i=0;i<this.nameL1ArrCN.length;i++){

          };*/


      }

    },
    handleNodeClick(data) {
      console.log(data);
    },


    OpenPicture(){
      //floatDivTitleImageurl图片地址
      this.isShowAImage = true;
      console.log(this.isShowAImage)
      // this.floatDivTitleImageurl = "http://localhost:8080/Pictures/工业.jpg";
      this.floatDivTitleImageurl = "http://localhost:8013/hjcczzData/wyhc/2020/picture/610430-5/M610430201125005P.jpg";
      // this.isopenjl = !this.isopenjl;
    },

    CloseImage(){
      if(this.isShowAImage){
        this.isShowAImage = false;
      }
    },



      // 初始化地图
      initMap(weidu) {
          if (weidu == 2) {
              this.map = new ol.Map({
                  controls: ol.control.defaults({attribution: false, zoom: true, rotate: false}).extend([]),
                  target: 'cesiumContainer',
                  view: new ol.View({
                      //extent: [-20026376.39,-20048966.10,20026376.39,20048966.10],
                      projection: this.gProjection,
                      //resolutions: this.gResolutions,
                      center: [12149145.114081362, 4316266.289],
                      zoom: 8
                  })
              });
              this.LoadGaoDeMap();
          } else {
              this.app = new YsCesium("map",{
                  imageryProvider: new Cesium.SingleTileImageryProvider({
                      url: this.imageUrl
                  }),
                  /* terrainProvider:new Cesium.CesiumTerrainProvider({
                           url: 'http://localhost:8013/terrain'
                   })*/
              });

              this.viewer =  this.app.viewer;
              // 去除版权信息
              this.viewer._cesiumWidget._creditContainer.style.display = 'none';
              Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
          }
      },

    //鼠标缩放事件
    onMapZoomHandler(){

    },
    //鼠标悬停事件
    onMapMoveHandler(){

    },
    //地图单击事件
    onMapSingleSelHandler(){

    },

    //加载地市级边界json
    //加载剪辑县级geojson，通过分级设色实现
    LoadSxdsj(jsonn){
      let json = require('../../assets/js/geojson/' +jsonn);
      this.sjFeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:4326',
        featureProjection : 'EPSG:4326'
      });
      //使用params形式路由跳转，采纳数为键值对形式
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
            //
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


    //时间轴切换
    alterMapByYear(year,url){
      console.log("year",year);
      this.year = year;

      /*      //时间切换时，县域类型也变化（18年以前是41县，以后是43个）
            var numYear = parseInt(year);//字符串转数字
            this.xianyuLeixing = (numYear <= 2018) ? '41xianyu' : '43xianyu';
            console.log('this.xianyuLeixing',this.xianyuLeixing);
            this.loadXianyu();

            //执行 参数为时间的 数据获取函数
            this.getYearPoi(this.year);
            this.getGrid01(this.year,this.xzq);*/

    },

    //叠加分析图斑定位_zjw
    locate(data){
      var id=data.id;
      var feature=this.vectorSource.getFeatureById(id);
      this.zoomToExtent(feature.getGeometry().getExtent());
    },


  },

  components: {
    mapBox,
    Box,
    TimeAxis,//时间轴
    ImageDiv,
    juanlianBox,//卷帘地图
    duopingBox,//多屏地图
  },

};

</script>

<style scoped lang="scss">

.mainview{
  width: 100%;
  height: 95%;
}
.boxlist{
  margin-top: 12px;
  width: 100%;
  height:90%;
  overflow:hidden;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  transition:scrollTop 1s;

}
.el-tree {
  position: relative;
  cursor: default;
  background: rgba(1,1,1,0);
  color: #ffffff;
}
/deep/ .el-tree-node:focus>.el-tree-node__content{
  background-color: #5daaf0;   //背景色
}
/deep/ .el-tree-node__content {
  &:hover {
    background: #66b1ff87;
  }
}
/deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #175fa1;
}
/deep/ .el-tree-node__label {
  width: auto;
  margin-top: 12px;
  float: right;
  font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #d41414;
  line-height: 25px;
  letter-spacing: 1px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  // background-color: #87dfd7;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.leftdivbutton{
  position:absolute;top:3.3%;right:-15px;height: 40px;width:40px;
  background-color:#d800d8;
  background: url("../../assets/er/images/方推拉.png");
  background-size:100% 100%;
}

.thistuji{
    height: 40px;width:40px;margin-left:20px;margin-top: -10px;
    background: url('../../assets/er/images/图册.png');background-size: 100% 100%
}

</style>
