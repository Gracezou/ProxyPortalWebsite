<template>
  <div class="static_proxy_group_wrapper">
    <div class="group_item">
      <h1>{{ $t('home.staticResidentialTitle') }}</h1>
      <p>{{ $t('home.staticResidentialDesc') }}</p>
      <el-image src="images/static/static-residential.png" />
    </div>
    <div class="group_item">
      <h1>{{ $t('home.staticDataCenterTitle') }}</h1>
      <p>{{ $t('home.staticDataCenterDesc') }}</p>
      <el-image src="images/static/static-data-center.png" />
    </div>
    <div class="group_item">
      <h1>{{ $t('home.rotatingISP') }}</h1>
      <p>{{ $t('home.rotatingISPDesc') }}</p>
      <el-image src="images/static/rotating-isp.png" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.static_proxy_group_wrapper {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 90px;

  .group_item {
    width: 435px;
    border-radius: 20px;
    background-color: #E9F4F9;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 390px;

    h1 {
      font-size: 18px;
      color: #081D4D;
      line-height: 27px;
      margin-top: 14px;
      margin-bottom: 23px;
      font-weight: normal;
    }

    p {
      line-height: 23px;
      white-space: pre-wrap;
      margin: 0;
      color: #374459;
    }
  }

  .el-image {
    width: 250px;
    height: 250px;
  }
}
</style>
