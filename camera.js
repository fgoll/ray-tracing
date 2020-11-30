import { add, cross, minus, multiple, unit } from "./vec3.js"
import { random } from './materials/helper.js'

export const getCamera = (lookfrom, lookat, vup, vfov, aspect, focus) => {
  const theta = vfov * Math.PI / 180
  const halfHeight = Math.tan(theta / 2) * focus
  const halfWidth = aspect * halfHeight

  const origin = lookfrom
  const w = unit(minus(lookfrom, lookat))
  const u = unit(cross(vup, w))
  const v = cross(w, u)
  // const lowerLeftCorner = [-halfWidth, -halfHeight, -1.0]
  const lowerLeftCorner = minus(origin, add(multiple(u, halfWidth), multiple(v, halfHeight), multiple(w, focus)))
  const horizontal = multiple(2 * halfWidth, u)
  const vertical = multiple(2 * halfHeight, v)

  return {
    lowerLeftCorner,
    horizontal,
    vertical,
    origin,
    u,
    v
  }
}

export const getScreenRay = (camera) => (s, t) => {
  const {
    lowerLeftCorner,
    horizontal,
    vertical,
    origin,
    u,
    v
  } = camera
  const [randX, randY] = random()
  const offset = add(multiple(u, randX), multiple(v, randY))
  return [add(origin, offset), minus(add(lowerLeftCorner, multiple(s, horizontal), multiple(t, vertical)), add(origin, offset))]
}