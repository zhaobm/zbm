<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    data: {
      type: Object,
      default: () => {
        return {
          dataArr: [],
          title: [],
          color: [188, 235, 127],
          itemGap:30,
          legendHeight:0,
          itemWidth:15

        };
      }
    }
  },
  mounted() {
    this.initChart();
  },
  watch:{
    data:{
      handler: function (val, oldVal) {
        this.$nextTick(()=>{
          this.initChart();
        })
       },
      deep: true
    }
  },
  methods: {
    initChart() {
      let dataArr=this.data.dataArr
      this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
      this.myChart = echarts.init(this.$refs.myChart);
      let total=0
      dataArr.forEach(v=>total=parseInt(v.value)+total)
      let option = {
        title: [
          /*
          {
            //text: parseInt(Number(total)/10000),
            text: parseInt(Number(total)),
            left: "18%",
            top: "28%",
            textAlign: "center",
            textBaseline: "middle",
            textStyle: {
              color: "#a3f0eb",
              fontWeight: "normal",
              fontSize: this.itemGap * 2.2
            }
          },
          {
            text: "房屋面积",
            left: "19%",
            top: "40%",
            textAlign: "center",
            textBaseline: "middle",
            textStyle: {
              color: "#a3f0eb",
              fontWeight: "normal",
              fontSize: this.itemGap * 1.2
            }
          }
          */
        ],
        //color: ["#5db2ff", "#6ed48d", "#e0ff66"],
        //color: ["#E0515F","#BCEB7F","rgba(80, 189, 240)","#21af7c"],
        color: [ "#4cc2ff","#FFFF77","#66FF66", "#FF8800","#5eff7d",  "#7a9df1",],
        tooltip: {
          show: true,
          formatter: "{b} : {c} ({d}%)"
        }, 
        legend: {
          show: false,
          //itemGap: this.itemGap*2.8,
          itemGap: this.itemGap*3.0,
          top:'25%',
          left:'43%',
          right: "5%",
          icon: "circle",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          formatter: name => {
            let value = dataArr.filter(v => {
              return v.name == name;
            });
            return [
              //"{a|" + name + "}{b|" + ((value[0].value)/10000).toFixed(2) + "平方千米}{c||}{d|"+(value[0].value/total*100).toFixed(2)+"%}"
              "{a|   " + name + "}{b|                 " + parseInt(((value[0].value))).toFixed(0) +    "}{d|                           "+((parseInt(value[0].value))/total*100).toFixed(2)+"%}"
            ].join("\n");
          },
          textStyle: {
            rich: {
              a: {
                color: "#ffffff",
                align: "left",
                width:7*this.itemGap,
                padding: [0, 5, 0, 0]
              },
              b: {
                color: "#a3f0eb",
                align: "left",
                fontSize: '1.2rem',
                width:this.itemGap*5,
                padding: [0, 5,0,0]
              },
              c: {
                color: "rgba(255, 255, 255, 0.12)",
                align: "center",
                fontSize:'1.6rem',
                width:this.itemGap*8,
                 padding: [0, 5,0,0]
              },
              d: {
                color: "#a3f0eb",
                align: "center",
                fontSize: '1.6rem',
                width:this.itemGap*2,
              }
            }
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["15%", 85],
            //roseType:'raidus',
            width:'20%',
            max:20,
            labelLine: {
              show: true,
              length:10,
              length2:5,
            },
            label:{
              color: "rgba(255,255,255)",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
              fontSize: 12,
              //formatter: "{b}:({d}%)"
              formatter: "{b} :  {c} 个 "
              +"\n({d}%)"
            },
            itemStyle: {
                emphasis: {
                    opacity: 1,
                }
            },
            data: dataArr
          }
        ]
      };
      if (window.innerHeight<800) {
        option.legend.itemWidth=7
        option.legend.itemGap=10
      }
      this.myChart.setOption(option);
      window.addEventListener(
        "resize",
        () => {
          if (window.innerHeight<800) {
            this.legendHeight=0;
            this.itemGap=0
            option.legend.itemGap=10
            option.legend.itemWidth=7
          }else{
            this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
          }

          this.myChart.setOption(option);
          this.myChart.resize();
        },
        true
      );
    }
  }
};
</script>

<style lang="scss" scoped>
//@import "./../../../assets/css/_letiable.scss";
.myChart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  // &:after{
  //     display: inline-block;
  //     content:'';
  //     position: absolute;
  //     width: 170px;
  //     height:170px;
  //     left: 2px;
  //     top:12px;
  //     border:1px solid red;
  //     border-radius: 50%;
  // }
}
</style>
