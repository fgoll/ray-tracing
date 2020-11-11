/** 漫反射材质 */
import { add, multiple, minus, dot, unit } from "../vec3.js"
import { direction } from '../ray.js'

function reflect(r, n) {
  return minus(r, multiple(2 * dot(r, n), n))
}

/**
 * 
 * @param {*} attenuation 三维削弱因子
 */
export function scatter(attenuation) {
  
  return function(r, P, N) {
    let target = reflect(unit(direction(r)), N)
    const scattered = [P, target]
    if (dot(direction(scattered), N) > 0)
      return [attenuation, scattered]
    return null;
  }
}