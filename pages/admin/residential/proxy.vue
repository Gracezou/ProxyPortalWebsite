<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('residential.proxy.title') }}</h1>
    </div>
    <div class="allow_list_body">
      <div class="table_wrapper">
        <div class="add_box">
          <client-only>
            <el-select v-model="keywordsType" size="large">
              <el-option v-for="item in keywordsTypeOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </client-only>

          <el-input v-model="keywords" size="large" @keydown.enter="init">
            <template #append>
              <el-button @click="init"> {{ $t('residential.proxy.search') }} </el-button>
            </template>
          </el-input>
          <client-only>
            <el-select v-model="proxyStatus" size="large" clearable>
              <el-option v-for="item in proxyStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </client-only>
          <client-only>
            <el-select v-model="autoRenewStatus" size="large" clearable>
              <el-option v-for="item in autoRenewStatusOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </client-only>
          <el-button @click="init"> {{ $t('residential.proxy.search') }} </el-button>
          <el-button @click="resetHandler"> {{ $t('residential.proxy.reset') }} </el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" :border="true" cell-class-name="list_cell_custom"
          header-cell-class-name="header_cell_custom">
          <el-table-column prop="IP" :align="'center'" :label="$t('residential.proxy.ip')" />
          <el-table-column prop="Port" :align="'center'" :label="$t('residential.proxy.port')" />
          <el-table-column prop="Region" :label="$t('residential.proxy.countryRegion')" :align="'center'" />
          <el-table-column prop="PaymentTime" :label="$t('residential.proxy.paymentTime')" :align="'center'"
            :formatter="parseTime" />
          <el-table-column prop="ExpireTime" :label="$t('residential.proxy.expiredTime')" :align="'center'"
            :formatter="parseTime" />
          <el-table-column prop="Status" :label="$t('residential.proxy.status')" :align="'center'"
            :formatter="parseStatus" />
          <el-table-column prop="AutoRenew" :label="$t('residential.proxy.autoRenew')" :align="'center'"
            :formatter="parseAuto" />
          <el-table-column prop="Remarks" :label="$t('residential.proxy.remark')" :align="'center'"
            show-overflow-tooltip />
          <el-table-column :label="$t('residential.proxy.operate')" :align="'center'">

            <template #default="scope">
              <div class="operation_box">
                <el-switch v-model="scope.row.renew" :loading="loading"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  :before-change="() => changeAutoRenew(scope.row)" />
                <el-icon size="20" class="option_btn" @click="() => editHandler(scope.row)">
                  <Edit />
                </el-icon>
              </div>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagination.total"
          @current-change="changePageHandler" />
      </div>
    </div>

    <client-only>
      <el-dialog v-model="dialogVisible" :title="$t('allowlist.editRemark')" width="500" destroy-on-close center>
        <el-form label-position="top" label-width="auto">
          <el-form-item label="Remarks">
            <el-input v-model="form.remarks" />
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submitHandler" v-loading="loading">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import { Edit } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import http from '~/api/http';
const tableData = ref([])
const loading = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
onMounted(() => {
  init()
})

const parseTime = (_row: any, _column: any, time: number) => {
  return new Date(time * 1000).toLocaleString()
}
const parseStatus = (_row: any, _column: any, status: number) => {
  return status === 0 ? 'Expired' : 'Using'
}
const parseAuto = (_row: any, _column: any, auto: boolean) => {
  return auto ? 'On' : 'Off'
}

const init = () => {
  pagination.currentPage = 1
  pagination.pageSize = 10
  getDataByPage()
}
const keywords = ref('')
const keywordsType = ref('IP')
const keywordsTypeOptions = [
  { value: 'IP', label: 'IP' },
  { value: 'Port', label: 'Port' },
  { value: 'Region', label: 'Region' },
  { value: 'Remarks', label: 'Remarks' },
]
const proxyStatus = ref('')
const proxyStatusOptions = [
  { value: '0', label: 'Expired' },
  { value: '1', label: 'Using' },
]
const autoRenewStatus = ref('')
const autoRenewStatusOptions = [
  { value: '0', label: 'Off' },
  { value: '1', label: 'On' },
]

const resetHandler = () => {
  keywordsType.value = 'IP'
  keywords.value = ''
  proxyStatus.value = ''
  autoRenewStatus.value = ''
  init()
}
const getDataByPage = () => {
  loading.value = true
  const params: any = {
    Keywords: keywords.value,
    KeywordsType: keywordsType.value,
    cur_page: pagination.currentPage,
    page_size: pagination.pageSize,
  }
  if (proxyStatus.value) {
    params.ProxyStatus = proxyStatus.value
  }
  if (autoRenewStatus.value) {
    params.AutoRenewStatus = autoRenewStatus.value
  }
  http.get('/v1/website/proxy_manage/StaticResidential/get',
    { params }
  ).then((res: any) => {
    tableData.value = cloneDeep(res.cur_data).map((item: any) => {
      item.renew = item.AutoRenew === 1
      return item
    })
    pagination.total = res.page_info.total_data
  }).finally(() => {
    loading.value = false
  })
}
const changePageHandler = (val: number) => {
  pagination.currentPage = val
  getDataByPage()
}


const form = reactive({
  ip: '',
  remarks: '',
  autoRenew: false
})

const dialogVisible = ref(false)
const editHandler = (row: any) => {
  form.ip = row.IP
  form.autoRenew = row.AutoRenew
  form.remarks = row.Remarks
  dialogVisible.value = true
}

const changeAutoRenew = (row: any) => {
  form.ip = row.IP
  form.autoRenew = !row.AutoRenew
  form.remarks = row.Remarks
  submitHandler()
  return false
}

const submitHandler = () => {
  loading.value = true
  http.post('/v1/website/proxy_manage/StaticResidential/edit', form)
    .then(() => {
      ElMessage.success('Success')
      dialogVisible.value = false
      getDataByPage()
    }).finally(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
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
  }

  .ip_box {
    background-color: #223265;
    height: 138px;
    color: #fff;
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: 600;
    box-sizing: border-box;
    margin-bottom: 25px;

    h3 {
      border-bottom: 1px solid #fff;
      line-height: 42px;
      font-size: 28px;
      margin: 0;
    }

    p {
      margin: 0;
      font-size: 48px;
      line-height: 72px;
    }
  }

  .table_wrapper {
    border-radius: 8px;
    background-color: #fff;
    padding-top: 27px;
    padding-bottom: 50px;
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
  }

  .add_box {
    margin-bottom: 25px;
    margin-bottom: 33px;
    display: flex;
    flex-direction: row;

    .el-button {
      width: 160px;
      background-color: #316BFF;
      color: #fff;
      font-size: 16px;
      height: 40px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    >.el-button {
      border-radius: 5px;
      width: 224px;
      margin-left: 40px;
    }

    .el-input {
      margin: 0 20px;
      flex: 1;
    }

    .el-date-editor {
      width: 300px;
    }
  }

  .el-table {
    margin-bottom: 25px;
  }

  .el-pagination {
    margin-left: auto;
    margin-right: 25px;
  }

  .option_btn {
    cursor: pointer;
    margin: 8px;
  }

}
</style>

<style lang="scss">
.allow_list_wrapper {
  .operation_box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px
  }

  .el-select {
    width: 200px;
    margin-right: 20px;
  }

  .list_cell_custom {

    .cell {
      line-height: 30px;
      color: #333333;
      font-size: 13px;
    }
  }

  .header_cell_custom {
    padding: 0;

    .cell {
      line-height: 46px;
      background-color: #F2F2F2;
    }

  }
}
</style>
