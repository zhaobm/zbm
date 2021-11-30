<template>
<div class="dark">
    <div id= "poiPopup" class="ol-popup" :class={popupShow:isPopupShow}>
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closePopup()"></a>
        <div class="pop-content">
            <span class="poiName">地名：{{poiName}}</span>
            <span class="poiAddress">地址：{{poiAddress}}</span>
        </div>
    </div>
    <div id="map-querybar" class="querybar-ssk animation-slide-top no-print-view" :class={active:widgetActiveFlag}>
        <input id="txt_querypoi" type="search" class="querybar-ssk1" placeholder="搜索 地点  "  v-model="searchPOI"/>
        <button id="btn_querypoi" type="button" value="" class="querybar-ssk2"  @click="btnQueryPoi()">
            <i class="mdi mdi-magnify"></i>
        </button>
        <div class="querybar-clear"></div>
        <!--搜索结果列表-->
        <!--
        <div id="querybar_resultlist_view" class="querybar-sbox querybar_resultlist_view" :class={active:isResultListActive}>
            <div class="querybar-site">
                <div class="querybar-sitejj">
                    <h3>1、Globe3D安徽总队</h3>
                    <p>合肥市安徽区玉兰大道8号</p>
                </div>
            </div>
            <div class="querybar-site">
                <div class="querybar-sitejj">
                    <h3>2、Globe3D安徽总队医院</h3>
                    <p>合肥市庐阳区长丰路78号</p>
                </div>
            </div>
            <div class="querybar-site">
                <div class="querybar-sitejj">
                    <h3>3、Globe3D医院-公交车站</h3>
                    <p>113路;125路;138路;t13b路;t13路;</p>
                </div>
            </div>

            <div class="querybar-page">
                <div class="querybar-fl">
                    找到<strong>134</strong>条结果
                </div>
                <div class="querybar-ye querybar-fr">
                    1/7页 <a href="javascript:void(0)">首页</a> <a href="javascript:void(0)">&lt;</a> <a href="javascript:void(0)">&gt;</a>
                </div>
            </div>
        </div>
         -->
        <div id="querybar_resultlist_view" class="querybar-sbox querybar_resultlist_view" :class={active:isResultListActive}>
            <div class="querybar-site">
                <div class="querybar-sitejj" v-for="(item ,index) in PoiListHasCount" :key="item" @click="poiItemClick(index)">
                    <h3>{{item.name}}</h3>
                    <p>{{item.address}}</p>
                </div>
            </div>
            <div class="querybar-page">
                <div class="querybar-fl">
                    找到<strong>{{PoiTotalCount}}</strong>条结果
                </div>
                <div class="querybar-ye querybar-fr">
                    {{curPage}}/{{totalPage}}页 <a href="javascript:void(0)" @click="firstPage()">首页</a> <a href="javascript:void(0)" @click="prePage()">&lt;</a> <a href="javascript:void(0)"  @click="nextPage()">&gt;</a>
                </div>
            </div>
        </div>
    </div>
    
    <img src="../../assets/images/poi/result_1.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_2.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_3.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_4.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_5.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_6.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_7.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_8.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_9.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_10.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_1_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_2_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_3_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_4_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_5_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_6_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_7_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_8_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_9_x.png" alt="" v-show=false>
    <img src="../../assets/images/poi/result_10_x.png" alt="" v-show=false>
</div>
</template>

<script>

import * as api from "../../assets/js/api/search.js";
import ol from 'openlayers';

export default {
    name: "poiLocation",

    data() {
        return {
            isResultListActive: true,
            PoiList:[],
            PoiListHasCount:[],
            PoiTotalCount:0,
            curPage : 1,
            totalPage: 1,
            poiVectorSource : null,
            poiVectorLayer:null,
            preLngLat : [],
            preName : "",
            preAddress : "",
            poiData : {},
            poiStyleArr:[],
            poiCueStyleArr:[],
            Popup:{},
            isPopupShow:false,
            poiName:"",
            poiAddress:"",
            searchPOI:"",
            select : null,
        };
    },
    props: {
        widgetActiveFlag: {
            default: function(){
                return false;
            }
        },
        mapbox:{
            type: Object,
            default: () => {
                return map;
            }
        },
        tablename: {
            default: function(){
                return "";
            }
        },
        fieldName: {
            default: function(){
                return "";
            }
        },
        JingDu: {
            default: function(){
                return "";
            }
        },
        WeiDu: {
            default: function(){
                return "";
            }
        },
        FieldWhere: {
            default: function(){
                return "";
            }
        },
    },
    watch: {

        widgetActiveFlag:{
            handler:function (val,val2) {
            console.log(val);
            if(!val){
                console.log("执行");
                this.resetPoiInfo();
                if(this.select!=null){
                    this.mapbox.removeInteraction(this.select);
                }
            }
        },
        deep:true
    },  
    },
    components: {
        
    },
    methods: {
        resetPoiInfo(){
            this.isPopupShow = false;
            if(this.poiVectorLayer!=null){
                if(this.poiVectorLayer.getSource()!=null){
                    this.poiVectorLayer.getSource().clear();
                }
            }
            this.PoiList = [];
            this.PoiListHasCount = [];
            this.PoiTotalCount = 0;
            this.curPage= 1;
            this.totalPage= 1;
            this.poiData = {};
            this.poiName="";
            this.poiAddress="";
        },
        resetPagePoiInfo(){
            this.isPopupShow = false;
            if(this.poiVectorLayer!=null){
                if(this.poiVectorLayer.getSource()!=null){
                    this.poiVectorLayer.getSource().clear();
                }
            }
            this.PoiList = [];
            this.poiData = {};
            this.poiName="";
            this.poiAddress="";
        },
        closePopup(){
            this.isPopupShow = false;
        },
        btnQueryPoi(){
            console.log('点击');
            //this.resetPoiInfo();
            this.curPage = 1;
            this.getPOIInfoBigScreen();
            console.log('FieldWhere',this.FieldWhere);
            //console.log(this.PoiListHasCount);
        },
        getPOIInfoBigScreen(){
             //模拟ajax获取的数据
            this.poiData = {};
            // 执行请求统计数据
            var statParams = {
              tablename:this.tablename,
              name:this.searchPOI,
              pageNum:this.curPage,

              fieldName: this.fieldName,
              JingDu: this.JingDu,
              WeiDu: this.WeiDu,
            
              FieldWhere:this.FieldWhere,
              
            }
            console.log('statParams',statParams);
            // 执行统计数据请求
            api.getPOIInfoBigScreen(statParams).then(res=>{
              
              var resultData = res.data;

              if(resultData){
                if(resultData.status == "success"){

                    
                    this.poiData = resultData.data;


                    this.PoiTotalCount = this.poiData.totalNum;
                    this.totalPage = Math.ceil(this.PoiTotalCount/10);
                    this.PoiList = this.poiData.list;
                    //添加序号
                    this.PoiListHasCount = [];
                    for(var i=0;i<this.PoiList.length;i++){
                        var poi = {name:(i+1)+"."+this.PoiList[i].name,lng:this.PoiList[i].lng,lat:this.PoiList[i].lat}
                        this.PoiListHasCount.push(poi);
                    }
                    console.log(this.PoiListHasCount);

                    
                    
                }
              }
            });

        },
        getPoiInfo(){
            var that = this;
            this.getPoiStyleArr();
            this.getCurPoiStyleArr();
            //初始化poiPopup
            var element = document.getElementById("poiPopup");
            this.Popup = {};
            this.Popup = new ol.Overlay({
                element : element,
                positioning: 'bottom-center',
                stopEvent:false,
                offset:[0,-50]
            });
            this.mapbox.addOverlay(this.Popup);

            this.preLngLat = [];
            this.preName = "",
            this.preAddress = "",
            //模拟ajax获取的数据
            this.poiData = {};
            // 执行请求统计数据
            var statParams = {
              name:this.searchPOI,
              pageNum:this.curPage,
            }
            // 执行统计数据请求
            api.getPOIInfo(statParams).then(res=>{
              var resultData = res.data;
              if(resultData){
                if(resultData.status == "success"){
                    this.poiData = resultData.data;

                    if(this.poiVectorLayer!=null){
                        if(this.poiVectorLayer.getSource()!=null){
                            this.poiVectorLayer.getSource().clear();
                        }  
                    }

                    this.PoiTotalCount = this.poiData.poiInfo.totalNum;
                    this.totalPage = Math.ceil(this.PoiTotalCount/10);
                    this.PoiList = this.poiData.poiInfo.list;
                    //添加序号
                    this.PoiListHasCount = [];
                    for(var i=0;i<this.PoiList.length;i++){
                        var poi = {name:(i+1)+"."+this.PoiList[i].name,address:this.PoiList[i].address,lng:this.PoiList[i].lng,lat:this.PoiList[i].lat}
                        this.PoiListHasCount.push(poi);
                    }
                    console.log(this.PoiListHasCount);
                    this.poiVectorLayer = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            projection: 'EPSG:4490'
                        }),
                    });

                    this.mapbox.addLayer(this.poiVectorLayer);
                    
                    for(var i=0;i<this.PoiList.length;i++){
                        var coordinate = [this.PoiList[i].lng,this.PoiList[i].lat];
                        var poiFeature = new ol.Feature(new ol.geom.Point(coordinate));
                        poiFeature.setStyle(this.poiStyleArr[i]);
                        poiFeature.set("tagName", this.PoiList[i].name);
                        poiFeature.set("tagAddress", this.PoiList[i].address);
                        this.poiVectorLayer.getSource().addFeature(poiFeature);
                    }
                    this.mapbox.getView().fit(this.poiVectorLayer.getSource().getExtent());

                }
              }
            });

            //为Feature添加点击事件       
            this.select = new ol.interaction.Select();
            this.mapbox.addInteraction(this.select);
            this.select.on('select',selectFunc);
            function selectFunc(e){
                var name = e.selected[0].get("tagName");
                var address = e.selected[0].get("tagAddress");
                var coordinate = e.selected[0].getGeometry().getCoordinates();
                that.Popup.setPosition(coordinate);
                console.log(that.isPopupShow);
                that.poiName = name;
                that.poiAddress = address;
                that.isPopupShow = true;
            }
            //this.mapbox.removeInteraction(select);
        },
        getPoiStyleArr(){
            this.poiStyleArr = [];
            var poiStyle1 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_1.6b2d23d5.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle1);

            var poiStyle2 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_2.21a424ba.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle2);

            var poiStyle3 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_3.cec27944.png",
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle3);

            var poiStyle4 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_4.1fb9dae3.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle4);

            var poiStyle5 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_5.2ce2f64d.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle5);

            var poiStyle6 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_6.d3aef7c7.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle6);

            var poiStyle7 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_7.cda132da.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle7);

            var poiStyle8 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_8.31fd64d4.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle8);

            var poiStyle9 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_9.5ecbf057.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle9);

            var poiStyle10 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_10.50dd1f80.png", 
                    scale : 0.3
                }))
            });
            this.poiStyleArr.push(poiStyle10);
        },
        getCurPoiStyleArr(){
            this.poiCueStyleArr = [];
            var poiStyle1 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: " http://localhost:8083/img/result_1_x.77167bba.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle1);

            var poiStyle2 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_2_x.45f7ed1d.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle2);

            var poiStyle3 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_3_x.30a37d00.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle3);

            var poiStyle4 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_4_x.c769777f.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle4);

            var poiStyle5 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_5_x.11aeb401.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle5);

            var poiStyle6 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_6_x.04e215cd.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle6);

            var poiStyle7 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_7_x.98c5c476.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle7);

            var poiStyle8 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_8_x.e8f05a22.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle8);

            var poiStyle9 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_9_x.d280d0c4.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle9);

            var poiStyle10 = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: "http://localhost:8083/img/result_10_x.c51053f5.png", 
                    scale : 0.3
                }))
            });
            this.poiCueStyleArr.push(poiStyle10);
        },
        firstPage(){
            this.isPopupShow = false;
            if(this.poiVectorLayer!=null){
                if(this.poiVectorLayer.getSource()!=null){
                    this.poiVectorLayer.getSource().clear();
                }
            }
            this.curPage = 1;
            this.getPOIInfoBigScreen();
        },
        prePage(){
            this.isPopupShow = false;
            if(this.poiVectorLayer!=null){
                if(this.poiVectorLayer.getSource()!=null){
                    this.poiVectorLayer.getSource().clear();
                }
            }
            if(this.curPage > 1){
                this.curPage = this.curPage - 1;
            }
            this.getPOIInfoBigScreen();
        },
        nextPage(){
            this.isPopupShow = false;
            if(this.poiVectorLayer!=null){
                if(this.poiVectorLayer.getSource()!=null){
                    this.poiVectorLayer.getSource().clear();
                }
            }
            if(this.curPage < this.totalPage){
                this.curPage = this.curPage + 1;
            }
            this.getPOIInfoBigScreen();
        },
        poiItemClick(index){ 
            this.isPopupShow = false;
            var coor = [parseFloat(this.PoiList[index].lng),parseFloat(this.PoiList[index].lat)];


      

            this.$emit('PoiClick',{
                coor:coor
            });
            //this.mapbox.getView().setCenter(coordinatePro);
        },
    },
    mounted: function() {
        
    }
}
</script>

<style lang="scss" scoped>
    .ol-popup{
        opacity: 0;
        transition: all 0.2s ease-in;
        &.popupShow{
            opacity: 100;
        }
    }
</style>


<style>

.ol-popup{
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border:1px solid #cccccc;
    bottom: -12px;
    left: -250px;
}

.ol-popup:after,.ol-popup:before{
    top:100%;
    border:solid transparent;
    content: "";
    height:0;
    width:0;
    position:absolute;
    pointer-events: none;
}

.ol-popup:after{
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before{
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer{
    text-decoration: none;
    position: absolute;
    top:2px;
    right:8px;
}

.ol-popup-closer:after{
    content: "X";
    height:30px;
    padding:12px;
}

.pop-content{
    font-size:14px;
    font-family: "微软雅黑";
    min-width: 140px;
}

.pop-content span{
    margin-top: 10px;
    display: block;
}



.querybar-ssk2 i{
    font-size: 36px;
}

.dark input {
    color: #ffffff;
    background-color: rgba(20, 50, 66, 0.8);/*rgba(63, 72, 84, 0.7);*/

    /*
        http://localhost:8083/img/result_10.50dd1f80.png   
        background: url("../../assets/images/poi/result_10_x.png") no-repeat;
    */
}

.querybar-ssk {
    position: absolute;
    right: 70px;
    top: 70px;
    z-index: 999;

    display: none;
}

.querybar-ssk.active{
    display: block;
}

.querybar-ssk1 {
    width: 340px;
    height: 50px;
    line-height: 40px;
    font-size: 16px;
    text-indent: 8px;
    outline: none;
    float: left;
    border: none;
    box-shadow: 0px 2px 6px #3a3c42;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}

.querybar-ssk1:focus {
    border: 1px solid rgba(155, 223, 255, 0.9);
    background-color: rgba(63, 72, 84, 0.9);
}

.querybar-ssk2 {
    width: 50px;
    height: 40px;
    float: left;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: rgba(35, 68, 117, 0.85);
    background-image: url('../../assets/images/poi/SS.png');
    background-position: 50% 50%;
    background-repeat:no-repeat;
    background-size:70% 70%;
    -moz-background-size:70% 70%;
}

.querybar-sbox {
    width: 320px;
    padding: 10px;
    box-shadow: 1px 2px 1px rgba(220, 220, 220, 0.3);
    background: rgba(20, 50, 66, 0.8);/*rgba(63, 72, 84, 0.9);*/
    overflow: hidden;
}

.querybar_resultlist_view,
.querybar_detail_view{
    display: none;
}

.querybar_resultlist_view.active,
.querybar_detail_view.active{
    display: block;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color: #A9A9A9;
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #A9A9A9;
    opacity: 1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #A9A9A9;
    opacity: 1;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #A9A9A9;
}

/*搜索栏*/
.querybar-fl {
    float: left;
    color: #eee;
}

.querybar-fr {
    float: right;
    color: #eee;
}

.querybar-clear {
    clear: both;
}

.querybar-clear5 {
    clear: both;
    height: 5px;
}

.querybar-clear10 {
    clear: both;
    height: 10px;
}

.querybar-sstab {
    height: 18px;
    padding: 5px;
    background: #f7f7f7;
    border: solid 1px #e0e0e0;
    border-radius: 4px;
}

.querybar-sstab ul {
    margin: 0;
    padding: 0;
}

.querybar-sstab ul li {
    width: 70px;
    height: 18px;
    padding: 0 20px;
    line-height: 18px;
    text-align: center;
    list-style-type: none;
    float: left;
    font-size: 12px;
    border-right: solid 1px #e0e0e0;
    cursor: pointer;
}

.querybar-sstab ul li a {
    font-size: 12px;
    text-decoration: none;
    color: #000000;
}

.querybar-sstab ul li a:hover {
    color: #dcdcdc;
}

.querybar-kbtab {
    padding-bottom: 10px;
    overflow: hidden;
    border-bottom: solid 1px #CCCCCC;
}

.querybar-kbtab ul {
    margin: 0;
    padding: 0;
}

.querybar-kbtab ul li {
    list-style-type: none;
    width: 60px;
    float: left;
    text-align: center;
}

.querybar-kbtab ul li a {
    font-size: 12px;
    text-decoration: none;
    color: #999;
}

.querybar-kbtab ul li a img {
    border: none;
}

.querybar-kbtab ul li a:hover {
    color: #dcdcdc;
}

.querybar-ssls {
}

.querybar-ssls ul {
    margin: 0;
    padding: 10px 0;
}

.querybar-ssls li {
    font-size: 12px;
    line-height: 20px;
    list-style-type: none;
    padding-left: 10px;
}

.querybar-ssls i {
    margin-right: 10px;
}

.querybar-ssls li a {
    text-decoration: none;
    color: #dcdcdc;
}

.querybar-ssls li a:hover {
    color: #fff;
}

.querybar-znbox {
    width: 260px;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    background: rgba(63, 72, 84,0.9);
    overflow: hidden;
}

.querybar-znts {
}

.querybar-znts ul {
    margin: 0;
    padding: 0;
}

.querybar-znts li {
    font-size: 12px;
    height: 36px;
    line-height: 36px;
    list-style-type: none;
    padding-left: 20px;
}

.querybar-znts i {
    margin-right: 10px;
}

.querybar-znts li a {
    text-decoration: none;
    color: #dcdcdc;
}

.querybar-znts li a:hover {
    color: #fff;
}



.querybar-site {
    padding: 10px 8px;
    height:350px;
    border-top: solid 1px #eaeaea;
    overflow: auto;
    cursor: pointer;
}

.querybar-site :hover {
    background-color: rgba(63, 72, 84,1);
}

.querybar-sitejj {
    width: 300px;
    float: left;
}

.querybar-sitejj h3 {
    margin: 8px 0px 0px 0px;
    padding: 0;
    font-size: 14px;
    padding-bottom: 5px;
    color: #dcdcdc;
    font-weight: bold;
}

.querybar-sitejj p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 20px;
    color: #999;
}

.querybar-star {
    color: #ff675a;
    font-size: 12px;
    line-height: 20px;
}

.querybar-page {
    font-size: 12px;
}

.querybar-ye a {
    text-decoration: none;
    padding: 4px 6px;
    color: #fff;
    border: solid 1px #ccc;
    margin-right: 4px;
}

.querybar-ye a:hover {
    color: #fff;
    border-color: #dcdcdc;
}

.querybar-dtit {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    text-indent: 10px;
    background: #3385ff;
    color: #fff;
}

.querybar-itr {
    padding: 8px 0;
}

.querybar-itrtit {
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    padding: 4px 0;
}

.querybar-more {
    float: right;
    text-decoration: none;
    font-size: 12px;
    color: #999;
}

.querybar-itrcon {
    padding: 8px 0;
    border-top: dashed 1px #eee;
}

.querybar-itrcon p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 20px;
    color: #dcdcdc;
}

.querybar-itrcon a {
    text-decoration: none;
}

.querybar-star_orange {
    font-size: 12px;
    line-height: 20px;
    color: #ffac2d;
}

/*全部分类*/
.querybar-allsort {
    position: absolute;
    width: 230px;
    padding: 4px;
    background: rgba(63, 72, 84,0.9);
    border: solid 1px #e0e0e0;
}

.querybar-sort {
    padding: 6px 0;
    overflow: hidden;
}

.querybar-sorta {
    width: 60px;
    padding-top: 4px;
    float: left;
    font-size: 12px;
    font-weight: bold;
    color: #666;
}

.querybar-sortb {
    width: 170px;
    float: right;
}

.querybar-sortb ul {
    margin: 0;
    padding: 0;
}

.querybar-sortb ul li {
    list-style-type: none;
    float: left;
    padding: 0 10px 2px 0;
}

.querybar-sortb ul li a {
    font-size: 12px;
    text-decoration: none;
    color: #777;
}

.querybar-sortb ul li a:hover {
    color: #fff;
}

/*推荐排序*/
.querybar-recsort {
    position: absolute;
    left: 126px;
    width: 120px;
    background: rgba(63, 72, 84,0.9);
    border: solid 1px #e0e0e0;
}

.querybar-recsort ul {
    margin: 0;
    padding: 0;
}

.querybar-recsort ul li {
    padding: 4px 0 6px 0;
    list-style-type: none;
    text-align: center;
    border-top: solid 1px #e0e0e0;
}

.querybar-recsort ul li a {
    font-size: 12px;
    text-decoration: none;
    color: #777;
}

.querybar-recsort ul li a:hover {
    color: #fff;
}

</style>