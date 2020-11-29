import { pointer } from "../ray.js"
import { unit, minus, dot, divide, multiple, length } from "../vec3.js"

export function hit(center, radius, ray, tMin, tMax, scatter) {
  let [origin, direction] = ray
// console.log(ray)
  let oc = minus(origin, center) // A - C
  let a = dot(direction, direction) // dot(B, B)
  let b = dot(direction, oc) // 2 * dot(B, A-C)
  let c = dot(oc, oc) - radius * radius // dot(A-C, A-C) - R*R

  let discriminant = b * b - a * c
  if (discriminant > 0) {
    let t = (-b - Math.sqrt(discriminant)) / (a) // 先选择较小的t 因为离我们的眼睛更近
    
    if (t < tMax && t > tMin) {
      const p = pointer(ray, t)
      const outwardNormal = divide(minus(p, center), radius)
      // const outwardNormal = unit(minus(p, center))
      const isFront = dot(direction, outwardNormal) < 0
      const normal = isFront ? outwardNormal : multiple(-1, outwardNormal) 
      return [t, p, outwardNormal, scatter, isFront, normal]
    }
    t = (-b + Math.sqrt(discriminant)) / (a)
    if (t < tMax && t > tMin) {
      const p = pointer(ray, t)
      const outwardNormal = divide(minus(p, center), radius)
      const isFront = dot(direction, outwardNormal) < 0
      const normal = isFront ? outwardNormal : multiple(-1, outwardNormal) 
      return [t, p, outwardNormal, scatter, isFront, normal]
    }
  }

  return null
}

export function createHit(c, radius, scatter) {
  return (ray, tMin, tMax) => {
    return hit(c, radius, ray, tMin, tMax, scatter)
  }
}