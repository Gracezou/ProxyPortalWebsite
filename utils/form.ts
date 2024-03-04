
import { isEmpty } from 'lodash'
/**
 * 赋值对象已有的属性
 * @param target 目标对象
 * @param source 来源对象
 * @returns 目标对象
 */
export const ObjectAssignment = (target: any, source: any) => {
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}
export const formObjectInit = (obj: Record<string, number | string | undefined> | any) => {
  Object.keys(obj).forEach(key => {
    switch (typeof obj[key]) {
      case 'number':
        obj[key] = undefined
        break
      case 'string':
        obj[key] = ''
        break
      case 'object':
        if (obj[key] instanceof Array) {
          obj[key] = []
        }
        break
      case 'boolean':
        obj[key] = false
        break
      default: {
        obj[key] = undefined
      }
    }
  })
}


export function formatShowTime(dateStr: string): string {
  const date = new Date(dateStr)
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const min = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hours}:${min}`
}

// jwt 令牌解析
export const jwtParse = (token: string): any | undefined => {
  if (isEmpty(token)) return undefined
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}
