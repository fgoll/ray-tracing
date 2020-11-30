import { add, multiple, unit, minus, dot, divide, length } from "./vec3.js"
import * as ball from './graphics/ball.js'
import { getCamera, getScreenRay } from './camera.js'
import { scatter as lambertian } from './materials/lambertian.js'
import { scatter as metal } from './materials/metal.js'
import { scatter as dielectrics } from './materials/dielectrics.js'

function color(r, list, depth) {

  let far = Number.MAX_VALUE
  let rec
  for (let i = 0; i < list.length; i ++) {
    const hit = list[i]
    let tempRec = hit(r, 0.001, far)
    if (tempRec) {
      far = tempRec[0]
      rec = tempRec
    }
  }
  if (rec) {
    let [_, P, N, scatter] = rec
    // let target = add(P, N, random())
    
    const result = scatter(r, rec)

    if (depth < 50 && result) {
      const [attenuation, scatterRay] = result
      return multiple(attenuation, color(scatterRay, list, depth + 1))
    }

    return [0,0,0]
  }

  const [_, direction] = r 
  let unitV = unit(direction)
  let t = 0.5 * (unitV[1] + 1.0)
  return add(multiple((1.0 - t), [1, 1, 1]), multiple(t, [.5, .7, 1]))
}


export function draw(canvas) {
  const { width, height } = canvas
  const ns =  10
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, width, height)
  const lookfrom = [3, 3, 2]
  const lookat = [0, 0, -1]
  const focus = length(minus(lookfrom, lookat)) 
  const camera = getCamera(lookfrom, lookat, [0, 1, 0], 20, width / height, focus)

  const screenRay = getScreenRay(camera)
  
  const data = imgData.data

  let list = [
    ball.createHit([0, 0, -1], 0.5, lambertian([0.1, 0.2, 0.5])),
    ball.createHit([0, -100.5, -1], 100, lambertian([0.8, 0.8, 0])),
    ball.createHit([-1, 0, -1], 0.5, dielectrics(1.5)),
    ball.createHit([-1, 0, -1], -0.45, dielectrics(1.5)),
    ball.createHit([1, 0, -1], 0.5, metal([0.8, 0.6, 0.2])),
  ]


  for (let j = 0; j < height; j ++) {
    for (let i = 0; i < width; i ++) {
      let c = [0, 0, 0]
      for (let s = 0; s < ns; s ++) {
        let u = (i + Math.random()) / width
        let v = ((height - j) + Math.random()) / height
        
        let r = screenRay(u, v)
        c = add(c, color(r, list, 0)) 
      }

      c = divide(c, ns)
      c = [Math.sqrt(c[0]), Math.sqrt(c[1]), Math.sqrt(c[2])]
      const from = width * 4 * j + i * 4
      data[from] = c[0] * 255
      data[from+1] = c[1] * 255
      data[from+2] = c[2] * 255
      data[from+3] = 255
    }

    ctx.putImageData(imgData,0,0)
  }

  console.log(imgData)
}