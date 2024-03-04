<template>
  <el-container class="home_wrapper">
    <Header />
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
</script>
<style lang="scss" scoped>
.home_wrapper {
  background-color: #E9F4F9;
  flex-direction: column;

  .el-main {
    padding: 0;
  }

}
</style>
