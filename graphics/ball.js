import { pointer, direction } from "../ray.js"
import { unit, minus, dot } from "../vec3.js"

export function hit(center, radius, ray, tMin, tMax) {
  let [origin, _] = ray
  let oc = minus(origin, center)

  let a = dot(direction(ray), direction(ray))
  let b = 2 * dot(direction(ray), oc)
  let c = dot(oc, oc) - radius * radius

  let discriminant = b * b - 4 * a * c
  if (discriminant > 0) {
    let t = (-b - Math.sqrt(discriminant)) / (2.0 * a)
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