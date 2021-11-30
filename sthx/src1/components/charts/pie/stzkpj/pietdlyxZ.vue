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
      var that = this;
      let dataArr=this.data.dataArr
      this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
      this.myChart = echarts.init(this.$refs.myChart);
      let total=0
      dataArr.forEach(v=>total=parseInt(v.value)+total)
      let option = {
        title: [
          /*
          {
            text: parseInt(Number(total)),
            left: "49%",
            top: "45%",
            textAlign: "center",
            textBaseline: "middle",
            textStyle: {
              color: "#a3f0eb",
              fontWeight: "normal",
              fontSize: this.itemGap * 2.2
            }
          },
          {
            text: "加油站数量",
            left: "49%",
            top: "55%",
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

        //color: ["#FF8888","#5599FF", "#31ada5", "#4cc2ff","#5eff7d", ],
        color: ["#5eff7d", "#4cc2ff", "#7a9df1", "#31ada5","#f6cf2f","#FF8800","#ec797e",],
       //color: [,,"#66FF66"],
        tooltip: {
          confine: true,
          show: true,
          formatter: "{b} : {c} 平方公里 ({d}%)"
        }, 
        legend: {
          show: true,
         // orient: 'vertical',
         // left: 'right',
          textStyle:{
            color:"#ffffff"
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "60%"],
            width:'90%',
          //  radius: ["10%", 85],
            radius: ['40%', '65%'],
           // roseType:'angle',
            max:20,
            labelLine: {
              show: true,
              length:8,
              length2:5
            },
            label:{
              show:true,
              color: "rgba(255,255,255)",
              fontWeight: 'bolder',
              fontFamily : 'Microsoft YaHei',
              fontSize: 12,
              //formatter: "{b}:{d}%"
              formatter: "{b} : "
              +" {c} ({d}%)"
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
      this.myChart.on('click', function(params) {
          console.log(params); 
          
          that.$emit('pieClick',{
            name:params.name
          });
      });

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

.myChart-wrapper {
  width: 507px;
  height: 250px;
  margin-top: 10px;
  position: relative;

}
</style>
