
export function draw(canvas) {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, width, height)
  
  const data = imgData.data

  let c = 0
  for (let j = 0; j < height; j ++) {
    for (let i = 0; i < width; i ++) {
      let r = i / width
      let g = (height - j) / height
      let b = 0.2
      let ir = 255.99 * r
      let ig = 255.99 * g
      let ib = 255.99 * b
      
      const from = width * 4 * j + i * 4
      data[from] = ir
      data[from+1] = ig
      data[from+2] = ib
      data[from+3] = 255
    }

    ctx.putImageData(imgData,0,0)
  }
  console.log(c)

  console.log(imgData)
}