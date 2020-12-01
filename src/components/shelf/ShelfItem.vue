<template>
  <div class="shelf-item shelf-item-shadow">
    <component :is="item" :data="data"></component>
  </div>
</template>

<script>
import {storeShelfMixin} from "@/utils/mixin";
import ShelfItemBook from "@/components/shelf/ShelfItemBook";
import ShelfItemCategory from "@/components/shelf/ShelfItemCategory";
import ShelfItemAdd from "@/components/shelf/ShelfItemAdd";

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
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-item{
  width: 100%;
  height: 100%;

}
.shelf-item-shadow{
  box-shadow: 2px 2px 6px 2px rgba(200,200,200,.3);
}
</style>