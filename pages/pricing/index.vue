<template>
  <el-container>
    <el-main class="pricing_body">
      <PricingListComp />
      <RubyProxyAdComp />
      <SolveProblemsComp />
    </el-main>
    <el-footer class="pricing_footer_wrapper">
      <Footer />
    </el-footer>
  </el-container>
</template>
  
<script setup lang='ts'>
import Footer from '~/layouts/components/Footer.vue';
import SolveProblemsComp from '../home/components/SolveProblems.vue';
import PricingListComp from './components/PricingList.vue';
import RubyProxyAdComp from './components/RubyProxyAd.vue';

</script>
  
<style lang="scss" scoped>
.pricing_body {
  height: auto;
  background-color: #fff;
  overflow: hidden;
  padding: 0;
}

.pricing_footer_wrapper {
  width: 100%;
  height: 830px;
  background-color: #000026;
  padding-top: 50px;
  color: #fff;
}
</style>
