<template>
  <div class="projects-warp">
    <div class="p-warp">
      <div class="nav-search">
        <el-form size="small" :inline="true" :model="projects" class="p-form-inline">
          <el-form-item label="案例种类">
            <el-select clearable  v-model="projects.type" @clear="clear('type')" placeholder="全部种类">
              <el-option  
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select clearable  v-model="projects.status" @clear="clear('status')" placeholder="所有状态">
              <el-option label="已经发布" value="1"></el-option>
              <el-option label="暂未发布" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="nav-menu">
        <el-row>
          <el-button type="primary" size="small">添加种类</el-button>
          <el-button type="primary" size="small">删除种类</el-button>
          <el-button type="primary" size="small">添加案例</el-button>
          <el-button type="primary" size="small">批量删除</el-button>
          <el-button type="primary" size="small">危险按钮</el-button>
        </el-row>
      </div>
      <div class="nav-tab">
        <template>
          <el-table
            :data="tableData"
            border
            height="100%"
            style="width: 100%;height:100%">
            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              prop="date"
              label="案例种类"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              label="案例操作"
              align="center"
              width="250">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDelete(scope.$index, scope.row)">发布</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布状态"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布时间"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="案例标题">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="nav-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {Notification,MessageBox} from 'element-ui'
  export default{
    data(){
      return {
        username: '',
        projects:{
          type:'',
          status:''
        },
        options:[],
        currentPage4: 4,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      clear(val){//input表单清空
        switch(val){
          case 'type':
            break
          case 'status':
            this.projects.status = ''
            break
        }
      },
      onSearch(){

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="less">
  .projects-warp{
    .nav-search .el-form-item .el-form-item__label{
      color: #909399;
    }
    .nav-tab .el-table th,.nav-tab .el-table tr{
      background-color: #F7F7F7;
    }
    .nav-footer .el-pagination button,.nav-footer  .el-pagination span,.nav-footer .el-pager li{
      font-size: 14px;
    }
  }
</style>
<style scoped lang="less">
 @import "../assets/projects.less";
</style>
