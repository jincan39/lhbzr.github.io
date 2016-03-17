/* global TweenMax, TimelineMax */

export default function setProjects () {
  const projects = document.querySelector('.projects')
  const projectsBtnOpen = document.querySelector('.js-projects-open')
  const projectsBtnClose = document.querySelector('.home, .projects-link')
  const projectsLink = document.querySelectorAll('.projects-link')

  projectsBtnOpen.addEventListener('click', (e) => {
    const timeline = new TimelineMax()

    timeline
      .to(projects, 0.4, { x: '0%' })
      .staggerFrom(projectsLink, 0.4, { autoAlpha: 0, scale: 0.5, x: '-100%' }, 0.1)

    e.stopPropagation()
    e.preventDefault()
  })

  projectsBtnClose.addEventListener('click', () => {
    TweenMax.to(projects, 0.4, { x: '-100%' })
  })

  /**
   * Effects.
   */
  TweenMax.set('.projects-title-hover', { right: '100%' })
  TweenMax.set('.projects-title-bg', { right: '100%' })

  TweenMax.set('.projects-tag', { opacity: 0, maxHeight: 0 })

  TweenMax.set('.projects-square-left', { y: '-100%' })
  TweenMax.set('.projects-square-bottom', { x: '-100%' })
  TweenMax.set('.projects-square-right', { y: '100%' })
  TweenMax.set('.projects-square-top', { x: '100%' })

  Array.from(projectsLink).forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const timeline = new TimelineMax()

      timeline
        .to(link.querySelector('.projects-title-hover'), 0.4, { right: '10px' }, 'hover')
        .to(link.querySelector('.projects-title-bg'), 0.4, { right: '4px' }, 'hover')
        .to(link.querySelector('.projects-tag'), 0.4, { opacity: 1, maxHeight: '15px' }, 'hover')
        .to(link.querySelector('.projects-square-left'), 0.4, { y: '0%' }, 'hover')
        .to(link.querySelector('.projects-square-bottom'), 0.4, { x: '0%' }, 'hover')
        .to(link.querySelector('.projects-square-right'), 0.4, { y: '0%' }, 'hover')
        .to(link.querySelector('.projects-square-top'), 0.4, { x: '0%' }, 'hover')
    })

    link.addEventListener('mouseleave', () => {
      const timeline = new TimelineMax()

      timeline
        .to(link.querySelector('.projects-title-hover'), 0.4, { right: '100%' }, 'hover')
        .to(link.querySelector('.projects-title-bg'), 0.4, { right: '100%' }, 'hover')
        .to(link.querySelector('.projects-tag'), 0.4, { opacity: 0, maxHeight: 0 }, 'hover')
        .to(link.querySelector('.projects-square-top'), 0.4, { x: '100%' }, 'hover')
        .to(link.querySelector('.projects-square-right'), 0.4, { y: '100%' }, 'hover')
        .to(link.querySelector('.projects-square-bottom'), 0.4, { x: '-100%' }, 'hover')
        .to(link.querySelector('.projects-square-left'), 0.4, { y: '-100%' }, 'hover')
    })
  })
}
