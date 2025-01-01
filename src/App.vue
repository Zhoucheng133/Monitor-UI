<template>
  <div class="content">
    <div class="hello">Welcome back!</div>
    <div class="subtitle">Monitor Panel</div>
    <baseinfo/>
    <processor style="margin-top: 30px;" />
    <ram style="margin-top: 30px;"/>
  </div>
</template>

<script lang="ts" setup>
import { initData } from './hooks/requests';
import baseinfo from './components/baseinfo.vue';
import processor from './components/processor.vue';
import ram from './components/ram.vue';

initData();

</script>

<style>
body{
  display: flex;
  justify-content: center;
  background-color: rgb(250, 250, 250);
}
</style>

<style scoped>
.hello{
  font-size: 30px;
}
.content{
  width: 1200px;
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: Lucida Console;
}
@media screen and (max-width: 1200px) {
  .content {
    width: 100vw;
  }
}
</style>