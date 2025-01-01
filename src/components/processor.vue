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
          <div class="cpu_chart" ref="cpuRef"></div>
        </div>
      </div>
    </div>
    <div class="panel_item">
      <div class="panel_title_bar">
        <div class="panel_title">Disk</div>
        <div class="panel_title_value">{{ store.data.diskData[0]==undefined ? "":store.data.diskData[0].name }}</div>
      </div>
      <div class="disk_info">
        <div class="disk_usage">
          <div class="disk_chart" ref="diskRef"></div>
        </div>
        <div class="disk_text">
          <div class="disk_label">Total</div>
          <div class="disk_content">{{ formatBytes(store.data.diskData[0].total, "MB") }}</div>
          <div class="disk_label" style="margin-top: 10px; color: lightgrey;">Used</div>
          <div class="disk_content" style="color: lightgrey;">{{ formatBytes(store.data.diskData[0].used, "MB") }}</div>
          <div class="disk_label" style="margin-top: 10px; color: skyblue;">Free</div>
          <div class="disk_content" style="color: skyblue;">{{  formatBytes(store.data.diskData[0].total - store.data.diskData[0].used, "MB") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import useStore from '../hooks/store';
import * as echarts from 'echarts';
import { DiskData } from '../hooks/interfaces';
import { formatBytes } from '../hooks/cals';

const store=useStore();

const freqConvert=()=>{
  return (store.data.processorData.baseFreq/1000).toFixed(2).toString()+' GHz'
}

const cpuRef=ref(null);
const diskRef=ref(null);
let chartInstance: echarts.ECharts | null=null;
let chartInstance2: echarts.ECharts | null=null;

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

const initDiskChart=(data: DiskData[])=>{
  if(chartInstance2){
    const option = {
      title: {
        left: 'center',
        top: 'center'
      },
      series: [
        {
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          clockwise: false,
          type: 'pie',
          data: [
            {
              value: data[0].used,
              itemStyle: { color: 'lightgrey' }
            },
            {
              value: data[0].total - data[0].used,
              itemStyle: { color: 'skyblue' }
            },
          ],
          radius: ['40%', '70%']
        }
      ]
    };
    chartInstance2.setOption(option);
  }
}

const initChart=()=>{
  if(cpuRef.value){
    chartInstance = echarts.init(cpuRef.value);
    updateChart(store.processorUsage);
  }
  if(diskRef.value){
    chartInstance2=echarts.init(diskRef.value);
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

watch(store.data, (newData)=>{
  if(diskRef.value){
    initDiskChart(newData.diskData);
  }
})


</script>

<style scoped>
.disk_text{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.disk_info{
  display: grid;
  grid-template-columns: auto 100px;
  height: 100%;
}
.disk_chart{
  position: absolute;
  width: 100%;
  height: 100%;
}
.cpu_chart{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50px;
  top: 30px;
}
.info_panel{
  padding-top: 10px;
}
.disk_usage{
  position: relative;
  height: 100%;
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