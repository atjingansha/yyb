<template>
  <div>
    <div>
      <el-input
        v-model="jl.name"
        placeholder="添加职称等级..."
        perfix-icon="el-icon-plus"
        style="width: 300px"
        size="small"
      ></el-input>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      jl:{
        name:''
      }
    }
  }
};
</script>

<style>
</style>