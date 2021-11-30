<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// import { viewer } from 'cesium/Cesium'
/*import * as Cesium from 'cesium/Cesium'
import  'cesium/Widgets/widgets.css'*/
import url from  "../../assets/er/images/initw.jpg"
export default {
  name: "earth",
  data() {
    return {
      imageUrl:url,
      viewer:{}
    };
  },
  methods:  {
    initMap()  {
      this.viewer  =  new  Cesium.Viewer('cesiumContainer',{
        animation:  false,  //是否创建动画小器件，左下角仪表
        baseLayerPicker:  true,  //是否显示图层选择器
        fullscreenButton:  false,  //是否显示全屏按钮
        geocoder:  true,  //是否显示geocoder小器件，右上角查询按钮
        homeButton:  true,  //是否显示Home按钮
        infoBox:  true,  //是否显示信息框
        sceneModePicker:  true,  //是否显示3D/2D选择器,与scene3DOnly不能同时为true
        selectionIndicator:  true,  //是否显示选取指示器组件
        timeline:  true,  //是否显示时间轴
        navigationHelpButton:  true,  //是否显示右上角的帮助按钮
        scene3DOnly:  false,  //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源

        //加载单张图片为影像服务(给球表面贴一张图)
        imageryProvider:  new  Cesium.SingleTileImageryProvider({
          // credit: "",
          url:  this.imageUrl
        }),
      })

      // 添加地图视图定位。定位到延安地区。
      this.viewer.entities.removeAll();
      var positions = this.viewer.entities.add({
        name: 'position',
        // position: Cesium.Cartesian3.fromDegrees(120.58468164419833, 27.842148925776648, 10000),
        position: Cesium.Cartesian3.fromDegrees(109.5, 36.4, 10000),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        }
      });
      this.viewer.zoomTo(positions);

//别人的服务，测试用
/*      var provider = new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://localhost:6080/arcgis/rest/services/hjjczz2/1/MapServer/WMTS/tile/1.0.0/hjjczz2_1/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png', // 复制 2.5 中的地址
        // url: 'http://10.61.10.133:6080/arcgis/rest/services/hjjczz2/1/MapServer/WMTS/tile/1.0.0/hjjczz2_1/default/default028mm/6/67/96.png', // 复制 2.5 中的地址
        layer: 'hjjczz2_1',
        style: 'default',
        tileMatrixSetID: 'default028mm',
        format: 'image/png',
        tilingScheme: new Cesium.GeographicTilingScheme(),
        maximumLevel: 5,
        tileMatrixLabels: ['0','1', '2', '3', '4'] // 对应2.4中的tileMatrix Identifier属性
      });

      this.viewer.imageryLayers.addImageryProvider(provider);*/

      // 添加ArcGIS WMTS服务
      var ArcGisMapServer = new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://localhost:6080/arcgis/rest/services/hjjczz2/2/MapServer',
        enablePickFeatures: false
      })

      this.viewer.imageryLayers.addImageryProvider(ArcGisMapServer)
    },

    // 添加陕西县级geojson
    async loadSxxj(){
      let json = require('../../assets/js/geojson/sxxj.json');

      //设置geojson线条、填充样式。load方法是个promise，用异步处理。
      let res = await Cesium.GeoJsonDataSource.load(json, {
        stroke: Cesium.Color.WHITE,
        fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
        strokeWidth: 5
      });
      console.log("res", res);//读取geojson
      this.viewer.dataSources.add(res);

/*      // let json = require('../../assets/js/geojson/' +jsonn);
      let json = require('../assets/js/geojson/sxxj.json');
      this.viewer.dataSources.add(
          Cesium.GeoJsonDataSource.load(json)
      );*/

      var entities = res.entities.values;
      console.log('res.entities.values',res.entities.values);

      //geojson随机渲染颜色
      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity._name;
        var color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 0.3
          });
          colorHash[name] = color;
        }
        entity.polygon.material = color;
        entity.polygon.outline = false;

        //geojson添加高度，立体效果。按照PAC行政区划代码赋值。
        entity.polygon.extrudedHeight = entity.properties.PAC * 0.008; //高度扩大5000倍，便于观察
      }
      console.log('colorHash',colorHash);

      //添加点击事件。点击进行属性查询。在控制台输出。（cesium本来也自带点击查询）
      var scene = this.viewer.scene;
      var handlerCli = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      console.log('handlerCli',handlerCli)
      var that = this;
      handlerCli.setInputAction(function (movement) {
        var pick = that.viewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
          console.log(pick.id.properties);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



    },

  },
  mounted() {
    //初始化地图
    this.initMap();
    //加载县级json
    this.loadSxxj();

  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
