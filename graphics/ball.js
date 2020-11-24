import { pointer } from "../ray.js"
import { unit, minus, dot, divide, multiple } from "../vec3.js"

export function hit(center, radius, ray, tMin, tMax, scatter) {
  let [origin, direction] = ray
// console.log(ray)
  let oc = minus(origin, center) // A - C
  let a = dot(direction, direction) // dot(B, B)
  let b = 2 * dot(direction, oc) // 2 * dot(B, A-C)
  let c = dot(oc, oc) - radius * radius // dot(A-C, A-C) - R*R

  let discriminant = b * b - 4 * a * c
  if (discriminant > 0) {
    let t = (-b - Math.sqrt(discriminant)) / (2.0 * a) // 先选择较小的t 因为离我们的眼睛更近
    let p = pointer(ray, t)
    const outwardNormal = unit(minus(p, center))
    const isFront = dot(direction, outwardNormal) < 0
    const normal = isFront ? outwardNormal : multiple(-1, outwardNormal) 

    if (t < tMax && t > tMin) {
      return [t, p, normal, scatter, isFront]
    }
    t = (-b + Math.sqrt(discriminant)) / (2.0 * a)
    if (t < tMax && t > tMin) {
      return [t, p, normal, scatter, isFront]
    }
  }

  return null
}

export function createHit(c, radius, scatter) {
  return (ray, tMin, tMax) => {
    return hit(c, radius, ray, tMin, tMax, scatter)
  }
}