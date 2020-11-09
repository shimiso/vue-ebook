<template>
  <div class="ebook">
    <!-- 阅读器标题组件 -->
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <!-- 阅读器菜单组件 -->
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from "@/components/ebook/EbookReader";
import EbookTitle from "@/components/ebook/EbookTitle";
import EbookMenu from "@/components/ebook/EbookMenu";
export default {
  name: "index",
  components: {EbookReader,EbookTitle,EbookMenu},
  mounted() {
  }
}
</script>

<style lang="scss"  scoped>
@import "../../assets/styles/global";

.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>