/* global TweenMax */

export default function setProjects () {
  const projects = document.querySelector('.projects')

  TweenMax.set(projects, { x: '-100%' })

  document.addEventListener('click', () => {
    TweenMax.to(projects, 0.4, { x: '-100%' })
  })

  const projectsBtn = document.querySelector('.js-projects-open')

  projectsBtn.addEventListener('click', (e) => {
    TweenMax.to(projects, 0.4, { x: '0%' })

    e.stopPropagation()
    e.preventDefault()
  })

  const projectsLink = document.querySelectorAll('.projects-link')

  TweenMax.set('.projects-title-hover', { right: '100%' })
  TweenMax.set('.projects-title-bg', { right: '100%' })

  TweenMax.set('.projects-tag', { opacity: 0, maxHeight: 0 })

  TweenMax.set('.projects-square-left', { y: '-100%' })
  TweenMax.set('.projects-square-bottom', { x: '-100%' })
  TweenMax.set('.projects-square-right', { y: '100%' })
  TweenMax.set('.projects-square-top', { x: '100%' })

  Array.from(projectsLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      TweenMax.to(link.querySelector('.projects-title-hover'), 0.4, { right: '10px' })
      TweenMax.to(link.querySelector('.projects-title-bg'), 0.4, { right: '4px' })

      TweenMax.to(link.querySelector('.projects-tag'), 0.4, { opacity: 1, maxHeight: '15px' })

      TweenMax.to(link.querySelector('.projects-square-left'), 0.4, { y: '0%' })
      TweenMax.to(link.querySelector('.projects-square-bottom'), 0.4, { x: '0%' })
      TweenMax.to(link.querySelector('.projects-square-right'), 0.4, { y: '0%' })
      TweenMax.to(link.querySelector('.projects-square-top'), 0.4, { x: '0%' })
    })

    link.addEventListener('mouseleave', () => {
      TweenMax.to(link.querySelector('.projects-title-hover'), 0.4, { right: '100%' })
      TweenMax.to(link.querySelector('.projects-title-bg'), 0.4, { right: '100%' })

      TweenMax.to(link.querySelector('.projects-tag'), 0.4, { opacity: 0, maxHeight: 0 })

      TweenMax.to(link.querySelector('.projects-square-top'), 0.4, { x: '100%' })
      TweenMax.to(link.querySelector('.projects-square-right'), 0.4, { y: '100%' })
      TweenMax.to(link.querySelector('.projects-square-bottom'), 0.4, { x: '-100%' })
      TweenMax.to(link.querySelector('.projects-square-left'), 0.4, { y: '-100%' })
    })
  })
}
