<template>
<!-- 所有的图片 文字都展示同一个图片和文字 -->
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'deeppink'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed: {
    isActive(){
      // /home -> item(/home) = true
      // 判断当前活跃的路由是否和当前的路由相等
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}


</style>