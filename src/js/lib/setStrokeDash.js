export default function setStrokeDash (logoPath) {
  Array.from(logoPath).forEach((path) => {
    let pathLength = path.getTotalLength()

    path.style.strokeDasharray = pathLength + ' ' + pathLength
    path.style.strokeDashoffset = pathLength
  })
}
