<template>
  <div class='map-box'>
    <!--LEE 地图展示区域-->
    <div class='map' id="map">
    </div>
    <div class="scale" v-if="scaleFlag">{{scaleVal}}</div>
  </div>
</template>

<script>

export default {
  name: "mapbox",

  data() {
    return {
      map: null,
      scaleVal: null,
      scale: null,
      scaleFlag: true,
      currentData:0,
      lastData:'z',
      zoom: null,
      popup: null,
      d: null,
      c: null,
      tips: {
        left: 0,
        top: 0
      },
      flag: false,
      town_id:'',
    };
  },
  props: {
    
  },
  watch: {
    
  },
  components: {
 
  },
  methods: {
 
  },
  mounted: function() {
    const _this = this;
  }
};
</script>

<style lang="scss" scoped>
.map-box {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 0;
  .map {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}

</style>
