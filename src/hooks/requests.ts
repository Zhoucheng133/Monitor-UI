import { storeToRefs } from "pinia";
import store from "./store";
import axios from "axios";
import baseurl from "./baseurl";
import { StaticData } from "./interfaces";

export async function initData(){
  let { data }=storeToRefs(store());

  const response=(await axios.get(`${baseurl}/api/get`)).data as StaticData;
  
  data.value.diskData=response.diskData;
  data.value.processorData=response.processorData;
  data.value.ramData=response.ramData;
  data.value.systemData=response.systemData;

  store().initSocket();
}