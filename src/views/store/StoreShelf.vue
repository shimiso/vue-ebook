<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" :top="0">
      <shelf-search></shelf-search>
    </scroll>
  </div>
</template>

<script>
import ShelfTitle from "@/components/shelf/ShelfTitle";
import Scroll from "@/components/common/Scroll";
import ShelfSearch from "@/components/shelf/ShelfSearch";
export default {
  name: "StoreShelf",
  components:{ShelfSearch, Scroll, ShelfTitle}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-shelf{
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  .store-shelf-scroll-wrapper{
    position: absolute;
    top:0;
    left: 0;
    z-index: 101;
  }
}
</style>