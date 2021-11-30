<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// require("echarts/lib/component/legend/LegendView.js");
require("echarts/lib/component/tooltip.js");
// 引入柱状图组件
require("echarts/lib/chart/bar");
export default {
  name: 'myChart',
  props: {
    title: {
      type: String
    },
    data:{
      type:Object,
      default:()=>{
        return{
          xAxis:[],
          yAxis:[],
          color:[188,235,127],
          legendData:[''],
          yUnit:''
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.$nextTick(() => {
          this.initChart();
        })
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);
      var colorArr={
        '草地':'#f56337',
        '城乡、工矿、居民用地':'#32ec7c',
        '未利用土地':'#f30e06',
        '水域':'#be0bde',
        '林地':'#eaca29',
        '耕地':'#43adec',
      }
      //左右节点数据
      var linkName=[];
      // console.log("小数据",JSON.stringify(this.data.city))
      //连边数据
      var nodeName=[];
      var year0=this.data.population[0].source.substr(this.data.population[0].source.length - 4,this.data.population[0].source.length);
      for(var i=0;i<this.data.population.length;i++){
        let pureName = this.data.population[i].source.substr(0, this.data.population[i].source.length - 4);
        let pureName2 = this.data.population[i].target.substr(0, this.data.population[i].target.length - 4);
        console.log('pureName',pureName)
/*        var color=new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: colorArr[pureName]
            },{
              offset: 1,
              color: colorArr[pureName2]
            }]
        );*/
        linkName.push(
            {source: this.data.population[i].source,
              target: this.data.population[i].target,
              value: this.data.population[i].value,
              lineStyle: {
                color:colorArr[pureName]
                // color:color
              },
            }
        )
      }
      for(var j=0;j<this.data.city.length;j++){
        let pureName = this.data.city[j].name.substr(0, this.data.city[j].name.length - 4)
        var position = ''
        if (this.data.city[j].name.substr(this.data.city[j].name.length - 4,this.data.city[j].name.length) == year0){
          position= 'left'
        }
        else{
          position= 'right'
        }
        nodeName.push(
            {name: this.data.city[j].name,
              itemStyle: {
                color:colorArr[pureName],
                borderColor:colorArr[pureName],
              },
              label:{
                //文字换行显示
                formatter: function(params) {
                  var newParamsName = "";
                  var paramsNameNumber = params.name.length;
                  var provideNumber = 6;
                  if (paramsNameNumber > 6) {
                    for (var p = 0; p < 2; p++) {
                      var tempStr = "";
                      if(paramsNameNumber > 9){
                        provideNumber = 6;
                      }
                      else{
                        provideNumber = 5;
                      }
                      var start = p * provideNumber;
                      var end = start + provideNumber;
                      if (p == 1) {
                        // 最后一次不换行
                        tempStr = params.name.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.name.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;
                    }
                  } else {
                    newParamsName = params.name;
                  }
                  return newParamsName
                },
                position:position,
              },
            }
        )
      }
      var option = {
        layout:{
          Iterations:0
        },
        title: {
          // text: '',
          subtext: '平方公里',
          left: '16%',
          top:"-3.5%",
          color:"white",
          fontSize: "9"
        },
        tooltip: {
          trigger :'item',
          formatter: function(params) {
            var res = params.name;
            var thisvalue=0.0
            for (var i = 0; i < option.series.links.length; i++) {
              console.log("zjw0205"+option.series.links[i].source);
              if(option.series.links[i].source==params.name)
              {
                thisvalue+=option.series.links[i].value;
              }
              if(option.series.links[i].target==params.name)
              {
                thisvalue+=option.series.links[i].value;
              }
              if(params.name.indexOf(option.series.links[i].target)!=-1&&
                  params.name.indexOf(option.series.links[i].source)!=-1)
              {
                thisvalue=option.series.links[i].value;
              }
            }
            //保留小数点后两位
            thisvalue=Math.floor(thisvalue * 100) / 100;
            return res+":"+thisvalue;
          }
        },
        series:
            {

              layoutIterations: 0,
              type: 'sankey',
              data: nodeName,
              links: linkName,
              left:88,
              top:'7%',
              focusNodeAdjacency: 'allEdges',
              lineStyle: {
                curveness: 0.5,
                /*              normal:{
                                color:'source'
                              },*/
                opacity:0.5
              },
              label:{
                color: '#fff',
              },
            }
      }
      this.myChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true)
    }

  }
}
</script>

<style lang="scss" scoped>
.myChart-wrapper {
  width: 100%;
  height: 100%;
  //background-color: #0b9e97;
}
</style>