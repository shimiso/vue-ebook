<template>
  <div class="hello">
    <div id="read"></div>
    <span class="icon-add"></span>
    <span class="icon-bookmark"></span>
    <span class="text">ABCDEFG</span>
  </div>
</template>

<script>
import '../assets/styles/fonts/daysOne.css'
import  Epub from 'epubjs'
global.ePub = Epub

import {mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed:{
    ...mapGetters(['fileName'])
  },
  mounted() {
    this.book = new Epub('../GlobalBusinessStrategy.epub');
    console.log(this.book)
    this.rendition =this.book.renderTo('read',{
      width:window.innerWidth*0.4,
      height:window.innerHeight*0.4
    })
    this.rendition.display()
    /*this.$store.dispatch('SET_FILENAME',10).then(()=>{
      // console.log( this.$store.state.book.fileName)
      console.log( this.test)
    });*/
  }
}
/*document.addEventListener('DOMContentLoaded',()=>{
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/styles/global";
.iconbookmark{
  font-size: px2rem(90);
  color: red;
}
.text{
  font-family: "Days One";
  font-size: px2rem(50);
  color: orange;
}

</style>
