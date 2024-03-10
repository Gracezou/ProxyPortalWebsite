<template>
  <div class="purchase_wrapper" v-loading="loading">
    <RotatingDataComp :data="rotatingDataCenterList" @order="createOrderHandler" />
    <CreateOrder v-model="createOrderVisible" :data="currentProduct" />
  </div>
</template>

<script setup lang='ts'>
import http from '~/api/http';
import CreateOrder from '../components/CreateOrder.vue';

import RotatingDataComp from '../../pricing/components/RotatingData.vue';
onMounted(() => {
  getProductData()
})
const loading = ref(false)
const rotatingDataCenterList = ref([])
const getProductData = () => {
  loading.value = true
  http.get('/v1/website/buy_package')
    .then((res) => {
      console.log(res)
      const data = res.data
      rotatingDataCenterList.value = data.RotatingDatacenterProxy
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
    ...data,
    productName: 'RotatingDatacenter',
  }
  currentProduct.value = params
  createOrderVisible.value = true
}
</script>

<style lang="scss">
.purchase_wrapper {
  box-sizing: border-box;
  padding: 20px;
  background-color: rgba(233, 244, 249, 1);

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
