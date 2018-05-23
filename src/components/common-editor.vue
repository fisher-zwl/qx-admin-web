<template>
  <div class="editor-cont">
    <div class="editor-toolbar" id="p_editor_toolbar"></div>
    <div class="editor-text" id="p_editor_text"></div>
  </div>
</template>
<script>
import wangeditor from "wangeditor";
import { Notification, MessageBox } from "element-ui";
import $ from "jquery";
export default {
  props: ["editorContent","editorTarget"],
  data() {
    return {
      editor: {},
      content:''
    };
  },
  methods: {
   
  },
  watch: {
    editorContent: function(value) {
      this.content = this.editorContent
      this.editor.txt.clear();
      this.editor.txt.html(this.content);
    }
  },
  mounted: function() {
    let _this = this
    let target = ''
    if(_this.editorTarget) target = _this.editorTarget
    _this.editor = new wangeditor("#p_editor_toolbar", "#p_editor_text");
    _this.editor.customConfig.uploadImgServer = '/admin/v1/'+target+'/upload'
    _this.editor.customConfig.uploadFileName = 'file'
    _this.editor.customConfig.onchange = function() {
       _this.content = _this.editor.txt.html()
      _this.$emit("getEditorData", _this.content)
    }
    this.editor.create()
    this.editor.txt.clear()
    this.editor.txt.html(this.editorContent)
  }
};
</script>
<style lang="less">
  .editor-cont{
    .editor-toolbar{
      margin: 0 auto;
      height: 31px;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      // border-top: 1px solid #ccc;
    }
    .editor-text{
      margin: 0 auto;
      height: calc(~"100% - 33px");
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
