import int from './lib/int'

export default function crateAbout () {
  const about = document.querySelector('.about')

  Draggable.create(about, {
    bounds: document.body,
    edgeResistance: 1,
    type: 'x, y'
  })

  about.style.left = int(0, window.innerWidth - about.offsetWidth) + 'px'
  about.style.top = int(0, window.innerHeight - about.offsetHeight) + 'px'
}
