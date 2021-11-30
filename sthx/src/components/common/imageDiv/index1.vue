<template>
  <div class="attribute" id = "attribute">
    <div class="attheader" @mousedown="mouseDown" @mouseup="mouseUp">
      <span class = "attheader-name">查  询  表</span>
      <a href="#" class="attheader-closer" @click="close()"></a>
    </div>

    <div class="attrcontent">
      <el-card class="attr-card" shadow="always" :body-style="{padding:'30px 42px 20px 42px'}">
        <el-image v-for="(img,index) in imgArr" :src="img" :preview-src-list="getImgList(index)" style="width: 200px; height: 200px"></el-image>
      </el-card>
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
    selectFeature:{
      type: Object,
      default: () => {
        return Feature;
      }
    }
  },
  watch: {
    featuredata: {
      handler: function (val, oldVal) {
        //this.imgArr = val.featureArr;
      },
      deep: true
    },
    selectFeature: {
      handler: function (val, oldVal) {

        var Features = this.featuredata.featureArr.attr;
        for(var i=0;i<Features.length;i++){
          if((val.FID == Features[i].FID)&&(val.GB码 == Features[i].GB码)&&(val.ObjectID == Features[i].ObjectID)&&(val.数据类型 == Features[i].数据类型)&&(val.类型名称 == Features[i].类型名称)){
            this.selectedRow = i;
            break;
          }
        }
        this.currentPage = Math.ceil((this.selectedRow+1)/10);

        this.changeData(this.currentPage);

        this.$nextTick(() => {
          var currentRow = this.selectedRow-10*(this.currentPage-1);
          this.$refs.AttrTable.setCurrentRow(this.$refs.AttrTable.data[currentRow]);
        })


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
    initTable(){
      var that = this;

      that.featureCount = that.featuredata.totalCount;
      var Features = that.featuredata.featureArr.attr;
      that.Fields = [];
      that.FeaturesData=[];

      if(Features.length>0){
        var firstFeature = Features[0];
        var keyArray = [];
        for(var key in firstFeature){
          keyArray.push(key);
          that.Fields.push({prop:key,label:key});
        }

        that.FeaturesData = Features.slice(0,10);
        this.$refs.AttrTable.data  = Features.slice(0,10);
      }


    },
    close(){
      this.$emit('closeImgDiv');
    },
    mouseDown(e){
      var that = this;
      that.dragAttribute = document.getElementById("attribute");
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
    mouseUp(e){
      var that = this;
      that.isDrag = false;
      that.preX = 0;
      that.preY = 0;
      document.onmousemove = null;
      that.dragAttribute.style.cursor = "default";
      that.dragAttribute = null;
    },
    handleCurrentChange(curPage){
      this.changeData(curPage);
    },
    changeData(curPage){

      var Features = this.featuredata.featureArr.attr;
      this.curPageFeature = this.$refs.AttrTable.data;
      this.FeaturesData = Features.slice((curPage-1)*10,curPage*10);
      this.$refs.AttrTable.data  = this.FeaturesData;

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
  width: 800px;
  height: 500px;
  background-color: rgba(20, 50, 66, 0.9);
  border:1px solid #2d9690;
  color: #eee;
  border-radius: 10px;
}
.attheader{
  height: 25px;
  background-color: rgba(12, 30, 39, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border:1px solid #2d9690;
  box-sizing: border-box;
}
.attheader-name{
  position: relative;
  top:3px;
  left:378px;
  font-size: 1.8em;
}
.attheader-closer{
  text-decoration: none;
  position: relative;
  top:3px;
  left:720px;
}
.attheader-closer:after{
  content: "X";
  color: #eee;
}
.attrcontent{
  height: 443px;
  overflow: hidden;
}
.page{
  height: 32px;
  background-color: rgb(14, 46, 63);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  box-sizing: border-box;
}

.el-pagination{

}

.el-pagination /deep/  button:disabled.btn-prev{
  background-color: rgb(14, 46, 63);
  color: rgb(106, 108, 112);
}

.el-pagination  /deep/ .btn-prev{
  background-color: rgb(14, 46, 63);
  color: rgb(190, 190, 190);
}

.el-pagination /deep/  .el-pager li{
  background: rgb(14, 46, 63);
  color: rgb(159, 159, 161);
}

.el-pagination /deep/  .el-pager li.active{
  color: rgb(51, 165, 165);
}

.el-pagination /deep/  button:disabled.btn-next{
  background-color: rgb(14, 46, 63);
  color: rgb(106, 108, 112);
}

.el-pagination /deep/  .btn-next{
  background-color: rgb(14, 46, 63);
  color: rgb(190, 190, 190);
}

.el-pagination /deep/  .el-pagination__jump{
  color: rgb(190, 190, 190);
}

.el-pagination /deep/ .el-pagination__editor.el-input {
  margin: 5px;
}

.el-pagination /deep/ .el-pagination__editor.el-input .el-input__inner {
  height: 20px;
  background-color: rgb(14, 46, 63);
  color: rgb(190, 190, 190);
}

.attrcontent /deep/ .attr-card{
  height:443px;;
  background-color: rgba(20, 50, 66, 0.2);
  border: 1px solid rgba(20, 50, 66, 0.2);
  box-sizing: border-box;
}

.attrcontent /deep/ .el-table{
  color: rgb(214, 214, 218);
  background-color: rgba(20, 50, 66, 0.0);
}

.attrcontent /deep/ .el-table thead {
  color: #eee;
}

.attrcontent /deep/ .el-table th, .el-table tr{
  background-color: rgba(20, 50, 66, 0);
  padding: 0;
  height: 40px;
  border-bottom: 1px solid #216e6c;
}

.attrcontent /deep/ .el-table tr, .el-table td{
  background-color: rgba(20, 50, 66, 0);
  padding: 4px;
  height: 33px;
  border-bottom: 1px solid #216e6c;
}

.attrcontent /deep/ .el-table__header-wrapper{
  font-size: 14px;
}

.attrcontent /deep/ .el-table__body-wrapper{
  font-size: 10px;
}

.attrcontent /deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(20, 50, 66, 0);
}

.attrcontent /deep/ .el-table__body tr:hover>td{
  background-color: rgba(14, 35, 46, 0.4) !important;
}

.attrcontent /deep/ .el-table__body tr.current-row>td{
  background-color: rgba(14, 35, 46, 0.5) !important;
}

::-webkit-scrollbar{
  height: 6px;
}

::-webkit-scrollbar-thumb{
  background-color: rgba(42, 136, 136, 0.5);
}

::-webkit-scrollbar-track{
  border-radius: 0px;
}

</style>


