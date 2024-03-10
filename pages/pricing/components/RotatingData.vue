<template>
  <div class="dynamic_proxy_list_wrapper">

    <div class="list_group_box">
      <div v-for="item in showList" :key="item.planCode" class="list_group">
        <p class="group_title">{{ item.size }}</p>
        <p class="total_box">
          <span>{{ $t('pricing.total') }}:</span>
          <span class="total_price">${{ item.total || '?' }}</span>
          <span v-if="item.originTotal" class="origin_price">${{ item.originTotal }}</span>
        </p>
        <div class="info_box">
          <el-icon color="#18D2AB" size="16"><Select /></el-icon>
          <div class="info">
            <p>200M+</p>
            <p>{{ $t('pricing.stableResidential') }}</p>
          </div>
        </div>
        <div class="info_box">
          <el-icon color="#18D2AB" size="16"><Select /></el-icon>
          <div class="info">
            <p>{{ $t('pricing.validityPeriod') }}</p>
            <p v-if="item.type == 'custom'">{{ $t('pricing.customDays') }}</p>
            <div v-else>
              <el-input-number v-model="item.num" controls-position="right" :step="30" />
              <span>{{ $t('pricing.days') }}</span>
            </div>
          </div>
        </div>
        <p class="price_box">
          <span class="single_price">${{ item.price || '?' }}</span>
          <span>/{{ $t('pricing.GB') }}</span>
          <span v-if="item.originPrice" class="origin_price">${{ item.originPrice }}</span>
        </p>
        <el-button type="primary" plain :icon="ShoppingCart" @click="() => submitHandler(item)">{{
        $t('pricing.orderNow') }}</el-button>
        <el-divider />
        <p class="ul_title">{{ $t('pricing.starterIncludes') }}</p>
        <ul>
          <li v-for="sta in item.starters" :key="sta">{{ sta }}</li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Select, ShoppingCart } from '@element-plus/icons-vue';
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const starterList = [
  '500,000 datacenter IPs',
  '220+ regions and countries',
  'HTTP/HTTPS.',
  'Traffic history monitoring',
  'Bulk proxies generation',
  '99.9% uptime.',
  'Invalid IP will not be billed'
]

const showList = computed(() => {
  return props.data.map((item: any) => {
    return reactive({
      planCode: item.planCode,
      type: item.PlanType,
      size: item.Flow + 'GB',
      price: item.UnitPrice,
      originPrice: item.UnitOriginPrice,
      total: item.TotalPrice,
      originTotal: item.TotalOriginPrice,
      extra: item.GiftFlow,
      starters: starterList,
      num: item.DefaultDays
    })
  })
})

const emits = defineEmits(['order'])

const submitHandler = (data: any) => {
  console.log(data)
  emits('order', {
    planType: data.type,
    planCode: data.planCode,
    rotateDuration: data.num
  })
}

</script>

<style lang="scss" scoped>
.dynamic_proxy_list_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list_group_box {
  display: flex;
}

.list_group {
  width: 300px;
  height: 788px;
  margin: 20px;
  padding: 20px;
  background-color: #E9F4F9;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .el-button {
    width: 168px;
    height: 45px;
    font-size: 18px;
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0 auto;
  }

  p {
    margin: 0;
    white-space: pre-wrap;
    line-height: 24px;
  }

  .origin_price {

    text-decoration: line-through;
  }

  .group_title {
    font-size: 22px;
    color: #333333;
    margin-bottom: 5px;
    line-height: 34px;
    font-weight: 600;
  }

  .total_box {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color: #7F7F7F;
    font-size: 15px;

    .total_price {
      font-size: 22px;
      color: #333333;
      margin-left: 10px;
      font-weight: 600;
      line-height: 33px;
      padding-right: 4px;
    }
  }

  .info_box {
    display: flex;
    margin-bottom: 18px;

    .el-icon {
      margin-right: 18px;
      line-height: 25px;
      margin-top: 5px;
    }

    .el-input-number {
      margin-right: 8px;
    }
  }

  .price_box {
    color: #7F7F7F;
    font-size: 15px;
    margin-bottom: 24px;

    .single_price {
      font-size: 34px;
      color: #333333;
      line-height: 50px;
      font-weight: 800;
    }

    .origin_price {
      margin-left: 14px;
    }
  }

  .info {
    color: #7F7F7F;
    font-size: 15px;
    line-height: 23px;

    p:first-child {
      font-size: 16px;
      color: #333333;
      margin-bottom: 5px;
      line-height: 25px;
      font-weight: 600;
    }

  }

  .ul_title {
    margin-bottom: 18px;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 20px;
      line-height: 25px;
      font-size: 15px;
      color: #555555;
    }
  }

}
</style>
