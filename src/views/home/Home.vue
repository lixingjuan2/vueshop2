<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
     <!-- tabcontrol -->
        <tab-control class="tab-control" ref="tabControl1"
          :titles="['流行','新款','精选']" 
          @tabClick="tabClick" v-show="isTabFixed"
        >
        </tab-control>
   <!-- 滚动区域 -->
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true" @pullingUp="loadMore"
           >
      <!-- 轮播 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 推荐 -->
        <recommend-view :recommends="recommends"></recommend-view>
        <!-- 本周流行 -->
        <feature-view></feature-view>
        <!-- tabcontrol -->
        <tab-control ref="tabControl2"
          :titles="['流行','新款','精选']" 
          @tabClick="tabClick">
        </tab-control>
        <!-- 商品列表 -->
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 直接监听组件点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {
  getHomeMultidata, 
  getHomeGoods
} from 'network/home'
import {debounce} from 'common/utils'
  export default {
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop' : {page: 0, list: []},
          'new' : {page: 0, list: []},
          'sell' : {page: 0, list: []}
        }, 
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed(){

    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created(){
      // 1. 请求多个数据
     this.getHomeMultidata()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      // 1. 图片加载完成的时间监听
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImageLoad', ()=>{
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position){
        // 1. 判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000
        // 2. 决定tabControl是否吸顶（position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      swiperImageLoad(){
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        // 每次请求都加1
        const page = this.goods[type].page+1
        getHomeGoods(type, page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      }
    }
  }
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control{
  /*  */
  /* position: sticky;
  top: 44px;
  z-index: 9; */
}

.tab-control{
  position: relative;
  z-index: 9;
}

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}


</style>