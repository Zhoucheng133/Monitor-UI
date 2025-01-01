<template>
  <div class="bg">
    <div class="chart" ref="chartRef"></div>
    <div class="info">
      <div class="info_item" style="margin-top: 0;">Total: {{ formatBytes(store.data.ramData.total, "MB") }}</div>
      <div class="info_item" style="color: lightgrey;">Used: {{ formatBytes(store.data.ramData.total - store.data.ramData.available, "MB") }}</div>
      <div class="info_item" style="color: skyblue;">Available: {{ formatBytes(store.data.ramData.available, "MB") }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import { formatBytes } from '../hooks/cals';
import useStore from '../hooks/store';
import * as echarts from 'echarts';
import { RamData } from '../hooks/interfaces';

const store=useStore();
const chartRef=ref(null);
let chartInstance: echarts.ECharts | null=null;

const updateChart=(ramData: RamData)=>{
  if(chartInstance){
    const option = {
      grid: {
        left: '3%',
        right: '4%',
        top: '30%',
        bottom: '30%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'category',
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      legend: { show: false },
      tooltip: { show: false },
      series: [
        {
          name: 'used',
          type: 'bar',
          stack: 'ram',
          data: [ramData.total- ramData.available],
          itemStyle: { color: 'lightgrey' }
        },
        {
          name: 'avaliable',
          type: 'bar',
          stack: 'ram',
          data: [ramData.available],
          itemStyle: { color: 'skyblue' }
        },
      ],
      animationType: 'scale',
    };
    chartInstance.setOption(option);
  }
}

const initChart=()=>{
  if(chartRef.value){
    chartInstance = echarts.init(chartRef.value);
    updateChart(store.data.ramData);
  }
}

onMounted(()=>{
  initChart();
})

watch(store.data, (newData) => {
  if (chartInstance) {
    updateChart(newData.ramData);
  }
});

</script>

<style scoped>
.chart{
  height: 100%;
  width: 100%;
}
.info_item{
  margin-top: 10px;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.bg{
  display: grid;
  grid-template-columns: auto 150px;
  gap: 20px;
  border-radius: 10px;
  height: 150px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}
</style>