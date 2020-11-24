/** 漫反射材质 */
import { add, multiple, minus, dot, squared } from "../vec3.js"

function refraction(r, n, ratio) {

    
  const cos = -dot(r, n)
  const perp = multiple(ratio, add(r, multiple(cos, n)))
  const parallel = multiple(n, -Math.sqrt(Math.abs(1 - squared(perp))))

  // const cos = -dot(r, n)
  // const perp = multiple(ratio, add(r, multiple(cos, n)))
  // const parallel = -multiple(n, Math.sqrt(Math.abs(1 - ratio * ratio * (1 - dot(r, n)) * (1 - dot(r, n)))))

  return add(perp, parallel)
}


/**
 * 
 * @param {*} attenuation 三维削弱因子
 */
export function scatter(ir) {
  
  return function(r, rec) {
    const [_, P, N, __, isFront] = rec
    const ratio = isFront ? (1.0 / ir) : ir

    let target = refraction(r, N, ratio)

    return [[1.0, 1.0, 1.0], [P, target]]
  }
}