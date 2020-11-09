<template>
  <div class="ebook-reader">
    <div id="read"> </div>
  </div>
</template>

<script>
import  Epub from 'epubjs'
import {mapGetters} from 'vuex'
global.ePub = Epub
export default {
  name: "EbookReader",
  computed:{
    ...mapGetters(['fileName'])
  },
  methods:{
    prevPage(){
      if(this.rendition){
        this.rendition.prev();
      }
    },
    nextPage(){
      if(this.rendition){
        this.rendition.next();
      }
    },
    toggleTitileAndMenu(){},
    initEpub(){
      const url = '/bookApi/'+this.fileName+'.epub'
      console.log(url)
      this.book = new Epub(url);
      console.log(this.book)
      this.rendition =this.book.renderTo('read',{
        width:window.innerWidth,
        height:window.innerHeight
      })
      this.rendition.display()
      this.rendition.on('touchstart',event=>{
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend',event=>{
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if(time<500&&offsetX>40){
          this.prevPage();
        }else if(time<500&&offsetX< -40){
          this.nextPage();
        }else{
          this.toggleTitileAndMenu();
        }
        event.preventDefault();
        event.stopPropagation();
      })

    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName',fileName).then(()=>{
      this.initEpub();
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
