<template>
  <div class="shelf-list" :style="{top:shelfListTop}">
    <transition-group name="list"
                      tag="div"
                      id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item" :style="{height:itemHeight}"></shelf-item>
        <div class="shelf-list-title-warpper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {storeShelfMixin} from "@/utils/mixin";
import ShelfItem from "@/components/shelf/ShelfItem";

export default {
  name: "ShelfList",
  components: {ShelfItem},
  mixins:[storeShelfMixin],
  props:{
    top:{
      type:Number,
      default:94
    },
    data:Array
  },
  computed:{
    shelfListTop(){
      return this.top+'px'
    },
    itemHeight(){
      //w/250 = h/350   h=w*350/250
      return ((window.innerWidth-120)/3)/250*350+'px'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-list{
  font-size: 14px;
  position: absolute;
  left: 0;
  z-index: 104;
  #shelf-list {
    display: flex;
    flex-flow: row wrap;//flex-flow 属性是 flex-direction、flex-wrap的复合属性。flex-direction 属性规定灵活项目的方向。flex-wrap 属性规定灵活项目是否拆行或拆列。
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0 33%;
      width: 33.33%;
      padding: 15px;
      box-sizing: border-box;
      &.list-leave-active {
        display: none;
      }
      &.list-move {
        transition: transform .5s;
      }
      .shelf-list-title-warpper {
        margin-top: 10px;
      }
    }
  }
}
</style>