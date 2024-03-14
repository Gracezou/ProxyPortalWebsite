<template>
  <div class="dynamic_proxy_wrapper">
    <div class="info">
      <p class="sub_title">{{ $t('home.bestValueSubTitle') }}</p>
      <h1>{{ $t('home.bestValueTitle') }}</h1>
      <p class="dynamic_proxy_desc">{{ $t('home.bestValueDesc') }}</p>
      <el-button size="large" class="register" type="primary" @click="gotoDetailHandler">
        {{ $t('home.startNow') }}
      </el-button>
      <div class="tips_box">
        <div class="tips_item">
          <el-icon color="#316BFF" size="22"><Select /></el-icon>
          <p>{{ $t('home.excellentProxy') }}</p>
        </div>
        <div class="tips_item">
          <el-icon color="#316BFF" size="22"><Select /></el-icon>
          <p>{{ $t('home.easyIntegration') }}</p>
        </div>
      </div>
    </div>
    <img src="~/assets/image/dynamic.gif" alt="">
  </div>
</template>
<script setup lang='ts'>
import { Select } from '@element-plus/icons-vue';
const router = useRouter();
const gotoDetailHandler = () => {
  //TODO 判断是否已登录
  return router.push('/login');
}
</script>

<style lang="scss" scoped>
.dynamic_proxy_wrapper {
  padding: 20px 40px;
  margin: 0 auto;
  width: 1400px;
  height: 396px;
  background-color: #E9F4F9;
  border-radius: 20px;
  margin-bottom: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  img {
    margin-top: 16px;
    margin-right: 40px;
    width: 300px;
    height: 300px;
  }

  p {
    margin: 0;
    white-space: pre-wrap;
    line-height: 24px;
  }

  .sub_title {
    color: #D41010;
    font-size: 15px;
    line-height: 24px;
    font-weight: 600;
  }

  h1 {
    margin-top: 8px;
    margin-bottom: 16px;
    font-weight: normal;
    font-size: 36px;
    color: #081D4D;
    line-height: 55px;
  }

  .dynamic_proxy_desc {
    font-size: 16px;
    line-height: 25px;
  }

  .el-button {
    width: 200px;
    height: 45px;
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 28px;
  }

  .tips_box,
  .tips_item {
    display: flex;
    align-items: center;
  }

  .tips_item p {
    color: #374459;
    font-size: 15px;
    padding-left: 8px;
    padding-right: 16px;
  }


}
</style>
