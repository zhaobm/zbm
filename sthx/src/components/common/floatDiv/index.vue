<template>
    <div class="attribute" id = "attribute">
        <div class="attheader" @mousedown="mouseDown" @mouseup="mouseUp">
            <span class = "attheader-name">{{title}}</span>
            <a href="#" class="attheader-closer" @click="close()"></a>
        </div>
        
        <div class="attrcontent">
            <el-card class="attr-card" shadow="always" :body-style="{padding:'30px 42px 20px 42px'}">
                <el-table id="table" ref="AttrTable" :data="FeaturesData" style="width:100%" height="370" fit highlight-current-row @row-click="getRowDetail">
                    <el-table-column v-for="col in Fields" v-bind:key= "col.prop" :prop="col.prop" :label="col.label" align="center"  min-width="100px">
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
        </div>
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
                    featureArr: {},
                    totalCount: 0,
                };
            }
        },
        selectFeature:{
            type: Object,
            default: () => {
                return Feature;
            }
        },
        title:{
            type: String,
            default: () => {
                return "全 省 主 要 能 源 消 耗 统 计 表";
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
        handleCurrentChange(curPage){
            this.changeData(curPage);
        },
        changeData(curPage){
            var Features = this.featuredata.featureArr.attr;
            this.curPageFeature = this.$refs.AttrTable.data;
            this.FeaturesData = Features.slice((curPage-1)*10,curPage*10);
            //this.$refs.AttrTable.data  = this.FeaturesData;
        },
        getRowDetail(row){
            this.$emit('attrCall',row);
        }

    }
}
</script>

<style>
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
        /*
        position: relative;
        top:3px;
        left:378px;
        font-size: 1.8em;
        */
        display: block;
        width:100%;
        font-size: 1.7em;
        margin-top: 2px;
        text-align: center;
    }
    .attheader-closer{
        text-decoration: none;
        position: absolute;
        top:4px;
        left:780px;
        font-size: 1.5em;
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

    .el-pagination button:disabled.btn-prev{
        background-color: rgb(14, 46, 63);
        color: rgb(106, 108, 112);
    }

    .page .el-pagination .btn-prev{
        background-color: rgb(14, 46, 63);
        color: rgb(190, 190, 190);
    }

    .page .el-pagination .el-pager li{
        background: rgb(14, 46, 63);
        color: rgb(159, 159, 161);
    }

    .page .el-pagination .el-pager li.active{
        color: rgb(51, 165, 165);
    }

    .el-pagination button:disabled.btn-next{
        background-color: rgb(14, 46, 63);
        color: rgb(106, 108, 112);
    }

    .page .el-pagination .btn-next{
        background-color: rgb(14, 46, 63);
        color: rgb(190, 190, 190);
    }

    .page .el-pagination .el-pagination__jump{
        color: rgb(190, 190, 190);
    }

    .page .el-pagination__editor.el-input {
        margin: 5px;
    }

    .page .el-pagination__jump .el-pagination__editor.el-input .el-input__inner {
        height: 20px;
        background-color: rgb(14, 46, 63);
        color: rgb(190, 190, 190);
    }

    .el-card.attr-card{
        height:443px;;
        background-color: rgba(20, 50, 66, 0.2);
        border: 1px solid rgba(20, 50, 66, 0.2);
        box-sizing: border-box;
    }

    .attribute .attrcontent .el-table{
        color: rgb(214, 214, 218);
        background-color: rgba(20, 50, 66, 0);
    }

    .attribute .attrcontent .el-table thead {
        color: #eee;
    }

    .attribute .attrcontent .el-table th, .el-table tr{
        background-color: rgba(20, 50, 66, 0);
        padding: 0;
        height: 40px;
        border-bottom: 1px solid #216e6c;
    }
    .attribute .attrcontent .el-table td, .el-table th{
        padding: 0;
    }
    .attribute .attrcontent .el-table td, .el-table th.is-leaf{
        border-bottom: 1px solid #216e6c;
    }

    .attribute .attrcontent .el-table tr, .el-table td{
        background-color: rgba(20, 50, 66, 0);
        padding: 4px;
        height: 33px;
        border-bottom: 1px solid #216e6c;
    }
    .attribute .attrcontent .el-table .cell{
        line-height: 23px; 
    }
    .attribute .attrcontent .el-table__header-wrapper{
        font-size: 16px;
    }

    .attribute .attrcontent .el-table__body-wrapper{
        font-size: 14px;
    }

    .attribute .attrcontent .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: rgba(20, 50, 66, 0);
    }
    .el-table::before{
        background-color: rgba(38, 85, 110, 0)!important;
    }

    .el-table__body tr:hover>td{
        background-color: rgba(14, 35, 46, 0.4) !important;
    }

    .el-table__body tr.current-row>td{
        background-color: rgba(14, 35, 46, 0.5) !important;
    }

    ::-webkit-scrollbar{
        height: 6px;
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: rgba(42, 136, 136, 0.5);

    }

    ::-webkit-scrollbar-track{
        border-radius: 0px;

    }

    ::-webkit-scrollbar-corner {
        background-color: rgba(42, 136, 136, 0.0);
    }

</style>


