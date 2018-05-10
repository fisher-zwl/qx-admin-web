<template>
  <div class="common-kk">
    <div class="kk-title">
      <span>标题：</span>
      <input type="text" v-model="title" v-on:input="setTitle" placeholder="请输入类别标题"/>
    </div>
    <div class="kk-cont">
      <div class="kk-toolbar" id="kkEditor_toolbar"></div>
      <div class="kk-text" id="kkEditor_text"></div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="24%">
      <span>文件内容发生改变未保存，请确认是否保存</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="keepSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import wangeditor from "wangeditor";
import { Notification, MessageBox } from "element-ui";
import $ from "jquery";
export default {
  props: ["kkData"],
  data() {
    return {
      title: "",
      editor: {},
      content: "",
      saveChange: true,
      dialogVisible:false
    };
  },
  methods: {
    setTitle() {
      this.$emit("kkTitle", this.title);
      this.saveChange = false;
    },
    save() {
      let _this = this;
      let params = {
        title: _this.title,
        content: _this.editor.txt.text()
      };
      if (this.kkData.id) params.id = this.kkData.id
      if (!params.title) {
        Notification.error({
          title: "错误",
          message: "请输入标题名称",
          type: "error"
        });
        return;
      }
      this.saveChange = true
      this.$emit("getKKData", params)
    },
    back() {
      // console.log(this.saveChange)
      // console.log("编辑框发生改变")
      let _this = this
      if (!_this.saveChange) {
        this.dialogVisible = true
        return
      }
      this.$emit("getKKBack", true)
    },
    cancelSave(){
      this.dialogVisible = false
    },
    keepSave(){
      this.save()
      this.dialogVisible = false
    }
  },
  watch: {
    kkData: function(value) {
      this.title = this.kkData.title;
      this.content = this.kkData.content;
      this.editor.txt.clear();
      this.editor.txt.html(this.content);
      this.saveChange = true;
      // console.log("第二次content发生变化");
    }
  },
  mounted: function() {
    // console.log("第一次content发生变化");
    this.saveChange = true;
    if (this.kkData) {
      this.title = this.kkData.title;
      this.content = this.kkData.content;
    }
    this.editor = new wangeditor("#kkEditor_toolbar", "#kkEditor_text");
    let _this = this
    this.editor.customConfig.onchange = function() {
      //编辑框发生改变
      _this.saveChange = false
      // console.log("编辑框发生改变")
    }
    this.editor.create();
    this.editor.txt.clear();
    this.editor.txt.html(this.content);
  }
};
</script>
<style lang="less">
.common-kk {
  width: 100%;
  height: 100%;
  position: relative;
  .kk-title {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 40px;
    text-align: left;
    background-color: #efefef;
    span {
      font: 400 16px/40px "微软雅黑";
      margin-left: 20px;
    }
    input {
      width: 400px;
      height: 40px;
      border: none;
      vertical-align: top;
      border-width: 0px;
      background-color: #efefef;
    }
    input:focus {
      outline: none;
    }
  }
  .kk-cont {
    margin: 0 auto;
    position: absolute;
    top: 80px;
    bottom: 110px;
    left: 20px;
    right: 20px;
    z-index: 1;
    .kk-toolbar {
      margin: 0 auto;
      height: 31px;
      background-color: #f2f2f2;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
    .kk-text {
      margin: 0 auto;
      height: 100%;
      padding-top: 32px;
      margin-top: -32px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .w-e-text {
        overflow-y: auto;
      }
    }
  }
  .el-dialog .el-dialog__body{
    padding: 20px;
    font-size: 16px;
  }
}
</style>
