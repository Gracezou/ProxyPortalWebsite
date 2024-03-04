<template>
  <div class="top_proxy_wrapper">
    <div class="top_proxy">
      <div class="info">
        <h1>{{ $t('home.topProxyTitle') }}</h1>
        <h1 class="sub_title">{{ $t('home.ipProviderTitle') }}</h1>
        <p>{{ $t('home.ipProviderDesc') }}</p>
        <el-button size="large" class="register" type="primary" @click="gotoDetailHandler">
          {{ $t('home.startNow') }}
        </el-button>
      </div>
      <el-image src="images/top-proxy/proxy-image.png" />
    </div>
    <div class="top_proxy_box">
      <div class="top_proxy_item">
        <el-image src="images/top-proxy/position.svg" />
        <p>{{ $t('home.positionDesc') }}</p>
      </div>
      <div class="top_proxy_item">
        <el-image src="images/top-proxy/function.svg" />
        <p>{{ $t('home.functionDesc') }}</p>
      </div>
      <div class="top_proxy_item">
        <el-image src="images/top-proxy/block.svg" />
        <p>{{ $t('home.blockDesc') }}</p>
      </div>
      <div class="top_proxy_item">
        <el-image src="images/top-proxy/user.svg" />
        <p>{{ $t('home.userDesc') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const router = useRouter();
const gotoDetailHandler = () => {
  //TODO 判断是否已登录
  return router.push('/login');
}
</script>
  
<style lang="scss" scoped>
.top_proxy_wrapper {
  width: 100%;
  height: 770px;
  background-color: #E9F4F9;
  margin-bottom: 90px;
}

.top_proxy,
.top_proxy_box {
  width: 1400px;
  margin: 0 auto;
}

.top_proxy {
  display: flex;
  padding-top: 50px;
  color: #333333;

  .el-image {
    width: 696px;
    height: 450px;
    margin-left: 200px;
  }

  .info {
    padding-left: 40px;
    padding-top: 65px;
  }

  h1 {
    font-size: 48px;
    font-weight: bold;
    margin: 0;
  }

  h1.sub_title {
    color: #D41010;
  }

  p {
    margin: 0;
    line-height: 30px;
    font-size: 20px;
    white-space: pre-wrap;
    margin-top: 16px;
    margin-bottom: 70px;
  }

  .el-button {
    width: 200px;
    height: 50px;
    font-size: 20px;
  }

}

.top_proxy_box {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  .top_proxy_item {
    padding: 0 14px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-image {
    width: 136px;
    height: 136px;
  }

  p {
    margin: 0;
    line-height: 30px;
    font-size: 20px;
    white-space: pre-wrap;
  }
}
</style>
