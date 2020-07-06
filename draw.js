import { add, multiple, unit } from "./vec3.js"
import { direction } from "./ray.js"


function color(r) {
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

  for (let j = 0; j < height; j ++) {
    for (let i = 0; i < width; i ++) {
      let u = i / width
      let v = (height - j) / height
      let r = [origin, add(lowerLeftCorner, multiple(u, horizontal), multiple(v, vertical))]

      let c = color(r)

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