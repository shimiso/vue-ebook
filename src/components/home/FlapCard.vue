<template>
  <div class="flap-card-warpper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card">
        <div class="flap-card-circle" v-for="(item,index) in flapCardList" :key="index">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item,'left')"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right"  :style="semiCircleStyle(item,'right')"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import { flapCardList } from '../../utils/store'
export default {
  name: "FlapCard",
  mixins: [storeHomeMixin],
  data() {
    return {
      flapCardList
    }
  },
  methods:{
    close(){
      this.setFlapCardVisible(false)
    },
    semiCircleStyle(item,dir){
      return{
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.flap-card-warpper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0,0,0,.6);
  .close-btn-wrapper{
    position: absolute;
    left: 0;
    bottom: 30px;
    z-index: 1100;
    width: 100%;
    @include center
    .icon-close{
      width: 45px;
      height: 45px;
      font-size: 25px;
      border-radius: 50%;
      background: #333;
      color: white;
      @include center
    }
  }
}

</style>