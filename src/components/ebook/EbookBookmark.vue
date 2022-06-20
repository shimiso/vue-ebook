<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{ text }}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
import Bookmark from '../common/Bookmark'
import { ebookMixin } from '../../utils/mixin'
import { getBookmark, saveBookmark } from '../../utils/localStorage'
const BLUE = '#346cbc'
const WHITE = '#fff'
  export default {
    mixins: [ebookMixin],
    components: {
      Bookmark
    },
    computed: {
      fixedStyle() {
        return {
          position: 'fixed',
          top: 0,
          right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
        }
      }
    },
    watch: {
      offsetY(v) {
        if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
          return
        }
        if(v>=this.height&&v<this.threshold){
          //状态2：未到达零界状态
          this.beforeThreshold(v);
        }else if(v>=this.threshold){
          //状态3：达到临界状态
          this.afterThreshold(v);
        }else if (v > 0 && v < this.height) {
          //状态1：未超过书签的高度
          this.beforeHeight()
        }else if (v === 0) {
          //状态4：归位
          this.restore()
        }
      },
      isBookmark(isBookmark) {
        this.isFixed = isBookmark
        if (isBookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    data() {
      return {
        height: 35,
        threshold: 55,
        text: '',
        color: WHITE,
        isFixed: false
      }
    },
    methods: {
      addBookmark() {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '')
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfirange = `${cfibase}!,${cfistart},${cfiend})`
        this.currentBook.getRange(cfirange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookmark() {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          //过滤掉当前书签后重新保存就是删除
          saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
          this.setIsBookmark(false)
        }
      },
      restore() {
        // 状态4：归位
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }, 200)
        if (this.isFixed) {
          this.setIsBookmark(true)
          this.addBookmark()
        } else {
          this.setIsBookmark(false)
          this.removeBookmark()
        }
      },
      beforeHeight() {
        // 状态1：未超过书签的高度
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
      beforeThreshold(v) {
        // 状态2：未到达零界状态
        this.$refs.bookmark.style.top = `${-v}px`
        this.beforeHeight()
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
      },
      afterThreshold(v) {
        // 状态3：超越零界状态
        this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === '' ||
            iconDown.style.transform === 'rotate(0deg)') {
          iconDown.style.transform = 'rotate(180deg)'
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-bookmark {
    position: absolute;
    top: -35px;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 35px;
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: 45px;
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: 14px;
        color: white;
        transition: all .2s linear;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ebook-bookmark-text {
        font-size: 14px;
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: 15px;
    }
  }
</style>
