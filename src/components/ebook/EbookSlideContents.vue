<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input" type="text"
               :placeholder="$t('book.searchHint')"
               v-model="searchText"
               @keyup.enter.exact="search()"
               @click="showSearchPage()"/>
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">取消</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
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
    <scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label" :class="{'selected': section === index}"
              :style="contentItemStyle(item)"  @click="displayContent(item.href)">{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div class="slide-search-item"
           v-for="(item, index) in searchList"
           :key="index"
           v-html="item.excerpt"
           @click="displayContent(item.cfi, true)"></div>
    </scroll>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import Scroll from '../common/Scroll'
export default {
  name: "EbookSlideContents",
  mixins:[ebookMixin],
  components: {
    Scroll
  },
  data(){
    return{
      searchVisible:false,
      searchList: null,
      searchText:''
    }
  },
  mounted() {
    // this.doSearch('added').then(list=>{
    //   console.log(list)
    // })
  },
  methods:{
    search() {
      //判断查询条件不为空
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            //替换高亮显示
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    doSearch(q) {
      return Promise.all(
          this.currentBook.spine.spineItems.map(
              section => section.load(this.currentBook.load.bind(this.currentBook))
                  .then(section.find.bind(section, q))
                  .finally(section.unload.bind(section)))
      ).then(results => Promise.resolve([].concat.apply([], results)))//多维数组合并一维数组
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${item.level * 15}px`
      }
    },
    /**
     * 显示电子书内容
     * @param target 目标位置
     * @param highlight 是否高亮显示，默认false
     */
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    showSearchPage(){
      this.searchVisible = true
    },
    hideSearchPage(){
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
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
          font-size: 14px;
          line-height: 16px;
          @include left;
          .slide-contents-book-title-text{
            @include ellipsis2(3)
          }
        }

        .slide-contents-book-author {
          font-size: 12px;
          line-height: 14px;
          margin-top: 5px;
          @include left;
          .slide-contents-book-author-text{
            @include ellipsis2(1)
          }
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
      padding: 0 15px;
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
    .slide-search-list {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .slide-search-item {
        font-size: 14px;
        line-height: 16px;
        padding: 20px 0;
        box-sizing: border-box;
      }
    }
  }
</style>