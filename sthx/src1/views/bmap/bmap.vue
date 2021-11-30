<template>
    <div>
    <div id="container">
       </div>
    <div  id='result' v-show="alive">
        经度: <input id="lng" type="text"/>
        纬度: <input id="lat" type="text"/>
        <button @click="theLocation">查询</button>
    </div>
        <div class="info" id="r-result" v-show="isShow">景点查询:<input type="text" id="suggestId" size="20" value="景点" ref="place" style="width:150px;" /><button @click="searchPOI">查询</button><button @click="clearMarker">清除标记</button></div>
    </div>
<!--    <div class = "info">返回北京市“景点”关键字的检索结果，并展示在地图上</div>-->
</template>
<script>
import {BMPGL} from "../../assets/js/bmap/bmpgl.js";

export default {
    name:'map',
    data(){
        return{
            ak:"NjDEPza8cZjtIG8hs5OyOM3ycKvy8mMj",
            isShow:false,
            alive: false,
        };
    },
    mounted(){
        this.initMap();
        // this.isShow=false;
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    methods:{
        initMap(){
            BMPGL(this.ak)
            .then(BMapGL => {
                //创建地图实例
                let map = new BMapGL.Map("container");
                map.centerAndZoom("鄠邑区",15);
                map.enableScrollWheelZoom(true);
                // map.setMapType(BMAP_EARTH_MAP);

                // 覆盖区域图层测试
                // map.addTileLayer(new BMapGL.PanoramaCoverageLayer());
                let navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
                map.addControl(navi3DCtrl);
                // var stCtrl = new BMapGL.PanoramaControl(); //构造全景控件
                // stCtrl.setOffset(new BMap.Size(20, 20));
                // map.addControl(stCtrl);//添加全景控件
                window.map=map;



                //定义一个控件类
                function ZoomControl() {
                    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
                    this.defaultOffset = new BMapGL.Size(10, 170)
                }
                //通过JavaScript的prototype属性继承于BMap.Control
                ZoomControl.prototype = new BMapGL.Control();

                //自定义控件必须实现自己的initialize方法，并且将控件的DOM元素返回
                //在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
                let bma=this;
                ZoomControl.prototype.initialize = function(map) {
                    //创建一个dom元素

                    var div = document.createElement('div');
                    //添加文字说明
                    div.appendChild(document.createTextNode('POI'));
                    // 设置样式
                    div.style.cursor = "pointer";
                    div.style.padding = "7px 10px";
                    div.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.15)";
                    div.style.borderRadius = "5px";
                    div.style.backgroundColor = "white";
                    div.style.color = "#8B8B8B";
                    // 绑定事件,点击一次放大两级
                    div.onclick = function(e){
                        // map.setZoom(map.getZoom() + 2);
                        // this.isShow =false;
                        // this.reload();
                        // this.isShow =(this.isShow!=false)?false:true ;
                        bma.refresh(),
                        // this.isShow= true;
                        console.log(this.isShow)
                    }
                    // 添加DOM元素到地图中
                    map.getContainer().appendChild(div);
                    // 将DOM元素返回
                    return div;
                }
                //创建控件元素
                var myZoomCtrl = new ZoomControl();
                //添加到地图中
                map.addControl(myZoomCtrl);

                //定义一个控件类
                function XYSearch() {
                    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
                    this.defaultOffset = new BMapGL.Size(10, 200)
                }
                //通过JavaScript的prototype属性继承于BMap.Control
                XYSearch.prototype = new BMapGL.Control();

                //自定义控件必须实现自己的initialize方法，并且将控件的DOM元素返回
                //在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中

                XYSearch.prototype.initialize = function(map) {
                    //创建一个dom元素

                    var div = document.createElement('div');
                    //添加文字说明
                    div.appendChild(document.createTextNode('XY'));
                    // 设置样式
                    div.style.cursor = "pointer";
                    div.style.padding = "7px 10px";
                    div.style.boxShadow = "0 2px 6px 0 rgba(0, 0, 0, 0.15)";
                    div.style.borderRadius = "5px";
                    div.style.backgroundColor = "white";
                    div.style.color = "#8B8B8B";
                    // 绑定事件,点击一次放大两级
                    div.onclick = function(e){
                        // map.setZoom(map.getZoom() + 2);
                        // this.isShow =false;
                        // this.reload();
                        // this.isShow =(this.isShow!=false)?false:true ;
                        bma.refreshXY(),
                            // this.isShow= true;
                            console.log(this.isShow)
                    }
                    // 添加DOM元素到地图中
                    map.getContainer().appendChild(div);
                    // 将DOM元素返回
                    return div;
                }
                //创建控件元素
                var myZoomCtrl = new XYSearch();
                //添加到地图中
                map.addControl(myZoomCtrl);
            })
        },
        refresh(){
            if(this.isShow == false){
                // this.$nextTick(() => {
                this.isShow=true;
                // })
            }else{
                // this.$nextTick(() => {
                this.isShow = false;
                // })
            }

        },
        refreshXY(){
            if(this.alive == false){
                // this.$nextTick(() => {
                this.alive=true;
                // })
            }else{
                // this.$nextTick(() => {
                this.alive = false;
                // })
            }

        },
        searchPOI(){
            //搜索框
            var local = new BMapGL.LocalSearch(map, {
                renderOptions:{map: map}
            });
            local.search(this.$refs.place.value);
        },
        reload() {
            this.alive = false;
            this.$nextTick(() => {
                this.alive = true
            })
        },
        clearMarker(){
            window.map.clearOverlays();
            this.$refs.place.value="";
        },
      theLocation(){
    if(document.getElementById("lng").value != "" && document.getElementById("lat").value != ""){
        window.map.clearOverlays();
        var new_point = new BMapGL.Point(document.getElementById("lng").value,document.getElementById("lat").value);

        //坐标转换完之后的回调函数
       let translateCallback = function (data){
            console.log(data);
            if(data.status === 0) {
                var marker = new BMapGL.Marker(data.points[0]);
                window.map.addOverlay(marker);
                //var label = new BMapGL.Label("转换后的百度标注（正确）",{offset:new BMapGL.Size(20,-10)});
                // marker.setLabel(label); //添加百度label
                window.map.setCenter(data.points[0]);
            }
        }

        setTimeout(function(){
            var convertor = new BMapGL.Convertor();
            var pointArr = [];
            pointArr.push(new_point);
            //console.log(new_point);
            // console.log(pointArr);
            convertor.translate(pointArr, COORDINATES_GCJ02, COORDINATES_BD09, translateCallback)
        }, 1000);

    }
}
}


}
</script>
<style>
    /* The container of BaiduMap must be set width & height. */

    .anchorBL{display:none}
    #container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "微软雅黑";
    }
    #result{
        padding: 7px 10px;
        position: fixed;
        top: 15rem;
        left: 20px;
        width: 450px;
        background: #fff;
        box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
        border-radius: 7px;
        z-index: 99;
    }
    #result input{
        width:130px;
        margin-right:10px;
        height:25px;
        border: 1px solid rgba(27, 142, 236, 0.5);
        border-radius: 5px;
    }
    #result button{
        border: 1px solid rgba(27, 142, 236, 0.5);
        border-radius: 5px;
        background: rgba(27, 142, 236, 0.5);
        color: #fff
    }
    .info {
        z-index: 999;
        width: auto;
        min-width: 22rem;
        padding: .75rem 1.25rem;
        margin-left: 1.25rem;
        position: fixed;
        top: 10rem;
        background-color: #fff;
        border-radius: .25rem;
        font-size: 14px;
        color: #666;
        box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    }
    #r-result button{
        border: 1px solid rgba(27, 142, 236, 0.5);
        border-radius: 5px;
        background: rgba(27, 142, 236, 0.5);
        color: #fff
    }
</style>
