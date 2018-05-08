<template>
  <div class="contact-us-warp">
    <div class="nav-url">
      <!-- <span>位置：</span>
      <span>数据中心</span> 
      <span>></span>
      <span>联系我们</span> -->
    </div>
    <div class="cont">
      <div class="cu-left">
        <div class="l-top"><span>联系我们</span><span class="fa fa-plus add"></span></div>
        <ul class="l-cont">
          <li v-for="item in contactUsData" :key="item.id">
            <span v-on:click="onclick(item.id,'search')" class="l-span" v-bind:title="item.title">{{item.title}}</span>
            <span v-show="item.show" class="fa fa-eye fa-fw show" :class="'show_'+item.id" title="前台隐藏" v-on:click="onclick(item.id,'show')"></span>
            <span v-show="!item.show" class="fa fa-eye-slash fa-fw  hide" :class="'hide_'+item.id" title="前台显示" v-on:click="onclick(item.id,'hide')"></span>
            <span class="fa fa-pencil fa-fw edit" title="编辑" v-on:click="onclick(item.id,'edit')"></span>
            <span class="fa fa-trash-o fa-fw delete" title="删除" v-on:click="onclick(item.id,'delete')"></span>
          </li>
        </ul>
      </div>
      <div class="cu-right">
        <div class="r-nav-url">
          <span style="margin-left:20px">位置：</span>
          <span>数据中心</span> 
          <span>></span>
          <span>联系我们</span>
          <span>></span>
          <span>{{localTitle}}</span>
          <div class="r-nav-btn">
            <a>保存</a>
            <a>返回</a>
            <a>阅览</a>
          </div>
        </div>
        <div class="r-word" v-if="showContType == true">
          {{showCont}}
        </div>
        <div class="r-word" v-if="!showContType">
          <commonKK :kkData="editData"></commonKK>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import {Notification,MessageBox} from 'element-ui'
  import commonKK from '../components/common-kk.vue'
  export default{
    components: {
      commonKK
    },
    data(){
      return {
        username: '',
        contactUsData:[],
        showCont:'',
        localTitle:'',
        showContType:true,
        editData:{},
      }
    },
    methods: {
      async getListData(){
        let r = await axios.get('/contact-us', {})
        if(r.code == 0){
          this.contactUsData = r.data
          this.showCont = r.data[0].content
          this.localTitle = r.data[0].title
        }else{
          Notification.error({
            title: '错误',
            message: '获取《联系我们》菜单失败'
          })
        }
      },
      async onclick(id,type){
        switch(type){
          case 'search':
            var url = '/contact-us/'+ id
            var r = await axios.get(url)
            this.localTitle = r.data.title
            this.showContType = true
            this.showCont = r.data.content
            break
          case 'edit':
            var url = '/contact-us/'+ id
            var r = await axios.get(url)
            this.localTitle = r.data.title
            this.showContType = false
            this.editData = r.data
            break
          case 'delete':
            
            break
          case 'show':
            var r = await axios.post('/contact-us/update',{id:id,show:false})
            if(r && r.code == 0){
              $('.show_'+id).css('display','none')
              $('.hide_'+id).css('display','inline-block')
            }
            break
          case 'hide':
            var r = await axios.post('/contact-us/update',{id:id,show:true})
            if(r && r.code == 0){
              $('.hide_'+id).css('display','none')
              $('.show_'+id).css('display','inline-block')
            }
            break
        }
      }
    },
    async mounted() {
      this.getListData()
    }
  }
</script>
<style scoped lang="less">
 @import "../assets/contact_us.less";
</style>
