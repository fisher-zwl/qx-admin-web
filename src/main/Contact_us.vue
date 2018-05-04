<template>
  <div class="contact-us-warp">
    <div class="nav-url">
      <span>位置：</span>
      <span>数据中心</span> 
      <span>></span>
      <span>联系我们</span>
    </div>
    <div class="cont">
      <div class="cu-left">dsdsds</div>
      <div class="cu-right">dddddd</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default{
    data(){
      return {
        username: ''
      }
    },
    methods: {
      
    }
  }
</script>
<style scoped lang="less">
 .contact-us-warp{
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  .nav-url{
    height: 30px;
    width: 100%;
    text-align: left;
    padding-left: 15px;
    background-color: #f2f2f2;
    span{
      display: inline-block;
      vertical-align: middle;
      line-height: 30px;
      font: 400 14px/30px "微软雅黑";
      color: #666;
    }
  }
  .cont{
    width: 100%;
    height: calc(100vh - 30px);
    position: relative;
    .cu-left{
      position: absolute;
      left: 0;
      width:150px;
    }
    .cu-right{
      position: absolute;
      left: 150px;
      right: 0;
    }
  }
 }
</style>
