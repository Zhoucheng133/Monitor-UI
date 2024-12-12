<template>
  <div class="baseInfo">
    <div class="infoContainer" style="background-color: black; color: white;">
      <div class="infofont">System</div>
      <div class="valuefont">{{ data.systemData.family }}</div>
    </div>
    <div class="infoContainer">
      <div class="infofont">Version</div>
      <div class="valuefont">{{ data.systemData.version }}</div>
    </div>
    <div class="infoContainer">
      <div class="infofont">Manufacturer</div>
      <div class="valuefont">{{ data.systemData.manufacturer }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import store from '../hooks/store';

let { data }=storeToRefs(store());


</script>

<style scoped>
.valuefont{
  margin-top: 10px;
  font-weight: bold;
  font-size: 30px;
}
.infoContainer{
  border-radius: 10px;
  height: 150px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.baseInfo{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 10px;
}
</style>