<template>
  <div class="station-banner-warp">
    <div class="banner">
      <div class="banner-one">轮播图片管理：</div>
      <el-upload
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :on-exceed="handleExceed"
        :limit="limit"
        list-type="picture">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传图片不能少于2张多于8张 目前共有<span style="color: #4C94DC;margin-left: 5px;margin-right: 5px;">{{count}}</span>张</div>
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
      limit:8,
      action:'',
      fileList: [],
      count:0,
    };
  },
  methods: {
    async searchAll(){
      let r = await axios.get('/banner-img/searchAll')
      if(r && r.code == 0){
        this.fileList = r.data
        this.count = this.fileList.length
      }
    },
    async handleRemove(file, fileList) {
      // console.log('************移除图片***********')
      let id = file.id
      let r = await axios.post('/banner-img/delete',{id:id})
      this.count = this.count -1
    },
    handlePreview(file) {
      // console.log('************点击文件列表中已上传的文件时***********')
      // console.log(file);
    },
    handleSuccess(response, file, fileList){
      // console.log('************上传成功时***********')
      // console.log(response, file, fileList)
      Notification.success({
        title: '成功',
        message: '上传图片成功',
        type:'success'
      })
      this.count = this.count + 1
    },
    handleError(err, file, fileList){
      // console.log('************上传失败***********')
      // console.log(err, file, fileList)
      Notification.error({
        title: '失败',
        message: '上传失败,请联系管理员',
        type:'error'
      })
    },
    handleProgress(event, file, fileList){
      // console.log('************文件上传时***********')
      // console.log(event, file, fileList)
    },
    handleExceed(files, fileList){
      console.log('************文件超出个数限制***********')
      console.log(files, fileList)
      Notification.error({
        title: '失败',
        message: '上传失败,所有图片不能超过'+this.limit+'张',
        type:'error'
      })
    }
  },
  mounted(){
    this.action = window.location.origin+'/admin/v1/banner-img/upload'
    this.searchAll()
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
