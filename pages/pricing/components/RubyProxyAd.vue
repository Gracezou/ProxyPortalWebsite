<template>
  <div class="ruby_proxy_ad">
    <div class="ruby_proxy_ad_wrapper">
      <LogoComp class="ruby_proxy" />
      <div class="ruby_proxy_ad_title">
        <p class="point">{{ $t('pricing.theBest') }}</p>
        <p>{{ $t('pricing.proxySubTitle') }}</p>
      </div>
      <div class="ruby_proxy_ad_content">
        <div v-for="item in contentsList" :key="item.title" class="ruby_proxy_ad_item">
          <el-image :src="item.src" />
          <p class="title">{{ $t(item.title) }}</p>
          <p class="desc">{{ $t(item.desc) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import LogoComp from '~/layouts/components/LogoComp.vue';

const contentsList = [
  { src: 'images/pricing/globalReach.svg', title: 'pricing.globalReach', desc: "pricing.globalReachDesc" },
  { src: 'images/pricing/fastSpeed.svg', title: 'pricing.fastSpeed', desc: "pricing.fastSpeedDesc" },
  { src: 'images/pricing/strongSecurity.svg', title: 'pricing.strongSecurity', desc: "pricing.strongSecurityDesc" },
  { src: 'images/pricing/easySetup.svg', title: 'pricing.easySetup', desc: "pricing.easySetupDesc" },
  { src: 'images/pricing/unlimitedBandwidth.svg', title: 'pricing.unlimitedBandwidth', desc: "pricing.unlimitedBandwidthDesc" },
  { src: 'images/pricing/24_7Support.svg', title: 'pricing.24_7Support', desc: "pricing.24_7SupportDesc" },
]

</script>

<style lang="scss" scoped>
.ruby_proxy_ad {
  width: 100%;
  height: 1200px;
  background: url('~/assets/image/pricing_bg2.png');
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 56px;
  display: flex;
  justify-content: center;

  .ruby_proxy {
    width: 570px;
    height: 134px;
    margin: 0 auto;
    margin-top: -28px;
  }

  .ruby_proxy_ad_title {
    margin-top: 18px;
    display: flex;
    justify-content: center;
    font-size: 36px;
    color: #000;
    margin-bottom: 76px;

    .point {
      color: #D41010;
      padding-right: 8px;
    }

  }

  .el-image {
    width: 250px;
    height: 250px;
  }
}

.ruby_proxy_ad_content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1438px;
  height: 780px;
  margin: 0 auto;
  padding: 8px 140px;
  background-color: #ffffff89;
  box-sizing: border-box;
}

.ruby_proxy_ad_item {
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333333;
  margin-bottom: 16px;

  .title {
    font-size: 32px;
    margin-top: -24px;
    margin-bottom: 15px;
    line-height: 48px;
  }

  .desc {
    line-height: 30px;
    font-size: 20px;
  }
}
</style>
