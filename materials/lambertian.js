/** 漫反射材质 */
import { add, multiple, minus, dot } from "../vec3.js"
import { random } from './helper.js'

/**
 * 
 * @param {*} attenuation 三维削弱因子
 */
export function scatter(attenuation) {
  
  return function(r, rec) {
    let [_, P, N] = rec
    let target = add(P, N, random())

    return [attenuation, [P, minus(target, P)]]
  }
}