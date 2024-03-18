<template>
  <el-container class="admin_wrapper">
    <Header />
    <el-container class="admin_body">
      <AsideNav />
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>

  </el-container>
</template>
<script setup lang="ts">
import AsideNav from './components/AsideNav.vue';
import Header from './components/Header.vue';
</script>
<style lang="scss">
.admin_wrapper {
  background-color: #E9F4F9;
  flex-direction: column;

  .admin_body {
    padding: 0;
    border-top: 1px solid #D7D7D7;
    box-sizing: border-box;

    .el-main {
      padding: 0;
    }
  }

  .header_wrapper {
    background-color: #fff;
  }

}
</style>
