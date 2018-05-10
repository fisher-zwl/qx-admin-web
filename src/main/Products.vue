<template>
  <div class="products-warp">
    <div class="nav-url">
      <!-- <span>位置：</span>
      <span>数据中心</span> 
      <span>></span>
      <span>联系我们</span> -->
    </div>
    <div class="cont">
      <div class="cu-left">
        <div class="l-top"><span>产品中心</span><span class="fa fa-plus add" title="新增"  v-on:click="onclick('add')"></span></div>
        <ul class="l-cont">
          <li v-for="item in products" :key="item.id">
            <span v-on:click="onclick('search',item.id)" class="l-span" v-bind:title="item.title">{{item.title}}</span>
            <span v-show="item.show" class="fa fa-eye fa-fw show" :class="'show_'+item.id" title="前台隐藏" v-on:click="onclick('show', item.id)"></span>
            <span v-show="!item.show" class="fa fa-eye-slash fa-fw  hide" :class="'hide_'+item.id" title="前台显示" v-on:click="onclick('hide', item.id)"></span>
            <span class="fa fa-pencil fa-fw edit" title="编辑" v-on:click="onclick('edit', item.id)"></span>
            <span class="fa fa-trash-o fa-fw delete" title="删除" v-on:click="onclick('delete', item.id)"></span>
          </li>
        </ul>
      </div>
      <div class="cu-right">
        <div class="r-nav-url">
          <span style="margin-left:20px">位置：</span>
          <span>数据中心</span> 
          <span>></span>
          <span>产品中心</span>
          <span>></span>
          <span>{{localTitle}}</span>
          <div class="r-nav-btn"  v-if="!showContType">
            <a v-on:click="onclick('save')">保存</a>
            <a v-on:click="onclick('back')">返回</a>
            <a>阅览</a>
          </div>
        </div>
        <div class="r-word" v-if="showContType == true">
          {{showCont}}
        </div>
        <div class="r-word" v-if="!showContType">
          <commonKK :kkData="editData" ref="commonKK" @kkTitle="getTitle" @getKKData="getData" @getKKBack="getBack"></commonKK>
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
        products:[],
        showCont:'',
        localTitle:'',
        showContType:true,
        editData:{},
        save:false,
        currentId:0,
      }
    },
    methods: {
      async getListData(){
        let r = await axios.get('/products', {})
        if(r && r.code == 0){
          this.products = r.data
          this.showCont = r.data[0].content
          this.localTitle = r.data[0].title
          this.currentId = r.data[0].id
        }else{
          Notification.error({
            title: '错误',
            message: '获取《联系我们》菜单失败',
            type:'error'
          })
        }
      },
      async onclick(type,id){
        switch(type){
          case 'search':
            if(this.$refs.commonKK && !this.$refs.commonKK.saveChange){//是否正在编辑框出现改动没保存的情况
              Notification.error({
                title: '错误',
                message: '请保存当前页面的改变',
                type:'error'
              })
              return
            } 
            var url = '/products/'+ id
            this.currentId = id
            var r = await axios.get(url)
            this.localTitle = r.data.title
            this.showContType = true
            this.showCont = r.data.content
            break
          case 'edit':
            var url = '/products/'+ id
            var r = await axios.get(url)
            this.localTitle = r.data.title
            this.showContType = false
            this.editData = r.data
            break
          case 'delete':
            var r = await axios.post('/products/delete',{id:id})
            if(r && r.code == 0){
              Notification.success({
                title: '成功',
                message: '删除成功',
                type:'success'
              })
              this.getListData()
            }else{
              Notification.error({
                title: '错误',
                message: '删除失败',
                type:'error'
              })
            }
            break
          case 'save':
            this.$refs.commonKK.save()
            // var r = await axios.post('/products/update',{id:3,title:'保帅',content:'4554544445444'})
            break
          case 'back':
            this.$refs.commonKK.back()
            break
          case 'add':
            this.showContType = false
            this.editData = ''
            this.localTitle = '新增板块'
            break
          case 'show':
            var r = await axios.post('/products/update',{id:id,show:false})
            if(r && r.code == 0){
              $('.show_'+id).css('display','none')
              $('.hide_'+id).css('display','inline-block')
            }
            break
          case 'hide':
            var r = await axios.post('/products/update',{id:id,show:true})
            if(r && r.code == 0){
              $('.hide_'+id).css('display','none')
              $('.show_'+id).css('display','inline-block')
            }
            break
        }
      },
      getTitle(val){//获取组件common-kk标题值
        //console.log(val);
      },
      async getData(val){//获取组件common-kk返回值
        if(val.id){//id存在编辑更新
          let r = await axios.post('/products/update',{id:val.id,title:val.title,content:val.content})
          if(r && r.code == 0){
            Notification.success({
              title: '成功',
              message: '保存成功',
              type:'success'
            })
            await this.getListData()
            this.showCont = val.content
            this.localTitle = val.title
            this.currentId = val.id
          }else{
            Notification.error({
              title: '错误',
              message: '保存失败',
              type:'error'
            })
          }
        }else{//id不存在添加该数据
          let r = await axios.post('/products/create',{title:val.title,content:val.content})
          if(r && r.code == 0){
            Notification.success({
              title: '成功',
              message: '保存成功',
              type:'success'
            })
            await this.getListData()
            this.showCont = r.data.content
            this.localTitle = r.data.title
            this.currentId = r.data.id
          }else{
            Notification.error({
              title: '错误',
              message: '保存失败',
              type:'error'
            })
          }
        }
      },
      getBack(val){
        if(val){
          this.showContType = true
        }
      }
    },
    async mounted() {
      this.getListData()
    }
  }
</script>
<style lang="less">
  @import "../assets/about_us.less";
</style>
