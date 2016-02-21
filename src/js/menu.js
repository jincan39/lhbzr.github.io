import randomInt from './lib/int'
import replaceString from './lib/replace'

export default function createMenu () {
  const links = document.querySelectorAll('.menu-link')

  Array.from(links).forEach((link) => {
    const _link = link
    let interval

    _link.style.left = randomInt(0, window.innerWidth - link.offsetWidth) + 'px'
    _link.style.top = randomInt(0, window.innerHeight - link.offsetHeight) + 'px'

    Draggable.create(_link, {
      bounds: document.body,
      dragClickables: true,
      edgeResistance: 1,
      type: 'x, y'
    })

    _link.addEventListener('mouseover', () => {
      const text = _link.querySelector('.menu-text')

      interval = setInterval(() => {
        const value = text.innerHTML.trim()
        const index = randomInt(0, value.length - 1)
        const char = String.fromCharCode(randomInt(65, 122))

        text.innerHTML = replaceString(value, index, char)
      }, 10)
    })

    _link.addEventListener('mouseout', () => {
      const text = _link.querySelector('.menu-text')

      clearInterval(interval)

      text.innerHTML = _link.getAttribute('data-text')
    })
  })
}
