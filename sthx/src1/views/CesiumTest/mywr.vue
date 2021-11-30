
<template>
    <div class="mainview">
        <div  id="cesiumContainer"></div>
        <div class="leftdiv">
            <Box title="生态环境分指数变化" style="flex:1">
                <div slot="content"></div>
            </Box>
            <Box title="生态环境分指数变化2" style="flex:2">
                <div slot="content"></div>
            </Box>
        </div>
        <div class="rightdiv"></div>
    </div>

</template>

<script>
    import Box from "../../components/common/er/box";
    export default {
        components: {
            Box
        },
        data () {
            return {
                viewer :'',
                tileset: '',
            }
        },
        mounted (){
            //103.37324413479338, 29.544684360197113
            var initialLon = 103.37324413479338;
            var lat = 29.544684360197113;
            var height = 10.0;
            // // 创建viewer实例
            this.viewer = new Cesium.Viewer('cesiumContainer');
            /*this.viewer = new Cesium.Viewer('cesiumContainer', {
                // 需要进行可视化的数据源的集合
                animation: false, // 是否显示动画控件
                shouldAnimate: true,
                homeButton: false, // 是否显示Home按钮
                fullscreenButton: false, // 是否显示全屏按钮
                baseLayerPicker: true, // 是否显示图层选择控件
                geocoder: false, // 是否显示地名查找控件
                timeline: false, // 是否显示时间线控件
                sceneModePicker: true, // 是否显示投影方式控件
                navigationHelpButton: false, // 是否显示帮助信息控件
                infoBox: false, // 是否显示点击要素之后显示的信息
                requestRenderMode: true, // 启用请求渲染模式
                scene3DOnly: false, // 每个几何实例将只能以3D渲染以节省GPU内存
                sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处
            })*/
            // 去除版权信息
            this.viewer._cesiumWidget._creditContainer.style.display = 'none'
            /*      // 将经纬度转换为世界坐标
                  var target = Cesium.Cartesian3.fromDegrees(initialLon, lat, height);
                  var offset = new Cesium.Cartesian3(-70.06, -68.64, 6.0908)
                  this.viewer .scene.camera.lookAt(target, offset);*/


            var provider = new Cesium.WebMapTileServiceImageryProvider({
                url:'http://10.61.10.133:6080/arcgis/rest/services/hjjczz2/2/MapServer/tile/{TileMatrix}/{TileRow}/{TileCol}',
                layer: 'hjjczz2_2',
                style: 'default',
                tileMatrixSetID: 'default028mm',
                format: 'image/png',
                maximumLevel: 8,
                tileMatrixLabels: ['0','1', '2', '3', '4', '5','6','7'] // 对应2.4中的tileMatrix Identifier属性
            });
            this.viewer.imageryLayers.addImageryProvider(provider);

            /*  var ArcGisMapServer = new Cesium.ArcGisMapServerImageryProvider({
                  url: 'http://10.61.10.133:6080/arcgis/rest/services/hjjczz2/2/MapServer',
                  enablePickFeatures: false
              })
              this. viewer.imageryLayers.addImageryProvider(ArcGisMapServer)*/
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
    .cesium-viewer-toolbar{
        top:10%;
    }
</style>

