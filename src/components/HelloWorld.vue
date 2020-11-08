<template>
  <div class="hello">
    <div id="read"></div>
    <span class="icon iconfont iconadd"></span>
    <span class="icon iconfont iconbookmark"></span>
    <span class="text">ABCDEFG</span>
  </div>
</template>

<script>
import '../assets/styles/iconfont.css'
import '../assets/styles/fonts/daysOne.css'
import  Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    /*this.book = new Epub('./GlobalBusinessStrategy.epub');
    console.log(this.book)
    this.rendition =this.book.renderTo('read',{
      width:window.innerWidth*0.4,
      height:window.innerHeight*0.4
    })
    this.rendition.display()*/
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
