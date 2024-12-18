export interface Data{
  systemData: SystemData,
  processorData: ProcessorData,
  ramData: RamData
  diskData: DiskData[],
}

export interface StaticData{
  systemData: SystemData,
  processorData: ProcessorData,
  ramData: RamData
  diskData: DiskData[],
}

export interface WsData{
  ramData: RamData,
  processorData: ProcessorData,
}

interface SystemData{
  family: string,
  manufacturer: string,
  version: string,
}

interface ProcessorData{
  name: string,
  pysicalCount: number,
  logicalCount: number,
  baseFreq: number,
  usage: number
}

interface RamData{
  total: number,
  available: number,
}

interface DiskData{
  name: string,
  total: number,
  used: number,
}