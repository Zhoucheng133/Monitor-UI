export function formatBytes(value: number, unit: 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' = 'Bytes', decimals: number = 2): string {
  const k = 1024; // 定义 1 KB = 1024 Bytes
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // 单位数组

  // 将输入值统一转换为 Bytes
  let bytes = value;
  const unitIndex = sizes.indexOf(unit);
  if (unitIndex > 0) {
      bytes = value * Math.pow(k, unitIndex);
  }

  // 如果是 0 Bytes，直接返回
  if (bytes === 0) return '0 Bytes';

  // 计算适合的单位
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

  return `${formattedValue} ${sizes[i]}`;
}