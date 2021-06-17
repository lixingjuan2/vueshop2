<template>
<!-- 在这里遇到类名冲突问题 封装的时候就已经有 叫swiper的类名了  
是因为 swiper.vue内部使用了 documment.querySelect导致的 -->
     <swiper class="detail-swiper">
        <swiper-item v-for="(item, index) in topImages" :key="index">
           <img :src="item">
        </swiper-item>
     </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}

</style>