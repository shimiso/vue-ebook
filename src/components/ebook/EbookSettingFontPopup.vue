<template>
  <transition enter-active-class="animate__animated animate__slideInUp animate__faster"
              leave-active-class="animate__animated animate__slideOutDown animate__faster">
  <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <div class="ebook-popup-title">
      <div class="ebook-popup-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
    </div>
    <div class="ebook-popup-list-wrapper">
      <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index"
           @click="setFontFamily(item.font)">
        <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
        <div class="ebook-popup-item-check" v-if="isSelected(item)">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { FONT_FAMILY } from '../../utils/book'
import { ebookMixin } from '../../utils/mixin'
import { saveFontFamily } from '../../utils/localStorage'

export default {
  name: "EbookSettingFontPopup",
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods:{
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font
    },
    hide() {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, .1);
  .ebook-popup-title {
    position: relative;
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #b8b9bb;
    text-align: center;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: 15px;
      top: 0;
      height: 100%;
      font-size: 16px;
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: 15px;
      .ebook-popup-item-text {
        flex: 1;
        font-size: 14px;
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        font-size: 14px;
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}
</style>
