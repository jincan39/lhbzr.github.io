/**
 * Plugins.
 */
import { TimelineMax } from '../plugins/gsap'

/**
 * Library.
 */
import forEach from '../lib/forEach'

/**
 * Elements.
 */
const homeButtonPath = document.querySelectorAll('.home-menu-btn path')
const homeButtonText = document.querySelectorAll('.home-menu-btn .btn-text')

const projects = document.querySelector('.projects')
const projectsButtonOpen = document.querySelector('.js-projects-open')
const projectsButtonClose = document.querySelectorAll('.home, .projects-link')
const projectsLink = document.querySelectorAll('.projects-link')

/**
 * Functions.
 */
export function projectsOpen () {
  const timeline = new TimelineMax()

  timeline
    .staggerTo(homeButtonPath, 0.4, { strokeDashoffset: 135 }, 0.2, 'other')
    .to(homeButtonText, 0.4, { autoAlpha: 0 }, 'other')
    .to(projectsButtonOpen, 0.2, { autoAlpha: 0 })
    .to(projects, 0.4, { x: '0%' })
    .staggerFromTo(projectsLink, 0.4, { autoAlpha: 0, x: '-100%' }, { autoAlpha: 1, x: '0%' }, 0.075, '-= 0.2')
}

export function projectsClose () {
  const timeline = new TimelineMax()

  timeline
    .to(projects, 0.4, { x: '-100%' })
    .to(projectsButtonOpen, 0.2, { autoAlpha: 1 })
    .staggerTo(homeButtonPath, 0.4, { strokeDashoffset: 0 }, 0.2, 'other')
    .to(homeButtonText, 0.4, { autoAlpha: 1 }, 'other')
}

function projectsMouseEnter (link) {
  const timeline = new TimelineMax()

  timeline
    .fromTo(link.querySelector('.projects-hover'), 0.4, { x: '-100%' }, { x: '0%' }, 'hover')
    .fromTo(link.querySelector('.projects-hover'), 0.4, { color: '#fff' }, { color: '#000' })
    .to(link.querySelector('.projects-square-left'), 0.2, { y: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-bottom'), 0.2, { x: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-right'), 0.2, { y: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-top'), 0.2, { x: '0%' }, 'hover')
}

function projectsMouseLeave (link) {
  const timeline = new TimelineMax()

  timeline
    .to(link.querySelector('.projects-hover'), 0.4, { color: '#fff' })
    .to(link.querySelector('.projects-hover'), 0.4, { x: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-top'), 0.2, { x: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-right'), 0.2, { y: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-bottom'), 0.2, { x: '-100%' }, 'hover')
    .to(link.querySelector('.projects-square-left'), 0.2, { y: '-100%' }, 'hover')
}

/**
 * Events.
 */
projectsButtonOpen.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  projectsOpen()
})

forEach(projectsButtonClose, (index, button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

    projectsClose()
  })
})

forEach(projectsLink, (index, link) => {
  link.addEventListener('mouseenter', () => {
    projectsMouseEnter(link)
  })

  link.addEventListener('mouseleave', () => {
    projectsMouseLeave(link)
  })
})
