<template>
  <div class="message-board-warp">
    <div class="nav-search">
      <el-form size="small" :inline="true" class="p-form-inline">
        <el-form-item label="姓名:">
         <el-input v-model="name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址:">
         <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="处理人:">
         <el-input v-model="handler" placeholder="请输入处理人"></el-input>
        </el-form-item>
      </el-form>
      <el-form size="small" :inline="true" class="p-form-inline">
        <el-form-item label="电话:">
         <el-input v-model="phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="时间范围:">
          <el-date-picker
            v-model="timeFrame"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-tab">
      <el-table
        :data="tableData"
        border
        height="100%"
        style="width: 100%;background-color:#F7F7F7">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="mbName"
          label="姓名"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mbPhone"
          label="电话"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mbEmail"
          label="邮箱"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          label="处理操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOption(scope.$index, scope.row)">处理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="处理状态"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span :style="(scope.row.status == 1) ? '':'color:red'">{{(scope.row.status == 0) ? '未处理':'已处理'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mbHandler"
          label="处理人"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mbAddress"
          label="地址"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          label="留言时间"
          align="center"
          width="200">
          <template slot-scope="scope">
            <span style="">{{momentTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="nav-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal">
      </el-pagination>
    </div>
    <div class="handle-dialog">
      <el-dialog
        title="处理详情"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="handle-body">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="姓名">
              <el-input v-model="form.mbName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.mbPhone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮件">
              <el-input v-model="form.mbEmail" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.mbAddress" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="form.mbHandler" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="留言时间">
              <el-input v-model="form.createdAt" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="留言内容">
              <el-input type="textarea" v-model="form.mbWord" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handlecancel">取 消</el-button>
          <el-button v-if="!status" type="primary" @click="handleBtn">处 理</el-button>
          <el-button v-if="status" disabled type="primary" @click="handleBtn">处 理</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import {Notification,MessageBox} from 'element-ui'
  export default{
    data(){
      return {
        name: '',
        email:'',
        handler:'',
        phone:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeFrame:[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
        tableData:[],
        currentPage:1,
        pageSize:10,
        tableTotal:0,
        centerDialogVisible:false,
        form:{
          mbName:'',
          mbPhone:'',
          mbEmail:'',
          mbAddress:'',
          createdAt:'',
          mbHandler:'',
          mbWord:''
        },
        status:false,
        handleId:'',
      }
    },
    methods: {
      async onSearch(){
        let startTime = this.momentTime(this.timeFrame[0]),
            endTime = this.momentTime(this.timeFrame[1])
        let params = {}
        if(this.name){
          params = Object.assign(params,{mbName:this.name})
        }
        if(this.email){
          params = Object.assign(params,{mbEmail:this.email})
        }
        if(this.handler){
          params = Object.assign(params,{mbHandler:this.handler})
        }
        if(this.phone){
          params = Object.assign(params,{mbPhone:this.phone})
        }
        if(startTime && endTime){
          params = Object.assign(params,{startTime:startTime,endTime:endTime})
        }
        let r = await axios.get('/message-board',{params})
        if(r && r.code == 0){
          this.tableData = r.data.rows
          this.tableTotal = r.data.count
        }
      },
      momentTime(time){
        if(time){
          return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
        }else{
          return '-'
        }
        
      },
      indexMethod(index){
        return (this.currentPage-1)*this.pageSize+index+1
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.onSearch()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        this.onSearch()
      },
      handleOption(index,row){
        this.centerDialogVisible = true
        this.form = {
          mbName:row.mbName,
          mbPhone:row.mbPhone,
          mbEmail:row.mbEmail,
          mbAddress:row.mbAddress,
          createdAt:this.momentTime(row.createdAt),
          mbHandler:row.mbHandler,
          mbWord:row.mbWord
        }
        this.handleId = row.id
        if(row.status == 1){
          this.status = true
        }else{
          this.status = false
        }
      },
      handlecancel(){
        this.centerDialogVisible = false
      },
      async handleBtn(){
        let r = await axios.post('/message-board',{id:this.handleId,status:1})
        if(r && r.code == 0){
          Notification.success({
            title: '成功',
            message: '提交处理情况成功',
            type:'success'
          })
          this.centerDialogVisible = false
          this.onSearch()
        }else{
          Notification.error({
            title: '失败',
            message: '提交处理情况失败',
            type:'error'
          })
          return
        }
      }
    },
    mounted(){
      this.onSearch()
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
  @import "../assets/message_board.less";
</style>
