<template>
    <div class="mainview">
        <div class="ys-absolute-container" id="map" style="overflow: hidden"></div>
        <div class="attribute" :style="{'position':'absolute',
        'top':arrPosition.tableTop, 'left':arrPosition.tableLeft}" v-show="isQueryshow">
            <el-button type="primary" size="mini" style="position: absolute;right: 0px;top:0px;"
                       icon="el-icon-close" circle @click="closepopup()"></el-button>
            <div id="popContent" v-show="detail"></div>

            <lineSthjzs style="height: 200px;width:450px" :data="barSthjzsData"  v-show="detailchart" />

        </div>
        <div class="leftdiv" id="left1" style="width:22%;flex-direction: row;transition:width 1s"  >
            <Box title="秦岭自然保护区" style="flex:1">
                <div id="boxlist1" class="boxlist" slot="content" >
                    <ul class="list1">
                        <li  v-for="(danwei,index) in namelist.qlbhq"
                             v-bind:key="index" v-on:click="ListClick(danwei)">
                            {{danwei.name}}
                        </li>
                    </ul>
                </div>
            </Box>
           <!-- <div class="leftdivborder"></div>-->
            <div class="leftdivbutton" @click="hide(1)"></div>

        </div>
        <div class="rightdiv"  id="left2" style="width:0px;flex-direction: row;transition:width 1s">
           <!-- <Box title="陕西水源地保护区" style="flex:1;">
                <div id="boxlist2" class="boxlist" slot="content" >
                    <ul class="list1">
                        <li  v-for="(danwei,index) in namelist.sydbhq"
                             v-bind:key="index" v-on:click="ListClick(danwei)">
                            {{danwei.name}}
                        </li>
                    </ul>
                </div>
            </Box>-->
            <a href="#/zrbhdview2" class="rightdivbutton"></a>
        </div>
        <!--<div class="tips" id="tip"></div>-->
        <TimeAxis style="bottom: 80px;"class="timeAxis" title="时间轴" v-show="true" :timeDataNode="timeDataNode"
                  :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
        <div style="position: absolute;bottom: 100px;left:28%">
            <div class="block" v-show="istoumingdushow">
                <el-slider
                        v-model="toumingdu"
                        vertical
                        height="200px" @change="changetoumingdu()">
                </el-slider>
            </div>
            <el-switch style="margin-top: 5px"
                    v-model="istoumingdushow">
            </el-switch>
        </div>
    </div>
</template>

<script>
    import Box from "../../components/common/er/box";
    import lineSthjzs from "../../components/charts/line/zrbhd/lineEIZS.vue";
    import url from  "../../assets/er/images/world1.jpg"
    import ol from "openlayers";
    import $ from '../../lib/jquery-3.5.1.min';
    import TimeAxis from "../../components/common/dataZoom";
    export default {
        components: {
            Box,
            TimeAxis,
            lineSthjzs
        },
        name: "",
        async mounted() {
            /*this.qlmianjson=require("../../assets/er/bhdGeojson/qlall.json");
            this.qldianjson=require("../../assets/er/bhdGeojson/QLpoints.json");*/
            this.timeDataArray = [
                { url: [] , year: 2016 },
                { url: [] , year: 2017 },
                { url: [] , year: 2018 },
                { url: [] , year: 2019 },
                { url: [] , year: 2020 },
            ];
            this.newscroll("boxlist1");
            this.initMap(3);
           // this.addwmtsservice();
           /* this.zoomtoRangle();*/
            this.QlLayer = new Cesium.CustomDataSource();
            this.qlbhqLayer = new Cesium.CustomDataSource();
            this.qlbhqPointLayer = new Cesium.CustomDataSource();
            this.queryLayer= new Cesium.CustomDataSource();
            this.ShanxiLayer = new Cesium.CustomDataSource();
            this.sydbhqLayer = new Cesium.CustomDataSource();
            this.sydbhqPointLayer = new Cesium.CustomDataSource();
            this.viewer.dataSources.add(this.QlLayer);
            this.loadQLjson();
            this.loadqlbhdxj();
            this.addDTpoints();
            this.viewer.dataSources.add(this.qlbhqLayer);
            this.viewer.dataSources.add(this.qlbhqPointLayer);
            this.viewer.dataSources.add(this.queryLayer);
            this.echartdata=this.getechartdata(this.bhdtype,this.selectyear);
            this.setechart();
            var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            var that=this;
            handler.setInputAction(function(event){
                that.queryLayer.entities.removeAll();
                var pick = that.viewer.scene.pick(event.position);
                var pick2= new Cesium.Cartesian2(event.position.x,event.position.y);
                if (Cesium.defined(pick)){

                    that.cartesian = that.viewer.scene.globe.pick(that.viewer.camera.getPickRay(pick2),
                        that.viewer.scene);
                    var properties = pick.id.properties;//点击位置的所有属性信息
                    var keyArr = properties._propertyNames;
                    if(pick.id.name=="保护区点")
                    {
                        that.detail=false;
                        that.detailchart=true;
                        that.barSthjzsData={
                            xAxis:[],
                            yAxis:[],
                           xAxisname:'年份',
                           yAxisname:'开发干扰指数'
                        };
                        for(var i=0;i<keyArr.length;i++){
                            var key =keyArr[i]+"";
                            if(key.indexOf("F2016开")>-1)
                            {
                                that.barSthjzsData.xAxis.push("2016");
                                that.barSthjzsData.yAxis.push(properties[key]._value.toFixed(2));
                                continue;
                            }
                            if(key.indexOf("F2017开")>-1)
                            {
                                that.barSthjzsData.xAxis.push("2017");
                                that.barSthjzsData.yAxis.push(properties[key]._value.toFixed(2));
                                continue;
                            }
                            if(key.indexOf("F2018开")>-1)
                            {
                                that.barSthjzsData.xAxis.push("2018");
                                that.barSthjzsData.yAxis.push(properties[key]._value.toFixed(2));
                                continue;
                            }
                            if(key.indexOf("F2019开")>-1)
                            {
                                that.barSthjzsData.xAxis.push("2019");
                                that.barSthjzsData.yAxis.push(properties[key]._value.toFixed(2));
                                continue;
                            }
                            if(key.indexOf("F2020开")>-1)
                            {
                                that.barSthjzsData.xAxis.push("2020");
                                that.barSthjzsData.yAxis.push(properties[key]._value.toFixed(2));
                                continue;
                            }
                        }
                    }else
                    {
                        that.detail=true;
                        that.detailchart=false;
                        var html = '';
                        //应遍历数组properties._propertyNames
                        for(var i=0;i<keyArr.length;i++){
                            //暂时用假数据
                            let key = keyArr[i];
                            let value = properties[key]._value;
                            if(value !== ''){
                                html += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
                            }
                        }
                        if (html.length > 0) {
                            html = '<table style="margin:0 auto;margin-top: 15px"><tbody>' + html + '</tbody></table>';
                        }
                        var popContent = document.getElementById("popContent");
                        popContent.innerHTML = html;

                    }
                    that.arrPosition.tableLeft = pick.x +'px';
                    that.arrPosition.tableTop = pick.y -100 +'px';
                    that.isQueryshow=true;
                }
                else
                {
                    that.isQueryshow=false;
                }
            },Cesium.ScreenSpaceEventType.LEFT_CLICK);
            this.viewer.scene.postRender.addEventListener(function (e) {
                //pick世界坐标转屏幕坐标（e.position不存在）
                var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(that.viewer.scene, that.cartesian);
                //* 对象不能用等号判断相等。因为是引用型，如果内存地址不同，则不简单相等。需要判断值是否相等
                if(JSON.stringify(that.pick) !== JSON.stringify(pick)){
                    //判断会不会超出边界，超出的话不显示了。
                    that.arrPosition.tableLeft = pick.x +'px';
                    that.arrPosition.tableTop = pick.y -100 +'px';
                    that.pick = pick;
                }
            });
            handler.setInputAction(function(event){
                that.isQueryshow=false;
            },Cesium.ScreenSpaceEventType.LEFT_UP);
            handler.setInputAction(function(e){
                that.isQueryshow=false;
                if(that.viewer.camera.positionCartographic.height>200000&that.islabelshow)
                {
                    that.islabelshow=false
                    var option=that.echart.getOption();
                    option.series[0].label.show=false;
                    that.echart.setOption(option,true);
                }
                if(that.viewer.camera.positionCartographic.height<=200000&!that.islabelshow)
                {
                    that.islabelshow=true
                    var option=that.echart.getOption();
                    option.series[0].label.show=true;
                    that.echart.setOption(option,true);
                }
            },Cesium.ScreenSpaceEventType.WHEEL);
            handler.setInputAction(function(e){
                that.isQueryshow=false;
            },Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            },
        data() {
            return {
                istoumingdushow:false,
                selectyear:2016,
                TimeAxisStop:false,
                timeDataArray:  [],
                detail:true,
                detailchart:false,
                isQueryshow:false,
                cartesian:null,
                arrPosition:{'tableLeft':'0px','tableTop':'0px'},
                viewer:null,
                barSthjzsData: {
                },
                imageUrl:url,
                bhdtype:1,
                qlbhqLayer: null,
                qlbhqPointLayer: null,
                sydbhqLayer:null,
                sydbhqPointLayer:null,
                QlLayer:null,
                ShanxiLayer:null,
                queryLayer:null,
                echartdata:null,
                app:null,
                option:null,
                echart:null,
                zrbhdColorArray:["rgba(0,100,0)","rgba(0,128,0)",
                    "rgba(50,205,50)","rgba(144,238,144)","rgba(250,250,210)"],
                sydbhqColorArray:["rgba(0,100,255)","rgba(30,144,255)","rgba(100,149,237)",
                    "rgba(135,206,250)","rgba(225,255,255)","rgba(0,100,255)","rgba(30,144,255)","rgba(100,149,237)",
                    "rgba(135,206,250)","rgba(225,255,255)","rgba(0,100,255)","rgba(30,144,255)","rgba(100,149,237)",
                    "rgba(135,206,250)","rgba(225,255,255)"],
                /*pointscolorAyyay:["#ff0000","#ff9900","#ffff00","#00ff00","#085208"],*/
                pointscolorAyyay:["rgba(255,0,0)","rgba(255,128,0)",
                    "rgba(255,255,50)","rgba(100,255,100)","rgba(80,255,8)"],
                toumingdu:30,
                islabelshow:false
            }
        },
        computed: {
            timeIsStop : function() {
                var timeIsStop=false;
                timeIsStop = this.TimeAxisStop;
                return timeIsStop;
            },
            timeDataNode: function() {
                var timeData={};
                timeData.dataArr = this.timeDataArray;
                return timeData;
            }
        },
        methods: {
           async changetoumingdu(){
               var option=this.echart.getOption();
               option.series[0].data=[];
               this.echart.setOption(option,true);
               this.echartdata=this.getechartdata(this.bhdtype,this.selectyear);
               this.setechart();
               this.loadqlbhdxj();
              /* var neighborhoodEntities = this.qlbhqLayer.entities.values;
               for (var i = 0; i < neighborhoodEntities.length; i++) {
                   var entity = neighborhoodEntities[i];
                  // console.log(entity.polygon.material.color._value)
                   entity.polygon.material.color._value.alpha=this.toumingdu/100;
               }*/
            },
            alterMapByYear:function(year,url){
                this.selectyear=year;
                this.refreshDTdian();
            },
            closepopup(){
                this.isQueryshow=false;
            },
            //左右滑动特效
            async hide(i) {
                var div1 = document.getElementById("left1");
                if (div1.style.width == "22%") {
                    div1.style.width = "0px";
                } else {
                    div1.style.width = "22%";
                }
            },
            //滚动函数，需要搭配div样式使用
            newscroll(divid) {
                var box = document.getElementById(divid);

                function scrollup() {
                    //卷去高度 >= 元素内容总高度 - 元素像素高度，此时滚动到最后一个条目
                    if ((box.scrollHeight - box.clientHeight) - box.scrollTop < 10) {
                        //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
                        box.scrollTop = 0;
                    } else {
                        box.scrollTop += 10;
                    }
                }

                var scrollMove = setInterval(scrollup, 250);//数值越大，滚动速度越慢
                //鼠标经过时，滚动停止
                box.onmouseover = function () {
                    clearInterval(scrollMove)
                }
                //鼠标离开时，滚动继续
                box.onmouseout = function () {
                    scrollMove = setInterval(scrollup, 250);
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
                    /*var cgs2000Ellipsolid = new Cesium.Ellipsoid(6378137.0, 6378137.0, 6356752.31414035585)
                    var myGeographicTilingScheme = new Cesium.GeographicTilingScheme({
                        ellipsoid: cgs2000Ellipsolid,
                        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                        numberOfLevelZeroTilesX: 4,
                        numberOfLevelZeroTilesY: 2
                    })
                    var esriWMTS = new Cesium.ArcGisMapServerImageryProvider({
                        url: 'http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly20162/MapServer',
                        layer: 'hjjczz_tdly20162',
                        tilingScheme: myGeographicTilingScheme,
                        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                        minimumLevel: 0,
                        ellipsoid: cgs2000Ellipsolid,
                        maximumLevel: 14
                    })

                    var cgs2000GeographicProj = new Cesium.GeographicProjection(cgs2000Ellipsolid)
                    this.app = new YsCesium("map",{
                        imageryProvider: esriWMTS,
                        mapProjection: cgs2000GeographicProj,
                    });*/
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
            //添加地图服务
            addwmtsservice() {
                var provider = new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://10.61.117.57:6080/arcgis/rest/services/hjjczz/test/MapServer/WMTS/tile/1.0.0/hjjczz_test/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
                    layer: 'hjjczz_test',
                    style: 'default',
                    tileMatrixSetID: 'default028mm',
                    format: 'image/png',
                    tilingScheme:new Cesium.GeographicTilingScheme(),
                    maximumLevel: 8,
                    tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7','8'] // 对应2.4中的tileMatrix Identifier属性
                });
                this.viewer.imageryLayers.addImageryProvider(provider);
            },
            /*  addwmtsservice() {
                  var provider = new Cesium.ArcGisMapServerImageryProvider({
                      //url: 'http://10.61.117.57:6080/arcgis/rest/services/SampleWorldCities/MapServer',
                      url: 'http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly20162/MapServer',
                  });
                  this.viewer.imageryLayers.addImageryProvider(provider);
              },*/
            /*addwmtsservice() {
                var cgs2000Ellipsolid = new Cesium.Ellipsoid(6378137.0, 6378137.0, 6356752.31414035585)
                var myGeographicTilingScheme = new Cesium.GeographicTilingScheme({
                    ellipsoid: cgs2000Ellipsolid,
                    rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                    numberOfLevelZeroTilesX: 4,
                    numberOfLevelZeroTilesY: 2
                })
                var esriWMTS = new Cesium.ArcGisMapServerImageryProvider({
                    url: 'http://10.61.117.57:6080/arcgis/rest/services/hjjczz/tdly20162/MapServer',
                    layer: 'hjjczz_tdly20162',
                    tilingScheme: myGeographicTilingScheme,
                    rectangle: myRectangle,
                    minimumLevel: 0,
                    ellipsoid: cgs2000Ellipsolid,
                    maximumLevel: 14
                })


                this.viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(119.56156642831284, 32.419457329767326, 272683)
                })
            },*/
            //缩放到陕西
            zoomtoRangle() {
                var center = Cesium.Cartesian3.fromDegrees(105, 31.4, 0);
                var center2 = Cesium.Cartesian3.fromDegrees(111, 39.3, 0);
                var rec = Cesium.Rectangle.fromCartesianArray([center, center2]);
                var boundingSphere = Cesium.BoundingSphere.fromRectangle3D(rec);
                boundingSphere.radius = boundingSphere.radius * 1.0;
                this.viewer.camera.flyToBoundingSphere(boundingSphere, {
                    duration: 3,
                    maximumHeight: 1000,
                    offset: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-60),
                        range: 0.0
                    }
                });
            },
            //添加秦岭json文件
            async loadQLjson() {
                let json = require("../../assets/js/geojson/sxqinling.json");
                //设置geojson线条、填充样式。load方法是个promise，用异步处理。
                let res = await Cesium.GeoJsonDataSource.load(json);
                this.SetSymbol2(res,this.QlLayer);
                this.viewer.flyTo(res);
            },
            SetSymbol2(dataSource,layername){
                var neighborhoodEntities = dataSource.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    var entity = neighborhoodEntities[i];
                    entity.polygon.material=Cesium.Color.fromCssColorString("rgb(255,255,255,0.0)")
                    layername.entities.add(entity);
                }
            },
            // 添加秦岭保护区geojson
            async loadqlbhdxj() {
                let json = require("../../assets/er/bhdGeojson/qlall.json");
                var geojsonOptions = {
                    clampToGround: true
                };
                let dataPromise = await Cesium.GeoJsonDataSource.load(json, geojsonOptions);
              //  this.viewer.dataSources.add(dataPromise);
                this.SetSymbol(dataPromise, this.zrbhdColorArray, "_NAME", "_GRADE",this.qlbhqLayer);
            },
            //分类设置symbol，数据源，颜色条，labelname，分类的字段。
            async SetSymbol(dataSource, colorArray, name, type,layername) {
                layername.entities.removeAll();
                var typeArray = [];
                var neighborhoodEntities = dataSource.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    var entity = neighborhoodEntities[i];
                    if (Cesium.defined(entity.polygon)) {
                       entity.name = entity.properties[name]._value;
                        if (typeArray.indexOf(entity.properties[type]._value) < 0) {
                            typeArray.push(entity.properties[type]._value);
                            //cssColor:值可以是 #ffccdd, rgb(255，255，255)，rgb(255，0，255，0.5)
                            entity.polygon.material = Cesium.Color.fromCssColorString(colorArray[typeArray.length]).
                            withAlpha(this.toumingdu/100);
                        } else {
                            entity.polygon.material = Cesium.Color.fromCssColorString
                            (colorArray[typeArray.indexOf(entity.properties[type]._value)]).withAlpha(this.toumingdu/100);
                        }
                        entity.polygon.outline = false;
                    }
                    layername.entities.add(entity);
                }
            },
            //查询关键字，关键字的字段
            async querydataPromise(name, field,layername) {
                var array = new Object();
                array.type = "FeatureCollection";
                array.features = new Array();
                if (this.bhdtype == 1) {
                    let json = require("../../assets/er/bhdGeojson/qlall.json");
                    for (var i = 0; i < json.features.length; i++) {
                        var feature = json.features[i];
                        if (feature.properties[field] == name) {
                            array.features.push(feature);
                        }
                    }
                } else {

                }
                let res = await Cesium.GeoJsonDataSource.load(array, {
                    stroke: Cesium.Color.BLACK,
                    fill: Cesium.Color.YELLOW.withAlpha(0.2),
                    strokeWidth: 5
                });
                var neighborhoodEntities = res.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    layername.entities.add(neighborhoodEntities[i]);
                }
                this.viewer.flyTo(res);
            },
            //定位到图斑
            ListClick(name) {
                this.querydataPromise(name.name, "NAME",this.queryLayer);
            },
            //添加秦岭点。
            async addDTpoints(){
                let json = require("../../assets/er/bhdGeojson/QLpoints.json");
                var geojsonOptions = {
                    clampToGround: true
                };
                let dataPromise = await Cesium.GeoJsonDataSource.load(json, geojsonOptions);
                this.addCircleRipple(dataPromise,this.qlbhqPointLayer);
            },
            //添加圈圈方法。
            async addCircleRipple(dataSource,thislayer){
                thislayer.entities.removeAll();
                var neighborhoodEntities = dataSource.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    var entity = neighborhoodEntities[i];
                    entity.billboard = undefined;
                    entity.name="保护区点"
                    entity.point = new Cesium.PointGraphics({
                        color: Cesium.Color.WHITE.withAlpha(this.toumingdu/100),
                        pixelSize: 10,
                    });
                    entity.point.outline = false;
                   /* entity.label={
                        text: ''+entity.properties.保护区._value,
                        showBackground: false,
                        scale: 0.7,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000.0, 100000.0),
                    };*/
                    thislayer.entities.add(entity);
                }
            },
            //添加echart动态点图层
            getechartdata(type,year){
                var array=new Array();
                if(type==1)
                {
                    var json = require("../../assets/er/bhdGeojson/QLpoints.json");
                    for (var i = 0; i < json.features.length; i++) {
                        var feature = json.features[i];
                        var thisfeature=new Object();
                        thisfeature["name"]=feature.properties["保护区"]+"";
                        var value=feature.properties["F"+year+"开"].toFixed(2);
                        thisfeature["value"]= feature.geometry["coordinates"].concat(value);
                        array.push(thisfeature);
                    }
                }
                return array;
            },
            //设置动态圈圈echarts
            setechart(){
                var that=this;
                this.option = {
                    animation: !1,
                    GLMap: {},
                    series: [
                        {
                            name: '前5',
                            type: 'effectScatter',
                            coordinateSystem: 'GLMap',
                            data: this.echartdata,
                            symbolSize: function (val) {
                                var size=100;
                                if(val[2]>30) {
                                    size=30;
                                }else if(val[2]>13){
                                    size=25;
                                }
                                else if(val[2]>6){
                                    size=20;
                                }else if(val[2]>1.3){
                                    size=15;
                                }else {
                                    size=10;
                                }
                                return size
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'bottom',
                                    show: false,
                                    color:"#fff",
                                    textStyle:{
                                        fontSize:20
                                    }
                                }
                            },
                            itemStyle:{
                                color: function (val) {
                                    if(val.value[2]>30) {
                                       return 'rgba(255,0,0,'+that.toumingdu/100+')';
                                    }else if(val.value[2]>13){
                                        return 'rgba(255,128,0,'+that.toumingdu/100+')';
                                    }
                                    else if(val.value[2]>6){
                                        return 'rgba(255,255,0,'+that.toumingdu/100+')';
                                    }else if(val.value[2]>1.3){
                                        return 'rgba(100,255,100,'+that.toumingdu/100+')';
                                    }else {
                                        return 'rgba(80,255,8,'+that.toumingdu/100+')';
                                    }
                                },
                                shadowBlur:20,
                                shadowColor:'#fff'
                            },
                            zlevel: 1
                        }
                    ]
                };
                this.echart=this.app.combineEcharts(this.option);
                         },
            //更新圈圈数据
            refreshDTdian(){
                var option=this.echart.getOption();
                option.series[0].data=this.getechartdata(this.bhdtype,this.selectyear);
                this.echart.setOption(option,true);
            },


        }
    }

</script>

<style lang="scss" scoped>
    .popcotent{
       /* height: 200px;
        width: 200px;*/
        margin: 20px;
        text-align:center;
        font-size: 14px;
    }
    .attribute{
       /* width: 250px;
        height: 250px;*/
        padding: 20px;
        border: 1px solid rgba(70,187,243,0.53);
        border-radius: 10px;
        background: rgba(3, 73, 114, 0.7);
        color: #fff;
        box-shadow: inset 0 0 8px 2px rgba(70,187,243,0.53);
    }
    .list1{
        min-height:235px;
    }
    .leftdivborder{
        position:absolute;top:0px;right:-35px;height: 100%;width:60px;
        background: url('../../assets/er/images/zhuzi.png');background-size: 100% 100%;
    }
    .leftdivbutton{
        position:absolute;top:10%;right:-60px;height: 64px;width:64px;
        background: url("../../assets/er/images/熊猫.png");
        background-size:100% 100%;
    }
    .rightdivbutton{
        position:absolute;top:80%;left:-64px;
        height: 64px;width:64px;
        background: url("../../assets/er/images/鱼.png");
        background-size:100% 100%;
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
        ul{
            li{
                font-size: 1.6rem;
                margin-top: 15px;
                box-sizing:border-box;
                text-align: center;
                color: #eee;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                width:100%;
                cursor: pointer;
            }
            li:hover{
                color: #72dbd3;
            }
        }
    }
    .list1{
        min-height:235px;
    }
</style>