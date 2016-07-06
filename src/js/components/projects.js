/* global TimelineMax */

/**
 * Elements.
 */
const homeBtnPath = document.querySelectorAll('.home-menu-btn path')
const homeBtnText = document.querySelectorAll('.home-menu-btn .btn-text')

const projects = document.querySelector('.projects')
const projectsBtnOpen = document.querySelector('.js-projects-open')
const projectsBtnClose = document.querySelector('.home, .projects-link')
const projectsLink = document.querySelectorAll('.projects-link')

/**
 * Functions.
 */
export function projectsOpen () {
  const timeline = new TimelineMax()

  timeline
    .staggerTo(homeBtnPath, 0.4, { strokeDashoffset: 135 }, 0.2, 'other')
    .to(homeBtnText, 0.4, { autoAlpha: 0 }, 'other')
    .to(projectsBtnOpen, 0.2, { autoAlpha: 0 })
    .to(projects, 0.4, { x: '0%' })
    .staggerFromTo(projectsLink, 0.4, { autoAlpha: 0, x: '-100%' }, { autoAlpha: 1, x: '0%' }, 0.075, '-= 0.2')
}

export function projectsClose () {
  const timeline = new TimelineMax()

  timeline
    .to(projects, 0.4, { x: '-100%' })
    .to(projectsBtnOpen, 0.2, { autoAlpha: 1 })
    .staggerTo(homeBtnPath, 0.4, { strokeDashoffset: 0 }, 0.2, 'other')
    .to(homeBtnText, 0.4, { autoAlpha: 1 }, 'other')
}

function projectsMouseEnter (link) {
  const timeline = new TimelineMax()

  timeline
    .to(link.querySelector('.projects-title-hover'), 0.4, { right: '10px' }, 'hover')
    .to(link.querySelector('.projects-title-bg'), 0.4, { right: '4px' }, 'hover')
    .to(link.querySelector('.projects-square-left'), 0.4, { y: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-bottom'), 0.4, { x: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-right'), 0.4, { y: '0%' }, 'hover')
    .to(link.querySelector('.projects-square-top'), 0.4, { x: '0%' }, 'hover')
}

function projectsMouseLeave (link) {
  const timeline = new TimelineMax()

  timeline
    .to(link.querySelector('.projects-title-hover'), 0.4, { right: '100%' }, 'hover')
    .to(link.querySelector('.projects-title-bg'), 0.4, { right: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-top'), 0.4, { x: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-right'), 0.4, { y: '100%' }, 'hover')
    .to(link.querySelector('.projects-square-bottom'), 0.4, { x: '-100%' }, 'hover')
    .to(link.querySelector('.projects-square-left'), 0.4, { y: '-100%' }, 'hover')
}

/**
 * Setup.
 */
export function projectsSetup () {
  projectsBtnOpen.addEventListener('click', (e) => {
    projectsOpen()

    e.preventDefault()
    e.stopPropagation()
  })

  projectsBtnClose.addEventListener('click', (e) => {
    projectsClose()

    e.preventDefault()
  })

  Array.from(projectsLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      projectsMouseEnter(link)
    })

    link.addEventListener('mouseleave', () => {
      projectsMouseLeave(link)
    })
  })
}
