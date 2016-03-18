/* global TimelineMax, TweenMax */

import setStrokeDash from './lib/setStrokeDash'
import wrapLettersWithElement from './lib/wrapLettersWithElement'

import { logoSetHome, logoSetProject } from './logo'

const home = document.querySelector('.home')

const projects = document.querySelector('.projects')

const project = document.querySelector('.project')
const projectTitle = document.querySelectorAll('.project-title')
const projectDesc = document.querySelectorAll('.project-desc')

const projectBtnOpen = document.querySelectorAll('.js-project-open')
const projectBtnClose = document.querySelector('.js-project-close')
const projectBtnCloseText = projectBtnClose.querySelector('.btn-text')
const projectBtnClosePath = projectBtnClose.querySelectorAll('path')

const projectMediaPrev = document.querySelectorAll('.project-media-btn-prev')
const projectMediaNext = document.querySelectorAll('.project-media-btn-next')

/**
 * Functions: Open and Close.
 */
export function projectOpen (target) {
  logoSetProject()

  const timeline = new TimelineMax()

  timeline
    // Other.
    .to(projects, 0.4, { x: '-100%' }, 'appear')
    .to(home, 0.4, { autoAlpha: 0 }, 'appear')
    .to(project, 0.4, { autoAlpha: 1 })
    .set(target, { autoAlpha: 1, onComplete: function () {
      target.classList.add('is-active')
    }})

    // Square.
    .to(target.querySelector('.project-media-square-left'), 0.2, { y: '0%' }, 'squares')
    .to(target.querySelector('.project-media-square-bottom'), 0.2, { x: '0%' }, 'squares')
    .to(target.querySelector('.project-media-square-right'), 0.2, { y: '0%' }, 'squares')
    .to(target.querySelector('.project-media-square-top'), 0.2, { x: '0%' }, 'squares')

    // Content.
    .from(target.querySelector('.project-media-list'), 1, { autoAlpha: 0 }, 'text')
    .staggerFromTo(target.querySelectorAll('.project-title span'), 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'text')
    .staggerFromTo(target.querySelectorAll('.project-desc span'), 0.05, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.005, 'text')

    // Link.
    .fromTo(target.querySelector('.project-link'), 0.4, { autoAlpha: 0, x: -25 }, { autoAlpha: 1, x: 0 }, 'nav')

    // Navigation.
    .fromTo('.project-item.is-active .project-media-btn-prev', 0.4, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, 'nav')
    .fromTo('.project-item.is-active .project-media-btn-next', 0.4, { opacity: 0, y: -25 }, { opacity: 1, y: 0 }, 'nav')

    // Close.
    .staggerTo(projectBtnClosePath, 0.4, { strokeDashoffset: 0 }, 0.2, 'nav')
    .fromTo(projectBtnCloseText, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'nav')
}

export function projectClose (target) {
  const timeline = new TimelineMax()

  timeline
    // Close.
    .to(projectBtnCloseText, 0.4, { autoAlpha: 0 }, 'nav')
    .staggerTo(projectBtnClosePath, 0.4, { strokeDashoffset: 135 }, -0.2, 'nav')

    // Navigation.
    .to('.project-item.is-active .project-media-btn-prev', 0.4, { opacity: 0, y: 25 }, 'nav')
    .to('.project-item.is-active .project-media-btn-next', 0.4, { opacity: 0, y: -25 }, 'nav')

    // Link.
    .to(target.querySelector('.project-link'), 0.4, { autoAlpha: 0, x: -25 }, 'nav')

    // Content.
    .to(target.querySelector('.project-media-list'), 1, { autoAlpha: 0 }, 'text')
    .staggerTo(target.querySelectorAll('.project-title span'), 0.1, { autoAlpha: 0 }, -0.05, 'text')
    .staggerTo(target.querySelectorAll('.project-desc span'), 0.05, { autoAlpha: 0 }, -0.005, 'text')

    // Square.
    .to(target.querySelector('.project-media-square-top'), 0.2, { x: '100%' }, 'squares')
    .to(target.querySelector('.project-media-square-right'), 0.2, { y: '100%' }, 'squares')
    .to(target.querySelector('.project-media-square-bottom'), 0.2, { x: '-100%' }, 'squares')
    .to(target.querySelector('.project-media-square-left'), 0.2, { y: '-100%' }, 'squares')

    // Other.
    .set('.project-item.is-active .project-media-btn', { clearProps: 'all' })
    .set(target, { autoAlpha: 0, onComplete: () => {
      target.classList.remove('is-active')
    }})
    .to(project, 0.4, { autoAlpha: 0, onComplete: () => {
      logoSetHome()
    }})
    .to(home, 0.4, { autoAlpha: 1 }, 'disappear')
    .to(projects, 0.4, { x: '0%' }, 'disappear')
    .set(target.querySelector('.project-media-list'), { clearProps: 'all' }, 'disappear')
}

/**
 * Functions: Previously and Next.
 */
function projectImgChange (items, direction) {
  const timeline = new TimelineMax()

  const itemsLength = items.length - 1

  let itemActiveIndex
  let itemSelectedIndex

  Array.from(items).forEach((item, index) => {
    if (item.classList.contains('is-active')) {
      itemActiveIndex = index
    }
  })

  if (direction === 'prev') {
    itemSelectedIndex = (itemActiveIndex !== 0) ? itemActiveIndex - 1 : itemsLength
  } else {
    itemSelectedIndex = (itemActiveIndex !== itemsLength) ? itemActiveIndex + 1 : 0
  }

  const itemActive = items[itemActiveIndex]
  const itemSelected = items[itemSelectedIndex]

  itemActive.classList.remove('is-active')
  itemSelected.classList.add('is-active')
}

/**
 * Project.
 */
export function projectSet () {
  /**
   * Functions: Utils.
   */
  setStrokeDash(projectBtnClosePath)

  Array.from(projectTitle).forEach((h2) => {
    h2.innerHTML = wrapLettersWithElement(h2.textContent, 'span')
  })

  Array.from(projectDesc).forEach((p) => {
    p.innerHTML = wrapLettersWithElement(p.textContent, 'span')
  })

  /**
   * Event Listeners: Open and Close.
   */
  Array.from(projectBtnOpen).forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(link.getAttribute('href').replace('#', ''))

      projectOpen(target)

      e.preventDefault()
    })
  })

  projectBtnClose.addEventListener('click', (e) => {
    const target = document.querySelector('.project-item.is-active')

    projectClose(target)

    e.preventDefault()
  })

  /**
   * Event Listeners: Previously and Next.
   */
  Array.from(projectMediaPrev).forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const items = document.querySelectorAll('.project-item.is-active .project-media-item')

      projectImgChange(items, 'prev')

      e.preventDefault()
    })
  })

  Array.from(projectMediaNext).forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const items = document.querySelectorAll('.project-item.is-active .project-media-item')

      projectImgChange(items, 'next')

      e.preventDefault()
    })
  })
}
