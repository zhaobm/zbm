<template>
  <div id='chartLine' ref='myChart' style="padding-top: 20px"></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
import tootip from "../../../../assets/images/tooltip.png";
// 引入提示框和title组件
export default {
  name: "line1",
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
          //yAxis1:[],
          color:[255,255,0]
        }
      }
    },
    changedom:{
      type:Boolean,
    }
  },
/*    mounted() {
      this.initChart();
    },*/
  watch: {
/*        data: {
          handler: function (val, oldVal) {
            console.log('data changed');
            this.$nextTick(() => {
              this.initChart();
            })
          },
          deep: true
        },*/
    changedom: {
      handler: function (val, oldVal) {
        console.log('DOM changed');
        //现在解决了。之前的问题：不知道为什么this.$nextTick可以执行，但并没有重新渲染DOM。解决方法是使用parentNode手动获取父组件的宽高。这样是可行的。
        this.$nextTick(() => {
          this.initChart();
        })
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      /*      const $dom = document.getElementById('chartLine')
            $dom.style.width = $dom.parentNode.parentNode.clientWidth*0.9 + 'px';
            $dom.style.height = $dom.parentNode.parentNode.clientHeight*0.9 + 'px'
            this.myChart = echarts.init($dom);*/

      this.myChart = echarts.init(this.$refs.myChart);
      //console.log(this.data.yAxis)
      /*  let max = this.data.yAxis.reduce(function(a,b){
          return b>a ? b : a
      })
      let maxData = (max*1.2).toFixed(0) */
      //console.log(max)
      var chartData = [
        {name:'1', value: 2, value1: 5404, value2: 1047,color:"rgb(75,180,31)"},
        {name:'2', value: 1, value1: 2729, value2: 623,color:"rgb(23,125,12)"},
        {name:'3', value: 2, value1: 10321, value2: 1613,color:"rgb(75,180,31)"},
        {name:'4', value: 2, value1: 13621, value2: 1886,color:"rgb(75,180,31)"},
        {name:'5', value: 3, value1: 10851, value2: 1980,color:"rgb(104,206,31)"},
        {name:'6', value: 1, value1: 12659, value2: 1116,color:"rgb(23,125,12)"},
        {name:'7', value: 2, value1: 10700, value2: 1700,color:"rgb(75,180,31)"},
        {name:'8', value: 1, value1: 5404, value2: 1047,color:"rgb(23,125,12)"},
        {name:'9', value: 2, value1: 2729, value2: 623,color:"rgb(75,180,31)"},
        {name:'10', value: 3, value1: 10321, value2: 1613,color:"rgb(104,206,31)"},
        {name:'11', value: 4, value1: 13621, value2: 1886,color:"rgb(236,195,48)"},
        {name:'12', value: 2, value1: 10851, value2: 1980,color:"rgb(75,180,31)"}
      ];

      var option= {
        // backgroundColor: '#000f4e',//背景色
/*        dataZoom: [
          {
            xAxisIndex: 0,// 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 6, // 一次性展示多少个。
          },
        ],*/
        title:{
          show: false,//暂时不显示标题
          text: 'XXX象形图表',
          textStyle: {
            color: '#fff', // 主标题文字颜色
            fontFamily:'Simsun',
            fontSize: 14
          },
          x:'center',
          y:'top'
        },
        tooltip: {
          show: true,
          trigger: 'axis',  //axis , item
          backgroundColor:'rgba(0,15,78,0.6)',
          borderColor:'#00afff',
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#fff",
            fontSize: 13,
            align:'left'
          },
          axisPointer:{
            type: 'line', //'line' | 'cross' | 'shadow' | 'none
            lineStyle: {
              width: 1,
              type: 'dotted',
              color: 'rgba(46,149,230,.9)'
            }
          }
        },
        legend:{
          show: true,
          orient:'horizontal', //'vertical'
          data: ['检查', '发现', '整改'],
          icon: 'circle',
          selectedMode: true,
          itemWidth: 10,
          itemHeight: 10,
          itemGap:20,
          textStyle:{
            fontSize: 13,
            color: '#9bc8ff'
          },
          x: 'center',
          y: '25'
        },
        grid: {
          top: '25%',
          right: '3%',
          bottom: '10%',
          left: '10%'
        },
        /*xAxis:{
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: '#fff',
              fontSize: 13
            },
            formatter: '{value}'
          },
          axisLine:{
            lineStyle:{
              color:'rgba(15,45,134,.9)'
            }
          },
          axisTick:{
            show: false //坐标轴小标记
          },
          data: (function(data){
            var arr=[];
            data.forEach(function(items){
              arr.push(items.name);   //name
            });
            return arr;
          })(chartData)  //载入横坐标数据
        },
        yAxis: {
          type: 'value',
          name: '（次）',
          nameTextStyle:{
            color:'#93d3fc',
            fontSize: 12,
            align: 'right'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#9bc8ff',
              fontSize: 13
            },
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            margin: 10,
            //formatter: '{value}'
          },
          splitNumber: 5, //y轴刻度设置(值越大刻度越小)
          axisLine:{ //y轴线
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(15,45,134,.6)', //横向网格线颜色
              width: 1
            }
          },
          axisTick:{
            show: false //坐标轴小标记
          }
        },*/
        xAxis: [
          {
            type: "category",
            data: (function(data){
              var arr=[];
              data.forEach(function(items){
                arr.push(items.name);   //name
              });
              return arr;
            })(chartData), //载入横坐标数据
            axisLabel: {
              show: true,
              //interval: 0,
              fontSize: 15,
              fontWeight: 'bolder',
              color: "rgba(255, 255, 255)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.5)"
              }
            },
            // splitNumber:7,
            // interval:10,
            boundaryGap: false
          }
        ],
        yAxis: {
          name: "",
          //max:maxData,
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 14,
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[5,0,0,0]
          },
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "1.2rem",
            padding:[0,10,0,0],
          }
        },
        series:[
          {
            name:'检查',
            type: 'effectScatter', //effectScatter 涟漪效果, scatter 散点
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'top',
                textStyle: {
                  color: '#9bc8ff',
                  fontSize: 12
                },
                formatter: '{c}' //图形上显示数字
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(34,156,213)', //颜色
              }
            },
            symbol: 'circle', //circle, rect, roundRect, triangle,  pin, diamond, arrow
            symbolPosition: 'end',
            symbolSize: 10,
            symbolOffset: [0, '-120%'],
            data: (function(data){
              var arr=[];
              data.forEach(function(items){
                var itemName = items.name,
                    itemValue = items.value,
                    itemStyle = itemValue/1000; //console.log(itemStyle)
                arr.push({
                  name: itemName,
                  value: itemValue,
                  // symbolSize: itemStyle,
                  itemStyle: {
                    normal: {
                      // barBorderRadius: item > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], // 动态设置柱状图圆角
                      color: items.color
                    }
                  }

                })
              });
              return arr;
            })(chartData)  //载入数据并设置图形尺寸
          },

        ]
      };

      var app = {
        curIndex: -1,
      };
      setInterval(()=> {
        var dataLen = chartData.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.curIndex
        });

        app.curIndex = (app.curIndex + 1) % dataLen;

        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.curIndex,
        });

        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.curIndex
        });

      }, 3000);


      this.myChart.setOption(option);

      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
div{
  width: 100%;
  height: 90%;
}
</style>
