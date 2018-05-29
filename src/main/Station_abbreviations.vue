<template>
  <div class="station-abbreviations-warp">
    <el-tabs type="border-card">
        <el-tab-pane label="产品中心">
            <div class="cp">
                <el-upload
                    class="avatar-uploader cp-image"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form :inline="true" class="cp-name">
                    <el-form-item label="产品名称">
                        <el-input  placeholder="请输入产品名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="cp-description">
                    <el-form-item label="产品描述">
                        <el-input  placeholder="请输入产品描述"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="案例展示">案例展示</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import {Notification,MessageBox} from 'element-ui'
export default {
  data() {
    return {
        imageUrl: ''
    };
  },
  methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  mounted(){
  }
}
</script>
<style  lang="less">
    .station-abbreviations-warp{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .cp{
            .cp-image{
                width: 400px;
            }
            .cp-name{
                width: 400px;
            }
            .cp-description{
                width: 400px;
            }
        }
    }
</style>
