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
import { getReadTime, saveReadTime } from '../../utils/localStorage';
import { ebookMixin } from '../../utils/mixin'
export default {
  name: "index",
  mixins: [ebookMixin],
  components: {EbookReader,EbookTitle,EbookMenu},
  mounted() {
    // 开启记录阅读时间的定时任务
    this.startLoopReadTime()
  },
  methods:{
    startLoopReadTime() {
      // 获取阅读时间
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        // 如果阅读时间不存在，则进行重置
        readTime = 0
      }
      // 开启定时任务，每秒更新一次阅读时间，每30秒记录一次阅读时间
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
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