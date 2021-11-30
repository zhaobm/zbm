<template>
  <div id='chartLine' ref='myChart' style="padding-top: 4%"></div>
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
      type:Array,
/*      default:()=>{
        return{
          xAxis:[],
          yAxis:[],
          //yAxis1:[],
          color:[255,255,0]
        }
      }*/
    },
    changedom:{
      type:Boolean,
    }
  },
  mounted() {
    this.initChart();
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        console.log('data changed');
        this.$nextTick(() => {
          this.initChart();
        })
      },
      deep: true
    },
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

      var data = this.getVirtulData(2016);

      var option = {
        // backgroundColor: '#404a59',

        //  暂时不能用这个。因为日历图没有轴。有轴的可以滚动
/*        dataZoom: [
          {
            xAxisIndex: 0,// 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 3, // 一次性展示多少个。
          },
        ],*/

        title: {
          show:false,
          top: 30,
          text: '2016年某人每天的步数',
          subtext: '数据纯属虚构',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip : {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: '80',
          data:['步数', 'Top 12'],
          textStyle: {
            color: '#fff'
          }
        },
        /*    visualMap: {
                min: 1,
                max: 5,
                inRange: {
                    color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027']
                },
                show: false,
                zlevel:0,
            },
            visualMap:{
                show: true,
                color: colors,
                pieces: [
                    { min: 1000000 },
                    { min: 10000, max: 1000000 },
                    { min: 100, max: 10000 },
                    { max: 100 }
                ],
                left: 0,

                seriesIndex: 0
            },*/
        visualMap: {
          min: 1,
          max: 6,
          inRange: {
            color: ['#196027','#239a3b','#7bc96f', '#e4db8b',"#db862c","#c44c37"]
          },
          show: false,
          zlevel:0,
          seriesIndex: 0
        },
        calendar: [{
          top: '26%',
          left: '5%',
          height:'120',
          // width:'400',
          //日期区间
          range: ['2016-01-01', '2016-12-31'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 4,
              type: 'solid'
            }
          },
          //左侧代表年份的表名
          /*        yearLabel: {
                      formatter: '{start}  1st',
                      textStyle: {
                          color: '#fff'
                      }
                  },*/
          itemStyle: {
            normal: {
              color: '#323c48',
              borderWidth: 1,
              borderColor: '#111'
            }
          }
        },/* {
        top: 340,
        left: 'center',
        range: ['2016-07-01', '2016-12-31'],
        splitLine: {
            show: true,
            lineStyle: {
                color: '#000',
                width: 4,
                type: 'solid'
            }
        },
        yearLabel: {
            formatter: '{start}  2nd',
            textStyle: {
                color: '#fff'
            }
        },
        itemStyle: {
            normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
            }
        }
    }*/],
        series : [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data
          },
          {
            name: '步数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: data,
            symbolSize: function (val) {
              return val[1] ;
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          },
          /*        {
                      name: '步数',
                      type: 'scatter',
                      coordinateSystem: 'calendar',
                      calendarIndex: 1,
                      data: data,
                      symbolSize: function (val) {
                          return val[1] ;
                      },
                      itemStyle: {
                          normal: {
                              color: '#ddb926'
                          }
                      }
                  },*/

          {
            name: 'Top 12',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: data.sort(function (a, b) {
              return b[1] - a[1];
            }).slice(0, 12),
            symbolSize: function (val) {
              return val[1]/1 ;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 1,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: 'Top 12',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            data: data.sort(function (a, b) {
              return b[1] - a[1];
            }).slice(0, 12),
            symbolSize: function (val) {
              return val[1] / 0.4;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      };



      this.myChart.setOption(option);

      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true);
    },

    getVirtulData(year) {
  year = year || '2017';
  //数据库中按年份获取日期（字符串格式）数组。（最好直接按照时间顺序排好）
  //[{'date':'2021/1/4',value:'2'},{'date':'2021/2/13',value:'1'},{'date':'2021/3/1',value:'2'},{'date':'2021/4/30',value:'2'},{'date':'2021/5/30',value:'3'},{'date':'2021/6/30',value:'1'}]
  // var dateArr = [{'date':'2021/1/4',value:'1'},{'date':'2021/2/13',value:'2'},{'date':'2021/3/1',value:'3'},{'date':'2021/4/30',value:'4'},{'date':'2021/5/30',value:'3'},{'date':'2021/6/30',value:'1'},{'date':'2021/7/4',value:'1'},{'date':'2021/8/13',value:'2'},{'date':'2021/9/1',value:'3'},{'date':'2021/10/30',value:'4'},{'date':'2021/11/30',value:'3'},{'date':'2021/12/30',value:'1'}];
      var dateArr = this.data;
      console.log('日历图dateArr',dateArr)

      var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate((+year + 1) + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {

    for(var i=0;i<dateArr.length;i++){
      var date0String = dateArr[i].date;
      var myDate=new Date();
      myDate.setFullYear(year,i+1,1);//月份的参数是0~11
      /*           myDate.setHours(0);
                 myDate.setMinutes(0);
                 myDate.setSeconds(0);*/
      var myDateStanderd = echarts.format.formatTime('yyyy-MM-dd', myDate);//dateArr里当前date的下一个月1号。用于比较。


      var timeS = new Date(time);

      /*console.log('myDate 比较用时间，内部循环',myDate);
      console.log('timeS 涂色用时间，外部循环',timeS);
      console.log('判断涂色用时间 是否早于比较用时间',myDate.getTime() > (timeS.getTime() + 3600 * 24 * 1000));*/

      //这里加了一天+ 3600 * 24 * 1000是因为即使在同一天，myDate是0分0秒，而timeS是现在时间
      if(myDate.getTime() > (timeS.getTime() + 3600 * 24 * 1000)){
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', timeS),
          dateArr[i].value
        ]);


        break;

      }
    }

  }
  return data;
},
  },
  components: {}
};
</script>
<style lang="scss" scoped>
div{
  width: 440%;
  height: 90%;




}
</style>
