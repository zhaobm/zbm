<template>
  <div>
    <div class="top">

      <div id="map1" class="left_bottom"/>
      <div id="map2" class="left_bottom"/>

    </div>

    <div class="bottom">

      <div id="map3" class="left_bottom"> </div>
      <div id="map4" class="left_bottom"> </div>
    </div>
  </div>

</template>

<script>
import ol from 'openlayers';
export default {
  name: 'duoping',
  data() {
    return {
      juanlianmap:null,
      map: {},
      map1:null,
      map2:null,
      map3:null,
      map4:null,

      swipe: {},
      value: 50,
      layer:{},
    };
  },
  props: {
    isopendp : {

    },
    duibiGroup: {
      /*type: Array,
      default: function() {
        return [];
      }*/
    },

  },
  watch: {
    isopendp:{
      handler:function (val,val2) {
        console.log("isopendp",val);
        // console.log('多屏图层',this.duibiGroup);
        this.addDuoping();

      },
      deep:true
    },
    duibiGroup:{
      handler:function (val,val2) {
        console.log("duibiGroup",val);
        if(this.isopendp){
          this.addDuoping();
        }

      },
      deep:true
    },

  },
  mounted () {
    this.initMap();
    // this.addDuoping();
/*    function createMap(_div , _view){
      var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      var map = new ol.Map({
        target: _div,
        layers:[osm],
        view: _view
      });
      return map ;
    }

    var view =	new ol.View({
      center: [ 120, 30],
      zoom: 10,
      projection: 'EPSG:4326'
    });

    var map1 = createMap('map1' , view);
    var map2 = createMap('map2' , view);
    var map3 = createMap('map3' , view);
    var map4 = createMap('map4' , view);*/

  },
  methods: {
    initMap(){
      this.gProjection = ol.proj.get('EPSG:4326');
      var view =	new ol.View({
        center: [ 108.17, 39.13],
        zoom: 7,
        projection: 'EPSG:4326'
      });

      this.map1 = this.createMap('map1' , view);
      this.map2 = this.createMap('map2' , view);
      this.map3 = this.createMap('map3' , view);
      this.map4 = this.createMap('map4' , view);

    },

    createMap(_div , _view){
      var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      var map = new ol.Map({
        //取消右下角i
        controls: ol.control.defaults({ attribution: false, zoom: true, rotate: false }).extend([]),
        target: _div,
        // layers:[osm],
        view: _view
      });
      return map ;
    },

    addDuoping(){
      console.log('多屏图层',this.duibiGroup);
      var layer = this.addfwlayer(this.duibiGroup);
      this.map1.addLayer(this.addfwlayer(this.duibiGroup[0]));
      this.map2.addLayer(this.addfwlayer(this.duibiGroup[1]));
      this.map3.addLayer(this.addfwlayer(this.duibiGroup[2]));
      this.map4.addLayer(this.addfwlayer(this.duibiGroup[3]));

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

}
</script>

<style  scoped lang="scss">

body{
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
}

.top{
  height: 50%;
  width: 100%;
  position: absolute;
  float:left;
}

.bottom{
  height: 50%;
  width: 100%;
  position: absolute;
  float:left;
  top:50%;
}

.left_top {
  height: 100%;
  width: 50%;
  border-width: 50px;
  float:left;
}
.right_top {
  height: 100%;
  width: 50%;
  float:left;
}
.left_bottom {
  height: 100%;
  width: 50%;
  float:left;
  border:5px solid #2a6fb8;

  //一般width不包括border，但加了border-box后，width里包括了border和padding
  box-sizing: border-box;
}
.right_bottom {
  height: 100%;
  width: 40%;
  float:left;

}

</style>
