
export function add(v1, v2, ...args) {
  let others = args.reduce((prev, curr) => {
    return [prev[0] + curr[0], prev[1] + curr[1], prev[2] + curr[2]]
  }, [0, 0, 0])
  
  return [v1[0] + v2[0] + others[0], v1[1] + v2[1] + others[1], v1[2] + v2[2] + others[2]]
}

export function minus(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]
}

export function multiple(v1, v2) {
  if (typeof v1 === 'number') {
    return [v1 * v2[0], v1 * v2[1], v1 * v2[2]]
  } else if (typeof v2 === 'number') {
    return [v2 * v1[0], v2 * v1[1], v2 * v1[2]]
  } 

  return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]]
}

export function divide(v1, v2) {
  if (typeof v2 === 'number') {
    return [v1[0] / v2, v1[1] / v2, v1[2] / v2]
  }

  return [v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2]]
}

export function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
}

export function cross(v1, v2) {
  return [v1[1]*v2[2] - v1[2]*v2[1],
              (-(v1[0]*v2[2] - v1[2]*v2[0])),
              (v1[0]*v2[1] - v1[1]*v2[0])]
}

export function length(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
}

export function squared(v) {
  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
}

export function unit(v) {
  // let k = 1 / length(v)

  return divide(v, length(v))
  return [v[0] * k, v[1] * k, v[2] * k]
}
