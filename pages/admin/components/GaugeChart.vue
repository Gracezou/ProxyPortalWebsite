<template>
  <div ref="chart" style="width: 475px; height: 355px;"></div>
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
    series: [
      {
        type: 'gauge',
        max: data.total_flow,
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 13,
          color: '#999',
          fontSize: 10,
          formatter: function (value: string | number) {
            return Number(value).toFixed(2);
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 10,
          itemStyle: {
            borderWidth: 12
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: data.use_flow,
          }
        ]
      }
    ]
  }
}
</script>
