/* global TweenMax */

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

  const aboutMenuLink = document.querySelectorAll('.about-menu-link')

  TweenMax.set('.about-menu-square-left', { y: '-100%' })
  TweenMax.set('.about-menu-square-bottom', { x: '-100%' })
  TweenMax.set('.about-menu-square-right', { y: '100%' })
  TweenMax.set('.about-menu-square-top', { x: '100%' })
  TweenMax.set('.about-menu-line', { width: 0 })
  TweenMax.set('.about-menu-text', { autoAlpha: 0, x: 25 })

  Array.from(aboutMenuLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      TweenMax.to(link.querySelector('.about-menu-square-left'), 0.4, { y: '0%' })
      TweenMax.to(link.querySelector('.about-menu-square-bottom'), 0.4, { x: '0%' })
      TweenMax.to(link.querySelector('.about-menu-square-right'), 0.4, { y: '0%' })
      TweenMax.to(link.querySelector('.about-menu-square-top'), 0.4, { x: '0%' })

      TweenMax.to(link.querySelector('.about-menu-line'), 0.4, { width: 50 })

      TweenMax.to(link.querySelector('.about-menu-text'), 0.4, { autoAlpha: 1, x: 0 })
    })

    link.addEventListener('mouseleave', () => {
      TweenMax.to(link.querySelector('.about-menu-square-top'), 0.4, { x: '100%' })
      TweenMax.to(link.querySelector('.about-menu-square-right'), 0.4, { y: '100%' })
      TweenMax.to(link.querySelector('.about-menu-square-bottom'), 0.4, { x: '-100%' })
      TweenMax.to(link.querySelector('.about-menu-square-left'), 0.4, { y: '-100%' })

      TweenMax.to(link.querySelector('.about-menu-line'), 0.4, { width: 0 })

      TweenMax.to(link.querySelector('.about-menu-text'), 0.4, { autoAlpha: 0, x: 25 })
    })
  })
}
