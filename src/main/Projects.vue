<template>
  <div class="projects-warp">
    <div class="p-warp">
      <div class="nav-search">
        <el-form size="small" :inline="true" :model="projects" class="p-form-inline">
          <el-form-item label="案例种类">
            <el-select clearable  v-model="projects.type" @clear="clear('type')" placeholder="全部种类">
              <el-option  
                v-for="item in options"
                :key="item.projectsBlockId"
                :label="item.name"
                :value="item.projectsBlockId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select clearable  v-model="projects.status" @clear="clear('status')" placeholder="所有状态">
              <el-option label="已经发布" value="1"></el-option>
              <el-option label="暂未发布" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="nav-menu">
        <el-row>
          <el-button type="primary" size="small" @click="menuClick('addType')">添加种类</el-button>
          <el-button type="primary" size="small" @click="menuClick('deleteType')">删除种类</el-button>
          <el-button type="primary" size="small" @click="menuClick('addExp')">添加案例</el-button>
          <el-button type="primary" size="small" @click="menuClick('batchDelete')">批量删除</el-button>
          <!-- <el-button type="primary" size="small">危险按钮</el-button> -->
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
              prop="projects_block.name"
              label="案例种类"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              label="案例操作"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <!-- <el-button
                  size="mini"
                  type="success"
                  @click="handlePublic(scope.$index, scope.row)">发布</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              label="发布状态"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span :style="(scope.row.status == 1) ? '':'color:red'">{{(scope.row.status == 1) ? '已发布':'未发布'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="发布时间"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span style="">{{momentTime(scope.row.pubTime) }}</span>
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
              prop="title"
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
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 25,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加案例种类"
      :visible.sync="dialog_addType"
      width="30%"
      center>
      <el-form :model="formType" class="demo-ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="种类名称" prop="name" label-width="100px">
          <el-input v-model="formType.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="案例描述:" label-width="100px">
          <el-input v-model="formType.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClick('addType-cancel')">取 消</el-button>
        <el-button type="primary" @click="onClick('addType-save')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="deleteType-dialog">
      <el-dialog
        title="删除案例种类"
        :visible.sync="dialog_deleteType"
        width="20%"
        center>
        <template>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllBlocks" @change="handleCheckAllBlock">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBlocks" @change="handleCheckedBlock">
            <el-checkbox v-for="item in options" :label="item.projectsBlockId" :key="item.projectsBlockId">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onClick('deleteType-cancel')">取 消</el-button>
          <el-button type="primary" @click="onClick('deleteType-save')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="addExp-dialog">
      <template>
        <el-dialog
          :visible.sync="dialog_addExp"
          width="60%"
          :before-close="handleClose"
          @close="handleExpDialogClose"
          fullscreen
          center>
          <span slot="title" class="dialog-title">{{expDialogTitle}} </span>
          <div class="addExp-body">
            <div class="type">
              <div class="type-name">
                <span>案例种类：</span>
                <el-select v-model="expType" @change="handleExpTypeChanged" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.projectsBlockId"
                    :label="item.name"
                    :value="item.projectsBlockId">
                  </el-option>
                </el-select>
              </div>
              <div class="pub-exp">
                <template>
                  <el-radio v-model="pubExpRadio" label="1">发布</el-radio>
                  <el-radio v-model="pubExpRadio" label="2">不发布</el-radio>
                </template>
              </div>
              <el-button type="primary" @click="expSubmit">提交案例</el-button>
            </div>
            <div class="exp-name">
              <span>案例标题：</span>
              <el-input v-model="expTitle" @change="handleExpTitleChanged" placeholder="请输入案例标题"></el-input>
            </div>
            <commonEditor :editorContent="expContent" @getEditorData="getEditorData"></commonEditor>
          </div>
        </el-dialog>
      </template>
    </div>
    <!-- <div class="pubExp-dialog"></div> -->
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  import wangeditor from "wangeditor"
    import commonEditor from '../components/common-editor.vue'
  import {Notification,MessageBox} from 'element-ui'
  export default{
    components: {
      commonEditor
    },
    data(){
      return {
        username: '',
        projects:{
          type:'',
          status:''
        },
        options:[],
        expDialogTitle:'添加案例',//案例dialog的标题名次
        expId:'',//案例编辑对应ID
        expType:'',//案例tan窗种类选中值
        expTitle:'',//案例tan窗案例标题
        expContent:'',//案例tan窗案例编辑框内容
        ExpDialogChange:false,//添加、编辑案例dialog发生改变
        pubExpRadio: '1',//案例是否发布：1代表发布；2代表暂不发布
        currentPage: 1,
        tableData: [],
        tableTotal: 0,//表格查询出来总数
        pageSize: 10,//表格每页10条
        multipleSelection:[],//表格选中值
        dialog_addType:false,
        dialog_deleteType: false,
        dialog_addExp:false,
        formType:{
          name:'',
          description:''
        },
        formLabelWidth: '90px',
        checkAllBlocks:false,//删除种类--全选
        checkedBlocks:[],//删除种类--选中
        isIndeterminate: false,//删除种类--状态
        blocks:[],
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        }
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
      async getType(){
        let r = await axios.get('/projects-block')
        if(r && r.code == 0){
          this.options = r.data
        }
      },
      async onSearch(){
        let _this = this
        let currentPage = parseInt(_this.currentPage) || 1 
        let currentSize = parseInt(_this.pageSize) || 10
        let params = {
          projectsBlockId:_this.projects.type,
          status:_this.projects.status,
          page:currentPage,
          size:currentSize
        }
        let r = await axios.post('/projects-single/search',
          {projectsBlockId:params.projectsBlockId,status:params.status,page:params.page,size:params.size})
        if(r && r.code == 0){
          _this.tableData = r.data.rows
          _this.tableTotal = r.data.count
        }else{
          Notification.error({
            title: '错误',
            message: '查询失败',
            type:'error'
          })
        }
      },
      momentTime(time){
        if(time){
          return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
        }else{
          return '-'
        }
        
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
      handleEdit(index, row) {//表格中内容编辑
        // console.log(index, row)
        this.expDialogTitle = '编辑案例'
        this.pubExpRadio = row.status.toString()
        this.expId = row.projectsSingleId
        this.expType = row.projectsBlockId
        this.expTitle = row.title
        this.expContent = row.content
        this.dialog_addExp = true
      },
      handleDelete(index, row) {//表格中内容删除
        let _this = this
        this.$confirm('确认删除该条案例信息？')
          .then(async _ => {
            let r = await axios.post('/projects-single/delete',{id:row.projectsSingleId})
            if(r && r.code == 0){
              _this.onSearch()
            }
          })
          .catch(_ => {});
      },
      handlePublic(index, row){//表格中信息发布
        let _this = this
        
      },
      handleClose(done){//添加、编辑案例的谈窗关闭按钮X
        if(this.ExpDialogChange){
          this.$confirm('页面内容已发送改变未保存，确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }else{
          done()
        }
      },
      handleExpTypeChanged(expType){//添加、编辑案例的种类选中值发生改变
        this.ExpDialogChange = true
        // console.log(expType)
      },
      handleExpTitleChanged(expTitle){//添加、编辑案例标题值发生改变
        this.ExpDialogChange = true
        // console.log(expTitle)
      },
      handleExpDialogClose(){//案例dialog关闭的回调
      },
      handleSelectionChange(val){//表格选中的值返回
        this.multipleSelection = val
      },
      menuClick(type){
        switch(type){
          case 'addType'://添加种类
            this.dialog_addType = true
            break
          case 'deleteType'://删除种类
            this.dialog_deleteType = true
            break
          case 'addExp'://添加案例
            this.expDialogTitle = '添加案例'
            this.pubExpRadio = '1'
            this.expId = ''
            this.expType = ''
            this.expTitle = ''
            this.expContent = ''
            this.dialog_addExp = true
            break
          case 'batchDelete'://批量删除
            let _this = this
            let deleteData = []
            _this.multipleSelection.forEach(item =>{
              deleteData.push(item.projectsSingleId)
            })
            this.$confirm('确认删除该条案例信息？')
              .then(async _ => {
                let r = await axios.post('/projects-single/delete',{id:deleteData})
                if(r && r.code == 0){
                  _this.onSearch()
                }
              })
              .catch(_ => {});
            break
        }
      },
      async onClick(type){
        switch(type){
          case 'addType-cancel'://添加种类--弹窗取消
            this.dialog_addType = false
            break
          case 'addType-save'://添加种类--弹窗保存
            let _this = this;
            _this.$refs['ruleForm'].validate(async (valid) => {
              if (valid) {
                 let r = await axios.post('/projects-block/create',{name:_this.formType.name,description:_this.formType.description})
                if(r && r.code == 0){
                  Notification.success({
                    title: '成功',
                    message: '添加案例种类成功',
                    type:'success'
                  })
                  this.getType()
                }
                _this.dialog_addType = false
                _this.formType.name = ''
                _this.formType.description = ''
              } else {
                return false;
              }
            });
            break
          case 'deleteType-cancel'://删除种类--弹窗取消
            this.dialog_deleteType = false
            this.checkedBlocks = []
            break
          case 'deleteType-save'://删除种类--弹窗保存/projects-block/
            let  r = await axios.post('/projects-block/delete',{id:this.checkedBlocks})
            if(r && r.code == 0){
              Notification.success({
                title: '成功',
                message: '删除'+r.data+'案例种类成功',
                type:'success'
              })
              this.getType()
              this.dialog_deleteType = false
              this.onSearch()
            }
            break
        }
      },
      handleCheckAllBlock(val){//
        if(val){
          let arr = []
          this.options.forEach(item =>{
            arr.push(item.projectsBlockId)
          })
          this.checkedBlocks = arr
        }else{
          this.checkedBlocks = []
        }
        this.isIndeterminate = false
      },
      handleCheckedBlock(val){
        let checkedCount = val.length
        this.checkAllBlocks = checkedCount === this.options.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
      },
      indexMethod(index){
        return (this.currentPage-1)*this.pageSize+index+1
      },
      getEditorData(val){//编辑框返回值
        this.expContent = val
        this.ExpDialogChange = true
        // console.log(val)
      },
      async expSubmit(){//案例提交
        let _this = this
        if(!_this.expType){
          Notification.error({
            title: '错误',
            message: '案例种类不能为空',
            type:'error'
          })
          return
        }
        if(!_this.expTitle){
          Notification.error({
            title: '错误',
            message: '案例标题不能为空',
            type:'error'
          })
          return
        }
        let params = {
          id:_this.expId,
          blockId: _this.expType,
          title: _this.expTitle,
          content: _this.expContent,
          status: parseInt(_this.pubExpRadio)
        }
        let  r = await axios.post('/projects-single/create',
          { id:params.id,projectsBlockId:params.blockId,title:params.title,content:params.content,status:params.status})
        if(r && r.code == 0){
          let nfTitle = this.expId ? '编辑案例信息成功':'创建案例信息成功'
          Notification.success({
            title: '成功',
            message: nfTitle,
            type:'success'
          })
          this.onSearch()
          this.ExpDialogChange = false
          this.dialog_addExp = false
        }else{
          let nfTitle = this.expId ? '编辑案例信息失败':'创建案例信息失败'
          Notification.error({
            title: '失败',
            message: nfTitle,
            type:'error'
          })
          return
        }
      }
    },
    // watch:{
    //   options:{
    //     handler:function(val,oldval){  
    //       this.blocks = val.map(item =>Object.assign({id: item.projectsBlockId, name: item.name}))
    //     },
    //     deep:true//对象内部的属性监听，也叫深度监听
    //   }
    // },
    mounted() {
      this.getType()
      this.onSearch()
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
    .nav-footer .el-pagination .el-select .el-input{
      width: 110px !important;
    }
    .deleteType-dialog{
      .el-checkbox{
        width: 100%;
      }
      .el-checkbox+.el-checkbox{
        margin-left: 0px;
      }
    }
    .addExp-dialog .el-dialog__wrapper{
      top: 10px;
      bottom: 10px;
      .addExp-body{
        top: 54px;
        bottom: 10px;
        left: 25px;
        right: 25px;
        .pub-exp .el-radio+.el-radio {
            margin-left: 15px;
        }
      }
      .el-dialog--center .el-dialog__body{
        height: calc(~"100% - 110px");
      }
    }
    .el-table  .el-checkbox__input.is-disabled .el-checkbox__inner{
      background-color: #fff;
    }
  }
</style>
<style scoped lang="less">
 @import "../assets/projects.less";
</style>
