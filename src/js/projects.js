/* global TweenMax */

export default function createProjects () {
  let projectsActive = false

  const projects = document.querySelector('.projects')
  const projectsLabel = document.querySelector('.projects-label')
  const projectsList = document.querySelector('.projects-list')
  const projectsLogos = document.querySelectorAll('.project-logo path')
  const projectsLogosStyles = function () {
    Array.from(projectsLogos).forEach((logo) => {
      const length = logo.getTotalLength()

      TweenMax.to(logo, 0.5, {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: 'rgba(255, 255, 255, .5)',
        strokeDasharray: length + ' ' + length,
        strokeDashoffset: length
      })
    })
  }

  projects.addEventListener('mousewheel', (e) => {
    e.stopPropagation()

    if (e.wheelDelta < 0) {
      TweenMax.to(projectsList, 0.1, { scrollTo: { x: '+= 100' } }, '-= 0.05')
    } else {
      TweenMax.to(projectsList, 0.1, { scrollTo: { x: '-= 100' } }, '-= 0.05')
    }
  })

  projectsLabel.addEventListener('mouseenter', () => {
    if (!projectsActive) {
      TweenMax.to(projects, 0.4, { y: '0%' })

      TweenMax.to(projectsLogos, 0.75, { strokeDashoffset: 0 })

      TweenMax.to(projectsLogos, 0.5, {
        delay: 0.75,
        fill: 'rgba(255, 255, 255, 1)',
        stroke: 'rgba(255, 255, 255, 0)'
      })

      projectsActive = true
    }
  })

  window.addEventListener('mousemove', (e) => {
    if (projectsActive && e.pageY < window.innerHeight - 250) {
      TweenMax.to(projects, 0.4, { y: '100%' })

      projectsLogosStyles()

      projectsActive = false
    }
  })

  window.addEventListener('load', () => {
    projectsLogosStyles()
  })
}
