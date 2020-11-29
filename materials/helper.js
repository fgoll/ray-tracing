import { direction } from "../ray.js"
import { add, multiple, minus, dot, squared, unit } from "../vec3.js"

export function random() {
  while (true) {
    let v = minus(multiple([Math.random(), Math.random(), Math.random()], 2), [1, 1, 1]) 
    if (dot(v, v) >= 1) continue
    return v
  }
}

export function schlick(cosine, ri) {
  let r = (1 - ri) / (1 + ri)
  r = r * r
  return r + (1 - r) * Math.pow((1 - cosine), 5)
}

export function reflect(r, n) {
  return minus(r, multiple(2 * dot(r, n), n))
}

export function refract(r, n, ratio) {
  const uv = unit(r)
  const cos = dot(multiple(uv, -1), n)
  
  const cos2 = 1 - ratio * ratio * (1 - cos * cos)
  if (cos2 <= 0) return null

  const perp = multiple(ratio, add(uv, multiple(cos, n)))
  const parallel = multiple(n, Math.sqrt(cos2))

  return minus(perp, parallel)
}