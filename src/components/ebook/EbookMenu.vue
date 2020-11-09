<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper">
        <div class="icon-wrapper">
          <span class="icon iconfont iconmenu"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon iconfont iconprogress"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon iconfont iconbright"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon iconfont iconA"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    methods: {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
</style>
