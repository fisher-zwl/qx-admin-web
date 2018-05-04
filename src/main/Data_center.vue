<template>
  <div class="data-center-warp">
    <router-view/>
  </div>
</template>
<script>
  import axios from 'axios'

  export default{
    data(){
      return {
        username: ''
      }
    },
    methods: {
      
    }
  }
</script>
<style scoped lang="less">
 .data-center-warp{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }
</style>
