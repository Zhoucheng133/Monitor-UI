import { defineStore } from "pinia";
import { Data } from "./interfaces";
import { ref } from "vue";

export default defineStore("data", ()=>{
  var data=ref<Data>({
    systemData: {
      family: '',
      manufacturer: '',
      version: ''
    },
    processorData: {
      name: '',
      pysicalCount: 0,
      logicalCount: 0,
      baseFreq: 0,
      usage: 0
    },
    ramData: {
      total: 0,
      available: 0
    },
    diskData: [],
    networkData: []
  })

  return {data}
})