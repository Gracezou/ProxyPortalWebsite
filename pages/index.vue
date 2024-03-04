<template>
  <el-container>
    <el-main class="home_body">
      <TopProxyComp />
      <DynamicProxyComp />
      <StaticProxyGroupComp />
      <RubyProxyComp />
      <CoveringMapComp />
      <ExcellentProxyComp />
      <SolveProblemsComp />
    </el-main>
    <el-footer class="home_footer_wrapper">
      <Footer />
    </el-footer>
  </el-container>
</template>
  
<script setup lang='ts'>
import Footer from '~/layouts/components/Footer.vue';
import CoveringMapComp from './home/components/CoveringMap.vue';
import DynamicProxyComp from './home/components/DynamicProxy.vue';
import ExcellentProxyComp from './home/components/ExcellentProxy.vue';
import RubyProxyComp from './home/components/RubyProxy.vue';
import SolveProblemsComp from './home/components/SolveProblems.vue';
import StaticProxyGroupComp from './home/components/StaticProxyGroup.vue';
import TopProxyComp from './home/components/TopProxy.vue';
</script>
<style lang="scss" scoped>
.home_body {
  height: auto;
  background-color: #fff;
  overflow: hidden;
}

.el-main {
  padding: 0;
}



.home_footer_wrapper {
  width: 100%;
  height: 830px;
  background-color: #000026;
  padding-top: 50px;
  color: #fff;
}
</style>
