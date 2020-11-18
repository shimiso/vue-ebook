<template>
  <div class="ebook-slide-contents">
    <div class="slide-content-search-input-wrapper">
      <div class="slide-contents-search-icon">
        <span class="icon-search"></span>
      </div>
      <input class="slide-contents-search-input" type="text" :placeholder="$t('book.searchHint')"/>
    </div>
    <div class="slide-contents-search-cancel">取消</div>
  </div>
</template>

<script>
export default {
name: "EbookSlideContents"
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-slide-contents{
    .slide-content-search-input-wrapper{
      .slide-contents-search-icon{

      }
      .slide-contents-search-input{

      }
    }
    .slide-contents-search-cancel{

    }
  }
</style>