/* global getComputedStyle */

import { TweenMax } from 'gsap'
import SVGMorpheus from '../plugins/svg-morpheus'

import getOffset from '../library/getOffset'

const logo = new SVGMorpheus('.logo')
const logoElement = document.querySelector('.logo')

const homeLogo = document.querySelector('.home-logo')
const aboutLogo = document.querySelector('.about-logo')
const projectLogo = document.querySelector('.project-logo')

export function logoSetup () {
  const homeOffset = getOffset(homeLogo)
  const homeStyle = getComputedStyle(homeLogo)

  TweenMax.set(logoElement, {
    height: homeStyle.height,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeStyle.width
  })
}

export function logoSetHome () {
  logo.to('logo-horizontal', {
    duration: 1000,
    rotation: 'random'
  })

  const homeOffset = getOffset(homeLogo)
  const homeStyle = getComputedStyle(homeLogo)

  TweenMax.to(logoElement, 1, {
    height: homeStyle.height,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeStyle.width
  })
}

export function logoSetAbout () {
  logo.to('logo-vertical', {
    duration: 1000,
    rotation: 'random'
  })

  const aboutOffset = getOffset(aboutLogo)
  const aboutStyle = getComputedStyle(aboutLogo)

  TweenMax.to(logoElement, 1, {
    height: aboutStyle.height,
    left: aboutOffset.left,
    top: aboutOffset.top,
    width: aboutStyle.width
  })
}

export function logoSetProject () {
  logo.to('logo-vertical', {
    duration: 1000,
    rotation: 'random'
  })

  const projectOffset = getOffset(projectLogo)
  const projectStyle = getComputedStyle(projectLogo)

  TweenMax.to(logoElement, 1, {
    height: projectStyle.height,
    left: projectOffset.left,
    top: projectOffset.top,
    width: projectStyle.width
  })
}

logoSetup()

window.addEventListener('resize', () => {
  const about = document.querySelector('.about')
  const project = document.querySelector('.project')

  if (!about.classList.contains('is-active') && !project.classList.contains('is-active')) {
    logoSetup()
  }
})
