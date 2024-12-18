<template>
  <div class="bg">
    <div class="panel_item">
      <div class="panel_title_bar">
        <div class="panel_title">Processor</div>
        <div class="panel_title_value">{{ store.data.processorData.name }}</div>
      </div>
      <div class="panel_static">
        <div class="info_panel">
          <div class="info_item">Frequency: {{ freqConvert() }}</div>
          <div class="info_item">Cores: {{ store.data.processorData.pysicalCount }}</div>
          <div class="info_item">Threads: {{ store.data.processorData.logicalCount }}</div>
        </div>
        <div class="processor_usage">
          <div class="chart" ref="usageRef"></div>
        </div>
      </div>
    </div>
    <div class="panel_item">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import useStore from '../hooks/store';
import * as echarts from 'echarts';

const store=useStore();

const freqConvert=()=>{
  return (store.data.processorData.baseFreq/1000).toFixed(2).toString()+' GHz'
}

const usageRef=ref(null);
let chartInstance: echarts.ECharts | null=null;

const updateChart=(data: number[])=>{
  if(chartInstance){
    const option = {
      title: {
        text: "Processor Usage",
      },
      animation: false,
      xAxis: {
        data: store.processorUsage.map(()=>{
          return ""
        })
      },
      yAxis: {
        min: 0,
        max: 100,
      },
      series: [
        {
          data: data,
          showSymbol:false,
          type: 'line',
          areaStyle: {
            color: 'skyblue',
            opacity: 0.5
          }
        }
      ]
    };
    chartInstance.setOption(option);
  }
}

const initChart=()=>{
  if(usageRef.value){
    chartInstance = echarts.init(usageRef.value);
    updateChart(store.processorUsage);
  }
}

onMounted(()=>{
  initChart();
})

watch(store.processorUsage, (newData) => {
  if (chartInstance) {
    updateChart(newData);
  }
});


</script>

<style scoped>
.chart{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50px;
  top: 30px;
}
.info_panel{
  padding-top: 10px;
}
.processor_usage{
  margin-bottom: 20px;
  margin-top: 10px;
  position: relative;
}
.info_item{
  margin-top: 5px;
}
.panel_static{
  display: grid;
  grid-template-columns: 200px auto;
  height: 100%;
}
.panel_title_value{
  margin-left: auto;
}
.panel_title_bar{
  font-size: 18px;
  display: flex;
}
.panel_item{
  border-radius: 10px;
  height: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}
.bg{
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
</style>