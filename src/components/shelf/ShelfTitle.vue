<template>
  <transition enter-active-class="animate__animated animate__slideInDown animate__faster"
              leave-active-class="animate__animated animate__slideOutUp animate__faster">
  <div class="shelf-title" v-show="shelfTitleVisible">
    <div class="shelf-title-text-wrapper">
      <span class="shelf-title-text">{{$t('shelf.title')}}</span>
      <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
      <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
        <span class="shelf-title-btn-text"
              @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
    </div>
  </div>
  </transition>
</template>

<script>
import {storeShelfMixin} from "@/utils/mixin";

export default {
name: "ShelfTitle",
  mixins:[storeShelfMixin],
  data(){
    return{
      showClear:true,
      showEdit:true
    }
  },
  computed:{
    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
    },
  },
  methods:{
    clearCache(){

    },
    onEditClick(){
      this.setIsEditMode(!this.isEditMode)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-title{
  position: relative;
  width: 100%;
  height: 42px;
  background: white;
  z-index: 103;
  .shelf-title-text-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    @include columnCenter
    .shelf-title-text{
      font-size: 16px;
      line-height: 20px;
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text{
      font-size: 10px;
      color: #333;
    }
  }
  .shelf-title-btn-wrapper{
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include center
    .shelf-title-btn-text{
      font-size: 14px;
      color: #666;
    }
    &.shelf-title-left{
      left: 0;
      padding-left: 15px;
    }
    &.shelf-title-right{
      right: 0;
      padding-right: 15px;
    }
  }
}
</style>