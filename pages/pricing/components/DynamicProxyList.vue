<template>
  <div class="dynamic_proxy_list_wrapper">
    <el-radio-group v-if="planTypeTabShow" class="dynamic_proxy_type_group" v-model="planType" size="large" fill="#fff"
      text-color="#4D4206" @change="changePlanTypeHandler">
      <el-radio-button v-for="plan in planTypeList" :label="plan" :value="plan" />
    </el-radio-group>

    <div class="list_group_box">
      <div v-for="(item, index) in showList" :key="item.planCode" class="list_group"
        :class="currentIndex === index ? 'active' : ''" @click="() => changeCurrentIndexHandler(index)">
        <p class="group_title">{{ item.isCustom ? 'Custom +' : item.size }}</p>
        <p class="total_box">
          <span>{{ $t('pricing.total') }}:</span>
          <span class="total_price">${{ item.isCustom ? '?' : item.total(item) }}</span>
          <span v-if="item.originTotal" class="origin_price">${{ item.originTotal }}</span>
        </p>
        <div class="info_box">
          <el-icon color="#18D2AB" size="16"><Select /></el-icon>
          <div class="info" v-if="dynamicType">
            <p>200M+</p>
            <p>{{ $t('pricing.stableResidential') }}</p>
          </div>
          <div class="info" v-else>
            <p>{{ $t('pricing.subAccount') }}</p>
            <p>{{ $t('pricing.unlimitedIpAmount') }}</p>
          </div>
        </div>
        <div class="info_box">
          <el-icon color="#18D2AB" size="16"><Select /></el-icon>
          <div class="info">
            <p>{{ $t('pricing.validityPeriod') }}</p>
            <p v-if="item.isCustom">{{ $t('pricing.customDays') }}</p>
            <div v-else class="number_box">
              <div class="number_input_box">
                <span> {{ item.num }}</span>
                <span>
                  <el-icon @click="(e) => changeNumberHandler(e, item, true)">
                    <ArrowUp />
                  </el-icon>
                  <el-icon @click="(e) => changeNumberHandler(e, item, false)">
                    <ArrowDown />
                  </el-icon>
                </span>
              </div>
              <span>{{ $t('pricing.days') }}</span>
            </div>
          </div>
        </div>
        <p class="price_box">
          <span class="single_price">${{ item.isCustom ? '?' : item.price(item) }}</span>
          <span>/{{ $t('pricing.GB') }}</span>
          <span v-if="item.originPrice" class="origin_price">${{ item.originPrice }}</span>
        </p>
        <el-button type="primary" plain :icon="item.isCustom ? PhoneFilled : ShoppingCart"
          @click="() => submitHandler(item)">
          {{ item.isCustom ? $t('pricing.contactUs') : $t('pricing.orderNow') }}
        </el-button>
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
import { ArrowDown, ArrowUp, PhoneFilled, Select, ShoppingCart } from '@element-plus/icons-vue';
import { groupBy } from 'lodash-es';
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  starterList: {
    type: Array,
    default: () => []
  },
  dynamicType: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['order'])

const typeGroup = ref<Record<string, any[]>>({})
const planTypeTabShow = ref(true)
const planType = ref("")
const planTypeList = ref<string[]>([])


const showList = ref<any[]>([])

const changePlanTypeHandler = (val: any) => {
  planType.value = val
  const list = typeGroup.value[val] || []
  showList.value = list.map((item: any) => {
    return {
      planCode: item.planCode,
      type: item.planType,
      num: 30,
      size: item.planFlow + 'GB',
      priceList: item.price,
      price: (plan: any) => plan.priceList[`Price_${plan.num}`],
      originPrice: item.originalPrice,
      total: (plan: any) => Math.round((plan.price(plan) ?? 0) * plan.num),
      originTotal: item.originalTotalPrice,
      extra: item.giftFlow,
      starters: props.starterList,
      isCustom: item.isCustom,
    }
  })
}

watch(
  () => props.data,
  (newVal) => {
    console.log(newVal)
    typeGroup.value = groupBy(newVal, 'planType')
    planTypeList.value = Object.keys(typeGroup.value)
    planType.value = planTypeList.value[0] as string
    changePlanTypeHandler(planType.value)
    if (planTypeList.value.length > 1) {
      planTypeTabShow.value = true
    } else {
      planTypeTabShow.value = false
    }
  },
  { immediate: true, deep: true }
)

const changeNumberHandler = (e: MouseEvent, plan: any, isAdd: boolean) => {
  e.stopImmediatePropagation()
  const priceList = Object.keys(plan.priceList)
    .map((item: any) => item.replace('Price_', ''))
    .sort((a: any, b: any) => parseInt(a) - parseInt(b))
  const index = priceList.findIndex((item: any) => String(item) === String(plan.num))
  if (isAdd && index !== priceList.length - 1) {
    plan.num = priceList[index + 1]
  }
  if (!isAdd && index !== 0) {
    plan.num = priceList[index - 1]
  }
}

const currentIndex = ref<number | undefined>(undefined)
const changeCurrentIndexHandler = (index: number) => {
  currentIndex.value = index
}

const submitHandler = (data: any) => {
  console.log(data)
  if (data.isCustom) {
    // window.open('https://t.me/ProxyRack')
    return
  }
  emits('order', {
    planType: data.type,
    planCode: data.planCode,
    rotateDuration: data.num,
    amount: data.total
  })
}

</script>

<style lang="scss" scoped>
.dynamic_proxy_list_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .number_box {
    display: flex;
    align-items: center;
    height: 40px;
    gap: 10px;
    user-select: none;

    .number_input_box {
      display: flex;
      align-items: center;
      border-radius: 8px;
      border: 1px solid #d7d7d7;

      .el-icon {
        margin: 0;
        cursor: pointer;
        padding: 0 10px;

        &:first-child {
          border-bottom: 1px solid #d7d7d7;
        }
      }

      span {
        height: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &:first-child {
          width: 70px;
          padding: 0 10px;
          border-right: 1px solid #d7d7d7;
        }
      }
    }
  }
}

.list_group_box {
  display: flex;
}

.list_group {
  width: 300px;
  height: 788px;
  margin: 20px;
  padding: 21px;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  border: 1px solid #D7D7D7;

  &:hover {
    border-color: #316BFF;
    border-width: 2px;
    padding: 20px;
  }

  .el-button {
    width: 168px;
    height: 45px;
    font-size: 18px;
    padding-top: 14px;
    padding-bottom: 14px;
    font-family: 'Poppins Medium';
    margin: 0 auto;
    --el-button-text-color: #316BFF;
    --el-button-border-color: #316BFF;
    --el-button-bg-color: #fff;
    --el-border-radius-base: 8px;
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

.list_group.active {
  border-color: #316BFF;
  border-width: 2px;
  padding: 20px;

  .el-button {
    --el-button-text-color: #fff;
    --el-button-border-color: #316BFF;
    --el-button-bg-color: #316BFF;
  }
}
</style>

<style lang="scss">
.dynamic_proxy_type_group {
  --el-border-radius-base: 8px;

  .el-radio-button {
    flex: 1;
  }

  .el-radio-button__inner {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    padding-top: 16px;
    padding-bottom: 16px;
    border-width: 2px;
    background-color: transparent;
    border-color: #fff;
    --el-border: 2px solid #fff;

    &:hover {
      color: #4D4206;
    }
  }

}
</style>
