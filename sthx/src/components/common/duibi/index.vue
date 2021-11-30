<template>
  <div>
    <div id="map" class="map"></div>
    <input id="swipe" type="range" style="width: 100%">
  </div>
  <div class="map" id="map" onselectstart="return false">
    <div id="swipeContainer" @mousemove="move">
      <div id="swipeDiv">
        <div class="handle"></div>
      </div>
    </div>
  </div>
</template>

<!--<script>

// import ol from 'olpenlayers';
// import OlMap from 'ol/map';
// import OlView from 'ol/view';
// import OlTile from 'ol/layer/tile';
// import OlLayerVector from 'ol/layer/vector';
// import OlSourceVector from 'ol/source/vector';
import ol from 'openlayers';
export default {
  name: "juanlian",
  data() {
    return {
      map: {},
      swipe: {},
      value: 50,
      layer:{},
    };
  },
  watch: {},
  props: [""],
  components: {},
  created: function () {},
  mounted: function () {
    console.log(this.$route.query.names);
    console.log('here index')
    var layers=new Array;
    /*    for (var test in this.$route.query.names )
        {
          var layer=this.LoadGeoWMTSMap(this.$route.query.names[test]);
          layers.push(layer);
        }*/
    var layer=this.LoadGeoWMTSMap("hkywry:gyymiddlepro");
    layers.push(layer);
    var layer1=this.LoadGeoWMTSMap("hkywry:jzsshenghuopro");
    layers.push(layer1);
    var _this = this;



    this.map = new ol.Map({
      target: "map",
      view: new ol.View({
        /* projection: "EPSG:4326",
         center: [108.17, 39.13],
         zoom: 5,*/
        projection: ol.proj.get('EPSG:3857'),
        center: [12149145.114081362, 4316266.289],
        zoom: 8
      }),
      controls: ol.control.defaults({
        attribution: false,
        zoom: false,
        rotate: false,
      }),
      //layers: [layerGroup, layer],
      layers:layers
    });
    this.layer = layers[1];
    var obj = {};
    this.LayerSwipes();
  },
  methods: {
    move(event) {
      var _this = this;
      var swipe = document.getElementById("swipeContainer");
      var obj = {};
      swipe.onmousedown = function (event) {
        var e = event || window.event;
        // 鼠标点击元素那一刻相对于元素左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        obj.diffX = e.clientX - this.offsetLeft;
        document.onmousemove = function (event) {
          var e = event || window.event;
          var moveX = e.clientX - obj.diffX;
          if (moveX < 0) {
            moveX = 0;
          }
          /*else if (moveX > 870) {
            moveX = 870;
          }*/
          // console.log(moveX);
          _this.value = swipe.offsetWidth;
          swipe.style.left = moveX + "px";
          _this.LayerSwipes();
          //重新渲染图层
          _this.map.render();
        };
        document.onmouseup = function () {
          this.onmousemove = null;
          this.onmouseup = null;
        };
      };
    },
    LayerSwipes() {
      var _this = this;

      console.log('this.layer',this.layer);

      this.layer.on("prerender", (event) => {
        var swipe = document.getElementById("swipeContainer");
        var ctx = event.context;
        //计算图层在canvas画布上需要显示的范围
        var mapSize = _this.map.getSize();
        var height = event.context.canvas.height;
        var width = event.context.canvas.width;
        var swipeWidth = swipe.offsetLeft*width/mapSize[0];
        // console.log(swipeWidth);
        var tl = [swipeWidth,0];
        var tr = [width,0];
        var bl = [swipeWidth,height];
        var br = [width,height];

        ctx.save();
        //绘制裁剪路径
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        //裁剪，裁剪路径以外的部分不会绘制在canvas上下文中
        ctx.clip();
      });

      this.layer.on("postrender", (event) => {
        // 在Bing地图渲染之后触发
        var ctx = event.context;
        ctx.restore();
      });
    },
    //加载自定义服务
    LoadGeoWMTSMap(url){
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
      var gridsetName = 'EPSG:900913';
      //var thisurl=document.getElementById("url1").value;
      var gyyEntBigWMTSLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
          url: 'http://localhost:8082/geoserver/gwc/service/wmts',
          //layer: 'hkywry:gyybigpro',
          layer:url+'',
          format: "image/png",
          matrixSet: gridsetName,
          projection: projection,
          tileGrid: tilegrid
        }),
        //title:title
      });
      //this.map.addLayer(this.gyyEntBigWMTSLayer);
      return gyyEntBigWMTSLayer;
    },
  },
  updated() {
    this.map.render();
    this.map.updateSize();
  },
};
</script>-->

<script>
import ol from 'openlayers';
export default {
  mounted(){
    var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    var bing = new ol.layer.Tile({
      source: new ol.source.BingMaps({
        key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
        imagerySet: 'Aerial'
      })
    });

    var map = new ol.Map({
      layers: [osm, bing],
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });

    var swipe = document.getElementById('swipe');

    osm.on('precompose', function(event) {
      var ctx = event.context;
      var width = ctx.canvas.width * (swipe.value / 100);

      ctx.save();
      ctx.beginPath();
      ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
      ctx.clip();
    });

    bing.on('postcompose', function(event) {
      var ctx = event.context;
      ctx.restore();
    });

    swipe.addEventListener('input', function() {
      map.render();
    }, false);

  }
}

</script>
<!--<style scoped lang="scss">
.map {
  /* width: 887px;
   height: 671px !important;*/
  width: 100%;
  height: 100%;
  position: absolute;
  //  top: 50%;
  //  left: 50%;
  //margin-left: -443.5px;
  //  margin-top: -335.5px;
  //border-radius: 5px;
  // border: solid 5px #ffffff;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 0; //设置不显示滑动条
  width: 887px;
  position: absolute;
  left: 50%;
  margin-left: -443.5px;
  z-index: 10;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #00a0e9;
  //background: url(../../assets/image/drag.png);
  background-size: 100% 100%;
  cursor: pointer;
}

// 添加滑块的dom新样式
#swipeContainer {
  position: absolute;
  opacity: 0.8;
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
  margin-left: -1px;
  background-color: #00A0E9;
  cursor: e-resize;
  z-index: 2;
}



#swipeDiv {
  height: 100%;
  width: 0px;
  margin: 0 auto;
}

#swipeDiv .handle {
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #00A0E9;
  //background: url(../../assets/image/drag.png);
  background-size: 100% 100%;
  cursor: e-resize;
  margin-left: -20px;
  top: 50%;
  margin-top: -20px;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>-->

