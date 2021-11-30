<template>
  <div>
    <div class="map" id="juanlianmap" onselectstart="return false">
      <div id="swipeContainer" @mousemove="move">
        <div id="swipeDiv">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
      juanlianmap:null,
      map: {},
      swipe: {},
      value: 50,
      layer:{},
    };
  },
  watch: {
    isopenjl:{
      handler:function (val,val2) {
        console.log("isopenjl",val);
        if(val == true){
          this.addJuanlian();
        }

      },
      deep:true
    },
    duibiGroup:{
      handler:function (val,val2) {
        if(this.isopenjl){
          this.addJuanlian();
        }

      },
      deep:true
    },
  },
  props: {
    isopenjl : {

    },
    duibiGroup: {
      /*type: Array,
      default: function() {
        return [];
      }*/
    },

  },
  components: {},
  created: function () {},
  mounted() {
    this.initMap();
    // this.addJuanlian();

  },
  methods: {
    initMap(){
/*      console.log('this.$route.params.duibiName',this.$route.params.duibiName);
      this.duibiGroup = this.$route.params.duibiName;*/

/*      this.tdtImage = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
        })
      });*/
      this.gProjection = ol.proj.get('EPSG:4326');
      this.juanlianmap = new ol.Map({
        //取消右下角i
        controls: ol.control.defaults({ attribution: false, zoom: true, rotate: false }).extend([]),
        target: 'juanlianmap',
        view: new ol.View({
          projection: this.gProjection,
          center: [108.878,35.424],
          // center: [12129470.527,4255685.289],
          zoom: 7.0
        })
      });
/*      this.juanlianmap = new ol.Map({
        target: "juanlianmap",
        view: new ol.View({
          /!* projection: "EPSG:4326",
           center: [108.17, 39.13],
           zoom: 5,*!/
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
        // layers:layers
      });*/

    },
    addJuanlian(){
      console.log('卷帘图层',this.duibiGroup);

      var layers = new Array;

      // layers.push(this.tdtImage);//底图 天地图
      //这个图层在下面

      var layer=this.addfwlayer(this.duibiGroup[0]);
      layers.push(layer);
      //这个图层在上面（既是最后添加的图层，也是被裁减的图层）this.layer = layers[2]
      var layer1=this.addfwlayer(this.duibiGroup[1]);
      // var layer1=this.addfwlayer('tdly20172');
      layers.push(layer1);

      this.layer = layers[1];
      // this.juanlianmap.addLayer(this.tdtImage);
      if(this.layerGroup){
        this.juanlianmap.removeLayer(this.layerGroup);
      }
      this.layerGroup=new ol.layer.Group({
        layers:layers,
      });
      this.juanlianmap.addLayer(this.layerGroup);
      // this.juanlianmap.addLayer(layer1);

      //绘制卷帘裁剪区域
      this.LayerSwipes();

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
          let url = "http://10.61.117.57:6080/arcgis/rest/services/hjjczz/"+layerName+"/MapServer";
          let layer = this.addfwlayer(layerName);
          layerGroup.push(layer);
        }
      }
      this.layerGroup=new ol.layer.Group({
        layers:layerGroup,
      });
      this.juanlianmap.addLayer(this.layerGroup);

    },
    addfwlayer(layerName){
      /* var resolution=[ 0.01903568804664224,0.00951784402332112,0.00475892201166056, 0.00237946100583028
         ,0.00118973050291514,5.9486525145757E-4,2.97432625728785E-4,1.5228550437313792E-4,
         7.614275218656896E-5,3.807137609328448E-5,1.903568804664224E-5,9.51784402332112E-6];*/
      var url = "http://10.61.117.57:6080/arcgis/rest/services/hjjczz/"+layerName+"/MapServer";
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
        title:layerName
      })
      return fwlayer;
    },

    //鼠标拖动
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
          _this.juanlianmap.render();
        };
        document.onmouseup = function () {
          this.onmousemove = null;
          this.onmouseup = null;
        };
      };
    },

    LayerSwipes() {
      var _this = this;
      this.layer.on("precompose", (event) => {
        var swipe = document.getElementById("swipeContainer");
        var ctx = event.context;
        //计算图层在canvas画布上需要显示的范围
        var mapSize = _this.juanlianmap.getSize();
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
      this.layer.on("postcompose", (event) => {
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
    this.juanlianmap.render();
    this.juanlianmap.updateSize();
  },
};
</script>
<style scoped lang="scss">
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

/*// 添加滑块的dom新样式*/
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
</style>
<style scoped>

</style>
