/* global TweenMax */

export default function createProjects () {
  const projects = document.querySelector('.projects')
  const projectsList = document.querySelector('.projects-list')

  projects.addEventListener('mousewheel', (e) => {
    if (e.wheelDelta < 0) {
      TweenMax.to(projectsList, 0.1, { scrollTo: { x: '+= 100' } }, '-= 0.05')
      TweenMax.to(projectsList, 0.1, { scrollTo: { x: '+= 100' } }, '-= 0.05')
    } else {
      TweenMax.to(projectsList, 0.1, { scrollTo: { x: '-= 100' } }, '-= 0.05')
    }
  })

  let projectsActive = false

  window.addEventListener('mousemove', (e) => {
    if (!projectsActive && e.pageY > window.innerHeight - 100) {
      TweenMax.to('.canvas', 0.2, { autoAlpha: 0.25 })

      TweenMax.to(projects, 0.4, { y: '0%' })

      projectsActive = true
    } else if (projectsActive && e.pageY < window.innerHeight - 200) {
      TweenMax.to('.canvas', 0.2, { autoAlpha: 1 })

      TweenMax.to(projects, 0.4, { y: '100%' })

      projectsActive = false
    }
  })
}
