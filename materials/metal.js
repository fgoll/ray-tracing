/** 漫反射材质 */
import { add, multiple, minus, dot, unit } from "../vec3.js"
import { direction } from '../ray.js'
import { random, reflect } from './helper.js'

/**
 * 
 * @param {*} attenuation 三维削弱因子
 * @param {*} fuzz 模糊系数
 */
export function scatter(attenuation, fuzz = 0) {
  fuzz = fuzz < 1 ? fuzz : 1
  return function(r, rec) {
    let [_, P, N] = rec
    let target = reflect(unit(direction(r)), N)
    const scattered = [P, add(target, multiple(fuzz, random()))]
    if (dot(direction(scattered), N) > 0)
      return [attenuation, scattered]
    return null;
  }
}