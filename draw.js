import { add, multiple, unit, minus, dot } from "./vec3.js"
import { direction, pointer } from "./ray.js"
import * as ball from './graphics/ball.js'

function color(r, list) {
  let far = Number.MAX_VALUE
  let rec
  for (let i = 0; i < list.length; i ++) {
    let tempRec = list[i](r, 0.0, far)
    // console.log(tempRec)
    if (tempRec) {
      far = tempRec[0]
      rec = tempRec
    }
  }
// console.log(rec)
  if (rec) {
    let N = rec[2]
    return multiple(0.5, [N[0] + 1, N[1] + 1, N[2] + 1])
  }
  let unitV = unit(direction(r))
  let t = 0.5 * (unitV[1] + 1.0)
  return add(multiple((1.0 - t), [1, 1, 1]), multiple(t, [.5, .7, 1]))
}


export function draw(canvas) {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, width, height)
  
  const data = imgData.data

  let lowerLeftCorner = [-2.0, -1.0, -1.0]
  let horizontal = [4.0, 0.0, 0.0]
  let vertical = [0.0, 2.0, 0.0]
  let origin = [0.0, 0.0, 0.0]

  let list = [
    ball.createHit([0, 0, -1], 0.5),
    ball.createHit([0, -100.5, -1], 100)
  ]

  for (let j = 0; j < height; j ++) {
    for (let i = 0; i < width; i ++) {
      let u = i / width
      let v = (height - j) / height
      let r = [origin, add(lowerLeftCorner, multiple(u, horizontal), multiple(v, vertical))]

      let c = color(r, list)

      const from = width * 4 * j + i * 4
      data[from] = c[0] * 255.99
      data[from+1] = c[1] * 255.99
      data[from+2] = c[2] * 255.99
      data[from+3] = 255
    }

    ctx.putImageData(imgData,0,0)
  }

  console.log(imgData)
}