import { add, multiple, minus, dot, squared } from "../vec3.js"

export function random() {
  while (true) {
    let v = minus(multiple([Math.random(), Math.random(), Math.random()], 2), [1, 1, 1]) 
    if (dot(v, v) >= 1) continue
    return v
  }
}

export function reflect(r, n) {
  return minus(r, multiple(2 * dot(r, n), n))
}

export function refraction(r, n, ratio) {

  const cos = Math.min(dot(multiple(-1, r), n), 1)
  const sin = Math.sqrt(1 - cos * cos)
  if (sin * ratio > 1.0) {
    return reflect(r, n)
  } 
  const perp = multiple(ratio, minus(r, multiple(cos, n)))
  const cos2 = Math.abs(1 - squared(perp))
  const parallel = multiple(n, Math.sqrt(cos2))
  return minus(perp, parallel)
}