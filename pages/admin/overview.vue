<template>
  <div class="overview_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('overview.title') }}</h1>
    </div>
    <div class="allow_list_body">
      <div class="user_info_wrapper">
        <div class="clock_wrapper">
          <div class="clock_box">
            <p class="date">{{ date }}</p>
            <p class="time">{{ time }}</p>
          </div>
        </div>
        <div class="user_info">
          <p>{{ userInfo.email }}</p>
          <p>{{ userInfo.username }}</p>
          <p class="create_time_box">
            <span>{{ $t('overview.registrationTime') }}:</span>
            {{ userInfo.createTime }}
          </p>
          <el-button type="primary">{{ $t('overview.changePassword') }} </el-button>
        </div>
      </div>
      <div class="proxy_wrapper">
        <el-tabs @tab-click="changeTabHandler">
          <el-tab-pane v-for=" tab  in  tabsList " :key="tab.label" :label="$t(tab.label)">
            <div class="tab_content">
              <div class="product_wrapper">
                <div class="product_info" v-loading="loading">
                  <div class="chart">
                    <GaugeChart :option="options" />
                  </div>
                  <div class="button_wrapper">
                    <el-button :icon="RefreshLeft" @click="() => currentTab && currentTab.handler()" />
                    <div class="jump_box">
                      <el-button type="primary" size="large" @click="jumpApiHandler(tab.label.split('.')[1])">
                        {{ $t('overview.startUsing') }}
                      </el-button>
                      <el-button type="primary" plain size="large" @click="jumpHandler(tab.label.split('.')[1])">
                        {{ $t('overview.recharge') }}
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="product_order">
                  <h3> {{ $t('overview.startFrom') }}</h3>
                  <p><span>{{ price }}</span>/GB</p>
                  <div class="list_box">
                    <p>{{ $t('overview.starterInclude') }}</p>
                    <ul>
                      <li v-for="str in starterList"> {{ str }}</li>
                    </ul>
                  </div>
                  <el-button type="primary" size="large" :icon="ShoppingCart"
                    @click="jumpHandler(tab.label.split('.')[1])">
                    {{ $t('pricing.orderNow') }}
                  </el-button>
                </div>
              </div>

              <!-- <div class="line_chart_box"
                v-if="tab.label === 'overview.dynamicProxy' || tab.label === 'overview.rotatingDataCenterProxy'">
                <div class="line_chart_header">
                  <el-icon>
                    <Odometer />
                  </el-icon>
                  <el-tabs v-model="tabType">
                    <el-tab-pane :label="$t('overview.mainAccountTraffic')" name="mainAccountTraffic" />
                    <el-tab-pane :label="$t('overview.subAccountTraffic')" name="subAccountTraffic" />
                  </el-tabs>
                  <div class="form_box">
                    <client-only>
                      <el-date-picker v-model="daterange" type="daterange" range-separator="To"
                        :start-placeholder="$t('dynamic.history.startTime')"
                        :end-placeholder="$t('dynamic.history.endTime')" value-format="x" />
                    </client-only>
                  </div>
                </div>
              </div> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getToken, getUserInfo } from '@/utils/storage';
import { RefreshLeft, ShoppingCart } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import http from '~/api/http';
import GaugeChart from './components/GaugeChart.vue';

const userInfo = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  email: '',
  username: '',
  createTime: '',
})

onMounted(() => {
  const userStr = getUserInfo()
  if (userStr) {
    const user = JSON.parse(userStr)
    userInfo.email = user.user_email
    userInfo.username = user.username
    userInfo.createTime = user.create_time
  }
  getProductData()
})

const options = reactive<any>({})
const countValue = ref(0)
const currentTab = ref<any>(null)
const changeTabHandler = (tab: any) => {
  currentTab.value = tabsList.value[tab.index]
  countValue.value = 0
  return currentTab.value.handler()
}
const dynamicResidentialHandler = () => {
  price.value = proxyPriceMap.value.DynamicResidential
  loading.value = true
  http.get('/v1/website/current_user_info')
    .then((res: any) => {
      options.last_flow = res.DynamicResidentialProxyUsage.last_flow / 1000 || 0
      options.total_flow = res.DynamicResidentialProxyUsage.total_flow / 1000 || 0
      options.use_flow = res.DynamicResidentialProxyUsage.use_flow / 1000 || 0
    }).finally(() => {
      loading.value = false
    })
}
const rotatingDataCenterHandler = () => {
  price.value = proxyPriceMap.value.RotatingDatacenter
  loading.value = true
  http.get('/v1/website/overview/RotatingDatacenter')
    .then((res: any) => {
      options.last_flow = res.last_flow / 1000 || 0
      options.total_flow = res.total_flow / 1000 || 0
      options.use_flow = res.used_flow / 1000 || 0
    }).finally(() => {
      loading.value = false
    })
}
const staticResidentialHandler = () => {
  loading.value = true
  price.value = proxyPriceMap.value.StaticResidential
  http.get('/v1/website/Usage/StaticDatacenter')
    .then((res: any) => {
      options.last_flow = res.quantity || 0
      options.total_flow = res.quantity || 0
      options.use_flow = res.quantity || 0
    }).finally(() => {
      loading.value = false
    })
}
const staticDataCenterHandler = () => {
  loading.value = true
  price.value = proxyPriceMap.value.StaticDatacenter
  http.get('/v1/website/Usage/StaticResidential')
    .then((res: any) => {
      options.last_flow = res.quantity || 0
      options.total_flow = res.quantity || 0
      options.use_flow = res.quantity || 0
    }).finally(() => {
      loading.value = false
    })
}

const loading = ref(false)
const proxyPriceMap = ref<any>({})
const getProductData = () => {
  loading.value = true
  http.get('/v1/website/overview/price')
    .then((res) => {
      console.log(res)
      proxyPriceMap.value = res
      currentTab.value = tabsList.value[0]
      dynamicResidentialHandler()
    }).finally(() => {
      loading.value = false
    })
}
const price = ref(0)
const starterList = [
  'US, BR preferred.',
  'City-level precision.',
  'HTTP/HTTPS.',
  'Unlimited access.',
  'IP lasts for 90 minutes',
  '99.9% uptime.',
  'Invalid IP will not be billed'
]

enum PricingTypeEnums {
  dynamicProxy = 'dynamicProxy',
  rotatingDataCenterProxy = 'rotatingDataCenterProxy',
  rotatingIspProxy = 'rotatingIspProxy',
  staticResidentialProxy = 'staticResidentialProxy',
  staticDataCenterProxy = 'staticDataCenterProxy',
}
const tabsList = ref([
  { label: 'overview.dynamicProxy', handler: dynamicResidentialHandler, },
  { label: 'overview.rotatingDataCenterProxy', handler: rotatingDataCenterHandler, },
  { label: 'overview.staticResidentialProxy', handler: staticResidentialHandler, },
  { label: 'overview.staticDataCenterProxy', handler: staticDataCenterHandler, },
])

const router = useRouter()
const jumpHandler = (type: string) => {
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

const jumpApiHandler = (type: string) => {
  // if (getToken()) {
  router.push('/admin/api?type=' + type)
  // }
  // return router.push('/login')
}

//clock
const date = ref('')
const time = ref('')
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const timerID = ref();
updateTime();
function updateTime() {
  var cd = new Date();
  time.value = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
  date.value = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num: number, digit: number) {
  var zero = '';
  for (var i = 0; i < digit; i++) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
}
onMounted(() => {
  timerID.value = setInterval(updateTime, 1000);
})
onUnmounted(() => {
  clearInterval(timerID.value);
})

</script>

<style lang="scss" scoped>
.overview_wrapper {
  min-width: 1480px;


  .allow_list_header {
    padding: 0 40px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #D7D7D7;

    h1 {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }
  }

  .allow_list_body {
    margin: 47px 65px;
    display: flex;
    flex-direction: row;
  }

}

.user_info_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 830px;
  padding: 25px 30px;
  width: 300px;
  margin-right: 25px;

  .avatar {
    width: 100px;
    height: 100px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .clock_wrapper {
    background: #0f3854;
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 8px;
  }

  .clock_box {
    font-family: 'Poppins Medium';
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);

    .time {
      letter-spacing: 0.05em;
      font-size: 40px;
    }

    .date {
      letter-spacing: 0.1em;
      font-size: 14px;
    }

  }

  .user_info {
    border-top: 1px solid #D7D7D7;
    border-bottom: 1px solid #D7D7D7;
    padding-top: 25px;
    padding-bottom: 29px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333333;
    font-weight: 400;

    p {
      font-size: 16px;
      margin-bottom: 10px;
      margin-top: 0;
      line-height: 25px;
    }

    p.create_time_box {
      line-height: 20px;
      font-size: 13px;
      margin-top: 3px;
    }
  }

  .el-button {
    margin-top: 16px;
  }

}

.proxy_wrapper {
  background-color: #fff;
  border-radius: 8px;
  width: 1025px;
  padding: 25px;
  box-sizing: border-box;

  .product_wrapper {
    display: flex;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .product_info {
    height: 355px;
    border-radius: 8px;
    border: 1px solid #D7D7D7;
    margin-right: 25px;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;

    .chart {
      width: 475px;
      height: 275px;
    }

    .button_wrapper {
      padding-top: 35px;
      padding-right: 20px;
      padding-bottom: 44px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      >.el-button {
        width: 32px;
      }
    }

    .jump_box {
      display: flex;
      flex-direction: column;

      .el-button {
        border-radius: 8px;
        width: 167px;
        margin: 0;
        margin-top: 15px;
      }
    }
  }

  .product_order {
    width: 268px;
    border-radius: 8px;
    border: 1px solid #D7D7D7;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    h3 {
      margin: 0;
      font-weight: 500;
      font-style: normal;
      font-size: 20px;
      color: #000000;
      line-height: 20px;
      width: 100%;
      text-align: left;
    }

    >p {
      line-height: 55px;
      margin-top: 0;
      margin-bottom: 5px;
      font-weight: 400;
      color: #000000;
      font-size: 18px;
      width: 100%;
      text-align: left;
      padding-left: 20px;

      span {
        color: #D41010;
        font-weight: 600;
        font-size: 36px;
      }
    }

    .list_box p {
      font-weight: 600;
      font-size: 16px;
      color: #333;
      margin: 0;
      line-height: 25px;
    }

    .list_box ul {
      margin-top: 0;
      margin-bottom: 18px;
      margin-left: -20px;
      font-weight: 400;
      font-size: 14px;
      color: #555555;
      line-height: 20px;
    }

    .el-button {
      font-size: 18px;
    }
  }
}

.line_chart_box {
  margin-top: 25px;
  border-radius: 8px;
  border: 1px solid #D7D7D7;
  height: 335px;

  .el-tabs__header {
    margin: 0;
  }

  .line_chart_header {
    display: flex;
    align-items: center;
    padding-left: 25px;
    height: 54px;
  }

  .el-icon {
    margin-right: 20px;
    color: #316BFF;
    font-size: 25px;
  }

  .form_box {
    display: flex;
    margin-left: 130px;
    --el-date-editor-width: 425px;
  }
}
</style>

<style>
.line_chart_box .el-tabs__header {
  margin: 0;
}
</style>./components/GaugeChart.vue
