<template>
  <div class="station-admin-warp">
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
    <div class="nav-menu">
      <el-row>
        <el-button type="primary" size="small" @click="menuClick('add')">添加</el-button>
        <el-button type="primary" size="small" @click="menuClick('edit')">编辑</el-button>
        <el-button type="primary" size="small" @click="menuClick('delete')">删除</el-button>
      </el-row>
    </div>
    <div class="nav-tab">
      <template>
        <el-table
          :data="tableData"
          border
          height="100%"
          @selection-change="handleSelectionChange"
          style="width: 100%;background-color:#F7F7F7">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="帐户"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            label="角色类型"
            align="center"
            width="180">
            <template slot-scope="scope">
              <span>{{(scope.row.type == -1) ? '超级管理员':'普通管理员'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span style="">{{momentTime(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="联系方式">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="nav-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 15, 20, 25,30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal">
      </el-pagination>
    </div>
    <div class="dialog-addORedit">
      <el-dialog
        :visible.sync="dialog_user"
        width="30%"
        @close="handleDialogClose"
        center>
        <span slot="title" class="dialog-title">{{dialogTitle}} </span>
        <div class="cont-body">
          <el-form :model="formType" class="demo-ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item label="帐户：" prop="username" label-width="85px">
              <el-input v-model="formType.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" label-width="85px">
              <el-input v-model="formType.password" type="password" placeholder="密码默认是111111" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name" label-width="85px">
              <el-input v-model="formType.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" label-width="85px">
              <el-input v-model="formType.phone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onClick('addORedit-cancel')">取 消</el-button>
          <el-button type="primary" @click="onClick('addORedit-save')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import moment from 'moment'
import {Notification,MessageBox} from 'element-ui'
export default {
  data() {
    return {
      num:'',
      size:10,
      page:1,
      tableData:[],
      tableTotal:0,
      multipleSelection:[],//表格选中的值
      dialog_user:false,
      dialogTitle:'添加管理用户',
      editUserId:'',
      formType:{
        name:'',
        username:'',
        password:'',
        phone:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入该用户的姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入帐户', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSearch(){
      let _this = this
      let r = await axios.get('/adminOption',{num:_this.num,size:_this,page:_this.page})
      if(r && r.code == 0){
        _this.tableData = r.data.rows
        _this.tableTotal = r.data.count
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleSizeChange(val){
      this.size = val
      this.onSearch()
    },
    handleCurrentChange(val){
      this.page = val
      this.onSearch()
    },
    handleDialogClose(){//关闭后的回调
      this.formType ={
        name:'',
        username:'',
        password:'',
        phone:'',
      }
      this.editUserId = ''
    },
    indexMethod(index){
      return (this.page-1)*this.size+index+1
    },
    momentTime(time){
      if(time){
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
      }else{
        return '-'
      }
      
    },
    async onClick(type){
      let _this = this
      switch(type){
        case 'addORedit-cancel':
          this.dialog_user = false
          break
        case 'addORedit-save':
           _this.$refs['ruleForm'].validate(async (valid) => {
              if (valid) {
                let params = {
                  name:_this.formType.name,
                  username:_this.formType.username,
                  password:_this.formType.password || '111111',
                  phone:_this.formType.phone,
                }
                if(_this.editUserId){
                  params.editUserId = _this.editUserId
                  console.log(_this.editUserId)
                }
                let r = await axios.post('/adminOption',
                    {name:params.name,username:params.username,password:params.password,phone:params.phone,id:params.editUserId})
                if(r && r.code == 0){
                  Notification.success({
                    title: '成功',
                    message: '添加成功',
                    type:'success'
                  })
                  this.onSearch()
                  this.dialog_user = false
                }
              } else {
                return false;
              }
            });
          break
      }
    },
    async menuClick(type){
      let _this = this
      switch(type){
        case 'add':
          this.dialog_user = true
          this.dialogTitle = '添加管理用户'
          break
        case 'edit':
          if(this.multipleSelection.length > 1){
            Notification.error({
              title: '失败',
              message: '编辑用户不能超过俩个',
              type:'error'
            })
            return
          }
          if(this.multipleSelection.length < 1){
            Notification.error({
              title: '失败',
              message: '编辑用户没有选中',
              type:'error'
            })
            return
          }
          this.dialogTitle = '编辑管理用户'
          this.formType ={
            name: _this.multipleSelection[0].name,
            username:_this.multipleSelection[0].username,
            password:_this.multipleSelection[0].password,
            phone:_this.multipleSelection[0].phone,
          }
          this.editUserId = this.multipleSelection[0].id
          this.dialog_user = true
          break
        case 'delete':

          break
      }
    }
  },
  mounted(){
    this.onSearch()
  }
}
</script>
<style lang="less">
.station-admin-warp{
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
  // .el-input.is-active .el-input__inner, .el-input__inner:focus {
  //   border-color: #F2F2F2;
  //   outline: 0;
  // }
}
</style>
<style scoped lang="less">
 @import "../assets/station.less";
</style>