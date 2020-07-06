import { minus, add, multiple } from './vec3.js'

export function direction([a, b]) {
  return minus(b, a)
}

export function pointer(r, t) {
  const [a, b] = r
  return add(a, multiple(t, b))
}