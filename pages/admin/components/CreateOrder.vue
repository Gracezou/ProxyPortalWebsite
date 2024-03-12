<template>
  <client-only>
    <el-dialog class="create_order_wrapper" v-bind="$attrs" width="625" title="Pay by" :close-on-click-modal="false"
      :before-close="handleClose">
      <template #header>
        <h2 @click="drawerVisible = true">Pay by</h2>
      </template>
      <div class="payment_wrapper">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="xor">
            <template #title>
              <div class="title_box">
                <p class="payment_title">XOR</p>
                <div class="payment_method_group">
                  <el-image src="/icon/alipay.svg" />
                  <el-image src="/icon/wechat-pay.svg" />
                </div>
              </div>
            </template>
            <div class="payment_content">
              <h4>Choose a payment method</h4>
              <div class="payment_method_box">
                <div class="payment_method_item" @click="choosePaymentHandler('alipay')">
                  <el-image src="/icon/alipay.svg" />
                  <p>Alipay</p>
                </div>
                <div class="payment_method_item" @click="choosePaymentHandler('wechat')">
                  <el-image src="/icon/wechat-pay.svg" />
                  <p>WechatPay</p>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <template #footer>
        <p class="tips">
          Didn't find the payment method you want? <el-text type="primary">Contact us</el-text>
        </p>
      </template>
      <div class="drawer_wrapper" v-loading="loading" v-show="drawerVisible">
        <div class="drawer_header">
          <el-icon @click="handleCloseDrawer">
            <Right />
          </el-icon>
        </div>
        <div class="drawper_content">
          <div class="tips">
            <p>Unable to apy?</p>
            <el-text type="primary">Contact support</el-text>
          </div>
          <div class="payment_info">
            <div class="product_name">{{ props.data.productName }}</div>
            <div class="payment_price">
              $<span>{{ props.data.amount }}</span>
            </div>
          </div>
        </div>
        <div class="discount">
          <h5>Choose a discount</h5>
          <client-only>
            <el-select v-model="discount">
              <el-option v-for="item in discountList" :key="item" :label="item" :value="item" />
            </el-select>
          </client-only>
        </div>
        <div class="total_info">
          <!-- <p>
            <span>Validity Period</span>
            <span>30Days</span>
          </p>
          <p>
            <span>Validity Period</span>
            <span>30Days</span>
          </p>
          <p>
            <span>Validity Period</span>
            <span>30Days</span>
          </p> -->
          <el-divider />
          <div class="total_price">
            <p class="label">Total</p>
            <p>${{ props.data.amount }}</p>
          </div>
        </div>
        <div class="pay_button">
          <el-button type="primary" size="small" plain @click="drawerVisible = false">Cancel</el-button>
          <el-button type="primary" size="small" @click="createOrderHandler">Pay</el-button>
        </div>
        <p class="tips_policy">
          By clicking "Pay", you agree to the
          <el-text type="primary">Terms of Service</el-text> and
          <el-text type="primary">Privacy Policy</el-text>
        </p>
      </div>
      <el-dialog v-model="qrCodeVisible" width="320" :close-on-click-modal="false" :before-close="handlePaymentHandler">
        <p class="count_number">
          <span>Remaining time:</span>
          <span>
            {{ `${padStart(String(countDown.minutes), 2, '0')}:${padStart(String(countDown.seconds), 2, '0')}` }}
          </span>
        </p>
        <QRCodeVue3 :width="300" :height="300" :value="qrCode" :dots-options="dotsOptions" />
      </el-dialog>
    </el-dialog>
  </client-only>
</template>
<script lang="ts" setup>
import { Right } from '@element-plus/icons-vue';
import { padStart } from 'lodash-es';
import QRCodeVue3 from "qrcode-vue3";
import http from '~/api/http';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['update:modelValue'])

const drawerVisible = ref(false)
const handleClose = () => {
  emits('update:modelValue', false)
}

const activeName = ref('')
const handleCloseDrawer = () => {
  drawerVisible.value = false
}

const paymentType = ref('')
const choosePaymentHandler = (type: string) => {
  // console.log(type)
  // paymentType.value = type
  // drawerVisible.value = true
  router.push('/admin/api?type=' + props.data.productName)
}
const discount = ref('')
const discountList = ref([])

const loading = ref(false)
const orderId = ref('')
// 倒计时
const countDownTimer = ref<any>(null)
const endTime = ref(0)
const countDown = reactive({
  seconds: 0,
  minutes: 15,
})
const createOrderHandler = () => {
  const params = {
    ...props.data,
    payType: paymentType.value,
  }
  console.log(params)
  loading.value = true
  http.post('/v1/website/create_order/xorpay', params)
    .then((res: any) => {
      orderId.value = res.order_id
      qrCode.value = res.qrCode
      drawerVisible.value = false
      qrCodeVisible.value = true
      endTime.value = new Date().getTime() + 900000
      checkTimer.value = setInterval(() => {
        // 15分钟
        if (new Date().getTime() > endTime.value) {
          clearInterval(checkTimer.value)
          return
        }
        checkOrderStatus()
      }, 5000)
      // 倒计时
      countDownTimer.value = setInterval(() => {
        const now = new Date().getTime()
        const distance = endTime.value - now
        countDown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        countDown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
      }, 1000)


    }).finally(() => {
      loading.value = false
    })
}

const checkTimer = ref<any>(null)
const dotsOptions = ref({
  "type": "rounded", "color": "#6a1a4c",
  "gradient": {
    "type": "linear", "rotation": 1.7453292519943295,
    "colorStops": [{ "offset": 0, "color": "#73f7c4" }, { "offset": 1, "color": "#d72392" }]
  }
})
const qrCode = ref('')
const qrCodeVisible = ref(false)
const router = useRouter()
const checkOrderStatus = () => {
  http.get(`/v1/website/check_order/xorpay`, { params: { order_id: orderId.value }, headers: { noMessage: true } })
    .then(() => {
      console.log('支付成功')
      ElMessage.success('Payment successful')
      checkTimer.value && clearInterval(checkTimer.value)
      handlePaymentHandler()
      handleClose()
      router.push('/admin/api?type=' + props.data.productName)
    })
}
const handlePaymentHandler = () => {
  qrCodeVisible.value = false
  checkTimer.value && clearInterval(checkTimer.value)
}
</script>

<style lang="scss" scoped>
.create_order_wrapper {
  position: relative;

  p.tips {
    margin: 0;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #223265;
  }

  .title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .payment_title {
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #213464;
  }

  .payment_method_group {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;

    .el-image {
      width: 28px;
      height: 28px;
      margin: 0 5px;
    }
  }

  .count_number {
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 16px;
  }
}

.payment_wrapper {
  height: 624px;
  box-sizing: border-box;
  margin-top: 10px;

  .el-collapse {
    border-radius: 10px;
    border: 1px solid #d7d7d7;
    overflow: hidden;
  }


  .payment_content {
    padding: 12px 30px;
    border-top: 1px solid #d7d7d7;

    h4 {
      margin: 0;
    }
  }

  .payment_method_box {
    display: flex;
    flex-direction: row;
  }

  .payment_method_item {
    background-color: #f2f6fe;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    width: 160px;
    height: 42px;
    padding-left: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    cursor: pointer;

    &+.payment_method_item {
      margin-left: 10px;
    }

    .el-image {
      width: 32px;
      height: 32px;
    }

    p {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #223265;
      line-height: 1;
      padding-left: 8px;
    }
  }

}

.drawer_wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #f2f6fe;
  z-index: 1000;
  box-shadow: 3px 0 9px 0 rgba(10, 39, 98, 0.3);
  border-radius: 10px;
  overflow: hidden;
  transform: translateX(0);
  transition: transform 0.3s ease-in;

  .drawer_header {
    height: 60px;
    padding-top: 10px;
    padding-left: 10px;

    .el-icon {
      cursor: pointer;
      font-size: 24px;
    }
  }

  .tips {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    font-weight: 600;
  }

  .el-text {
    margin-left: 6px;
  }

  .drawper_content {
    padding: 0 30px;
    box-sizing: border-box;
    color: #223265;

  }

  .payment_info {
    margin-top: 15px;
    border-radius: 10px;
    padding: 13px;
    box-shadow: 3px 0 9px 0 rgba(10, 39, 98, 0.3);
    display: flex;
    justify-content: space-between;

    .payment_price {
      font-size: 14px;
      line-height: 1;

      span {
        font-size: 26px;
        font-weight: 600;
      }
    }

  }

  .discount {
    padding: 0 30px;

    h5 {
      font-size: 16px;
      margin: 13px 0;
    }
  }

  .total_info {
    .el-divider {
      margin: 10px 0;
    }
  }

  .total_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    line-height: 26px;
    font-size: 26px;
    font-weight: 600;

    .label {
      font-size: 14px;
    }
  }

  .pay_button {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;

    .el-button {
      border-radius: 13px;
      width: 110px;
      font-weight: 600;
    }
  }


  .tips_policy {
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    padding: 0 30px;
    margin-top: 20px;

    .el-text {
      font-size: 12px;
      margin: 0;
    }
  }
}
</style>

<style lang="scss">
.create_order_wrapper {
  border-radius: 10px;

  .el-dialog__header h2 {
    margin: 0;
    font-size: 30px;
    color: #213464;
    line-height: 1;
  }

  .el-collapse-item__content {
    padding: 0;
  }
}
</style>
