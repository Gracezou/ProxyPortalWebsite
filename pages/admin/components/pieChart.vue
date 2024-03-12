<template>
  <div ref="chart" style="width: 275px; height: 275px;"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { isEmpty } from 'lodash-es';
import { ref } from 'vue';
const props = defineProps({
  option: Object
})
const chart = ref(null)

watchEffect(() => {
  if (!isEmpty(props.option)) {
    const myChart = echarts.init(chart.value)
    const options = getOptions(props.option)
    myChart.setOption(options)
  }
})

const getOptions = (data: any) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    title: {
      text: 'Total:\n' + data.total_flow,
      x: 'center',
      y: 'center',
      textStyle: {
        fontSize: 18
      }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: data.use_flow, name: 'Used Flow' },
        { value: data.last_flow, name: 'Last Flow' },
      ]
    }]
  }
}
</script>
