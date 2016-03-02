/* global Draggable, TweenMax, TimelineMax */

import randomInt from './lib/randomInt'
import wrapLettersWithElement from './lib/wrapLettersWithElement'

export default function crateAbout () {
  const about = document.querySelector('.about')
  const aboutDesc = document.querySelectorAll('.about-desc')
  const aboutBg = about.querySelector('.about-bg')

  about.style.left = randomInt(0, window.innerWidth - about.offsetWidth) + 'px'
  about.style.top = randomInt(0, window.innerHeight - about.offsetHeight) + 'px'

  Array.from(aboutDesc).forEach((desc) => {
    desc.innerHTML = wrapLettersWithElement(desc.textContent, 'span')
  })

  Draggable.create(about, {
    bounds: document.body,
    edgeResistance: 1,
    type: 'x, y'
  })

  about.addEventListener('mouseenter', () => {
    TweenMax.to(about, 0.4, { color: '#FFF' })
    TweenMax.fromTo(aboutBg, 0.4, { y: '0%' }, { y: '100%' })
    TweenMax.fromTo(aboutBg, 0.2, { rotation: 10 }, { rotation: -10 })
  })

  about.addEventListener('mouseleave', () => {
    TweenMax.to(about, 0.4, { color: '#000' })
    TweenMax.fromTo(aboutBg, 0.4, { y: '-100%' }, { y: '0%' })
    TweenMax.fromTo(aboutBg, 0.2, { rotation: -10 }, { rotation: 10 })
  })

  window.addEventListener('load', () => {
    const timeline = new TimelineMax()

    timeline
      .from('.about-left', 0.2, { y: '-100%' })
      .from('.about-bottom', 0.2, { x: '-100%' })
      .from('.about-right', 0.2, { y: '100%' })
      .from('.about-top', 0.2, { x: '100%' })
      .from('.about-bg', 0.4, { y: '-100%' })
      .fromTo('.about-bg', 0.2, { rotation: -10 }, { rotation: 10 }, '-= 0.2')
      .staggerFrom('.about-desc span', 0.0175, { autoAlpha: 0 }, 0.0175)
  })
}
