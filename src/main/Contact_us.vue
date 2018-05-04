<template>
  <div class="contact-us-warp">
    <div class="nav-url">
      <span>位置：</span>
      <span>数据中心</span> 
      <span>></span>
      <span>联系我们</span>
    </div>
    <div class="cont">
      <div class="cu-left">
        <div class="l-top">联系我们</div>
        <div class="l-cont">22222222</div>
      </div>
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
      left: 20px;
      width:200px;
      top: 0;
      bottom: 70px;
      border-top: 1px solid #e9e9e9;
      border-left: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
      background-color: #ffffff;
      .l-top{
        height: 40px;
        width: 100%;
        vertical-align: middle;
        line-height: 40px;
        border-bottom: 2px solid #f2f2f2;
        background-color: #f2f2f2;
      }
      .l-cont{
        width: 100%;
        margin-bottom: 60px;
      }
    }
    .cu-right{
      position: absolute;
      left: 220px;
      right: 20px;
      top: 0px;
      bottom: 70px;
      border: 1px solid #e9e9e9;
      background-color: #ffffff;
    }
  }
 }
</style>
