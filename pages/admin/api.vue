<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('api.title') }}</h1>
    </div>

    <el-tabs type="border-card" v-model="tabName" @tab-click="changeTabHandler">
      <el-tab-pane v-for="tab in tabsList" :key="tab.label" :name="tab.label" :label="$t(tab.label)">
        <div class="tab_content">
          <div class="info">
            <span class="content_label"> {{ $t(tab.valueLabel) }}:</span>
            <span class="content_value"> {{ countValue }} {{ $t(tab.unit) }}</span>
          </div>
          <el-button :icon="RefreshLeft" @click="refreshHandler" />
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="allow_list_body">
      <div class="ip_gen_box">
        <client-only>
          <el-form :inline="true" size="large" :model="form" label-position="top">
            <el-form-item :label="$t('api.chooseNumber')">
              <el-input-number v-model="form.num" :max="numberMax" :controls="false" clearable />
            </el-form-item>
            <el-form-item :label="$t('api.chooseRegion')">
              <el-select v-model="form.regions" filterable clearable>
                <el-option v-for="region in regionsList" :key="region.value"
                  :label="region.label.includes('api') ? $t(region.label) : region.label" :value="region.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('api.protocol')">
              <el-select v-model="form.protocol" clearable>
                <el-option label="HTTP/HTTPS" value="HTTP/HTTPS" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('api.dataFormat')">
              <el-select v-model="form.dataType" clearable>
                <el-option label="TXT" value="txt" />
                <el-option label="JSON" value="json" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('api.delimiter')">
              <el-select v-model="form.delimiter" clearable>
                <el-option v-for="item in delimiterOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <div class="gen_button_box">
              <el-button type="primary" size="large" class="green_style" @click="generateUrlHandler">
                {{ $t('api.generateLink') }}
              </el-button>
            </div>
          </el-form>
        </client-only>
      </div>

      <div class="code_content">
        <div class="code_title">
          <div class="code_title_tips">
            <div class="white">{{ $t('api.testCommand') }}</div>
            <div class="red">{{ $t('api.testTips') }}</div>
          </div>
          <div class="button_box">
            <el-button type="primary" size="large" class="green_style" @click="copyUrlHandler">
              {{ $t('api.copyLink') }}
            </el-button>
            <el-button type="primary" size="large" class="red_style" @click="openUrlHandler">
              {{ $t('api.openLink') }}
            </el-button>
          </div>
        </div>
        <div class="code_box">
          {{ generateUrl }}
        </div>
      </div>
      <div class="interface_note">
        <h2>{{ $t('api.interfaceComments') }}</h2>
        <h4>{{ $t('api.useMethod') }}：</h4>
        <el-table :data="paramsInterfaceData">
          <el-table-column prop="name" :label="$t('api.name')" :align="'center'" />
          <el-table-column prop="type" :label="$t('api.type')" :align="'center'" />
          <el-table-column prop="require" :label="$t('api.required')" :align="'center'"
            :formatter="(_, __, value) => `${$t(value)}`" />
          <el-table-column prop="desc" :label="$t('api.description')" :align="'center'"
            :formatter="(_, __, value) => `${$t(value)}`" />
        </el-table>
        <h4>{{ $t('api.resultExample') }}：</h4>
        <pre class="hljs language-json">
                  <span class="hljs-punctuation">{</span>
                    <span class="hljs-attr">"code"</span><span class="hljs-punctuation">:</span><span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-attr">"success"</span><span class="hljs-punctuation">:</span><span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
                    <span class="hljs-attr">"msg"</span><span class="hljs-punctuation">:</span><span class="hljs-string">"0"</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-attr">"data"</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">[</span>
                                  <span class="hljs-punctuation">{</span><span class="hljs-attr">"ip"</span><span class="hljs-punctuation">:</span><span class="hljs-string">"47.244.192.12"</span><span class="hljs-punctuation">,</span><span class="hljs-attr">"port"</span><span class="hljs-punctuation">:</span><span class="hljs-number">16098</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                                  <span class="hljs-punctuation">{</span><span class="hljs-attr">"ip"</span><span class="hljs-punctuation">:</span><span class="hljs-string">"47.244.192.12"</span><span class="hljs-punctuation">,</span><span class="hljs-attr">"port"</span><span class="hljs-punctuation">:</span><span class="hljs-number">15698</span><span class="hljs-punctuation">}</span>
                              <span class="hljs-punctuation">]</span>
                  <span class="hljs-punctuation">}</span>
      </pre>
        <h4>{{ $t('api.resultComment') }}：</h4>
        <el-table :data="resultInterfaceData">
          <el-table-column prop="name" :label="$t('api.name')" :align="'center'" />
          <el-table-column prop="type" :label="$t('api.type')" :align="'center'" />
          <el-table-column prop="desc" :label="$t('api.description')" :align="'center'"
            :formatter="(_, __, value) => `${$t(value)}`" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { RefreshLeft, } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import http, { BASE_URL } from '~/api/http';
//  # 分隔符(1:\r\n 2:/br 3:\r 4:\n 5:\t )
const delimiterOptions = ref([
  { label: '\\r\\n', value: '1' },
  { label: '/br', value: '2' },
  { label: '\\r', value: '3' },
  { label: '\\n', value: '4' },
  { label: '\\t', value: '5' },
])
const numberMax = ref(1000)

const countValue = ref(0)
const regionsList = ref<{ label: string, value: string }[]>([])
const tabName = ref('api.dynamicProxy')
const changeTabHandler = (tab: any) => {
  const currentTab = tabsList.value[tab.index]
  resetData()
  return currentTab.handler()
}
const route = useRoute()
onMounted(() => {
  Promise.all([
    getDynamicResidential(),
    getRotatingDataCenter(),
    getStaticResidential(),
    getStaticDataCenter()
  ]).then(() => {
    switch (route.query.type) {
      case 'RotatingDatacenter':
      case 'rotatingDataCenterProxy':
        tabName.value = 'api.rotatingDataCenterProxy'
        rotatingDataCenterHandler()
        break
      case 'StaticResidential':
      case 'staticResidentialProxy':
        tabName.value = 'api.staticResidentialProxy'
        staticResidentialHandler()
        break
      case 'StaticDatacenter':
      case 'staticDataCenterProxy':
        tabName.value = 'api.staticDataCenterProxy'
        staticDataCenterHandler()
        break
      default:
        tabName.value = 'api.dynamicProxy'
        dynamicResidentialHandler()
    }
  })
})

const refreshHandler = () => {
  const currentTab = tabsList.value.find(tab => tab.label === tabName.value)
  if (!currentTab) return
  currentTab.refreshHandler().then(() =>
    currentTab.handler()
  )
}

const resetData = () => {
  countValue.value = 0
  regionsList.value = []
  generateUrl.value = ''
  form.regions = ''
}
const cookieLang = useCookie('lang')
const dynamicResidentialData = ref<any>({
  numberMax: 1000,
  countValue: 0,
  regionsList: [],
})
const dynamicResidentialHandler = () => {
  numberMax.value = dynamicResidentialData.value.numberMax
  countValue.value = dynamicResidentialData.value.countValue
  regionsList.value = dynamicResidentialData.value.regionsList
  form.num = 100
}
const getDynamicResidential = () =>
  Promise.all([
    http.get('/v1/website/current_user_info'),
    http.get('/v1/website/regions/DynamicResidential')
  ]).then(([flowResult, regionResult]: any) => {
    dynamicResidentialData.value.numberMax = 1000
    const flow = flowResult.DynamicResidentialProxyUsage
    if (flow) {
      dynamicResidentialData.value.countValue = (flow.last_flow) / 1000 || 0
    }

    const countryList = regionResult.country.map((item: any) => {
      return item.list.map((country: any) => {
        return { label: cookieLang.value === 'zh' ? country.name : country.name_en, value: country.code }
      })
    })
    dynamicResidentialData.value.regionsList = countryList.flat()
    dynamicResidentialData.value.regionsList.unshift({ label: 'api.global', value: 'custom' })
  })


const rotatingDataCenterData = ref<any>({
  numberMax: 1000,
  countValue: 0,
  regionsList: [],
})
const rotatingDataCenterHandler = () => {
  numberMax.value = rotatingDataCenterData.value.numberMax
  countValue.value = rotatingDataCenterData.value.countValue
  regionsList.value = rotatingDataCenterData.value.regionsList
  form.num = 100
}
const getRotatingDataCenter = () =>
  Promise.all([
    http.get('/v1/website/overview/RotatingDatacenter'),
    http.get('/v1/website/regions/RotatingDatacenter')
  ]).then(([flowResult, regionResult]: any) => {
    rotatingDataCenterData.value.numberMax = 1000
    rotatingDataCenterData.value.countValue = Math.ceil((parseFloat(flowResult.total_flow) - parseFloat(flowResult.used_flow)) / 1000)
    rotatingDataCenterData.value.regionsList = regionResult.map((item: any) => {
      return { label: cookieLang.value === 'zh' ? item.country_name : item.country_name_en, value: item.country_code }
    })
    rotatingDataCenterData.value.regionsList.unshift({ label: 'api.global', value: 'custom' })
  })


const staticResidentialData = ref<any>({
  numberMax: 1000,
  countValue: 0,
  regionsList: [],
})
const staticResidentialHandler = () => {
  numberMax.value = staticResidentialData.value.numberMax
  countValue.value = staticResidentialData.value.countValue
  regionsList.value = staticResidentialData.value.regionsList
  form.num = staticResidentialData.value.numberMax
}

const getStaticResidential = () =>
  http.get('/v1/website/Usage/StaticDatacenter').then((res: any) => {
    staticResidentialData.value.numberMax = res.quantity
    staticResidentialData.value.countValue = res.quantity
    staticResidentialData.value.regionsList = res.country_list.map((item: string) => {
      return { label: item, value: item }
    })
    staticResidentialData.value.regionsList.unshift({ label: 'api.global', value: 'custom' })
  })

const staticDataCenterData = ref<any>({
  numberMax: 1000,
  countValue: 0,
  regionsList: [],
})
const staticDataCenterHandler = () => {
  numberMax.value = staticDataCenterData.value.numberMax
  countValue.value = staticDataCenterData.value.countValue
  regionsList.value = staticDataCenterData.value.regionsList
  form.num = staticDataCenterData.value.numberMax
}

const getStaticDataCenter = () =>
  http.get('/v1/website/Usage/StaticResidential').then((res: any) => {
    staticDataCenterData.value.numberMax = res.quantity
    staticDataCenterData.value.countValue = res.quantity
    staticDataCenterData.value.regionsList = res.country_list.map((item: string) => {
      return { label: item, value: item }
    })
    staticDataCenterData.value.regionsList.unshift({ label: 'api.global', value: 'custom' })
  })


const tabsList = ref([
  { label: 'api.dynamicProxy', handler: dynamicResidentialHandler, refreshHandler: getDynamicResidential, valueLabel: 'api.trafficRemain', unit: 'api.MB', generateUrl: '/v1/website/generate/DynamicResidential' },
  { label: 'api.rotatingDataCenterProxy', handler: rotatingDataCenterHandler, refreshHandler: getRotatingDataCenter, valueLabel: 'api.trafficRemain', unit: 'api.GB', generateUrl: '/v1/website/generate/RotatingDatacenter' },
  { label: 'api.staticResidentialProxy', handler: staticResidentialHandler, refreshHandler: getStaticResidential, valueLabel: 'api.totalAvailable', unit: 'api.IP', generateUrl: '/v1/website/generate/StaticResidential' },
  { label: 'api.staticDataCenterProxy', handler: staticDataCenterHandler, refreshHandler: getStaticDataCenter, valueLabel: 'api.totalAvailable', unit: 'api.IP', generateUrl: '/v1/website/generate/StaticDatacenter' },
])

const form = reactive({
  num: 1,
  regions: '',
  protocol: 'HTTP/HTTPS',
  dataType: 'json',
  delimiter: '1',
})

const generateUrl = ref('')
const generateUrlHandler = () => {
  const params: any = cloneDeep(form)
  params.username = 'admin'
  const baseUrl = BASE_URL
  // 拼接url
  generateUrl.value = `${baseUrl}${tabsList.value[0].generateUrl}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
}
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
// 打开链接
const openUrlHandler = () => {
  if (!generateUrl.value) return ElMessage.error('请先生成链接')
  window.open(generateUrl.value)
}

// form 数据结构类型
const paramsInterfaceData = ref([
  { name: 'num', type: 'int', require: 'api.yes', desc: 'api.ipCount' },
  { name: 'regions', type: 'string', require: 'api.yes', desc: 'api.region' },
  { name: 'protocol', type: 'string', require: 'api.yes', desc: 'api.paramProtocal' },
  { name: 'dataType', type: 'string', require: 'api.yes', desc: 'api.dataType' },
  { name: 'delimiter', type: 'string', require: 'api.yes', desc: 'api.delimiterType' },
  { name: 'username', type: 'string', require: 'api.yes', desc: 'api.username' },
])

const resultInterfaceData = ref([
  { name: 'IP', type: 'int', desc: 'api.ipAddress' },
  { name: 'PORT', type: 'int', desc: 'api.port' },
])

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
    justify-content: space-between;
    align-items: center;

    >.el-button {
      margin-right: 20px;
      width: 40px;
      height: 40px;
    }

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

  .ip_gen_box {
    padding-bottom: 20px;

    .el-form {
      display: flex;
      justify-content: space-between;

    }

    .el-form-item {
      flex: 1;
    }

    .gen_button_box {
      display: flex;
      justify-content: flex-end;
      margin-top: 34px;

      .el-button {
        width: 150px;
      }

    }
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
    // 省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

}

.interface_note {
  h2 {
    margin-top: 32px;
    font-size: 18px;
    font-weight: 700;
    color: #25497b;
  }

  h4 {
    font-size: 14px;
    text-align: left;
    margin-bottom: 20px;
  }

  .hljs {
    background: #11171a;
    color: hsla(0, 0%, 100%, .85098);
    font-size: 14px;
    line-height: 1.5;
    padding: 20px;
    font-family: Courier, monospace;
  }
}
</style>


<style lang="scss">
.allow_list_wrapper {
  .el-input-number {
    width: 100%;

    .el-input__inner {
      text-align: left;
    }
  }

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
      min-height: 70px;
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
