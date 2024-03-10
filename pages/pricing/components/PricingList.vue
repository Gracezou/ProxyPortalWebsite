<template>
  <div class="pricing_list_wrapper" :style="{

  }" v-loading="loading">
    <div class="pricing_list_content">
      <h1 class="pricing_list_title">{{ $t('pricing.pricingTitle') }}</h1>
      <p class="pricing_list_desc">{{ $t('pricing.pricingSubTitle') }}</p>
      <el-radio-group class="pricing_type_group" v-model="pricingType" size="large" fill="#fff" text-color="#4D4206">
        <el-radio-button v-for="typeItem in typeOptions" :key="typeItem.value" :label="$t(typeItem.label)"
          :value="typeItem.value" />
      </el-radio-group>
      <!-- <DynamicProxyListComp v-if="pricingType === PricingTypeEnums.rotatingIspProxy" /> -->
      <DynamicProxyListComp v-if="pricingType === PricingTypeEnums.dynamicProxy" :personal="dynamicPersonalList"
        :enterprise="dynamicEnterpriseList" @order="jumpHandler(PricingTypeEnums.dynamicProxy)" />
      <RotatingDataComp v-if="pricingType === PricingTypeEnums.rotatingDataCenterProxy" :data="rotatingDataCenterList"
        @order="jumpHandler(PricingTypeEnums.rotatingDataCenterProxy)" />
      <StaticProxy v-if="pricingType === PricingTypeEnums.staticResidentialProxy" :data="staticResidentialProxyData"
        @order="jumpHandler(PricingTypeEnums.staticResidentialProxy)" />
      <StaticProxy v-if="pricingType === PricingTypeEnums.staticDataCenterProxy" :data="staticDataCenterProxyData"
        @order="jumpHandler(PricingTypeEnums.staticDataCenterProxy)" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import http from '~/api/http';
import DynamicProxyListComp from './DynamicProxyList.vue';
import RotatingDataComp from './RotatingData.vue';
import StaticProxy from './StaticProxy.vue';

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
  // { label: 'pricing.rotatingIspProxy', value: 'rotatingIspProxy' },
  { label: 'pricing.staticResidentialProxy', value: 'staticResidentialProxy' },
  { label: 'pricing.staticDataCenterProxy', value: 'staticDataCenterProxy' },
]
const pricingType = ref(PricingTypeEnums.dynamicProxy)
const loading = ref(false)
const rotatingDataCenterList = ref([])

const dynamicPersonalList = ref([])
const dynamicEnterpriseList = ref([])

const staticResidentialProxyData = ref({})
const staticDataCenterProxyData = ref({})
const getProductData = () => {
  loading.value = true
  http.get('/v1/website/buy_package')
    .then((res) => {
      console.log(res)
      const data = res.data
      rotatingDataCenterList.value = data.RotatingDatacenterProxy

      dynamicPersonalList.value = data.DynamicResidentialProxy.PersonalPlans
      dynamicEnterpriseList.value = data.DynamicResidentialProxy.EnterprisePlans

      staticResidentialProxyData.value = data.StaticResidentialProxy
      staticDataCenterProxyData.value = data.StaticDatacenterProxy

    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {
      loading.value = false
    })
}


onMounted(() => {
  getProductData()
})
const router = useRouter()
const jumpHandler = (type: PricingTypeEnums) => {
  if (getToken()) {
    switch (type) {
      case PricingTypeEnums.dynamicProxy:
        return router.push('/admin/dynamic/purchase')
      case PricingTypeEnums.rotatingDataCenterProxy:
        return router.push('/admin/rotating/purchase')
      case PricingTypeEnums.staticResidentialProxy:
        return router.push('/admin/residential/purchase')
      case PricingTypeEnums.staticDataCenterProxy:
        return router.push('/admin/datacenter/purchase')
    }
  }
  return router.push('/login')
}


</script>

<style lang="scss" scoped>
.pricing_list_wrapper {
  width: 100%;
  height: 1200px;
  background: url('~/assets/image/pricing_bg1.png') no-repeat center / 100% 100%;
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
<style lang="scss">
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
