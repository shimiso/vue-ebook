<template>
  <div class="store-shelf">
      <shelf-title :title="$t('shelf.title')"></shelf-title>
      <scroll class="store-shelf-scroll-wrapper" :top="0"  @onScroll="onScroll" :bottom="scrollBottom" ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from "@/components/shelf/ShelfTitle";
import Scroll from "@/components/common/Scroll";
import ShelfSearch from "@/components/shelf/ShelfSearch";
import { storeShelfMixin } from '../../utils/mixin'
import ShelfList from "@/components/shelf/ShelfList";
import ShelfFooter from "@/components/shelf/ShelfFooter";

export default {
  name: "StoreShelf",
  mixins: [storeShelfMixin],
  components:{ShelfFooter, ShelfList, ShelfSearch, Scroll, ShelfTitle},
  data(){
    return{
      scrollBottom:0
    }
  },
  watch:{
    // 监听编辑模式，编辑模式下滚动条距底部需要产生48像素的距离
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode?48:0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  methods:{
    onScroll(offsetY){
      this.setOffsetY(offsetY)
    },
  },
  mounted() {
    this.getShelfList()
    this.setShelfCategory([])//书架列表设置为空
    this.setCurrentType(1)//当前为书架列表
  }
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