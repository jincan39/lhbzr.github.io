import { TimelineMax } from 'gsap'

import forEach from '../lib/forEach'
import setStrokeDash from '../lib/setStrokeDash'
import wrapLettersWithElement from '../lib/wrapLettersWithElement'

import Gallery from '../classes/Gallery'

import { logoSetHome, logoSetProject } from './logo'

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

const projectList = document.querySelectorAll('.project-media-list')

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

forEach(projectButtonOpen, (index, link) => {
  const href = link.getAttribute('href').replace('#', '')
  const target = document.getElementById(href)

  const media = target.querySelector('.project-media')

  const title = target.querySelectorAll('.project-title span')
  const description = target.querySelectorAll('.project-desc span')

  const linkDash = target.querySelector('.project-link-dash')
  const linkSpans = target.querySelectorAll('.project-link-text span')

  const squareTop = target.querySelector('.project-media-square-top')
  const squareRight = target.querySelector('.project-media-square-right')
  const squareBottom = target.querySelector('.project-media-square-bottom')
  const squareLeft = target.querySelector('.project-media-square-left')

  const images = target.querySelectorAll('.project-media-img')

  link.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

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

      .to(squareLeft, 0.2, { y: '0%' }, 'content')
      .to(squareBottom, 0.2, { x: '0%' }, 'content')
      .to(squareRight, 0.2, { y: '0%' }, 'content')
      .to(squareTop, 0.2, { x: '0%' }, 'content')

      .fromTo(media, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'content')

      .staggerFromTo(title, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'content')
      .staggerFromTo(description, 0.05, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.005, 'content')

      .fromTo(linkDash, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'content')
      .staggerFromTo(linkSpans, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.05, 'content')

      .staggerTo(projectButtonClosePath, 0.4, { strokeDashoffset: 0 }, 0.2, 'nav')
      .fromTo(projectButtonCloseText, 0.4, { autoAlpha: 0 }, { autoAlpha: 1 }, 'nav')

    forEach(images, (index, image) => {
      if (!image.getAttribute('src')) {
        image.setAttribute('src', image.getAttribute('data-src'))
      }
    })
  })
})

projectButtonClose.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  const target = document.querySelector('.project-item.is-active')

  const media = target.querySelector('.project-media')

  const title = target.querySelectorAll('.project-title span')
  const description = target.querySelectorAll('.project-desc span')

  const linkDash = target.querySelector('.project-link-dash')
  const linkSpans = target.querySelectorAll('.project-link-text span')

  const squareTop = target.querySelector('.project-media-square-top')
  const squareRight = target.querySelector('.project-media-square-right')
  const squareBottom = target.querySelector('.project-media-square-bottom')
  const squareLeft = target.querySelector('.project-media-square-left')

  const timeline = new TimelineMax()

  timeline
    .to(projectButtonCloseText, 0.4, { autoAlpha: 0 }, 'nav')
    .staggerTo(projectButtonClosePath, 0.4, { strokeDashoffset: 135 }, -0.2, 'nav')

    .to(linkDash, 0.4, { autoAlpha: 0 }, 'content')
    .staggerTo(linkSpans, 0.1, { autoAlpha: 0 }, -0.05, 'content')

    .to(media, 0.4, { autoAlpha: 0 }, 'content')

    .staggerTo(title, 0.1, { autoAlpha: 0 }, -0.05, 'content')
    .staggerTo(description, 0.05, { autoAlpha: 0 }, -0.005, 'content')

    .to(squareTop, 0.2, { x: '100%' }, 'content')
    .to(squareRight, 0.2, { y: '100%' }, 'content')
    .to(squareBottom, 0.2, { x: '-100%' }, 'content')
    .to(squareLeft, 0.2, { y: '-100%' }, 'content')

    .set(target, { autoAlpha: 0 })
    .to(project, 0.4, { autoAlpha: 0 })

    .call(() => {
      project.classList.remove('is-active')
      target.classList.remove('is-active')

      logoSetHome()
    })

    .to(home, 0.4, { autoAlpha: 1 }, 'disappear')
    .to(projects, 0.4, { x: '0%' }, 'disappear')
})

forEach(projectList, (index, list) => {
  const gallery = new Gallery(list.parentNode)
})

window.addEventListener('resize', () => {
  if (project.classList.contains('is-active')) {
    logoSetProject()
  }
})
