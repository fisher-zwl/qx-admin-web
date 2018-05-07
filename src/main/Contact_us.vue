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
            <span class="fa fa-pencil fa-fw edit" v-on:click="onclick(item.id,'edit')"></span>
            <span class="fa fa-trash-o fa-fw delete"></span>
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
  import {Notification} from 'element-ui'
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
        editData:{}
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
        let url = '/contact-us/'+ id
        let r = await axios.get(url)
        if(r.code == 0){
          this.localTitle = r.data.title
          switch(type){
            case 'search':
              this.showContType = true
              this.showCont = r.data.content
              break
            case 'edit':
              this.showContType = false
              this.editData = r.data
              break
          }
        }else{
          Notification.error({
            title: '错误',
            message: '获取《联系我们》获取内容失败'
          })
        }
      },
      
    },
    async mounted() {
      this.getListData()
    }
  }
</script>
<style scoped lang="less">
 @import "../assets/contact_us.less";
</style>
