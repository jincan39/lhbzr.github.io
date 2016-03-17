/* global TweenMax, TimelineMax */

import { setLogoHome, setLogoAbout } from './logo'

export default function setAbout () {
  const home = document.querySelector('.home')

  const about = document.querySelector('.about')
  const aboutBtnOpen = document.querySelector('.js-about-open')
  const aboutBtnClose = document.querySelector('.js-about-close')
  const aboutMenuLink = document.querySelectorAll('.about-menu-link')

  aboutBtnOpen.addEventListener('click', (e) => {
    setLogoAbout()

    TweenMax.to(home, 1, { autoAlpha: 0 })
    TweenMax.to(about, 1, { autoAlpha: 1 })

    e.preventDefault()
  })

  aboutBtnClose.addEventListener('click', (e) => {
    setLogoHome()

    TweenMax.to(home, 0.4, { autoAlpha: 1 })
    TweenMax.to(about, 0.4, { autoAlpha: 0 })

    e.preventDefault()
  })

  TweenMax.set('.about-menu-square', { background: 'rgba(255, 255, 255, 0)' })
  TweenMax.set('.about-menu-square-left', { y: '-100%' })
  TweenMax.set('.about-menu-square-bottom', { x: '-100%' })
  TweenMax.set('.about-menu-square-right', { y: '100%' })
  TweenMax.set('.about-menu-square-top', { x: '100%' })
  TweenMax.set('.about-menu-line', { width: 0 })
  TweenMax.set('.about-menu-text', { autoAlpha: 0, x: 25 })

  Array.from(aboutMenuLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const timeline = new TimelineMax()

      timeline
        .to(link.querySelector('.about-menu-square-left'), 0.2, { y: '0%' }, 'squares')
        .to(link.querySelector('.about-menu-square-bottom'), 0.2, { x: '0%' }, 'squares')
        .to(link.querySelector('.about-menu-square-right'), 0.2, { y: '0%' }, 'squares')
        .to(link.querySelector('.about-menu-square-top'), 0.2, { x: '0%' }, 'squares')
        .to(link, 0.3, { background: 'rgba(255, 255, 255, 1)', fill: '#000' }, 'text')
        .to(link.querySelector('.about-menu-line'), 0.3, { width: 50 }, 'text')
        .to(link.querySelector('.about-menu-text'), 0.3, { autoAlpha: 1, x: 0 }, 'text')
    })

    link.addEventListener('mouseleave', () => {
      const timeline = new TimelineMax()

      timeline
        .to(link.querySelector('.about-menu-square-top'), 0.2, { x: '100%' }, 'squares')
        .to(link.querySelector('.about-menu-square-right'), 0.2, { y: '100%' }, 'squares')
        .to(link.querySelector('.about-menu-square-bottom'), 0.2, { x: '-100%' }, 'squares')
        .to(link.querySelector('.about-menu-square-left'), 0.2, { y: '-100%' }, 'squares')
        .to(link, 0.3, { background: 'rgba(255, 255, 255, 0)', fill: '#FFF' }, 'text')
        .to(link.querySelector('.about-menu-line'), 0.3, { width: 0 }, 'text')
        .to(link.querySelector('.about-menu-text'), 0.3, { autoAlpha: 0, x: 25 }, 'text')
    })
  })
}
