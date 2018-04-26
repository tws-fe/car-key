function circlePoint (num=36, radius=16) {
  let arr = []
  for (let index = 0; index < num; index++) {
    let deg = (360/num)*index
    let top = Math.abs(radius*Math.sin(deg*Math.PI/180))
    let left = Math.abs(radius*Math.cos(deg*Math.PI/180))
    if (deg <= 180) {
      top *= -1
    }
    if (deg > 90 && deg < 270 ) {
      left *= -1
    }
    arr.push([top, left])
  }
  return arr
}

function keyframes (name, arr) {
  let len = arr.length
  let str = ''
  for (let index = 0; index < len; index++) {
    let point = arr[index]
    str += `
      ${100*index/(len-1)}% {
        top:${point[0]}px; 
        left:${point[1]}px;
      } `
  }
  return `@keyframes ${name} { ${str} }`
}

export { circlePoint, keyframes }