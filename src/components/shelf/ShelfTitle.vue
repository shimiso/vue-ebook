<template>
  <div class="shelf-title">
    <div class="shelf-title-text-wrapper">
      <span class="shelf-title-text">{{$t('shelf.title')}}</span>
      <span class="shelf-title-sub-text">{{selectedText}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "ShelfTitle",
  computed:{
    selectedText(){
      return this.$t('shelf.selectBook')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
</style>