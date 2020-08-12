import { minus, add, multiple } from './vec3.js'

export function pointer(r, t) {
  const [a, b] = r
  return add(a, multiple(t, b))
}