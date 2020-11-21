<template>
  <transition enter-active-class="animate__animated animate__slideInDown animate__faster"
  leave-active-class="animate__animated animate__slideOutUp animate__faster">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {ebookMixin} from "@/utils/mixin";
  export default {
    mixins: [ebookMixin],
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .title-wrapper{
    position: absolute;//绝对定位的元素，位置通过 "left", "top", "right","bottom" 进行规定
    top: 0;
    left: 0;
    display: flex;
    z-index: 200;//属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面
    width: 100%;
    height: 48px;
    background: white;
    box-shadow: 0 8px 8px rgba(0, 0, 0, .15);
    font-size: 20px;
    .left {
      flex: 0 0 60px;//设置子元素如何分配空间  flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
      display: flex;
      justify-content: flex-start;//设置元素在主轴（横轴）方向上的对齐方式
      align-items: center;//设置元素在侧轴（纵轴）方向上的对齐方式。
      margin-left: 15px;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-shelf {
          font-size: 22px;
        }
        .icon-cart {
          font-size: 22px;
        }
      }
    }
  }
</style>
