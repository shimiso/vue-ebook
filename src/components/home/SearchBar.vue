<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition enter-active-class="animate__animated animate__slideInDown animate__faster"
                  leave-active-class="animate__animated animate__slideOutUp animate__faster">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}"  @click="back">
        <span class="icon-back icon"></span>
      </div>

      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input class="input"
                 type="text"
                 v-model="searchText"
                 :placeholder="$t('home.hint')"
                 @click="showHotSearch"
                 @keyup.13.exact="search"/><!--只能按下回车键盘搜索-->
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import HotSearchList from "@/components/home/HotSearchList";
  export default {
    components: {HotSearchList },
    mixins: [storeHomeMixin],
    data() {
      return {
        searchText: '',
        titleVisible:true,
        shadowVisible:false,
        hotSearchVisible:false
      }
    },
    watch: {
      offsetY(offsetY){
        if(offsetY>0){
          this.hideTitle()
          this.showShadow()
        }else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY(offsetY){
        if(offsetY>0){
          this.showShadow()
        }else{
          this.hideShadow()
        }
      }
    },
    methods: {
      search() {
        this.$router.push({
          path: '/store/list',
          query: {
            keyword: this.searchText
          }
        })
      },
      showFlapCard(){
        this.setFlapCardVisible(true)
      },
      //返回  1.如果外部向上偏移量>0 则显示阴影 否则隐藏阴影 2.隐藏热门搜索
      back(){
        if(this.offsetY>0){
          this.showShadow()
        }else {
          this.hideShadow()
        }
        this.hideHotSearch()
      },
      //显示热门搜索 1.隐藏title 2.显示搜索 3.dom更新之后重置热门搜索
      showHotSearch() {
        this.hideTitle()
        this.hotSearchVisible = true

        //在整个dom更新完之后 在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(()=>{
          this.$refs.hotSearch.reset();
        })

      },
      //隐藏热门搜索 1.隐藏搜索 2.如果搜索向上偏移>0 则隐藏标题显示搜索框阴影 否则显示标题隐藏搜索框阴影
      hideHotSearch() {
        this.hotSearchVisible = false
        if(this.offsetY>0){
          this.hideTitle()
          this.showShadow()
        }else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      },
      hideShadow() {
        this.shadowVisible = false
      },
      showShadow() {
        this.shadowVisible = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    width: 100%;
    height: 94px;
    z-index: 150;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
    &.hide-title{
      height: 52px;
    }
    &.hide-shadow{
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 42px;
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
    .title-icon-back-wrapper {
      position: absolute;
      left: 15px;
      top:0;
      height: 42px;
      z-index: 200;
      @include center;
      transition: height $animationTime $animationType;;//监听变化  出现一个2秒的线性动画
      &.hide-title{
        height: 52px;
      }
    }
    .search-bar-input-wrapper{
      position: absolute;
      top: 42px;
      left: 0;
      display: flex;
      width: 100%;
      height: 52px;
      padding: 10px;
      box-sizing: border-box;
      transition: top  $animationTime $animationType;;//监听top变化  出现一个2秒的线性动画
      &.hide-title{
        top: 0;
      }
      .search-bar-blank{
        flex: 0 0 0;//默认搜索框撑满
        width: 0;
        transition: all  $animationTime $animationType;;//监听变化  出现一个2秒的线性动画
        &.hide-title{//当标题隐藏的时候，左侧位置空出
          flex: 0 0 31px;
          width: 31px;
        }
      }
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
