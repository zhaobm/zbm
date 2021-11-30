<template>
    <div class="mainview">
        <div  id="cesiumContainer"></div>
        <div class="leftdiv" id="left1" style="width:22%;flex-direction: row;transition:width 1s"  >
            <Box title="生态遥感图层" style="flex:1">
                <div id="boxlist1" class="boxlist" slot="content" >
                    <!--          <p>陕西省生态遥感</p>-->
                    <el-tree
                            :data="stygLayerData"
                            show-checkbox
                            :default-expanded-keys="[1,11,111,112,12,121,122,13,131,132,14,141,142,2,21,22,23,24]"
                            node-key="id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                        <!--            分别表示当前节点的 Node 对象和当前节点的数据-->
                        <span  class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span >

              </span>
            </span>
                    </el-tree>


                    <div style="margin-top:20px">

                    </div>
                </div>
            </Box>
            <div class="leftdivbutton" @click="hide"></div>

        </div>
    </div>

</template>

<script>
    import Box from "../../components/common/er/box";
    // import star  from "../html/e.html"

    export default {
        components: {
            Box
        },
        data () {
            const data = [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }];
            return {
                // viewer :'',
                tileset: '',
                stygLayerData: [
                    {
                        id: 1,
                        level:'l1',//节点所在层级
                        type:'agr',//生态遥感类型
                        label: '图层数据',
                        children: [
                            {
                                id: 11,
                                level:'l2',
                                label: '景区管理局',
                                children: [{
                                    id: 111,
                                    label: '太平峪'
                                }, {
                                    id: 112,
                                    label: '涝峪'
                                }]
                            },{
                                id: 12,
                                level:'l2',
                                label: '石井镇',
                                children: [{
                                    id: 121,
                                    label: '皂峪'
                                }, {
                                    id: 122,
                                    label: '直峪'
                                }, {
                                    id: 123,
                                    label: '栗峪'
                                }]
                            },{
                                id: 13,
                                level:'l2',
                                label: '蒋村镇',
                                children: [{
                                    id: 131,
                                    label: '甘峪'
                                }, {
                                    id: 132,
                                    label: '柳泉峪'
                                }, {
                                    id: 133,
                                    label: '杏景峪'
                                }, {
                                    id: 134,
                                    label: '清凉山峪'
                                }, {
                                    id: 135,
                                    label: '石镜峪'
                                }]
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        mounted (){
            //103.37324413479338, 29.544684360197113
            // let initialLon = 103.37324413479338;
            // let lat = 29.544684360197113;
            // let height = 10.0;
            // // 创建viewer实例
        this.initMap()
        },
        methods:{
            //判断是否弹出/隐藏容器
            ifChangeHide(){
                if(!this.isopenjl && !this.isopendp){
                    this.hide();
                }
            },
            //弹出/隐藏容器
            hide(){
                let div1=document.getElementById("left1");

                if(div1.style.width=="22%")
                {
                    div1.style.width="0px";

                }else
                {

                    div1.style.width="22%";
                }

            },
            // 初始化地图
            initMap() {
                // // 创建viewer实例
                let viewer = new Cesium.Viewer('cesiumContainer',{
                    animation: false, // 是否显示动画控件
                    timeline: false, // 是否显示时间线控件
                    homeButton: false, // 是否显示Home按钮
                    sceneModePicker: false, // 是否显示投影方式控件
                    navigationHelpButton: false, // 是否显示帮助信息控件
                    baseLayerPicker: false, // 是否显示图层选择控件
                    geocoder: false, // 是否显示地名查找控件
                    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                        url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
                            "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                            "&style=default&format=tiles&tk=90a854bda5310b106a44366e7baf4abd", //矢量地图
                        // url: TDTURL_CONFIG.TDT_IMG_C,
                        layer: "tdtImg_c",
                        style: "default",
                        format: "tiles",
                        tileMatrixSetID: "c",
                        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                        tilingScheme: new Cesium.GeographicTilingScheme(),
                        tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
                        maximumLevel: 18,
                        show: false
                    })
                });

                let scene = viewer.scene;
               // this.asdas
                let handlerCli = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handlerCli.setInputAction(function (movement) {
                    let pick = viewer.scene.pick(movement.position);
                    let add = "http://localhost:8080/html/e.html" //public/index.html http://localhost:8080/html/e.html
                    if (Cesium.defined(pick)) {
                        console.log(pick.id.properties.名称._value);
                        console.log(pick.id.properties.名称._value);
                        window.open(add,"_blank", "height=710px,width=1276px,top=63px,left=191px,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes,location=no")
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                viewer._cesiumWidget._creditContainer.style.display = 'none',

                    window.viewer = viewer;
                // console.log('init window.viewer',window.viewer);
            },
            handleCheckChange(data, checked, indeterminate) {
                let yukou = require("../../assets/js/geojson/huyiGeoJson/yukou/yukou");
                if(checked == true){
                    if(data.id==111){
                        this.op111 =window.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(yukou,{
                            clampToGround: true,
                            markerColor: Cesium.Color.YELLOW
                        }));
                        console.log('打开后的op111',this.op111)
                    }

                //鼠标选中的节点，而非它的父节点（显示为选中状态）

                }else{
                    console.log('关闭当前节点data',data.label,data.id);
                    // window.viewer.dataSources.removeAll();
                    if(data.id==111){
                        console.log('经过',this.op111)
                        window.viewer.dataSources.remove(this.op111);
                    }
                }
            },

        }
    }
</script>
<style scoped lang="scss">
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

    .boxlist{
        margin-top: 12px;
        width: 100%;
        height:90%;
        overflow:hidden;
        padding-left: 50px;
        padding-right: 50px;
        box-sizing: border-box;
        transition:scrollTop 1s;

    }

    .el-tree {
        position: relative;
        cursor: default;
        background: rgba(1,1,1,0);
        color: #ffffff;
    }
    /deep/ .el-tree-node:focus>.el-tree-node__content{
        background-color: #5daaf0;   //背景色
    }
    /deep/ .el-tree-node__content {
    &:hover {
         background: #66b1ff87;
     }
    }
    /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: #175fa1;
    }
    /deep/ .el-tree-node__label {
        width: auto;
        margin-top: 12px;
        float: right;
        font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #d41414;
        line-height: 25px;
        letter-spacing: 1px;
    }

    .leftdivbutton{
        position:absolute;top:3.3%;right:-15px;height: 40px;width:40px;
        background-color:#d800d8;
        background: url("../../assets/er/images/方推拉.png");
        background-size:100% 100%;
    }
</style>

