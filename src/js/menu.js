/* global TweenMax, TimelineMax, Draggable */

import randomInt from './lib/randomInt'
import replaceChar from './lib/replaceChar'

export default function createMenu () {
  const links = document.querySelectorAll('.menu-link')

  Array.from(links).forEach((link) => {
    let interval

    link.style.left = randomInt(0, window.innerWidth - link.offsetWidth) + 'px'
    link.style.top = randomInt(0, window.innerHeight - link.offsetHeight) + 'px'

    Draggable.create(link, {
      bounds: document.body,
      dragClickables: true,
      edgeResistance: 1,
      type: 'x, y'
    })

    link.addEventListener('mouseenter', () => {
      const text = link.querySelector('.menu-text')
      const bg = link.querySelector('.menu-bg')

      TweenMax.to(link, 0.4, { color: '#000', fill: '#000' })
      TweenMax.fromTo(bg, 0.4, { y: '-100%' }, { y: '0%' })
      TweenMax.fromTo(bg, 0.2, { rotation: 10 }, { rotation: -10 })

      interval = setInterval(() => {
        const value = text.innerHTML.trim()
        const index = randomInt(0, value.length - 1)
        const char = String.fromCharCode(randomInt(65, 122))

        text.innerHTML = replaceChar(value, index, char)
      }, 10)
    })

    link.addEventListener('mouseleave', () => {
      const text = link.querySelector('.menu-text')
      const bg = link.querySelector('.menu-bg')

      TweenMax.to(link, 0.4, { color: '#FFF', fill: '#FFF' })
      TweenMax.fromTo(bg, 0.4, { y: '0%' }, { y: '100%' })
      TweenMax.fromTo(bg, 0.2, { rotation: -10 }, { rotation: 10 })

      clearInterval(interval)

      text.innerHTML = link.getAttribute('data-text')
    })
  })

  window.addEventListener('load', () => {
    Array.from(links).forEach((link) => {
      const timeline = new TimelineMax({ delay: Math.random() })

      timeline
        .fromTo(link.querySelector('.menu-link-top'), 0.2, { x: '-100%' }, { x: '0%' })
        .fromTo(link.querySelector('.menu-link-right'), 0.2, { y: '-100%' }, { y: '0%' })
        .fromTo(link.querySelector('.menu-link-bottom'), 0.2, { x: '100%' }, { x: '0%' })
        .fromTo(link.querySelector('.menu-link-left'), 0.2, { y: '100%' }, { y: '0%' })
        .to(link, 0.2, { background: 'rgba(255, 255, 255, .1)' })
        .fromTo(link.querySelector('.menu-icon'), 0.2, { autoAlpha: 0 }, { autoAlpha: 1 })
        .fromTo(link.querySelector('.menu-text'), 0.2, { autoAlpha: 0 }, { autoAlpha: 1 })
    })
  })
}
