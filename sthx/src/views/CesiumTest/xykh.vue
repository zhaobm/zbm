
<template>
  <div class="mainview">
      <div v-show = "isshowPopup" class="popupattribute" :style="{'top':arrPosition.tableTop, 'left':arrPosition.tableLeft}">
          <div v-show = "isshowPopup" style="width: 260px;
                border: 1px solid rgba(70,187,243,0.53);
                border-radius: 10px;
                background: rgba(3, 73, 114, 0.7);
                color: #fff;
                box-shadow: inset 0 0 8px 2px rgba(70,187,243,0.53);">

              <a href="#" class="attheader-closer" @click="isshowPopup = false;isshowAttr = true"></a>
              <!--          属性信息容器-->
              <div v-show = "isshowAttr" id="popContent" style="flex:1;font-size: 12px; padding: 5px; "> 一个div容器，可以添加css样式和内容</div>
              <!--          图表容器 表示水质类别-->
              <div title="日历图" class="canlendar" v-show = "!isshowAttr">
                  <!--            <lineSzjc  slot="content" :data="lineEIZSData" :changedom="isshowAttr"/>-->
                  <canlendarSzjc  slot="content" :data="canlendarEIZSData" :changedom="isshowAttr"/>

              </div>
              <!--         数据-图表 切换按钮： 这里有个问题，两个按钮必须这样反着放才可以。先左后右的话，右边的按钮无论如何都会出去（可能是这里不适用relative）-->
              <el-button style="position: relative;left:90%;padding:0;padding-bottom: 5px" icon="el-icon-arrow-right" type="text" @click="isshowScatter = !isshowScatter"></el-button>
              <el-button style="position: relative;left:74%;padding:0;padding-bottom: 5px" icon="el-icon-arrow-left" type="text" @click="isshowAttr = !isshowAttr"></el-button>

          </div>
          <!--        气泡框的小箭头-->
          <div style="width: 0px;
                height: 0px;
                border-top: 20px solid rgba(3, 73, 114, 0.7);
                border-right: 15px solid transparent;
                border-bottom: 20px solid transparent;
                border-left: 15px solid transparent;
                margin: auto;">
          </div>
      </div>
    <div  id="cesiumContainer"></div>

<!--    左侧框-->
    <div class="leftdiv">
      <Box title="入境管控" style="flex:1">
          <gaugeei slot="content"  :data="gaugeEIData"/>
      </Box>
      <div style="flex:0.1"></div>
      <Box title="生态环境质量变化" style="flex:1">
        <lineEI  slot="content" :data="barEIzlbhData"/>
      </Box>
      <div style="flex:0.1"></div>
      <Box title="局部自然生态变化" style="flex:1">
        <lineEI  slot="content" :data="barEIjbbhData"/>
      </Box>
    </div>

<!--    右侧框-->
    <div class="rightdiv">
      <Box title="森林覆盖面积变化" style="flex:1">
        <barEI slot="content" :data="barEIzhData"/>
      </Box>
      <div style="flex:0.1"></div>
      <Box title="生态环境保护管理" style="flex:1">
<!--        <scatterSzjc  slot="content" :data="lineEIZSData" :changedom="isshowAttr"/>-->
        <lineEI  slot="content" :data="barEIbhglData"/>
      </Box>
      <div style="flex:0.1"></div>
      <Box title="突发环境事件" style="flex:1">
        <barEItfsj  :data="barEItfsjData" slot="content"/>
      </Box>


    </div>

<!--中间气泡框-->
    <div class="center-control">

    </div>

<!--底部-->
<!--    时间轴-->
    <div>
        <TimeAxis style="bottom: 160px;"class="timeAxis" title="时间轴" v-show="true" :currentYear="currentYear" :timeDataNode="timeDataNode"
                  :isStop= "timeIsStop" @callBack = "alterMapByYear"/>
    </div>
<!--    底部选择控件-->
    <div id="bottom_xt" >
      <div class ="nav_bottom">
        <div class="navleft"></div>
        <div class="navcenter">
          <ul>
<!--            显示变化等级颜色渲染；切换显示4类POI-->
              <a href="javascript:">
                  <li  class="bottom_operate"  @click="fuwei()">
                      <svg class="home"  style="width: 21px; height: 21px; fill: #00ffff; position: relative ;top:1px" viewBox="0 0 28 28"><path d="M14,4l-10,8.75h20l-4.25-3.7188v-4.6562h-2.812v2.1875l-2.938-2.5625zm-7.0938,9.906v10.094h14.094v-10.094h-14.094zm2.1876,2.313h3.3122v4.25h-3.3122v-4.25zm5.8442,1.281h3.406v6.438h-3.406v-6.438z"></path></svg>
                      <span style="vertical-align: top;margin-left: -4px;">复位</span>
                  </li>
              </a>

            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('kq')">空气</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('dbs')">地表水</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate" @click="loadPOI('yys')">饮用水</li>
            </a>
            <a href="javascript:">
              <li  class="bottom_operate"  @click="loadPOI('wry')">污染源</li>
            </a>
              <a href="javascript:">
                  <li class="bottom_operate" @click="loadPOI('cancel')">取消</li>
              </a>

          </ul>
        </div>
        <div class="navright"></div>
      </div>
    </div>


  </div>


</template>

<script>
import * as api from "../../assets/js/api/search.js";

import Box from "../../components/common/er/box";
import barSthjzs from "../../components/charts/bar/stzkpj/barSthjzs.vue";//柱状图

// import barEI from "../../components/charts/bar/cesium/barEI.vue";//柱状图
import barEI from "../../components/charts/bar/xykh/barEIlevel.vue";//柱状图

import lineEIZS from "../../components/charts/line/stzkpj/lineEIZS";//折线图
import lineSzjc from "../../components/charts/line/xykh/lineSzjc.vue";//水质检测折线图
import scatterSzjc from "../../components/charts/line/xykh/scatterSzlb";//水质检测折线图
import canlendarSzjc from "../../components/charts/line/xykh/canlendarSzjc";//水质检测折线图canlendarSzjc

import barEItfsj from "../../components/charts/bar/xykh/barEItfsj.vue";

import lineEI from "../../components/charts/line/xykh/lineEI.vue";//所有△EI折线图

// import url from  "../../assets/images/initw.jpg";//初始贴图
// import url from  "../../assets/er/images/world.jpg";//初始贴图
import url from  "../../assets/er/images/world1.jpg";
import hcAttributeTable from "../../components/common/attribute/index.vue";//弹出属性框（暂时不用这个）
import TimeAxis from "../../components/common/dataZoom";//时间轴

import gauge from "../../components/common/gauge/index.vue";//带图数字
import budongban from "../../components/common/gauge/budongban.vue";//带图数字
import gaugeei from "../../components/common/gauge/gaugeei.vue";//带图数字

import WeaterItem from "../../components/common/weather/index";//带图数字

export default {
  name: "xykh",
  data() {
    return {
        cameraHeight:null,
        xianyuHeight:null,
        currentYear:4,
        initLunbo:null,
      xianyuLayer:null,//县域图层组
        labelCollections:null,//文字图层组
        loadxianyuRes:null,

      weathersEIPJ:[
      ],
      centerPositionObj:null,
      qlbhqPointLayer: null,
      clusterPointLayer:null,
      pointscolorAyyay:["#58a04d","#81a27d","#99bb95","#89ab85","#ff0000"],

      // levelDataColors:{'明显变好':'#023010','变好':'#023010','一般变好':'rgba(27,57,20,0.89)','轻微变好':'#4e6c4a','基本稳定':'#81a27d','轻微变差':'#c3c656','一般变差':'#c08d4b','变差':'#a85031','明显变差':'#8B0000'},
      levelDataColors:{'明显变好':'#023010','变好':'#023010','一般变好':'rgba(27,57,20,0.89)','轻微变好':'#0c8407','基本稳定':'#89ab85','轻微变差':'#c3c656','一般变差':'#c08d4b','变差':'#a85031','明显变差':'#8B0000'},
      levelDataColors1:{'基本稳定':'#58a04d','轻微变差':'#c3c656','一般变差':'#c08d4b','变差':'#a85031','明显变差':'#8B0000'},
      // EIlevelDataObj:{'周至县':	'基本稳定','凤县':	'基本稳定','太白县':	'基本稳定','安塞区':	'一般变好','子长市':	'轻微变差','志丹县':	'基本稳定','吴起县':	'轻微变好','宜川县':	'基本稳定','黄龙县':	'基本稳定','汉台区':	'轻微变好','南郑区':	'基本稳定','城固县':	'基本稳定','洋县':	'基本稳定','西乡县':	'基本稳定','勉县':	'轻微变好','宁强县':	'基本稳定','略阳县':	'基本稳定','镇巴县':	'基本稳定','留坝县':	'基本稳定','佛坪县':	'基本稳定','绥德县':	'一般变差','米脂县':	'基本稳定','佳县':	'基本稳定','吴堡县':	'基本稳定','清涧县':	'一般变差','子洲县':	'基本稳定','汉滨区':	'基本稳定','汉阴县':	'轻微变差','石泉县':	'基本稳定','宁陕县':	'基本稳定','紫阳县':	'基本稳定','岚皋县':	'基本稳定','平利县':	'基本稳定','镇坪县':	'基本稳定','旬阳县':	'基本稳定','白河县':	'基本稳定','商州区':	'基本稳定','洛南县':	'基本稳定','丹凤县':	'基本稳定','商南县':	'基本稳定','山阳县':	'基本稳定','镇安县':	'基本稳定','柞水县':	'基本稳定'},
      // EIlevelDataObj:{},
        EIlevelDataObj:{"洛南县":"基本稳定","佛坪县":"基本稳定","岚皋县":"基本稳定","商南县":"基本稳定","平利县":"基本稳定","石泉县":"基本稳定","安塞区":"一般变好","城固县":"基本稳定","旬阳县":"基本稳定","志丹县":"基本稳定","凤县":"基本稳定","太白县":"基本稳定","吴起县":"轻微变好","米脂县":"基本稳定","清涧县":"一般变差","周至县":"基本稳定","留坝县":"基本稳定","洋县":"基本稳定","子长市":"轻微变差","略阳县":"基本稳定","勉县":"轻微变好","宁陕县":"基本稳定","白河县":"基本稳定","宁强县":"基本稳定","绥德县":"一般变差","佳县":"基本稳定","镇安县":"基本稳定","镇坪县":"基本稳定","商州区":"基本稳定","南郑区":"基本稳定","黄龙县":"基本稳定","镇巴县":"基本稳定","西乡县":"基本稳定","山阳县":"基本稳定","汉台区":"轻微变好","吴堡县":"基本稳定","子洲县":"基本稳定","柞水县":"基本稳定","丹凤县":"基本稳定","宜川县":"基本稳定","汉阴县":"轻微变差","汉滨区":"基本稳定","紫阳县":"基本稳定"},
      isshowPopup:true,
      isshowAttr:false,
      isshowScatter:true,
      isshowLine:false,
      geoCoordMapNew:null,
      year:'2020',
      xzq:"周至县",
      gaugeEIData:23,
      barEIzhData: {
        xAxis:[2013,2014,2015,2016,2017,2018,2019,2020],
        yAxis:[-0.01,-1.12,-0.77,1.98,1.19,0.33,0.18,0.9]
      },
      //气泡框：散点图对应值
      lineEIZSData: [
        {name:'2020.1', value: 16758, value1: 5404, value2: 1047,color:'green'},
        {name:'2020.2', value: 15001, value1: 2729, value2: 623,color:'green'},
        {name:'2020.3', value: 28932, value1: 10321, value2: 1613,color:'yellow'},
        {name:'2020.4', value: 36245, value1: 13621, value2: 1886,color:'red'},
      ],
      //气泡框：日历图对应值
      canlendarEIZSData:[{'date':'2021/1/4',value:'1'},{'date':'2021/2/13',value:'2'},{'date':'2021/3/1',value:'3'},{'date':'2021/4/30',value:'4'},{'date':'2021/5/30',value:'3'},{'date':'2021/6/30',value:'1'},{'date':'2021/7/4',value:'1'},{'date':'2021/8/13',value:'2'},{'date':'2021/9/1',value:'3'},{'date':'2021/10/30',value:'4'},{'date':'2021/11/30',value:'3'},{'date':'2021/12/30',value:'1'}],
      //周至测试数据
      barEIzlbhData: {
        xAxis:[2017,2018,2019,2020],
        yAxis:[0.8,0.01,0,1.11]
      },
      barEIbhglData: {
        xAxis:[2017,2018,2019,2020],
        yAxis:[0.39,0.32,0.18,-0.21]
      },
      barEItfsjData: {
        xAxis:[2017,2018,2019,2020],
        yAxis:[0,-0.3,-0.5,'一票否决']
      },
      barEIjbbhData: {
        xAxis:[2017,2018,2019,2020],
        yAxis:[0,0,0,0]
      },
      isShowAttribute:true,
      timeAxisVisible:true,
      timeDataArray:[
        { url: [] , year: 2016 },
        { url: [] , year: 2017 },
        { url: [] , year: 2018 },
        { url: [] , year: 2019 },
        { url: [] , year: 2020 },
      ],
      imageUrl:url,
      // viewer:{},
      arrPosition:{'tableLeft':'0px','tableTop':'0px'},
        cartesian:'',

      poiGeojson:'',
      POIleixing:'',
  };
  },
  computed: {
    // 实体变化统计
    timeDataNode: function() {
      var timeData={};
      timeData.dataArr = this.timeDataArray;
      return timeData;
    },
    timeIsStop : function() {
      var timeIsStop=false;
      timeIsStop = this.TimeAxisStop;
      return timeIsStop;
    },
  },
  methods:  {
    //切换属性气泡框展示内容
    changeAttrTable(){
      this.isshowPopup = !this.isshowPopup;
      this.isshowLine = !this.isshowPopup;
    },

    //时间轴切换
    alterMapByYear(year,url){
      this.year = year;

        //执行 参数为时间的 数据获取函数
        this.getYearPoi(this.year);//这里还包括EI渲染的函数
        this.getGrid01(this.year,this.xzq);
    },

    //初始化 Cesium 视图
    initViewer()  {
      this.isshowPopup = false;

      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
      Cesium.Camera.DEFAULT_VIEW_FACTOR=0//摄像机视口远近参数，可设置地球大小

      var viewer  =  new  Cesium.Viewer('cesiumContainer',{
        animation:  false,  //是否创建动画小器件，左下角仪表
        baseLayerPicker:  false,  //是否显示图层选择器
        fullscreenButton:  false,  //是否显示全屏按钮
        geocoder:  false,  //是否显示geocoder小器件，右上角查询按钮
        homeButton:  false,  //是否显示Home按钮
        infoBox:  false,  //是否显示信息框（自带的属性查询信息框）
        sceneModePicker:  false,  //是否显示3D/2D选择器,与scene3DOnly不能同时为true
        selectionIndicator:  false,  //是否显示选取指示器组件（点击的绿色焦点框框）
        timeline:  false,  //是否显示时间轴
        navigationHelpButton:  false,  //是否显示右上角的帮助按钮
        scene3DOnly:  false,  //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源

        //加载单张图片为影像服务(给球表面贴一张图)
        imageryProvider:  new  Cesium.SingleTileImageryProvider({
          // credit: "",
          url:  this.imageUrl
        }),
      })


      // 添加地图视图定位。定位到延安地区。
      viewer.entities.removeAll();
      // viewer.zoomTo(positions);
      // viewer.camera.zoomIn(10000);

      window.viewer = viewer;
      this.viewer = viewer;

        // this.cameraHeight = window.viewer.camera.positionCartographic.height;//确定初始相机高度，用于判断悬停时实体高度
        this.cameraHeight = 1100000;//写死初始高度，因为用上一句↑得到的相机高比缩放后的高太多，感觉不太正确

        var that = this;
      this.handlerCli = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      //添加点击事件
      this.handlerCli.setInputAction(this.singleClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //添加悬停事件
      this.handlerCli.setInputAction(this.mouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      //监听鼠标滚轮事件
        this.handlerCli.setInputAction(this.wheelment, Cesium.ScreenSpaceEventType.WHEEL);
        //添加鼠标拖动事件
        // this.handlerCli.setInputAction(this.leftup,Cesium.ScreenSpaceEventType.LEFT_UP);
    },

    //所有鼠标单击事件
    singleClick(e){

      //要获取到选中的实体的方法：
      // console.log(this.viewer.selectedEntity,'selectedEntity');
      var pick2 = window.viewer.scene.pick(e.position);
      if (Cesium.defined(pick2)) {
        var properties = pick2.id.properties;//点击位置的所有属性信息
        var layername = properties.layername;//点击的图层名称
          console.log('layername',layername);
        switch (layername){
          case 'poilayer':
            this.clickPOILayer(e,pick2);
            break;
          case '43xian':
            this.clickXianyuLayer(e,pick2);
            break;
          case 'sxxjlayer':
            this.clickSxxjLayer();
            break;
            case 'sxxjlayer':
                this.clickSxxjLayer();
                break;
/*          default :
            alert("你的分数有误");
            break;*/
        }
      }
      else{
        this.isshowPopup = false;
      }
    },

      //All 所有鼠标悬停事件
      mouseMove(e){
        if (!this.cameraHeight){

        }
          //要获取到选中的实体的方法：
          // console.log(this.viewer.selectedEntity,'selectedEntity');
          var pick2 = window.viewer.scene.pick(e.endPosition);//注意这里写成endPosition而不是position
          if (Cesium.defined(pick2)) {
              var properties = pick2.id.properties;//点击位置的所有属性信息
              var layername = properties.layername;//点击实体对应的图层名称
              switch (layername){
                  case '43xian':
                      this.mousemoveXianyuLayer(e,pick2);
                      break;
              }
          }
      },

      //All 所有鼠标滚轮事件
      wheelment(e){
          //要获取到选中的实体的方法：
          // console.log(this.viewer.selectedEntity,'selectedEntity');
          this.cameraHeight = window.viewer.camera.positionCartographic.height;
      },
      leftup(){
          this.isshowPopup=false;
      },

    //POI点击事件
    clickPOILayer(e,pick2){
      this.isshowPopup = true;//显示POI属性气泡框
      var popContent = document.getElementById("popContent");//气泡框属性信息内容
        console.log('popContent',popContent);

      var pick= new Cesium.Cartesian2(e.position.x,e.position.y);
      var pick1= window.viewer.scene.pickPosition(e.position);//屏幕坐标
      // var pick2 = window.viewer.scene.pick(e.position);

      // 获取点击位置坐标 this.cartesian世界坐标
      this.cartesian = window.viewer.scene.globe.pick(window.viewer.camera.getPickRay(pick), window.viewer.scene);

      this.arrPosition.tableLeft = e.position.x-130+'px';
      this.arrPosition.tableTop = e.position.y -275.33 +'px';

      var pick = window.viewer.scene.pick(e.position);
      var properties = pick2.id.properties;//点击位置的所有属性信息


      //自定义气泡框显示内容，只显示部分属性
      var poileixing = this.POIleixing;
      var keyArr = [];
      var totalkeyArr = [];
      switch (poileixing){

        //arcgis字段名长度不能大于3个汉字，所以需要做两个索引
        case 'kq':
          keyArr = ['空气监'];
          totalkeyArr = ['空气监测点位名称'];
          break;
        case 'yys':
          keyArr = ['点位名','水源地','是否湖'];
          totalkeyArr = ['点位名称','水源地类型','是否湖库'];
          break;
        case 'dbs':
          keyArr = ['水质监','河流、','断面性'];
          totalkeyArr = ['水质监测断面名称','河流、湖泊名称','断面性质'];
          break;
        case 'wry':
          keyArr = ['污染源','污染源_','污染源1','排放去'];
          totalkeyArr = ['污染源（企业）名称','污染源代码','污染源类型','排放去向'];
          break;
          /*          default :
                      alert("你的分数有误");
                      break;*/
      }

        //创建属性气泡框
        var html = '';
      for(var i=0;i<keyArr.length;i++){
        let key = keyArr[i];
        let totalkey = totalkeyArr[i];
        let value = properties[key]._value;

        if(value !== ''){
          html += '<tr><td>' + totalkey + '</td><td>' + value + '</td></tr>';
        }
      }
      if (html.length > 0) {
        html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
      }

      popContent.innerHTML = html;

      //监听事件：使气泡框跟随屏幕移动
      var that = this;
      window.viewer.scene.postRender.addEventListener(function (e) {
        //pick世界坐标转屏幕坐标（e.position不存在）
        var pick = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, that.cartesian);
        //* 对象不能用等号判断相等。因为是引用型，如果内存地址不同，则不简单相等。需要判断值是否相等
        if(JSON.stringify(that.pick) !== JSON.stringify(pick)){

/*          that.arrPosition.tableLeft = pick.x -1000 +'px';
          that.arrPosition.tableTop = pick.y -415 +'px';*/
            that.arrPosition.tableLeft = pick.x -130 +'px';
            that.arrPosition.tableTop = pick.y -275.33 +'px';

          that.pick = pick;
        }
      });
      let jjddmNameObj = {'kq':'空气监_','yys':'点位代','dbs':'水质监_','wry':'污染源_'};
      let jjddmNamekey = jjddmNameObj[poileixing];
      let jjddmName = properties[jjddmNamekey]._value;

      this.getCanlendarJcsj(poileixing,jjddmName,this.year);//某个县域，一次获取所有年份数据。包括grid02总△EI，4个分指标（仅18年以后）

    },

    //获取某监测点位日历图数据
    async getCanlendarJcsj(poileixing,jjddmName,year){
      var Params = {
        poileixing: poileixing,
        jjddmName: jjddmName,
        year: year
      };
      console.log('获取某监测点位数据: '+Params);
      await api.getJcsjData(Params).then(res=>{
        var resultData = res.data;
        console.log('getJcsjData',resultData)
        if(resultData){
          if(resultData.status == "success"){

            this.canlendarEIZSData=resultData.data.grid01;

          }
        }
      });
    },

      //县域点击事件
    clickXianyuLayer(e,pick2){

        var entities = this.xianyuLayer.entities.values;
        var xzqmc = pick2.id.properties.NAME._value;
        this.xzq = xzqmc;
        //  获取参数为xzqhmc的数据（数据联动）

      console.log('点击县域名称',this.xzq)
      this.getXZQchart(this.xzq);
      this.getGrid01(this.year,this.xzq);


        //EIlevelDataObj从后台获取，传参为（type,year）。格式为{"周至县":"一般变差","子长市":"基本稳定","汉台区":"一般变好","城固县":"基本稳定"}
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var name = entity.properties.NAME._value;
            if(name == xzqmc){
                entity.polygon.outline = false;
                entity.polygon.outlineColor = Cesium.Color.fromCssColorString('#fff81f').withAlpha(0.6);
                entity.polygon.outlineWidth = 5;
                entity.polyline = {
                        positions: entity.polygon.hierarchy._value.positions,
                        width:entity.polygon.outlineWidth,
                        material:Cesium.Color.fromCssColorString('rgba(67,162,51,0.93)').withAlpha(0.6)

                };
            }
            else{
                if(entity.polyline){
                    entity.polyline = {
                        positions: entity.polygon.hierarchy._value.positions,
                        width:entity.polygon.outlineWidth,
                        material:Cesium.Color.fromCssColorString('rgba(67,162,51,0.93)').withAlpha(0)

                    }
                }

            }
        }

    },
    clickSxxjLayer(e){

    },



      //县域鼠标悬停事件（悬停时加高度）
      mousemoveXianyuLayer(e,pick2){
          var entities = this.xianyuLayer.entities.values;
          var xzqmc = pick2.id.properties.NAME._value;

          for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              var name = entity.properties.NAME._value;

              if(name == xzqmc){//鼠标悬停的行政区
                  this.xianyuHeight = this.cameraHeight/220;
              }
              else if(name == this.xzq){
                  console.log('here 应该是点击区县',name);
                  this.xianyuHeight = this.cameraHeight/220;
              }
              else{
                  this.xianyuHeight = 0; //没悬停时，高度为0
              }

              entity.polygon.extrudedHeight = this.xianyuHeight; //根据相机高度调整实体高度
          }
      },

    // 初始化添加陕西县级geojson
    async loadSxxj(){

      let json = require('../../assets/js/geojson/sxxj.json');

      //设置geojson线条、填充样式。load方法是个promise，用异步处理。
      let res = await Cesium.GeoJsonDataSource.load(json, {
        stroke: Cesium.Color.fromCssColorString("rgb(113,160,158)"),
        // fill: Cesium.Color.BLUE.withAlpha(0.3), //1.cesium赋颜色 注意：颜色必须大写，即不能为blue
        fill: Cesium.Color.fromCssColorString("rgba(3, 73, 114, 0)"),//2.css赋颜色
        strokeWidth: 50
      });

      window.viewer.dataSources.add(res);

      var layername = 'sxxjlayer';

      //写入图层名称，为了进行图层过滤。但因为面设置为透明，cesium里就不认为它有实体entities
      var entities = res.entities.values;
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        entity.properties.layername = layername;
      }

      return res;
    },

    // 初始化添加县域geojson
    async loadXianyu(){
      this.xianyuLayer = new Cesium.CustomDataSource();//实体组打包
      window.viewer.dataSources.add(this.xianyuLayer);

      let json = require('../../assets/js/geojson/43xianyu.json');

      this.loadxianyuRes = await Cesium.GeoJsonDataSource.load(json, {
        // stroke: Cesium.Color.fromCssColorString("rgb(8,158,172)"),
        stroke: Cesium.Color.fromCssColorString("rgb(113,160,158)"),
        // fill: Cesium.Color.BLUE.withAlpha(0.3), //1.cesium赋颜色 注意：颜色必须大写，即不能为blue
        // fill: Cesium.Color.fromCssColorString("rgba(3, 73, 114, 1)"),//2.css赋颜色
        fill: Cesium.Color.fromCssColorString("rgba(3, 73, 114, 0)"),//2.css赋颜色
        strokeWidth: 5000
      });

      window.viewer.flyTo(this.loadxianyuRes);

      //添加实体的图层名称
        var entities = this.loadxianyuRes.entities.values;
        var layername = '43xian';
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        entity.properties.layername = layername;
        // entity.polygon.material = createCallback(entity);
        this.xianyuLayer.entities.add(entity);
      }

      //初始时计算各区县中心点坐标。后面有用。
      if(!this.geoCoordMapNew){
        this.geoCoordMapNew = {};
        for (var i = 0; i < entities.length; i++) {
          let entity = entities[i];
          var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;//中心点
          var polyCenter2 = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          let cartographic = Cesium.Cartographic.fromCartesian(polyCenter2, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
          let position = [];
          //获取4326经纬度坐标
          position[0] = Cesium.Math.toDegrees(cartographic.longitude);
          position[1] = Cesium.Math.toDegrees(cartographic.latitude);
          //获取行政区划代码
          let xzqhmc = entity.properties.NAME._value;
          this.geoCoordMapNew[xzqhmc] = position;
        }
        console.log('this.geoCoordMapNew',this.geoCoordMapNew);
      }

        //加载文字图层
        // this.loadLabelCollections();
      //加载颜色渲染方法
        this.loadEIColor();
    },
      //复位按钮
      fuwei(){
          window.viewer.flyTo(this.loadxianyuRes);
      },
      //初始化文字图层
      loadLabelCollections(){
          this.labelCollections = new Cesium.CustomDataSource();//实体组打包
          window.viewer.dataSources.add(this.labelCollections);

          for(var key in this.geoCoordMapNew){

              var labelEntity = {
                  position: Cesium.Cartesian3.fromDegrees(this.geoCoordMapNew[key][0],this.geoCoordMapNew[key][1],10000),
                  label: { //文字标签
                      text: key,
                      font: '500 30px Helvetica',// 15pt monospace
                      scale: 0.5,
                      style: Cesium.LabelStyle.FILL,
                      fillColor: Cesium.Color.WHITE,
                      // pixelOffset: new Cesium.Cartesian2(0, 70),   //偏移量
                      showBackground: false,
                      backgroundColor:Cesium.Color.fromCssColorString("rgba(18,152,222,0)"),
                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,700000),//仅在这个范围内显示
                  },
                  /*                  billboard: { //图标
                                        image: require('../../assets/er/images/4.png'),
                                        width: 40,
                                        height: 40,
                                        // pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(300000,5000000),//仅在这个范围内显示
                                    },*/
                  properties:{
                      layername:'label'//写入图层名称，为了进行图层过滤
                  }
              };
              this.labelCollections.entities.add(labelEntity);
          }

      },

    //加载3d模型（json格式的）先放在这里，用的时候再改
    load3DModles(){
      var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: './data/NewYork/tileset.json' //   ./data/3dtiles-lab/tileset.json
      }));

      tileset.readyPromise.then(function () {
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      }).otherwise(function (error) {
        throw (error);
      });
    },

    //渲染变化等级
    async loadEIColor(){

        var entities = this.xianyuLayer.entities.values;
      //EIlevelDataObj从后台获取，传参为（type,year）。格式为{"周至县":"一般变差","子长市":"基本稳定","汉台区":"一般变好","城固县":"基本稳定"}
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity._name;
        //测试数据this.EIlevelDataObj
        var level = this.EIlevelDataObj[name];

        if(level){
          var color = this.levelDataColors[level];
          var colorCss = Cesium.Color.fromCssColorString(color).withAlpha(0.5);
          entity.polygon.material = colorCss;
          entity.polygon.outline = false;
          //geojson添加高度，立体效果。按照PAC行政区划代码赋值。
          // entity.polygon.extrudedHeight = entity.properties.PAC * 0.008; //高度扩大5000倍，便于观察
        }
      }
    },


    //加载 聚合点 & POI点
    async loadPOI(leixing){
      //添加POIlayername用于做属性显示内容判断
      this.POIleixing = leixing;
      //关闭属性气泡框
        if(this.isshowPopup){
            this.isshowPopup = false;
        }
      //隐藏其他poi图层
      if (this.poiGeojson){
        this.setlayervisibility(this.poiGeojson,false);
      }
      //移除聚合图层
      if (this.clusterPointLayer){
        // this.setlayervisibility(this.poiGeojson,false);
        window.viewer.dataSources.remove(this.clusterPointLayer);
      }

      //添加新的poi和聚合图层。点击“取消”时不添加。
      if(leixing !== 'cancel'){
          //1.添加普通poi点geojson
          var res = await this.loadGeojson(leixing);//
          this.poiGeojson = res;
          window.viewer.dataSources.add(res);
          //设置poi点样式
          var color = Cesium.Color.fromCssColorString("#43a233");
          var entities = res.entities.values;

          //2.建立聚合点图层组（理解的是每个点是一个图层，所有点图层放在图层组clusterPointLayer里）
          //所以先在视图里创建图层组 window.viewer.dataSources.add(this.clusterPointLayer);
          //再在图层组里添加图层 for循环添加this.clusterPointLayer.entities.add(clustParam);
          this.clusterPointLayer = new Cesium.CustomDataSource();
          window.viewer.dataSources.add(this.clusterPointLayer);

          //计算每个县的点位个数
          for(var key in this.geoCoordMapNew){
              var num = 0;
              for(var i = 0; i < entities.length; i++){
                  var xzqhmc = entities[i].properties['县（市']._value;
                  if(xzqhmc == key){
                      num++;
                  }
              }

              //聚合点
              var clustParam = {
                  // name: '1号大棚',
                  position: Cesium.Cartesian3.fromDegrees(this.geoCoordMapNew[key][0],this.geoCoordMapNew[key][1],20000),

                  label: { //文字标签
                      text: ''+num,
                      font: '500 30px Helvetica',// 15pt monospace
                      scale: 0.5,
                      style: Cesium.LabelStyle.FILL,
                      fillColor: Cesium.Color.WHITE,
                      // pixelOffset: new Cesium.Cartesian2(110, -70),   //偏移量
                      showBackground: true,
                      backgroundColor:Cesium.Color.fromCssColorString("#1296db"),
                      // backgroundColor: new Cesium.Color(0 / 255, 191 / 255, 255 / 255, 1),//文字背景色，应该和图表颜色保持一致1296db
                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(300000,5000000),//仅在这个范围内显示
                  },
                  billboard: { //图标
                      image: require('../../assets/er/images/4.png'),
                      width: 40,
                      height: 40,
                      // pixelOffset: new Cesium.Cartesian2(100, -35),   //偏移量
                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(300000,5000000),//仅在这个范围内显示
                  },
                  properties:{
                      layername:'cluster'//写入图层名称，为了进行图层过滤
                  }
              };

              this.clusterPointLayer.entities.add(clustParam);

          }

          var poilayername = 'poilayer';
          //普通点
          for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              // entity.properties.layername = poilayername;//写入图层名称，为了进行图层过滤
              let lon = entity.properties.lon._value;
              let lat = entity.properties.lat._value;
              entity.position = Cesium.Cartesian3.fromDegrees(lon,lat,this.xianyuHeight + 5000);
              entity.properties.layername = poilayername;//写入图层名称，为了进行图层过滤
              entity.billboard = undefined;//取消默认显示。默认显示为气泡窗
              entity.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, 300000.0);
              entity.point = new Cesium.PointGraphics({
                  // color: Cesium.Color[color],
                  color: color,
                  pixelSize: 15,
                  // height: this.xianyuHeight + 1000000000,//高于县域实体的高度
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300000.0),
              });
          }
      }

    },
      //加载geojson文件
      async loadGeojson(leixing){
          // let json = require('../../assets/js/geojson/wyhc.json');
          let json = require('../../assets/js/geojson/' + leixing + '.json');
          var res = await Cesium.GeoJsonDataSource.load(json);
          return res;
      },

  //  控制图层显隐
    setlayervisibility(dataset, isshow) {
      let entitiesArr = dataset.entities.values //获取json中包含的entity实体
      //遍历实体数组，设置geometry的显隐状态值
      let len = entitiesArr.length - 1
      while (len >= 0) {
        let entity = entitiesArr[len--] //获取当前实体
        // entity.point.show = isshow;
        entity.show = isshow;
        console.log('remove')
      }
    },

    //获取某行政区数据。5个gride数据（包括变化等级渲染，四类poi的属性数据）
    async getXZQchart(xzqmc){
/*      var Params = {
        xzqmc: xzqmc,
      };
      console.log('获取某xzqmc数据: '+xzqmc);
      await api.getXzqData(Params).then(res=>{
        var resultData = res.data;
        console.log('getXzqData',resultData)
        if(resultData){
          if(resultData.status == "success"){
            this.barEIzhData=resultData.data.grid04;
            this.barEIzlbhData=resultData.data.grid02;
            this.barEIbhglData=resultData.data.grid05;
            this.barEItfsjData=resultData.data.grid06;
            this.barEIjbbhData=resultData.data.grid03;
          }
        }
      });*/
    },
    //获取某年份数据（底部栏数据。包括变化等级渲染，四类poi的属性数据）
    async getYearPoi(year){
      var Params = {
        year: year,
      };
/*      await api.getYearData(Params).then(res=>{
        var resultData = res.data;
          console.log('获取某年份数据: '+year);
        if(resultData){
          if(resultData.status == "success"){
              console.log('getYearData',resultData);
            this.EIlevelDataObj = resultData.data.EIlevel;//EI变化等级渲染
              this.loadEIColor();//需要用到EIlevelDataObj数值

          }
        }
      });*/
    },
    //获取某年份某区域数据。即grid01（综合△EI）数据
    async getGrid01(year,xzqmc){
      /*var Params = {
        year:year,
        xzqmc: xzqmc,
      };
      await api.getEIsoloData(Params).then(res=>{
        var resultData = res.data;
          console.log('获取某年份、某行政区数据: '+year +xzqmc);
        if(resultData){
          if(resultData.status == "success"){
              console.log('getEIsoloData',resultData)
            this.gaugeEIData=resultData.data.grid01;

          }
        }
      });*/

    },

  },
  mounted() {

    //初始化地图
    this.initViewer();//WebGL里不是map的概念，而是viewer

    //加载43县域json
    this.loadXianyu();
    //加载县级json
    this.loadSxxj('sxxj');

    //获取数据
      this.getYearPoi(this.year);
      this.getGrid01(this.year,this.xzq);
      this.getXZQchart(this.xzq);//某个县域，一次获取所有年份数据。包括grid02总△EI，4个分指标（仅18年以后）

      //获取渲染数据
      this.loadEIColor();//需要用到EIlevelDataObj数值

  //  加载三维模型
  //   this.load3DModles();
  },
  components:{
    Box,
    lineEIZS,
    lineEI,
    lineSzjc,//气泡框：水质类别折线图
    scatterSzjc,//气泡框：水质类别散点图
    canlendarSzjc,
    barEItfsj,//突发环境事件
    hcAttributeTable,
    TimeAxis,
    barSthjzs,
    barEI,
    gauge,
    budongban,
    gaugeei,
    WeaterItem
  }
}

</script>
<style scoped lang="scss">
    .mainview{
        width: 100%;
        height: 95%;
    }

    .weater-box{
      padding: 0 10px;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1;
      justify-content: space-between;
      margin-bottom:10px;
    }

    #cesiumContainer{
        height: 100%;
        width: 100%;
    }
    .cesium-viewer-toolbar {
      display: block;
      position: absolute;
      top: 10%;
      right: 5px;
    }

    .center-control{
      position: absolute;;
      top:20%;
      left:40%
    }

    .popupattribute{
      z-index:100000
    }

    .popupattribute{
      position: absolute;
      /*  top:240px;
        left:400px;*/
/*      width: 300px;
      height: 70px;
      background-color: rgba(3, 73, 114, 0.7);
      border:1px solid rgba(81, 169, 213,0.7);
      color: #eee;*/
      border-radius: 10px;
    }

    .attheader-closer{
      text-decoration: none;
      position: relative;
      top:6px;
      left:90%;
    }
    .attheader-closer:after{
      content: "X";
      color: #eee;
    }

    /*日历图*/
    .canlendar{
      width:260px;
      height: 200px;
      overflow-x:auto;
      overflow-y:hidden;
/*      style="width:260px;height: 200px;overflow-x:auto;
      overflow-y:hidden;"*/
    }



    /*下部导航*/
    #bottom_xt{
      position: absolute;
      bottom: 28px;
      left: 30%;
      width: 40%;
      height: 75px;
      z-index: 99997;
      background-color: red;
      text-align: center;
      background: url(../../assets/er/images/UI/bottom_xt.png) no-repeat;
      background-size: 100% 100%;
    }
    .nav_bottom{
      width: 84%;
      height: 22px;
      position: relative;
      top: 29px;
      margin-left: 8%;
    }
    .navleft {
      width: 6%;
      height: 38px;
      float: left;
      background: url(../../assets/er/images/UI/nav-left.png) no-repeat;
      background-size: 100% 100%;
    }
    .navright {
      width: 6%;
      height: 38px;
      float: left;
      background: url(../../assets/er/images/UI/nav-right.png) left no-repeat;
      background-size: 100% 100%;
    }
    .navcenter {
      float: left;
      width: 88%;
      height: 38px;
      background: url(../../assets/er/images/UI/navbg.png) repeat-x;
      background-size: 100% 100%;
    }
    .navcenter ul{
      text-align: center;
      margin-left: -4%;
    }
    .navcenter ul li {
      float: left;
      text-align: center;
      color: #00ffff;
      width: 16.6%;//每个按钮占据的宽度
      height: 24px;
      margin-top: 2px;
      line-height: 25px;
    }
    .navcenter ul a:hover .bottom_operate {
      background: url(../../assets/er/images/UI/nav-select.png) no-repeat;
      background-size: 100% 100%;
    }
    /*图例*/
    .navcenter .legend_select
    {
      text-align: center;
      margin-left: -35%;
      margin-top: 35px;
      display: none;
    }
    .navcenter .legend_select li{
      background: #057A8E;
      float: none;
      text-align: center;
      color: #00ffff;
      width: 105px;
      height: 30px;
      /*margin-top: 3px;*/
      line-height: 30px;
      position: relative;
      bottom: 160px;
      z-index: 30;
      font-size: 13px;
      font-weight: bold;
    }

    .navcenter .legend_select li:hover {
      background: rgba(8, 23, 52, 0.8);
      color: #00ffff;
    }

    //设置滚动条 放在class里就失效。可能是deep的原因
    ::-webkit-scrollbar {
      width: 10px; /*滚动条宽度*/
      height: 10px; /*滚动条高度*/
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      box-shadow: 0px 1px 3px #071e4a inset; /*滚动条的背景区域的内阴影*/
      border-radius: 10px; /*滚动条的背景区域的圆角*/
      background-color: #071e4a; /*滚动条的背景颜色*/
      //height: 5px
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      box-shadow: 0px 1px 3px #00a0e9 inset; /*滚动条的内阴影*/
      border-radius: 10px; /*滚动条的圆角*/
      background-color: rgba(7, 150, 222, 0.6); /*滚动条的背景颜色*/
    }

</style>

