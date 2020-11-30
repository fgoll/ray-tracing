import { add, cross, minus, multiple, unit } from "./vec3.js"

export const getCamera = (lookfrom, lookat, vup, vfov, aspect) => {
  const theta = vfov * Math.PI / 180
  const halfHeight = Math.tan(theta / 2)
  const halfWidth = aspect * halfHeight

  const origin = lookfrom
  const w = unit(minus(lookfrom, lookat))
  const u = unit(cross(vup, w))
  const v = cross(w, u)
  // const lowerLeftCorner = [-halfWidth, -halfHeight, -1.0]
  const lowerLeftCorner = minus(origin, add(multiple(u, halfWidth), multiple(v, halfHeight), w))
  const horizontal = multiple(2 * halfWidth, u)
  const vertical = multiple(2 * halfHeight, v)

  return {
    lowerLeftCorner,
    horizontal,
    vertical,
    origin,
  }
}

export const getScreenRay = (camera) => (u, v) => {
  const {
    lowerLeftCorner,
    horizontal,
    vertical,
    origin,
  } = camera
  return [origin, minus(add(lowerLeftCorner, multiple(u, horizontal), multiple(v, vertical)), origin)]
}