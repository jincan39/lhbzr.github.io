/* global TweenMax, Draggable */

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

    _link.addEventListener('mouseenter', () => {
      const text = _link.querySelector('.menu-text')
      const bg = _link.querySelector('.menu-bg')

      TweenMax.to(_link, 0.4, { color: '#FFF', fill: '#FFF' })
      TweenMax.fromTo(bg, 0.4, { y: '0%' }, { y: '100%' })
      TweenMax.fromTo(bg, 0.2, { rotation: -10 }, { rotation: 10 })

      interval = setInterval(() => {
        const value = text.innerHTML.trim()
        const index = randomInt(0, value.length - 1)
        const char = String.fromCharCode(randomInt(65, 122))

        text.innerHTML = replaceString(value, index, char)
      }, 10)
    })

    _link.addEventListener('mouseleave', () => {
      const text = _link.querySelector('.menu-text')
      const bg = _link.querySelector('.menu-bg')

      TweenMax.to(_link, 0.4, { color: '#000', fill: '#000' })
      TweenMax.fromTo(bg, 0.4, { y: '-100%' }, { y: '0%' })
      TweenMax.fromTo(bg, 0.2, { rotation: 10 }, { rotation: -10 })

      clearInterval(interval)

      text.innerHTML = _link.getAttribute('data-text')
    })
  })
}
