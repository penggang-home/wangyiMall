<template>
  <div class="about">
    <h2>This is About</h2>
  </div>
</template>

<script>
// 封装的工具函数
import { request } from "network/index.js";
export default {
  name: "About",
  data() {
    return {
      value: "请输入",
    };
  },
  async mounted(){
    request({
      url:'/index'
    }).then(res => {
      console.log(res.data);
    })
  }
};
</script>

<style lang="less" scoped>

</style>

