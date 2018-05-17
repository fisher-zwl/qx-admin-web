<template>
  <div class="station-banner-warp">
    <div class="banner">
      <div class="banner-one">轮播图片管理：</div>
      <el-upload
        class="upload-demo"
        action="http://localhost:8089/admin/v1/banner-img/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div></div>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import {Notification,MessageBox} from 'element-ui'
export default {
  data() {
    return {
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>
<style  lang="less">
  .station-banner-warp{
    height:100%;
    padding:15px 20px 10px 20px;
    min-width:1200px;
    overflow:auto;
    .banner{
      width:100%;
      height:100%;
      position:relative;
      background-color:#fff;
      .banner-one{
        text-align:left;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        width: 151px;
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
      }
      .upload-demo{
        text-align:left;
        .el-upload{
          margin-left: 137px;
          margin-top: 4px;
        }
        .el-upload__tip{
          display: inline-block;
          margin-left: 10px;
        }
        .el-upload-list--picture .el-upload-list__item{
          padding: 10px 30px 10px 20px;
          height: 200px;
        }
        .el-upload-list--picture .el-upload-list__item-thumbnail{
          margin: 0 auto !important;
          height:100%;
          width:100%;
        }
        .el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{
          display:none;
        }
      }
    }
  }
</style>
