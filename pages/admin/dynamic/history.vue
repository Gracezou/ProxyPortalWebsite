<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('dynamic.history.title') }}</h1>
    </div>
    <div class="allow_list_body">
      <div class="table_wrapper">
        <div class="add_box">
          <client-only>
            <el-date-picker v-model="daterange" type="daterange" range-separator="To"
              :start-placeholder="$t('dynamic.history.startTime')" :end-placeholder="$t('dynamic.history.endTime')"
              size="large" value-format="x" />
          </client-only>
          <el-input v-model="searchKey" size="large" :placeholder="$t('dynamic.history.orderIdPlaceholder')"
            @keydown.enter="init">
            <template #append>
              <el-button @click="init"> {{ $t('dynamic.history.searchBtn') }} </el-button>
            </template>
          </el-input>
          <el-button @click="resetHandler"> {{ $t('dynamic.history.resetBtn') }} </el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" :border="true" cell-class-name="list_cell_custom"
          header-cell-class-name="header_cell_custom">
          <el-table-column prop="OrderID" :align="'center'" :label="$t('dynamic.history.orderId')" />
          <el-table-column prop="Amount" :align="'center'" :label="$t('dynamic.history.orderAmount')" />
          <el-table-column prop="PaymentMethod" :label="$t('dynamic.history.paymentMethod')" :align="'center'" />
          <el-table-column prop="PackageTraffic" :label="$t('dynamic.history.packagedTraffic')" :align="'center'" />
          <el-table-column prop="GiftTraffic" :label="$t('dynamic.history.giftTraffic')" :align="'center'" />
          <el-table-column prop="Duration" :label="$t('dynamic.history.duration')" :align="'center'" />
          <el-table-column prop="ExpireTime" :label="$t('dynamic.history.expiredTime')" :align="'center'" />
          <el-table-column prop="PaymentTime" :label="$t('dynamic.history.paymentTime')" :align="'center'" />
          <el-table-column prop="PaymentStatus" :label="$t('dynamic.history.paymentStatus')" :align="'center'"
            :formatter="parsePaymentStatus" />
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagination.total"
          @current-change="changePageHandler" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
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
const parsePaymentStatus = (_row: any, _column: any, status: number) => {
  return status === 1 ? 'Paid' : status === 0 ? 'Unpaid' : 'Closed'
}
const init = () => {
  pagination.currentPage = 1
  pagination.pageSize = 10
  getDataByPage()
}
const resetHandler = () => {
  searchKey.value = ''
  daterange.value = ''
  init()
}
const daterange = ref('')
const searchKey = ref('')
const getDataByPage = () => {
  loading.value = true
  const params: any = {
    keywords: searchKey.value,
    cur_page: pagination.currentPage,
    page_size: pagination.pageSize,
  }
  if (daterange.value) {
    const [start_time, end_time] = daterange.value
    params.start_time = parseInt(start_time) / 1000
    params.end_time = parseInt(end_time) / 1000
  }
  http.get('/v1/website/payment_history/DynamicResidential',
    { params }
  ).then((res: any) => {
    tableData.value = res.cur_data
    pagination.total = res.page_info.total_data
  }).finally(() => {
    loading.value = false
  })
}
const changePageHandler = (val: number) => {
  pagination.currentPage = val
  getDataByPage()
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
    margin: 0 25px;
    margin-bottom: 33px;
    width: 1204px;
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
      margin-left: 20px;
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
  .el-input-number {
    width: 100%;

    .el-input__inner {
      text-align: left;
    }
  }

  .el-date-editor {
    width: 300px;
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
