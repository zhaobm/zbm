<template>
  <div class="R" id = "attribute">
    <div class="attheader">
      <el-button size="mini" @click="QuanTu()">全图</el-button>
      <a href="#" class="attheader-closer" @click="close()"></a>
    </div>

    <div class="attrcontent">
      <div class="block" v-for="fit in fits" :key="fit">
        <el-image
            class="image"
            id="picture"
            :src="url"
            :fit="fit"
            @mousewheel="mousewheel" @mousedown="mousedown" @mouseup="mouseUp"></el-image>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fits: ['contain'],
      srcList: [
        'http://localhost:8080/Pictures/总图.jpg'
      ],
      isDrag :false,
      preX : 0,
      preY : 0,
      dragImage : null,
      currentPage:1,
      featureCount:1000,
      Fields:[],
      FeaturesData:[],
      selectedRow:0,
      scale:1.0,
      position:0,
      positionX:0,
      positionY:0,
    }
  },
  props: {
    url:{
      type: String,
      default: () => {
        return "";
      }
    },

  },
  watch: {


  },
  computed:{

  },
  methods: {
    QuanTu(){
      console.log('here quantu')
      var image = document.getElementById("picture");
      this.scale = 1.0;
      this.position = 0;
      image.style.transform = "scale(1.0)";

    },


    close(){
      console.log('close')
      this.$emit('closeDiv');
    },


  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.attribute{
  position: absolute;
  top:172px;
  left:50%;
  width: 945px;
  height: 772px;
  background-color: rgba(20, 50, 66, 0.9);
  border:1px solid #2d9690;
  color: #eee;
  //border-radius: 10px;
}
.attheader{
  height: 35px;
  box-sizing: border-box;
  background-color: rgba(12, 30, 39, 1);
  border:1px solid #2d9690;
  box-sizing: border-box;
  .el-button{
    width: 45px;
    height:26px;
    font-size: 14px;
    background: #153849;
    border: 1px solid #056d68;
    color: #EEE;
  }
  .el-button:hover{
    background: #1d4b63;
    border: 1px solid #03837c;
    color: #EEE;
  }
  .el-button:focus{
    background: #45b0e6;
    border: 1px solid #03837c;
    color: #EEE;
  }
  .el-button.el-button--mini{
    padding: 5px 0px 5px 0px;
  }
}
.attheader-closer{
  text-decoration: none;
  position: absolute;
  top:7px;
  left:900px;
  font-size: 1.5em;
}
.attheader-closer:after{
  content: "X";
  color: #eee;
}
.attrcontent{
  height: 748px;
  overflow: hidden;
}
.image{
  width: 950px;
  height: 737px;
}


.el-card.attr-card{
  height:443px;;
  background-color: rgba(20, 50, 66, 0.2);
  border: 1px solid rgba(20, 50, 66, 0.2);
  box-sizing: border-box;
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


