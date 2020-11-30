<template>
  <div class="shelf-search-wrapper" :class="{'search-top': ifInputClicked, 'hide-shadow': ifHideShadow}">
    <div class="shelf-search" :class="{'search-top': ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input class="search-input" type="text"  :placeholder="$t('shelf.search')"
                 @click="onSearchClick" v-model="searchText"/>
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>

      <div class="icon-locale-wrapper" @click="switchLocale" v-if="!ifInputClicked">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>

      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setLocalStorage } from '../../utils/localStorage'
import { storeShelfMixin } from '../../utils/mixin'

export default {
  mixins: [storeShelfMixin],
  name: "ShelfSearch",
  data(){
    return{
      searchText:'',
      ifInputClicked:false,
      ifHideShadow:false
    }
  },
  computed:{
    lang(){
      return this.$i18n.locale
    }
  },
  methods:{
    onSearchClick(){
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    clearSearchText(){
      this.searchText = ''
    },
    switchLocale(){
      if (this.lang === 'en') {
        this.$i18n.locale = 'cn'
      } else {
        this.$i18n.locale = 'en'
      }
      setLocalStorage('locale', this.$i18n.locale)
    },
    onCancelClick(){
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-search-wrapper{
  position: relative;
  z-index: 105;
  width: 100%;
  height: 94px;
  font-size: 16px;
  background: white;
  .shelf-search{
    position: absolute;
    top: 42px;
    left: 0;
    display: flex;
    width: 100%;
    height: 52px;
    transition: top $animationTime linear;
    &.search-top {
      top: 0;
    }
    .search-wrapper{
      display: flex;
      flex: 1;
      margin: 8px 0 8px 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      .icon-search-wrapper{
        flex: 0 0 22px;
        @include right
        .icon-search{
          font-size: 12px;
        }
      }
      .search-input-wrapper{
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        @include center
        .search-input{
          width: 100%;
          font-size: 14px;
          border: none;
          color: #333;
          &:focus{
            outline: none;
          }
          &::-webkit-input-placeholder{
            font-size: 14px;
            color: #ccc;
          }
        }
      }
      .icon-clear-wrapper{
        flex: 0 0 20px;
        @include left
        .icon-close-circle-fill{
          font-size: 14px;
          color: #ccc;
        }
      }
    }
    .icon-locale-wrapper{
      flex: 0 0 55px;
      @include center;
      .icon-cn,.icon-en{
        font-size: 22px;
        color: #666;
      }
      .icon{}
    }
    .cancel-btn-wrapper{
      flex: 0 0 55px;
      @include center;
      .cancel-text{
        font-size: 14px;
        color: $color-blue;
      }
    }
  }
}
</style>