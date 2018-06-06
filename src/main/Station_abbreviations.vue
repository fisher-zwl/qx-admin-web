<template>
  <div class="station-abbreviations-warp">
    <el-tabs type="border-card">
        <el-tab-pane label="产品中心">
            <div class="cp">
                <el-upload
                    class="avatar-uploader cp-image"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form :inline="true" class="cp-name">
                    <el-form-item label="产品名称">
                        <el-input v-model="name" placeholder="请输入产品名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="cp-description">
                    <el-form-item label="产品描述">
                        <el-input v-model="description" placeholder="请输入产品描述"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="cp-relPro" >
                    <el-form-item label="关联产品" >
                        <el-select v-model="relPro" @change="handleChange" placeholder="请选择关联产品">
                            <el-option
                                v-for="item in relPro_options"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <span class="cp-cont-com">效果预览:</span>
                <ul class="yltp">
                    <li  v-for="item in suolueData" :key="item.id">
                        <img src="item.url"/>
                        <div>
                            <label>{{item.name}}</label>
                            <span>{{item.description}}</span>
                        </div>
                    </li>
                </ul>
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
        imageUrl: '',
        relPro:'',
        relPro_options:[],
        suolueData:[],
        action:'',
        url:'',
        description:'',
        name:'',
        id:0,
    };
  },
  methods: {
      async getProList(){
            let r = await axios.get('/products', {})
            if(r && r.code == 0){
                this.relPro_options = r.data
            }else{
                Notification.error({
                    title: '错误',
                    message: '获取《联系我们》菜单失败',
                    type:'error'
                })
            }
      },
      handleAvatarSuccess(res, file) {
          this.url = res.data[0]
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
      },
      handleChange(val){
         this.relPro = val
      },
      async onSubmit(){
          let _this = this
          let params = {
              url:_this.url,
              name:_this.name,
              description:_this.description,
              infoId:_this.relPro
          }
          if(params.url){
               Notification.error({
                    title: '错误',
                    message: '请选择图片',
                    type:'error'
                })
                return false
          }
          if(params.name){
               Notification.error({
                    title: '错误',
                    message: '请输入产品名称',
                    type:'error'
                })
                return false
          }
          if(params.description){
               Notification.error({
                    title: '错误',
                    message: '请输入产品描述',
                    type:'error'
                })
                return false
          }
          if(_this.id){
              params.id = _this.id
              let r = await axios.post('/products/update-ar',{url:params.url,name:params.url,description:params.description,id:params.id})
          }else{
              let r = await axios.post('/products/update-ar',{url:params.url,name:params.url,description:params.description})
          }
      }
  },
  mounted(){
    this.action = window.location.origin+'/admin/v1/products/upload-ar'
    this.getProList()
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
        .cp .el-form-item .el-form-item__content{
            width: 300px;
        }
        .cp .cp-relPro .el-form-item .el-form-item__content{
            width: 300px;
            text-align: left;
            .el-select{
                width: 100%;
            }
        }

        .cp{
            position: relative;
            .cp-image{
                width: 400px;
                margin-bottom: 15px;
            }
            .cp-name{
                width: 400px;
            }
            .cp-description{
                width: 400px;
            }
            .cp-relPro{
                 width: 400px;
            }
            .el-button{
                position: absolute;
                left: 400px;
                top: 323px;
            }
            .cp-cont-com{
                display: inline-block;
                width: 100%;
                text-align: left;
                margin-left: 10px;
            }
            .yltp{
                width: 100%;
                border: 1px solid #f2f2f2;
            }
        }
    }
</style>
