<template>
  <div class="pricing_list_wrapper">
    <div class="pricing_list_content">
      <h1 class="pricing_list_title">{{ $t('pricing.pricingTitle') }}</h1>
      <p class="pricing_list_desc">{{ $t('pricing.pricingSubTitle') }}</p>
      <el-radio-group class="pricing_type_group" v-model="pricingType" size="large" fill="#fff" text-color="#4D4206">
        <el-radio-button v-for="typeItem in typeOptions" :key="typeItem.value" :label="typeItem.value">
          {{ $t(typeItem.label) }}
        </el-radio-button>
      </el-radio-group>
      <DynamicProxyListComp
        v-if="pricingType === PricingTypeEnums.dynamicProxy || pricingType === PricingTypeEnums.rotatingIspProxy" />
      <RotatingDataComp v-if="pricingType === PricingTypeEnums.rotatingDataCenterProxy" />
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import DynamicProxyListComp from './DynamicProxyList.vue';
import RotatingDataComp from './RotatingData.vue';

enum PricingTypeEnums {
  dynamicProxy = 'dynamicProxy',
  rotatingDataCenterProxy = 'rotatingDataCenterProxy',
  rotatingIspProxy = 'rotatingIspProxy',
  staticResidentialProxy = 'staticResidentialProxy',
  staticDataCenterProxy = 'staticDataCenterProxy',
}
const typeOptions = [
  { label: 'pricing.dynamicProxy', value: 'dynamicProxy' },
  { label: 'pricing.rotatingDataCenterProxy', value: 'rotatingDataCenterProxy' },
  { label: 'pricing.rotatingIspProxy', value: 'rotatingIspProxy' },
  { label: 'pricing.staticResidentialProxy', value: 'staticResidentialProxy' },
  { label: 'pricing.staticDataCenterProxy', value: 'staticDataCenterProxy' },
]
const pricingType = ref(PricingTypeEnums.dynamicProxy)

</script>
  
<style lang="scss" scoped>
.pricing_list_wrapper {
  width: 100%;
  height: 1200px;
  background-image: url('images/pricing/pricing_bg1.png');
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 128px;

  .ruby_proxy {
    width: 570px;
    height: 134px;
  }

  .el-image {
    width: 250px;
    height: 250px;
  }
}

.pricing_list_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1584px;
  margin: 0 auto;
}

.pricing_list_title {
  line-height: 60px;
  color: #333103;
  font-size: 40px;
  margin-bottom: 10px;
  margin-top: 45px;
}

.pricing_list_desc {
  margin-top: 0;
  margin-bottom: 23px;
}

.pricing_type_group {
  width: 1584px;
  margin-bottom: 25px;
}
</style>
<style lang="scss" >
.pricing_type_group {
  .el-radio-button {
    flex: 1;
  }

  .el-radio-button__inner {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    padding-top: 17px;
    padding-bottom: 17px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-right-width: 0;
    background-color: transparent;
  }

  .el-radio-button:last-child .el-radio-button__inner {
    border-right-width: 2px;
  }
}
</style>
