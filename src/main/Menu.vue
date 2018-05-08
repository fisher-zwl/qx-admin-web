<template>
  <div class="back-home">
    <div class="nav-header">
        <i class="logo"></i>
        <span class="nav-name">BOBOCAT流量号</span>
        <div class="userInfo">
          <img class="user-logo" src="/static/images/user_logo.png">
          <span class="user-name">{{username}}</span>
        </div>
        <button class="layout" @click="layout"><span>退出</span></button>
    </div>
    <div class="content">
			<!-- <div class="left"> -->
				<el-menu
						router
						:default-active="activeRouter"
						class="left"
						mode="vertical"
						@select="handleSelect"
						background-color="#172850"
						text-color="#fff"
						active-text-color="#ffd04b">
            <el-menu-item index="/">
              <i class="el-icon-home"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
            <el-submenu index="/data-center">
              <template slot="title">
                <i class="el-icon-data"></i>
                <span>数据中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/contact-us">联系我们</el-menu-item>
                <el-menu-item index="/about-us">关于我们</el-menu-item>
                <el-menu-item index="/products">产品中心</el-menu-item>
                <el-menu-item index="/projects">案例展示</el-menu-item>
                <el-menu-item index="/news">新闻中心</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/message-board">
              <i class="el-icon-messageBoard"></i>
              <span slot="title">留言管理</span>
            </el-menu-item>
            <el-submenu index="/station">
              <template slot="title">
                <i class="el-icon-station"></i>
                <span>站点设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/station-admin">管理员</el-menu-item>
                <el-menu-item index="/station-copyright">版权信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item> -->
						<!-- <el-menu-item index="/admin">用户管理</el-menu-item>
						<el-menu-item index="/product">奖品管理</el-menu-item> -->
						<!-- <el-button style="float: right;margin-top: 10px;margin-right: 40px" type="danger" @click="layout">退出登录</el-button> -->
				</el-menu>
			<!-- <div style="height: calc(100vh - 61px);overflow: scroll">
					<router-view/>
			</div> -->
			<!-- </div> -->
			<div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import storage from '../../config/storageConfig.js'
  export default {
    data() {
      return {
        activeRouter: '/',
        activeIndex2: '4',
        username: storage.getItem('userName')
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async layout(){
        let r=await axios.get('/layout')
        if(r.code==0){
          window.location.href='#/login'
        }else {
          this.$message('退出失败');
        }
      }
    },
    async mounted() {
      this.activeRouter=this.$route.path
    }
  }
</script>

<style lang="less">
  .back-home{
    .nav-header{
      height: 60px;
      width: 100%;
      background-color: #4c94dc;
      .logo{
        background: url('/static/images/logo_icon.png') no-repeat;
        width: 40px;
        height: 40px;
        float: left;
        margin-top: 8px;
        margin-left: 20px;
      }
      .nav-name{
        display: inline-block;
        float: left;
        color: #fff;
        font-size: 22px;
        margin-left: 10px;
        margin-top: 15px;
      }
      .userInfo{
        position: absolute;
        right: 110px;
        height: 32px;
        margin-top: 14px;
        .user-name{
          display: inline-block;
          margin-left: 5px;
          margin-top: 7px;
          vertical-align: top;
          font-size: 16px;
          color: #fff;
        }
      }
      .layout{
        position: absolute;
        right: 10px;
        top: 15px;
        width: 80px;
        height: 30px;
        border:none;
        cursor: pointer;
        background:url('/static/images/layout.png') no-repeat;
        span{
          margin-left: 35px;
          // margin-top: 4px;
          display: inline-block;
          color: #fff;
          font-size: 16px;
        }
      }
    }
    .content{
      width: 100%;
      .left{
        width: 200px;
        position: absolute;
        top: 60px;
        bottom: 0px;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        .el-submenu > div{
          text-align: left;
        }
        .el-submenu{
          .el-menu-item-group__title{
            display:none;
          }
          .el-submenu__title{
            .el-icon-data{
              background: url('/static/images/database.png') no-repeat;
              height: 16px;
              width: 16px;
            }
            .el-icon-station{
              background: url('/static/images/station.png') no-repeat;
              height: 16px;
              width: 16px;
            }
            span{
              font-size: 16px;
            }
          }
        } 
        .el-menu-item{
          text-align: left;
          .el-icon-messageBoard{
            background: url('/static/images/email.png') no-repeat;
            height: 16px;
            width: 16px;
          }
          .el-icon-home{
            background: url('/static/images/home.png') no-repeat;
            height: 16px;
            width: 16px;
          }
          span{
            font-size: 16px;
          }
        }
      }
      .right{
        position: absolute;
        left: 202px;
        right: 0;
        min-width: 1120px;
        top: 60px;
        bottom: 0;
        overflow-x: auto;
      }
    }
  }
  
</style>
