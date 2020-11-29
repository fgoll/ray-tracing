/** 漫反射材质 */
import { direction } from "../ray.js"
import { add, multiple, minus, dot, squared, unit, length } from "../vec3.js"
import { reflect, refract, schlick } from './helper.js'

export function scatter(ir) {
  
  return function(r, rec) {
    const [_, P, N, __, isFront, ON] = rec
    const ratio = isFront ? (1.0 / ir) : ir
    const cosine = (isFront ? -dot(direction(r), N) : dot(direction(r), N)) / length(direction(r))
    const refracted = refract(direction(r), ON, ratio)
    const reflected = reflect(direction(r), N)
    let scattered
    let prob
    if (refracted) {
      prob = schlick(cosine, ir)
    } else {
      prob = 1
    }
    if (Math.random() < prob) {
      scattered = [P, reflected]
    } else {
      scattered = [P, refracted]
    }
    return [[1.0, 1.0, 1.0], scattered]
  }
}