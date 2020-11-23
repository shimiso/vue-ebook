<template>
  <div>
    <div class="search-bar">
        <div class="search-bar-title-wrapper">
          <div class="title-icon-back-wrapper">
            <span class="icon-back icon"></span>
          </div>
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper">
            <span class="icon-shake icon"></span>
          </div>
        </div>

      <div class="search-bar-input-wrapper">
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input class="input"
                 type="text"
                 :placeholder="$t('home.hint')"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {  },
    mixins: [],
    data() {
      return {
      }
    },
    watch: {
    },
    methods: {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: absolute;
    width: 100%;
    .search-bar-title-wrapper {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 42px;
      .title-icon-back-wrapper {
        position: absolute;
        left: 15px;
        top:0;
        height: 42px;
        @include center
      }
      .title-text-wrapper {
        width: 100%;
        height: 42px;
        @include center
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: 15px;
        top:0;
        height: 42px;
        @include center
      }
    }
    .search-bar-input-wrapper{
      position: absolute;
      left: 0;
      top: 42px;
      width: 100%;
      height: 52px;
      padding: 10px;
      box-sizing: border-box;
      .search-bar-input{
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: 20px;
        padding: 5px 15px;
        box-sizing: border-box;
        border: 1px solid #eee;//1像素灰色边框
        @include left
        .icon-search{
          color: #999;
        }
        .input{
          width: 100%;
          height: 22px;
          border: none;
          background: transparent;
          margin-left: 10px;
          font-size: 12px;
          color: #666;
          &:focus{
            outline: none;//去掉选中后边框
          }
          &::-webkit-input-placeholder{
            color: #ccc;
          }
        }
      }
    }
  }
</style>
