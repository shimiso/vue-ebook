<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <Scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </Scroll>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import SearchBar from "@/components/home/SearchBar";
import Scroll from "@/components/common/Scroll";
import FlapCard from "@/components/home/FlapCard";
import {home} from "@/api/store";
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook'
import Category from '../../components/home/Category'

export default {
name: "StoreHome",
  components: {SearchBar,Scroll,FlapCard,GuessYouLike,Recommend,Featured,CategoryBook,Category},
  mixins:[storeHomeMixin],
  comments:{
    SearchBar
  },
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods:{
    onScroll(offsetY){
      this.setOffsetY(offsetY)
      if(offsetY>0){
        this.scrollTop = 52;
      }else{
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    }
  },
  mounted() {
    home().then(response=>{
      if(response&&response.status===200){
        const data = response.data
        const randomIndex = Math.floor(Math.random() * data.random.length)//向下取整
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }

    })

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-home{
  width: 100%;
  height: 100%;
  background: white;
  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .recommend {
    margin-top: 20px;
  }
  .featured {
    margin-top: 20px;
  }
  .category-list-wrapper {
    margin-top: px2rem(20);
  }
  .categories {
    margin-top: px2rem(20);
  }
}
</style>