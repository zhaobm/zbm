<template>
  <div class="mainview">
<!--    背景：地图容器-->
    <mapBox />
<!--    <mapBox v-show="!isopenjl && !isopendp"/>-->
    <juanlianBox v-show="isopenjl" :isopenjl= "isopenjl" :duibiGroup= "duibiGroup"/>
    <duopingBox v-show="isopendp" :isopendp= "isopendp" :duibiGroup= "duibiGroup"/>

<!--    左侧-->
    <div class="leftdiv" id="left1" style="width:22%;flex-direction: row;transition:width 1s"  >
      <Box title="生态遥感图层" style="flex:1">
        <div id="boxlist1" class="boxlist" slot="content" >
          <p>陕西省生态遥感</p>
          <el-tree
              :data="stygLayerData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              :check-strictly="true"
              highlight-current
              :default-checked-keys="[11]"
              :props="defaultProps"
              @check-change="handleCheckChange"
              @node-click="handleNodeClick">
            <!--            分别表示当前节点的 Node 对象和当前节点的数据-->
            <span  class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span >
<!--                只在2级节点显示check框-->
                <el-checkbox  label="对比"

                              @change="checked=>Duibi(checked,node)"
                              v-if="data.level=='l2'" >
              </el-checkbox>
              </span>
            </span>
          </el-tree>


          <div style="margin-top:20px">
            <nav class="navLeft">

<!--              1.本页面点击跳转的方式（卷帘/多屏）-->
              <el-button type="primary" plain @click="OpenPicture()">
                图集
              </el-button>
              <el-button v-show="(this.duibiGroup.length==2) || (this.isopenjl == true)" type="primary" plain @click="ifChangeHide();ifRemoveDbLayer();isopenjl=!isopenjl">
                {{jltext=isopenjl?'取消卷帘':'卷帘对比'}}
              </el-button>
<!--              仅当选择两期、四期影像，并且未打开卷帘界面时，才显示多屏按钮-->
              <el-button v-show="this.duibiGroup.length==2 || this.duibiGroup.length==4 || (this.isopendp == true)" type="primary" plain @click="ifChangeHide();ifRemoveDbLayer();isopendp=!isopendp">
                {{dptext=isopendp?'取消多屏':'多屏对比'}}
              </el-button>

<!--              2.换页面路由跳转形式（卷帘/多屏）
              <router-link
                  :to="{name:'juanlian',params: {duibiName:this.duibiGroup}}">
&lt;!&ndash;                使用params形式路由跳转，参数为键值对形式，{duibiName:this.duibiGroup}&ndash;&gt;
                <el-button type="primary" plain>{{jltext}}
                </el-button>
              </router-link>
              <router-link
                  :to="{name:'duoping',params: {duibiName:this.duibiGroup}}">
                &lt;!&ndash;                使用params形式路由跳转，参数为键值对形式，{duibiName:this.duibiGroup}&ndash;&gt;
                <el-button type="primary" plain>
                  多屏
                </el-button>
              </router-link>-->
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
          <TimeAxis style="bottom: 180px;"class="timeAxis" title="时间轴" v-show="true" :timeDataNode="timeDataNode"
                    :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
      </div>

<!--    图集-->
<!--    <ImageDiv class="attribute" v-show="isShowAImage"
              @closeDiv = "CloseImage" :url ="floatDivTitleImageurl" :featuredata="AttrFeatures"
              :selectFeature="selectFeature" ></ImageDiv>-->
  </div>

</template>

<script>
import mapBox from "../../components/map/index.vue";//地图容器
import ol from 'openlayers';
import Box from "../../components/common/er/box";
import TimeAxis from "../../components/common/dataZoom";//时间轴
import juanlianBox from "../../components/common/duibi/juanlian.vue";//卷帘对比地图
import duopingBox from "../../components/common/duibi/duoping.vue";//多屏对比地图


import ImageDiv from "../../components/common/imageDiv/tuji.vue";//图集容器
import url from  "../../assets/er/images/world2.jpg";//初始贴图
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
        isduibi:false,
      isShowPureMap:true,
      jltext:'卷帘',
      dptext:'多屏',
      isopenjl:true,
      isopendp:true,
      data: JSON.parse(JSON.stringify(data)),
      stygLayerData: [{
        id: 1,
        level:'l1',//节点所在层级
        type:'tdly',//生态遥感类型
        label: '土地利用',
        children: [{
          id: 11,
          level:'l2',
          label: '2016',
/*          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]*/
        },{
          id: 12,
          level:'l2',
          label: '2017',
        },{
          id: 13,
          level:'l2',
          label: '2018',
        },{
          id: 14,
          level:'l2',
          label: '2019',
        },{
          id: 15,
          level:'l2',
          label: '2020',
        },
        ]
      }, {
        id: 2,
        level:'l1',
        type:'trqs',//生态遥感类型
        label: '土壤侵蚀',
        children: [{
          id: 21,
          level:'l2',
          label: '2016',
          /*          children: [{
                      id: 9,
                      label: '三级 1-1-1'
                    }, {
                      id: 10,
                      label: '三级 1-1-2'
                    }]*/
        },{
          id: 22,
          level:'l2',
          label: '2017',
        },{
          id: 23,
          level:'l2',
          label: '2018',
        },{
          id: 24,
          level:'l2',
          label: '2019',
        },{
          id: 25,
          level:'l2',
          label: '2020',
        },
        ]
      }, {
        id: 3,
        level:'l1',
        type:'zbfg',//生态遥感类型
        label: '植被覆盖',
        children: [{
          id: 31,
          level:'l2',
          label: '2016',
          /*          children: [{
                      id: 9,
                      label: '三级 1-1-1'
                    }, {
                      id: 10,
                      label: '三级 1-1-2'
                    }]*/
        },{
          id: 32,
          level:'l2',
          label: '2017',
        },{
          id: 33,
          level:'l2',
          label: '2018',
        },{
          id: 34,
          level:'l2',
          label: '2019',
        },{
          id: 35,
          level:'l2',
          label: '2020',
        },
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
        // imageUrl:url,
        imageUrl:require("../../assets/er/images/world2.jpg"),//初始贴图


    }
  },
  mounted() {


  //  初始化地图
    this.initMap();
    //加载午夜蓝图
    // this.LoadGaoDeMap();
    //加载天地图影像
    // this.LoadTianDiTuMap();
      //加载选中图层
      // this.LoadOverlayVectorLayer();
/*      this.addtdlylayerGroup();
     this.addTRQSlayergroup();*/
      this.addwmtslayerGroup();

    //加载省地市级别json
    this.LoadSxdsj('sxsj.json');

    this.isopenjl = false;
    this.isopendp = false;

      this.timeDataArray = [
          { url: [] , year: 2016 },
          { url: [] , year: 2017 },
          { url: [] , year: 2018 },
          { url: [] , year: 2019 },
          { url: [] , year: 2020 },
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
    //判断是否弹出/隐藏图层列表
    ifChangeHide(){
      if(!this.isopenjl && !this.isopendp){
        this.hide();
      }
      else{
          this.duibiGroup = [];
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
      //点击取消卷帘/多屏时，清空duibiGroup
      ifRemoveDbLayer(){

          if(this.isopenjl || this.isopendp){
              console.log('RemoveDbLayer')
              this.duibiGroup = [];
          }
      },
    //  tree选中状态切换时，使其变为单选
    handleCheckChange(data, checked, indeterminate) {
      //鼠标选中的节点，而非它的父节点（显示为选中状态）
      if(checked){
        console.log('当前节点data.id',data.id);
        console.log('checked', checked);//是否是鼠标选中节点
        console.log('indeterminate', indeterminate);//当前节点是否有子节点
          this.$refs.tree.setCheckedNodes([data]);
          let node = this.$refs.tree.getNode(data);
          console.log('node',node);

          let type = node.parent.data.type;
          let year = node.data.label.substring(0,4);
          let layerName = type+year;
          if(layerName == 'tdly2016'|| layerName == 'tdly2017'){
              layerName = layerName+'2';
          }
          var layerarray=this.layerGroup.getLayers().getArray();
          console.log('layerarray',layerarray);

          for(var i=0;i<layerarray.length;i++)
          {
              var element =layerarray[i].N.title;

              if(element==layerName)
              {
                  console.log('element',element);
                  layerarray[i].setVisible(true);
              }
              else
              {
                  layerarray[i].setVisible(false);
              }
          }

      }

    },
      //@node-click该命令没有生效
      handleNodeClick(data,node) {
        console.log('here handleNodeClick')
    },
      ifChecked(){
        console.log('haha')
        if(this.duibiGroup == ['tdly2018']){
            console.log('here')
            var ischecked = false;
        }
        return true;
      },
    //加入对比
    Duibi(boolean,node){
      // console.log('boolean,val',boolean,val1);
      let type = node.parent.data.type;
      let year = node.data.label.substring(0,4);
      let layerName = type+year;
      console.log('this.isduibi',this.isduibi);
      if(layerName == 'tdly2016'|| layerName == 'tdly2017'){
          layerName = layerName+'2';
      }
      if(boolean)//选中状态
      {
        this.duibiGroup.push(layerName);
        console.log('对比数组内容',this.duibiGroup)
      }else
      {
        this.duibiGroup.remove(layerName);
        console.log('移除对比数组内容',this.duibiGroup)
      }
    },
    juanlian(){
      // vue router打开新页面并传递参数
      var routeData = this.$router.resolve({
        name: "juanlian",
        query: {names:this.duibiGroup}

      });
      window.open(routeData.href, '_blank');
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
      let source = new ol.source.ImageStatic({
            url:"http://localhost:8013/hjcczzData/world.jpg"
      });
      console.log(source)
        let imageLayer = new ol.layer.Image({
            source:source,
            visible:true
        });
      console.log('imageLayer',imageLayer);
        // this.map.addLayer(imageLayer);
        //地图缩放
      this.map.on('moveend', this.onMapZoomHandler);
      //鼠标悬停高亮
      this.map.on('pointermove', this.onMapMoveHandler);
      //地图单击
      this.map.on('singleclick', this.onMapSingleSelHandler);

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
      //添加所有wmts图层，组成图层组this.layerGroup
      addwmtslayerGroup(){
          // let typeArray = ['tdly','trqs','zbfg'];
          let typeArray = ['tdly','trqs'];
          let yearArray = ['2016','2017','2018','2019','2020'];
          var layerGroup = [];
          for(var i=0;i<typeArray.length;i++) {
              for(var j=0;j<yearArray.length;j++) {
                  let layerName = typeArray[i]+yearArray[j];
                  if(layerName == 'tdly2016'|| layerName == 'tdly2017'){
                      layerName = layerName+'2';
                  }
                  console.log('typeArray[i]',typeArray[i]);
                  console.log('yearArray[j]',yearArray[j]);
                  console.log('添加wmts layerName',layerName);
                  let url = "http://10.61.117.57:6080/arcgis/rest/services/hjjczz/"+layerName+"/MapServer";
                  let layer = this.addfwlayer(url,layerName);
                  layerGroup.push(layer);
              }
          }
          this.layerGroup=new ol.layer.Group({
              layers:layerGroup,
          });
          this.map.addLayer(this.layerGroup);

/*          var layerarray=this.layerGroup.getLayers().getArray();
          console.log('layerarray',layerarray);
          for(var i=0;i<layerarray.length;i++)
          {
              var index=0;
              if(index==i)
              {
                  layerarray[i].setVisible(true);
              }
              else
              {
                  layerarray[i].setVisible(false);
              }
          }*/

      },
      //添加土地利用图层
      addtdlylayerGroup(){
          var templayer2016=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly20162/MapServer");
          var templayer2017=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly20172/MapServer");
          var templayer2018=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly2018/MapServer");
          var templayer2019=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly2019/MapServer");
          var templayer2020=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly2020/MapServer");
          this.tdlylayerGroup=new ol.layer.Group({
              layers:[templayer2016,templayer2017,templayer2018,templayer2019,templayer2020],
          });
          this.map.addLayer( this.tdlylayerGroup);
          this.tdlylayerGroup.setVisible(true);
          var layerarray=this.tdlylayerGroup.getLayers().getArray();
          for(var i=0;i<layerarray.length;i++)
          {
              var index=0;
              if(index==i)
              {
                  layerarray[i].setVisible(true);
              }
              else
              {
                  layerarray[i].setVisible(false);
              }
          }

          console.log('layerarray',layerarray);
          console.log('this.tdlylayerGroup',this.tdlylayerGroup);
          console.log('this.map',this.map)
      },
      //添加土壤侵蚀图层
      addTRQSlayergroup(){
          var templayer2016=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/trqs2016/MapServer");
          var templayer2017=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/trqs2017/MapServer");
          var templayer2018=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/trqs2018/MapServer");
          var templayer2019=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/trqs2019/MapServer");
          var templayer2020=this.addfwlayer("http://10.61.117.57:6080/arcgis/rest/services/hjjczz/trqs2020/MapServer");
          this.trqslayerGroup=new ol.layer.Group({
              layers:[templayer2016,templayer2017,templayer2018,templayer2019,templayer2020],
          });
          this.map.addLayer( this.trqslayerGroup);
          //this.map.addLayer( templayer2016);

      },
      addfwlayer(url,layerName){
          /* var resolution=[ 0.01903568804664224,0.00951784402332112,0.00475892201166056, 0.00237946100583028
             ,0.00118973050291514,5.9486525145757E-4,2.97432625728785E-4,1.5228550437313792E-4,
             7.614275218656896E-5,3.807137609328448E-5,1.903568804664224E-5,9.51784402332112E-6];*/
          var resolution=[1.4078260157100582, 0.7031250000000002, 0.3515625000000001
              ,0.17578125000000006, 0.08789062500000003,0.043945312500000014, 0.021972656250000007,
              0.010986328125000003,0.005493164062500002,0.002746582031250001,0.0013732910156250004,
              6.866455078125002E-4,3.433227539062501E-4, 1.7166137695312505E-4, 8.583068847656253E-5,
              4.2915344238281264E-5,2.1457672119140632E-5];
          var matrixids=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
          var origion=[ -400.0 ,400.0];
          var tileGrid=new ol.tilegrid.TileGrid(
              {
                  origin:origion,
                  resolutions:resolution,
                  matrixIds:matrixids
              }
          );
          var fwlayer =new ol.layer.Tile({
              source:new ol.source.XYZ({
                  projection:"EPSG:4326",
                  tileGrid:tileGrid,
                  tileUrlFunction:function(tileCoord){
                      var z=tileCoord[0];
                      var x=tileCoord[1];
                      var y=-tileCoord[2]-1;
                      return url+"/tile/"+ z +"/"+ y +"/" + x;
                  },
                  wrapX:true,
              }),
              visible:false,
              title:layerName
          })
          return fwlayer;
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

<style scoped rel="stylesheet/scss" lang="scss">

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
  background-color: #5daaf0;
}
/deep/ .el-tree-node__content{
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

</style>
