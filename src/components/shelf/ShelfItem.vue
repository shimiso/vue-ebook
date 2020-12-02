<template>
  <div class="shelf-item" :class="{'shelf-item-shadow': data.type === 1 || data.type === 2}"
        @click="onItemClick">
    <component :is="item" :data="data"
               :class="{'is-edit': isEditMode && data.type === 2}"></component>
    <div class="shelf-item-select-icon icon-selected"
         :class="{'is-selected': data.selected}"
         v-show="isEditMode && data.type === 1"></div>
  </div>
</template>

<script>
import {storeShelfMixin} from "@/utils/mixin";
import ShelfItemBook from "@/components/shelf/ShelfItemBook";
import ShelfItemCategory from "@/components/shelf/ShelfItemCategory";
import ShelfItemAdd from "@/components/shelf/ShelfItemAdd";
import {gotoStoreHome} from "@/utils/store";

export default {
  name: "ShelfItem",
  mixins:[storeShelfMixin],
  props:{
    data:Object
  },
  data(){
    return{
      book:ShelfItemBook,
      category:ShelfItemCategory,
      add:ShelfItemAdd
    }
  },
  computed:{
    item(){
      return this.data.type===1?this.book:(this.data.type===2?this.category:this.add)
    }
  },
  methods:{
    onItemClick(){
      if(this.isEditMode){
        this.data.selected = !this.data.selected
        if(this.data.selected){
          this.shelfSelected.pushWithoutDuplicate(this.data)
        }else {
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      }else{
        if(this.data.type===1){
          this.showBookDetail(this.data)
        } else{
          gotoStoreHome()
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-item{
  position: relative;
  width: 100%;
  height: 100%;
  &.shelf-item-shadow{
    box-shadow: 2px 2px 6px 2px rgba(200,200,200,.3);
    .is-edit{
      opacity: 1;
      &.is-edit{
        opacity: .5;
      }
    }
    .shelf-item-select-icon{
      position: absolute;
      bottom: 2px;
      right: 2px;
      color: rgba(0,0,0,.4);
      &.is-selected{
        color: $color-blue;
      }
    }
  }
}

</style>