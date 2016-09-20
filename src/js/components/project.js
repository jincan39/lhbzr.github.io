/**
 * Plugins.
 */
import { TimelineMax, TweenMax } from '../plugins/gsap'

/**
 * Library.
 */
import forEach from '../lib/forEach'
import setStrokeDash from '../lib/setStrokeDash'
import wrapLettersWithElement from '../lib/wrapLettersWithElement'

/**
 * Components.
 */
import { logoSetHome, logoSetProject } from './logo'

/**
 * Elements.
 */
const home = document.querySelector('.home')

const projects = document.querySelector('.projects')

const project = document.querySelector('.project')
const projectTitle = document.querySelectorAll('.project-title')
const projectDescription = document.querySelectorAll('.project-desc')

const projectLinkText = document.querySelectorAll('.project-link-text')

const projectButtonOpen = document.querySelectorAll('.js-project-open')
const projectButtonClose = document.querySelector('.js-project-close')
const projectButtonCloseText = projectButtonClose.querySelector('.btn-text')
const projectButtonClosePath = projectButtonClose.querySelectorAll('path')

const projectMediaPrev = document.querySelectorAll('.project-media-btn-prev')
const projectMediaNext = document.querySelectorAll('.project-media-btn-next')

/**
 * Functions.
 */
export function projectOpen (target) {
  logoSetProject()

  const timeline = new TimelineMax()

  timeline
    .to(projects, 0.4, { x: '-100%' }, 'appear')
    .to(home, 0.4, { autoAlpha: 0 }, 'appear')
    .to(project, 0.4, { autoAlpha: 1 })
    .set(target, { autoAlpha: 1 })
    .call(() => {
      project.classList.add('is-active')
      target.classList.add('is-active')
    })

    .to(target.querySelector('.project-media-square-left'), 0.2, { y: '0%' }, 'content')
    .to(target.querySelector('.project-media-square-bottom'), 0.2, { x: '0%' }, 'content')
    .to(target.querySelector('.project-media-square-right'), 0.2, { y: '0%' }, 'content')
    .to(target.querySelector('.project-media-square-top'), 0.2, { x: '0%' }, 'content')

    .fromTo(target.querySelector('.project-media-list'), 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'content')
    .staggerFromTo(target.querySelectorAll('.project-title span'), 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'content')
    .staggerFromTo(target.querySelectorAll('.project-desc span'), 0.05, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.005, 'content')
    .fromTo(target.querySelector('.project-link-dash'), 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'content')
    .staggerFromTo(target.querySelectorAll('.project-link-text span'), 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'content')

    .staggerTo(projectButtonClosePath, 0.4, { strokeDashoffset: 0 }, 0.2, 'nav')
    .fromTo(projectButtonCloseText, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'nav')

    .call(() => {
      if (target.querySelector('.project-media-btn')) {
        TweenMax.fromTo(target.querySelector('.project-media-btn-prev'), 0.4, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, 'nav')
        TweenMax.fromTo(target.querySelector('.project-media-btn-next'), 0.4, { opacity: 0, y: -25 }, { opacity: 1, y: 0 }, 'nav')
      }
    })

  const images = target.querySelectorAll('.project-media-img')

  forEach(images, (index, image) => {
    if (!image.getAttribute('src')) {
      image.setAttribute('src', image.getAttribute('data-src'))
    }
  })
}

export function projectClose (target) {
  const timeline = new TimelineMax()

  timeline
    .call(() => {
      if (target.querySelector('.project-media-btn')) {
        TweenMax.to(target.querySelector('.project-media-btn-prev'), 0.4, { opacity: 0, y: 25 }, 'nav')
        TweenMax.to(target.querySelector('.project-media-btn-next'), 0.4, { opacity: 0, y: -25 }, 'nav')
      }
    })

    .to(projectButtonCloseText, 0.4, { autoAlpha: 0 }, 'nav')
    .staggerTo(projectButtonClosePath, 0.4, { strokeDashoffset: 135 }, -0.2, 'nav')

    .to(target.querySelector('.project-link-dash'), 0.4, { autoAlpha: 0 }, 'content')
    .staggerTo(target.querySelectorAll('.project-link-text span'), 0.1, { autoAlpha: 0 }, -0.05, 'content')
    .to(target.querySelector('.project-media-list'), 0.4, { autoAlpha: 0 }, 'content')
    .staggerTo(target.querySelectorAll('.project-title span'), 0.1, { autoAlpha: 0 }, -0.05, 'content')
    .staggerTo(target.querySelectorAll('.project-desc span'), 0.05, { autoAlpha: 0 }, -0.005, 'content')

    .to(target.querySelector('.project-media-square-top'), 0.2, { x: '100%' }, 'content')
    .to(target.querySelector('.project-media-square-right'), 0.2, { y: '100%' }, 'content')
    .to(target.querySelector('.project-media-square-bottom'), 0.2, { x: '-100%' }, 'content')
    .to(target.querySelector('.project-media-square-left'), 0.2, { y: '-100%' }, 'content')

    .set(target, { autoAlpha: 0 })
    .to(project, 0.4, { autoAlpha: 0 })
    .call(() => {
      project.classList.remove('is-active')
      target.classList.remove('is-active')

      logoSetHome()
    })

    .to(home, 0.4, { autoAlpha: 1 }, 'disappear')
    .to(projects, 0.4, { x: '0%' }, 'disappear')
}

function projectImageChange (direction) {
  const timeline = new TimelineMax()

  const items = document.querySelectorAll('.project-item.is-active .project-media-item')
  const itemsLength = items.length - 1

  let itemActiveIndex
  let itemSelectedIndex

  forEach(items, (index, item) => {
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

  timeline
    .to(itemActive, 0.6, { autoAlpha: 0, height: 0 })
    .call(() => {
      itemActive.classList.remove('is-active')
      itemSelected.classList.add('is-active')
    })
    .fromTo(itemSelected, 0.6, { autoAlpha: 0, height: 0 }, { autoAlpha: 1, height: itemSelected.querySelector('img').clientHeight })
}

/**
 * Setup.
 */
setStrokeDash(projectButtonClosePath)

forEach(projectTitle, (index, title) => {
  title.innerHTML = wrapLettersWithElement(title.textContent, 'span')
})

forEach(projectDescription, (index, description) => {
  description.innerHTML = wrapLettersWithElement(description.textContent, 'span')
})

forEach(projectLinkText, (index, text) => {
  text.innerHTML = wrapLettersWithElement(text.textContent, 'span')
})

/**
 * Events.
 */
forEach(projectButtonOpen, (index, link) => {
  const target = link.getAttribute('href').replace('#', '')
  const targetProject = document.getElementById(target)

  link.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

    projectOpen(targetProject)
  })
})

projectButtonClose.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  const target = document.querySelector('.project-item.is-active')

  projectClose(target)
})

forEach(projectMediaPrev, (index, button) => {
  button.addEventListener('click', function () {
    projectImageChange('prev')
  })
})

forEach(projectMediaNext, (index, button) => {
  button.addEventListener('click', function () {
    projectImageChange('next')
  })
})

window.addEventListener('resize', () => {
  if (project.classList.contains('is-active')) {
    logoSetProject()
  }
})
