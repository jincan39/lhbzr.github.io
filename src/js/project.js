/* global TimelineMax, TweenMax */

import { setLogoHome, setLogoProject } from './logo'
import parent from './lib/parent'

export default function setProject () {
  const projectBtnOpen = document.querySelectorAll('.js-project-open')
  const projectBtnClose = document.querySelector('.js-project-close')

  Array.from(projectBtnOpen).forEach((link) => {
    link.addEventListener('click', (e) => {
      setLogoProject()

      const project = document.getElementById(link.getAttribute('href').replace('#', ''))
      const projectMedia = project.querySelector('.project-media-list')

      const timeline = new TimelineMax()

      timeline
        .to('.projects', 0.4, { x: '-100%' }, 'in')
        .to('.home', 0.4, { autoAlpha: 0 }, 'in')
        .to('.project', 0.4, { autoAlpha: 1 })
        .to(project, 0.4, { autoAlpha: 1, onComplete: function () {
          project.classList.add('is-active')
        }})
        .from(projectMedia, 1, { border: 'none', height: 0, opacity: 0 })

      e.preventDefault()
    })
  })

  projectBtnClose.addEventListener('click', (e) => {
    setLogoHome()

    const project = document.querySelector('.project-item.is-active')
    const projectMedia = project.querySelector('.project-media-list')

    const timeline = new TimelineMax()

    timeline
      .to(projectMedia, 1, { border: 'none', height: 0, opacity: 0 })
      .to(project, 0.4, { autoAlpha: 0, onComplete: function () {
        project.classList.remove('is-active')
      }})
      .to('.project', 0.4, { autoAlpha: 0 })
      .to('.home', 0.4, { autoAlpha: 1 }, 'out')
      .to('.projects', 0.4, { x: '0%' }, 'out')
      .set(projectMedia, { clearProps: 'all' })

    e.preventDefault()
  })

  const projectMediaPrev = document.querySelectorAll('.project-media-btn-prev')
  const projectMediaNext = document.querySelectorAll('.project-media-btn-next')

  Array.from(projectMediaPrev).forEach((btn) => {
    btn.addEventListener('click', function () {
      console.log(parent(btn, '.project-media'))
    })
  })

  Array.from(projectMediaNext).forEach((btn) => {
    btn.addEventListener('click', function () {
      console.log(parent(btn, '.project-media'))
    })
  })
}
