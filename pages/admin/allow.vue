<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('allowlist.allowListTitle') }}</h1>
    </div>
    <div class="allow_list_body">
      <div class="ip_box">
        <h3>{{ $t('allowlist.currentIP') }}</h3>
        <p>{{ currentIP }}</p>
      </div>
      <div class="table_wrapper">
        <div class="add_box">
          <el-input v-model="newInput" size="large" :placeholder="$t('allowlist.addInputPlaceholder')">
            <template #append>
              <el-button @click="addHandler"> {{ $t('allowlist.add') }} </el-button>
            </template>
          </el-input>
        </div>
        <el-table v-loading="loading" :data="tableData" :border="true" cell-class-name="list_cell_custom"
          header-cell-class-name="header_cell_custom">
          <el-table-column prop="ip" :align="'center'" :label="$t('allowlist.ipAddress')" />
          <el-table-column prop="create_time" :label="$t('allowlist.addTime')" :align="'center'"
            :formatter="(__, _, value) => formatShowTime(value)" />
          <el-table-column prop="remarks" :label="$t('allowlist.remark')" :align="'center'" />
          <el-table-column :label="$t('allowlist.operate')" :align="'center'">
            <template #default="scope">
              <el-icon class="option_btn" @click="() => editHandler(scope.row)">
                <Edit />
              </el-icon>
              <el-icon class="option_btn" @click="() => deleteHandler(scope.row.ip)">
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
import { Delete, Edit } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import http from '~/api/http';
import { formatShowTime } from '~/utils/form';
const tableData = ref([])
const loading = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
const currentIP = ref('')
onMounted(() => {
  http.get('/v1/website/current_user_info')
    .then((res: any) => {
      currentIP.value = res.CurrentIP || ''
    })
  init()
})
const init = () => {
  pagination.currentPage = 1
  pagination.pageSize = 10
  getDataByPage()
}
const getDataByPage = () => {
  loading.value = true
  http.get('/v1/website/white_list_get',
    { params: { cur_page: pagination.currentPage, page_size: pagination.pageSize } }
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
const newInput = ref('')
const form = reactive({
  ip: '',
  remarks: ''
})
const addHandler = () => {
  // 校验ip 正则
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(newInput.value)) {
    ElMessage.error('IP format is incorrect')
    return
  }
  loading.value = true
  http.post('/v1/website/white_list_add', { ip: newInput.value, remarks: '' })
    .then(() => {
      ElMessage.success('IP successfully added')
      newInput.value = ''
      return getDataByPage()
    })
    .finally(() => {
      loading.value = false
    })
}

const dialogVisible = ref(false)

const editHandler = (row: any) => {
  form.ip = row.ip
  form.remarks = row.remarks
  dialogVisible.value = true
}

const deleteHandler = (ip: string) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this IP?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => http.delete(`/v1/website/white_list_delete`, { data: { ip } }))
    .then(() => {
      ElMessage.success('IP successfully deleted')
      return getDataByPage()
    })
    .catch(() => {
      console.info('Cancel deletion')
    })
}

const submitHandler = () => {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(form.ip)) {
    ElMessage.error('IP format is incorrect')
    return
  }
  loading.value = true
  http.post('/v1/website/white_list_edit', form)
    .then(() => {
      ElMessage.success('IP successfully updated')
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
    width: 560px;

    .el-button {
      width: 160px;
      background-color: #316BFF;
      color: #fff;
      font-size: 16px;
      height: 40px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
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
