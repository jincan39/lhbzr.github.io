import { TimelineMax } from 'gsap'

import forEach from '../library/forEach'
import setStrokeDash from '../library/setStrokeDash'
import wrapLettersWithElement from '../library/wrapLettersWithElement'

import { logoSetHome, logoSetAbout } from './logo'

import Scrollbar from 'smooth-scrollbar'

const homeButtonPath = document.querySelectorAll('.home-menu-btn path')
const homeButtonText = document.querySelectorAll('.home-menu-btn .btn-text')

const about = document.querySelector('.about')

const aboutTitle = document.querySelector('.about-title')
const aboutDescription = document.querySelectorAll('.about-desc')

const aboutButtonOpen = document.querySelector('.js-about-open')
const aboutButtonClose = document.querySelector('.js-about-close')
const aboutButtonCloseText = aboutButtonClose.querySelector('.btn-text')
const aboutButtonClosePath = aboutButtonClose.querySelectorAll('path')

const aboutMenuLink = document.querySelectorAll('.about-menu-link')

const scrollbar = Scrollbar.init(about)

export function aboutOpen () {
  logoSetAbout()

  const timeline = new TimelineMax()

  timeline
    .staggerTo(homeButtonPath, 0.4, { strokeDashoffset: 135 }, 0.2, 'other')
    .to(homeButtonText, 0.4, { autoAlpha: 0 }, 'other')

    .to(about, 0.4, { autoAlpha: 1 }, 'other')
    .call(() => {
      about.classList.add('is-active')
    })

    .staggerFromTo('.about-title span', 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'appear')
    .staggerFromTo('.about-desc span', 0.05, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.005, 'appear')
    .staggerFromTo(aboutMenuLink, 0.4, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, 0.075, 'appear')

    .staggerTo(aboutButtonClosePath, 0.4, { strokeDashoffset: 0 }, 0.2, 'appear')
    .fromTo(aboutButtonCloseText, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'appear')
}

export function aboutClose () {
  const timeline = new TimelineMax()

  timeline
    .to(aboutButtonCloseText, 0.4, { autoAlpha: 0 }, 'disappear')
    .staggerTo(aboutButtonClosePath, 0.4, { strokeDashoffset: 135 }, -0.2, 'disappear')

    .staggerTo(aboutMenuLink, 0.4, { autoAlpha: 0, x: 50 }, -0.075, 'disappear')
    .staggerTo('.about-desc span', 0.05, { overwrite: 'all', autoAlpha: 0 }, -0.005, 'disappear')
    .staggerTo('.about-title span', 0.1, { overwrite: 'all', autoAlpha: 0 }, -0.05, 'disappear')

    .to(about, 0.4, { autoAlpha: 0 }, 'other')
    .call(() => {
      about.classList.remove('is-active')

      logoSetHome()
    })

    .staggerTo(homeButtonPath, 0.4, { strokeDashoffset: 0 }, 0.2, 'other')
    .to(homeButtonText, 0.4, { autoAlpha: 1 }, 'other')
}

function aboutLinkEnter (link) {
  const timeline = new TimelineMax()

  timeline
    .to(link.querySelector('.about-menu-square-left'), 0.2, { y: '0%' }, 'squares')
    .to(link.querySelector('.about-menu-square-bottom'), 0.2, { x: '0%' }, 'squares')
    .to(link.querySelector('.about-menu-square-right'), 0.2, { y: '0%' }, 'squares')
    .to(link.querySelector('.about-menu-square-top'), 0.2, { x: '0%' }, 'squares')
    .to(link, 0.3, { background: 'rgba(255, 255, 255, 1)', fill: '#000' }, 'text')
    .to(link.querySelector('.about-menu-line'), 0.3, { width: 50 }, 'text')
    .to(link.querySelector('.about-menu-text'), 0.3, { autoAlpha: 1, x: 0 }, 'text')
}

function aboutLinkLeave (link) {
  const timeline = new TimelineMax()

  timeline
    .to(link.querySelector('.about-menu-square-top'), 0.2, { x: '100%' }, 'squares')
    .to(link.querySelector('.about-menu-square-right'), 0.2, { y: '100%' }, 'squares')
    .to(link.querySelector('.about-menu-square-bottom'), 0.2, { x: '-100%' }, 'squares')
    .to(link.querySelector('.about-menu-square-left'), 0.2, { y: '-100%' }, 'squares')
    .to(link, 0.3, { background: 'rgba(255, 255, 255, 0)', fill: '#FFF' }, 'text')
    .to(link.querySelector('.about-menu-line'), 0.3, { width: 0 }, 'text')
    .to(link.querySelector('.about-menu-text'), 0.3, { autoAlpha: 0, x: 25 }, 'text')
}

setStrokeDash(aboutButtonClosePath)

aboutTitle.innerHTML = wrapLettersWithElement(aboutTitle.textContent, 'span')

forEach(aboutDescription, (index, description) => {
  description.innerHTML = wrapLettersWithElement(description.textContent, 'span')
})

aboutButtonOpen.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  aboutOpen()
})

aboutButtonClose.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  aboutClose()
})

forEach(aboutMenuLink, (index, link) => {
  link.addEventListener('mouseenter', () => {
    aboutLinkEnter(link)
  })

  link.addEventListener('mouseleave', () => {
    aboutLinkLeave(link)
  })
})

window.addEventListener('resize', () => {
  if (about.classList.contains('is-active')) {
    logoSetAbout()
  }
})
