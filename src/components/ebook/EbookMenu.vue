<template>
  <div>
    <transition enter-active-class="animate__animated animate__slideInUp animate__faster"
    leave-active-class="animate__animated animate__slideOutDown animate__faster">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu"  @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress"  @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright"  @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A"  @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSettingFont from "@/components/ebook/EbookSettingFont";
import EbookSettingFontPopup from "@/components/ebook/EbookSettingFontPopup";
import EbookSettingTheme from "@/components/ebook/EbookSettingTheme";
import EbookSettingProgress from "@/components/ebook/EbookSettingProgress";
import EbookSlide from "@/components/ebook/EbookSlide";
  export default {
    mixins: [ebookMixin],
    components: { EbookSettingFont,EbookSettingFontPopup,EbookSettingTheme,EbookSettingProgress,EbookSlide },
    methods: {
      showSetting(key) {
        this.setSettingVisible(key)
      }
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
    height: 48px;
    background: white;
    box-shadow: 0 -8px 8px rgba(0, 0, 0, .15);
    font-size: 20px;
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      //@include center;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-progress {
        font-size: 24px;
      }
      .icon-bright {
        font-size: 22px;
      }
    }
  }
</style>
