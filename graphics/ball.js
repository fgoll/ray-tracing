import { pointer } from "../ray.js"
import { unit, minus, dot } from "../vec3.js"

export function hit(center, radius, ray, tMin, tMax) {
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

    if (t < tMax && t > tMin) {
      return [t, p, unit(minus(p, center))]
    }
    t = (-b + Math.sqrt(discriminant)) / (2.0 * a)
    if (t < tMax && t > tMin) {
      return [t, p, unit(minus(p, center))]
    }
  }

  return null
}

export function createHit(c, radius) {
  return (ray, tMin, tMax) => {
    return hit(c, radius, ray, tMin, tMax)
  }
}