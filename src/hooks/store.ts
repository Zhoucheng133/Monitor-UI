import { defineStore } from "pinia";
import { Data, WsData } from "./interfaces";
import { ref } from "vue";
import baseurl from "./baseurl";

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
  })

  var processorUsage=ref<number[]>([]);

  var socket: WebSocket;

  const initSocket=()=>{
    socket=new WebSocket(`ws://${baseurl}/ws`);
    socket.onopen=()=>{
      socket.send('ws_request');
    }
    socket.onmessage=(event)=>{
      const response: WsData=JSON.parse(event.data);
      data.value.processorData=response.processorData;
      data.value.ramData=response.ramData;
      if(processorUsage.value.length>30){
        processorUsage.value.shift();
      }
      processorUsage.value.push(Math.round(response.processorData.usage*100))
    }
  }

  return {data, initSocket, processorUsage}
})