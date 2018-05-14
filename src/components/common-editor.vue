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
  props: ["kkData"],
  data() {
    return {
      editor: {},
      content: ""
    };
  },
  methods: {
   
  },
  watch: {

  },
  mounted: function() {
    let _this = this
    _this.editor = new wangeditor("#p_editor_toolbar", "#p_editor_text");
    _this.editor.customConfig.onchange = function() {
      //编辑框发生改变
      // _this.saveChange = false
      // console.log("编辑框发生改变")
       _this.content = _this.editor.txt.text()
      _this.$emit("getEditorData", _this.content);
    }
    this.editor.create();
    // this.editor.txt.clear();
    // this.editor.txt.html(this.content);
  }
};
</script>
<style lang="less">
  .editor-cont{
    .editor-toolbar{
      margin: 0 auto;
      height: 31px;
      background-color: #f2f2f2;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
    .editor-text{
      margin: 0 auto;
      height: calc(~"100% - 33px");
      padding-top: 32px;
      margin-top: -32px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
