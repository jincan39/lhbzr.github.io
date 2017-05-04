import { TimelineMax } from 'gsap'

import forEach from '../library/forEach'

import Scrollbar from 'smooth-scrollbar'

const homeButtonPath = document.querySelectorAll('.home-menu-btn path')
const homeButtonText = document.querySelectorAll('.home-menu-btn .btn-text')

const projects = document.querySelector('.projects')
const projectsButtonOpen = document.querySelector('.js-projects-open')
const projectsButtonClose = document.querySelectorAll('.home, .projects-link')
const projectsLink = document.querySelectorAll('.projects-link')

const scrollbar = Scrollbar.init(projects)

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
    .staggerFromTo(link.querySelectorAll('.projects-bg'), 1, { x: '-100%' }, { x: '100%' }, 0.2, 'hover')
    .set(link.querySelector('.projects-title'), { background: '#fff', color: '#000', delay: 0.5 }, 'hover')
}

function projectsMouseLeave (link) {
  const timeline = new TimelineMax()

  timeline
    .staggerTo(link.querySelectorAll('.projects-bg'), 1, { x: '-100%' }, 0.2, 'hover')
    .set(link.querySelector('.projects-title'), { background: 'none', color: '#fff', delay: 0.5, overwrite: 'all' }, 'hover')
}

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
