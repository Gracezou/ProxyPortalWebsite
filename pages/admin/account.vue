<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('subAccount.subAccount') }}</h1>
    </div>
    <div class="allow_list_body">
      <div class="table_wrapper" v-loading="loading">
        <div class="add_box">
          <el-input v-model="searchKey" size="large" :placeholder="$t('subAccount.searchInput')" @keydown.enter="init">
            <template #append>
              <el-button @click="init"> {{ $t('subAccount.searchBtn') }} </el-button>
            </template>
          </el-input>
          <el-button @click="addHandler"> {{ $t('subAccount.addSubAccount') }} </el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" :border="true" cell-class-name="list_cell_custom"
          header-cell-class-name="header_cell_custom">
          <el-table-column prop="account" :align="'center'" :label="$t('subAccount.userName')" />
          <el-table-column prop="state" :label="$t('subAccount.status')" :align="'center'">
            <template #default="scope">
              <el-text v-if="scope.row.state == 1" type="success">Active</el-text>
              <el-text v-else-if="scope.row.state == 0" type="danger">Disabled</el-text>
              <el-text v-else type="info">Unknown</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="limit_flow" :label="`${$t('subAccount.trafficLimit')}  (M)`" :align="'center'"
            :formatter="(__, _, value) => parseInt(value).toFixed(2)" />
          <el-table-column prop="consumed_flow" :label="`${$t('subAccount.trafficUsed')}  (M)`" :align="'center'" />
          <el-table-column prop="remark" :label="$t('subAccount.remark')" :align="'center'" />
          <el-table-column prop="create_time" :label="$t('subAccount.addTime')" :align="'center'"
            :formatter="(__, _, value) => formatShowTime(value)" />
          <el-table-column :label="$t('subAccount.operate')" :align="'center'">
            <template #default="scope">
              <el-icon class="option_btn" @click="() => changeStateHandler(scope.row)">
                <Lock />
              </el-icon>
              <el-icon class="option_btn" @click="() => editHandler(scope.row)">
                <Edit />
              </el-icon>
              <el-icon class="option_btn" @click="() => deleteHandler(scope.row.id)">
                <Delete />
              </el-icon>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagination.total"
          @current-change="changePageHandler" />
      </div>
    </div>
    <client-only>
      <el-dialog v-model="dialogVisible"
        :title="editCurrentRowId ? $t('subAccount.updateSubAccount') : $t('subAccount.createSubAccount')" width="500"
        destroy-on-close center>
        <el-form label-position="top" label-width="auto">
          <el-form-item :label="$t('subAccount.userName')">
            <el-input v-model="form.sub_username" :placeholder="$t('subAccount.userNamePlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('subAccount.password')">
            <el-input v-model="form.sub_password" :placeholder="$t('subAccount.passwordPlaceholder')" />
          </el-form-item>
          <el-form-item :label="`${$t('subAccount.trafficLimit')}(M)`">
            <el-input-number v-model="form.limit" :controls="false" :precision="2" />
          </el-form-item>
          <el-form-item :label="$t('subAccount.remark')">
            <el-input :rows="3" type="textarea" v-model="form.remark" />
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
import { Delete, Edit, Lock } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import http from '~/api/http';
import { formObjectInit, formatShowTime } from '~/utils/form';
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
const init = () => {
  pagination.currentPage = 1
  pagination.pageSize = 10
  getDataByPage()
}
const searchKey = ref('')
const getDataByPage = () => {
  loading.value = true
  http.get('/v1/website/get_sub_account_list',
    { params: { keywords: searchKey.value, cur_page: pagination.currentPage, page_size: pagination.pageSize } }
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
const form = reactive({
  "sub_username": "",
  "sub_password": "",
  "remark": "",
  "limit": 0,
  state: 1
})

const dialogVisible = ref(false)
const editCurrentRowId = ref('')
const addHandler = () => {
  formObjectInit(form)
  dialogVisible.value = true
}
const editHandler = (row: any) => {
  form.limit = parseFloat(row.limit_flow)
  form.sub_username = row.account
  form.sub_password = row.password
  form.state = row.state
  editCurrentRowId.value = row.id
  dialogVisible.value = true
}

const deleteHandler = (id: string) => {
  ElMessageBox.confirm(
    'Sub Account will permanently deleted. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => http.delete(`/v1/website/delete_sub_account`, { data: { id } }))
    .then(() => {
      ElMessage.success('Sub Account successfully deleted')
      return getDataByPage()
    })
    .catch(() => {
      console.info('Cancel deletion')
    })
}

const changeStateHandler = (row: any) => {
  const params = {
    id: row.id,
    limit: row.limit_flow,
    sub_username: row.account,
    sub_password: row.password,
    remark: row.remark,
    state: row.state === 1 ? 0 : 1
  }
  params.limit = row.limit_flow
  http.post('/v1/website/edit_sub_account', params)
    .then(() => {
      ElMessage.success('Sub Account successfully updated')
      return getDataByPage()
    })
}

const submitHandler = () => {
  loading.value = true
  Promise.resolve(
    editCurrentRowId.value
      ? http.post('/v1/website/edit_sub_account', { ...form, id: editCurrentRowId.value })
      : http.post('/v1/website/add_sub_account', form))
    .then(() => {
      ElMessage.success(editCurrentRowId.value ? 'Sub Account successfully edited' : 'Sub Account successfully added')
      dialogVisible.value = false
      return getDataByPage()
    })
    .finally(() => {
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
    margin: 0 25px;
    margin-bottom: 33px;
    width: 804px;
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
