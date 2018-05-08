<template>
  <div class="common-kk">
    <div class="kk-title">
      <span>标题：</span>
      <input type="text" v-bind:value="kkData.title" placeholder="请输入类别标题"/>
    </div>
    <div class="kk-cont">
      <div class="kk-toolbar" id="kkEditor_toolbar"></div>
      <div class="kk-text" id="kkEditor_text"></div>
    </div>
  </div>
</template>
<script>
  import wangeditor from 'wangeditor'
  import $ from 'jquery'
  export default{
    props:['kkData'],
    mounted:function(){
      let editor = new wangeditor('#kkEditor_toolbar', '#kkEditor_text')
      editor.create()
    }
  }
</script>
<style lang="less" scoped>
.common-kk{
  width: 100%;
  height: 100%;
  position: relative;
  .kk-title{
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 40px;
    text-align: left;
    background-color: #EFEFEF;
    span{
      font: 400 16px/40px "微软雅黑";
      margin-left: 20px;
    }
    input{
      width: 400px;
      height: 40px;
      border: none;
      vertical-align: top;
      border-width: 0px;
      background-color: #EFEFEF;
    }
    input:focus{
      outline: none;
    }
  }
  .kk-cont{
    margin: 0 auto;
    position: absolute;
    top: 80px;
    bottom: 110px;
    left: 20px;
    right: 20px;
    .kk-toolbar{
      margin: 0 auto;
      height: 31px;
      background-color: #f2f2f2;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
    .kk-text{
      margin: 0 auto;
      height: 100%;
      padding-top: 32px;
      margin-top: -32px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .w-e-text{
        overflow-y: auto;
      }
    }
  }
}
</style>
