/* global Draggable, TweenMax, TimelineMax */

import randomInt from './lib/int'

export default function crateAbout () {
  const about = document.querySelector('.about')

  about.style.left = randomInt(0, window.innerWidth - about.offsetWidth) + 'px'
  about.style.top = randomInt(0, window.innerHeight - about.offsetHeight) + 'px'

  Draggable.create(about, {
    bounds: document.body,
    edgeResistance: 1,
    type: 'x, y'
  })

  about.addEventListener('mouseenter', () => {
    const bg = about.querySelector('.about-bg')

    TweenMax.to(about, 0.4, { color: '#FFF' })
    TweenMax.fromTo(bg, 0.4, { y: '0%' }, { y: '100%' })
    TweenMax.fromTo(bg, 0.2, { rotation: 10 }, { rotation: -10 })
  })

  about.addEventListener('mouseleave', () => {
    const bg = about.querySelector('.about-bg')

    TweenMax.to(about, 0.4, { color: '#000' })
    TweenMax.fromTo(bg, 0.4, { y: '-100%' }, { y: '0%' })
    TweenMax.fromTo(bg, 0.2, { rotation: -10 }, { rotation: 10 })
  })

  window.addEventListener('load', () => {
    const timeline = new TimelineMax()

    timeline
    .fromTo(about.querySelector('.about-left'), 0.2, { y: '-100%' }, { y: '0%' })
    .fromTo(about.querySelector('.about-bottom'), 0.2, { x: '-100%' }, { x: '0%' })
    .fromTo(about.querySelector('.about-right'), 0.2, { y: '100%' }, { y: '0%' })
    .fromTo(about.querySelector('.about-top'), 0.2, { x: '100%' }, { x: '0%' })
    .fromTo(about.querySelector('.about-bg'), 0.4, { y: '-100%' }, { y: '0%' })
    .fromTo(about.querySelector('.about-bg'), 0.2, { rotation: -10 }, { rotation: 10 }, '-= 0.2')
    .fromTo(about, 0.2, { color: 'transparent' }, { color: '#000' })
  })
}
