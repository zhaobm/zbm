
<template>
  <div class="mainview">
    <div  id="cesiumContainer"></div>
    <div class="leftdiv">
        <Box title="镇街应急点位统计" style="flex:1">
          <barSthjzs slot="content" class="sheetstyle" :data="barSthjzsData"/>
        </Box>
        <Box title="变化情况" style="flex:1">
          <barSthjzs slot="content" class="sheetstyle" :data="barSthjzsData"/>
        </Box>
        <Box title="森林防火" style="flex:1">
          <lineEIZS  slot="content" class="sheetstyle" :data="lineEIZSData"/>
        </Box>
    </div>

    <div class="center-control">

<!--      <hcAttributeTable class="attribute" v-show="isShowAttribute" @closeDiv="ClsoeAttr"  :featuredata="hcDatas" :arrPosition="arrPosition" :selectFeature="selectHcDatas" @attrCall="attrCallBack"></hcAttributeTable>-->
      <div v-show="isShow" class="attribute" :style="{'top':arrPosition.tableTop, 'left':arrPosition.tableLeft}">
        <div style="width: 200px;
                /*height: 250px;*/
                border: 1px solid rgba(70,187,243,0.53);
                border-radius: 10px;
                background: rgba(3, 73, 114, 0.7);
                color: #fff;
                box-shadow: inset 0 0 8px 2px rgba(70,187,243,0.53);">
         <div style="height: 15%;
                  background-color: #03a9f48f;
                  padding: 2px;
                  text-align: center;">
<!--            <span>属性</span><span style="float: right;padding-right: 5px;cursor: pointer;" class="close_pop" data-id=`+ uuid + `> X </span>-->
             <span>属性</span><span style="float: right;padding-right: 5px;cursor: pointer;" @click="switchIsShow" class="close_pop"> X </span>
          </div>
          <div id="popContent" style="flex:1;font-size: 12px; padding: 5px; "></div>
<!--          <div title="生态环境质量变化" style="height: 200px;">-->
<!--            <lineEIZS  slot="content" :data="lineEIZSData"/>-->
<!--          </div>-->

        </div>
        <div style="width: 0px;
                height: 0px;
                border-top: 20px solid rgba(3, 73, 114, 0.7);
                border-right: 15px solid transparent;
                border-bottom: 20px solid transparent;
                border-left: 15px solid transparent;
                margin: auto;"></div>
      </div>


    </div>

    <div id="bottom_xt" >
      <div class ="nav_bottom">
        <div class="navleft"></div>
        <div class="navcenter">
          <ul>
            <a href="javascript:">
              <li class="bottom_operate" @click="infoQuery">信息查询</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate"  onclick="loadPOI('wry')">
                <svg class="home"  style="width: 21px; height: 21px; fill: #00ffff; position: relative ;top:1px" viewBox="0 0 28 28"><path d="M14,4l-10,8.75h20l-4.25-3.7188v-4.6562h-2.812v2.1875l-2.938-2.5625zm-7.0938,9.906v10.094h14.094v-10.094h-14.094zm2.1876,2.313h3.3122v4.25h-3.3122v-4.25zm5.8442,1.281h3.406v6.438h-3.406v-6.438z"></path></svg>
                <span style="vertical-align: top;margin-left: -4px;">污染源</span>
              </li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('yys')">饮用水</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('dbs')">地表水</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('kq')">空气</li>
            </a>

          </ul>
        </div>
        <div class="navright"></div>
      </div>

    </div>

<!--    <div>-->
<!--      <TimeAxis class="timeAxis" title="时间轴" :timeDataNode="timeDataNode" :isStop= "timeIsStop" @callBack = "alterMapByYear"/>-->
<!--    </div>-->

    <div class="rightdiv">
        <div  id="he-plugin-standard" style="margin-bottom: 30px">
 </div>

        <Box title="防汛预警" style="flex:1">
            <lineEIZS  slot="content" class="sheetstyle" :data="lineEIZSData"/>
        </Box>
      <Box title="限制情况" style="flex:1">
        <lineEIZS  slot="content" class="sheetstyle" :data="lineEIZSData"/>
      </Box>
    </div>
  </div>


</template>
<script>
import Box from "../../components/common/er/box";
import barSthjzs from "../../components/charts/bar/stzkpj/barSthjzs.vue";//柱状图
import lineEIZS from "../../components/charts/line/stzkpj/lineEIZS";//折线图
import url from  "../../assets/images/initw.jpg";//初始贴图
import hcAttributeTable from "../../components/common/attribute/index.vue";//弹出属性框（暂时不用这个）
import TimeAxis from "../../components/common/dataZoom";//时间轴
import Weather from "../../assets/js/weather/weather.js";

export default {
  name: "xykh",
  data() {
    return {
      year:'2020',
      years:[2012,2013,2014,2015,2016,2017,2018,2019,2020],
      barSthjzsData: {
        xAxis:["涝峪镇"],
        yAxis:[4]
      },
      lineEIZSData: {
        xAxis:[2012,2013,2014,2015,2016,2017,2018,2019,2020],
        yAxis:[2012,2013,2014,2015,2016,2017,2018,2019,2020]
      },
      isShowAttribute:true,
      timeAxisVisible:true,
      timeDataArray:[
        { url: [] , year: 2016 },
        { url: [] , year: 2017 },
        { url: [] , year: 2018 },
        { url: [] , year: 2019 },
        { url: [] , year: 2020 },
      ],
      imageUrl:url,
      // viewer:{},
      arrPosition:{'tableLeft':'0px','tableTop':'0px'},
      hcDatas:{"featureArr":{"attr":[{"内业编号":"610124-228","编号":"610124-9","时间":"20201204_011716","经度":"108.46224643078186","纬度":"34.20919613395025","海拔":"361.80400646291673","地貌类型":"平原","野外类型":"43","判读类型":"53","正误":"错","野外相片编码":"M610124201204009P.jpg;M610124201204009T.jpg;","核查类型":"覆被类型"},{"内业编号":"610124-228","编号":"610124-9","时间":"20201204_011716","经度":"108.46224643078186","纬度":"34.20919613395025","海拔":"361.80400646291673","地貌类型":"平原","变化前类型":"41","变化后类型":"43","变化原因":"null","野外相片编码":"M610124201204009P.jpg;M610124201204009T.jpg;","核查类型":"生态破坏"}]},"searchArr":{"attr":[{"核查类型":"覆被类型"},{"核查类型":"生态破坏"}]},"totalCount":2},
      cartesian:'',
        isShow:false,
        geoCoordMapNew:null,
        yjdsum:{},
        querypd:0,
  };
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
  methods:  {
    //时间轴切换
    alterMapByYear(year,url){
      console.log("year",year);
/*      this.queryDataCache();
      this.dataForm.year = year;*/
      this.year = year;
      console.log('时间轴切换')
    },
    initMap()  {
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
      Cesium.Camera.DEFAULT_VIEW_FACTOR=0//摄像机视口远近参数，可设置地球大小

      var viewer  =  new  Cesium.Viewer('cesiumContainer',{
        animation:  false,  //是否创建动画小器件，左下角仪表
        baseLayerPicker:  false,  //是否显示图层选择器
        fullscreenButton:  false,  //是否显示全屏按钮
        geocoder:  false,  //是否显示geocoder小器件，右上角查询按钮
        homeButton:  false,  //是否显示Home按钮
        infoBox:  false,  //是否显示信息框
        sceneModePicker:  false,  //是否显示3D/2D选择器,与scene3DOnly不能同时为true
        selectionIndicator:  false,  //是否显示选取指示器组件
        timeline:  false,  //是否显示时间轴
        navigationHelpButton:  false,  //是否显示右上角的帮助按钮
        scene3DOnly:  false,  //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源

        //加载单张图片为影像服务(给球表面贴一张图)
/*        imageryProvider:  new  Cesium.SingleTileImageryProvider({
          // credit: "",
          url:  this.imageUrl
        }),*/
      })

      // 添加地图视图定位。定位到延安地区。
      viewer.entities.removeAll();
      // var positions = viewer.entities.add({
      //   name: 'position',
      //   // position: Cesium.Cartesian3.fromDegrees(120.58468164419833, 27.842148925776648, 10000),
      //   position: Cesium.Cartesian3.fromDegrees(108.44,33.93),
      //   point: {
      //     pixelSize: 10,//点的大小
      //     color: Cesium.Color.RED,
      //     outlineColor: Cesium.Color.WHITE,
      //     outlineWidth: 2
      //   }
      // });
      // viewer.zoomTo(positions);
      // viewer.camera.zoomIn(10000);

      window.viewer = viewer;
        this.viewer = viewer;


/*      // 添加ArcGIS WMTS服务
      var ArcGisMapServer = new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://localhost:6080/arcgis/rest/services/hjjczz2/2/MapServer',
        enablePickFeatures: false
      })
      //将设置的图层加载到基本图层组viewer.imageryLayers上（实际上是加到viewer.scene.imageryLayers上）
      viewer.imageryLayers.addImageryProvider(ArcGisMapServer)*/
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(108.593,34.003, 100000),
            orientation: {
                // heading: Cesium.Math.toRadians(-180.0), // 方向
                // pitch: Cesium.Math.toRadians(-20.0),// 倾斜角度
                roll: 0,
            }
        });
    },


switchIsShow(){
  this.isShow = false;
},
      queryInfo(e){
          this.isshowPopup = true;
          console.log('e',e);
          var pick= new Cesium.Cartesian2(e.position.x,e.position.y);
          var pick1= window.viewer.scene.pickPosition(e.position);//屏幕坐标
          var pick2 = window.viewer.scene.pick(e.position);
          //如果点击位置有找到东西
          if(Cesium.defined(pick2) == true) {
              // 获取点击位置坐标 that.cartesian世界坐标
              console.log('here');
              this.cartesian = window.viewer.scene.globe.pick(window.viewer.camera.getPickRay(pick), window.viewer.scene);
          }
          console.log('e.position',e.position);

          this.arrPosition.tableLeft = e.position.x -1000 +'px';
          this.arrPosition.tableTop = e.position.y -415 +'px';

          var pick = window.viewer.scene.pick(e.position);
          if (Cesium.defined(pick2)) {
              var properties = pick2.id.properties;//点击位置的所有属性信息
              console.log('pick2.id.properties',pick2.id.properties);
              console.log('Object.keys(property)',Object.keys(properties));//问题：这里属性名称前有_，并且含有非属性名称
          }

          //创建属性气泡框
          var html = '';
          console.log('_propertyNames',properties._propertyNames);
          var keyArr = properties._propertyNames;

          console.log('pick2.id.properties',pick2.id.properties);
          //应遍历数组properties._propertyNames
          // for(var i=0;i<keyArr.length;i++){
          for(var i=0;i<5;i++){//暂时用假数据
              let key = keyArr[i];
              let value = properties[key]._value;
              if(value !== ''){
                  html += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
              }
          }
          if (html.length > 0) {
              html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
          }
          var popContent = document.getElementById("popContent");
          popContent.innerHTML = html;
          this.isShow=true;
      },
      displayInfo(e){
          var pick = window.viewer.scene.pick(e.position);
          if (Cesium.defined(pick)) {
              console.log('here properties',pick.id.properties._yingjidian._value);


              let arr = [];
              // arr.push(this.yjdsum.)
              this.barSthjzsData.xAxis = [pick.id.properties._NAME._value];
              this.barSthjzsData.yAxis = [pick.id.properties._yingjidian._value];
              // this.yjdsum[xzqhmc] = num;
              // console.log('this.yjdsum',this.yjdsum);
          }
      },
      infoQuery(){
          var that = this;
          var handlerCli = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
          if (that.querypd == 1){
              that.querypd = 0;
              console.log('变成0')
          }else if(that.querypd == 0){
              that.querypd =1;
              console.log('变成1')
          }
              handlerCli.setInputAction(function (e) {
                  if (that.querypd == 1){
                      console.log('变成0');
                      that.queryInfo(e)
                      return;
                  }else if(that.querypd == 0){
                      console.log('变成1')
                      that.displayInfo(e);
                        return;
                  }
                  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



      },

      //添加秦岭json文件
      async loadQLjson() {
          let json = require("../../assets/js/geojson/huyi.json");
          //设置geojson线条、填充样式。load方法是个promise，用异步处理。
          let res = await Cesium.GeoJsonDataSource.load(json, {
              fill:Cesium.Color.YELLOW.withAlpha(0.03),
              strokeWidth:8,
          });
          // this.SetSymbol2(res,this.QlLayer);
          // Cesium.Viewer.flyTo(res);
          window.viewer.dataSources.add(res);
          // let leixing= json;
          return res;
      },

      async loadyjcld() {
          let json = require("../../assets/js/geojson/Json/应急/dzd.json");
          //设置geojson线条、填充样式。load方法是个promise，用异步处理。
          let res1 = await Cesium.GeoJsonDataSource.load(json,{clampToGround: true});
          // this.SetSymbol2(res,this.QlLayer);
          // Cesium.Viewer.flyTo(res);
          window.viewer.dataSources.add(res1);
          // let leixing= json;
          return res1;
      },

      //加载 聚合点 & POI点
      async loadPOI(leixing){
          //隐藏其他poi图层
          // if (this.poiGeojson){
          //     this.setlayervisibility(this.poiGeojson,false);
          // }
          // //移除聚合图层
          // if (this.clusterPointLayer){
          //     // this.setlayervisibility(this.poiGeojson,false);
          //     window.viewer.dataSources.remove(this.clusterPointLayer);
          // }
          //导入图层信息
          var res = await this.loadyjcld();
          this.poiGeojson = res;

          window.viewer.dataSources.add(res);

          //设置poi点样式
          if(leixing == 'yys'){
              var color = 'BLUE'
          }
          else{
              var color = Cesium.Color.fromCssColorString("#02a38b")
          }
          var entities = res.entities.values;

          //建立聚合点图层组（理解的是每个点是一个图层，所有点图层放在图层组clusterPointLayer里）
          //所以先在视图里创建图层组 window.viewer.dataSources.add(this.clusterPointLayer);
          //再在图层组里添加图层 for循环添加this.clusterPointLayer.entities.add(clustParam);
          this.clusterPointLayer = new Cesium.CustomDataSource();
          window.viewer.dataSources.add(this.clusterPointLayer);

          console.log('entities',entities);

          //初始时计算各区县中心点坐标
          if(!this.geoCoordMapNew){
              this.geoCoordMapNew = {};
              for (var i = 0; i < entities.length; i++) {
                  let entity = entities[i];
                  var polyPositions = entities[i].position._value;
                  // console.log('polyPositions',polyPositions);
                  var ellipsoid=window.viewer.scene.globe.ellipsoid;
                  var cartographic=ellipsoid.cartesianToCartographic(polyPositions);
                  var lat=Cesium.Math.toDegrees(cartographic.latitude);
                  var lng=Cesium.Math.toDegrees(cartographic.longitude);
                  var alt=cartographic.height;

                  // var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                  // var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;//中心点
                  // var polyCenter2 = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                  // let cartographic = Cesium.Cartographic.fromCartesian(polyCenter2, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
                  // let height = cartographic.height;
                  let position = [];
                  //获取4326经纬度坐标
                  position[0] = lat;
                  position[1] = lng;
                  //获取行政区划代码
                  // console.log('entity.properties.NAME._value',entity.properties.NAME._value);
                  console.log('entity.properties',entity.properties);
                  let xzqhmc = entity.properties.镇街._value;

                  this.geoCoordMapNew[xzqhmc] = position;
              }

              console.log('this.geoCoordMapNew',this.geoCoordMapNew);
          }
          //计算每个县的点位个数
          for(var key in this.geoCoordMapNew){
              var num = 0;
              // var data = dishiEntCountArr[keyName];
              for(var i = 0; i < entities.length; i++){
                  // var xzqhmc = entities[i].properties.BH._value.substr(0,6);
                  // console.log('entities[i].properties',entities[i].properties);
                  var xzqhmc = entities[i].properties.镇街._value;
                  if(xzqhmc == key){
                      num++;
                  }
              }

              this.yjdsum[xzqhmc] = num;
              console.log('this.yjdsum',this.yjdsum);

              var clustParam = {
                  // name: '1号大棚',

                  position: Cesium.Cartesian3.fromDegrees(this.geoCoordMapNew[key][1],this.geoCoordMapNew[key][0]),

                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 30),//仅在这个范围内显示
                  label: { //文字标签
                      text: ''+num,
                      font: '500 30px Helvetica',// 15pt monospace
                      scale: 0.8,
                      style: Cesium.LabelStyle.FILL,
                      fillColor: Cesium.Color.WHITE,
                      // pixelOffset: new Cesium.Cartesian2(110, -70),   //偏移量
                      showBackground: true,
                      backgroundColor:Cesium.Color.fromCssColorString("#02a38b"),
                      // backgroundColor: new Cesium.Color(0 / 255, 191 / 255, 255 / 255, 1),//文字背景色，应该和图表颜色保持一致1296db
                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(300000,5000000),//仅在这个范围内显示
                  },
                  billboard: { //图标
                      image: require('../../assets/er/images/4.png'),
                      width: 40,
                      height: 40,
                      // pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(300000,5000000),//仅在这个范围内显示
                  },
              };
              console.log('tclustParam',clustParam);
              console.log(this.geoCoordMapNew[key][0],this.geoCoordMapNew[key][1]),
              this.clusterPointLayer.entities.add(clustParam);

          }

          for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              entity.billboard = undefined;//取消默认显示。默认显示为气泡窗
              entity.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, 300000.0);
              entity.point = new Cesium.PointGraphics({
                  // color: Cesium.Color[color],
                  color: color,
                  pixelSize: 15,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300000.0),

              });
          }

          //添加点击事件。点击进行属性查询。
          var that = this;
          var handlerCli = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);


          handlerCli.setInputAction(function (e) {

          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

          //监听事件：使气泡框跟随屏幕移动
          window.viewer.scene.postRender.addEventListener(function (e) {
              //pick世界坐标转屏幕坐标（e.position不存在）
              var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, that.cartesian);
              //* 对象不能用等号判断相等。因为是引用型，如果内存地址不同，则不简单相等。需要判断值是否相等
              if(JSON.stringify(that.pick) !== JSON.stringify(pick)){

                  that.arrPosition.tableLeft = pick.x-975 +'px'; // -975
                  that.arrPosition.tableTop = pick.y-245 +'px'; // -245

                  that.pick = pick;
              }
          });

      },

      SetSymbol(dataSource, colorArray, name, type,layername) {
          var typeArray = [];
          var neighborhoodEntities = dataSource.entities.values;
          for (var i = 0; i < neighborhoodEntities.length; i++) {
              var entity = neighborhoodEntities[i];
              if (Cesium.defined(entity.polygon)) {
                  entity.name = entity.properties[name]._value;
                  if (typeArray.indexOf(entity.properties[type]._value) < 0) {
                      typeArray.push(entity.properties[type]._value);
                      //cssColor:值可以是 #ffccdd, rgb(255，255，255)，rgb(255，0，255，0.5)
                      entity.polygon.material = Cesium.Color.fromCssColorString(colorArray[typeArray.length])
                  } else {
                      entity.polygon.material = Cesium.Color.fromCssColorString
                      (colorArray[typeArray.indexOf(entity.properties[type]._value)]);
                  }
                  // Set the polygon material to a random, translucent color.
                  /* entity.polygon.material = Cesium.Color.fromRandom({
                      // red: 0.5,
                      // maximumGreen: 0.9,
                      // minimumBlue: 0.1,
                      alpha: 0.2
                  });*/
                  entity.polygon.outline = false;
                  //entity.polygon.extrudedHeight=1000;

                  // Generate Polygon position,设置标注
                  /*var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                  //获取多边形中心,以便放置注记
                  var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                  polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                  entity.position = polyCenter;
                  entity.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(1000.0, 300000.0);
                      // 生成注记
                      entity.label = {
                          text: entity.name,
                          showBackground: true,
                          scale: 0.7,
                          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000.0, 300000.0),
                      };*/
              }
              layername.entities.add(entity);
          }
      },


    //添加点位（待聚合）
//     async loadWRY(){
//
//       let json = require('../../assets/js/geojson/wyhc.json');
//
//       //设置geojson线条、填充样式。load方法是个promise，用异步处理。
//       //Cesium.GeoJsonDataSource.load 加载geojson数据
//       let res = await Cesium.GeoJsonDataSource.load(json);
//       console.log("res", res);//读取geojson
//
//       window.viewer.dataSources.add(res);
//
//       var entities = res.entities.values;
//       console.log('res.entities.values',res.entities.values);
//
//       //geojson随机渲染颜色
//       var colorHash = {};
//       for (var i = 0; i < entities.length; i++) {
//         var entity = entities[i];
//         entity.billboard = undefined;//取消默认显示。默认显示为气泡窗
//         entity.point = new Cesium.PointGraphics({
//           color: Cesium.Color.RED,
//           pixelSize: 20
//         });
//
//         //geojson添加高度，立体效果。按照PAC行政区划代码赋值。
//         // entity.polygon.extrudedHeight = entity.properties.PAC * 0.008; //高度扩大5000倍，便于观察
//       }
//       // console.log('colorHash',colorHash);
//
//       //添加点击事件。点击进行属性查询。在控制台输出。（cesium本来也自带点击查询）
//
//       //ScreenSpaceEventHandler监听cesium的父容器canvas的事件，提供setInputAction接口设置监听属性
//       var handlerCli = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
//       // console.log('handlerCli',handlerCli)
//
//       var that = this;
//
//
//       handlerCli.setInputAction(function (e) {
//         //e.position应该是获取屏幕坐标
//
//         var pick= new Cesium.Cartesian2(e.position.x,e.position.y);
//         var pick1= window.viewer.scene.pickPosition(e.position);//屏幕坐标
//         var pick2 = window.viewer.scene.pick(e.position);
// /*        console.log('pick1',pick1);//世界坐标，三维
//         console.log('pick2',pick2);//一堆collection*/
//
//         //如果点击位置有找到东西
//         if(Cesium.defined(pick2) == true) {
//           // 获取点击位置坐标 that.cartesian世界坐标
//           that.cartesian = window.viewer.scene.globe.pick(window.viewer.camera.getPickRay(pick), window.viewer.scene);
//         }
//         var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, that.cartesian);
//
//         that.arrPosition.tableLeft = e.position.x -1000 +'px';
//         that.arrPosition.tableTop = e.position.y -415 +'px';
//
//         // that.hcDatas = {"featureArr":{"attr":[{"核查类型":"覆被类型"},{"内业编号":"610124-228","核查类型":"生态破坏"}]},"searchArr":{"attr":[{"核查类型":"覆被类型"},{"核查类型":"生态破坏"}]},"totalCount":2},
//
//         console.log('父组件that.arrPosition',that.arrPosition);
//         var pick = window.viewer.scene.pick(e.position);
//         if (Cesium.defined(pick)) {
//           console.log('pick.id.properties',pick.id.properties);
//           var properties = pick.id.properties;//点击位置的所有属性信息
//           console.log('Object.keys(property)',Object.keys(properties));//问题：这里属性名称前有_，并且含有非属性名称
//
//           console.log('properties.BH._value',properties.BH._value);
//         }
//
//         //打开PopUp
//         var popContent = document.getElementById("popContent");
//         popContent.innerHTML = "";
//         popContent.innerHTML += "<span class = 'poiText' >企业名称：" +  + "</span>";
//         popContent.innerHTML += "\<span class = 'poiText' >行业名称：" +  + "</span>";
//         // popContent.innerHTML += "<span class = 'poiText' >地址：" + danwei.address + "</span>";
//         // popContent.innerHTML += "<span class = 'poiText' >坐标：" + coordinate[0]+","+coordinate[1] + "</span>";
//         popContent.innerHTML += "<span class = 'poiText' >企业规模：" +  + "</span>";
//         popContent.innerHTML += "<span class = 'poiText' >企业运行状态：" +  + "</span>";
//         popContent.innerHTML += "<span class = 'poiText' >工业总产值：" +  + "</span>";
//
//         //创建描述位置的对话框
//
//         var simpleStyleIdentifiers = ['经度', '纬度', '高度'];
//         var html = '';
//         var keyArr = properties._propertyNames;
//         //应遍历数组properties._propertyNames
//
//         // for(var i=0;i<keyArr.length;i++){
//         for(var i=0;i<5;i++){//暂时用假数据
//           let key = keyArr[i];
//           let value = properties[key]._value;
//           console.log(key);
//           console.log(value);
//           if(value !== ''){
//             html += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
//           }
//         }
//         if (html.length > 0) {
//           html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
//         }
//         popContent.innerHTML = html;
//
//
//         for (var key in properties) {
//           if (properties.hasOwnProperty(key)) {
// /*            if (simpleStyleIdentifiers.indexOf(key) !== -1) {
//               continue;
//             }*/
//             var value = properties[key];
//             if (Cesium.defined(value) && value !== '') {
//               html += '<tr><td>' + simpleStyleIdentifiers[key] + '</td><td>' + value + '</td></tr>';
//             }
//           }
//         }
//         if (html.length > 0) {
//           html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
//         }
//         table.innerHTML = html;
//
//
// /*        function createDescription(Cesium,table, properties) {
//           var simpleStyleIdentifiers = ['经度', '纬度', '高度'];
//           var html = '';
//           for (var key in properties) {
//             if (properties.hasOwnProperty(key)) {
//               if (simpleStyleIdentifiers.indexOf(key) !== -1) {
//                 continue;
//               }
//               var value = properties[key];
//               if (Cesium.defined(value) && value !== '') {
//                 html += '<tr><td>' + simpleStyleIdentifiers[key] + '</td><td>' + value + '</td></tr>';
//               }
//             }
//           }
//           if (html.length > 0) {
//             html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
//           }
//           table.innerHTML = html;
//         }*/
//
//       }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//
//       that = this;
//
//       //监听事件：使气泡框跟随屏幕移动
//       window.viewer.scene.postRender.addEventListener(function (e) {
//         //pick世界坐标转屏幕坐标（e.position不存在）
//         var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, that.cartesian);
//         //* 对象不能用等号判断相等。因为是引用型，如果内存地址不同，则不简单相等。需要判断值是否相等
//         if(JSON.stringify(that.pick) !== JSON.stringify(pick)){
//
//           that.arrPosition.tableLeft = pick.x -1000 +'px';
//           that.arrPosition.tableTop = pick.y -415 +'px';
//
//           that.pick = pick;
//         }
//       });
//
//     },

    //加载3d模型（json格式的）先放在这里，用的时候再改
    load3DModles(){
      var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: './data/NewYork/tileset.json' //   ./data/3dtiles-lab/tileset.json
      }));

      tileset.readyPromise.then(function () {
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      }).otherwise(function (error) {
        throw (error);
      });
    },

    loadEIColor(){

    },

    //加载geojson文件
    async loadGeojson(leixing){
      //加载geojson文件
      // let json = require('../../assets/js/geojson/wyhc.json');
      let json = require('../../assets/js/geojson/' + leixing + '.json');
      var res = await Cesium.GeoJsonDataSource.load(json);


      return res;
    },

    // loadPOI(leixing){
    //   /*console.log('leixing',leixing);
    //   //加载geojson文件
    //   // let json = require('../../assets/js/geojson/wyhc.json');
    //   let json = require('../../assets/js/geojson/' + leixing + '.json');
    //   let res = await Cesium.GeoJsonDataSource.load(json);
    //
    //   window.viewer.dataSources.add(res);*/
    //
    //   var res = this.loadGeojson(leixing);
    //
    //   console.log('调用 add前')
    //   window.viewer.dataSources.add(res);
    //   console.log('res',res);
    //
    //   //设置geojson点的颜色
    //   var entities = res.entities.values;
    //   for (var i = 0; i < entities.length; i++) {
    //     var entity = entities[i];
    //     entity.billboard = undefined;//取消默认显示。默认显示为气泡窗
    //     entity.point = new Cesium.PointGraphics({
    //       color: Cesium.Color.BLUE,
    //       pixelSize: 15
    //     });
    //   }
    //
    //   //添加点击事件。点击进行属性查询。
    //   var that = this;
    //   var handlerCli = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
    //
    //   handlerCli.setInputAction(function (e) {
    //     console.log('e',e);
    //     var pick= new Cesium.Cartesian2(e.position.x,e.position.y);
    //     var pick1= window.viewer.scene.pickPosition(e.position);//屏幕坐标
    //     var pick2 = window.viewer.scene.pick(e.position);
    //     //如果点击位置有找到东西
    //     if(Cesium.defined(pick2) == true) {
    //       // 获取点击位置坐标 that.cartesian世界坐标
    //       console.log('here');
    //       that.cartesian = window.viewer.scene.globe.pick(window.viewer.camera.getPickRay(pick), window.viewer.scene);
    //     }
    //     console.log('e.position',e.position);
    //
    //     that.arrPosition.tableLeft = e.position.x -1000 +'px';
    //     that.arrPosition.tableTop = e.position.y -415 +'px';
    //
    //     var pick = window.viewer.scene.pick(e.position);
    //     if (Cesium.defined(pick2)) {
    //       var properties = pick2.id.properties;//点击位置的所有属性信息
    //       console.log('pick2.id.properties',pick2.id.properties);
    //       console.log('Object.keys(property)',Object.keys(properties));//问题：这里属性名称前有_，并且含有非属性名称
    //     }
    //
    //     //创建属性气泡框
    //     var html = '';
    //     var keyArr = properties._propertyNames;
    //     //应遍历数组properties._propertyNames
    //     // for(var i=0;i<keyArr.length;i++){
    //     for(var i=0;i<5;i++){//暂时用假数据
    //       let key = keyArr[i];
    //       let value = properties[key]._value;
    //       if(value !== ''){
    //         html += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
    //       }
    //     }
    //     if (html.length > 0) {
    //       html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
    //     }
    //     var popContent = document.getElementById("popContent");
    //     popContent.innerHTML = html;
    //
    //   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //
    //
    //   //监听事件：使气泡框跟随屏幕移动
    //   window.viewer.scene.postRender.addEventListener(function (e) {
    //     //pick世界坐标转屏幕坐标（e.position不存在）
    //     var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, that.cartesian);
    //     //* 对象不能用等号判断相等。因为是引用型，如果内存地址不同，则不简单相等。需要判断值是否相等
    //     if(JSON.stringify(that.pick) !== JSON.stringify(pick)){
    //
    //       that.arrPosition.tableLeft = pick.x -1000 +'px';
    //       that.arrPosition.tableTop = pick.y -415 +'px';
    //
    //       that.pick = pick;
    //     }
    //   });
    //
    //   return res;
    //
    // },

  //  控制图层显隐
    setlayervisibility(dataset, isshow) {
      dataset.then((datasource) => {
        let entitiesArr = datasource.entities.values //获取json中包含的entity实体
        //遍历实体数组，设置geometry的显隐状态值
        let len = entitiesArr.length - 1
        while (len >= 0) {
          let entity = entitiesArr[len--] //获取当前实体
          entity.polygon.show = isshow;
          entity.label.show = isshow;
        }
      })
    },

  },
  mounted() {
    //初始化地图
    this.initMap();
    this.loadQLjson();
    this.loadPOI();
    Weather;
    // this.loadyjcld();
    //加载县级json
    // this.loadSxxj();
  //  加载污染源点位json
  //   this.loadWRY();
  //  加载三维模型
  //   this.load3DModles();
  },
  components:{
    Box,
    lineEIZS,
    hcAttributeTable,
    TimeAxis,
    barSthjzs,
      Weather,
  }
}

</script>
<style>
    .mainview{
        width: 100%;
        height: 95%;
    }
    #cesiumContainer{
        height: 100%;
        width: 100%;
    }
    .cesium-viewer-toolbar {
      display: block;
      position: absolute;
      top: 10%;
      right: 5px;
    }

    .center-control{
      position: absolute;;
      top:20%;
      left:40%
    }

    .attribute{
      z-index:100000
    }

    .attribute{
      position: absolute;
      /*  top:240px;
        left:400px;*/
/*      width: 300px;
      height: 70px;
      background-color: rgba(3, 73, 114, 0.7);
      border:1px solid rgba(81, 169, 213,0.7);
      color: #eee;*/
      border-radius: 10px;
    }


    /*下部导航*/
    #bottom_xt{
      position: absolute;
      bottom: 28px;
      left: 30%;
      width: 40%;
      height: 75px;
      z-index: 99997;
      background-color: red;
      text-align: center;
      background: url(../../assets/er/images/UI/bottom_xt.png) no-repeat;
      background-size: 100% 100%;
    }
    .nav_bottom{
      width: 84%;
      height: 22px;
      position: relative;
      top: 29px;
      margin-left: 8%;
    }
    .navleft {
      width: 6%;
      height: 38px;
      float: left;
      background: url(../../assets/er/images/UI/nav-left.png) no-repeat;
      background-size: 100% 100%;
    }
    .navright {
      width: 6%;
      height: 38px;
      float: left;
      background: url(../../assets/er/images/UI/nav-right.png) left no-repeat;
      background-size: 100% 100%;
    }
    .navcenter {
      float: left;
      width: 88%;
      height: 38px;
      background: url(../../assets/er/images/UI/navbg.png) repeat-x;
      background-size: 100% 100%;
    }
    .navcenter ul{
      text-align: center;
      margin-left: -4%;
    }
    .navcenter ul li {
      float: left;
      text-align: center;
      color: #00ffff;
      width: 20%;
      height: 24px;
      margin-top: 2px;
      line-height: 25px;
    }
    .navcenter ul a:hover .bottom_operate {
      background: url(../../assets/er/images/UI/nav-select.png) no-repeat;
      background-size: 100% 100%;
    }
    /*图例*/
    .navcenter .legend_select
    {
      text-align: center;
      margin-left: -35%;
      margin-top: 35px;
      display: none;
    }
    .navcenter .legend_select li{
      background: #057A8E;
      float: none;
      text-align: center;
      color: #00ffff;
      width: 105px;
      height: 30px;
      /*margin-top: 3px;*/
      line-height: 30px;
      position: relative;
      bottom: 160px;
      z-index: 30;
      font-size: 13px;
      font-weight: bold;
    }

    .navcenter .legend_select li:hover {
      background: rgba(8, 23, 52, 0.8);
      color: #00ffff;
    }

</style>

