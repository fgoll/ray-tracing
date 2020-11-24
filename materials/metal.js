/** 漫反射材质 */
import { add, multiple, minus, dot, unit } from "../vec3.js"
import { direction } from '../ray.js'

function random() {
  while (true) {
    let v = minus(multiple([Math.random(), Math.random(), Math.random()], 2), [1, 1, 1]) 
    if (dot(v, v) >= 1) continue
    return v
  }
}

function reflect(r, n) {
  return minus(r, multiple(2 * dot(r, n), n))
}

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