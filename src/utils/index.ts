// Parse the time to string
// import { Md5 } from 'ts-md5/dist/md5'

/**
 * @returns {string}
 */
export const randomStr = () => {
  const timestamp = +new Date() + ''
  const randomNum = Math.trunc((1 + Math.random()) * 65536)
  return (+(randomNum + timestamp)).toString(32)
}

export const parseTime = (time?: object | string | number, cFormat?: string): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {object} obj
 * @return {string}
 * @description 获取数据类型
 */

export const typeOf = (obj: any) => {
  const key: string = Object.prototype.toString.call(obj)
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Blob]': 'blob',
    '[object Error]': 'error',
    '[object Promise]': 'promise',
    '[object Symbol]': 'symbol'
  }
  return map[key]
}

/**
 * @param {string} key
 * @param {string} val
 * @description 本地缓存数据写入
 */

export const SetStorage = (key: string, val: string) => window.localStorage.setItem(key, val)

/**
 * @param {string} key
 * @return {string}
 * @description 本地缓存数据读取
 */

export const GetStorage = (key: string) => window.localStorage.getItem(key)

/**
 * @param {string} key
 * @description 本地缓存数据清除
 */
export const ClearStorage = (key: string) => window.localStorage.removeItem(key)

/**
 * @param {string} key
 * @description 本地缓存数据全部清除
 */
export const ClearAllStorage = () => window.localStorage.clear()

export const deepMerge = (obj1: any, obj2: any): any => {
  let key
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge
    // 否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    obj1[key] = obj1[key] && typeOf(obj1[key]) === 'object' && (obj2[key] && typeOf(obj2[key]) === 'object') ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
  }
  return obj1
}
