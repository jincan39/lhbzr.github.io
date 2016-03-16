/* global Draggable, TweenMax, TimelineMax */

export default function crateAbout () {
  const about = document.querySelector('.about')

  TweenMax.set(about, { autoAlpha: 0 })

  const aboutBtnOpen = document.querySelector('.js-about-open')

  aboutBtnOpen.addEventListener('click', (e) => {
    TweenMax.to(about, 0.4, { autoAlpha: 1 })

    e.stopPropagation()
    e.preventDefault()
  })

  const aboutBtnClose = document.querySelector('.js-about-close')

  aboutBtnClose.addEventListener('click', (e) => {
    TweenMax.to(about, 0.4, { autoAlpha: 0 })

    e.stopPropagation()
    e.preventDefault()
  })
}
