<template>
  <div ref="myChart"
       class="myChart-wrapper">
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
          dataArr: [
          ],
          title: [],
          color: [188, 235, 127],
          itemGap: 30,
          legendHeight: 0,
          itemWidth: 15
        };
      }
    }
  },
  mounted () {
    this.initChart();
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
    initChart () {
      let dataArr=this.data.dataArr
      this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
      this.myChart = echarts.init(this.$refs.myChart);
      let total=0
      dataArr.forEach(v=>total=parseInt(v.value)+total)
      let option = {
        title: [
        ],
        color: ["#ffa562" ,"#5eff7d", "#7a9df1","#CCFF99",  "#00a091"],
        //00ffea
        //color: [ "#E0515F","#BCEB7F","rgba(80, 189, 240)","#21af7c","rgba(56, 110, 228)"],
        tooltip: {
          show: true,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        }, 
        legend: {
          show:false
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["25%", "55%"],
            roseType:'raidus',
            width:'20%',
            max:20,
            labelLine: {
              show: true,
              length:15,
              length2:5
            },
            label:{
              color: "rgba(255,255,255)",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
              fontSize: 12,
              formatter: "{b} :  {c} 个 "
              +"\n({d}%)"
            },
            itemStyle: {
                emphasis: {
                    opacity: 1,
                    label:{
                        show:true
                    },
                    labelLine:{
                        show:true
                    }
                }
            },
            data: dataArr
          }
        ]
      };
      if (window.innerHeight < 800) {
        option.legend.itemWidth = 7;
        option.legend.itemGap = 10;
      }
      this.myChart.setOption(option);
      window.addEventListener(
        "resize",
        () => {
          if (window.innerHeight < 800) {
            this.legendHeight = 0;
            this.itemGap = 0;
            option.legend.itemGap = 10;
            option.legend.itemWidth = 7;
          } else {
            this.itemGap = parseInt(
              document.getElementsByTagName("html")[0].style["font-size"]
            );

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
