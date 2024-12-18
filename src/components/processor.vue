<template>
  <div class="bg">
    <div class="panel_item">
      <div class="panel_title_bar">
        <div class="panel_title">Processor</div>
        <div class="panel_title_value">{{ store().data.processorData.name }}</div>
      </div>
      <div class="panel_static">
        <div class="info_panel">
          <div class="info_item">Frequency: {{ freqConvert() }}</div>
          <div class="info_item">Cores: {{ store().data.processorData.pysicalCount }}</div>
          <div class="info_item">Threads: {{ store().data.processorData.logicalCount }}</div>
        </div>
        <div class="processor_usage">

        </div>
      </div>
    </div>
    <div class="panel_item">
      
    </div>
  </div>
</template>

<script setup>
import store from '../hooks/store';

const freqConvert=()=>{
  return (store().data.processorData.baseFreq/1000).toFixed(2).toString()+' GHz'
}

</script>

<style scoped>
.info_panel{
  padding-top: 10px;
}
.processor_usage{
  margin-bottom: 20px;
  margin-top: 10px;
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