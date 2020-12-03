<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
      <div class="shelf-footer-tab" :class="{'is-selected': isSelected}">
        <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
        <div class="icon-down tab-icon" v-if="item.index===2"></div>
        <div class="icon-move tab-icon" v-if="item.index===3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index===4"></div>
        <div class="tab-text">{{label(item)}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import { saveBookShelf, removeLocalStorage } from '../../utils/localStorage'
export default {
  name: "ShelfFooter",
  mixins: [storeShelfMixin],
  computed:{
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    tabs() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2
        },
        {
          label: this.$t('shelf.move'),
          index: 3
        },
        {
          label: this.$t('shelf.remove'),
          index: 4
        }
      ]
    },
    isPrivate() {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every(item => item.private)
      }
    },
  },
  data() {
    return {
      popupMenu: null
    }
  },
  methods:{
    onComplete() {
      this.popupMenu.hide()
      this.setIsEditMode(false)
      saveBookShelf(this.shelfList)
    },
    setPrivate() {
      let isPrivate
      if (this.isPrivate) {
        isPrivate = false
      } else {
        isPrivate = true
      }
      this.shelfSelected.forEach(book => {
        book.private = isPrivate
      })
      this.onComplete()
      if (isPrivate) {
        this.simpleToast(this.$t('shelf.setPrivateSuccess'))
      } else {
        this.simpleToast(this.$t('shelf.closePrivateSuccess'))
      }
    },
    showPrivate(){
      this.popupMenu = this.popup({
        title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
        btn: [
          {
            text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
            click: () => {
              this.setPrivate()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.popupMenu.hide()
            }
          }
        ]
      }).show()
    },
    onTabClick(item){
      if (!this.isSelected) {
        return
      }
      switch (item.index) {
        case 1:
          this.showPrivate()
          break
        case 2:
          // this.showDownload()
          break
        case 3:
          // this.dialog().show()
          break
        case 4:
          // this.showRemove()
          break
        default:
          break
      }
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label
        case 2:
        default:
          return item.label
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: 48px;
  background: white;
  box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);
  .shelf-footer-tab-wrapper{
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab{
      width: 100%;
      height: 100%;
      opacity: .5;
      &.is-selected {
        opacity: 1;
      }
      @include columnCenter
      .tab-icon{
        font-size: 20px;
        color: #666;
      }
      .tab-text{
        margin-top: 5px;
        font-size: 12px;
        color: #666;
      }
    }

  }
}
</style>