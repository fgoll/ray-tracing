
export function draw(canvas) {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, width, height)
  
  for (let j = height - 1; j >= 0; j --) {
    for (let i = 0; i < width; i ++) {
      let r = i / width
      let g = j / height
      let b = 0.2
      let ir = 255.99 * r
      let ig = 255.99 * g
      let ib = 255.99 * b
      
    }
  }
  console.log(imgData)
}