<template>
  <div class="common-kk">
    <div class="kk-title">
      <span>标题：</span>
      <input type="text" v-bind:value="kkData.title" placeholder="请输入类别标题"/>
    </div>
    <div class="kk-cont" id="kkEditor"></div>
  </div>
</template>
<script>
  import wangeditor from 'wangeditor'
  import $ from 'jquery'
  export default{
    props:['kkData'],
    mounted:function(){
      let editor = new wangeditor('#kkEditor')
      editor.create()
      $('#kkEditor .w-e-text-container').css('height',($('#kkEditor').height()-31)+'px')
      $(window).resize(function(){//监测浏览器发生大小变化
        $('#kkEditor .w-e-text-container').css('height',($('#kkEditor').height()-31)+'px')
      });
    }
  }
</script>
<style lang="less" scoped>
.common-kk{
  width: 100%;
  height: 100%;
  position: relative;
  .kk-title{
    width: 80%;
    margin: 20px auto;
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
      border-width: 0px;
      background-color: #EFEFEF;
    }
    input:focus{
      outline: none;
    }
  }
  .kk-cont{
    margin: 0 auto;
    padding:0px 20px;
    position: absolute;
    top: 80px;
    bottom: 0;
  }
}
</style>
