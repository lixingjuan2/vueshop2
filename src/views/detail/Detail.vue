<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    data(){
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {}
      }
    },
    created(){
      // 1. 保存传入的id
      this.id = this.$route.params.id
      // 2. 根据id请求对应的数据
      getDetail(this.id).then(res=>{
        // 1. 获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2. 获取商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3. 创建爱你店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4. 保存商品的详情数据
        this.detailInfo = data.detailInfo

      })
    }
  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>