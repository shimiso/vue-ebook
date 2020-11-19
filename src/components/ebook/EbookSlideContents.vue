<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input" type="text"
               :placeholder="$t('book.searchHint')"
               @click="showSearchPage()"/>
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">取消</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img"/>
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list"
            :top="156"
            :bottom="48">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label" :class="{'selected': section === index}"  :style="contentItemStyle(item)">{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import { px2rem } from '../../utils/utils'
import Scroll from '../common/Scroll'
export default {
  name: "EbookSlideContents",
  mixins:[ebookMixin],
  components: {
    Scroll
  },
  data(){
    return{
      searchVisible:false
    }
  },
  methods:{
    contentItemStyle(item) {
      return {
        marginLeft: `${item.level * 15}px`
      }
    },
    showSearchPage(){
      this.searchVisible = true
    },
    hideSearchPage(){
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-slide-contents{
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: 36px;
      margin: 20px 0 10px 0;
      padding: 0 15px;
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center
        .slide-contents-search-icon {
          flex: 0 0 28px;
          font-size: 12px;
          @include center;
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: 32px;
          font-size: 14px;
          background: transparent;
          border:none;
          &:focus{
            outline: none;

          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 50px;
        font-size: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: 90px;
      padding: 10px 15px 20px 15px;
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 45px;
        .slide-contents-book-img {
          width: 45px;
          height: 60px;

        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        .slide-contents-book-title {
          width:153.75px;
          font-size: 14px;
          line-height: 16px;
          @include ellipsis2(3)
        }

        .slide-contents-book-author {
          width:153.75px;
          font-size: 12px;
          margin-top: 5px;
          @include ellipsis2(1)
        }
      }

      .slide-contents-book-progress-wrapper {
        flex: 0 0 80px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress {
          .progress {
            font-size: 14px;
          }

          progress-text {
            font-size: 12px;
          }
        }

        .slide-contents-book-time {
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: 20px 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: 14px;
          line-height: 16px;
          @include ellipsis;
        }
        .slide-contents-item-page {
          flex: 0 0 30px;
          font-size: 10px;
          @include right;
        }
      }
    }
  }
</style>