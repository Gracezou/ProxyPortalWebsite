<template>
  <div class="allow_list_wrapper" v-loading="loading">
    <div class="allow_list_header">
      <h1>{{ $t('userauth.title') }}</h1>
    </div>
    <el-tabs v-model="tabName" type="border-card" @tab-click="changeTabHandler">
      <el-tab-pane v-for="tab in tabsList" :key="tab.label" :label="$t(tab.label)" :name="tab.label">
        <div class="tab_content">
          <span class="content_label"> {{ $t(tab.valueLabel) }}:</span>
          <span class="content_value"> {{ countValue }} {{ $t(tab.unit) }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="allow_list_body">
      <client-only>
        <el-form size="large" :model="form">
          <el-form-item label="选择国家/地区">
            <el-select v-model="form.regions" clearable>
              <el-option v-for="region in regionsList" :key="region.value" :label="region.label"
                :value="region.value" />
            </el-select>
          </el-form-item>
          <template v-if="tabName === 'api.staticResidentialProxy'">
            <el-form-item label="选择ip">
              <el-select v-model="form.staticIp" clearable>
                <el-option v-for="region in proxySelectList" :key="region.ip" :label="region.ip" :value="region.ip" />
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label="认证账号">
            <el-select v-model="form.account" clearable>
              <el-option v-for="account in subAccountList" :key="account.id" :label="account.account"
                :value="account.id" />
            </el-select>
          </el-form-item>
          <div class="part">

            <el-form-item label="账号名">
              <el-input v-model="form.username" disabled />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" disabled />
            </el-form-item>
          </div>
        </el-form>
      </client-only>
      <div class="code_content">
        <div class="code_title">
          <div class="code_title_tips">
            <div class="white">测试命令</div>
            <div class="red">*所有类型IP仅支持在境外网络环境下使用</div>
          </div>
          <div class="button_box">
            <el-button type="primary" size="large" class="red_style" @click="copyUrlHandler">复制链接</el-button>
          </div>
        </div>
        <div class="code_box">
          {{ generateUrl }}
        </div>
      </div>

      <div class="gen_options_wrapper">
        <client-only>
          <el-select v-model="generateMethod" size="large">
            <el-option v-for="str in generateMethodOptions" :key="str" :label="str" :value="str" />
          </el-select>
        </client-only>
      </div>



    </div>
  </div>
</template>

<script setup lang='ts'>
import http from '~/api/http';
// 认证账号是二级账号  pageSize 100 选择 =数据
// ip类型
// 代理地址  - 先写个假的  
// 账号密码不能修改
// 账号名： 二级账号名称 + -zone-custom-region
// ISP： /v1/website/regions/Country_TO_Operator
// IP切换  - 删除
// 全球动态 - 套餐 - 删除
import { isEmpty } from 'lodash-es';
const countValue = ref(0)
const regionsList = ref<{ label: string, value: string }[]>([])
const loading = ref(false)
const tabName = ref('')
const changeTabHandler = (tab: any) => {
  const currentTab = tabsList.value[tab.index]
  resetData()
  return currentTab.handler()
}
onMounted(() => {
  const currentTab = tabsList.value[0]
  currentTab.handler()
  tabName.value = currentTab.label
})

const resetData = () => {
  countValue.value = 0
  regionsList.value = []
  generateUrl.value = ''
  // form.regions = ''
}

const dynamicResidentialHandler = () => {
  loading.value = true
  Promise.all([
    http.get('/v1/website/current_user_info'),
    http.get('/v1/website/regions/DynamicResidential')
  ]).then(([flowResult, regionResult]: any) => {
    const flow = flowResult.DynamicResidentialProxyUsage
    if (flow) {
      countValue.value = (flow.last_flow) / 1000 || 0
    }
    const country_list: string[] = isEmpty(regionResult.continent) ? [] : Object.values(regionResult.continent)
    regionsList.value = country_list.map((item: string) => {
      return { label: item, value: item }
    })
  }).finally(() => {
    loading.value = false
  })
}

const rotatingDataCenterHandler = () => {
  loading.value = true
  Promise.all([
    http.get('/v1/website/overview/RotatingDatacenter'),
    http.get('/v1/website/regions/RotatingDatacenter')
  ]).then(([flowResult, regionResult]: any) => {
    countValue.value = (flowResult.total_flow - flowResult.used_flow) / 1000
    regionsList.value = regionResult.map((item: any) => {
      return { label: item.country_name, value: item.country_code }
    })
    console.log(regionsList.value)
  }).finally(() => {
    loading.value = false
  })

}


const proxyList = ref<{ ip: string, port: string, region: string }[]>([])
const proxySelectList = computed(() => {
  if (form.regions === '') {
    return proxyList.value.map(item => {
      const proxy = item.ip.split(':')
      return { ip: proxy[0], port: proxy[1], region: item.region }
    })
  }
  return proxyList.value.filter((item) => item.region === form.regions)
})
const staticResidentialHandler = () => {
  loading.value = true
  Promise.all([
    http.get('/v1/website/Usage/StaticDatacenter'),

  ]).then(([res, accountResult]: any[]) => {
    countValue.value = res.quantity
    regionsList.value = res.country_list.map((item: string) => {
      return { label: item, value: item }
    })
    proxyList.value = res.proxy_list
    subAccountList.value = accountResult.cur_data
  }).finally(() => {
    loading.value = false
  })
}

const staticDataCenterHandler = () => {
  resetData()
  loading.value = true
  http.get('/v1/website/Usage/StaticResidential').then((res: any) => {
    countValue.value = res.quantity
    regionsList.value = res.country_list.map((item: string) => {
      return { label: item, value: item }
    })
  }).finally(() => {
    loading.value = false
  })
}

const tabsList = ref([
  { label: 'api.dynamicProxy', handler: dynamicResidentialHandler, valueLabel: 'api.trafficRemain', unit: 'api.MB', generateUrl: '/v1/website/generate/DynamicResidential' },
  { label: 'api.rotatingDataCenterProxy', handler: rotatingDataCenterHandler, valueLabel: 'api.trafficRemain', unit: 'api.GB', generateUrl: '/v1/website/generate/RotatingDatacenter' },
  { label: 'api.staticResidentialProxy', handler: staticResidentialHandler, valueLabel: 'api.totalAvailable', unit: 'api.IP', generateUrl: '/v1/website/generate/StaticResidential' },
  { label: 'api.staticDataCenterProxy', handler: staticDataCenterHandler, valueLabel: 'api.totalAvailable', unit: 'api.IP', generateUrl: '/v1/website/generate/StaticDatacenter' },
])

// 认证账号
const subAccountList = ref<any[]>([])
const getSubAccountHandler = () => {
  http.get('/v1/website/get_sub_account_list', { params: { cur_page: 1, page_size: 100 } }).then((res: any) => {
    subAccountList.value = res.cur_data
  })
}
onMounted(() => getSubAccountHandler())

const form = reactive({
  num: 1,
  regions: '',
  staticIp: '',
  account: '',
  username: '',
  password: ''
})

const generateUrl = ref('')
// 复制链接
const copyUrlHandler = () => {
  if (!generateUrl.value) return ElMessage.error('请先生成链接')
  const input = document.createElement('input')
  input.value = generateUrl.value
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage.success('复制成功')
}

// 生成链接
const generateMethod = ref('username:password:hostname:port')
const generateMethodOptions = ref([
  'username:password:hostname:port',
  'hostname:port:username:password',
  'username:password@hostname:port',
])
const showGenerateList = ref<any[]>([])
const batchGenerateHandler = () => {
  proxySelectList.value.map((item) => {
    return {
      ip: item.ip,
      port: item.port,
      username: form.username,
      password: form.password,
    }
  })

}
</script>

<style scoped lang="scss">
.allow_list_wrapper {
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
    margin: 47px 40px;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
  }

  .tab_content {
    height: 72px;
    display: flex;
    align-items: flex-end;

  }

  .content_label {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    margin-bottom: 20px;
    padding-left: 5px;
  }

  .content_value {
    font-size: 48px;
    color: #316BFF;
    margin-left: 10px;
    font-weight: 600;
    line-height: 72px;
  }


  .green_style.el-button {
    --el-button-hover-bg-color: #5fcf3f;
    --el-button-bg-color: #5fcf3f;
    --el-button-outline-color: #5fcf3f;
    --el-button-active-color: #5fcf3f;
    --el-button-border-color: #5fcf3f;
    --el-button-hover-border-color: #5fcf3f;
  }

  .red_style.el-button {
    --el-button-hover-bg-color: #542d46;
    --el-button-bg-color: #542d46;
    --el-button-outline-color: #542d46;
    --el-button-active-color: #542d46;
    --el-button-border-color: #542d46;
    --el-button-hover-border-color: #542d46;
  }

  .code_content {
    height: 146px;
    padding: 20px 40px;
    background: #000;

    .button_box {
      display: flex;
      align-items: center;
      justify-content: center;

      .el-button {
        width: 102px;
      }
    }
  }

  .code_title {
    display: flex;
    justify-content: space-between;
  }

  .code_title_tips {
    width: 75%;
    padding: 10px 0 10px 15px;
    background-color: #171b1e;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;

    .white {
      color: #fff;
    }

    .red {
      margin-left: 40px;
      color: #e60012;
    }

  }

  .code_box {
    width: 99%;
    text-align: left;
    color: #5fcf3f;
    line-height: 80px;
  }

}
</style>


<style lang="scss">
.allow_list_wrapper {
  .el-tabs {
    margin: 47px 40px;
    --el-tabs-header-height: 55px;
    --el-text-color-secondary: #7F7F7F;

    &.el-tabs--border-card>.el-tabs__header {
      border-bottom: 4px solid #316BFF;
    }

    .el-tabs__nav-wrap {
      margin-bottom: -4px;
    }

    .el-tabs__content {
      border-left: 4px solid #316BFF;
      border-right: 4px solid #316BFF;
      border-bottom: 4px solid #316BFF;
    }

    &.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child {
      margin-left: 0;
    }
  }

  .el-tabs__item {
    font-size: 20px;
    --el-border-color: #316BFF;
  }

  .el-tabs__item.is-active {
    --el-color-primary: #333333;
    border-width: 4px;
    border-top-color: #316BFF;
  }
}
</style>
