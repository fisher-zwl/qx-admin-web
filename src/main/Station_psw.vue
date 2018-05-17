<template>
  <div class="station-psw-warp">
    <div class="psw-change">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧的密码" prop="oldPsw">
                <el-input type="password" v-model="ruleForm2.oldPsw" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import {Notification,MessageBox} from 'element-ui'
export default {
  data() {
    var checkOldPsw = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('旧的密码不能为空'));
        }else{
            let r = await axios.post('/adminOption/changePsw',
                {oldPsw:value})
            if(r && r.code == 0){
               callback();
            }else{
               callback(new Error('旧的密码错误'));
            }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPsw: ''
        },
        rules2: {
            oldPsw: [
                { validator: checkOldPsw, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ]
        }
      };
  },
  methods: {
    submitForm(formName) {
        let _this = this
        _this.$refs[formName].validate(async (valid) => {
          if (valid) {
              console.log(_this.oldPsw)
            let r = await axios.post('/adminOption/changePsw',
                {oldPsw:_this.ruleForm2.oldPsw,newPsw:_this.ruleForm2.pass})
            if(r && r.code == 0){
                this.$confirm(`修改密码成功，请确认是否重新登录？`)
                    .then( _ => {
                        window.location.href='#/login'
                    })
                    .catch(_ => {});
                return
            }else{
                Notification.error({
                title: '成功',
                message:r.msg,
                type:'error'
                })
                return
            }
          } else {
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped lang="less">
    .station-psw-warp{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .psw-change{
            width: 400px;
            height: 226px;
            position: absolute;
            left: 50%;
            top: 50%;
            padding-top: 25px;
            padding-bottom:25px;
            margin-left: -200px;
            margin-top: -113px;
            padding-right: 30px;
            border: 1px solid #E9E9EB;
            .el-form{
                width: 400px;
                height: 226px;
            }
        }
    }
</style>
