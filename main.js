import { draw } from './draw.js'

const WIDTH = 300, 
      HEIGHT = 200
// const ctx = document.getElementById('canvas').getContext('2d')
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

canvas.width = WIDTH
canvas.height = HEIGHT

draw(canvas)