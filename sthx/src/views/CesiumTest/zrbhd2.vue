<template>
    <div class="mainview">
        <div  id="cesiumContainer" style="height: 100%;width: 100%">
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
            <div class="leftdivbutton" @click="hide(1)"></div>
        </div>
        <div class="rightdiv"  id="left2" style="width:0px;flex-direction: row;transition:width 1s">
            <Box title="陕西水源地保护区" style="flex:1;">
                <div id="boxlist2" class="boxlist" slot="content" >
                    <ul class="list1">
                        <li  v-for="(danwei,index) in namelist.sydbhq"
                             v-bind:key="index" v-on:click="ListClick(danwei)">
                            {{danwei.name}}
                        </li>
                    </ul>
                </div>
            </Box>
            <div class="rightdivbutton" @click="hide(2)"></div>
        </div>
    </div>
</template>

<script>
    import Box from "../../components/common/er/box";
    import barSthjzs from "../../components/charts/bar/stzkpj/barSthjzs.vue";
    import url from  "../../assets/er/images/initw.jpg"
    import ol from "openlayers";
    export default {
        components: {
            Box,
            barSthjzs,
        },
        name: "",
        async mounted() {
            this.newscroll("boxlist1");
            this.newscroll("boxlist2");
            this.initMap(3);
            //this.addwmtsservice();
            this.zoomtoRangle();
            /* var lon=117.286419;
             var lat=31.864436;
             this.addCircleRipple(this.viewer,{ //默认只绘制两个圆圈叠加 如遇绘制多个，请自行源码内添加。
                 id:"111",
                 lon:lon,
                 lat:lat,
                 height:500,
                 maxR:30000,
                 minR:0,//最好为0
                 deviationR:500,//差值 差值也大 速度越快
                 eachInterval:2000,//两个圈的时间间隔
                 imageUrl:"../../assets/er/images/圆.png"
             });*/
            this.QlLayer = new Cesium.CustomDataSource();
            this.qlbhqLayer = new Cesium.CustomDataSource();
            this.qlbhqPointLayer = new Cesium.CustomDataSource();
            this.queryLayer= new Cesium.CustomDataSource();
            this.viewer.dataSources.add(this.QlLayer);
            this.viewer.dataSources.add(this.qlbhqLayer);
            this.viewer.dataSources.add(this.qlbhqPointLayer);
            this.viewer.dataSources.add(this.queryLayer);
            await this.loadQLjson();
            await  this.loadqlbhdxj();
            await  this.addDTpoints();
        },
        data() {
            return {
                barSthjzsData: {
                    xAxis: ["q", "w", "ee"],
                    yAxis: [10, 11, 29]
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
            zrbhdColorArray:["rgba(0,100,0,0.4)","rgba(0,128,0,0.3)",
                    "rgba(50,205,50,0.4)","rgba(144,238,144,0.4)","rgba(250,250,210,0.3)"],
                sydbhqColorArray:["rgba(0,100,255,0.3)","rgba(30,144,255,0.3)","rgba(100,149,237,0.3)",
                "rgba(135,206,250,0.3)","rgba(225,255,255,0.3)","rgba(0,100,255,0.3)","rgba(30,144,255,0.3)","rgba(100,149,237,0.3)",
                "rgba(135,206,250,0.3)","rgba(225,255,255,0.3)","rgba(0,100,255,0.3)","rgba(30,144,255,0.3)","rgba(100,149,237,0.3)",
                "rgba(135,206,250,0.3)","rgba(225,255,255,0.3)"],
                pointscolorAyyay:["#085208","#00ff00","#ffff00","#ff9900","#ff0000"],
            }
        },
        methods: {
            //左右滑动特效
            hide(i) {
                var div1 = document.getElementById("left1");
                var div2 = document.getElementById("left2");
                if (div1.style.width == "22%") {
                    div1.style.width = "0px";
                    div2.style.width = "22%";
                    this.bhdtype = 2;
                } else {
                    div2.style.width = "0px";
                    div1.style.width = "22%";
                    this.bhdtype = 1;
                }
                if (this.bhdtype == 1) {
                    this.viewer.dataSources.add(this.QlLayer);
                    this.viewer.dataSources.add(this.qlbhqLayer);
                    this.viewer.dataSources.add(this.qlbhqPointLayer);
                } else {
                    this.viewer.dataSources.remove(this.QlLayer);
                    this.viewer.dataSources.remove(this.qlbhqLayer);
                    this.viewer.dataSources.remove(this.qlbhqPointLayer);
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
                    //设置cesium的home为中国
                    this.viewer = new Cesium.Viewer('cesiumContainer', {
                        // 需要进行可视化的数据源的集合
                        animation: false, // 是否显示动画控件
                        shouldAnimate: true,
                        homeButton: true, // 是否显示Home按钮
                        fullscreenButton: true, // 是否显示全屏按钮
                        baseLayerPicker: false, // 是否显示图层选择控件
                        geocoder: true, // 是否显示地名查找控件
                        timeline: false, // 是否显示时间线控件
                        sceneModePicker: true, // 是否显示投影方式控件
                        navigationHelpButton: false, // 是否显示帮助信息控件
                        infoBox: true, // 是否显示点击要素之后显示的信息
                        requestRenderMode: true, // 启用请求渲染模式
                        scene3DOnly: true, // 每个几何实例将只能以3D渲染以节省GPU内存
                        sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                        fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处
                        //加载单张图片为影像服务(给球表面贴一张图)
                        imageryProvider: new Cesium.SingleTileImageryProvider({
                            url: this.imageUrl
                        })
                    })
                    // 去除版权信息
                    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
                    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
                }
            },
            //添加地图服务
            addwmtsservice() {
                var provider = new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://10.61.10.133:6080/arcgis/rest/services/hjjczz2/2/MapServer/tile/{TileMatrix}/{TileRow}/{TileCol}',
                    layer: 'hjjczz2_2',
                    style: 'default',
                    tileMatrixSetID: 'default028mm',
                    format: 'image/png',
                    maximumLevel: 8,
                    tileMatrixLabels: ['0', '1', '2', '3', '4', '5', '6', '7'] // 对应2.4中的tileMatrix Identifier属性
                });
                this.viewer.imageryLayers.addImageryProvider(provider);
            },
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
            },
            // 添加陕西县级geojson
            async loadqlbhdxj() {
                let json = require("../../assets/js/geojson/sxxj.json");
                var geojsonOptions = {
                    clampToGround: true
                };
                let dataPromise = await Cesium.GeoJsonDataSource.load(json, geojsonOptions);
              //  this.viewer.dataSources.add(dataPromise);
                this.SetSymbol(dataPromise, this.sydbhqColorArray, "_NAME", "_市",this.qlbhqLayer);
                return dataPromise;
            },
            //添加动态点。
            async addDTpoints(){
                let json = require("../../assets/js/geojson/yys.json");
                var geojsonOptions = {
                    clampToGround: false
                };
                let dataPromise = await Cesium.GeoJsonDataSource.load(json, geojsonOptions);
                this.addCircleRipple(this.viewer,dataPromise,this.pointscolorAyyay,this.qlbhqPointLayer);
            },

            SetSymbol2(dataSource,layername){
                var neighborhoodEntities = dataSource.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    var entity = neighborhoodEntities[i];
                    entity.polygon.material=Cesium.Color.fromCssColorString("rgba(255,255,255,0.3)");
                    layername.entities.add(entity);
                }
            },
            //分类设置symbol，数据源，颜色条，labelname，分类的字段。
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
            //查询关键字，关键字的字段
            async querydataPromise(name, field,layername) {
                var array = new Object();
                array.type = "FeatureCollection";
                array.features = new Array();
                if (this.bhdtype == 1) {
                    var json = require("../../assets/js/geojson/sxxj.json");
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
                /*var neighborhoodEntities = res.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {

                }
                layername*/
                this.viewer.flyTo(res);
                this.viewer.dataSources.add(res);
            },
            //定位到图斑
            ListClick(name) {
                var name = "铜川市";
                this.querydataPromise(name, "市");
            },
            //添加动态圈圈方法。
            addCircleRipple(viewer,dataSource,colorAyyay,thislayer){
                var neighborhoodEntities = dataSource.entities.values;
                for (var i = 0; i < neighborhoodEntities.length; i++) {
                    var entity = neighborhoodEntities[i];
                    var data= new Object();
                    if(entity.properties.分级._value>10)
                    {
                        data.maxR=6000;
                        data.minR=0;
                        data.deviationR=200;
                        data.eachInterval=3000;
                        data.color=colorAyyay[0];
                        data.imageUrl='../../assets/er/images/zuo.png';
                    }else
                    {
                        data.maxR=3000;
                        data.minR=0;
                        data.deviationR=100;
                        data.eachInterval=3000;
                        data.color=colorAyyay[2];
                        data.imageUrl='../../assets/er/images/zuo.png';
                    }
                    var r1=data.minR,r2=data.minR;
                    function changeR1() { //这是callback，参数不能内传
                        r1=r1+data.deviationR;
                        if(r1>=data.maxR){
                            r1=data.minR;
                        }

                        return r1;
                    }
                    function changeR2() {
                        r2=r2+data.deviationR;
                        if(r2>=data.maxR){
                            r2=data.minR;
                        }
                        return r2;
                    }
                    entity.billboard=null;
                    entity.label={
                        text: ''+entity.properties.分级._value,
                        showBackground: false,
                        scale: 0.7,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000.0, 300000.0),
                    };
                    entity.ellipse={
                        semiMinorAxis :new Cesium.CallbackProperty(changeR1,false),
                        semiMajorAxis :new Cesium.CallbackProperty(changeR1,false),
                        height:data.height,
                        material:new Cesium.ImageMaterialProperty({
                            image:data.imageUrl,
                            repeat:new Cesium.Cartesian2(1.0, 1.0),
                            transparent:true,
                            color:new Cesium.CallbackProperty(function () {
                                var alp=1-r1/data.maxR;
                                //return Cesium.Color.WHITE.withAlpha(alp)
                               return Cesium.Color.fromCssColorString( data.color).withAlpha(alp) //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                            },false)
                        })
                    };
                    setTimeout(function () {
                        entity.ellipse={
                            semiMinorAxis :new Cesium.CallbackProperty(changeR2,false),
                            semiMajorAxis :new Cesium.CallbackProperty(changeR2,false),
                            height:data.height,
                            material:new Cesium.ImageMaterialProperty({
                                image:data.imageUrl,
                                repeat:new Cesium.Cartesian2(1.0, 1.0),
                                transparent:true,
                                color:new Cesium.CallbackProperty(function () {
                                    var alp=1;
                                    alp=1-r2/data.maxR;
                                    return Cesium.Color.fromCssColorString(data.color).withAlpha(alp)
                                },false)
                            })
                        }
                    },data.eachInterval)
                    thislayer.entities.add(entity);
                }
               /* viewer.entities.add({
                    id:data.id,
                    name:"",
                    position:Cesium.Cartesian3.fromDegrees(data.lon,data.lat,data.height),
                    ellipse : {
                        semiMinorAxis :new Cesium.CallbackProperty(changeR1,false),
                        semiMajorAxis :new Cesium.CallbackProperty(changeR1,false),
                        height:data.height,
                        material:new Cesium.ImageMaterialProperty({
                            image:data.imageUrl,
                            repeat:new Cesium.Cartesian2(1.0, 1.0),
                            transparent:true,
                            color:new Cesium.CallbackProperty(function () {
                                var alp=1-r1/data.maxR;
                                return Cesium.Color.RED.withAlpha(alp)  //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                            },false)
                        })
                    }
                });
                setTimeout(function () {
                    viewer.entities.add({
                        name:"",
                        position:Cesium.Cartesian3.fromDegrees(data.lon,data.lat,data.height),
                        ellipse : {
                            semiMinorAxis :new Cesium.CallbackProperty(changeR2,false),
                            semiMajorAxis :new Cesium.CallbackProperty(changeR2,false),
                            height:data.height,
                            material:new Cesium.ImageMaterialProperty({
                                image:data.imageUrl,
                                repeat:new Cesium.Cartesian2(1.0, 1.0),
                                transparent:true,
                                color:new Cesium.CallbackProperty(function () {
                                    var alp=1;
                                    alp=1-r2/data.maxR;
                                    return Cesium.Color.RED.withAlpha(alp)
                                },false)
                            })
                        }
                    });
                },data.eachInterval)*/
            },

        }
    }

</script>

<style lang="scss" scoped>

    .list1{
        min-height:235px;
    }
    .leftdivbutton{
        position:absolute;top:10%;right:-60px;height: 80px;width:80px;
        background-color:#d800d8;
        background: url("../../assets/er/images/熊猫.png");
        background-size:100% 100%;
    }
    .rightdivbutton{
        position:absolute;top:80%;left:-80px;
        height: 80px;width:80px;background-color:#d800d8;
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
                font-size: 1.6em;
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
