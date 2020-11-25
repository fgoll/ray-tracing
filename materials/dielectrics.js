/** 漫反射材质 */
import { direction } from "../ray.js"
import { add, multiple, minus, dot, squared, unit } from "../vec3.js"
import { refraction } from './helper.js'

export function scatter(ir) {
  
  return function(r, rec) {
    const [_, P, N, __, isFront] = rec
    const ratio = isFront ? (1.0 / ir) : ir

    let target = refraction(unit(direction(r)), N, ratio)

    return [[1.0, 1.0, 1.0], [P, target]]
  }
}