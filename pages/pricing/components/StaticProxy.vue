<template>
  <div class="static_proxy_wrapper">
    <el-row :gutter="25">
      <el-col :span="17">
        <div class="goods_wrapper">
          <el-radio-group class="period_button_group" v-model="period" size="large">
            <el-radio-button v-for="period in periodOptions" :label="$t(period.label)" :value="period.value" />
          </el-radio-group>
          <div class="goods_box">
            <h2 class="goods_title">
              {{ $t('pricing.staticGoodsTitle') }}
            </h2>
            <el-scrollbar height="592px">
              <div class="goods_region_box" v-for="region in groupData">
                <template v-if="region.value.length > 0">

                  <h5 class="region_title">{{ region.name }}</h5>
                  <div class="product_info" v-for="product in region.value"
                    :class="isExitCartList(product) ? 'active' : ''" @click="addCartHandler(product)">

                    <p class="product_name">{{ product.region }}</p>
                    <div class="product_price_box">
                      <p class="product_price">
                        <span>{{ $t('pricing.remaining') }}:</span>
                        <span>{{ product.remaining }}</span>
                      </p>
                      <p class="unit">
                        <span>${{ product.price[period] || 0 }}</span>
                        <span>/IP</span>
                      </p>
                    </div>
                  </div>
                </template>
              </div>

            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="goods_cart">
          <div class="goods_cart_header">
            <h2 class="goods_title">
              {{ $t('pricing.cartTitle') }}
            </h2>
            <el-link @click="clearAllHandler"> {{ $t('pricing.clearAll') }}</el-link>
          </div>
          <el-scrollbar height="480px">
            <el-row class="goods_cart_item" v-for="item in cartList" :key="item.region">
              <el-col :span="12">
                <p class="cart_item_name">{{ item.region }}</p>
              </el-col>
              <el-col :span="4">
                <p class="cart_item_price">{{ item.price[period] || 0 }}/IP</p>
              </el-col>
              <el-col :span="8">
                <el-input-number v-model="item.num" :min="0" size="small" :step="1"
                  @change="changeCountHandler(item.region)" />
              </el-col>
            </el-row>
          </el-scrollbar>
          <div class="cart_total">
            <div class="total_box line">
              <p>{{ $t('pricing.totalIP') }}: {{ cartList.length }}</p>
              <p>{{ $t('pricing.duration') }}: {{ $t(`pricing.${period}`) }}</p>
            </div>
            <div class="total_box buy">
              <p class="total_price">
                <span>{{ $t('pricing.totalPrice') }}:</span>
                <span>${{ totalPrice }}</span>
              </p>
              <el-button type="primary" size="large" @click="submitHandler">
                {{ $t('pricing.buyNow') }}
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>
<script setup lang='ts'>
import { isEmpty } from 'lodash-es';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['order'])

const groupData = computed(() => {
  if (isEmpty(props.data)) {
    return []
  }
  return Object.entries(props.data).map(([name, value]) => {
    return { name, value }
  })
})

const period = ref('weekly')
const periodOptions = [
  { label: 'pricing.weekly', value: 'weekly' },
  { label: 'pricing.monthly', value: 'monthly' },
  { label: 'pricing.quarterly', value: 'quarterly' },
]
onMounted(() => {
  period.value = 'weekly'
})

const isExitCartList = (product: any) => {
  return cartList.value.find((item) => item.regionCode === product.regionCode)
}

const addCartHandler = (product: any) => {
  const index = cartList.value.findIndex((item) => item.regionCode === product.regionCode)
  if (index === -1) {
    cartList.value.push({ ...product, num: 1 })
  } else {
    cartList.value[index].num++
  }
}



const clearAllHandler = () => {
  cartList.value = []
}

const changeCountHandler = (region: string) => {
  const index = cartList.value.findIndex((item) => item.region === region)
  if (index !== -1 && cartList.value[index].num === 0) {
    cartList.value.splice(index, 1)
  }
}

const cartList = ref<any[]>([])
const totalPrice = computed(() => {
  return cartList.value.reduce((acc, cur) => acc + (cur.price[period.value] || 0) * cur.num, 0)
})

const submitHandler = () => {
  emits('order', {
    productList: cartList.value,
    staticDuration: period.value
  })
}
</script>

<style lang="scss" scoped>
.static_proxy_wrapper {
  width: 100%;
  padding-left: 164px;
  padding-right: 118px;
  box-sizing: border-box;

  p {
    margin: 0;
  }

  .period_button_group {
    --el-font-size-base: 20px;
    --el-border-radius-base: 8px;
    width: 100%;
    display: flex;
  }

  .el-radio-button {
    flex: 1;

    .el-radio-button__inner {
      width: 100%;
    }
  }

  .goods_box {
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-sizing: border-box;
    margin-top: 25px;
    height: 664px;
    box-sizing: border-box;
  }

  .goods_title {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #333333;
    margin: 0;
    padding: 0 26px;
    font-weight: 600;

  }

  .goods_region_box {
    padding: 0 26px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .region_title {
    margin: 0;
    padding: 7px 0;
    line-height: 27px;
    color: #333333;
    font-size: 18px;
    width: 100%;
    font-weight: 400;
    margin-bottom: -20px;
  }

  .product_info {
    width: 200px;
    box-sizing: border-box;
    border: 2px solid #D7D7D7;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 25px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    user-select: none;

    &:hover {
      border-color: #316BFF;
    }
  }

  .product_info.active {
    border-color: #316BFF;
  }

  .product_name {
    color: #333333;
  }

  .product_price_box {
    padding-top: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #7F7F7F;
    gap: 12px
  }

  .product_price span:last-child {
    color: #316BFF;
  }

  .unit {
    display: flex;
    align-items: center;
    color: #D41010;
    font-weight: 600;
  }

  // cart
  .goods_cart {
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-sizing: border-box;
    padding-bottom: 24px;

    .el-scrollbar {
      padding-right: 30px;
    }
  }

  .goods_cart_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    border-bottom: 1px solid #D7D7D7;
  }

  .goods_cart_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #333333;

    .el-input-number {
      width: 100%;

    }

    &:first-child {
      margin-top: 15px;
    }

    .cart_item_price {
      color: #D41010;
    }
  }

  .cart_total {
    padding: 0 25px;
    padding-top: 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    .total_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      color: #333333;
      font-size: 16px;
      font-weight: 400;
      padding-bottom: 6px;
      line-height: 25px;

      .el-button {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .total_box.line {
      border-bottom: 1px solid #D7D7D7;
    }

    .total_box.buy {
      align-items: flex-end;
    }

    .total_price {
      display: flex;
      flex-direction: column;

      span:last-child {
        font-size: 28px;
        color: #D41010;
        line-height: 42px;
        padding-left: 6px;
        font-weight: 600;
      }
    }

  }
}
</style>

<style lang="scss">
.period_button_group {
  .el-radio-button {
    flex: 1;
  }

  .el-radio-button__inner {
    width: 100%;
  }
}
</style>
