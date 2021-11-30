import ol from 'openlayers';

//初始化地图
//pro:'EPSG:3857',Center:[12129470.527,4255685.289],Zoom:6,
function  initMap(Pro,Center,Zoom) {
    var gProjection = ol.proj.get(Pro);
    var map = new ol.Map({
        target:  document.getElementById('map'),
        view: new ol.View({
            projection: gProjection,
            center: Center,
            zoom: Zoom
        })
    });
    return map;
}
//添加地图事件
//EventName:'moveend',Function:this.onMapZoomHandler
function addMapEvent(map,EventName,Function){
    map.on(EventName, Function);
}
//添加WMTS地图，以XYZ格式
/*
urlArr:[
    {
        layerName:tdtImage,
        url:"https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27",
        isAdd:false
    },

]
{
    tdtImage:tdtImage,
}
*/

function addWMTByXYZ(map,urlArr){
    if(map){
        for(var i=0;i<urlArr.length;i++){

        }
        this.tdtImage = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
            })
        });
        this.tdtImageAnno = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=ba55f42568ebf82584d60b5fbd8eee27"
            })
        });
    }
}


export default{
    initMap,
    addMapEvent
}