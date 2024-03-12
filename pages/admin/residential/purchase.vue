<template>
  <div class="purchase_wrapper" v-loading="loading">
    <div class="allow_list_header">
      <h1>{{ $t('residential.history.title') }}</h1>
    </div>
    <StaticProxy :data="staticDataCenterProxyData" @order="createOrderHandler" />
    <CreateOrder v-model="createOrderVisible" :data="currentProduct" />
  </div>
</template>

<script setup lang='ts'>
import http from '~/api/http';
import CreateOrder from '../components/CreateOrder.vue';

onMounted(() => {
  getProductData()
})

const loading = ref(false)
const staticDataCenterProxyData = ref({})
const getProductData = () => {
  loading.value = true
  http.get('/v1/website/buy_package')
    .then((res) => {
      console.log(res)
      const data = res.data
      staticDataCenterProxyData.value = data.StaticResidentialProxy
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {
      loading.value = false
    })
}
const currentProduct = ref({})
const createOrderVisible = ref(false)
const createOrderHandler = (data: any) => {
  // currentProduct.value = data
  console.log(data)
  const params = {
    productName: 'StaticResidential',
    staticDuration: data.staticDuration,
    regionList: data.productList.map((item: any) => {
      return {
        num: item.num,
        regionCode: item.regionCode
      }
    }),
    amount: data.productList.reduce((prev: any, next: any) => {
      return prev + next.num * next.price[data.staticDuration] || 0
    }, 0)
  }
  currentProduct.value = params
  createOrderVisible.value = true
}

</script>

<style lang="scss">
.purchase_wrapper {
  box-sizing: border-box;
  background-color: rgba(233, 244, 249, 1);

  .allow_list_header {
    padding: 0 40px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #D7D7D7;
    margin-bottom: 20px;

    h1 {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
  }

  .list_group {
    border: 1px solid rgba(255, 255, 255, 1);
    background-color: #fff;
    cursor: pointer;

    &:hover {
      border-color: #316BFF;
    }
  }
}
</style>
