/* global SVGMorpheus, TweenMax */

import setStrokeDash from './lib/setStrokeDash'

import getOffset from './lib/getOffset'

const logo = new SVGMorpheus('.logo')
const logoElement = document.querySelector('.logo')

const homeLogo = document.querySelector('.home-logo')
const homeOffset = getOffset(homeLogo)

const aboutLogo = document.querySelector('.about-logo')
const aboutOffset = getOffset(aboutLogo)

const projectLogo = document.querySelector('.project-logo')
const projectOffset = getOffset(projectLogo)

/**
 * Set: Default.
 */
export function logoSet () {
  TweenMax.set(logoElement, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

/**
 * Animation: Loaded.
 */
export function logoSetLoaded () {
  const logoPath = logoElement.querySelectorAll('path')

  setStrokeDash(logoPath)

  TweenMax.to(logoPath, 2, { delay: 0.2, strokeDashoffset: 0 })
}

/**
 * Animation: Home.
 */
export function logoSetHome () {
  logo.to('logo-horizontal', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

/**
 * Animation: About.
 */
export function logoSetAbout () {
  logo.to('logo-vertical', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: aboutLogo.clientHeight,
    left: aboutOffset.left,
    top: aboutOffset.top,
    width: aboutLogo.clientWidth
  })
}

/**
 * Animation: Project.
 */
export function logoSetProject () {
  logo.to('logo-vertical', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: projectLogo.clientHeight,
    left: projectOffset.left,
    top: projectOffset.top,
    width: projectLogo.clientWidth
  })
}
