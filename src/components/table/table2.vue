<template lang="pug">
.table2
    p table2
    h2 svga演示
    div.placholder
</template>

<script>
import SVGA from "svgaplayerweb";
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted(){
      this.render()
  },
  methods:{
    render() {
      var player = new SVGA.Player(".placholder");
      var parser = new SVGA.Parser(".placholder"); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
      //   parser.load("@/assets/img/byb.svga", videoItem => { // 错误的引入方式，会报错incorrect header check
      //   parser.load("../../assets/img/svga/byb.svga", videoItem => { // 错误的引入方式
      // 使用@ 或者是../的形式都会报错，图片放在static中也是会报错，我的解决办法是放在了public的img文件夹中
      parser.load("svga/long.svga", videoItem => {
        player.setVideoItem(videoItem);
        player.startAnimation();
      });
    }
  }
}
</script>

<style lang="stylus">
.placholder
  width 300px
  height 100px
</style>
