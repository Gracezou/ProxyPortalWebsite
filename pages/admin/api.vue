<template>
  <div class="allow_list_wrapper">
    <div class="allow_list_header">
      <h1>{{ $t('dynamic.history.title') }}</h1>
    </div>
    <div class="allow_list_body">
      <el-button @click="generateUrl">
        1232
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import http from '~/api/http';
onMounted(() => {
  init()
})
const regionsList = ref([])
const loading = ref(false)
const init = () => {
  loading.value = true
  http.get('/v1/website/Usage/StaticDatacenter').then((res: any) => {
    regionsList.value = res.country_list
    // tableData.value = res.cur_data
    // pagination.total = res.page_info.total_data
  }).finally(() => {
    loading.value = false
  })
}

const generateUrl = () => {
  loading.value = true
  const params = {
    num: 3,
    regions: regionsList.value[0],
    protocol: 'HTTP/HTTPS',
    dataType: 'json',
    delimiter: '1',
    username: 'Rubyv53jc914yqsb12kpigb6'
  }
  http.get('/v1/website/generate/StaticDatacenter', { params }).then((res: any) => {
    // tableData.value = res.cur_data
    // pagination.total = res.page_info.total_data
  }).finally(() => {
    loading.value = false
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
  }
}
</style>
