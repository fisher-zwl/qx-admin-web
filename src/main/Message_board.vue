<template>
  <div class="message-board-warp">
    <div class="nav-search">
      <el-form size="small" :inline="true" class="p-form-inline">
        <el-form-item label="姓名：">
         <el-input v-model="num" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-tab"></div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default{
    data(){
      return {
        num: ''
      }
    },
    methods: {
      onSearch(){

      }
    }
  }
</script>
<style lang="less">
.message-board-warp{
  .nav-search{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom:0;
      vertical-align: middle;
      line-height: 50px;
      margin-left:20px;
    }
    .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
      line-height:51px;
    }
    .el-form-item .el-form-item__label{
      color: #909399;
    }
  }
  .nav-tab .el-table th,.nav-tab .el-table tr{
    background-color: #F7F7F7;
  }
  .el-table  .el-checkbox__input.is-disabled .el-checkbox__inner{
    background-color: #fff;
  }
}
</style>
<style scoped lang="less">
  .message-board-warp{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    .nav-search{
        position: absolute;
        left: 8px;
        right: 8px;
        top: 8px;
        height: 98px;
        text-align: left;
        border:1px solid #E9E9EB;
        background-color: #F2F2F2;
    }
    .nav-tab{
        position: absolute;
        left: 8px;
        right: 8px;
        top: 98px;
        bottom: 0px;
        padding-bottom: 50px;
    }
    .nav-footer{
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 0px;
        height: 50px;
        text-align: right;
        .el-pagination{
            margin-top: 9px;
        }
    }
  }
</style>
