import forEach from './forEach'

export default function setStrokeDash (logoPath) {
  forEach(logoPath, (index, path) => {
    let pathLength = path.getTotalLength()

    path.style.strokeDasharray = pathLength + ' ' + pathLength
    path.style.strokeDashoffset = pathLength
  })
}
