/*
 * @Author: berg yu
 * @Date: 2023-08-15 10:33:37
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-15 16:20:56
 * @Description: 工具函数
 */
function getAssets(name, folder = 'img') {
  // 注意路径一定要以../assets开头，开发环境下，vite 会自动拼上 src
  return new URL(`../assets/${folder}/${name}`, import.meta.url).href
}
/**
 * 清楚对象无用属性
 * @param obj 对象
 */
function clearNoValidProp(obj) {
  const result = {}
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== undefined &&
      obj[key] !== null &&
      obj[key] !== ''
    ) {
      result[key] = obj[key]
    }
  }
  return result
}

export { getAssets, clearNoValidProp }
