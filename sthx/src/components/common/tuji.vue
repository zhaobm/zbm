<template>
  <div class="mainview">
      <div  id="cesiumContainer"></div>
<!--      三维球-->
<!--      <div class="ys-absolute-container" id="map" style="overflow: hidden"></div>-->

    <!--    左侧-->
    <div class="leftdiv" id="left1" style="width:22%;flex-direction: row;transition:width 1s"  >
      <Box title="生态遥感图层" style="flex:1">
        <div id="boxlist1" class="boxlist" slot="content" >
<!--          <p>陕西省生态遥感</p>-->
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

              </span>
            </span>
          </el-tree>


          <div style="margin-top:20px">

          </div>
        </div>
      </Box>
      <div class="leftdivbutton" @click="hide"></div>

    </div>

  </div>

</template>

<script>

import ol from 'openlayers';
import Box from "../../components/common/er/box";
import ImageDiv from "../../components/common/imageDiv/tuji.vue";
import url from  "../../assets/er/images/world1.jpg";//球初始贴图，用的静文的
import TujiName from "../../dataprocess/TujiNameExchange.js";
//图集容器

export default {
  name: "",
  data() {

    const data = [
        {
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
        viewer :'',
        op111:'',
        tileset: '',
        imageUrl:url,
        year:'2019',
      isShowPureMap:true,
      jltext:'卷帘',
      dptext:'多屏',
      isopenjl:true,
      isopendp:true,
      // data: JSON.parse(JSON.stringify(data)),

      stygLayerData: [
          {
        id: 1,
        level:'l1',//节点所在层级
        type:'agr',//生态遥感类型
        label: '图层数据',
        children: [
            {
          id: 11,
          level:'l2',
          label: '灾难撤离',
          children: [{
            id: 111,
            label: '地灾点'
          }, {
            id: 112,
            label: '撤离点'
          }]
        },{
          id: 12,
          level:'l2',
          label: '保护区',
          children: [{
            id: 121,
            label: '核心保护区'
          }, {
            id: 122,
            label: '重点保护区'
          }, {
              id: 123,
              label: '一般保护区'
          }]
        },{
          id: 13,
          level:'l2',
          label: '保护站',
          children: [{
            id: 131,
            label: '一级保护站'
          }, {
            id: 132,
            label: '二级保护站'
          }, {
              id: 133,
              label: '三级保护站'
          }, {
              id: 134,
              label: '保护站范围'
          }]
        },{
          id: 14,
          level:'l2',
          label: '生态数据',
          children: [{
            id: 141,
            label: '生态红线'
          }, {
            id: 142,
            label: '大熊猫保护区'
          }, {
              id: 143,
              label: '大熊猫保护区'
          }, {
              id: 144,
              label: '甘峪水库保护区'
          }, {
              id: 145,
              label: '羚牛保护区'
          }, {
              id: 146,
              label: '森林公园'
          }, {
              id: 147,
              label: '细鳞蛙保护区'
          }]
        },{
            id: 15,
            level:'l2',
            label: '旅游',
            children: [{
                id: 151,
                label: '民宿'
            }, {
                id: 152,
                label: '农家乐'
            }]
        },
            {
                id: 16,
                level:'l2',
                label: '基础图层',
                children: [{
                    id: 161,
                    label: '影像'
                }]
            }
        ]
      }
      ],
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
      // isShowAImage:false,
      // floatDivTitleImageurl:"",
      // AttrFeatures:{
      //   featureArr: {},
      //   totalCount:0,
      // },
      // selectFeature : {},


    }
  },
  mounted() {



this.initMap();


    // this.isopenjl = true;
    // this.isopenjl = false;
    // this.isopendp = true;
    // this.isopendp = false;


  },
  computed: {

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

        let dzd = require("../../assets/js/geojson/huyiGeoJson/dizaidian/dzd.json");
        let cld = require("../../assets/js/geojson/huyiGeoJson/yingjichelidian/yjd.json");
       let hxbhq = require("../../assets/js/geojson/huyiGeoJson/baohuqu/hexinbhq.json");
       let ybbhq = require("../../assets/js/geojson/huyiGeoJson/baohuqu/yibanbhq.json");
       let zdbhq = require("../../assets/js/geojson/huyiGeoJson/baohuqu/zhongdianbhq.json");
       let yjbhz = require("../../assets/js/geojson/huyiGeoJson/baohuzhan/yjbhz");
       let ejbhz = require("../../assets/js/geojson/huyiGeoJson/baohuzhan/ejbhz");
       let sjbhz = require("../../assets/js/geojson/huyiGeoJson/baohuzhan/sjbhz");
       let bhzfw = require("../../assets/js/geojson/huyiGeoJson/baohuzhan/bhzfw");
       let sthx = require("../../assets/js/geojson/huyiGeoJson/shengtaihongxian/sthx");
       let daxiongmao = require("../../assets/js/geojson/huyiGeoJson/shengtaishuju/dxmbhq");

       let minsu = require("../../assets/js/geojson/huyiGeoJson/lvyou/minsu");
       let njl = require("../../assets/js/geojson/huyiGeoJson/lvyou/nongjiale");


       //鼠标选中的节点，而非它的父节点（显示为选中状态）
      if(checked == true){
        console.log('打开当前节点data',data.label,data.id);
         if(data.id==111){
          this.op111 =window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(dzd,{
              clampToGround: true,
              markerColor: Cesium.Color.DARKORCHID
          }));
         }else if(data.id==112){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(cld,{
                 clampToGround: true,
                 markerColor: Cesium.Color.CORAL
             }));
         }else if(data.id==121){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(hxbhq,{clampToGround: true}));
         }else if(data.id==122){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(ybbhq,{clampToGround: true}));
         }else if(data.id==123){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(zdbhq,{clampToGround: true}));
         }else if(data.id==131){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(yjbhz,{
                 clampToGround: true,
                 markerColor:Cesium.Color.FORESTGREEN

             }));
         }else if(data.id==132){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(ejbhz,{
                 clampToGround: true,
                 markerColor:Cesium.Color.LIMEGREEN

             }));
         }else if(data.id==133){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(sjbhz,{
                 clampToGround: true,
                 markerColor:Cesium.Color.LIME

             }));
         }else if(data.id==134){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(bhzfw,{
                 }));
         }else if(data.id==141){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(sthx,{clampToGround: true}));
         }else if(data.id==142){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(daxiongmao,{clampToGround: true}));
         }else if(data.id==151){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(minsu,{clampToGround: true}));
         }else if(data.id==152){
             window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(njl,{clampToGround: true}));
         }else if(data.id==161){
             let layer= window.viewer.scene.imageryLayers.addImageryProvider(   //lab切的影像图
               new Cesium.UrlTemplateImageryProvider({
                     url: '../../assets/data/diouaimu2/{z}/{x}/{y}.png',
                     fileExtension: "png"
                 }),

             );
             window.viewer.imageryLayers.addImageryProvider(layer)
         }



      }else{
          console.log('关闭当前节点data',data.label,data.id);
          window.viewer.dataSources.removeAll();
          if(data.id==111){
              window.viewer.dataSources.removeAll();
          }
      }

    },





      // 初始化地图
      initMap() {
          // // 创建viewer实例
          var viewer = new Cesium.Viewer('cesiumContainer',{
              animation: false, // 是否显示动画控件
              timeline: false, // 是否显示时间线控件
              homeButton: false, // 是否显示Home按钮
              sceneModePicker: false, // 是否显示投影方式控件
              navigationHelpButton: false, // 是否显示帮助信息控件
              baseLayerPicker: false, // 是否显示图层选择控件
              geocoder: false, // 是否显示地名查找控件
              //加载单张图片为影像服务(给球表面贴一张图)
              imageryProvider:  new  Cesium.SingleTileImageryProvider({
                  // credit: "",
                  url:  this.imageUrl
              }),
              // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
              //     url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
              //         "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
              //         "&style=default&format=tiles&tk=90a854bda5310b106a44366e7baf4abd", //矢量地图
              //     // url: TDTURL_CONFIG.TDT_IMG_C,
              //     layer: "tdtImg_c",
              //     style: "default",
              //     format: "tiles",
              //     tileMatrixSetID: "c",
              //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              //     tilingScheme: new Cesium.GeographicTilingScheme(),
              //     tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
              //     maximumLevel: 18,
              //     show: false
              // })
          });
          viewer._cesiumWidget._creditContainer.style.display = 'none',
              //设置初始位置
              viewer.camera.flyTo({
                  destination: Cesium.Cartesian3.fromDegrees(108.6138, 34.1238, 6000),
                  orientation: {
                      heading: Cesium.Math.toRadians(-180.0), // 方向
                      pitch: Cesium.Math.toRadians(-20.0),// 倾斜角度
                      roll: 0,
                  }
              });
              window.viewer = viewer;
          // console.log('init window.viewer',window.viewer);
      },










  },

  components: {
    // mapBox,
    Box,
    // TimeAxis,//时间轴
    // ImageDiv,
    // juanlianBox,//卷帘地图
    // duopingBox,//多屏地图
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
