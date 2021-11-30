<template>
  <div class="attribute" :style="{'top':topValue, 'left':leftValue}" id = "attribute">
    <div class="attheader"  @mousedown="mouseDown" @mouseup="mouseUp">
      <span class = "attheader-name">查  询  表</span>
      <a href="#" class="attheader-closer" @click="close()"></a>
    </div>

    <div class="attrcontent">
      <el-card class="attr-card" shadow="always" :body-style="{padding:'30px 42px 20px 42px'}">
        <el-table id = "playList" :data="tableData" ref="refTable" style="width: 100% " fit highlight-current-row>
          <el-table-column type="expand" width="100px">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item class="demo-table-expand-label" v-for="(keyItem,index) in Object.keys(props.row)" :key="index">
                  <span slot="label" class = "lable-style">{{keyItem}}</span>
                  <span  id="lable-style-content">{{props.row[keyItem]}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="核查成果" prop="核查类型"></el-table-column>
          <el-table-column v-if= "isPicture" label="照片成果">
            <template  id= picture-style slot-scope="scope">
              <!--                        <el-button v-if= "isPerPicture" @click="handleClick(scope.row)" type="text" size="small">查看照片</el-button>-->
              <el-button  @click="handleClick(scope.row)" type="text" size="large">查看照片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!--      <div class="attrcontent">
            <el-card class="attr-card" shadow="always" :body-style="{padding:'30px 42px 20px 42px'}">
              <el-table id="table" ref="AttrTable" :data="FeaturesData" style="width:100%" height="370" fit highlight-current-row @row-click="getRowDetail">
                <el-table-column v-for="col in Fields" v-bind:key= "col.prop" :prop="col.prop" :label="col.label" align="center"  min-width="150px">
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div class="page">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev,pager,next,jumper"
                    :total="featureCount"
                    >
                </el-pagination>
          </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrag :false,
      preX : 0,
      preY : 0,
      dragAttribute : null,
      currentPage:1,
      featureCount:1000,
      isPicture:false,
      isPerPicture:true,
      selectedRow:0,
      picture:"照片附件",
      topValue:'0px',
      leftValue:'0px',
      tableData: [{"核查类型":"覆被类型","内业编号":"123","生态破坏":"动态地物","序号":"5","时间":"20201112_123105","经度":"110.326524759829","纬度":"33.6877893191809","海拔":"523.077334651724","地貌类型":"丘陵","南覆被类型":"51","南判读类型":"null","南正误":"对","北覆被类型":"53","北判读类型":"null","北正误":"对","东覆被类型":"122","东判读类型":"null","东正误":"对","西覆被类型":"53","西判读类型":"null","西正误":"对","照片附件":"M61102220201112_1234587T.jpg,M61102220201112_1235538Q.jpg"},
        {"核查类型":"动态地物","南覆被类型":"51","南判读类型":"null","南正误":"对","北覆被类型":"53","北判读类型":"null","北正误":"对","东覆被类型":"122","东判读类型":"null"}],
      nodeForm:{}
    }
  },
  props: {
    featuredata: {
      type: Object,
      default: () => {
        return {
          featureArr: {},
          searchArr: {},
          totalCount: 0,
        };
      }
    },
    arrPosition: {
      type: Object,
      default: () => {
        return {
          tableLeft: "",
          tableTop: "",
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
        this.initTable();
      },
      deep: true
    },
    /*    selectFeature: {
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
        },*/

  },
  /*  computed:{

    },*/
  methods: {
    initChart(){},
    //
    /*clickTable(row){
      console.log('row',row)
      var index = this.featuredata.searchArr.attr.indexOf(row)
      this.nodeForm = this.featuredata.featureArr.attr[index]
      this.$refs.refTable.toggleRowExpansion(row)
 },*/
    handleClick(row){
      this.$emit('attrCall',row);
      console.log('handleClick row',row)
    },
    close(){
      this.isPicture = false;
      this.$emit('closeDiv');
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
    initTable(){
      var that = this;
      var Features = that.featuredata.featureArr.attr;
      if(Features.length>0){
        this.tableData = this.featuredata.featureArr.attr;
        /*        var firstFeature = Features[0];
                var keyArray = [];
                for(var key in firstFeature){
                  keyArray.push(key);
                  that.Fields.push({prop:key,label:key});
                }

                that.FeaturesData = Features.slice(0,10);
                this.$refs.AttrTable.data  = Features.slice(0,10);*/
      }
      for(var i=0;i<this.featuredata.totalCount;i++){
        if(this.tableData[i]["野外相片编码"]!==""){
          console.log('this.tableData[i]["野外相片编码"]',this.tableData[i]["野外相片编码"])
          this.isPicture = true
          // delete  this.tableData[i]["核查类型"]
        }
      }
      this.topValue = this.arrPosition.tableTop;
      this.leftValue = this.arrPosition.tableLeft;
    },
    /*    handleCurrentChange(curPage){
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
        }*/
  },
  /*  mounted() {
      // window.addEventListener('click', this.closeBarcode)
      if(document.getElementById("playList")){
        this.timer  =  setInterval(() => {
          // （也可以使用`this.$ref`获得表格元素让母后`.classList.remove("el-table--enable-row-hover")`）
          document.getElementById("playList").classList.remove("el-table--enable-row-hover")
        })
      }
    },*/

  // }
}
</script>

<style scoped lang="scss">
.lable-style{
  width: 50%;
  color:rgba(81, 169, 213,1);
  font-size: 16px;
  width:100px;
  text-align-last:justify;
  display:inline-block;

}
//  #lable-style-content{
//    margin-right: 0;
//    margin-bottom: 0;
//    width: 50%;
//    color: #99a9bf;
//    border:1px solid rgba(81, 169, 213,0.7);
//}

.picture-style{
  position: absolute;
  top:240px;
  left:400px;
  width: 680px;
  height: 500px;
  background-color: rgb(243, 13, 13);
  border:1px solid rgba(81, 169, 213,0.7);
  color: #eee;
  border-radius: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  color: #99a9bf;
  //demo-table-expand:#95b9e6;
  //border:1px solid rgba(81, 169, 213,0.7);
}

.attribute{
  position: absolute;
  top:240px;
  left:400px;
  width: 700px;
  height: 500px;
  background-color: rgba(3, 73, 114, 0.7);
  border:1px solid rgba(81, 169, 213,0.7);
  color: #eee;
  border-radius: 10px;
}
#attribute{
  min-height:400px;
  height: auto;
  //width: 800px;
}
.attheader{
  height: 35px;
  width: 700px;
  background: url("../../../../src/assets/images/banner1.png") no-repeat;
  //background-color: rgba(12, 30, 39, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border:1px solid rgba(81, 169, 213,0.5);
  box-sizing: border-box;
}
.attheader-name{
  position: relative;
  //height:auto;
  top:6px;
  left:315px;
  font-size: 18px;
  vertical-align:middle;

  //display:table-cell;
  display:inline-block;
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
  height: auto;
  width: 800px;
  overflow: hidden;
}
.picture-style{
  color: #f111e6;
}
/*    .page{
        height: 32px;
        background-color: rgb(2, 60, 88);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        box-sizing: border-box;
    }
.el-pagination{

}

.el-pagination /deep/  button:disabled.btn-prev{
  background-color: rgb(2, 60, 88);
  color: rgb(106, 108, 112);
}

.el-pagination  /deep/ .btn-prev{
  background-color: rgb(2, 60, 88);
  color: rgb(190, 190, 190);
}

.el-pagination /deep/  .el-pager li{
  background: rgb(2, 60, 88);
  color: rgb(159, 159, 161);
}

.el-pagination /deep/  .el-pager li.active{
  color: rgb(9, 149, 219);
}

.el-pagination /deep/  button:disabled.btn-next{
  background-color: rgb(2, 60, 88);
  color: rgb(106, 108, 112);
}

.el-pagination /deep/  .btn-next{
  background-color: rgb(2, 60, 88);
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
  background-color: rgb(2, 60, 88);
  color: rgb(190, 190, 190);
}*/

.attrcontent /deep/ .attr-card{
  height:auto;;
  width:700px;;
  background-color: rgba(20, 50, 66, 0.45);
  border: 1px solid rgba(20, 50, 66, 0.2);
  box-sizing: border-box;
}

.attrcontent /deep/ .el-table{
  color: rgb(214, 214, 218);
  background-color: rgba(20, 50, 66, 0.2);
}

.attrcontent /deep/ .el-table thead {
  color: rgba(81, 169, 213,1);
}

.attrcontent /deep/ .el-table th, .el-table tr{
  background-color: rgba(20, 50, 66, 0);
  padding: 0;
  height: 60px;
  border-bottom: 1px solid rgba(81, 169, 213,0.7);
}

.attrcontent /deep/ .el-table tr, .el-table td{
  background-color: rgba(20, 50, 66, 0);
  padding: 4px;
  height: 33px;
  border-bottom: 1px solid #216e6c;
}

.attrcontent /deep/ .el-table__header-wrapper{
  font-size: 18px;
  color: #f111e6;
}

.attrcontent /deep/ .el-table__body-wrapper{
  font-size: 16px;
  //color: #95b9e6;
  color: #99a9bf;

}

.attrcontent /deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(20, 50, 66, 0);
}

.attrcontent /deep/ .el-table__body tr:hover>td{
  background-color: rgba(2, 66, 99, 0.7) ;
}

.attrcontent /deep/ .el-table__body tr.current-row>td{
  background-color: rgba(2, 66, 99, 0.7) !important;
}

.attrcontent /deep/ .el-table td, {
  border-bottom: 0.1px solid rgba(81, 169, 213,1);
}
.attrcontent /deep/ .el-table th.is-leaf {
  //border-bottom: 2px solid rgba(255, 255, 255,0.6);
  border-bottom: 4px solid rgba(81, 169, 213,1);

}

.attrcontent /deep/ .el-table__expanded-cell {
  color: #FFFFFF;
  background-color: rgba(2, 66, 99, 0.7) ;
  padding: 20px 30px 20px 30px;
}

.el-table  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; /*滚动条宽度*/
  height: 10px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
.el-table  /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: 0px 1px 3px #071e4a inset; /*滚动条的背景区域的内阴影*/
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: #071e4a; /*滚动条的背景颜色*/
}
/*定义滑块 内阴影+圆角*/
.el-table  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  box-shadow: 0px 1px 3px #00a0e9 inset; /*滚动条的内阴影*/
  border-radius: 10px; /*滚动条的圆角*/
  background-color: rgba(7, 150, 222, 0.6); /*滚动条的背景颜色*/
}

/*
::-webkit-scrollbar{
    height: 7px;
}

::-webkit-scrollbar-thumb{
    background-color: rgba(42, 136, 136, 0.5);
}

::-webkit-scrollbar-track{
    border-radius: 0px;
}
*/
</style>


