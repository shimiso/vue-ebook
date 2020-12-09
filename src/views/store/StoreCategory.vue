<template>
  <div class="store-shelf">
      <shelf-title :title="shelfCategory.title" :if-show-back="true"></shelf-title>
      <scroll class="store-shelf-scroll-wrapper" :top="0"  @onScroll="onScroll" :bottom="scrollBottom" ref="scroll" v-if="ifShowList">
        <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
      </scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from "@/components/shelf/ShelfTitle";
import Scroll from "@/components/common/Scroll";
import { storeShelfMixin } from '../../utils/mixin'
import ShelfList from "@/components/shelf/ShelfList";
import ShelfFooter from "@/components/shelf/ShelfFooter";

export default {
  name: "StoreShelf",
  mixins: [storeShelfMixin],
  components:{ShelfFooter, ShelfList, Scroll, ShelfTitle},
  data(){
    return{
      scrollBottom:0
    }
  },
  computed:{
    ifShowList(){
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length>0
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
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)//当前为分类列表
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
  .store-shelf-empty-view{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #666;
    @include center
  }
}
</style>