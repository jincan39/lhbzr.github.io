/* global TimelineMax */

import { setLogoHome, setLogoProject } from './logo'

export default function setProject () {
  const projectBtnOpen = document.querySelectorAll('.js-project-open')
  const projectBtnClose = document.querySelector('.js-project-close')

  Array.from(projectBtnOpen).forEach((link) => {
    link.addEventListener('click', (e) => {
      setLogoProject()

      const projectSelected = link.getAttribute('href').replace('#', '')
      const projectSelectedElement = document.getElementById(projectSelected)

      const timeline = new TimelineMax()

      timeline
        .to('.projects', 0.4, { x: '-100%' }, 'in')
        .to('.home', 0.4, { autoAlpha: 0 }, 'in')
        .to('.project', 0.4, { autoAlpha: 1 })
        .to(projectSelectedElement, 0.4, { autoAlpha: 1, onComplete: function () {
          projectSelectedElement.classList.add('is-active')
        }})

      e.preventDefault()
    })
  })

  projectBtnClose.addEventListener('click', (e) => {
    setLogoHome()

    const timeline = new TimelineMax()

    timeline
      .to('.project-item.is-active', 0.4, { autoAlpha: 0 })
      .to('.project', 0.4, { autoAlpha: 0 })
      .to('.home', 0.4, { autoAlpha: 1 }, 'out')
      .to('.projects', 0.4, { x: '0%' }, 'out')

    e.preventDefault()
  })
}
