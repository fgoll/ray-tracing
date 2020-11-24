/** 漫反射材质 */
import { add, multiple, minus, dot } from "../vec3.js"

function random() {
  while (true) {
    let v = minus(multiple([Math.random(), Math.random(), Math.random()], 2), [1, 1, 1]) 
    if (dot(v, v) >= 1) continue
    return v
  }
}

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