/* global TimelineMax */

import setStrokeDash from './lib/setStrokeDash'
import wrapLettersWithElement from './lib/wrapLettersWithElement'

import { logoSetHome, logoSetAbout } from './logo'

const homeBtnPath = document.querySelectorAll('.home-menu-btn path')
const homeBtnText = document.querySelectorAll('.home-menu-btn .btn-text')

const about = document.querySelector('.about')

const aboutTitle = document.querySelector('.about-title')
const aboutDesc = document.querySelectorAll('.about-desc')

const aboutBtnOpen = document.querySelector('.js-about-open')
const aboutBtnClose = document.querySelector('.js-about-close')
const aboutBtnCloseText = aboutBtnClose.querySelector('.btn-text')
const aboutBtnClosePath = aboutBtnClose.querySelectorAll('path')

const aboutMenuLink = document.querySelectorAll('.about-menu-link')

/**
 * Functions: Open and Close.
 */
export function aboutOpen () {
  logoSetAbout()

  const timeline = new TimelineMax()

  timeline
    // Other.
    .staggerTo(homeBtnPath, 0.4, { strokeDashoffset: 135 }, 0.2, 'other')
    .to(homeBtnText, 0.4, { autoAlpha: 0 }, 'other')
    .to(about, 0.4, { autoAlpha: 1 }, 'other')

    // Content.
    .staggerFromTo('.about-title span', 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'appear')
    .staggerFromTo('.about-desc span', 0.05, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.005, 'appear')
    .staggerFromTo(aboutMenuLink, 0.4, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, 0.075, 'appear')

    // Close.
    .staggerTo(aboutBtnClosePath, 0.4, { strokeDashoffset: 0 }, 0.2, 'appear')
    .fromTo(aboutBtnCloseText, 0.4, { autoAlpha: 0 }, { autoAlpha: 1, onComplete: () => {
      about.classList.add('is-active')
    }}, 'appear')
}

export function aboutClose () {
  const timeline = new TimelineMax()

  timeline
    // Close.
    .to(aboutBtnCloseText, 0.4, { autoAlpha: 0 }, 'disappear')
    .staggerTo(aboutBtnClosePath, 0.4, { strokeDashoffset: 135 }, -0.2, 'disappear')

    // Content.
    .staggerTo(aboutMenuLink, 0.4, { autoAlpha: 0, x: 50 }, -0.075, 'disappear')
    .staggerTo('.about-desc span', 0.05, { autoAlpha: 0 }, -0.005, 'disappear')
    .staggerTo('.about-title span', 0.1, { autoAlpha: 0 }, -0.05, 'disappear')

    // Other.
    .to(about, 0.4, { autoAlpha: 0, onComplete: () => {
      logoSetHome()
    }}, '-= 0.2')
    .staggerTo(homeBtnPath, 0.4, { strokeDashoffset: 0 }, 0.2, 'other')
    .to(homeBtnText, 0.4, { autoAlpha: 1, onComplete: () => {
      about.classList.remove('is-active')
    }}, 'other')
}

/**
 * Functions: Enter and Leave.
 */
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

/**
 * About.
 */
export function aboutSet () {
  /**
   * Functions: Utils.
   */
  setStrokeDash(aboutBtnClosePath)

  aboutTitle.innerHTML = wrapLettersWithElement(aboutTitle.textContent, 'span')

  Array.from(aboutDesc).forEach((p) => {
    p.innerHTML = wrapLettersWithElement(p.textContent, 'span')
  })

  /**
   * Event Listeners: Open and Close.
   */
  aboutBtnOpen.addEventListener('click', (e) => {
    aboutOpen()

    e.preventDefault()
    e.stopPropagation()
  })

  aboutBtnClose.addEventListener('click', (e) => {
    aboutClose()

    e.preventDefault()
  })

  /**
   * Event Listeners: Enter and Leave.
   */
  Array.from(aboutMenuLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      aboutLinkEnter(link)
    })

    link.addEventListener('mouseleave', () => {
      aboutLinkLeave(link)
    })
  })

  /**
   * Event Listener: Window.
   */
  window.addEventListener('resize', () => {
    if (about.classList.contains('is-active')) {
      logoSetAbout()
    }
  })
}
