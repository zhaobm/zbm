<template>
  <div class="attribute" id = "attributeImg">
    <div class="attheader" @mousedown="mouseDownImg" @mouseup="mouseUpImg">
      <span class = "attheader-name">核  查  图</span>
      <a href="#" class="attheader-closer" @click="close()"></a>
    </div>

    <div class="attrcontent">
      <el-image class="image" v-for="(img,index) in imgArr" :src="img" v-bind:key= "img" :preview-src-list="getImgList(index)" ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr:[
      ],
      isDrag :false,
      preX : 0,
      preY : 0,
      dragAttribute : null,
      currentPage:1,
      featureCount:1000,
      Fields:[],
      FeaturesData:[],
      selectedRow:0,
    }
  },
  props: {
    featuredata: {
      type: Object,
      default: () => {
        return {
          featureArr: [],
        };
      }
    },
  },
  watch: {
    featuredata: {
      handler: function (val, oldVal) {
        this.imgArr = val.featureArr;
      },
      deep: true
    },
  },
  computed:{

  },
  methods: {
    getImgList(index) {
      let arr = []
      let i = 0;
      for(i;i < this.imgArr.length;i++){
        arr.push(this.imgArr[i+index])
        if(i+index >= this.imgArr.length-1){
          index = 0-(i+1);
        }
      }
      return arr;
    },
    close(){
      this.$emit('closeImgDiv');
    },
    mouseDownImg(e){
      var that = this;
      that.dragAttribute = document.getElementById("attributeImg");
      that.isDrag = true;
      that.preX = e.clientX;
      that.preY = e.clientY;
      that.dragAttribute.style.cursor = "move";

      document.onmousemove = function(ev){
        that.dragAttribute.style.top = that.dragAttribute.offsetTop + (ev.clientY - that.preY) +"px";
        that.dragAttribute.style.left = that.dragAttribute.offsetLeft + (ev.clientX - that.preX) +"px";
        that.dragAttribute.style.cursor = "move";
        that.preX = ev.clientX;
        that.preY = ev.clientY;
      }
    },
    mouseUpImg(e){
      var that = this;
      that.isDrag = false;
      that.preX = 0;
      that.preY = 0;
      document.onmousemove = null;
      that.dragAttribute.style.cursor = "default";
      that.dragAttribute = null;
    },
    getRowDetail(row){
      this.$emit('attrCall',row);
    }

  }
}
</script>

<style scoped lang="scss">
.attribute{
  position: absolute;
  top:240px;
  left:400px;
  width: 680px;
  height: 500px;
  background-color: rgba(3, 73, 114, 0.7);
  border:1px solid rgba(81, 169, 213,0.7);
  color: #eee;
  border-radius: 10px;
}
.attheader{
  height: 35px;
  background: url("../../../../src/assets/images/banner1.png") no-repeat;
  //background-color: rgba(12, 30, 39, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border:1px solid rgba(81, 169, 213,0.5);
  box-sizing: border-box;
}
.attheader-name{
  position: relative;
  top:6px;
  left:315px;
  font-size: 18px;
  vertical-align:middle;
}
.attheader-closer{
  text-decoration: none;
  position: relative;
  top:6px;
  left:590px;
}
.attheader-closer:after{
  content: "X";
  color: #eee;
}
.attrcontent{
  height: 400px;
  overflow: auto;
  padding:30px 42px 20px 42px;
}
.attrcontent /deep/ .image{
  width: 192px;
  height: 192px;
  padding: 5px;
}

.attrcontent /deep/ .attr-card{
  height:443px;;
  background-color: rgba(20, 50, 66, 0.2);
  border: 1px solid rgba(20, 50, 66, 0.2);
  box-sizing: border-box;
}


::-webkit-scrollbar{
  width: 10px; /*滚动条宽度*/
  height: 10px; /*滚动条高度*/
}

::-webkit-scrollbar-thumb{
  box-shadow: 0px 1px 3px #00a0e9 inset; /*滚动条的内阴影*/
  border-radius: 10px; /*滚动条的圆角*/
  background-color: rgba(7, 150, 222, 0.6); /*滚动条的背景颜色*/
}

::-webkit-scrollbar-track{
  box-shadow: 0px 1px 3px #071e4a inset; /*滚动条的背景区域的内阴影*/
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: #071e4a; /*滚动条的背景颜色*/
}

</style>


