import { add, multiple } from "./vec3.js"

let lowerLeftCorner = [-2.0, -1.0, -1.0]
let horizontal = [4.0, 0.0, 0.0]
let vertical = [0.0, 2.0, 0.0]
let origin = [0.0, 0.0, 0.0]

export const getScreenRay = (u, v) => {
  return [origin, add(lowerLeftCorner, multiple(u, horizontal), multiple(v, vertical))]
}