<template>
  <div class="popup" v-if="popupVisible">
    <div class="popup-bg" @click.stop.prevent="hide"></div>
    <transition enter-active-class="animate__animated animate__slideInUp animate__faster"
                leave-active-class="animate__animated animate__slideOutDown animate__faster">
      <div class="popup-wrapper" v-show="visible">
        <div class="popup-title" v-if="title&&title.length>0">{{title}}</div>
        <div class="popup-btn" :class="{'danger':item.type==='danger'}"
             v-for="(item,index) in btn"
             :key="index"
             @click="item.click">{{item.text}}</div>
      </div>
    </transition>
</div>
</template>

<script>
  export default {
    name: 'popup',
    props: {
      title: String,
      btn: Array
    },
    data(){
      return{
        popupVisible:true,
        visible:true
      }
    },
    methods:{
      show(){
        //界面先显示后再显示动画
        this.popupVisible = true
        setTimeout(()=>{
          this.visible=true
        })

      },
      hide(){
        //等动画结束后再隐藏界面
        this.visible=false
        setTimeout(()=>{
          this.popupVisible = false
        },200)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.popup {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2000;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0, .4);
  .popup-bg{
    height: 100%;
    width: 100%;
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: white;
    .popup-title {
      width: 100%;
      height: 44px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      line-height: 14px;
      padding: 15px;
      box-sizing: border-box;
      color: #999;
      @include center
    }
    .popup-btn {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #666;
      font-weight: bold;
      @include center;
      &.danger{
        color: $color-pink;
      }
    }
  }
}
</style>
